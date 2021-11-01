---
layout: post
title: 'Spectre の脅威とウェブサイトが設定すべきヘッダーについて'
description: 'Spectre の登場でウェブサイトに必要とされるセキュリティ要件は増えました。Spectre によってどんな攻撃がありえるのか、具体的にどんな対策が必要なのか、まとめました。'
date: 2021-11-01
image:
  feature: 2021/spectre1.png
tags:
- Security
- Spectre
---

長い記事なので先に結論を書きます。

Spectre の登場で、ウェブサイトに必要とされるセキュリティ要件は増えました。具体的に必要な対策は下記の通りです。

* すべてのリソースは `Cross-Origin-Resource-Policy` ヘッダーを使って cross-origin なドキュメントへの読み込みを制御する。
* HTML ドキュメントには `X-Frame-Options` ヘッダーもしくは `Content-Security-Policy` (CSP) ヘッダーの `frame-ancestors` ディレクティブを追加して、cross-origin なページへの iframe による埋め込みを制御する。
* HTML ドキュメントには `Cross-Origin-Opener-Policy` ヘッダーを追加して popup ウィンドウとして開かれた場合の cross-origin なページとのコミュニケーションを制御する。
* すべてのリソースには適切な `Content-Type` ヘッダーと `X-Content-Type-Options: nosniff` ヘッダーを追加して、cross-origin からの悪意ある読み込みを防ぐ。

<!-- excerpt -->

なぜこのようなヘッダーが必要かの理由や詳細を知るためには、まず最近のブラウザがウェブページをどのように表示しているか振り返る必要があります。

## ブラウザの仕組みを振り返る

ブラウザは、各タブそれぞれがひとつの URL を持ち、現在見ているページをユーザーに教えてくれます。タブに表示されている URL は通常 HTML ドキュメントを指し、そのドキュメントが画像や動画、スタイルシート、スクリプト、フォントなど、様々なリソースを読み込むことでウェブページ全体を表現します。この時、各リソースのドメインは必ずしも現在見ているページのドメインとは一致しません。

この時、URL バーに表示されているドメインを「ファーストパーティー」、ロードされたリソースのファーストパーティー以外のドメインを「サードパーティー」と呼びます。(つまり「サードパーティー Cookie」とは、サードパーティーのリソースに紐付けられている Cookie のことを言います。)

また、2 つのドメインの関係について、eTLD+1 (effective Top Level Domain とその一つ上 = 例えば `example.com`) だけが同じものを same-site、スキーマ・ホスト名・ポート番号すべてが一致するもの (例えば `https://www.example.com:8080`) を same-origin、それ以外を cross-site や cross-origin と呼びます。

この記事ではこの後 same-site/cross-site, same-origin/cross-origin を明示的に使い分けて記述していきますので、これらの違いについて曖昧な理解の方は、まずはここからスタートしてください。

{% Aside %}

