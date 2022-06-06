---
title: FriendFeed の Dashboard 用ウィジェットを作ってみた
layout: post
date: 2008-04-03
tags:
  - Dashboard
  - FriendFeed
  - Widget
---

![FriendFeedr](/images/2008/04/friendfeeder.jpg)

最近話題の FriendFeed に対応した Mac OS X の Dashboard ウィジェット、
FriendFeeder (仮称) を作ったので公開します。まだいっぱい不具合あると思うんです
が、とりあえず動いてるので勢いで。

## FriendFeed とは？

![friendfeedservices](/images/2008/04/friendfeedservices-186x300.jpg)

[FriendFeed](http://friendfeed.com/) は
[TechCrunch](http://jp.techcrunch.com/tag/friendfeed/) 辺りで最近話題のウェブ
サービス。Twitter の次はコレと言われているものです。内容は一言で言うなら、**SNS
アグリゲーター**。数多ある SNS をまとめあげる SNS といったところでしょうか。

SNS と言っても、Facebook のような SNS そのものではなく、一般的なブログや Twitter
や Flickr, YouTube, del.icio.us, Last.fm など、SNS に類するサービスの最新情報を
まとめることに特化しています。エントリにコメントを付けたり、スター的な機能もあり
ます。

## なぜ FriendFeed がアツいのか？

ずばり、このサービスが明らかに Twitter の存在を意識し、その延長線上にあるためで
す。

Twitter は今や多くの人のデスクトップ常駐アプリ/サービスになりました (僕は
TwitterBoard という Dashboard ウィジェットを愛用してます) 。面白いのは、Twitter と
いう味気ないインターフェースのサービスが、多くのディベロッパーによって開発された
アプリ群によりバラエティを増しているという現象です。FriendFeed の味気ないイン
ターフェースと充実した API は Twitter をヒントに、それ以上のものを目指していると
思わずにはいられません。

もう一つ、Twitter を意識していると思える点は、コメント機能です。FriendFeed では
Twitter 上での Reply を並べ替えて、会話の流れを分かりやすく表示してくれます。ま
た、FriendFeed 上でのコメントを、そのまま Twitter に Update するオプションがあり
ます。

そういう意味では SNS アグリゲーターというよりはむしろ、Twitter + α と言った方が適
切かもしれません。少なくとも個人的には、そういう使い方がメインになりそう。

![friendfeedscreen](/images/2008/04/friendfeedscreen.jpg)

## ただのフィードアグリゲーターではない

これまでフィードアグリゲーターといえば RSS リーダーだったわけですが、FriendFeed
は単なるフィードアグリゲーターではありません。それは**認証認可**を取り扱うからで
す。

通常 RSS は一般公開されているものですので、とくにプライバシーを気にする必要はあ
りません。同じものを見る人が多数いることも想定されますから、キャッシュを用いるこ
とでかなりの効率化を図ることができました。ところが、FriendFeed が扱う外部サービ
スには Gmail など、認証を必要とするものも含まれます。これはつまり、ユーザーひと
りにつき 1 回のフィードアクセスを要する、ということです。

これは Twitter の比ではない大仕事に思えます。ユーザーが増えれば増えるほど、どん
どんしんどくなっていく。どんなアーキテクチャなんでしょうか？

## FriendFeed の今後

[Adobe AIR を使ったデスクトップアプリケーションがリリー
ス](http://jp.techcrunch.com/archives/adobe-air-desktop-app-for-friendfeed-coming/)
される予定とのこと。また、現在は規定されたサービスしか登録できませんが、サービス
事業者が自ら FriendFeed に API を作れる仕組みを用意するとか。

ユーザーインターフェースにバラエティがあって (API)、友達申請が気軽に出来る
(Follow) という点を除いて、Facebook の方向性に近いのは偶然ではないでしょう。ソー
シャルグラフの集約は既定路線ですが、どのパスを通って行くのが最も集客できるのか、
興味深いところです。

## FriendFeeder のダウンロードと使い方

ようやく本題です(笑)

[**ダウンロードはこちら**](http://devlab.agektmr.com/DashboardWidget/FriendFeeder.zip)  
**要 Mac OS X 10.4.3 以降のはず。**

### 既知の不具合

スクロールバーが出ないです！マウスホイール使ってください。

### 使い方

まずは FriendFeed でアカウントを取得してください。  
ウィジェットの裏面(設定画面)で自分の ID と Remote Key を入力します(パスワードで
はありません)。Remote Key は
[`http://friendfeed.com/remotekey`](http://friendfeed.com/remotekey) で取得でき
ます。

### フィードバック

今後コメント機能と、Twitter 投稿機能の追加を検討しています。他にも何かあればこの
エントリにコメントするか、[Twitter](http://twitter.com/agektmr) で教えてくださ
い。

また、僕の FriendFeed アカウントは
[`http://friendfeed.com/agektmr`](http://friendfeed.com/agektmr) にありますの
で、Follow 歓迎です。
