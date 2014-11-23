---
title: FriendConnect実験中
author: Eiji
layout: post
permalink: /archives/262
SBM_count:
  - '00003<>1271199177<>1<>0<>2<>0<>0'
dsq_thread_id:
  - 8150124
categories:
  - FriendConnect
  - Google
  - OpenSocial
tags:
  - FriendConnect
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/262" callback="wp_plus_one_handler"></g:plusone>
</div>

本ブログ左サイドバーの下の方に、Friend Introducerという以前作ったOpenSocialガジェットをFriendConnect用に若干修正して追加してみました(2008/12/9時点)。

[<img class="alignnone size-medium wp-image-265" title="e38394e382afe38381e383a3-1" src="http://devlog.agektmr.com/wp-content/uploads/2008/12/e38394e382afe38381e383a3-1-126x300.png" alt="" width="126" height="300" />][1]

元々このガジェットは、キャンバスビューで自分の友達の紹介文を書き、プロフィールビューでその人に書かれた紹介文が読める、というものでした。Orkutやhi5等のsandboxで試していたものです。

しかし今回FriendConnectでガジェットを試して明確に分かったことがいくつか。

*   ブログは1面しかありません。そのためビューはprofileまたはcanvasから選択。FriendConnectのSocialGadget設定画面で決めることができます。
*   friendconnectフィーチャーというものがあるようです。具体的に何をするものなのかは不明。
*   Ownerはサイト。そういえば、FriendConnectガジェットを入れた時点では、自動的に自分がメンバーになったりはしていませんでした。Ownerは貼付けたサイトという仮想人格が担うようです。

ビューに関しては、profileビューにするとサイトがOwnerとして表示されるので、よくわからない状態。APIでプロフィールを取得するとどうなるかは未検証です。現在はcanvasビューで表示していますが、おかげさまで自分で自分の友達の紹介文を書くだけで、誰にも見せられないというしょーもないガジェットになっています(&#8211;;。

そういえば他のFriendConnectガジェットは右上にキャンバスビューに移行するボタンがありますね。どうやってこれを使うことができるんでしょう？時間があるときにでも追いかけてみたいと思います。

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/12/e38394e382afe38381e383a3-1.png