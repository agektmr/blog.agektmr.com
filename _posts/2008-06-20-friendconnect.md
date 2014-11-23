---
title: FriendConnectから垣間見える未来のソーシャルウェブ
author: Eiji
layout: post
permalink: /archives/77
SBM_count:
  - '00001<>1271393436<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 2363702
categories:
  - DataPortability
  - FriendConnect
  - OpenSocial
  - SocialWeb
tags:
  - OAuth
  - OpenID
  - OpenSocial
  - PortableContacts
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/77" callback="wp_plus_one_handler"></g:plusone>
</div>

今更ですが、先日サンフランシスコで開かれたGoogle I/Oに参加してきました。

その中でも特に印象に残ったのが、PlaxoのJoseph Smarr氏によるOpenSocial, OpenID, and OAuth: Oh My!というセッション。僕が見たセッションの中ではダントツの人気で、部屋に用意された椅子はもちろん、立ち見で人が溢れ返るほどの盛況ぶり。

内容は、ソーシャルウェブの未来について。現在はOpenSocialというソーシャルグラフを所有するサービスに閉じた世界が中心となりつつありますが、少し未来のウェブはOpenSocial, OpenID, OAuth, <a href="http://www.portablecontacts.net/" target="_blank">PortableContacts</a>等の技術によって、よりグローバルな意味でのソーシャル化が図れるようになる、というものです。

詳細は<a href="http://sites.google.com/site/io/opensocial-openid-and-oauth-oh-my" target="_blank">Google Codeにビデオとスライドがアップされています</a>ので、ご覧ください。かなり早口ですが、大変面白い内容です。



## OpenSocialとFriendConnectの持つ意味

OpenSocialにはv0.7まで、JavaScriptのAPIしか存在していませんでした。これはOpenSocialコンテナにとっては外部サービスからガジェットとしてアプリケーションを追加してもらい、そのOpenSocialコンテナが持つソーシャルグラフに閉じた形で利用されるものでした。アプリケーション開発者はOpenSocialのJavaScript APIを使い、ガジェットが置かれているコンテナサイトの友達リストを取得し、そこでアプリケーションを動かすことができます。もちろん、ガジェットを自分のサービスドメイン上でホスティングすることも可能ですが、ガジェットはコンテナ上でしか動作せず、友達リストを外部サービスとしてインポートしたりといったことも不可能で、実質的に囲い込みサービスしか生まれないものと言えたでしょう。

それがOpenSocial v0.8 + FriendConnectによって一気に世界を広げます。ユーザーはFriendConnect対応サイトを利用するに当たり、OAuthを使って自分が利用したいSNSサービスを選ぶ権利が与えられています。同時に、そのサイト上での活動内容は連携を選択したSNSサービスに戻されます。

ここでソーシャルサービスの要素を思い出してください。

1.  アイデンティティ
2.  ソーシャルグラフ(友達リスト)
3.  エントリの公開範囲の制御(プライバシー)
4.  フィード

**FriendConnectはアイデンティティをOpenIDで、ソーシャルグラフをOpenSocial v0.8のRESTful APIで、エントリの公開範囲の制御をOAuthで、フィードをActivity Streamで解決しようとしています。**

これらの意味するところを深く見つめて行くと、未来のソーシャルウェブが自ずと見えてきます。

## Joseph Smarr氏(Plaxo)による未来のソーシャルウェブ論

FriendConnectのイメージをさらに深めるため、Joseph Smarr氏が、PlaxoのFriendConnect対応に際してアップしていたブログエントリをご紹介します。

<a class="entryheader" href="http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html">Plaxo and FriendConnect are now Best Friends</a>

> Plaxoが完全にFriendConnectと連携した。FriendConnectとは、あらゆるサイトをソーシャル化する、Googleによるウィジェットベースのツールである。これにより、FriendConnectに対応していれば、どんなサイトでもPlaxoアカウントに安全に接続し、サイト上に自分の友達がいるかを確認したり、友達を招待したりといったことができるようになる。何よりも素晴らしいのは、そのサイトでの活動内容をPulseに流し込むことができるようになり、Plaxoでの友達がウェブを跨いであなたと連絡を取り合うことができ、あなたが発見した新しいサイトを知ることができる点だ。
> 
> これは本当に便利でわくわくする連携機能だ &#8212; これはユーザーが自分のアイデンティティと関係をウェブ上のどこでも利用できるようにし、新しいサイトで知人を見つけ出し、活動内容を既存の友達に共有し、よりソーシャルな発見と共有という徳の高いサイクルを生み出す、<a href="http://therealmccrea.com/2008/05/02/can-lifestreaming-and-aggregation-go-mainstream/" target="_blank">シームレスソーシャルウェブエコシステム</a>にさらに近付いたと言える。これこそソーシャルウェブの進むべき道だ &#8212; (現在あるほとんどのサービスがそうだが)新しいソーシャルサイトを使い始める度に最初からやり直さなければならないなんてとんでもない。あなたの新しい体験全てが、他の人をも魅了すべきだ。
> 
> これはサービスがユーザーに自分の持つデータの制御を与え、オープンスタンダードを使って安全なアクセス権を提供することによってのみ成り立つ。そしてこれこそまさに、PlaxoがFriendConnectを使ってやりたかったことだ。Plaxoアカウントを接続する際、我々は<a href="http://oauth.net/" target="_blank">OAuth</a>を使う。そのため、Plaxoのパスワードを渡す必要もないし、後で接続を断つことも可能だ。FriendConnectを使ってあなたが活動内容をPulseに共有する際は、<a href="http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FRESTful%20API%20Specification" target="_blank">OpenSocial 0.8 RESTful Activities API</a>を利用する。オープンスタンダードではない連携はアドレス帳APIのみであり、我々はこのスタンダードについても<a href="http://portablecontacts.net/" target="_blank">取り組みを開始している</a>。我々は<a href="http://blog.plaxo.com/archives/2008/05/plaxo_becomes_s.html" target="_blank">アイデンティティプロバイダとして、ソーシャルグラフプロバイダとして、そしてコンテンツアグリゲータとしての役割</a>を果たしていると強く信じている &#8212; つまり、我々はユーザーが自身のデータと関係性をウェブ上のどこにでも持ち回り、どこからでも共有できるようにしている &#8212; これはユーザーにとっても、Plaxoにとっても、ウェブ全体にとっても有益なことだ。だが、まだこの取り組みは始まったばかり &#8212; FriendConnect対応サイトから活動内容を共有する際、家族や友達、仕事関係など、共有相手をより細かい粒度で制御するなどの、更なる拡張を楽しみにしていて欲しい。
> 
> 下のスクリーンショットはPlaxoとGoogle FriendConnectの連携したものだ &#8212; <a href="http://www.google.com/friendconnect/home/examples" target="_blank">FriendConnectを利用しているサイト</a>でも体験してもらうことができる。

画像は<a href="http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html" target="_blank">実際のページ</a>をご覧下さい。

## まとめ

ガジェットコンテナとしてのOpenSocialには正直、懐疑的な部分があったのですが、FriendConnectの描く未来を想像し、またわくわくしています。今後もこの辺りの動向を追って行きます。

## 追記

似たような話題に触れた記事を見つけたので追記し、トラバっておく。(失敗したので断念○|￣|＿)

<a href="http://japan.cnet.com/special/story/0,2000056049,20375542,00.htm" target="_blank">グーグルが見たソーシャルネットワーキング&#8211;その3つの傾向:スペシャルレポート &#8211; CNET Japan</a>