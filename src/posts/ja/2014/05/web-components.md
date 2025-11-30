---
layout: post
lang: ja
title: なぜ Web Components はウェブ開発に革命を起こすのか
date: 2014-05-19
updated: 2014-07-12
tags:
  - Template
  - Shadow DOM
  - Custom Elements
  - HTML Imports
  - Web Components
comments: false
categories: Web Components
---

{% YouTube 'T5y_lmLngAk' %}

<!-- excerpt -->

ウェブアプリケーションのフロントエンドに関わる方なら、もう Web Components という
言葉を全く聴いたことがない方は少ないのではないでしょか。
すでに関連記事も数多く出回っており、実際に触り始めている方も多いと思います。しか
し、なぜこれが革命的技術なのか、周囲の人に簡潔に説明できる方はどれくらいいるで
しょうか？この記事では、それを試みていきたいと思います。

## デジタル部品の流通革命

ソフトウェア部品の流通に今、大きな変化が起きてきています。

数年前のオープンソース環境を覚えているでしょうか？レポジトリは集中管理型の
subversion、リリースは zip、テストは手動。Issue の登録もプロジェクトごとにことな
るバグ管理システムが使われていたため、とっつきづらかったでしょうし、パッチを送る
のも面倒でした。

そんなオープンソースを取り巻く環境が、git や GitHub の登場を皮切りに、目覚ましく
発展しています。ネットワークレポジトリの環境が整い、CI (Continuous Integration)
によるテストやデプロイの自動化、必要な時に最新のソースコードを手軽にダウンロード
できるパッケージマネージャーの充実など、すべてが楽に、しかもスピードを早めてきて
います。ソフトウェア部品の開発から再利用までのサイクルが分単位まで短縮されること
で、コミュニティを介したフィードバックやコントリビュート (Patch / Pull Request)
も活性化し、品質を高めていくための仕組みも今までになく効率化しています。オープン
ソースは、ついに真のエコシステムを手に入れつつあると入っても過言ではないでしょ
う。

この動きは、フロントエンド開発においても大いに役立てられています。特に grunt,
npm, bower 等との組み合わせは、だいぶ浸透してきたのではないでしょうか？

## UI コンポーネントのエコシステム

