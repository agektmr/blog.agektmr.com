---
title: MySpaceのRESTful APIでOAuth認証を試してみる
author: Eiji
layout: post
permalink: /archives/42
SBM_count:
  - '00008<>1271393657<>6<>0<>1<>1<>0'
dsq_thread_id:
  - 2395885
categories:
  - OAuth
tags:
  - MySpace
  - OAuth
  - RESTful API
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/42" callback="wp_plus_one_handler"></g:plusone>
</div>

MySpaceで公開されているMDP(MySpace Developer Platform)には、OpenSocialだけでなく独自のRESTful APIも含まれており、これを使うことでサーバーサイドにアプリケーションを作ることもできるようになっています。今回は、MDPのRESTful APIのOAuth認証にフォーカスを当ててみます。

## OpenSocial/MDPのOAuthについて

OAuthとは、ユーザーとユーザーが利用したいサービス(以後サービスプロバイダ)を仲介するOpenSocial等のコンテナ(以後コンシューマ)が、サービスプロバイダの認証情報を知ることなくAPIを操ることを可能にする、認可のためのプロトコルです。

例えばユーザーがコンシューマ上でサービスプロバイダのアプリを利用しようとすると、サービスプロバイダのドメイン上にある認証画面にリダイレクトされ、ユーザーが許可をし、そこではじめて、コンシューマがサービスプロバイダのAPIを利用可能になる、という使い方が想定されています。

しかし、現在のところOpenSocialで規定されているOAuthはフルスペックではありません。ユーザーがサービスプロバイダの認証画面にリダイレクトされたり、コンシューマとサービスプロバイダがトークンを交換したりといった仕様は想定されていないのです。

これはOpenSocialガジェットがJavaScriptで動作しているためトークンを管理できない、等の理由があるようですが、MySpace独自のRESTful APIでも条件は同じようで、コンシューマキーとコンシューマシークレットがあれば、トークンなしでOAuth認証を行うことができます。

※OAuthの詳しい仕様に関しては<a href="http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html" target="_blank">この辺り</a>を参考にしてください。

## アプリケーションプロフィールを作る

まずはMySpaceでアプリケーションを作る準備をします。

MySpaceでアプリケーションを作るためには、ユーザーアカウントとアプリケーションのプロフィールアカウントが必要です。下記のサイトにスクリーンショット付きで解説がありますので、参考にしてください。

<a href="http://d.hatena.ne.jp/yorihito_tanaka/20080408" target="_blank">MySpaceアプリケーションを作ろう &#8211; ラーニング人生。</a>

## OAuth認証の準備

アプリケーションプロフィールが作れたら、XMLやJavaScriptのコードは不要です。今回の目的はRESTful APIの認証を試すところにありますので、画面左の<a href="http://developer.myspace.com/modules/apps/pages/myapps.aspx" target="_blank">My Apps</a>をクリックし、作成したアプリケーションプロフィールのEdit Detailsをクリックしてください。

[<img class="alignnone size-medium wp-image-43" title="myspace_myapps" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_myapps-300x160.jpg" alt="" width="300" height="160" />][1]

画面下部にOAuth Consumer KeyとOAuth Consumer Secretという部分があります。RESTful APIにアクセスするには、これらが必要になりますので、メモ帳などにコピペしておいてください。OAuth Consumer Keyは任意に変更できますので、変更してもよいかもしれません(保存は忘れずに)。 

<span style="color: #0000ee; text-decoration: underline;"><a href="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_myapp_detail.jpg"></a><a href="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_myapp_detail.jpg"><img class="alignnone size-full wp-image-44" title="myspace_myapp_detail" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_myapp_detail.jpg" alt="" width="499" height="49" /></a></span>

## OAuth Toolで認証してみる

OAuthではコンシューマキーとNonce、Timestampなどから署名(Signature)を作って認証を行います。署名の作り方は複雑なので、今回はMDPで提供されている<a href="http://developer.myspace.com/modules/apis/pages/oauthtool.aspx" target="_blank">OAuth Tool</a>を使って試してみます。

[<img class="alignnone size-medium wp-image-45" title="myspace_oauthtool" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_oauthtool-300x209.jpg" alt="" width="300" height="209" />][2]

画面右にある項目を埋めていきます。

*   **Server:** サーバーURL。RFC3986で言うschemeとauthorityに当たります。ここではhttp://api.myspace.comとします。
*   **ResourceURL:** サーバーURL以降のパス。RFC3986で言うpathに当たります。queryとfragmentは含みません。ここは/users/{user\_id}/friendsとして、user\_idにはあなたのユーザーIDを入力してください。他の利用可能なエンドポイントは<a href="http://developer.myspace.com/community/RestfulAPIs/resources.aspx" target="_blank">ここ</a>に記載されています。
*   **Request Method:** HTTPメソッド。GETとします。
*   **Consumer Key:** OAuthのコンシューマキー。先程メモったConsumer Keyを入力してください。
*   **Consumer Secret:** OAuthのコンシューマシークレット。先程メモったConsumer Keyを入力してください。
*   **OAuth Token:** トークン。正式なOAuthではサービスプロバイダに許可を受けてアクセストークンと交換し、初めて認可されます。今回は空の状態にしてください。
*   **OAuth Token Secret:** トークンシークレット。正式なOAuthでトークンの交換に必要になります。今回は空の状態にしてください。
*   **<span style="font-weight: normal;"><strong>OAuth TimeStamp:</strong> TimeStamp。UNIXタイムで現在時刻を入力します。今回は空の状態にしてください。</span>**
*   **<span style="font-weight: normal;"><strong>OAuth Nonce:</strong> Nonce。何でもよいですが、毎回必ず違う値を送る必要があります。今回は空の状態にしてください。</span>**
*   **Signature Method:** 署名方式。HMAC-SHA1を選択。
*   **Version:** OAuthのバージョン。1.0とします。
*   **OAuth Mode:** OAuthモード。Authorization Headerとしてください。
*   **Query options:** OAuth Toolの使い方。Generate URI and Submitとしてください。

<img class="alignnone size-full wp-image-46" title="myspace_oauthtool_detail" src="http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_oauthtool_detail.jpg" alt="" width="203" height="424" />

これでOK。executeをクリックします。

Response Bodyにどんな表示が返ってきたでしょうか。自分の友達リストが返ってきていれば成功です。Resource URLの最後に&#8221;.json&#8221;を付け加えると、結果をJSON形式にすることもできます。

## まとめ

実はこのやり方のOAuthは、外部サーバーからコンテナであるMySpaceに対してリクエストを投げる場合だけでなく、OpenSocialのmakeRequestで、コンテナのプロキシを介して外部サーバーに送られるリクエストでも同じやり方が利用されます。その際は当然、自分で用意するサーバーの受け口がOAuthをサポートしている必要があります。

気になるのは、やはりトークンの交換や、サービスプロバイダ側に認証を行わせる部分が省かれていること。OpenSocialとOAuthは非常に相性が良いと思っていたのですが、認証が出来ないとなると、サービスプロバイダが持つUserIDとコンテナのUserIDを紐付けたりといったことができないことになります。僕が仕様を勘違いしているだけなのか、今後OAuthにもちゃんと対応して行くのか。

makeRequestを使った外部サーバーとのデータ交換については、また別の機会に解説します。

※API(OAuth Tool?)が不安定なようで、お昼はうまくいったのにこの記事を書いている時点では、なぜかNot Foundが返ってきてしまいました・・・

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_myapps.jpg
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/04/myspace_oauthtool.jpg