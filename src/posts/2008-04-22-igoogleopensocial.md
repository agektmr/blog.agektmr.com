---
title: ついにiGoogleがOpenSocial対応へ
layout: post
date: 2008-04-22
tags:
  - Gadget
  - iGoogle
  - OpenSocial
---

今日から、[OpenSocial機能提供に向け、iGoogleでsandboxの利用が可能になりまし
た](http://jp.techcrunch.com/archives/20080421hints-of-igoogle-turning-into-its-own-social-network/)。
これは明白に、**Google 自身がソーシャルネットワークを基盤とした仕組みになってい
く** ことを意味しています。以前[Maka-Makaと呼ばれるプロジェク
ト](http://jp.techcrunch.com/archives/googles-response-to-facebook-maka-maka/)が
存在し、Google 独自の SNS サービスが始まるという話題がありましたが、それが
OpenSocial というオープンな形を取り、予想していたとはいえ、iGoogle という形で現
実のものにされると、さすが、としか言いようがありません。

で、早速試してみました。

まずはサインアップ。[こちら](http://www.google.com/ig/sandbox)からできます。(言
語設定は英語にしておかないと、サインアップしても sandbox が利用できないようで
す。)

![igoogle_signup](/images/2008/04/igoogle_signup-300x161.jpg)

http://code.google.com/apis/igoogle/docs/anatomy.html

これが新しい iGoogle の画面。

![igoogle_top](/images/2008/04/igoogle_top-300x147.jpg)

画面左にあるのがインストールしたアプリケーション/ガジェット。これをクリックするとキャンバスビューが開きます。

![igoogle_navi](/images/2008/04/igoogle_navi-110x300.jpg)

画面右側には Update としてアクティビティストリーム(行動履歴)が表示されるとのこと
ですが、まだ確認できていません。SNS ですから、友達リストがあってもおかしくないの
ですが、sandbox では友達なしの状態からスタートし、sandbox に登録しているユーザー
同士でなければ友達になれないとのこと。どうやって友達になれるかは、まだ不明。実際
のサービス時は Google Talk/Gmail のアドレス帳からスタートすることは容易に想像で
きます。

また他にも、ガジェットごとの設定項目の表示方法が変更されているようです。

で、せっかくの sandbox ですから、早速以前作った FriendIntroducer を試してみまし
た。OpenSocial とはいえ、コンテナごとにビュー名は若干違うよね、ということで、ガ
ジェット XML に home ビューを追記し、Developer ガジェットから追加。

![igoogle_gadget](/images/2008/04/igoogle_gadget.jpg)

んー。友達がいないので、当然こういう表示になってしまいますが、動いていることは確
認できました。やはりそこは OpenSocial。

## まとめ

あくまで基盤とはいえ、Google は本当に恐ろしい存在です。すべてのウェブサービスを
飲み込めるくらい、地を這ってる。au や livedoor の Gmail しかり、Google App
Engine しかり。何でもかんでも Google に乗っけてしまえってくらい。

そして Google には Android もあります。そう、携帯電話のアドレス帳もこの友達リス
トに接続できるようになるでしょう。そうすると、友達のブログ更新をメールで受け取っ
たり、そのままケータイで閲覧したりといったことがユーザーに何のストレスも与えずに
可能になります。

あと足りないのはプロフィールビューでしょうか。Google Map や Google Groups で部分
的に実現されてはいますが、これがどういう形で結実していくか、見物です。
