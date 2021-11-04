---
layout: post
title: 'SharedArrayBuffer と過渡期な cross-origin isolation の話'
description: 'Spectre 前提のウェブで、標準技術を使って `SharedArrayBuffer` や高精細タイマーをブラウザで有効にする cross-origin isolation と、その課題および現時点での対応策について解説します。'
date: 2021-11-04
image:
  feature: /2021/require-corp.png
tags:
- Security
- Cross-origin isolation
- SharedArrayBuffer
- Spectre
---

長い記事なので先に結論を書きます。

Chrome および Firefox で `SharedArrayBuffer` や高精細タイマーが使えるようになりました。Safari もまもなくです。そのためには cross-origin isolation という状態を有効にするのですが、親となる HTML ドキュメントに下記 2 つのヘッダーを送ります。

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

ただ、これを有効にするには様々な条件と制約が存在し、現段階では多くのサイトは苦戦するでしょう。とりあえず従来通り Chrome で動けばいいやということであれば、[デプリケーショントライアル (Deprecation Trial)](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) に登録してしばらく様子を見る、という選択肢が無難かもしれません。

<!-- excerpt -->

## Spectre の脅威とブラウザの採った対策、そして Site Isolation

[前回の記事](/2021/11/browser-security.html)では、Spectre の脅威として、同じプロセスの扱うメモリ空間を推察することで cross-origin に読み込まれたリソースが危険に晒されることを説明しました。各ブラウザはその対策として `SharedArrayBuffer` を無効にしたり、高精細タイマーの精度を下げるなどしてリスクを緩和したこと、一部のブラウザは Site Isolation というアーキテクチャを導入することで抜本的な対策を実現したこと、標準化された機能を使うことで cross-origin なページによる攻撃からリソースを分離して、安全性を確保できることを書きました。具体的には、CORP, `X-Content-Type-Options`, `X-Frame-Options`, CSP `frame-ancestors`, COOP といった各種 HTTP ヘッダーを用いることで、レンダラプロセスに渡る前にリソースを守ります。

Site Isolation を採用したブラウザは再び `SharedArrayBuffer` や高精細タイマーが再度利用できるようになりましたが、例えすべてのブラウザが Site Isolation に対応したとして、アーキテクチャに依存してそれらの機能が使えたり使えなかったりするのは、ウェブにとって健全なことと言えるでしょうか？

そこで登場するのが **cross-origin isolation** です。これは、いくつかの HTTP ヘッダーを組み合わせることで、ブラウザが他の origin から完全に切り離された安全な環境である (cross-origin isolated) と判断した状態のことで、`SharedArrayBuffer` や高精細タイマーなどを有効にします。

この記事では、そんな cross-origin isolation を有効にする方法とその課題、次のステップについて解説します。

## Cross-origin isolated な環境では何が可能なのか

Cross-origin isolation を有効にすると、下記のことが可能になります:

