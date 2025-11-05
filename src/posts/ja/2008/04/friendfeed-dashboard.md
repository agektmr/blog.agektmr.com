---
title: FriendFeed の Dashboard 用ウィジェットを作ってみた
layout: post
lang: ja
date: 2008-04-03
tags:
  - Dashboard
  - FriendFeed
  - Widget
---

![FriendFeedr](/images/2008/04/friendfeeder.jpg)

最近話題の FriendFeed に対応した Mac OS X の Dashboard ウィジェット、FriendFeeder (仮称) を作ったので公開します。まだいっぱい不具合あると思うんですが、とりあえず動いてるので勢いで。

## FriendFeed とは？

![friendfeedservices](/images/2008/04/friendfeedservices-186x300.jpg)

[FriendFeed](http://friendfeed.com/) は [TechCrunch](http://jp.techcrunch.com/tag/friendfeed/) 辺りで最近話題のウェブサービス。Twitter の次はコレと言われているものです。内容は一言で言うなら、**SNS アグリゲーター**。数多ある SNS をまとめあげる SNS といったところでしょうか。

SNS と言っても、Facebook のような SNS そのものではなく、一般的なブログや Twitter や Flickr, YouTube, del.icio.us, Last.fm など、SNS に類するサービスの最新情報をまとめることに特化しています。エントリにコメントを付けたり、スター的な機能もあります。

## なぜ FriendFeed がアツいのか？

ずばり、このサービスが明らかに Twitter の存在を意識し、その延長線上にあるためです。

Twitter は今や多くの人のデスクトップ常駐アプリ/サービスになりました (僕は TwitterBoard という Dashboard ウィジェットを愛用してます) 。面白いのは、Twitter という味気ないインターフェースのサービスが、多くのディベロッパーによって開発されたアプリ群によりバラエティを増しているという現象です。FriendFeed の味気ないインターフェースと充実した API は Twitter をヒントに、それ以上のものを目指していると思わずにはいられません。

もう一つ、Twitter を意識していると思える点は、コメント機能です。FriendFeed では Twitter 上での Reply を並べ替えて、会話の流れを分かりやすく表示してくれます。また、FriendFeed 上でのコメントを、そのまま Twitter に Update するオプションがあります。

そういう意味では SNS アグリゲーターというよりはむしろ、Twitter + α と言った方が適切かもしれません。少なくとも個人的には、そういう使い方がメインになりそう。

![friendfeedscreen](/images/2008/04/friendfeedscreen.jpg)

## ただのフィードアグリゲーターではない

これまでフィードアグリゲーターといえば RSS リーダーだったわけですが、FriendFeed は単なるフィードアグリゲーターではありません。それは**認証認可**を取り扱うからです。

通常 RSS は一般公開されているものですので、とくにプライバシーを気にする必要はありません。同じものを見る人が多数いることも想定されますから、キャッシュを用いることでかなりの効率化を図ることができました。ところが、FriendFeed が扱う外部サービスには Gmail など、認証を必要とするものも含まれます。これはつまり、ユーザーひとりにつき 1 回のフィードアクセスを要する、ということです。

これは Twitter の比ではない大仕事に思えます。ユーザーが増えれば増えるほど、どんどんしんどくなっていく。どんなアーキテクチャなんでしょうか？

## FriendFeed の今後

[Adobe AIR を使ったデスクトップアプリケーションがリリース](http://jp.techcrunch.com/archives/adobe-air-desktop-app-for-friendfeed-coming/) される予定とのこと。また、現在は規定されたサービスしか登録できませんが、サービス事業者が自ら FriendFeed に API を作れる仕組みを用意するとか。

ユーザーインターフェースにバラエティがあって (API)、友達申請が気軽に出来る (Follow) という点を除いて、Facebook の方向性に近いのは偶然ではないでしょう。ソーシャルグラフの集約は既定路線ですが、どのパスを通って行くのが最も集客できるのか、興味深いところです。

## FriendFeeder のダウンロードと使い方

ようやく本題です(笑)

[**ダウンロードはこちら**](http://devlab.agektmr.com/DashboardWidget/FriendFeeder.zip)  
**要 Mac OS X 10.4.3 以降のはず。**

### 既知の不具合

スクロールバーが出ないです！マウスホイール使ってください。

### 使い方

まずは FriendFeed でアカウントを取得してください。  
ウィジェットの裏面(設定画面)で自分の ID と Remote Key を入力します(パスワードではありません)。Remote Key は [`http://friendfeed.com/remotekey`](http://friendfeed.com/remotekey) で取得できます。

### フィードバック

今後コメント機能と、Twitter 投稿機能の追加を検討しています。他にも何かあればこのエントリにコメントするか、[Twitter](http://twitter.com/agektmr) で教えてください。

また、僕の FriendFeed アカウントは [`http://friendfeed.com/agektmr`](http://friendfeed.com/agektmr) にありますので、Follow 歓迎です。
