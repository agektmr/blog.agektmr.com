---
title: 米 Yahoo が OpenSocial に対応
layout: post
date: 2008-10-29
tags:
  - SocialWeb
  - OpenSocial
  - Y!OS
  - Yahoo!
---

本日米 Yahoo!から、Yahoo! Open Strategy 1.0 として、ディベロッパ向けに[Yahoo!
Application Platform (YAP)](http://developer.yahoo.com/yap/), [Yahoo! Social
Platform (YSP),](http://developer.yahoo.com/social/) [Yahoo! Query Language
(YQL)](http://developer.yahoo.com/yql/)が[リリー
ス](http://developer.yahoo.net/blog/archives/2008/10/yos_10_launch.html)されまし
た。

## Yahoo! Social Platform

プロフィールやアドレス帳、更新情報等、ソーシャルにまつわる API を REST ベースで
提供するものです。認証機構には OAuth を利用し、PHP 版、Flash 版のライブラリも提
供されていますが、この REST API は OpenSocial 互換ではありません。

## Yahoo! Query Language

SQL ライクなコマンドを送信する事で Yahoo! Pipes のようにデータ取得が可能なウェブ
ベースの API。[Facebook の FQL](http://wiki.developers.facebook.com/index.php/FQL)
のようなもののようです。

## Yahoo! Application Platform

Yahoo!上で動作する埋め込み型のアプリケーション。OpenSocial のガジェットプラット
フォームは現時点ではサポートされていませんが、JavaScript API は使えるようです。
大きく 2 つのビューがあります。

![yos_appdef](/images/2008/10/yos_appdef-300x184.jpg)

### Small View

HTML または[YML Lite](http://developer.yahoo.com/yap/yml/)のみサポート。
JavaScript はサポートされていません。YML は、[Facebook で言うところの
FBML](http://wiki.developers.facebook.com/index.php/FBML)のようなもので、
My!Yahoo 等様々なページにパーツとして表示する事が想定されています。

### **Canvas View**

****ディベロッパが指定した URL が出力した YML をプロキシして表示するタイプのアプ
リケーション。Facebook ライクな仕組みですね。もちろん、サーバーサイドで Yahoo!
Social Platform を使ったプログラムを書く事で、OAuth で認証を行い、REST ベースで
ソーシャルグラフを取得したり、コンタクトリストを取得したりすることできます。

また、[OpenSocial JavaScript API(v0.8)にも対
応](http://developer.yahoo.com/yap/guide/yap-opensocial.html)しているので、クラ
イアントサイドから更新情報を追加するといった利用も可能な様子。
[Caja](http://devlog.agektmr.com/archives/49)が利用されているので、セキュリティ
に気遣う事なく実装できそうです。(いつのまに実用レベルに達していたのでしょう
か・・・)

時間のある時にでもサンプルアプリケーションを作ってみたいと思います。

## 所感

今回の Yahoo!のリリースは、Facebook プラットフォームと OpenSocial のいいとこ取り
といった感じ。ただし、OpenSocial に完全に準拠している訳ではないので、他で作った
アプリケーションをちょっとだけ書き換えて転用、という訳には行かなそうです。

~~例えば、クライアントから makeRequest を使って外部サーバーのデータを取得するよう
な JavaScript API は利用する事ができません。また、OpenSocial なら HTML を出力すればよ
かったものが、YML を出力しなければなりません。等々・・~~ (追記：Gadgets Core API
は利用できるようです。ただし、Pref、View など、feature で指定する機能は利用でき
ません。また、YML は通常の HTML に加え、独自タグを使って拡張した機能が使える、と
いうもののようです。ただ、Caja 対応のために外部スクリプトを読み込めないことが、
他のコンテナに実装したガジェットをインポートする際の障壁になりそうです。)

ただ、世界最大のポータルサイトが OpenSocial に対応することの意義は大きく、今後の
動きは要注目です。全体の戦略からすれば、OpenSocial の対応はあくまでパーツに過ぎ
ず、今後のウェブのあり方を位置づける重要な意味を持ちます。先日行われた[Yahoo!
Open Hack Day のプレゼンテーショ
ン](http://www.kidsallright.com/blog/2008/09/18/yahoo-open-strategy-overview/)は
必見です。

どんどんプラットフォーム化していくウェブと、その中で占めるソーシャル機能の持つ重要性が、日本でも認識される日はそう遠くないと思います。
