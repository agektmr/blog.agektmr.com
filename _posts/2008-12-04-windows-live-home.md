---
title: Windows Live Home登場
author: Eiji
layout: post
permalink: /archives/254
SBM_count:
  - '00001<>1271346980<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 8322741
categories:
  - SocialWeb
  - Windows Live
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/254" callback="wp_plus_one_handler"></g:plusone>
</div>

海外のメインプレイヤーが次々にソーシャル化していってます。今回はついにMicrosoft。

Windows Liveといえば、元々Messengerのソーシャルグラフを取り込んだブログサービスの<a href="http://spaces.live.com/" target="_blank">Spaces</a>がSNSとして存在していましたが、今回<a href="http://home.live.com/" target="_blank">Home</a>が中心となり、さらにSNSライクになりました。

## Windows Live Profile

[<img class="alignnone size-medium wp-image-244" title="livenew1" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew1-300x195.jpg" alt="" width="300" height="195" />][1]

画面右上に友達リスト、中央には他のSNSでいうアクティビティストリームが表示されています。アクティビティストリームはFacebook同様完全に時系列で、サービスごとにまとめられたりはしていません。Live Messengerのムードメッセージが混じっているのがTwitter的で面白いところでしょうか。また、指定された外部サービスのフィードも混ざって表示されています。

URLはサブサブドメイン(?)にユーザーの裏IDらしき文字列で表現されていますのでシンプル。この裏IDは後で変更できるとスマートでいいですね。

## Windows Live Home

[<img class="alignnone size-medium wp-image-245" title="livenew3" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew3-278x300.jpg" alt="" width="278" height="300" />][2]

一番上には<a href="http://mail.live.com/" target="_blank">Live Mail</a>(旧Hotmail)の最新メール。その下に、Live Messengerで繋がっている人の更新情報がアクティビティストリームとして表示されています。Spacesとの整理はよく分かりません。

画面右には広告枠とニュース、占い。うーん地味だ。

## Windows Live Photo

[<img class="alignnone size-medium wp-image-246" title="livenew2" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew2-300x268.jpg" alt="" width="300" height="268" />][3]

<a href="http://skydrive.live.com/" target="_blank">SkyDrive</a>(MSが提供する25GB(!)の無料ストレージ)と連携したフォトストレージサービス。ここにもアクティビティストリームがありますが、おそらくLive Photoに特化したフィードを表示してくれるのだと思います。友達の最新フォトを確認できるだけでなく、自分の写真をアップロードしたりもできるようです。

## 外部サービスの取り込み

[<img class="alignnone size-medium wp-image-247" title="livenew4" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew4-300x207.jpg" alt="" width="300" height="207" />][4]

<a href="http://twitter.com/" target="_blank">Twitter</a>や<a href="http://flickr.com/" target="_blank">Flickr</a>などの外部サイトを取り込んで、アクティビティストリームに混ぜることができます。一番最初に思いつく類似サービスは<a href="http://friendfeed.com/" target="_blank">FriendFeed</a>ですが、自身もソーシャルであるという意味では、ある種<a href="http://www.facebook.com/" target="_blank">Facebook</a>や<a href="http://www.plaxo.com/" target="_blank">Plaxo</a>の方が近いかもしれません。

## その他新サービス

他にも<a href="http://group.live.com/" target="_blank">Windows Live Group</a>というグループコラボレーションサービスがあるようです。

[<img class="alignnone size-medium wp-image-248" title="livenew5" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew5-300x202.jpg" alt="" width="300" height="202" />][5]

Live Messengerでのグループチャットや写真の共有に使えるようです。

## 技術的側面

MicrosoftはWindows Live IDのOpenID化を宣言していますが、その他のOpen Stackについては、まだ特に言及していません。<a href="http://www.opensocial.org/" target="_blank">OpenSocial</a>や<a href="http://oauth.net/" target="_blank">OAuth</a>、<a href="http://portablecontacts.net/" target="_blank">PorableContacts</a>についてです。調べてみると、<a href="http://msdn.microsoft.com/en-us/library/cc287637.aspx" target="_blank">Delegated Authentication</a>という独自プロトコルを使って、OAuth的なことを実現しているようです。

果たしてこのまま独自路線を走るのか？Yahoo!やMySpaceのように独自路線+オープンスタンダードの路線でいくのか？疑問が残るところです。

## Windows Liveソーシャル化の持つ意味

結局Microsoftまでもが、ウェブサービスだけでなくソーシャル化にまで手を出してきました。これはソーシャルグラフをプラットフォームに据えたサービスが今後のウェブでは当たり前になっていくことを示唆しています。ただ、ソーシャルであれば万能という訳でもないし、すぐに何かできるという訳でもありません。それを活用できるサービスがあってこそ、初めて便利さが享受されるもの。では、Microsoftの戦略は？

実はすでにWindows Liveメールはサーバー上のものと同期可能なクライアントソフトが登場しており、SkyDriveもデスクトップとウェブでシームレスに利用できるクライアントが出るとか出ないとか。メッセンジャーは言わずもがな。ソーシャルグラフはとっくの昔にメッセンジャーとHotmailで共通化しています。他にもWriterというブログ編集ソフトが既にリリースされています。

これらは明らかに、クラウドとしてのウェブサービスと、デスクトップソフトの組み合わせ利用を意識していると言え、そのいずれもが、SNS的機能によってより実力を発揮することができるものです。

今までウェブサービスとしては地味にやってきた感のあるMicrosoftですが、そう考えると、Windows7が出るタイミングで大バケする可能性も、否定はできません。

## 気になったこと

<a href="http://gallery.live.com/" target="_blank">Windows Live Gadget</a>の使いどころをHomeに用意していないところが気になります。Gadgetの仕様はよく知りませんが、もしOpenSocialに変わる独自JavaScript APIを用意するのだとしたら、、、!?

この辺の戦略は気になるところです。

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew1.jpg
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew3.jpg
 [3]: http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew2.jpg
 [4]: http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew4.jpg
 [5]: http://devlog.agektmr.com/wp-content/uploads/2008/12/livenew5.jpg