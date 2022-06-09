---
title: Google Developer Day 2009
author: Eiji
layout: post
date: 2009-06-12
categories:
  - Google
  - SocialWeb
  - イベント
tags:
  - gdd09
  - Google Developer Day
---
6月9日にパシフィコ横浜にて<a href="http://code.google.com/intl/ja/events/developerday/2009/home.html" target="_blank">Google Developer Day</a>が開催されました。  
僕は基調講演に一瞬と、OpenSocial Panel Discussionのセッションに登壇させて頂きました。

## 基調講演デモ

基調講演では、先日一般ユーザー向けにも公開した<a href="http://home.goo.ne.jp" target="_blank">gooホーム</a>のOpenSocialを使って、goo地図ガジェットとフォトビューアーガジェットが<a href="http://photomemo.jp" target="_blank">Photomemo</a>のガジェットに連動して動く、というソーシャルウェブ・ポータルというコンセプトを打ち出したgooホームならではのデモをお披露目しました。基調講演では言いそびれてしまったのですが、このアイディアは元々、<a href="http://blog.goo.ne.jp/goohome_developer/e/6e7bcb5387791ebc2ad8dfbc658161ea" target="_blank">先日行われたHackathon</a>でディベロッパーの1チームが見せてくれたものを元にしています。

実装としては、OpenSocialに含まれるpubsubというフィーチャーを使っています。pubsubは、任意に作成されたチャンネルに対してオブジェクトをpublishすると、同じチャンネルをsubscribeしているガジェットのコールバック関数が呼ばれオブジェクトが届く、というかなり単純な仕組みです。pubsubについては、近いうちに<a href="http://developer.home.goo.ne.jp/" target="_blank">goo Developer&#8217;s Kitchen</a>の方にもドキュメントを追加します。

また、今回のデモを行うため、PhotomemoチームにPhotomemoガジェットとフォトビューアーガジェットを開発して頂きました。ご協力ありがとうございました。

## OpenSocial Panel Discussion

もうひとつ参加させて頂いたのがPanel Discussionでした。今回は先日のデブサミでもご一緒させて頂いたリクルートの川崎さんに加え、mixiの川岸さん、そしてGoogleの及川さんとのディスカッションになりました。

内容については、OpenSocialというよりはSocialWebを広い観点で捉え、その中で現状使えるOpenSocialというピース、およびこれから広がっていくSocialWebの世界に関して。僕の中でもmixiアプリとgooホームガジェットの目指す所がまるっきり違うことに気付いたのは割と最近なので、その辺りが分かりやすく伝わるようにお話しさせて頂きました。

## まとめ

Panel Discussionの場でも言いましたが、日本のSocialWebという世界観にまだまだ伸びしろがあると感じています。海外に比べると実名が好まれなかったり、最大のSNSがクローズドだったりと、海外のそれを単純に輸入できないことは十分理解していますが、必ず近いうちに求めらる技術になっていくと思います。

共感された方はぜひ、<a href="http://groups.google.com/group/socialweb-japan/" target="_blank">SocialWeb Japan</a>にご参加下さい。