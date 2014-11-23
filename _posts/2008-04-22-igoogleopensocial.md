---
title: ついにiGoogleがOpenSocial対応へ
author: Eiji
layout: post
SBM_count:
  - '00000<>1271393680<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 3768221
categories:
  - OpenSocial
tags:
  - Gadget
  - iGoogle
  - OpenSocial
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/50" callback="wp_plus_one_handler"></g:plusone>
</div>

今日から、<a href="http://jp.techcrunch.com/archives/20080421hints-of-igoogle-turning-into-its-own-social-network/" target="_blank">OpenSocial機能提供に向け、iGoogleでsandboxの利用が可能になりました</a>。これは明白に、**Google自身がソーシャルネットワークを基盤とした仕組みになっていく**ことを意味しています。以前<a href="http://jp.techcrunch.com/archives/googles-response-to-facebook-maka-maka/" target="_blank">Maka-Makaと呼ばれるプロジェクト</a>が存在し、Google独自のSNSサービスが始まるという話題がありましたが、それがOpenSocialというオープンな形を取り、予想していたとはいえ、iGoogleという形で現実のものにされると、さすが、としか言いようがありません。

で、早速試してみました。

まずはサインアップ。<a href="http://www.google.com/ig/sandbox" target="_blank">こちら</a>からできます。(言語設定は英語にしておかないと、サインアップしてもsandboxが利用できないようです。)

[<img class="alignnone size-medium wp-image-54" title="igoogle_signup" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_signup-300x161.jpg" alt="" width="300" height="161" />][1]

<a href="http://code.google.com/apis/igoogle/docs/anatomy.html" target="_blank">http://code.google.com/apis/igoogle/docs/anatomy.html</a>

これが新しいiGoogleの画面。

[<img class="alignnone size-medium wp-image-52" title="igoogle_top" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_top-300x147.jpg" alt="" width="300" height="147" />][2]

画面左にあるのがインストールしたアプリケーション/ガジェット。これをクリックするとキャンバスビューが開きます。

[<img class="alignnone size-medium wp-image-53" title="igoogle_navi" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_navi-110x300.jpg" alt="" width="110" height="300" />][3]

画面右側にはUpdateとしてアクティビティストリーム(行動履歴)が表示されるとのことですが、まだ確認できていません。SNSですから、友達リストがあってもおかしくないのですが、sandboxでは友達なしの状態からスタートし、sandboxに登録しているユーザー同士でなければ友達になれないとのこと。どうやって友達になれるかは、まだ不明。実際のサービス時はGoogle Talk/Gmailのアドレス帳からスタートすることは容易に想像できます。

また他にも、ガジェットごとの設定項目の表示方法が変更されているようです。

で、せっかくのsandboxですから、早速以前作ったFriendIntroducerを試してみました。OpenSocialとはいえ、コンテナごとにビュー名は若干違うよね、ということで、ガジェットXMLにhomeビューを追記し、Developerガジェットから追加。

[<img class="alignnone size-full wp-image-55" title="igoogle_gadget" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_gadget.jpg" alt="" width="370" height="253" />][4]

んー。友達がいないので、当然こういう表示になってしまいますが、動いていることは確認できました。やはりそこはOpenSocial。

## まとめ

あくまで基盤とはいえ、Googleは本当に恐ろしい存在です。すべてのウェブサービスを飲み込めるくらい、地を這ってる。auやlivedoorのGmailしかり、Google App Engineしかり。何でもかんでもGoogleに乗っけてしまえってくらい。

そしてGoogleにはAndroidもあります。そう、携帯電話のアドレス帳もこの友達リストに接続できるようになるでしょう。そうすると、友達のブログ更新をメールで受け取ったり、そのままケータイで閲覧したりといったことがユーザーに何のストレスも与えずに可能になります。

あと足りないのはプロフィールビューでしょうか。Google MapやGoogle Groupsで部分的に実現されてはいますが、これがどういう形で結実していくか、見物です。

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_signup.jpg
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_top.jpg
 [3]: http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_navi.jpg
 [4]: http://devlog.agektmr.com/wp-content/uploads/2008/04/igoogle_gadget.jpg