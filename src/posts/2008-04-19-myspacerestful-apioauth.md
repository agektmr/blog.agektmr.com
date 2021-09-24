---
title: MySpaceのRESTful APIでOAuth認証を試してみる
layout: post
date: 2008-04-19
tags:
  - MySpace
  - OAuth
  - RESTful API
---

MySpace で公開されている MDP(MySpace Developer Platform) には、OpenSocial だけで
なく独自の RESTful API も含まれており、これを使うことでサーバーサイドにアプリ
ケーションを作ることもできるようになっています。今回は、MDP の RESTful API の
OAuth 認証にフォーカスを当ててみます。

## OpenSocial/MDPのOAuthについて

OAuth とは、ユーザーとユーザーが利用したいサービス(以後サービスプロバイダ)を仲介
する OpenSocial 等のコンテナ(以後コンシューマ)が、サービスプロバイダの認証情報を
知ることなく API を操ることを可能にする、認可のためのプロトコルです。

例えばユーザーがコンシューマ上でサービスプロバイダのアプリを利用しようとすると、
サービスプロバイダのドメイン上にある認証画面にリダイレクトされ、ユーザーが許可を
し、そこではじめて、コンシューマがサービスプロバイダの API を利用可能になる、と
いう使い方が想定されています。

しかし、現在のところ OpenSocial で規定されている OAuth はフルスペックではありま
せん。ユーザーがサービスプロバイダの認証画面にリダイレクトされたり、コンシューマ
とサービスプロバイダがトークンを交換したりといった仕様は想定されていないのです。

これは OpenSocial ガジェットが JavaScript で動作しているためトークンを管理できな
い、等の理由があるようですが、MySpace 独自の RESTful API でも条件は同じようで、
コンシューマキーとコンシューマシークレットがあれば、トークンなしで OAuth 認証を
行うことができます。

※ OAuth の詳しい仕様に関しては[この辺
り](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html)を参考にし
てください。

## アプリケーションプロフィールを作る

まずは MySpace でアプリケーションを作る準備をします。

MySpace でアプリケーションを作るためには、ユーザーアカウントとアプリケーションの
プロフィールアカウントが必要です。下記のサイトにスクリーンショット付きで解説があ
りますので、参考にしてください。

[MySpaceアプリケーションを作ろう – ラーニング人
生。](http://d.hatena.ne.jp/yorihito_tanaka/20080408)

## OAuth認証の準備

アプリケーションプロフィールが作れたら、XML や JavaScript のコードは不要です。今
回の目的は RESTful API の認証を試すところにありますので、画面左の[My
Apps](http://developer.myspace.com/modules/apps/pages/myapps.aspx)をクリックし、
作成したアプリケーションプロフィールの Edit Details をクリックしてください。

![myspace_myapps](/images/2008/04/myspace_myapps-300x160.jpg)

画面下部に OAuth Consumer Key と OAuth Consumer Secret という部分があります。
RESTful API にアクセスするには、これらが必要になりますので、メモ帳などにコピペし
ておいてください。OAuth Consumer Key は任意に変更できますので、変更してもよいか
もしれません(保存は忘れずに)。 

![myspace_myapp_detail](/images/2008/04/myspace_myapp_detail.jpg)

## OAuth Toolで認証してみる

OAuth ではコンシューマキーと Nonce、Timestamp などから署名 (Signature) を作って
認証を行います。署名の作り方は複雑なので、今回は MDP で提供されている [OAuth
Tool](http://developer.myspace.com/modules/apis/pages/oauthtool.aspx) を使って試
してみます。

![myspace_oauthtool](/images/2008/04/myspace_oauthtool-300x209.jpg)

画面右にある項目を埋めていきます。

* **Server:** サーバーURL。RFC3986 で言う scheme と authority に当たります。ここ
  ではhttp://api.myspace.comとします。
* **ResourceURL:** サーバーURL 以降のパス。RFC3986 で言う path に当たります。
  query と fragment は含みません。ここは/users/{user_id}/friends として、user_id
  にはあなたのユーザーID を入力してください。他の利用可能なエンドポイントは[こ
  こ](http://developer.myspace.com/community/RestfulAPIs/resources.aspx)に記載さ
  れています。
* **Request Method:** HTTP メソッド。GET とします。
* **Consumer Key:** OAuth のコンシューマキー。先程メモった Consumer Key を入力し
  てください。
* **Consumer Secret:** OAuth のコンシューマシークレット。先程メモった Consumer
  Key を入力してください。
* **OAuth Token:** トークン。正式な OAuth ではサービスプロバイダに許可を受けてア
  クセストークンと交換し、初めて認可されます。今回は空の状態にしてください。
* **OAuth Token Secret:** トークンシークレット。正式な OAuth でトークンの交換に
  必要になります。今回は空の状態にしてください。
* **OAuth TimeStamp:** TimeStamp。UNIX タイムで現在時刻を入力します。今回は空の
  状態にしてください。
* **OAuth Nonce:** Nonce。何でもよいですが、毎回必ず違う値を送る必要があります。
  今回は空の状態にしてください。
* **Signature Method:** 署名方式。HMAC-SHA1 を選択。
* **Version:** OAuth のバージョン。1.0 とします。
* **OAuth Mode:** OAuth モード。Authorization Header としてください。
* **Query options:** OAuth Tool の使い方。Generate URI and Submit としてくださ
  い。

![myspace_oauthtool_detail](/images/2008/04/myspace_oauthtool_detail.jp)

これで OK。execute をクリックします。

Response Body にどんな表示が返ってきたでしょうか。自分の友達リストが返ってきてい
れば成功です。Resource URL の最後に `.json` を付け加えると、結果を JSON 形式にす
ることもできます。

## まとめ

実はこのやり方の OAuth は、外部サーバーからコンテナである MySpace に対してリクエ
ストを投げる場合だけでなく、OpenSocial の `makeRequest` で、コンテナのプロキシを
介して外部サーバーに送られるリクエストでも同じやり方が利用されます。その際は当
然、自分で用意するサーバーの受け口が OAuth をサポートしている必要があります。

気になるのは、やはりトークンの交換や、サービスプロバイダ側に認証を行わせる部分が
省かれていること。OpenSocial と OAuth は非常に相性が良いと思っていたのですが、認
証が出来ないとなると、サービスプロバイダが持つ UserID とコンテナの UserID を紐付
けたりといったことができないことになります。僕が仕様を勘違いしているだけなのか、
今後 OAuth にもちゃんと対応して行くのか。

`makeRequest` を使った外部サーバーとのデータ交換については、また別の機会に解説しま
す。

※ API (OAuth Tool?) が不安定なようで、お昼はうまくいったのにこの記事を書いている
時点では、なぜか Not Found が返ってきてしまいました・・・
