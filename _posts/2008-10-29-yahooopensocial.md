---
title: 米YahooがOpenSocialに対応
author: Eiji
layout: post
permalink: /archives/198
SBM_count:
  - '00004<>1271357976<>3<>0<>1<>0<>0'
dsq_thread_id:
  - 6377042
categories:
  - SocialWeb
tags:
  - OpenSocial
  - Y!OS
  - Yahoo!
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/198" callback="wp_plus_one_handler"></g:plusone>
</div>

本日米Yahoo!から、Yahoo! Open Strategy 1.0として、ディベロッパ向けに[Yahoo! Application Platform (YAP)][1], [Yahoo! Social Platform (YSP),][2] [Yahoo! Query Language (YQL)][3]が<a href="http://developer.yahoo.net/blog/archives/2008/10/yos_10_launch.html" target="_blank">リリース</a>されました。

## Yahoo! Social Platform

プロフィールやアドレス帳、更新情報等、ソーシャルにまつわるAPIをRESTベースで提供するものです。認証機構にはOAuthを利用し、PHP版、Flash版のライブラリも提供されていますが、このREST APIはOpenSocial互換ではありません。

## Yahoo! Query Language

SQLライクなコマンドを送信する事でYahoo! Pipesのようにデータ取得が可能なウェブベースのAPI。<a href="http://wiki.developers.facebook.com/index.php/FQL" target="_blank">FacebookのFQL</a>のようなもののようです。

## Yahoo! Application Platform

Yahoo!上で動作する埋め込み型のアプリケーション。OpenSocialのガジェットプラットフォームは現時点ではサポートされていませんが、JavaScript APIは使えるようです。大きく2つのビューがあります。

<div>
  <a href="http://devlog.agektmr.com/wp-content/uploads/2008/10/yos_appdef.jpg"><span style="text-decoration: none;"><img class="alignnone size-medium wp-image-199" title="yos_appdef" src="http://devlog.agektmr.com/wp-content/uploads/2008/10/yos_appdef-300x184.jpg" alt="" width="300" height="184" /></span></a>
</div>

### <span style="font-weight: normal;"><strong>Small View</strong></span>

<span style="font-weight: normal;">HTMLまたは<a href="http://developer.yahoo.com/yap/yml/" target="_blank">YML Lite</a>のみサポート。JavaScriptはサポートされていません。YMLは、<a href="http://wiki.developers.facebook.com/index.php/FBML" target="_blank">Facebookで言うところのFBML</a>のようなもので、 My!Yahoo等様々なページにパーツとして表示する事が想定されています。</span>

### **Canvas View**

****ディベロッパが指定したURLが出力したYMLをプロキシして表示するタイプのアプリケーション。Facebookライクな仕組みですね。もちろん、サーバーサイドでYahoo! Social Platformを使ったプログラムを書く事で、OAuthで認証を行い、RESTベースでソーシャルグラフを取得したり、コンタクトリストを取得したりすることできます。

また、<a href="http://developer.yahoo.com/yap/guide/yap-opensocial.html" target="_blank">OpenSocial JavaScript API(v0.8)にも対応</a>しているので、クライアントサイドから更新情報を追加するといった利用も可能な様子。[Caja][4]が利用されているので、セキュリティに気遣う事なく実装できそうです。(いつのまに実用レベルに達していたのでしょうか・・・)

時間のある時にでもサンプルアプリケーションを作ってみたいと思います。

## 所感

今回のYahoo!のリリースは、FacebookプラットフォームとOpenSocialのいいとこ取りといった感じ。ただし、OpenSocialに完全に準拠している訳ではないので、他で作ったアプリケーションをちょっとだけ書き換えて転用、という訳には行かなそうです。

<span style="text-decoration: line-through;">例えば、クライアントからmakeRequestを使って外部サーバーのデータを取得するようなJavaScript APIは利用する事ができません。また、OpenSocialならHTMLを出力すればよかったものが、YMLを出力しなければなりません。等々・・</span>(追記：Gadgets Core APIは利用できるようです。ただし、Pref、Viewなど、featureで指定する機能は利用できません。また、YMLは通常のHTMLに加え、独自タグを使って拡張した機能が使える、というもののようです。ただ、Caja対応のために外部スクリプトを読み込めないことが、他のコンテナに実装したガジェットをインポートする際の障壁になりそうです。)

ただ、世界最大のポータルサイトがOpenSocialに対応することの意義は大きく、今後の動きは要注目です。全体の戦略からすれば、OpenSocialの対応はあくまでパーツに過ぎず、今後のウェブのあり方を位置づける重要な意味を持ちます。先日行われた<a href="http://www.kidsallright.com/blog/2008/09/18/yahoo-open-strategy-overview/" target="_blank">Yahoo! Open Hack Dayのプレゼンテーション</a>は必見です。

どんどんプラットフォーム化していくウェブと、その中で占めるソーシャル機能の持つ重要性が、日本でも認識される日はそう遠くないと思います。

 [1]: http://developer.yahoo.com/yap/
 [2]: http://developer.yahoo.com/social/
 [3]: http://developer.yahoo.com/yql/
 [4]: http://devlog.agektmr.com/archives/49