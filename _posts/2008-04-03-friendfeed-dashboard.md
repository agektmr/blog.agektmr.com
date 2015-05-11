---
title: FriendFeedのDashboard用ウィジェットを作ってみた
author: Eiji
layout: post
SBM_count:
  - '00003<>1271384113<>1<>0<>2<>0<>0'
dsq_thread_id:
  - 2359938
categories:
  - Widget
tags:
  - Dashboard
  - FriendFeed
  - Widget
---
[][1]<img class="alignnone size-medium wp-image-34" title="FriendFeeder" src="/images/2008/04/friendfeeder.jpg" alt="" width="209" height="239" />

最近話題のFriendFeedに対応したMac OS XのDashboardウィジェット、FriendFeeder(仮称)を作ったので公開します。まだいっぱい不具合あると思うんですが、とりあえず動いてるので勢いで。

## FriendFeedとは？

<img class="alignleft alignnone size-medium wp-image-35" style="float: left;" title="friendfeedservices" src="/images/2008/04/friendfeedservices-186x300.jpg" alt="" width="186" height="300" />

<a href="http://friendfeed.com/" target="_blank">FriendFeed</a>は<a href="http://jp.techcrunch.com/tag/friendfeed/" target="_blank">TechCrunch</a>辺りで最近話題のウェブサービス。Twitterの次はコレと言われているものです。内容は一言で言うなら、**SNSアグリゲータ**。数多あるSNSをまとめあげるSNSといったところでしょうか。

SNSと言っても、FacebookのようなSNSそのものではなく、一般的なブログやTwitterやFlickr、Youtube、del.icio.us、Last.fmなど、SNSに類するサービスの最新情報をまとめる、ということに特化しています。エントリにコメントを付けたり、スター的な機能もあります。

<h2 style="clear:left;">
  なぜFriendFeedがアツいのか？
</h2>

ずばり、このサービスが明らかにTwitterの存在を意識し、その延長線上にあるためです。

Twitterは今や多くの人のデスクトップ常駐アプリ/サービスになりました(僕はTwitterBoardというDashboardウィジェットを愛用してます)。面白いのは、Twitterという味気ないインターフェースのサービスが、多くのディベロッパーによって開発されたアプリ群によりバラエティを増しているという現象です。FriendFeedの味気ないインターフェースと充実したAPIはTwitterをヒントに、それ以上のものを目指していると思わずにはいられません。

もう一つ、Twitterを意識していると思える点は、コメント機能です。FriendFeedではTwitter上でのReplyを並べ替えて、会話の流れを分かりやすく表示してくれます。また、FriendFeed上でのコメントを、そのままTwitterにUpdateするオプションがあります。

そういう意味ではSNSアグリゲータというよりはむしろ、Twitter+αと言った方が適切かもしれません。少なくとも個人的には、そういう使い方がメインになりそう。

[<img class="alignnone size-full wp-image-36" title="friendfeedscreen" src="/images/2008/04/friendfeedscreen.jpg" alt="" width="500" height="330" />][2]

## ただのフィードアグリゲータではない

これまでフィードアグリゲータといえばRSSリーダーだったわけですが、FriendFeedは単なるフィードアグリゲータではありません。それは**認証認可**を取り扱うからです。

通常RSSは一般公開されているものですので、特にプライバシーを気にする必要はありません。同じものを見る人が多数いることも想定されますから、キャッシュを用いることでかなりの効率化を図ることが出来ました。ところが、FriendFeedが扱う外部サービスにはGmailなど、認証を必要とするものも含まれます。これはつまり、ユーザーひとりにつき一回のフィードアクセスを要する、ということです。

これはTwitterの比ではない大仕事に思えます。ユーザーが増えれば増えるほど、どんどんしんどくなっていく。どんなアーキテクチャなんでしょうか？

## FriendFeedの今後

<span style="font-weight: normal; "><a href="http://jp.techcrunch.com/archives/adobe-air-desktop-app-for-friendfeed-coming/" target="_blank">Adobe AIRを使ったデスクトップアプリケーションがリリース</a>される予定とのこと。また、現在は規定されたサービスしか登録できませんが、サービス事業者が自らFriendFeedにAPIを作れる仕組みを用意するとか。</span>

ユーザーインターフェースにバラエティがあって(API)、友達申請が気軽に出来る(Follow)という点を除いて、Facebookの方向性に近いのは偶然ではないでしょう。ソーシャルグラフの集約は既定路線ですが、どのパスを通って行くのが最も集客できるのか、興味深いところです。

## FriendFeederのダウンロードと使い方

ようやく本題です(笑)

<p style="text-align: center; ">
  <a href="http://devlab.agektmr.com/DashboardWidget/FriendFeeder.zip"><strong>ダウンロードはこちら<br /> </strong></a><span style="color: #888888;"><strong>要Mac OS X 10.4.3以降のはず。</strong></span>
</p>

### 既知の不具合

スクロールバーが出ないです！マウスホイール使ってください。

### 使い方

まずはFriendFeedでアカウントを取得してください。  
ウィジェットの裏面(設定画面)で自分のIDとRemote Keyを入力します(パスワードではありません)。Remote Keyは<a href="http://friendfeed.com/remotekey" target="_blank">http://friendfeed.com/remotekey</a>で取得できます。

### フィードバック

今後コメント機能と、Twitter投稿機能の追加を検討しています。他にも何かあればこのエントリにコメントするか、<a href="http://twitter.com/agektmr" target="_blank">Twitter</a>で教えてください。

また、僕のFriendFeedアカウントは<a href="http://friendfeed.com/agektmr" target="_blank">http://friendfeed.com/agektmr</a>にありますので、Follow歓迎です。

 [1]: /images/2008/04/friendfeeder.jpg
 [2]: /images/2008/04/friendfeedscreen.jpg