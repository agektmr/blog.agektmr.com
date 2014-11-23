---
title: Google FriendConnect対応ガジェットが完成
author: Eiji
layout: post
permalink: /archives/310
SBM_count:
  - '00002<>1271376948<>2<>0<>0<>0<>0'
categories:
  - FriendConnect
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/310" callback="wp_plus_one_handler"></g:plusone>
</div>

FriendConnectのメンバーが友達を紹介し合う文章が書けるFriend Introducerというガジェットを公開しました。このブログの画面左側に表示していますので、メンバーになってくれている方はぜひ、遊んでみてください。(なっていない方はメンバーになって遊んでください！)

## FriendIntroducerとは

主に3つのビューが存在します。1つはブログ上で表示されるprofileビュー。

<img class="alignnone size-medium wp-image-315" title="FriendConnect4" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-2-155x300.png" alt="FriendConnect4" width="155" height="300" />

FriendConnectメンバーの紹介文を最大5件表示します。ページングが可能で、それぞれのメンバーに書かれた紹介文がランダムで表示されます。

メンバーのサムネイル画像をクリックするとdetailビュー<span style="text-decoration: line-through;">(OpenSocial的なビューではないですけどね)</span>に切り替わります。(※誤解を招きそうなので修正。detailビューは僕が勝手にそう呼んでいるだけで、OpenSocial的にはprofileビューです。)

<img class="alignnone size-medium wp-image-316" title="FriendConnect5" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-3-166x300.png" alt="FriendConnect5" width="166" height="300" />

一人に対して複数の人が紹介文を書いている場合がありますので、detailビューでは、その人に関する紹介文をすべて閲覧することができます。

ガジェット上部のボタンをクリックするとcanvasビューに切り替わります。

<img class="alignnone size-medium wp-image-317" title="FriendConnect6" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-4-300x188.png" alt="FriendConnect6" width="300" height="188" />

canvasビューでは、ログインユーザーの友達の紹介文を書くことができます。友達がいない方は、同じFriendConnect上の誰かを友達に加えてください。

## FriendIntroducerをブログに貼付けるには

まずは<a href="http://www.google.com/friendconnect/" target="_blank">こちら</a>でFriendConnectに登録してください。サイト登録済みの状態で・・・

<img class="alignnone size-full wp-image-311" title="FriendConnect1" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-12.png" alt="FriendConnect1" width="184" height="216" />

Social gadgetsをクリックします。

<img class="alignnone size-medium wp-image-312" title="FriendConnect2" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-13-300x86.png" alt="FriendConnect2" width="300" height="86" />

一番下にあるCustom gadgetリンクをクリックします。

<img class="alignnone size-medium wp-image-313" title="FriendConnect3" src="http://devlog.agektmr.com/wp-content/uploads/2009/01/e38394e382afe38381e383a3-14-213x300.png" alt="FriendConnect3" width="213" height="300" />

Gadget URLを<a href="http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml" target="_blank">http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml</a>としてください。

ガジェットの横幅を調整し、Generate CodeをクリックするとHTMLコードが出力されますので、これをブログ等に貼付けます。

## 所感

以前のエントリにも書きましたが、FriendConnectガジェット作成のミソは：

*   OWNERはブログという仮想人格
*   requestNavigateToでcanvasビューとprofileビューを行き来できる
*   canvasビューのバックグラウンドは、サイト作成時に取り込んだcanvas.htmlをいじることで変更可能

といったところでしょうか。

今のところOpenSocialにコミュニティ的な考えはないのですが、FriendConnectはちょっとひねったコミュニティ的な応用、と思うと分かりやすいかもしれません。

また、FriendConnectの面白いところは、複数のSNSからインポートした友達リストをマージして利用できることです。例えば僕はorkut、Google、Plaxo、Twitterをインポートしていますが、同じブログに登録している人がこれらのSNS上で友達であれば、FriendConnect上でも友達になります。

いつかGoogleがiGoogleをSNS化する際、これらの友達リストがそのまま利用できるようになるかもしれませんね。