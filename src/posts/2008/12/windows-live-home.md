---
title: Windows Live Home 登場
layout: post
date: 2008-12-04
tags:
  - SocialWeb
  - Windows Live
---

海外のメインプレイヤーが次々にソーシャル化していってます。今回はついに
Microsoft。

Windows Live といえば、元々 Messenger のソーシャルグラフを取り込んだブログサービ
スの [Spaces](http://spaces.live.com/)が SNS として存在していましたが、今回
[Home](http://home.live.com/)が中心となり、さらに SNS ライクになりました。

## Windows Live Profile

![livenew1](/images/2008/12/livenew1.jpg)

画面右上に友達リスト、中央には他の SNS でいうアクティビティストリームが表示され
ています。アクティビティストリームは Facebook 同様完全に時系列で、サービスごとに
まとめられたりはしていません。Live Messenger のムードメッセージが混じっているの
が Twitter 的で面白いところでしょうか。また、指定された外部サービスのフィードも
混ざって表示されています。

URL はサブサブドメイン(?)にユーザーの裏 ID らしき文字列で表現されていますのでシ
ンプル。この裏 ID は後で変更できるとスマートでいいですね。

## Windows Live Home

![livenew3](/images/2008/12/livenew3.jpg)

一番上には [Live Mail](http://mail.live.com/) (旧 Hotmail) の最新メール。その下
に、Live Messenger で繋がっている人の更新情報がアクティビティストリームとして表
示されています。Spaces との整理はよく分かりません。

画面右には広告枠とニュース、占い。うーん地味だ。

## Windows Live Photo

![livenew2](/images/2008/12/livenew2.jpg)

[SkyDrive](http://skydrive.live.com/) (MS が提供する 25GB(!) の無料ストレージ)
と連携したフォトストレージサービス。ここにもアクティビティストリームがあります
が、おそらく Live Photo に特化したフィードを表示してくれるのだと思います。友達の
最新フォトを確認できるだけでなく、自分の写真をアップロードしたりもできるようで
す。

## 外部サービスの取り込み

![livenew4](/images/2008/12/livenew4-300x207.jpg)

[Twitter](http://twitter.com/) や [Flickr](http://flickr.com/) などの外部サイト
を取り込んで、アクティビティストリームに混ぜることができます。一番最初に思いつく
類似サービスは [FriendFeed](http://friendfeed.com/) ですが、自身もソーシャルであ
るという意味では、ある種 [Facebook](http://www.facebook.com/) や
[Plaxo](http://www.plaxo.com/) の方が近いかもしれません。

## その他新サービス

他にも[Windows Live Group](http://group.live.com/)というグループコラボレーション
サービスがあるようです。

![livenew5](/images/2008/12/livenew5-300x202.jpg)

Live Messenger でのグループチャットや写真の共有に使えるようです。

## 技術的側面

Microsoft は Windows Live ID の OpenID 化を宣言していますが、その他の Open Stack
については、まだ特に言及していません。[OpenSocial](http://www.opensocial.org/)
や [OAuth](http://oauth.net/)、[PorableContacts](http://portablecontacts.net/) に
ついてです。調べてみると、[Delegated
Authentication](http://msdn.microsoft.com/en-us/library/cc287637.aspx) という独
自プロトコルを使って、OAuth 的なことを実現しているようです。

果たしてこのまま独自路線を走るのか？Yahoo!や MySpace のように独自路線+オープンス
タンダードの路線でいくのか？疑問が残るところです。

## Windows Live ソーシャル化の持つ意味

結局 Microsoft までもが、ウェブサービスだけでなくソーシャル化にまで手を出してき
ました。これはソーシャルグラフをプラットフォームに据えたサービスが今後のウェブで
は当たり前になっていくことを示唆しています。ただ、ソーシャルであれば万能という訳
でもないし、すぐに何かできるという訳でもありません。それを活用できるサービスが
あってこそ、初めて便利さが享受されるもの。では、Microsoft の戦略は？

実はすでに Windows Live メールはサーバー上のものと同期可能なクライアントソフトが
登場しており、SkyDrive もデスクトップとウェブでシームレスに利用できるクライアン
トが出るとか出ないとか。メッセンジャーは言わずもがな。ソーシャルグラフはとっくの
昔にメッセンジャーと Hotmail で共通化しています。他にも Writer というブログ編集
ソフトが既にリリースされています。

これらは明らかに、クラウドとしてのウェブサービスと、デスクトップソフトの組み合わ
せ利用を意識していると言え、そのいずれもが、SNS 的機能によってより実力を発揮する
ことができるものです。

今までウェブサービスとしては地味にやってきた感のある Microsoft ですが、そう考え
ると、Windows7 が出るタイミングで大バケする可能性も、否定はできません。

## 気になったこと

[Windows Live Gadget](http://gallery.live.com/) の使いどころを Home に用意してい
ないところが気になります。Gadget の仕様はよく知りませんが、もし OpenSocial に変
わる独自 JavaScript API を用意するのだとしたら、、、!?

この辺の戦略は気になるところです。