* [`SharedArrayBuffer` が使えるようになる (Wasm Thread が使えるようになる)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/Planned_changes)
* [`performance.measureUserAgentSpecificMemory()` が使えるようになる](https://web.dev/monitor-total-page-memory-usage/)
* [`performance.now()` および `performance.timeOrigin` の精度が上がる](https://developer.chrome.com/blog/cross-origin-isolated-hr-timers/)

Chrome ではしばらくの間 Site Isolation を導入することで `SharedArrayBuffer` や高精細タイマーを使えるようにしていましたが、[Chrome 92 よりその前提を外し (他のブラウザと同じ条件に変更し)、cross-origin isolated な状態であることを条件とするように変更されました](https://developer.chrome.com/blog/enabling-shared-array-buffer/)(その節は[たいへんお騒がせしました](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja))。

## 標準化された技術を使って cross-origin isolation を有効にする

ウェブページが他の origin から完全に切り離された安全な環境である cross-origin isolation を有効にするには、現時点で 2 つの条件があります。

### 条件 1. HTML ドキュメントが `Cross-Origin-Opener-Policy: same-origin` ヘッダーを送っている

ブラウザは `window.open()` で新しいウィンドウを開く際、`postMessage()` などを使ったコミュニケーションを維持するため、cross-origin であっても同じプロセスを使います。[前回の記事](/2021/11/browser-security.html#cross-origin-opener-policy-(coop)-%E3%81%A7%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E9%96%93%E3%81%AE%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B)では COOP ヘッダーを使うことでプロセスを分け、Spectre の脅威を回避できる手段をご紹介しました。`COOP: same-origin` と設定した場合、開かれたウィンドウが same-origin でない限り別プロセスになるため、安全性を担保できます。

```http
Cross-Origin-Opener-Policy: same-origin
```

{% Aside %}

ただ、これは相互に `postMessage()` を使ったコミュニケーションができなくなる点に注意しなければなりません。

{% endAside %}

これが cross-origin isolation を有効にするための条件 1 です。

### 条件 2. HTML ドキュメントが `Cross-Origin-Embedder-Policy: require-corp` ヘッダーを送っている

前回の記事では出てこなかったヘッダー `Cross-Origin-Embedder-Policy` (COEP) は、それ自体安全性のために用意されたものではありません。**COEP は許可されていないリソースの埋め込みをすべて排除することで危険に晒されるリソースをなくし、cross-origin isolation を実現する**ためのものです。`COEP: require-corp` を指定すると、明示的にこのページに読み込まれることを CORS または CORP で許可しているリソース以外は、すべてブロックされます。

```http
Cross-Origin-Embedder-Policy: require-corp
```

これが cross-origin isolation を有効にするための条件 2 です。

![COEP: require-corp](/images/2021/require-corp.png)

### cross-origin isolated かどうかを確認する

上記 2 つのヘッダーを送っている状態のウェブページが cross-origin isolated な状態になっているかどうかは `self.crossOriginIsolated` で確認することができます。`true` を返せば cross-origin isolated、`false` を返せば否です。

```js
if (self.crossOriginIsolated) {
  // The environment is cross-origin isolated.
} else {
  // The environment is NOT cross-origin isolated.
}
```

Cross-origin isolation は[こちらのデモ](https://first-party-test.glitch.me/)から試すことができます。

## リソースがブロックされてしまう！？

ここで終われば話は非常に簡単なのですが、難しいのはここからです。実際に cross-origin isolation を試してみた方はお気付きと思いますが、これだけでは普通のウェブサイトは完全にぶっ壊れます。なぜなら、特別な手当てをしていない cross-origin なリソースはすべてブロックされてしまうからです。cross-origin または same-site かつ cross-origin なリソースを読み込むには、明示的に CORS もしくは CORP を設定して、cross-origin からロードされても問題ないことを示す必要があります。

{% Aside %}

参考：[same-site/cross-site, same-origin/cross-origin をちゃんと理解する](https://zenn.dev/agektmr/articles/f8dcd345a88c97)

{% endAside %}

### リソースに CORS もしくは `Cross-Origin-Resource-Policy` ヘッダーを付与する

(ここで言う「リソース」はドキュメントや画像、動画、フォント、スクリプト、スタイルなど、HTML ドキュメントから読み込み可能なものすべてを指します。)

[前回の記事でご紹介したように](/2021/11/browser-security.html#cross-origin-resource-policy-(corp)-%E3%81%A7%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B)、CORP はリソースが、`same-origin` なら same-origin からのみ、`same-site` なら same-site からのみ、`cross-origin` ならどんな origin からであっても、リソースがロードが可能であることを示します。

例えば `https://www.example.com` が `COEP: require-corp` を送っている場合、ある画像がロードされる条件は CORS に対応している、もしくは:

* 同じ origin から配信されている場合は無条件にロードされる (`CORP: same-origin` が指定されていてもよい)。
* 同じ site (例: `https://images.example.com/image.png`) から配信されている場合は `CORP: same-site` もしくは `CORP: cross-origin` があればロードされる。それ以外はブロック。
* 全く別の site から配信されている場合は、`CORP: cross-origin` であればロードされる。それ以外はブロック。

```http
Cross-Origin-Resource-Policy: cross-origin
```

CORS を使う場合は、リソースの読み込みでそれを要求する必要があります。具体的には、例えば `<img>` タグに `crossorigin` 属性を付けることで、CORS リクエストを送ることができます。

```html
<img src="***/image.png" crossorigin>
```

[`crossorigin` 属性は `<audio>`, `<img>`, `<link>`, `<script>`, `<video>` タグに追加することができます](https://developer.mozilla.org/docs/Web/HTML/Attributes/crossorigin)

COEP と CORS/CORP を組み合わせた動作はこちらの[デモ](https://first-party-test.glitch.me/coep)から試すことができます。

### iframe に読み込む HTML ドキュメントには COEP も追加する

iframe に読み込まれる HTML ドキュメントも cross-origin であれば Spectre の脅威に晒されるということは[前回の記事でも書きました](/2021/11/browser-security.html#x-frame-options-%E3%81%BE%E3%81%9F%E3%81%AF-csp-frame-ancestors-%E3%81%A7%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE-iframe-%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B)。では、その cross-origin な HTML ドキュメントがさらに cross-origin なリソースやドキュメントを読み込んでいる場合どうなるのでしょう？

実は、再帰的に要件を満たさなければ、すべてブロックされます。iframe を埋め込むためには、それ自体にも `COEP: require-corp` が必要になります。

まとめると、cross-origin isolated なページに cross-origin な HTML ドキュメントを iframe で埋め込む場合は、その iframe にロードされる HTML ドキュメントも: 

* `COEP: require-corp` であること
* `CORP: cross-origin` であること (same-site / cross-origin なら `CORP: same-site` でも可)

となります。

{% Aside %}

* この時 iframe 内の `self.crossOriginIsolated` は `false` になりますが、iframe タグに `allow="cross-origin-isolated"` を指定することで `true` にして、`SharedArrayBuffer` などを利用することができるようになります。
* iframe 内だけ cross-origin isolation を有効にしたいというケースもあるかもしれませんが、残念ながらそれをする方法はありません。同じページ内に存在するすべてのフレームが一番親であるフレームの cross-origin isolation の一部になっている必要があります。

{% endAside %}

iframe についても、こちらの[デモ](https://first-party-test.glitch.me/coep)から試すことができます。

{% Aside %}

ここまでの内容はすでに Chrome, Edge, Firefox が対応し、[Safari もまもなく対応する](https://webkit.org/blog/11975/release-notes-for-safari-technology-preview-133/)ようです。

{% endAside %}

## Cross-origin isolation の課題とその対応策

上記したことを実行すれば `SharedArrayBuffer` などが利用できるようになることは分かりました。ただ、まだ課題は残ります。

* **課題 1. `COOP: same-origin` は OAuth や支払いなどの popup ウィンドウを使う連携を壊す。** 
`COOP: same-origin` の性質上、cross-origin なウィンドウを開いて通信を行う OAuth や支払い系によくある連携はできなくなってしまいます。
* **課題 2. CORS や `CORP: cross-origin` を指定しようにも、他社のリソースなので指定できない。**  
これも cross-origin isolation の典型的な問題です。

例えば Google から配信されているリソースの多くはすでに `CORP: cross-origin` に対応済みですが、上記のような課題から、cross-origin isolation に対応していないサービスも存在しています。例えば Google Ads は iframe を使って広告を配信していますが、iframe の中身を広告主が配信しているケースもあり、そのすべてに CORS や CORP の導入を求めるのは現実的ではないため、[対応しない意向を示しています](https://developers.google.com/publisher-tag/guides/cross-origin-embedder-policy)。

これらを踏まえ、Chrome では cross-origin isolation なしで `SharedArrayBuffer` を再び有効にする方法と、標準仕様の側から cross-origin isolation を有効にする条件を緩和しようという議論が進んでいます。

### Chrome で cross-origin isolation なしで `SharedArrayBuffer` を有効にする

Chrome は元々 Site Isolation というアーキテクチャに対応しており、cross-origin isolation に移行したのは他のブラウザと足並みを揃えるためである、と説明しました。ただ、上記のような問題から、cross-origin isolation に対応しないでも `SharedArrayBuffer` を継続して利用する選択肢も用意されています。[デプリケーショントライアル (Deprecation Trial)](https://developer.chrome.com/ja/blog/origin-trials/#deprecation-trials) という仕組みを適用することで、少なくともこの後述べる改善策が準備されるまでの間は、引き続き `SharedArrayBuffer` を従来通り利用することができます。

{% Aside %}

参考: [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)

2021 年 11 月現在、Chrome 103 までこのデプリケーショントライアルで回避できると書いてありますが、下記の改善策の導入が間に合わなければ、延長される可能性があります。延長されるかどうかは Origin Trial に申し込んでいればメールでお知らせされると思いますが、(このブログ記事が更新されないとしても) 上記のブログポストを更新します。

{% endAside %}

デプリケーショントライアルに登録するには、[こちらから origin を指定して申し込み](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481)、発行されたトークンをサイトの `Origin-Trial` ヘッダーもしくは `<meta>` タグで配信します。詳しくは、ちょうど日本語に翻訳済みの [Chrome のオリジントライアル入門](https://developer.chrome.com/ja/blog/origin-trials/)をご覧ください。

### Cross-origin isolation の条件を緩和する

標準化の面からも、cross-origin isolation をより柔軟にする取り組みが行われています。そのために提案されている仕様を紹介します。

#### `COEP: credentialless`

他サービスの提供するリソースに CORS や CORP の対応を求めるのは難しいというのが課題ですが、そもそもそれは必要なことでしょうか？リソースの多くは画像やスタイル、フォントなどのリソースであり、インターネットに公開されたものです。それらは URL さえ分かれば誰でもダウンロードできるはずで、守るのであれば認証を挟むべきです。

それならば、COEP のモードとして CORS や CORP を必須とするのではなく、認証しないでリクエストする前提のモードを作ってしまえばいいのではないか、ということで考え出されたのが `COEP: credentialless` です。

```http
Cross-Origin-Embedder-Policy: credentialless
```

`COEP: credentialless` を使うと、サーバーへのリクエストから Cookie、クライアント認証、Authorization ヘッダーといった認証方法が省かれます。これにより、サードパーティーリソースを危険に晒すことなく cross-origin isolation を有効化できる、というわけです。

{% Aside %}

`COEP: credentialless` の時でも、`crossorigin` 属性を付加するなどしてリクエストすることで、明示的に認証情報を送ることもできます。

参考: [Load cross-origin resources without CORP headers using `COEP: credentialless`](https://developer.chrome.com/blog/coep-credentialless-origin-trial/)

{% endAside %}

Chrome のみ、96 から利用が可能です。

![COEP: credentialless](/images/2021/credentialless.png)

#### anonymous iframe

同様の考え方で、iframe についても認証情報を送らないことでサードパーティーリソースを危険に晒さない [anonymous iframe という方法が検討中](https://github.com/camillelamy/explainers/blob/master/anonymous_iframes.md)ですが、iframe 関連はブラウザのアーキテクチャ的に複雑なため、仕様も含めて目下開発中です。

#### `COOP: same-origin-allow-popups-plus-coep`

`COOP: same-origin` を使うことで OAuth や支払いなどの popup ウィンドウを使った連携が壊れるという件についても、緩和策が検討されています。`COOP: same-origin-allow-popups` を使った場合なら、自分の origin から開いたウィンドウとはコミュニケーションできるので、これを cross-origin isolation の条件にした方がいいのではないか、というアイディアです。

そのための専用モードとして [`COOP: same-origin-allow-popups-plus-coep` が検討されています](https://github.com/camillelamy/explainers/blob/master/coi-with-popups.md)が、まだ検討初期段階にあります。

## まとめ

この記事ではブラウザで cross-origin isolation を有効にして `SharedArrayBuffer` や高精細タイマーを使う方法を解説してきましたが、考えることが多くてとても複雑です。

今すぐにでも Firefox や Safari でも動作させたいということであれば、cross-origin なリソースの連携をある程度諦めて cross-origin isolation を有効にするという選択肢もありそうですが、とりあえず従来通り Chrome で動けばいいやということであれば、[デプリケーショントライアル](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) に登録してしばらく様子を見る、というのが今は得策と言えます。

最後に、11 月 17 日に [Chrome Dev Summit](https://goo.gle/cds2021) の一部として、この Spectre から Site Isolation、cross-origin isolation までの流れについて解説する 1 時間程度のワークショップを行います。

* [Gain security and powerful features with cross-origin isolation](https://developer.chrome.com/devsummit/events/week-2/workshops/gain-security-powerful-features-cross-origin-isolation/)

何か相談ごとがある方はぜひご参加ください (基本的に英語のセッションですが、他の参加者の様子次第では日本語で質疑できるかも・・・)。

### 参考記事

* [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
* [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
* [クロスオリジンアイソレーションを有効にするためのガイド](https://web.dev/i18n/ja/cross-origin-isolation-guide/)
* [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)
* [SharedArrayBuffer オブジェクトに関するメッセージについての説明](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja)
* [Chrome 92以降のSharedArrayBuffer警告に対するZOZOTOWNが実施した調査と解決策](https://techblog.zozo.com/entry/zozotown-shared-array-buffer)
