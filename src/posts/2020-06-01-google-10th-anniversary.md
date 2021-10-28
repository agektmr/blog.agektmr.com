---
layout: post
title: 'Google に入社して 10 年が経った'
date: 2020-06-01
image:
  feature: 2020/10th-anniversary.jpg
tags:
- Google
- Developer Advocate
---
Developer Advocate という技術啓蒙の担当者として Google に入社して今日でちょうど
10 年が経った。技術以外のことについてはめったにブログを書くことはないのだけど、
良い節目なのでこの機会に記録を残しておきたい。

<!-- excerpt -->

## Google 入社のきっかけ

「インターネットにアイデンティティのレイヤーを作り、インターネット全体をオープン
なソーシャルネットワークの基盤にしたい」これが僕が前職で持っていた野望だった。そ
の一歩として、その会社で運営していたポータルサイト全体をソーシャルプラットフォー
ム化するというアイディアが採用され進める中で、OpenSocial という Google が中心と
して進めていた技術に取り組んでいた。日本語の情報が少ない分野だったためブログを書
いたり、コミュニティ運営や技術講演をしていたら、当時 (今もだけど) 仲良くしても
らっていた[田中洋一郎さん](https://twitter.com/yoichiro)に [Google API Expert
(現 Google Developer Expert)](https://developers.google.com/community/experts)
に推薦してもらった。その数年後に、Google の担当者から社員にならないかと誘われ
た。

入社当初は Chrome DevRel (Chrome Developer Relations) というチームで、Chrome を
中心としたウェブ技術の啓蒙を仕事にスタートした。今はチームの方針で「Chrome」では
なく「ウェブ」のアドボケートになってはいるが、組織改変などの紆余曲折も経つつ、10
年間、ほぼ同じチームで同じような仕事を続けている。

## 最近のお仕事

以前 [Developer Advocate がどんな仕事をしてるかの記事を書い
た](/2013/04/google-developer-advocate.html)。当時は日本のウェブに貢献する仕事が
多かったが、今はグローバルかつ技術的な仕事に比重を置いている。日本にはかなり大き
い Chrome のエンジニアリングチームがあるが、たまたま自分の取り組んでいるプロジェ
クトに関わるエンジニアが誰も日本におらず、基本的には北米かヨーロッパの人と仕事し
ている (最近久しぶりに東京のエンジニアと仕事する機会に恵まれたが、安心感が全然違
う)。ちなみに上司が日本にいたことも実は一度もない。

せっかくの機会なので最近で自分がどんな仕事をしているのかまとめておく。

### ウェブ標準化のお手伝い

HTML5 以降、ブラウザがカバーする技術分野はオーディオ系、グラフィック系、ハード
ウェア系、通信系など、専門分野に分けないと追いつかないくらい裾野が広がってきた。
その中でも認証系と支払い系の技術を担当している。

大分ブランクは空いたが、認証系技術は自分のこれまでの知識が大いに生かされる分野で
あり、元々興味があるので相性はいい。キーワードで言うと [Credential Management
API](https://developers.google.com/web/updates/2016/04/credential-management-api)、
[FIDO / WebAuthn](https://developers.google.com/identity/fido/)、[Web
OTP](https://web.dev/web-otp/)、[WebID](https://github.com/samuelgoto/webid) な
どが最近関わったプロジェクトだ。特に WebID は、これからのプロジェクトだが、自分
が元々持っていた野望の延長線上にあるので、この仕事に関われることに非常に興奮して
いる。

支払い系技術は、初めた当初こそ完全に門外漢だったが、最近は大分知識も蓄えられてき
た。ウェブ技術のキーワードで言うと [Web Payments](https://g.co/dev/WebPayments/)
のみだが、既存の決済技術やレギュレーションなど、ウェブの世界とはかなり離れた部分
の知識が必要とされるため、特殊な分野とも言える。

ただ、認証系分野と支払い系分野は技術的に共通点が多いため、両方やっていてよかった
と思う機会は多い。特にサードパーティー Cookie など、今後プライバシーに関わる技術
については大きく変わっていくことが予想され、その 2 つを跨いだ知識を持っているお
かげで他の人の役に立てる場面は少なくない。 仕様策定自体に直接関わることとは距離
を置いているが、そういった知識を生かしてアイディアを出したり、アドバイスをするこ
とは実際ある (ちなみに仕様策定は [GitHub でオープンに行われてい
る](https://github.com/w3c/)ので、意見を言うこと自体は誰でもできる)。

仕事のアウトプットとしては、ウェブ標準に提案する技術仕様などの一次情報を咀嚼し、
二次情報を作っている、というのが一番分かり易いかもしれない。作るものは外部ウェブ
開発者がすぐに内容を理解し、消化・活用できるコンテンツ。文章はもちろん、デモや
コードラボ、ビデオ、講演、必要であれば外部開発者の人と事例を作ったりもする。この
辺りは昔からあまり変わらない。もちろんコンテンツ自体が役に立つことを目指している
が、他の人がさらに分かりやすいコンテンツやデモを作ってくれることを期待している部
分もある。これはこの仕事の面白さの一つでもある。

### Google 公式サイトでの技術記事の執筆

今担当しているチームでは、いくつか公式の情報の出し先がある。

* [web.dev](https://web.dev): 現時点でメインの情報サイト。極力ブラウザニュートラ
  ルな情報発信を心がけてコンテンツが作られている。ブログだけでなく、まとまった学
  習コンテンツなども配信している。すでに数本記事を書いているが、最近公開したばか
  りの [`/payments`](https://web.dev/payments/) のセクションに加え、今後新しく
  `/identity` セクションを作る話も進めている。([過去に書いた記
  事](https://web.dev/authors/agektmr/))
* [Web Fundamentals](https://developers.google.com/web/): 徐々に web.dev に移行
  が進められているものの、過去数年分の情報が蓄積されている情報サイト。Chrome 特
  有の情報は未だにここに出される傾向がある。([過去に書いた記
  事](https://developers.google.com/web/resources/contributors/agektmr))
* [Dev Channel](https://medium.com/dev-channel): 準公式な位置付けの Medium。同じ
  チームの人たちが、お仕事としてではなく、半分趣味のような感じで書いたブログ記事
  がアグリゲートされている。([過去に書いた記事](https://medium.com/@agektmr))

最近書いた主な記事など:

* [Your First WebAuthn
  (Codelab)](https://codelabs.developers.google.com/codelabs/webauthn-reauth/):
  WebAuthn を使って生体認証でログインを実現したい人のためのコードラボ
* [Verify phone numbers on the web with the Web OTP
  API](https://web.dev/web-otp/): SMS (など) で取得した OTP をブラウザに自動で取
  得させる機能
* [Making your website "cross-origin isolated" using COOP and
  COEP](https://web.dev/coop-coep/): オリジンを跨いだ情報漏えいを防ぐセキュリ
  ティ機能の実装方法
* [Why you need "cross-origin isolated" for powerful
  features](https://web.dev/why-coop-coep/): 上記 COOP+COEP の解説
* [Understanding "same-site" and
  "same-origin"](https://web.dev/same-site-same-origin/): same-site と
  same-origin がどう違うかの解説
* [Web Payments](https://web.dev/payments/): 新しい Web Payments のドキュメント
  セット。今後記事をどんどん増やしていく

### 講演

ここ数年は Google I/O や Chrome Dev Summit など、Google 公式のイベントで登壇する
機会が多い。

{% YouTube 'NJ-sphu2DqQ' %}

{% YouTube 'DBBFK7bvEQo' %}

{% YouTube 'kGGMgEfSzMw' %}

{% YouTube 'WxXF17k1dko' %}

## 次の 10 年に向けて

スマートフォンの普及とともにブラウザがあらゆる層に浸透し、ウェブはもはや社会のイ
ンフラになった。電気やガス、水道、電話、インターネット回線がそうであるように、ブ
ラウザを含めたウェブという仕組みは我々の生活を構成する要素といっても過言ではな
い。ソフトウェアが世界の変化のスピードを速めてきたのと同様、ウェブはその流動性を
生かして世の中の変化をさらに速めている。

ウェブは誰の持ち物でもない。例え Google や Apple、Mozilla が消滅しても、人類の英
知として今後長く人間の生活を豊かにしてくれるだろう。しかし、ウェブは標準仕様が存
在するだけでは意味をなさない。誰かがその上でコンテンツやサービスを作ることで、初
めて社会のインフラとしての役割を果たす。誰が作るのか？誰でも作れる。誰の許可もな
く自由にコンテンツを作り提供できるプラットフォーム、それがウェブである。

自分の仕事は、ウェブ開発者が標準技術をうまく活用し、世の中をより良くするコンテン
ツやサービスを作る手伝いをすることだと考えている。そんなエコシステム作りを心がけ
て今後も仕事を続けていきたい。
