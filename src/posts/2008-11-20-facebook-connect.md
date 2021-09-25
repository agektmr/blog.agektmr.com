---
title: Facebook Connect に見る未来のソーシャルウェブ
layout: post
date: 2008-11-20
tags:
  - DataPortability
  - Facebook
  - Service
  - SocialWeb
  - Facebook Connect
---

DataPortability を実現する Data Availability や Facebook Connect、FriendConnect
の技術が公表されて半年が経ちますが、ようやくこれらを実際に使ったサービスが登場し
てきました。

これまでの Facebook や OpenSocial におけるガジェットや埋め込み型アプリケーション
は、中心となるソーシャルネットワークに外部サービスが機能を提供する形でプラグイン
するものばかりでした。Data Availability や Facebook Connect は逆に、RESTful API
等を活用して外部サービスにソーシャルネットワークをエキスポートします。今日は
Citysearch というサービスで実現された Facebook Connect を例に、これからのソー
シャルウェブの具体的なカタチを紹介したいと思います。

## Citysearch が Facebook Connect にβ対応

僕の知る限り、これが初のまともな Facebook Connect 対応 / DataPortability 対応の
サービスです。

[Citysearch](http://beta.citysearch.com/)は、レストランやホテル等、実際に利用し
た人がレビューを書いて共有するタイプのソーシャルネットワークです。

![citysearch1](/images/2008/11/citysearch1.jpg)

よく見ると画面右上に "Sign In Using Facebook" の文字があります。

![signinfacebook](/images/2008/11/signinfacebook.png)

早速クリックしてログインを試みます。

### 認証

![citysearch2](/images/2008/11/citysearch2.jpg)

Lightbox 風のダイアログがポップアップして、Facebook アカウントを使ってサインイン
しても良いかの確認が。

ここで重要なのは

* Citysearch のロゴが入っている。つまり、Facebook と Citysearch の間には、自動化
  されているにしろ、事前に何かしらのやりとりがあったことが伺える。
* このダイアログは **iframe** です。僕の場合は既に Facebook にログイン状態だった
  ので確認しか表示されませんでしたが、ログインしていない場合は(フィッシング対策
  として)別ウィンドウがポップアップして Facebook の ID とパスワードを求めるよう
  です。
* 利用規約に同意する必要があります。地味ながら、日本での法的なハードルも今後課題
  になるとは思われます。

### サービス登録

![citysearch3](/images/2008/11/citysearch3.jpg)

コネクトすると、未登録のためメンバー名を求められます。既存アカウントが無い人のた
めに用意されているようです。ここでもいくつかポイントがあります。

* Facebook の認証は独自方式ですが、これがオープン仕様なら[OAuth/OpenID のコン
  ボ](http://step2.googlecode.com/svn/spec/openid_oauth_extension/drafts/0/openid_oauth_extension.html)
  になると考えられます。つまり、Facebook の独自方式では認証と認可が同時に行われ
  ているようです。
* この後分かりますが、できあがったアカウントには Facebook のプロフィール写真、名
  前、友達リストが少なくともインポートされています。オープン仕様であれば OpenID
  で sreg を使ってニックネームとプロフィール写真を、OAuth で友達リストをインポー
  トすることになるのでしょうか。OAuth だけでもいいかもしれません。
* “Merge your Facebook profile with an existing Citysearch account?”というリンク
  が用意されています。既存アカウントと OpenID をマージできるサービスが少ない事を
  考えると、なかなか気が利いています。
* ここでは Citysearch 自体の利用規約に同意させているようです。

### コネクト完了

![citysearch4](/images/2008/11/citysearch4.jpg)

ログインしてみると、画面右上に自分の Facebook プロフィールの写真が表示されています。

![citysearch5](/images/2008/11/citysearch5.jpg)

マイページには自分の名前とプロフィール写真しか掲載されていません。他にエキスポー
トされる情報があるかは未調査です。

![citysearch6](/images/2008/11/citysearch6.jpg)

ここが最大のミソになる、友達リストです。残念ながら”None of your Facebook friends
are Citysearch members”とあるように、両方に登録している Facebook friends しか友
達として表示されないようです。ここで未登録の友達も表示して、”Citysearch に招待す
る”なんて機能があってもいい気がします。

## フィードバックとなるアクティビティ

さて、ここまで見てきたものはすべて Citysearch 上の画面でした。Facebook は自身が
持つデータを提供するばかりで、考えてみればいいことなど何ひとつないように見えま
す。広告を貼る方法だって見つけられません。では、なぜ惜しげもなくソーシャルグラフ
を提供するのでしょうか？

実は、Facebook Connect はアクティビティを Facebook にフィードバックする仕組みを
持っており、これによって Facebook はコネクトされたサービスのアグリゲータになれる
からなのです。下記画像の「掲示板に記事を掲載」とあるのがこの部分です。OpenSocial
で言えばアクティビティストリームがこれに当たります。

![citysearch7](/images/2008/11/citysearch7.png)

実際の画面イメージを掲載したいところですが、Citysearch にレビューを書く勇気がな
いので [John McCrea 氏のサンプ
ル](http://www.flickr.com/photos/56624456@N00/3044329360/)にリンクしておきます。

![Citysearch_Facebook](http://farm4.static.flickr.com/3278/3044329360_6171dc1f04.jpg?v=0)

アクティビティのアグリゲータになることは、トラフィックを集める上で非常に重要な戦
略です。Facebook にさえ来れば、友達が関わる様々なサービス上の活動を一目で確認す
ることができるのです。今まで知らなかったサービスも、友達を介して知ることができま
す。さらに、集めたアクティビティには[こんな利用
法](http://www.ideaxidea.com/archives/2007/11/facebooksocial_ads.html)もあり、
様々なマネタイズの可能性も秘めていると言えます。

### 参考サイト

* [CitySearch Goes Social with Great Facebook Connect Implementation – The Real
  McCrea](http://therealmccrea.com/2008/11/19/citysearch-goes-social-with-great-facebook-connect-implementation/)
* [Dare Obasanjo aka Carnage4Life – Some Thoughs on Facebook Connect and
  CitySearch](http://www.25hoursaday.com/weblog/2008/11/19/SomeThoughtsOnFacebookConnectAndCitySearch.aspx)
