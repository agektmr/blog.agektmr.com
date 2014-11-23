---
title: (たぶん)世界初！OAuthを使ったOpenSocial向けTwitterクライアント「ガジェツイ！」を公開しました
author: Eiji
layout: post
permalink: /archives/624
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00015<>1271392000<>12<>0<>2<>1<>0'
dsq_thread_id:
  - 
categories:
  - OAuth
  - OpenSocial
tags:
  - Gadget
  - ガジェツイ！
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/624" callback="wp_plus_one_handler"></g:plusone>
</div>

<a href="http://home.goo.ne.jp/gadget/qYpTF5ucNCt2/detail" target="_blank"><img class="size-full wp-image-643" title="GadgeTweetr_Logo" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/GadgeTweetr_Logo.png" alt="GadgeTweetr_Logo" width="616" height="119" /></a>

<a href="http://home.goo.ne.jp/" target="_blank">gooホーム</a>の<a href="http://developer.home.goo.ne.jp/document/OAuthリクエスト" target="_blank">OAuth機能</a>公開に合わせ、<a href="http://twitter.com/" target="_blank">Twitter</a>のOAuthを使ったガジェット「<a href="http://home.goo.ne.jp/gadget/qYpTF5ucNCt2/detail" target="_blank">ガジェツイ！</a>」(英語名GadgeTweetr)をリリースしました。ガジェットながらに、そんじょそこらのTwitterクライアントよりもシンプルかつ高機能で使いやすいものに仕上がったと思いますのでご紹介します。

※ガジェツイ！のロゴフォントには「<a href="http://d.hatena.ne.jp/y05k/20070519/p1" target="_blank">ついってる</a>」を利用させて頂きました。

## 主な機能

*   OAuthログイン機能
*   タブ機能
*   返信元表示機能
*   検索機能
*   マルチアカウントに対応

## OAuthログイン機能

<a href="http://oauth.net/core/1.0" target="_blank">OAuth</a>に対応していますので、IDとパスワードを直接gooホームに入力する必要はありません。「ログイン」ボタンクリックで、twitter.comドメインの画面が開くので、ユーザーは安心してログインすることができます。

<img style="border: 0px initial initial;" title="login_using_oauth" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/decd90d6f3baa9553fd625ecb11d3b8b-300x203.png" alt="login_using_oauth" width="300" height="203" />

## タブ機能

タブで様々な種類のステータスを並べて表示するタイプのTwitterクライアントです。Timeline、Mentions、Direct Message、Favoritesなど、一通りの表示に対応しています。

<img class="alignnone" style="border: 0px initial initial;" title="tabs" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/tabs.png" alt="tabs" width="288" height="143" />

## 返信元表示機能

ステータスが返信の場合は「返信元」をクリックすることで会話を辿って行くことができます。

<img class="size-medium wp-image-633 alignnone" title="replies" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/replies-300x157.png" alt="replies" width="300" height="157" />

## 検索機能

フリーワード検索にも対応しています。

<img class="size-medium wp-image-634 alignnone" title="search" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/search-300x203.png" alt="search" width="300" height="203" />

## マルチアカウントに対応

ガジェットはいくつでも追加でき、それぞれに違うアカウントを指定することができます。

<img class="size-thumbnail wp-image-631 alignnone" title="multi-account" src="http://devlog.agektmr.com/wp-content/uploads/2009/08/multi-account-150x150.png" alt="multi-account" width="150" height="150" />

## その他の機能

### 3つのビュー

home、profile、canvasそれぞれのビューに対応しています。homeではTimelineとMentionsが、profileでは当該ユーザーのステータスが、canvasではTimeline、Mentions、Direct Message、Favoritesがそれぞれデフォルトで開きます。

### 自動リンク機能

外部URLはもちろん、@によるID指定、そして#によるハッシュタグの指定を検知してリンク化します。URLの場合が別ウィンドウを開きますが、@と#の場合は新しいタブを作ってステータス一覧を表示します。

### ReTweet機能

気に入ったつぶやきはこのアイコンをクリックすることで、いわゆる「ReTweet」することができます。もちろん、コメントを追記することができます。

### プロフィール表示機能

アイコンクリックでフォロワー数や投稿数などのプロフィール情報を表示することができます。

### フォロー、アンフォロー機能

プロフィール表示からそのままフォローしたり、既にフォローしている場合はアンフォローすることができます。

## まとめ

せっかくOpenSocial上に作ったTwitterクライアントということで、ならではのソーシャル機能を準備していたのですが、残念ながら今回の発表には間に合いませんでした(実装でき次第公開します)。

とはいえ、gooホームのOAuthを体験してもらうためだけに作り始めたにも関わらず、シンプルかつ高機能なものに仕上がりました。ぜひガジェツイ！をお試しください。