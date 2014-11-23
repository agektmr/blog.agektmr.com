---
title: OpenSocial Signed Requestライブラリ(PHP)をベータ公開
author: Eiji
layout: post
permalink: /archives/597
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00021<>1271395879<>17<>0<>3<>1<>0'
dsq_thread_id:
  - 
  - 
categories:
  - OpenSocial
tags:
  - OAuth
  - Signed Request
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/597" callback="wp_plus_one_handler"></g:plusone>
</div>

OpenSocialのSigned Requestは、ガジェットからの外部通信リクエストに署名を付けることで、パラメータの内容が改ざんされていないかを検証可能にする仕組みです。一般に2-legged OAuthやSigned Request、OAuth Consumer Requestという名前はすべて同じ、これを表しています。

<a href="http://developer.mixi.co.jp/appli/pc/lets_enjoy_making_mixiapp/require_servers" target="_blank">実装自体は全く難しくない</a>ものなのですが、お手軽なライブラリがあまり出回っていないようなので、作ってみました。<a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">まずはベータとして公開します</a>。

## 特徴

<a href="http://code.google.com/p/oauth/" target="_blank">Google CodeにあるOAuthのライブラリ</a>を利用しています。公開鍵はorkut、Google、Friendster、hi5、hyves、Netlog、そしてgooホームとmixiのものを同梱しています。

## 使い方

Google Codeからチェックアウトしてください。

<pre>svn checkout http://opensocial-signed-request-php-library.googlecode.com/svn/trunk/ opensocial-signed-request-php-library-read-only</pre>

中身はサンプルガジェット(SignedRequest.xml)とサンプルのサーバーサイド実装(example.php)、そしてライブラリです。

サンプルの<a href="http://code.google.com/p/opensocial-signed-request-php-library/source/browse/trunk/example.php" target="_blank">サーバーサイド実装</a>を見て頂くのが一番早いですが、使い方はシンプル。ガジェットのURLを引数にしてSignedRequestValidatorをnewし、validate_requestメソッドを呼ぶだけ。署名の検証に失敗した場合は、勝手に401を返します。署名の検証に成功した場合のコードは、その後に続けて書けばOKです。

## 参考

僕の知る限り、他の言語でSigned Requestを検証するコードやライブラリを公開されている方も何人かいらっしゃいます。

*   Google AppEngine Python版 Django上で動作する<a href="http://code.google.com/p/gaeoauth/" target="_blank">gaeoauth</a>
*   Google AppEngine Python版で動作する<a href="http://yamashita.dyndns.org/blog/verifying-opensocial-signed-request-with-google-app-engine/" target="_blank">コード</a>
*   Apacheモジュールレベルで動作する<a href="http://code.google.com/p/mod-auth-opensocial/" target="_blank">mod_auth_opensocial</a>

## まとめ

ベータ公開ではありますが、動作上の問題はないと思います。ただ、そのままのコードではGoogleからのリクエストもmixiからのリクエストもガジェットURLが合えば通してしまうため、任意に指定できるようにした方がいいかなど、フィードバックをもらって判断したいところと感じています。

※ちなみに、oauth\_body\_hashには未対応です。

というわけで、ぜひお試しください。