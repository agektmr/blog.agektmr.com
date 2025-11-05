---
title: OpenSocial の OAuth まとめ
layout: post
lang: ja
date: 2008-08-02
tags:
  - OAuth
  - OpenSocial
---

OpenSocial では、コンテナが外部サーバーとの通信を行う際、または外部サーバーがコ
ンテナと通信を行う際、OAuth を使用して認可を行います。今回は OpenSocial における
OAuth について、現段階でのまとめを書いてみます。

※ 追記(2008/10/20)：2008/10/4 に書いた[コチ
ラ](http://devlog.agektmr.com/archives/174)の記事も必読です。

## OAuth って何だったっけ？

OAuth は**ユーザー**、**コンシューマ**、**サービスプロバイダ**の 3 者間でデータ
のやり取りを行うとした場合、ユーザーがコンシューマにクレデンシャル (ID やパス
ワード) を渡すことなく、ユーザーが所有するサービスプロバイダ上の**リソース**にコ
ンシューマをアクセスさせるためのものです。 例えば**ユーザー**が **Google (サービ
スプロバイダ) **の**アドレス帳 (リソース)** を **MySpace (コンシューマ)** 上で利
用するシーンを思い浮かべてください。OAuth がなければ、MySpace に Google の ID と
パスワードを預けなければならなかったものが、OAuth を使うことで、ユーザーが直接
Google と認証のやりとりを行い、MySpace に Google の ID/パスワードを渡すことな
く、アドレス帳のデータを MySpace に渡すことができるようになります。

## 2 種類の OAuth

さて、そんな便利な OAuth ですが、OpenSocial で利用されるものには 2 種類ありま
す。

### OAuth Core

[OAuth Core](http://oauth.net/core/1.0/)では、先程説明したように、**ユーザー**、
**コンシューマ**、**サービスプロバイダ**の 3 者間でやり取りを行います。ベーシッ
クなものですので、詳細については[この
辺](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html)りを参考に
してください。

### OAuth Consumer Request

一方 [OAuth Consumer
Request](http://oauth.googlecode.com/svn/spec/ext/consumer_request/1.0/drafts/1/spec.html)
は、OAuth の仕様からユーザー認証部分を除き、コンシューマとサービスプロバイダのや
り取りにフォーカスした仕様で、一般に "**two-legged OAuth**" と呼ばれます。これは
コンシューマとサービスプロバイダの信頼関係だけで、ユーザーによる認証を伴わない仕
様のため、コンシューマがサービスプロバイダからパブリックな情報を取得したい場合に
利用するケースが想定されます。 (かなり恥ずかしい間違いです。正確には**コンシュー
マが署名を付加することで、サービスプロバイダがリクエスト元とリクエスト内容に間違
いがないことを確認できる仕様**、です。/ 2009 年 10 月追記)ちなみに OpenSocial
v0.7 では OAuth Core の利用は仕様に含まれておらず、この two-legged OAuth を利用
することになっています。OAuth Core が利用できるのは OpenSocial v0.8 以降での話に
なります (もちろん、two-legged OAuth も利用できます)。

## OpenSocial における OAuth 利用パターン

OpenSocial で OAuth を利用する形態として、さらに 2 通りが考えられます。

### ガジェットが外部サーバーとやり取りを行う Outbound OAuth

![Outbound OAuth](/images/2008/08/e38394e382afe38381e383a3-1-300x95.jpg) ここで
は仮に **Outbound OAuth** と呼びます。`type="html"` で作られたガジェットが、SNS
コンテナをプロキシとしてコンシューマの役割を果たし、サービスプロバイダとなる外部
サーバーと `makeRequest` で通信を行うケースです。

### 外部サーバーがコンテナとやり取りを行う Inbound OAuth

![Inbound OAuth](/images/2008/08/e38394e382afe38381e383a3-3-300x88.jpg) ここでは
仮に **Inbound OAuth** と呼びます。コンシューマとなる外部サーバーがサービスプロ
バイダである SNS コンテナの RESTful API を叩くケースです。`type="url"` のガ
ジェットが外部サーバーを通して SNS コンテナの RESTful API を叩くケースもこれに該
当します。

## OAuth の利用に必要なもの

OAuth の利用には前提条件がいくつか存在します。細かい仕様は別途調べていただくとし
て、事前に必要な条件が下記になります。

* コンシューマが、サービスプロバイダの発行する以下を事前に知っていること。 
    * コンシューマキー(consumer_key)
    * コンシューマシークレット(consumer_secret)
* コンシューマが、サービスプロバイダと OAuth のやり取りを行う以下 3 つの URL を知っていること 
    * サービスプロバイダのリクエストトークン URL
    * サービスプロバイダのアクセストークン URL
    * サービスプロバイダの認証 URL

※ 追記(2008/10/20)：コンシューマシークレットについては、署名方式が RSA-SHA1 の場
合、必須ではありません。詳しくは[コチ
ラ](http://devlog.agektmr.com/archives/174)。 OAuth 利用パターンごとにどのように
してこの条件をクリアするかを検証してみます。

### Outbound OAuth のケース

ガジェットが外部サーバーとやり取りを行うケースですので、まずはガジェット開発者が
SNS コンテナにコンシューマキーとコンシューマシークレットを登録します。ですが僕の
知る限り、まだ **Outbound OAuth を実装している SNS はありません**。なので、ここ
では何かしらの手段を用いて (SSL ページで Form を使って投稿等)、コンシューマキーと
コンシューマシークレットをコンテナに渡したものと想定してください。(今後順次、こ
れを実現する方法は登場するものと思われます。) 次に、サービスプロバイダの各種 URL
を渡す必要がありますが、v0.8 ではガジェット XML で渡すよう規定されています。
OAuth を ModulePrefs の中に作成してください。

```xml
<oauth>
  <service name="google">
    <request url="https://www.google.com/accounts/OAuthGetRequestToken?scope=http://www.google.com/m8/feeds/" />
    <access url="https://www.google.com/accounts/OAuthGetAccessToken" />
    <authorization url="https://www.google.com/accounts/OAuthAuthorizeToken" />
  </service>
</oauth>
```

OAuth は必ずしも 1 つのサーバーとやり取りするとは限りませんので、Service を追加
することで複数をサポートすることができるようになっています。Service@name で使い
分けることが出来るようになっていますので、必要に応じて makeRequest の opt_params
に下記のパラメータを加え、サービスを指定してください。

```
gadgets.io.RequestParameters.OAUTH_SERVICE_NAME
```

サービスプロバイダと OAuth のやり取りを行う URL については、XRDS-Simple によって
解決する方法もありますが、こちらについては別の機会にまとめてご紹介します。

### Inbound OAuth のケース

外部アプリケーションが SNS コンテナの RESTful API にアクセスする場合になります。
これはまさに、Facebook の Facebook Connect や MySpace の Data Availability、
Google の FriendConnect に該当するもので、まだ実験的な段階にあると言えるもので
す。 コンシューマキーとコンシューマシークレットですが、SNS コンテナ上でアプリ
ケーションを登録することで発行されます。それをディベロッパがメモ/コピペしてコン
シューマとなるサーバーのコードに埋め込みましょう。URL については、単純にヘルプ
ページを見る方法と、XRDS-Simple によるオートディスカバリを行う方法が考えられま
す。

## まとめ

今回は大まかな話を書きましたが、次回は実際に MySpace の Data Availability を使っ
て OAuth 認証を行い、データを取得するところまでを試してみたいと思います。
