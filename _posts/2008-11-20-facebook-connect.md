---
title: Facebook Connectに見る未来のソーシャルウェブ
author: Eiji
layout: post
permalink: /archives/221
SBM_count:
  - '00002<>1271391497<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 8323668
categories:
  - DataPortability
  - Facebook
  - Service
  - SocialWeb
tags:
  - Facebook Connect
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/221" callback="wp_plus_one_handler"></g:plusone>
</div>

DataPortabilityを実現するData AvailabilityやFacebook Connect、FriendConnectの技術が公表されて半年が経ちますが、ようやくこれらを実際に使ったサービスが登場してきました。

これまでのFacebookやOpenSocialにおけるガジェットや埋め込み型アプリケーションは、中心となるソーシャルネットワークに外部サービスが機能を提供する形でプラグインするものばかりでした。Data AvailabilityやFacebook Connectは逆に、RESTful API等を活用して外部サービスにソーシャルネットワークをエキスポートします。今日はCitysearchというサービスで実現されたFacebook Connectを例に、これからのソーシャルウェブの具体的なカタチを紹介したいと思います。

## CitysearchがFacebook Connectにβ対応

僕の知る限り、これが初のまともなFacebook Connect対応 / DataPortability対応のサービスです。

<a href="http://beta.citysearch.com/" target="_blank">Citysearch</a>は、レストランやホテル等、実際に利用した人がレビューを書いて共有するタイプのソーシャルネットワークです。

[<img class="alignnone size-medium wp-image-222" title="citysearch1" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch1-300x180.jpg" alt="" width="300" height="180" />][1]

よく見ると画面右上に&#8221;Sign In Using Facebook&#8221;の文字があります。

<img class="alignnone size-full wp-image-230" title="signinfacebook" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/signinfacebook.png" alt="" width="367" height="25" />

早速クリックしてログインを試みます。

### 認証

[][1]<img class="alignnone size-medium wp-image-223" title="citysearch2" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch2-300x180.jpg" alt="" width="300" height="180" />

Lightbox風のダイアログがポップアップして、Facebookアカウントを使ってサインインしても良いかの確認が。

ここで重要なのは

*   Citysearchのロゴが入っている。つまり、FacebookとCitysearchの間には、自動化されているにしろ、事前に何かしらのやりとりがあったことが伺える。
*   このダイアログは**iframe**です。僕の場合は既にFacebookにログイン状態だったので確認しか表示されませんでしたが、ログインしていない場合は(フィッシング対策として)別ウィンドウがポップアップしてFacebookのIDとパスワードを求めるようです。
*   利用規約に同意する必要があります。地味ながら、日本での法的なハードルも今後課題になるとは思われます。

### サービス登録

[<img class="alignnone size-medium wp-image-224" title="citysearch3" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch3-300x175.jpg" alt="" width="300" height="175" />][2]

コネクトすると、未登録のためメンバー名を求められます。既存アカウントが無い人のために用意されているようです。ここでもいくつかポイントがあります。

*   Facebookの認証は独自方式ですが、これがオープン仕様なら<a href="http://step2.googlecode.com/svn/spec/openid_oauth_extension/drafts/0/openid_oauth_extension.html" target="_blank">OAuth/OpenIDのコンボ</a>になると考えられます。つまり、Facebookの独自方式では認証と認可が同時に行われているようです。
*   この後分かりますが、できあがったアカウントにはFacebookのプロフィール写真、名前、友達リストが少なくともインポートされています。オープン仕様であればOpenIDでsregを使ってニックネームとプロフィール写真を、OAuthで友達リストをインポートすることになるのでしょうか。OAuthだけでもいいかもしれません。
*   &#8220;Merge your Facebook profile with an existing Citysearch account?&#8221;というリンクが用意されています。既存アカウントとOpenIDをマージできるサービスが少ない事を考えると、なかなか気が利いています。
*   ここではCitysearch自体の利用規約に同意させているようです。

### コネクト完了

[<img class="alignnone size-medium wp-image-225" title="citysearch4" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch4-300x180.jpg" alt="" width="300" height="180" />][3]

ログインしてみると、画面右上に自分のFacebookプロフィールの写真が表示されています。

[<img class="alignnone size-medium wp-image-226" title="citysearch5" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch5-300x180.jpg" alt="" width="300" height="180" />][4]

マイページには自分の名前とプロフィール写真しか掲載されていません。他にエキスポートされる情報があるかは未調査です。

[][4][<img class="alignnone size-medium wp-image-227" title="citysearch6" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch6-300x180.jpg" alt="" width="300" height="180" />][5]

[][5]ここが最大のミソになる、友達リストです。残念ながら&#8221;None of your Facebook friends are Citysearch members&#8221;とあるように、両方に登録しているFacebook friendsしか友達として表示されないようです。ここで未登録の友達も表示して、&#8221;Citysearchに招待する&#8221;なんて機能があってもいい気がします。

## フィードバックとなるアクティビティ

さて、ここまで見てきたものはすべてCitysearch上の画面でした。Facebookは自身が持つデータを提供するばかりで、考えてみればいいことなど何ひとつないように見えます。広告を貼る方法だって見つけられません。では、なぜ惜しげもなくソーシャルグラフを提供するのでしょうか？

実は、Facebook ConnectはアクティビティをFacebookにフィードバックする仕組みを持っており、これによってFacebookはコネクトされたサービスのアグリゲータになれるからなのです。下記画像の「掲示板に記事を掲載」とあるのがこの部分です。OpenSocialで言えばアクティビティストリームがこれに当たります。

[<img class="alignnone size-full wp-image-231" title="citysearch7" src="http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch7.png" alt="" width="449" height="327" />][6]

実際の画面イメージを掲載したいところですが、Citysearchにレビューを書く勇気がないので<a href="http://www.flickr.com/photos/56624456@N00/3044329360/" target="_blank">John McCrea氏のサンプル</a>にリンクしておきます。

[<img class="alignnone" title="Citysearch_Facebook" src="http://farm4.static.flickr.com/3278/3044329360_6171dc1f04.jpg?v=0" alt="" width="500" height="313" />][7]

アクティビティのアグリゲータになることは、トラフィックを集める上で非常に重要な戦略です。Facebookにさえ来れば、友達が関わる様々なサービス上の活動を一目で確認することができるのです。今まで知らなかったサービスも、友達を介して知ることができます。さらに、集めたアクティビティには<a href="http://www.ideaxidea.com/archives/2007/11/facebooksocial_ads.html" target="_blank">こんな利用法</a>もあり、様々なマネタイズの可能性も秘めていると言えます。

### 参考サイト

*   <a href="http://therealmccrea.com/2008/11/19/citysearch-goes-social-with-great-facebook-connect-implementation/" target="_blank">CitySearch Goes Social with Great Facebook Connect Implementation &#8211; The Real McCrea</a>
*   <a href="http://www.25hoursaday.com/weblog/2008/11/19/SomeThoughtsOnFacebookConnectAndCitySearch.aspx" target="_blank">Dare Obasanjo aka Carnage4Life &#8211; Some Thoughs on Facebook Connect and CitySearch</a>

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch1.jpg
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch3.jpg
 [3]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch4.jpg
 [4]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch5.jpg
 [5]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch6.jpg
 [6]: http://devlog.agektmr.com/wp-content/uploads/2008/11/citysearch7.png
 [7]: http://farm4.static.flickr.com/3278/3044329360_6171dc1f04.jpg?v=0