これまでに最も大きな成功を収めたフロントエンド向けソフトウェアに
 [jQuery](http://jquery.com/) があります。DOM 操作だけでなく、簡単に複雑な UI を
実現できる [jQuery UI](http://jqueryui.com/) のようなプラグインを活用している開
発者の方は多いと思います。カレンダーの UI (Datepicker) や、タブインターフェー
ス、ダイアログといった、素の HTML が苦手とするユーザーインターフェースを実装する
敷居を大きく下げてくれたのも、jQuery UI でした。

[![](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)

もちろん、その対抗馬となる UI ライブラリもたくさん登場しています。Kendo UI,
ExtJS, Dojo, Bootstrap など、数え上げればキリがありません。しかしひとつ言えるの
は、それぞれに独自の思想や作法があるということです。そのため、実際に使うには、
API よりも、まずは思想と作法を学ぶところからスタートしなければなりません。
また、選択肢が多いということは、人それぞれに得意なライブラリや好みが別れてしまうため、プロジェクトでひとつを選択する必要に迫られた場合、誰かが妥協したり、新たな学習コストがかかってしまうことも、忘れてはいけません。

## Web Components

それでは、UI ライブラリが同じ思想、作法で使えるようになるとしたらどうでしょう
か？別に言い方をするなら、「UI コンポーネントの思想と作法が標準化されるとした
ら」。

その答えが、 [Web Components](http://webcomponents.org/) です。Web Components に
は以下のような特徴があります。

* **ウェブ標準**になる予定
* 既存の HTML / CSS / JavaScript の知識の延長で使える
* **UI コンポーネントを HTML タグ**として作ることができる
* コンポーネントは**カプセル化されるため、外部を汚染しない**
* **再利用**が可能
* 分業がしやすい

理屈で説明されるより、実際に動くものを見たほうが話は早いでしょう。簡単な例をご紹
介します。

[![](https://3.bp.blogspot.com/-S7lGeyTaSj0/U3oPRGV-xJI/AAAAAAAAsO0/ZcSH2kFqkcI/s1600/Screen+Shot+2014-05-19+at+13.32.44.png)](https://agektmr.github.io/webaudio-controls/sample1.html)

画像をクリックすると[実際に動作するデ
モ](http://agektmr.github.io/webaudio-controls/sample1.html)を見ることができま
す。このデモの[ソースコードはこち
ら](https://github.com/WebMusicDevelopersJP/webaudio-controls)。
この見た目にかっこいいノブ類ですが、Web Components (Polymer) で作られています。
ドラッグして上下に動かすことで、パラメータを増減。`Shift` キーを押しながらドラッ
グすれば、1 ずつ動かすことができます。そして、変更したパラメータは `value` に設
定されます。

```html
<webaudio-knob
  diameter="64"
  max="100"
  sprites="100"
  src="img/LittlePhatty.png"
  step="1"
  style="left: 128px; position: absolute; top: 76px;" tooltip="Knob2 tooltip" value="50">
</webaudio-knob>
```

何よりも、ソースを見てみると、これらの要素には、`<webaudio-knob>` というタグが使
われていることに気付くと思います。ノブの見た目や値の範囲は、ネイティブな HTML 要
素のお作法に則り、属性を使って変更することができます。

注目していただきたいのは、`head` タグ内にある

```html
<link href="webcomponents/webaudio-controls.html" rel="import"></link>
```

の部分です。この一行が、`<webaudio-knob>` の利用を可能にしています (実際には
Polyfill の platform.js も読み込んでいます)。JavaScript 一切なしで、HTML タグだ
けでこれが実現できるとしたら、お手軽だと思いませんか？

Web Components が主流になれば、ユーザーは UI コンポーネントを、思想や作法を気に
せず、ネイティブの DOM 要素と同様に扱うことができるのです。

## もう少し具体例が見たい

分かりやすい一例としては、[Twitter
Button](https://github.com/zenorocha/twitter-button) なんていかがでしょうか？
`<twitter-button></twitter-button>` として、必要な情報は属性として与えれば、
Twitter ボタンを表示することができます。Twitter ボタンを実装したことがある方であ
れば、これがいかに楽な作業かわかると思います。

[![](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)

また、[customelements.io](http://customelements.io/) というサイトでは、これも含
めて、公開されている Web Components でできた UI コンポーネントを探すことができま
す。

うってつけのビデオもあります。先日 Google で開催された [All About
Polymer](http://www.meetup.com/sfhtml5/events/169452272/) というイベントで [Rob
Dodson](https://plus.google.com/+RobDodson/posts)が Google Map を使ったアプリの
ライブコーディングを披露しました。ほとんどタグを追加するだけで派手なアプリが作り
上げられていく様は圧巻です。ちなみに英語ですが字幕付きですので、英語の勉強も兼ね
て、ぜひ見てみて下さい。

<div class="video-wrap">
  <iframe src="//www.youtube.com/embed/75EuHl6CSTo"></iframe>
</div>

## Web Components の構成要素

少し技術的な解説をします。Web Components は、大きく 4 つのテクノロジーで構成され
ています。

* Custom Elements
* HTML Imports
* Template
* Shadow DOM

各テクノロジーについて、簡単に説明してみましょう。

### Custom Elements

独自タグをブラウザに認識させます。
このタグはプロパティやメソッド、イベントを持つことができるため、ネイティブな DOM
要素と同様な使い勝手を実現することができます。
上記 `<webaudio-knob></webaudio-knob>` の例で言えば

```javascript
var knob = document.querySelectorAll('webaudio-knob')[0];
knob.setValue(100);
```

とすることで、JavaScript から命令的 (declarative - 宣言的の反対である imperative
的) に、`value` を変更することができます。

```javascript
knob.value = 100;
```

とすることもできます。

実は Custom Elements は GitHub で既に使われてたりします。

[![](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)

DevTools で見てみると

[![](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)

* `time` タグを拡張 (`is="relative-time"`) して、タグ中に表示される時間を相対的
  にしている
* `title-format` 属性を使って、ツールチップ表示の日時にフォーマットを指定してい
  る

なんて使い方をしているようです。

未対応ブラウザ向けには、[Polymer の Custom Elements の
Polyfill](https://github.com/Polymer/CustomElements) も[使っているようで
す](https://twitter.com/joshpeek/status/464153518169792513)。なんか見てたらホレ
ボレしてきました。

### Template

標準のテンプレート機能を提供します。
template のコンセプトは長らく検討されてきました。最近では Handlebar.js や
Backbone.js (Underscore), AngularJS のテンプレートが人気ですが、それのウェブ標準
版と思って下さい。既存のハックと比べると

* どこに置いても template 内は DOM と認識されないので、それだけでは中の script
  を実行したり、画像を取りに行ったりといったことが起きない
* 取り込む際は文字列ではなく DOM として認識できるので、扱いやすい

など、できそうでできなかった機能が提供されています。なお、プレースホルダーやバイ
ンディングの機能はこれ自体提供していない点に注意してください。

### HTML Imports

ひとつのタグで複数のリソースを読み込むことができます。
jQuery UI にしろ Bootstrap にしろ、JavaScript、CSS などを、それぞれ別々に取り込
む必要がありました。import タグを使えば、これひとつで UI コンポーネントと、それ
に必要なリソースを取り込むことができるようになります。

### Shadow DOM

カプセル化した HTML 要素を追加できます。
パッと見の効果は、見えないマークアップを追加できることですが、もっと大きな役割は
カプセル化できることです。UI ライブラリでありがちな落とし穴は

* 同じクラス名を使って意図しない要素にスタイルが当てられてしまう
* 別の要素に当てたスタイルが意図しない箇所に影響を与えてしまう

ですが、Shadow DOM は外の世界と中の世界を分断することで、カプセル化を可能にしま
す。

## ブラウザベンダーのスタンス

標準化を目指していると言いましたが、ブラウザベンダーの足並みが揃わなければ標準化
することはできません。しかし、各ブラウザベンダーは、いずれも Web Components に注
目し、実装と仕様策定を同時並行で進めています。

### Google

Google は Web Components で最も大きな役割を担っています。仕様作成者はいずれも
Google エンジニアで、Google Chrome では既にほとんどの機能を実装しており、バー
ジョン 36 では HTML Imports も取り込まれ、すべての機能が `about:flags` のフラグ
無しで動く状態になる見込みです。
また、まだアルファ版ではありますが、Web Components をベースにした
 [Polymer](http://www.polymer-project.org/) というフレームワークを開発しており、
完成すれば、その上で様々なコンポーネントを動かせるよう準備を進めています。同時
に、Polymer の開発に当たり、Web Components 未対応ブラウザでの動作が行えるよう
 [platform.js](https://github.com/Polymer/platform) という Polyfill (JavaScript
で機能をエミュレートするライブラリ) の開発も進められています。

### Mozilla

Google の次に積極的に Web Components に取り組んでいるのは、間違いなく Mozilla で
す。[x-tag](http://www.x-tags.org/) というフレームワークを開発しており、UI コン
ポーネント集 [Brick](http://mozilla.github.io/brick/) も公開されています。

### Apple

Blink が WebKit から fork された時点で Shadow DOM が削除されるなど、一時は Web
Components への対応に否定的と見られましたが、[先日別ブランチ上で開発を進めること
が発表](https://lists.webkit.org/pipermail/webkit-dev/2014-February/026251.html)
され、様子を伺いつつも興味を示しています。

### Microsoft

Microsoft の Web Components 対応は、
[status.modern.ie](http://status.modern.ie/) を見る限り、いずれの機能も Under
Consideration の状態ですが、[HTML Templates の仕様に関わ
る](http://www.w3.org/TR/html-templates/)など、興味を示しています。

## ユースケース

どのような場面で Web Components を使うことができるでしょうか？いくつか例を挙げて
みます。

### プロダクト専用の UI コンポーネントを作る

サービスを開発するに当たり、UI のコンポーネント化を想定して設計します。そうする
ことで、UI コンポーネントを作るチームは、その機能に集中することができますし、使
うチームは、想定通りにインターフェースが使える前提で開発を進めることができます。
分業が楽になるのも Web Components の利点のひとつです。

### 複数サービスで共有の UI コンポーネントを作る

ポータルサイトや、複数のサービスが統合されたサイトを運営している企業の場合、テー
マや UI を統一したいケースが多いと思います。それこそ Web Components が威力を発揮
するチャンスです。共通サーバーから CSS や画像を配信するインフラは既に整っている
ところが多いでしょうから、それを Web Components のものに差し替えることで実現でき
るでしょう。

### 公開されている UI コンポーネントを使う

ちょっとしたサービスを個人で作りたい場合、開発者がデザインまで手がけるのはなかな
か大変です。Bootstrap のように、お手軽にできあいのデザインで UI が組めるのはあり
がたいですが、Web Components を使えば、もう少し複雑なことも比較的簡単に実現でき
ます。公開されている Web Components のライブラリを
[customelements.io](http://customelements.io/) などで探し、再利用することで、開
発の工数を大幅に減らすことができるようになるでしょう。まだまだ数は少ないですが、
Web Components が広まれば、むしろ自分が必要なものを探す方が大変になるかもしれま
せん。

## どこで学べばいいのか

ここまで読んで、ぜひ Web Components を使いたい！と思った方は、どこで使い方を学べ
ばいいのでしょう？仕様を読んで下さい…というと大変ですよね。仕様は仕様なので、使
い方が書いてあるわけではありません。幸いなことに、HTML5Rocks にはすでにたくさん
の記事が上がっています。これらの記事はメンテされていますので、最新の仕様 (実装)
に則っていると思って大丈夫です。

でも HTML5Rocks の記事は英語だから読むのが大変・・・そんな方のために、日本語訳し
ておきました。

* [Custom Elements - HTML に新しい要素を定義す
  る](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/)
* [HTML で利用可能になった Template タグ - クライアントサイドのテンプレートの標
  準化](http://www.html5rocks.com/ja/tutorials/webcomponents/template/)
* [HTML Imports - ウェブのための
  #include](http://www.html5rocks.com/ja/tutorials/webcomponents/imports/)
* [Shadow DOM
  101](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom/)
* [Shadow DOM 201 - CSS とスタイリン
  グ](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - 上級者向けコンセプトと DOM
  API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)

## その他日本語資料

* [Web 開発者に革命をもたらす！「Web Components」超入門
  ](http://liginc.co.jp/web/html-css/html/58267)検索で一番にヒットする LIG の王
  さんの記事ですが、残念ながらこの時からだいぶ仕様が変わってしまっています。とは
  いえ大枠を把握するにはとてもよい資料だと思いますので、ぜひ目を通すとよいと思い
  ます。
* [Web Components で行う HTML のコンポーネント化
  ](http://ameblo.jp/ca-1pixel/entry-11815188808.html)サイバーエージェントの
  @1000ch の記事です。最近の記事ですので、仕様的にも新しいものに対応しており、安
  心して読めると思います。
* [Web をまともにしたいので Shadow DOM と Web Components をつくってます
  ](http://www.youtube.com/watch?v=GCw4fJEEVe8)Google Japan のエンジニアかつ、
  Shadow DOM 仕様のエディタであり、Blink 上での Shadow DOM の実装をリードしてい
  る [Hayato Ito](https://plus.google.com/+HayatoIto/posts) が昨年の HTML5
  Conference で行った講演のビデオです。
* [Polymer と Web Components
  ](http://steps.dodgson.org/b/2013/05/19/polymer-and-web-components/)Web
  Components 関連の Google エンジニアによる 2013 年の記事。Web Components はもち
  ろんですが、Polymer のコンセプトなどについても書かれています。

## 質問はどこに？

日本語なら、[html5j のメーリングリス
ト](https://groups.google.com/group/html5-developers-jp)で聞けば、誰かしら答えて
くれると思います。英語であれば、[StackOverflow で polymer タグを使
う](http://stackoverflow.com/questions/tagged/polymer)と良いと思います。

## まとめ

僕なら、誰かに Web Components は何がそんなに素晴らしいのか？と聞かれたら、こう答
えます：

**Web Components はウェブの UI コンポーネントを標準化し、エコシステムに乗ること
で、開発効率を飛躍的に向上する技術 だからであると。**

みなさんが素敵な UI コンポーネントを公開してくださるのを楽しみにしています。
