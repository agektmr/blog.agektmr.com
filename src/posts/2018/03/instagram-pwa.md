---
layout: post
title: '結局 PWA は来るの？来ないの？'
description: '「PWAが来るって言っているエンジニアは今すぐ辞めろ」に対するアンサーソングです'
date: 2018-03-23
tags:
- PWA
- Progressive Web Apps
---

昨日 Twitter でこんな記事を発見しました。

[PWA が来るって言っているエンジニアは今すぐ辞めろ](https://anond.hatelabo.jp/20180321171652)

「instagram の PWA が最高〜！ネイティブと見分けつかない！！とかほざいているグー○ルのエバンジェリストだかエンジニアが騒いでいたので触ってみたのだが、オワコンであった。」

もしかしてこれのことかな？

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Instagram PWA is sooooooo impressive. I probably won&#39;t be able to distinguish it with its native app.<br>InstagramのPWAが、デキが良すぎて感動してる。ネイティブアプリと見分けられる自信ない。 <a href="https://t.co/DS8TfceBZ6">pic.twitter.com/DS8TfceBZ6</a></p>&mdash; Eiji Kitamura / えーじ (@agektmr) <a href="https://twitter.com/agektmr/status/956865567528374273?ref_src=twsrc%5Etfw">2018年1月26日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

確かに、この言い方は若干煽り気味のところがあったかもしれません。しかし、Instagram の PWA について、スクロールの快適さ、投稿時にフィルターがかけられる点など、「ネイティブと見分けられる自信がない」のは、初めて使った時の僕の率直な感想ですし、今でも快適に使っています。

ただ、このツイートをした時点ですべての機能を試したわけではなかったし、後から気付いた違いもありました。勘違いしないでもらいたいのは、もちろん、だからネイティブアプリは不要だなんて言うつもりはないということです。むしろせっかくなので、この機会にもう少し PWA について説明しましょう。

<!-- excerpt -->

## PWA とは何か

この記事を読むくらいであればすでにご存知の方は多いと思いますが、PWA は Progressive Web Apps の略で、日本語ではプログレッシブウェブアプリと表記します。PWA については、3 年前から話しているので、基本的な理解からスタートしたい方は、ぜひこちらをお読みください。ちょっと長いですが、概要を把握する分には最初の方だけで十分だと思います。

**[プログレッシブウェブアプリ詳解 - 過去・現在・未来](https://html5experts.jp/agektmr/20527/)**

ここにも書かれているように、PWA はウェブの最新技術を分かりやすくフレーミングした言葉に過ぎません。JavaScript や CSS もひっくるめて「HTML5」と呼んでいたムーブメントに近いものです。件の匿名投稿の冒頭に「PWA とかいう html5 のリブランドが」という部分がありましたが、これは実は技術者視点ではそんなに間違ったい理解ではありません。

どうも PWA というと、既存のウェブサイトを捨てて SPA (シングルページアプリケーション) として、ネイティブアプリとそっくりなものを新しく作り直さなければならないと考えてしまう人が多いようです。個人的にそういうのはチャレンジングで大好きだし (SPA の PWA の場合、[AppShell](https://developers.google.com/web/fundamentals/architecture/app-shell?hl=ja) というアプローチをおすすめしています)、[Instagram の PWA](https://instagram.com/) でもそういった SPA のアプローチが取られています。

しかし、それが PWA として必要な条件かと言われれば、全くそんなことはなく、SSR (サーバーサイドレンダリング) でも、PWA の恩恵に預かることはできますし、実際そういったアプローチの PWA も少なくはありません。もっと言ってしまえば、すでにあるウェブサイトに徐々に PWA の機能を増やしていくやり方こそ PWA の真骨頂であり、「プログレッシブ」の名前はそこにも由来しています。

[Suumo がいい例です](https://www.recruit-sumai.co.jp/press/2015/10/service-workeradd-to-homescreenoffline-cache2.html)。既存のサイトをまずは HTTPS 化 (一番ハードルが高い部分かもしれません)。その後 Web App Manifest を置き、Service Worker を使ってトップページをキャッシュするようにします。そうすることで、頻繁に訪れるユーザーにホーム画面へのアイコン追加が促されます。ホーム画面にアイコンを追加すると、ユーザーはワンタップで高速にサイトを起動できるようになりますので、アクセスする心理的ハードルは大きく下がるでしょう。もう少し詳しい話は、[この辺りの記事](http://tech.recruit-sumai.co.jp/suumo%25e3%2582%25b9%25e3%2583%259e%25e3%2583%259b%25e3%2582%25b5%25e3%2582%25a4%25e3%2583%2588%25e3%2581%25b8%25e3%2581%25aeservice-worker%25e5%25b0%258e%25e5%2585%25a5%25e2%2591%25a0-add-to-home-screen-%25)に書いてあります。

他にも、PWA として括られている技術の一部を使って既存のウェブサイトを改良した例はたくさんあります。なんなら従来のサイトのまま、よく使う画像や CSS などのリソースを Service Worker と Cache API を使ってキャッシュするだけでも、未対応ブラウザの邪魔をすることなく、全体的な高速化を図ることはできます。

実はこのブログも、その方法で高速化を図っています。[モバイル版の Facebook](https://m.facebook.com/) は、ホーム画面に追加するプロンプトは出さずにパーソナライズしたプッシュ通知を送ってくれることを知っている人も少なくないでしょう。

(ちなみに [PWA の必要最低条件と、さらにユーザー体験を高める機能を示したページ](https://developers.google.com/web/progressive-web-apps/checklist)があります。個人的には「レスポンシブであること」の部分など、あまりこれに固執しない方がよいと思っている部分もあります。)

## なぜ Instagram は PWA を作ったのか？

一度話を Instagram に戻します。まずは、Instagram というすでに大成功しているネイティブアプリのサービスが、なぜわざわざウェブアプリとして新たにその体験を作り直したのか考えるところからスタートしましょう。

- PWA がうまくいったらネイティブアプリを取り下げるつもりなのか？
- 仮に PWA でネイティブアプリと同等のものが作れるとして、どんなメリットがあるのか？

実はその答えはこの動画を見て頂ければ分かります。

{% YouTube 'UTZVXlcUK1w' %}

Instagram の PWA はインドや東南アジアといった新興国をターゲットとして作られたも
のなのです。

現在新興国は急激なインターネットユーザー数の伸びを示しており、グローバルに展開しているサービスの多くがこの市場の開拓を進めています。例えば [Facebook Lite](https://play.google.com/store/apps/details?id=com.facebook.lite&hl=ja) (ネイティブアプリ) 、[Twitter Lite](https://mobile.twitter.com/) (PWA)、Google も [Go エディションと呼ばれるプロダクトシリーズ](https://jp.techcrunch.com/2018/02/16/2018-02-15-google-launches-a-lightweight-gmail-go-app-for-android/)を出しています。グローバル企業にとって、飽和した先進国の限られたパイを取り合うよりも、伸び代の大きい新興国にアプローチすることに力を注ぐのは、コストパフォーマンス的に考えてもそれほど不思議な選択ではありません。

では、新興国をターゲットにするとして、先進国と同じアプリを提供して通用するかと言われれば、もちろんそんな単純な話ではありません。分かりやすい例として、インターネットの利用環境の違いが挙げられます。

例えばインドの一部では、回線が遅く (2G) 、アプリをモバイル回線からダウンロードしてインストールするよりも、Wifi や SD カードからアプリをインストールする傾向があると言われています (加えて、安価で低パフォーマンスな Android 端末を使う傾向もあります)。良し悪しはひとまず置いておいて、そういう環境の場所があり、そこにいるユーザーをターゲットにする場合、アプリにも貧弱なインターネット回線を想定したサービスデザインが求められます。つまり、新興国では以下のような仮説を立てることができます。

**ユーザーはギガをたくさん使いたくない**

新興国のユーザーを獲得するには、できる限りインターネット回線を使わずに使えるアプリをデザインする必要があるわけです。そこで白羽の矢が立ったのが、軽量な実装が可能な PWA だったというわけです。

## なぜ Instagram の PWA はネイティブと UX が違うのか

件の匿名記事の中で取り上げられていたネイティブアプリとの違いのポイントとして、画像 (カルーセル) のスワイプができない点と、Stories で自動的に動画が再生されてない点が挙げられていました。

[はてなブックマーク](http://b.hatena.ne.jp/entry/s/anond.hatelabo.jp/20180321171652)でもいくつか指摘がありましたが、カルーセルについては PWA とは関係なく、従来のウェブ技術を使えば比較的簡単に実現できます。例えば、モバイルウェブのカルーセルの中で、僕がよくできているなと思ったのは [Mastodon](https://mstdn.jp/) です。調べてみたところ、[react-swipable-views](https://github.com/oliviertassinari/react-swipeable-views) というコンポーネントが使われているようです(ちなみに、Mastodon も今はプッシュ通知などにも対応した SPA による PWA です)。Web Components でも [paper-carousel](https://www.webcomponents.org/element/Redbility/paper-carousel) が Instagram でそのまま使えそうな感じでした。リンク先にデモもありますので、スマホで実際に体験してみてください。

ではなぜ、Instagram はこれを実装しなかったのでしょうか？

ご存知の通りネイティブアプリ版 Instagram はヌルヌル動きます。

実はこれは、潤沢なリソースの消費を前提としています。よく見てください、ネイティブアプリのカルーセルでは、スワイプし始めた時には既に隣の画像が読み込まれています。

<figure>
<img src="/images/2018/pwa-1.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2018/pwa-2.png" style="min-width: 48%; max-width: 300px;">
<figcaption>左が ネイティブアプリ、右が PWA</figcaption>
</figure>

これらを実現するためには、ファーストビューでは見えない画像や動画を、予め裏でロードしておく必要があります。実際に測ったわけではありませんが、おそらく起動〜数タップするうちに、ネイティブアプリの場合、数 MB〜十数 MB を読み込んでいるのではないかと想像します。

逆に PWA 版の Instagram がどうなっているかというと、記事中で指摘されている様に、画像のスワイプはできず、ボタンをタップしなければなりません。

もうお気付きかもしれませんが、これはユーザーの明示的なアクションなしにリソースをダウンロードしないようにするための工夫であり、ギガを気にするユーザーに快適に利用してもらうための意図的なデザインなのです。

ちなみにネイティブアプリ版の Stories のような、開いてすぐに再生が始まり、スワイプやタップで次々と切り替わっていく UX については、ウェブでもがんばれば不可能ではないかもしれませんが、様々なチャレンジがあることと思います。残念ながら専門外なので、どなたかウェブでの実現方法、もしくは不可能な理由を解説して頂けると助かります。

## 今 PWA を選ぶべきなのか

さて、ここまで読めば、もう PWA に対応すべきか悩む人も、PWA でネイティブアプリがなくなる！と主張する人もいなくなったのではないでしょうか。

[テリーマンがキン肉マングレートに成り代わった時](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q12135222022)、当初カメハメのような流麗なファイトができないと悩みました。しかし本来の自分の持ち味であるテキサスファイトを出すことで、新生キン肉マングレートとして生まれ変わり、勝利を手にしたのです。

同じに見えるものでも、役割によって細かい作りや使われるテクノロジーが変わってくることがあります。大切なのは、サービスのターゲットが誰であり、どういうアプローチが最適で、狙ったユーザーにサービスを届けられるのか、長く使ってもらえるサービスになるのか、を見極めることではないでしょうか。PWA、いや、ウェブの進化は、そのための新しい選択肢を用意してくれているに過ぎません。目指すゴールに最適なアプローチを選択していって頂ければと思います。