参考：[same-site/cross-site, same-origin/cross-origin をちゃんと理解する](https://zenn.dev/agektmr/articles/f8dcd345a88c97)

{% endAside %}

このようにウェブでは、様々なリソースを異なるドメイン (サービス) からパズルのように組み合わせてリッチな表現をすることができる点 (composability) が大きな魅力であり、特に Web 2.0 以降は、そこに API という考え方を加えてさらに発展してきました。例えば:

* スクリプトを読み込むだけでアナリティクスを導入し、サイトを訪れたユーザーの行動を分析、もしくはトラッキングする。
* iframe を使って外部サイトの情報をウィジェットとして埋め込み、広告やソーシャルメディアのボタン、パーソナライズ可能な地図や動画を埋め込む。
* popup ウィンドウを介した外部サイトとのコミュニケーションを通じて、ログインや支払いといった連携を実現する。

cross-origin な連携は、ウェブをウェブたらしめる特徴と言えます。

![](/images/2021/spectre1.png)

### Same-Origin Policy 

ところでオンラインの世界で怖いことは、本来しかるべきところに預けたはずの情報が、ユーザーの意図しないところに渡ったり、利用されたりしてしまうことでしょう。ましてやその情報がクレジットカード番号や銀行口座の情報だったりしたら一大事です。ウェブブラウザ上で「しかるべきところ」はドメインという形で表され、HTTPS を通すことでその信頼性を担保しています。

攻撃者が情報を盗むポイントとしてはブラウザ、ネットワーク、サーバーの 3 つに大きく分かれますが、ブラウザ上での攻撃とは、いかにしてドメインの壁を越えるか、であるとも言えます。そして、ブラウザ上で異なるドメイン同士の連携を可能にしながらもサイトごとの安全性をある程度保ってくれるのが **Same-Origin Policy** です。これは origin を境界としてお互いに不可侵な関係を保ちつつも、ある程度の連携は可能にする、実に微妙なバランスの上に成り立っています。

例えば埋め込み動画を例に考えてみましょう。この cross-origin な動画は iframe で埋め込まれているため、サードパーティー Cookie を使ってパーソナライズが可能になっています。閲覧しているユーザーは配信元のドメインでログイン状態であれば、そのアカウントに対して「後で見る」などのアクションが可能なため、便利に利用することができます。しかし、特に API が用意されていない限り、埋め込み元のサイトからこのアカウントの情報にアクセスすることはできません。iframe から得られる `window` オブジェクトの DOM ツリーを辿っても、得られる情報は限られているからです。どんな HTML が表示されているか、ましてや Cookie の中身などを見ることは不可能になっています。

Popup ウィンドウとして開かれたウィンドウとの間でも同様のことが言えます。例えば典型的な支払いサービスで `window.open()` を使って開いたウィンドウと連携されている場合に DOM ツリーを辿れてしまうと、お店側がユーザーのクレジットカード情報などを盗み見ることができてしまいます。そのため、`window.open()` の戻り値からも、開かれたウィンドウの `window.opener` からも、辿れる情報はブラウザが制限しています。

このように、cross-origin なスクリプトから任意の情報にアクセスできないように制御しているのが、ブラウザの Same-Origin Policy です。

### Cross-Origin Resource Sharing (CORS)

ところで [Cross-Origin Resource Sharing](https://web.dev/cross-origin-resource-sharing/) (CORS) について調べると、ほとんどの記事が「cross-origin にホストされているリソースを `fetch()` でリクエストするための仕組み」と説明してます。それは間違いではありませんが、全てではありません。実はブラウザ上でのアクセス制御にも一役買っています。

例えば cross-origin な画像を自分のページにロードする時、普通に `<img>` タグを使えばいいだけで、CORS のことなんて気にする必要はありません。指定されたサイズでページ内にその画像を表示し、ユーザーがそれを見られれば何の問題もありません。しかしこの時、ブラウザは cross-origin のスクリプトから画像の中身 (バイナリー) が見れないよう、Same-Origin Policy で守ってくれているのです。これを **Opaque Response** と呼びます。

例えば、cross-origin から読み込んだ画像のバイナリーを取得しようと `canvas` にそれを [`drawImage()`](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage) し、[`getImageData()`](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getImageData) しようとしても、例えば Chrome では `DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.` というエラーが出て失敗してしまいます。これは Same-Origin Policy で守られているからです。

これを可能にするには `<img>` に `crossorigin` 属性を指定し、サーバー側も CORS に対応することで、明示的に許可する必要があります。

[簡単なデモ](https://opaque-response-example.glitch.me/)を作ったので試してみてください。

このように、ブラウザが origin 間のアクセスを制御することによって、ウェブの安全性をある程度担保しているのが Same-Origin Policy です。

## Spectre の脅威とは

[Spectre](https://spectreattack.com/) は 2018 年に発表された CPU の構造そのものに存在する脆弱性で、簡単に言ってしまえば同じプロセスで制御されているメモリ空間の値を推測できてしまうというものです。Spectre によって cross-origin なスクリプトによる Same-Origin Policy の壁を超えたリソースの覗き見を可能になるため、ウェブの特性上、これは大きな脅威となります。

悪意のある JavaScript をロードしてしまえば、攻撃者は Same-Origin Policy の壁を無視して、同じプロセスで動いている任意の DOM 要素を読み出すことができてしまいます。当時のほとんどのブラウザのアーキテクチャのままでは、攻撃者の作ったページ経由でリソースが読み込まれるだけで、情報が盗まれてしまう可能性がありました。そこに認証情報や、それを必要とする情報が含まれていれば、それすらも危険に晒すことになります。

### 各ブラウザの採った対策

Spectre には、高精細タイマーを活用することで効率的に情報を盗み出すことができるという特徴があるため、各ブラウザベンダーは、高精細なタイマーに関連する機能を停止することを決定しました。そこで利用できなくなった機能の代表が `SharedArrayBuffer` です。他にも、`performance.now()` の精度を下げるなどの対策も取られました。ただ、これはあくまで効率を下げるための策でしかなく、Google の研究では、Spectre の脅威を完全に取り除くには、[ブラウザのアーキテクチャを根本的に変更する必要がありました](https://v8.dev/blog/spectre)。

### Site Isolation

そこで登場したのが Site Isolation です。[Site Isolation](https://developers.google.com/web/updates/2018/07/site-isolation) はメモリ関連のバグを応用して Same-Origin Policy の壁を乗り越えられるリスクを軽減するため、Spectre が知られる以前から Chrome チームで進められていたプロジェクトでした。Spectre が発見されたことで、このアーキテクチャの完成は早められ、2018 年 5 月には実験的に投入されました。

Chrome は元々大まかにタブ単位でプロセスを作っていましたが、Site Isolation はその名の通り、プロセスを site 単位とすることでリソースを cross-site で切り離し、Spectre の脅威から守ります。具体的には [Cross-Origin Read Blocking (CORB)](https://www.chromium.org/Home/chromium-security/corb-for-developers)、[Out-of-process iframe (OOPIF)](https://www.chromium.org/developers/design-documents/oop-iframes) といったテクニックが利用されています。詳しくは [Site Isolation のページ](https://www.chromium.org/developers/design-documents/site-isolation)をご覧ください。

{% Aside %}

本来「プロセスを分ける」ではなく、「Browsing Context Group を分ける」という方が正しいのですが、ここでは便宜上「プロセス」という言葉を使っています。

{% endAside %}

プロセスを細かく分けるということはそれだけオーバーヘッドがかかるため、メモリ消費量は 10% 程度増えるなど、リソースの乏しいモバイルには向いていません。そのため、Site Isolation は基本的にデスクトップ環境と、モバイルの一部サイトのみで有効化されました。一時期デスクトップ版 Chrome だけ `SharedArrayBuffer` が使えたのはそのためです。

ただ問題は、Site Isolation が Chrome 独自のアーキテクチャだということです。現在 Firefox でも [Fission と呼ばれる Site Isolation アーキテクチャを導入するプロジェクト](https://blog.mozilla.org/security/2021/05/18/introducing-site-isolation-in-firefox/)が進められていますが、標準技術をベースに構築されるウェブが、特定のアーキテクチャを前提として安全性を保証するわけにはいきません。

そこで登場するのが本題となる、ブラウザのアーキテクチャに依存せず、cross-origin なリソースを別プロセスに回すなど、適切にハンドリングすることをブラウザに要求する HTTP レスポンスヘッダーたちです。

## Spectre による攻撃を未然に防ぐ

Spectre による攻撃を防ぐには、あなたの origin にあるリソースが、悪意ある origin と同じプロセスに取り込まれる前に止める必要があります。ブラウザのネットワークプロセスが HTTP レスポンスヘッダーを見ることで、悪意ある origin のレンダラープロセスに渡す前にブロックしたり、別のレンダラープロセスに渡したりすることができます。

Chrome の Task Manager を開くと、Process ID のグループ分けからどういう単位でプロセスが分けられているかがわかります。

追加すべき HTTP レスポンスヘッダーは次の 4 組です。

* `Cross-Origin-Resource-Policy`
* `X-Frame-Options: DENY` または CSP `frame-ancestors`
* `Cross-Origin-Opener-Policy: same-origin-allow-popups`
* `Content-Type` および `X-Content-Type-Options: nosniff`

### `Cross-Origin-Resource-Policy` (CORP) でリソースの埋め込みを制御する

画像や動画、音声、スクリプト、API 経由の JSON など、リソースのロードを `same-origin`、`same-site` に許可する、もしくは `cross-site` でどこからでも許可することができます。例えば、`https://images.example.com` にホストされている画像にそれぞれのヘッダーを追加した場合の挙動は以下の通りです:

```http
Cross-Origin-Resource-Policy: same-origin
```

この画像は same-origin である `https://images.example.com` から配信された HTML ドキュメントからしか読み込むことはできません。

```http
Cross-Origin-Resource-Policy: same-site
```

この画像は same-site である `example.com` を含むドメイン、例えば `https://www.example.com` からでも読み込むことができますが、その他の eTLD+1、例えば `https://site.example` からは読み込むことはできません。

```http
Cross-Origin-Resource-Policy: cross-site
```

デフォルトである `cross-site` が指定された画像は `https://images.example.com` や `example.com` に限らず、どの origin からでも読み込むことができます。

これらのヘッダーはこちらの[デモ](https://first-party-test.glitch.me/corp)から試してみることができます。DevTools を開いて `Cross-Origin-Resource-Policy` ヘッダーがどういう影響を与えるか確認してみてください。

[CORP](https://caniuse.com/mdn-http_headers_cross-origin-resource-policy) は Chrome, Firefox, Safari ですでにサポートされています。

{% Aside %}

勘違いして欲しくないのは、CORP がリソースのサーブを止めるわけではないという点です。サーバーにおける ACL (Access Control List) とは異なりますので、CORP に対応していないブラウザや、別のサーバー、ブラウザではない HTTP クライアントからのリクエストでリソースをサーブするかどうか決めるものではないので、ご注意ください。

また、CORS は CORP に似ていますが、条件をより細かく判断できる点、リクエスト元 (Origin) によってはサーブしないこともできる ([Preflight Request](https://developer.mozilla.org/docs/Glossary/Preflight_request)) 点などが異なります。

{% endAside %}

なお、通常公開されているリソースは盗まれても困ることはありません。困るのは、認証済みの時にサーブされる情報であり、多くの場合サードパーティー Cookie を必要とするリソース、ということになります。それならば、[適切な `SameSite` 属性を設定しておけば](https://web.dev/i18n/ja/samesite-cookies-explained/)、たとえ Spectre の罠にハマっても、認証済みのリクエストが送られることはありません。

幸いなことに Chrome や Edge の Cookie は `SameSite` 属性のデフォルトは `Lax` になっています。むやみに `SameSite` を `None` に設定してしまったサービスの担当者の方は、CORP ヘッダー導入と合わせて、今一度設定の見直しをおすすめします。

### `X-Frame-Options` または CSP `frame-ancestors` でドキュメントの iframe 埋め込みを制御する

2021 年 10 月現在、すべてのブラウザは HTML ドキュメントの iframe への埋め込みをデフォルトで許可しています。それを防ぐにはリソースの提供者が適切な設定を行う必要があります。

cross-origin なサイトを iframe にロードするのを防ぐには、`X-Frame-Options` ヘッダーを使って完全にブロックするか、CSP (Content Security Policy) ヘッダーの `frame-ancestors` ディレクティブを使って、埋め込みを許可する origin を明示します。

```http
X-Frame-Options: DENY
```

`DENY` が指定された HTML ドキュメントは親ページの origin に関わらず iframe にロードされません。

```http
Content-Security-Policy: frame-ancestors 'self' https://www.example.com;
```

上記の CSP が指定された HTML ドキュメントは、親ページの origin が自分と同じか、`https://www.example.com` でない限り iframe にロードされません。

iframe にロードされる前提がないドキュメントはすべて `X-Frame-Options: DENY` を付けるのがおすすめです。

[`X-Frame-Options`](https://caniuse.com/mdn-http_headers_csp_content-security-policy_frame-ancestors)、[CSP `frame-ancestors`](https://caniuse.com/mdn-http_headers_csp_content-security-policy_frame-ancestors) ともに、Chrome, Firefox, Safari ですでにサポートされています。

### `Cross-Origin-Opener-Policy` (COOP) でウィンドウ間のコミュニケーションを制御する

`window.open()` を使って開かれたウィンドウ同士は、`postMessage()` を使ってコミュニケーションする手段があります。この場合、ブラウザは cross-origin であっても同じプロセスに展開されるため、Spectre 攻撃の対象となります。

`Cross-Origin-Opener-Policy` (COOP) ヘッダーを使うと、cross-origin なウィンドウを開いた時にプロセスを別にして、安全性を確保することが可能です。ただしその場合、`postMessage()` を使ったコミュニケーションは行えなくなる点にご注意ください。

```http
Cross-Origin-Opener-Policy: same-origin
```

`same-origin` を指定すると、cross-origin の popup ウィンドウを自分で開いた場合も、cross-origin のウィンドウから自分の origin のドキュメントが開かれてしまった場合でも別プロセスになるため、コミュニケーションはできません。

```http
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

`same-origin-allow-popups` は cross-origin のウィンドウから開かれた場合はプロセスを分けますが、自分で cross-origin のウィンドウを開いた場合は分けません。(ただし、cross-origin のウィンドウが COOP を指定していないか、`unsafe-none` を指定している必要があります。)

```http
Cross-Origin-Opener-Policy: unsafe-none
```

`unsafe-none` はデフォルトで、cross-origin のウィンドウを開いた場合でも、逆から開かれた場合でも、プロセスを分けなくてよいことを明示することができます。(ただし、cross-origin のウィンドウが COOP を指定していないか、`unsafe-none` を指定している必要があります。)

これらのヘッダーはこちらの[デモ](https://first-party-test.glitch.me/coop)から試してみることができます。

{% Aside %}

`Cross-Origin-Opener-Policy: same-origin` と似たものに `a[rel="noopener"]` があります。これは `<a target="_blank">` タグで開かれた新しいウィンドウが、デフォルトでは同じプロセスで開かれるため発生する Spectre のリスクを回避する意味も持ちます。幸いなことに、現在では [Chrome](https://www.chromestatus.com/feature/6140064063029248) でも、[Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1503681) でも [Safari](https://bugs.webkit.org/show_bug.cgi?id=190481) でも `rel="noopener"` がデフォルトに変更されたため、気にしなくても良くなりました。逆に `Cross-Origin-Opener-Policy: unsafe-none` と同じ状態にするには `rel="opener"` を指定します。

参考: [リンクのへの rel=noopener 付与による Tabnabbing 対策 | blog.jxck.io](https://blog.jxck.io/entries/2016-06-12/noopener.html)

{% endAside %}

COOP はこのように、cross-origin なウィンドウからの Spectre を使った攻撃から自分のサイトを守れる一方、cross-origin なウィンドウを開く前提の機能、例えば OAuth や支払い系の機能を使う前提のページにおいては、注意が必要です。すべての HTML ドキュメントは `Cross-Origin-Opener-Policy: same-origin-allow-popups` を付けることをおすすめします。(デバッグ方法などは [Making your website "cross-origin isolated" using COOP and COEP // Debug issues using Chrome DevTools](https://web.dev/coop-coep/#debug-issues-using-chrome-devtools) を参考にしてください)

[COOP](https://caniuse.com/mdn-http_headers_cross-origin-opener-policy) はすでに Chrome、Firefox でサポートされ、[Safari でも近々サポートされる予定 (2021 年 10 月現在) のようです](https://webkit.org/blog/11962/release-notes-for-safari-technology-preview-131/)。

### `X-Content-Type-Options: nosniff` で悪意のある cross-origin な読み込みからリソースを守る

ブラウザによっては、`Content-Type` が設定されていても、リソースの内容から自動的に MIME-Type を変更してページにロードしてしまうことがあり、脆弱性として知られていました。これを応用して同じページのプロセスにリソースを読み込む手段として使うことができるため、Spectre を使った攻撃に応用できてしまいます。`X-Content-Type-Options: nosniff` を指定すれば、ブラウザのこの動作を防止することができます。適切な `Content-Type` ヘッダーの指定と、`X-Content-Type-Options: nosniff` は欠かさないようにしてください。

```http
X-Content-Type-Options: nosniff
```

`X-Content-Type-Options` は IE を含むすべてのブラウザで利用することができます。

## 未来の話

今回の記事では複雑な話をできるだけ分かりやすくまとめたつもりですが、すべてのウェブ開発者のみなさんがこれらを理解し、ヘッダーを実装するのは現実的ではないように思います。ブラウザが勝手にやってくれたらありがたいですよね。しかしそれは、今デフォルトの動作を、全く逆にするということを意味します。つまり:

* cross-origin な HTML ドキュメントはデフォルトで埋め込めないようにする = `X-Frame-Options: DENY`をデフォルトにする。
* cross-origin な popup ウィンドウとはデフォルトでコミュニケーションできないようにする = `Cross-Origin-Opener-Policy: same-origin-allow-popups` をデフォルトにする。

Chrome チームではこれを実現できるよう準備を進めていますが、これまでとデフォルトを真逆にするというのは、破壊的な変更となります。これがウェブをより安全な場所にしていくために避けて通れない道であることはもうおわかりかと思いますが、少しでも多くの開発者のみなさんがこのことを理解し、すこしずつ準備を進めていただければと思います。

また、この記事で解説した内容は 2021 年の Google I/O でセッションビデオとして公開しています。日本語字幕も付いていますので、ぜひご覧ください。

{% YouTube 'J6BZ9IQELNA' %}

{% Aside %}

この記事では Spectre に関連したいくつかの HTTP ヘッダーについて触れましたが、他にもいくつか重要なものがあります。英語ですが、こちらのページにまとめています。ぜひ参考にしてください。

* [Security headers quick reference](https://web.dev/security-headers/)

{% endAside %}

※ 本記事のイラストは [@kosamari](https://twitter.com/kosamari) が書いてくれました。
