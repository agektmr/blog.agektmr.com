---
title: MySpace の RESTful API で OAuth 認証を試してみる
layout: post
lang: ja
date: 2008-04-19
tags:
  - MySpace
  - OAuth
  - RESTful API
---

MySpace で公開されている MDP (MySpace Developer Platform) には、OpenSocial だけでなく独自の RESTful API も含まれており、これを使うことでサーバーサイドにアプリケーションを作ることもできるようになっています。今回は、MDP の RESTful API の OAuth 認証にフォーカスを当ててみます。

## OpenSocial/MDP の OAuth について

OAuth とは、ユーザーとユーザーが利用したいサービス(以後サービスプロバイダ)を仲介する OpenSocial 等のコンテナ(以後コンシューマ)が、サービスプロバイダの認証情報を知ることなく API を操ることを可能にする、認可のためのプロトコルです。

例えばユーザーがコンシューマ上でサービスプロバイダのアプリを利用しようとすると、サービスプロバイダのドメイン上にある認証画面にリダイレクトされ、ユーザーが許可をし、そこではじめて、コンシューマがサービスプロバイダの API を利用可能になる、という使い方が想定されています。

しかし、現在のところ OpenSocial で規定されている OAuth はフルスペックではありません。ユーザーがサービスプロバイダの認証画面にリダイレクトされたり、コンシューマとサービスプロバイダがトークンを交換したりといった仕様は想定されていないのです。

これは OpenSocial ガジェットが JavaScript で動作しているためトークンを管理できない、等の理由があるようですが、MySpace 独自の RESTful API でも条件は同じようで、コンシューマキーとコンシューマシークレットがあれば、トークンなしで OAuth 認証を行うことができます。

※ OAuth の詳しい仕様に関しては[この辺り](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html)を参考にしてください。

## アプリケーションプロフィールを作る

まずは MySpace でアプリケーションを作る準備をします。

MySpace でアプリケーションを作るためには、ユーザーアカウントとアプリケーションのプロフィールアカウントが必要です。下記のサイトにスクリーンショット付きで解説がありますので、参考にしてください。

[MySpace アプリケーションを作ろう – ラーニング人生。](http://d.hatena.ne.jp/yorihito_tanaka/20080408)

## OAuth 認証の準備

アプリケーションプロフィールが作れたら、XML や JavaScript のコードは不要です。今回の目的は RESTful API の認証を試すところにありますので、画面左の[My Apps](http://developer.myspace.com/modules/apps/pages/myapps.aspx)をクリックし、作成したアプリケーションプロフィールの Edit Details をクリックしてください。

![myspace_myapps](/images/2008/04/myspace_myapps-300x160.jpg)

画面下部に OAuth Consumer Key と OAuth Consumer Secret という部分があります。RESTful API にアクセスするには、これらが必要になりますので、メモ帳などにコピペしておいてください。OAuth Consumer Key は任意に変更できますので、変更してもよいかもしれません(保存は忘れずに)。 

![myspace_myapp_detail](/images/2008/04/myspace_myapp_detail.jpg)

## OAuth Tool で認証してみる

OAuth ではコンシューマキーと Nonce、Timestamp などから署名 (Signature) を作って認証を行います。署名の作り方は複雑なので、今回は MDP で提供されている [OAuth Tool](http://developer.myspace.com/modules/apis/pages/oauthtool.aspx) を使って試してみます。

![myspace_oauthtool](/images/2008/04/myspace_oauthtool-300x209.jpg)

画面右にある項目を埋めていきます。

* **Server:** サーバーURL。RFC3986 で言う `scheme` と `authority` に当たります。
  ここでは `http://api.myspace.com` とします。
* **ResourceURL:** サーバーURL 以降のパス。RFC3986 で言う path に当たります。
  query と fragment は含みません。ここは `/users/{user_id}/friends` として、`user_id`にはあなたのユーザー ID を入力してください。他の利用可能なエンドポイントは[ここ](http://developer.myspace.com/community/RestfulAPIs/resources.aspx)に記載されています。
* **Request Method:** HTTP メソッド。GET とします。
* **Consumer Key:** OAuth のコンシューマキー。先程メモった Consumer Key を入力してください。
* **Consumer Secret:** OAuth のコンシューマシークレット。先程メモった ConsumerKey を入力してください。
* **OAuth Token:** トークン。正式な OAuth ではサービスプロバイダに許可を受けてアクセストークンと交換し、初めて認可されます。今回は空の状態にしてください。
* **OAuth Token Secret:** トークンシークレット。正式な OAuth でトークンの交換に必要になります。今回は空の状態にしてください。
* **OAuth TimeStamp:** TimeStamp。UNIX タイムで現在時刻を入力します。今回は空の状態にしてください。
* **OAuth Nonce:** Nonce。何でもよいですが、毎回必ず違う値を送る必要があります。今回は空の状態にしてください。
* **Signature Method:** 署名方式。HMAC-SHA1 を選択。
* **Version:** OAuth のバージョン。1.0 とします。
* **OAuth Mode:** OAuth モード。Authorization Header としてください。
* **Query options:** OAuth Tool の使い方。Generate URI and Submit としてください。

![myspace_oauthtool_detail](/images/2008/04/myspace_oauthtool_detail.jp)

これで OK。execute をクリックします。

Response Body にどんな表示が返ってきたでしょうか。自分の友達リストが返ってきていれば成功です。Resource URL の最後に `.json` を付け加えると、結果を JSON 形式にすることもできます。

## まとめ

実はこのやり方の OAuth は、外部サーバーからコンテナである MySpace に対してリクエストを投げる場合だけでなく、OpenSocial の `makeRequest` で、コンテナのプロキシを介して外部サーバーに送られるリクエストでも同じやり方が利用されます。その際は当然、自分で用意するサーバーの受け口が OAuth をサポートしている必要があります。

気になるのは、やはりトークンの交換や、サービスプロバイダ側に認証を行わせる部分が省かれていること。OpenSocial と OAuth は非常に相性が良いと思っていたのですが、認証が出来ないとなると、サービスプロバイダが持つ UserID とコンテナの UserID を紐付けたりといったことができないことになります。僕が仕様を勘違いしているだけなのか、今後 OAuth にもちゃんと対応して行くのか。

`makeRequest` を使った外部サーバーとのデータ交換については、また別の機会に解説します。

※ API (OAuth Tool?) が不安定なようで、お昼はうまくいったのにこの記事を書いている時点では、なぜか Not Found が返ってきてしまいました・・・
