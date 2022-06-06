---
title: Google FriendConnect 対応ガジェットが完成
layout: post
date: 2009-01-06
tags:
  - FriendConnect
---
FriendConnect のメンバーが友達を紹介し合う文章が書ける Friend Introducer という
ガジェットを公開しました。このブログの画面左側に表示していますので、メンバーに
なってくれている方はぜひ、遊んでみてください。(なっていない方はメンバーになって
遊んでください！)

## FriendIntroducer とは

主に 3 つのビューが存在します。1 つはブログ上で表示される profile ビュー。

![FriendConnect4](/images/2009/01/e38394e382afe38381e383a3-2-155x300.png)

FriendConnect メンバーの紹介文を最大 5 件表示します。ページングが可能で、それぞ
れのメンバーに書かれた紹介文がランダムで表示されます。

メンバーのサムネイル画像をクリックすると detail ビュー~~(OpenSocial 的なビューで
はないですけどね)~~に切り替わります。(※ 誤解を招きそうなので修正。detail ビューは
僕が勝手にそう呼んでいるだけで、OpenSocial 的には profile ビューです。)

![FriendConnect5](/images/2009/01/e38394e382afe38381e383a3-3-166x300.png)

一人に対して複数の人が紹介文を書いている場合がありますので、detail ビューでは、
その人に関する紹介文をすべて閲覧することができます。

ガジェット上部のボタンをクリックすると canvas ビューに切り替わります。

![FriendConnect6](/images/2009/01/e38394e382afe38381e383a3-4-300x188.png)

canvas ビューでは、ログインユーザーの友達の紹介文を書くことができます。友達がい
ない方は、同じ FriendConnect 上の誰かを友達に加えてください。

## FriendIntroducer をブログに貼付けるには

まずは[こちら](http://www.google.com/friendconnect/)で FriendConnect に登録して
ください。サイト登録済みの状態で・・・

![FriendConnect1](/images/2009/01/e38394e382afe38381e383a3-12.png)

Social gadgets をクリックします。

![FriendConnect2](/images/2009/01/e38394e382afe38381e383a3-13-300x86.png)

一番下にある Custom gadget リンクをクリックします。

![FriendConnect3](/images/2009/01/e38394e382afe38381e383a3-14-213x300.png)

Gadget URL を
[http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml](http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml)
としてください。

ガジェットの横幅を調整し、Generate Code をクリックすると HTML コードが出力されま
すので、これをブログ等に貼付けます。

## 所感

以前のエントリにも書きましたが、FriendConnect ガジェット作成のミソは：

* OWNER はブログという仮想人格
* requestNavigateTo で canvas ビューと profile ビューを行き来できる
* canvas ビューのバックグラウンドは、サイト作成時に取り込んだ canvas.html をいじ
  ることで変更可能

といったところでしょうか。

今のところ OpenSocial にコミュニティ的な考えはないのですが、FriendConnect は
ちょっとひねったコミュニティ的な応用、と思うと分かりやすいかもしれません。

また、FriendConnect の面白いところは、複数の SNS からインポートした友達リストを
マージして利用できることです。例えば僕は orkut、Google、Plaxo、Twitter をイン
ポートしていますが、同じブログに登録している人がこれらの SNS 上で友達であれば、
FriendConnect 上でも友達になります。

いつか Google が iGoogle を SNS 化する際、これらの友達リストがそのまま利用できる
ようになるかもしれませんね。
