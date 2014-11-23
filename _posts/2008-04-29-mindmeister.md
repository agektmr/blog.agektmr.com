---
title: 'オフラインでも使えるマインドマップサービス &#8211; MindMeister'
author: Eiji
layout: post
permalink: /archives/57
SBM_count:
  - '00001<>1271386191<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 2417647
categories:
  - Service
tags:
  - MindMeister
  - Widget
  - マインドマップ
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/57" callback="wp_plus_one_handler"></g:plusone>
</div>

今日は久々にいけてるサービスを見つけたのでご紹介。

## MindMeister

<a href="http://www.mindmeister.com/" target="_blank"><img class="alignnone size-medium wp-image-58" title="mindmeister_logo" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_logo.gif" alt="" width="238" height="44" /></a>

<a href="http://ja.wikipedia.org/wiki/マインドマップ" target="_blank">マインドマップ</a>とは、言葉を枝上に分岐して記述することで、アイディアの整理するのに役立つ記法/ツールです。僕なんかは、TODOとかアイディアはポンポン出てくるんだけど、体系的にまとめることが苦手なため、これまで無料のマインドマップツール、<a href="http://www.freemind-club.com/" target="_blank">FreeMind</a>を利用してきました。

利用法としては

*   議事録や講演会のメモ
*   やることメモ
*   仕様書作成中の頭の整理
*   プレゼン資料作成中の頭の整理

という感じで、いずれもとにかく書きなぐり書きなぐり、後でグループごとにまとめる、という感じ。

なんですが、問題は、FreeMindのスピード。Mac OS Xバージョンだと、Core2DuoのMacBookですら起動に数分かかるという状況(バージョン0.8.1以降？)で、最近は立ち上げるのが億劫だったところに、<a href="http://www.mindmeister.com/" target="_blank">MindMeister</a>のバージョンが2になったというリリース。

というわけで、早速試してみました。

## 編集機能

[<img class="alignnone size-medium wp-image-60" title="mindmeister" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister-300x180.jpg" alt="" width="300" height="180" />][1]

見ての通り、(MindManagerは使ったことないですが)FreeMindよりも多機能です。ノードごとにアイコンを付けられるだけでなく、色や文字の大きさ、メモも加えることができます。もちろん日本語も問題ありません。メモ機能は個人的にFreeMindにぜひ欲しかったものです。

さらに、まだ試していませんが、TODO管理的な機能もあるようです。

## OpenID対応

最近人気が出てきたOpenIDにも対応しています。OpenIDはYahooなど、他サービスのID認証でサービスが利用可能になる共通プロトコルです。(※OpenIDを使うと認証できないため、後で紹介するウィジェットが使えません)

[<img class="alignnone size-full wp-image-59" title="mindmeister_openid" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_openid.jpg" alt="" width="391" height="174" />][2]

## FreeMindやMindManagerからのインポート

マインドマップツールとしてはメジャーなFreeMindとMindManagerのマインドマップをインポートすることができます。これはありがたい。

## ウィジェットやブラウザから一発投稿

[<img class="alignnone size-medium wp-image-61" title="mindmeister_widget" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_widget-300x82.jpg" alt="" width="300" height="82" />][3]

箇条書きにするのがもったいないくらいですが、下記ウィジェット/ガジェットに対応

*   WIndows Vistaのサイドバーガジェット
*   iGoogleガジェット
*   Yahoo! Widget Engineウィジェット
*   Mac OS X Dashboardウィジェット

ウィジェット/ガジェットから一発投稿で、デフォルト指定されたマインドマップに追記されていきます。TODO管理で役立ちそう。これはありがたい。

他にも、IE/Firefoxの機能拡張、iPhone用追加ページなどが用意されています。

## オフラインでの利用が可能

[<img class="alignnone size-medium wp-image-62" title="mindmeister_offline" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_offline-300x186.jpg" alt="" width="300" height="186" />][4]

なんといってもこれでしょうか。オフライン機能。

FirefoxまたはInternet ExplorerでGoogle Gearsが必要ですが、オフラインでMindMeisterを利用することができます。これで、いつでもどこでもアイディアを書き留めていくことができますね。

## まとめ

ここでは書ききれませんでしたが、実はマインドマップを共有して編集する機能や、APIまで提供されています。(今となっては古臭さすら感じる言葉ですが)Web2.0を絵に描いたようなサービスではないでしょうか。

ただ、オフライン機能等はまだ成熟しきった技術とは言えないため、今後の動向が気になるところ。Google Gears / Prism / HTML5の棲み分けはどうなっていくのか？また、ウィジェット/ガジェットの重要性は日に日に高まってきています。JavaScriptの技術は今のうちに磨いておかなければ&#8230;!

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister.jpg
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_openid.jpg
 [3]: http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_widget.jpg
 [4]: http://devlog.agektmr.com/wp-content/uploads/2008/04/mindmeister_offline.jpg