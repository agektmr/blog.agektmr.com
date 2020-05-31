---
layout: post
title: 'Google に入社して 10 年が経った'
description: 'Google '
date: "2020-06-01"
categories:
- Google
tags:
- Google
- Developer Advocate
---
Developer Advocate という技術啓蒙の担当者として Google に入社して 10 年が経った。技術以外のことについてはめったにブログを書くことはないのだけど、良い節目なのでこの機会に記録を残しておきたい。

<!-- excerpt -->

## Google 入社のきっかけ
「インターネットにアイデンティティのレイヤーを作り、インターネット全体をオープンなソーシャルネットワークの基盤にしたい」これが僕が前職で持っていた野望だった。会社で企画が採用され、ポータルサイト全体を SNS にする (僕はソーシャルプラットフォームのつもりだったのだけど) というプロジェクトを進める中で OpenSocial という Google が中心として進められていた技術に取り組んでいた。ブログを書いたり、コミュニティ運営や技術講演をしていたら、当時 (今もだけど) 仲良くしてもらっていた[田中洋一郎さん](https://twitter.com/yoichiro)に Google API Expert (現 Google Developer Expert) に誘ってもらった。その数年後に、Google の担当者から社員にならないかと誘われた。

入社当時は Chrome DevRel (Chrome Developer Relations) というチームで、Chrome を中心としたウェブ技術の啓蒙を仕事にスタートした。組織改変などの紆余曲折はありつつ、今はチームの方針で「Chrome」ではなく「ウェブ」のアドボゲートになってはいるが、10 年間、ほぼ同じチームで同じような仕事を続けている。

## 最近のお仕事
以前[アドボゲートがどんな仕事をしてるかの記事を書いたことがあった](/2013/04/google-developer-advocate.html)が、今は当時と比べるとグローバルな仕事をしている。せっかくの機会なので現時点で自分がどんな仕事をしているのかまとめておく。

### Chrome チームとの連携
日本にはかなり大きい Chrome のエンジニアリングチームがあるが、基本的には北米かヨーロッパの人と仕事しているので、リモートワークという意味では以前からずっとそんな感じ。コロナ以降家で仕事しているが、やってる内容はほとんど何も変わってない。

最近はチーム内でもそれぞれの専門分野がはっきりしている。HTML5 以降、ウェブがカバーする技術分野はオーディオ系、グラフィック系、ハードウェア系、通信系など、ブラウザでできることも、専門分野に分けていかないと追いつかないくらい裾野が広がっている。僕はその中でも認証系と支払い系の仕事をしている。

認証系技術は自分のこれまでの知識が大いに生かされる部分でもあるし、元々興味があるのでとてもやりがいを感じている。
支払い系技術は、初めた当初こそ完全に門外漢だったが、認証系技術と合わせて語られる場面が多く、技術的にも共通点が多いため、両方やっていてよかったと思う機会は多い。
特にサードパーティー Cookie など、プライバシーに関わる技術が多く使われているため、今後ウェブがどう変わっていくかを深く考えさせられる立場にあり、仕事の内容はとてもエキサイティングだと感じている。この分野に関われていることを誇りに思うし、そこに口を出していける立場として責任を感じている。まさに毎日、世界を変える仕事を目の当たりにしている。

具体的に何をしているかというと、Chrome のエンジニアの作った技術仕様などの一次情報を自分で咀嚼し、二次情報を作っている、というのが一番分かり易いかもしれない。作るものは外部ウェブ開発者が読んで内容を理解し、すぐに消化・活用できるもの。文章はもちろん、デモやコードラボ、ビデオ、講演、必要であれば外部開発者の人と事例を作ったりもする。もちろんこれ自体が役に立つことは重要なんだけど、これを読んだ人がさらに分かりやすいコンテンツやデモを作ってくれることを期待してやっている部分もある。

### Google 公式サイトでの技術記事の執筆
今担当しているチームでは、いくつか公式の情報の出し先がある。
- [web.dev](https://web.dev): 極力ブラウザニュートラルな情報発信を心がけてコンテンツが作られている情報サイト。ブログだけでなく、まとまった学習コンテンツなども配信している。すでに数本記事を書いているが ([過去に書いた記事](https://web.dev/authors/agektmr/))、今後も `/payments` のセクションと、今後 `/identity` のセクションも作る話も出ている。
- [Web Fundamentals](https://developers.google.com/web/): 徐々に web.dev に移行が進められているものの、過去数年分の情報が蓄積されている情報サイト。Chrome 特有の情報は未だにここに出される傾向がある。([過去に書いた記事](https://developers.google.com/web/resources/contributors/agektmr))
- [Dev Channel](https://medium.com/dev-channel): 準公式な位置付けの Medium。同じチームの人たちが、お仕事としてではなく、半分趣味のような感じで書いたブログ記事がアグリゲートされている。

最近書いた主な記事など:
- [Your First WebAuthn (Codelab)](https://codelabs.developers.google.com/codelabs/webauthn-reauth/)
- [Verify phone numbers on the web with the Web OTP API](https://web.dev/web-otp/)
- [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
- [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
- [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/)
- [Web Payments (4 articles and more to come)](https://web.dev/payments/)

### 講演
ここ最近は Google 公式のイベントで登壇することが多い。目立つ部分では Google I/O や Chrome Dev Summit など。

<div class="video-wrap">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/NJ-sphu2DqQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video-wrap">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/DBBFK7bvEQo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video-wrap">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kGGMgEfSzMw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<div class="video-wrap">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WxXF17k1dko" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## なぜ 10 年続いたのか
僕はウェブはもはや社会を構成するインフラであると考えている。電気やガス、水道、電話、インターネット回線がそうであるように、ブラウザを含めたウェブという仕組みは我々の世界を構成する要素の一部なのだ。そしてその仕組みは誰の持ち物でもない。ウェブを構成する標準仕様は例え Google や Mozilla が消滅しても人類の資産として残る。例え Android が消えてなくなっても、iOS が消えてなくなっても、ウェブは人類の英知として人間の生活を豊かにしてくれる。
標準化に関わるということは、社会を作り上げる基礎を固めるということでもある

そんなウェブを作る仕事に関われる機会は日本では決して多くない。
少なくとも自分は良くしていこうとしている
ウェブに本気で取り組んでいる人ばかり

もちろん仕事は楽なことばかりではない。正直に言ってしまうと、自分は歯を食いしばって仕事をしているという感覚を持つことすらある。講演の準備にしても記事の執筆にしても、未だに責任の重圧は消して軽いものではない。うまくやれるかどうか、失敗したらどうしようと、いつも不安でたまらない。

英語の記事を書くのは正直しんどい。日本語でもままならないのに、特にセキュリティの記事などはあらゆる方向から

## Developer Advocate という仕事について
英語は未だに苦労している。自分が満足に話せるようになることは永遠にないだろうということは分かりつつ、人を説得したり、分かりやすく説明するのは本当に難しい。
どれだけ触れたかももちろん重要だけど、それがどれだけ長時間継続しているかの方が重要なんじゃないかという気がしている。いつも感じることは、日本語と英語の切り替えにはかなりのパワーを要する。話す分量にもよるが、出張しても自分が英語モードに切り替わったなと思うのは大抵5日目以降なのだ。

社会に対する関わり方は色々あるが、デベロッパーアドボケートの役割は何か？
世の中は仕組みで回っている。アートなことはそれ以外の部分に回すとして、例えば言葉や時間、水道や道路など、社会を回す仕組みは気付かないところで至るところに存在する。よくできた仕組みほどみなその存在を忘れてしまう。
現存する最古のデベロッパーアドボケートです。

## これからのお話
Google に対する今後入社したいと考えてる人たちへの励まし

Google という会社のオープン性に憧れていた。世界最高峰の技術を持っており、自社の利益誘導のためばかりでなく、

(10 周年ということでブログのデザインを一新した。本当は Jekyll を 11ty に置き換えたかったが、思ったより手こずったのでひとまず Jekyll のまま公開する。)

