---
title: FriendConnect から垣間見える未来のソーシャルウェブ
layout: post
lang: ja
date: 2008-06-20
tags:
  - OAuth
  - OpenID
  - OpenSocial
  - PortableContacts
  - DataPortability
  - FriendConnect
  - SocialWeb
---

今更ですが、先日サンフランシスコで開かれた Google I/O に参加してきました。

その中でも特に印象に残ったのが、Plaxo の Joseph Smarr 氏による OpenSocial,
OpenID, and OAuth: Oh My! というセッション。僕が見たセッションの中ではダントツの
人気で、部屋に用意された椅子はもちろん、立ち見で人が溢れ返るほどの盛況ぶり。

内容は、ソーシャルウェブの未来について。現在は OpenSocial というソーシャルグラフ
を所有するサービスに閉じた世界が中心となりつつありますが、少し未来のウェブは
OpenSocial, OpenID, OAuth, [PortableContacts](http://www.portablecontacts.net/)
等の技術によって、よりグローバルな意味でのソーシャル化が図れるようになる、という
ものです。

詳細は [Google Code にビデオとスライドがアップされていま
す](http://sites.google.com/site/io/opensocial-openid-and-oauth-oh-my)ので、ご覧
ください。かなり早口ですが、大変面白い内容です。

## OpenSocial と FriendConnect の持つ意味

OpenSocial には v0.7 まで、JavaScript の API しか存在していませんでした。これは
OpenSocial コンテナにとっては外部サービスからガジェットとしてアプリケーションを
追加してもらい、その OpenSocial コンテナが持つソーシャルグラフに閉じた形で利用さ
れるものでした。アプリケーション開発者は OpenSocial の JavaScript API を使い、ガ
ジェットが置かれているコンテナサイトの友達リストを取得し、そこでアプリケーション
を動かすことができます。もちろん、ガジェットを自分のサービスドメイン上でホスティ
ングすることも可能ですが、ガジェットはコンテナ上でしか動作せず、友達リストを外部
サービスとしてインポートしたりといったことも不可能で、実質的に囲い込みサービスし
か生まれないものと言えたでしょう。

それが OpenSocial v0.8 + FriendConnect によって一気に世界を広げます。ユーザーは
FriendConnect 対応サイトを利用するに当たり、OAuth を使って自分が利用したい SNS
サービスを選ぶ権利が与えられています。同時に、そのサイト上での活動内容は連携を選
択した SNS サービスに戻されます。

ここでソーシャルサービスの要素を思い出してください。

1. アイデンティティ
2. ソーシャルグラフ(友達リスト)
3. エントリの公開範囲の制御(プライバシー)
4. フィード

**FriendConnect はアイデンティティを OpenID で、ソーシャルグラフを OpenSocial
v0.8 の RESTful API で、エントリの公開範囲の制御を OAuth で、フィードを Activity
Stream で解決しようとしています。**

これらの意味するところを深く見つめて行くと、未来のソーシャルウェブが自ずと見えてきます。

## Joseph Smarr 氏(Plaxo)による未来のソーシャルウェブ論

FriendConnect のイメージをさらに深めるため、Joseph Smarr 氏が、Plaxo の
FriendConnect 対応に際してアップしていたブログエントリをご紹介します。

[Plaxo and FriendConnect are now Best
Friends](http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html)

> Plaxo が 完全に FriendConnect と連携した。FriendConnect とは、あらゆるサイトをソー
> シャル化する、Google によるウィジェットベースのツールである。これにより、
> FriendConnect に対応していれば、どんなサイトでも Plaxo アカウントに安全に接続し、
> サイト上に自分の友達がいるかを確認したり、友達を招待したりといったことができる
> ようになる。何よりも素晴らしいのは、そのサイトでの活動内容を Pulse に流し込むこ
> とができるようになり、Plaxo での友達がウェブを跨いであなたと連絡を取り合うこと
> ができ、あなたが発見した新しいサイトを知ることができる点だ。
> 
> これは本当に便利でわくわくする連携機能だ — これはユーザーが自分のアイデンティ
> ティと関係をウェブ上のどこでも利用できるようにし、新しいサイトで知人を見つけ出
> し、活動内容を既存の友達に共有し、よりソーシャルな発見と共有という徳の高いサイ
> クルを生み出す、[シームレスソーシャルウェブエコシステ
> ム](http://therealmccrea.com/2008/05/02/can-lifestreaming-and-aggregation-go-mainstream/)
> にさらに近付いたと言える。これこそソーシャルウェブの進むべき道だ — (現在あるほ
> とんどのサービスがそうだが)新しいソーシャルサイトを使い始める度に最初からやり
> 直さなければならないなんてとんでもない。あなたの新しい体験全てが、他の人をも魅
> 了すべきだ。
> 
> これはサービスがユーザーに自分の持つデータの制御を与え、オープンスタンダードを
> 使って安全なアクセス権を提供することによってのみ成り立つ。そしてこれこそまさ
> に、Plaxo が FriendConnect を使ってやりたかったことだ。Plaxo アカウントを接続
> する際、我々は [OAuth](http://oauth.net/) を使う。そのため、Plaxo のパスワード
> を渡す必要もないし、後で接続を断つことも可能だ。FriendConnect を使ってあなたが
> 活動内容を Pulse に共有する際は、[OpenSocial 0.8 RESTful Activities
> API](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FRESTful%20API%20Specification)
> を利用する。オープンスタンダードではない連携はアドレス帳 API のみであり、我々
> はこのスタンダードについても[取り組みを開始してい
> る](http://portablecontacts.net/)。我々は[アイデンティティプロバイダとして、
> ソーシャルグラフプロバイダとして、そしてコンテンツアグリゲータとしての役
> 割](http://blog.plaxo.com/archives/2008/05/plaxo_becomes_s.html)を果たしている
> と強く信じている — つまり、我々はユーザーが自身のデータと関係性をウェブ上のど
> こにでも持ち回り、どこからでも共有できるようにしている — これはユーザーにとっ
> ても、Plaxo にとっても、ウェブ全体にとっても有益なことだ。だが、まだこの取り組
> みは始まったばかり — FriendConnect 対応サイトから活動内容を共有する際、家族や
> 友達、仕事関係など、共有相手をより細かい粒度で制御するなどの、更なる拡張を楽し
> みにしていて欲しい。
> 
> 下のスクリーンショットは Plaxo と Google FriendConnect の連携したものだ —
> [FriendConnect を利用しているサイ
> ト](http://www.google.com/friendconnect/home/examples)でも体験してもらうことが
> できる。

画像は[実際のペー
ジ](http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html)をご覧下さい。

## まとめ

ガジェットコンテナとしての OpenSocial には正直、懐疑的な部分があったのですが、
FriendConnect の描く未来を想像し、またわくわくしています。今後もこの辺りの動向を
追って行きます。

## 追記

似たような話題に触れた記事を見つけたので追記し、トラバっておく。(失敗したので断念○|￣|＿)

[グーグルが見たソーシャルネットワーキング–その 3 つの傾向:スペシャルレポート –
CNET Japan](http://japan.cnet.com/special/story/0,2000056049,20375542,00.htm)
