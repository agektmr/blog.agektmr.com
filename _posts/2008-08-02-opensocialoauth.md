---
title: OpenSocialのOAuthまとめ
author: Eiji
layout: post
permalink: /archives/79
SBM_count:
  - '00027<>1271392316<>20<>0<>6<>1<>0'
syntaxhighlighter_encoded:
  - 1
dsq_thread_id:
  - 2381803
categories:
  - OAuth
  - OpenSocial
tags:
  - OAuth
  - OpenSocial
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/79" callback="wp_plus_one_handler"></g:plusone>
</div>

OpenSocialでは、コンテナが外部サーバーとの通信を行う際、または外部サーバーがコンテナと通信を行う際、OAuthを使用して認可を行います。今回はOpenSocialにおけるOAuthについて、現段階でのまとめを書いてみます。 ※追記(2008/10/20)：2008/10/4に書いた[コチラ][1]の記事も必読です。

## OAuthって何だったっけ？

OAuthは**ユーザー**、**コンシューマ**、**サービスプロバイダ**の3者間でデータのやり取りを行うとした場合、ユーザーがコンシューマにクレデンシャル(IDやパスワード)を渡すことなく、ユーザーが所有するサービスプロバイダ上の**リソース**にコンシューマをアクセスさせるためのものです。 例えば**ユーザー**が**Google(サービスプロバイダ)**の**アドレス帳(リソース)**を**MySpace(コンシューマ)**上で利用するシーンを思い浮かべてください。OAuthがなければ、MySpaceにGoogleのIDとパスワードを預けなければならなかったものが、OAuthを使うことで、ユーザーが直接Googleと認証のやりとりを行い、MySpaceにGoogleのID/パスワードを渡すことなく、アドレス帳のデータをMySpaceに渡すことができるようになります。

## 2種類のOAuth

さて、そんな便利なOAuthですが、OpenSocialで利用されるものには2種類あります。

### OAuth Core

<a href="http://oauth.net/core/1.0/" target="_blank">OAuth Core</a>では、先程説明したように、**ユーザー**、**コンシューマ**、**サービスプロバイダ**の3者間でやり取りを行います。ベーシックなものですので、詳細については<a href="http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html" target="_blank">この辺</a>りを参考にしてください。

### OAuth Consumer Request

一方<a href="http://oauth.googlecode.com/svn/spec/ext/consumer_request/1.0/drafts/1/spec.html" target="_blank">OAuth Consumer Request</a>は、OAuthの仕様からユーザー認証部分を除き、コンシューマとサービスプロバイダのやり取りにフォーカスした仕様で、一般に&#8221;**two-legged OAuth**&#8220;と呼ばれます。これはコンシューマとサービスプロバイダの信頼関係だけで、ユーザーによる認証を伴わない仕様のため、<span style="text-decoration: line-through;">コンシューマがサービスプロバイダからパブリックな情報を取得したい場合に利用するケースが想定されます。</span> (かなり恥ずかしい間違いです。正確には**コンシューマが署名を付加することで、サービスプロバイダがリクエスト元とリクエスト内容に間違いがないことを確認できる仕様**、です。/ 2009年10月追記)ちなみにOpenSocial v0.7ではOAuth Coreの利用は仕様に含まれておらず、このtwo-legged OAuthを利用することになっています。OAuth Coreが利用できるのはOpenSocial v0.8以降での話になります(もちろん、two-legged OAuthも利用できます)。

## OpenSocialにおけるOAuth利用パターン

OpenSocialでOAuthを利用する形態として、さらに2通りが考えられます。

### ガジェットが外部サーバーとやり取りを行うOutbound OAuth

[<img class="alignnone size-medium wp-image-100" title="Outbound OAuth" src="http://devlog.agektmr.com/wp-content/uploads/2008/08/e38394e382afe38381e383a3-1-300x95.jpg" alt="" width="300" height="95" />][2] ここでは仮に**Outbound OAuth**と呼びます。type=&#8221;html&#8221;で作られたガジェットが、SNSコンテナをプロキシとしてコンシューマの役割を果たし、サービスプロバイダとなる外部サーバーとmakeRequestで通信を行うケースです。

### 外部サーバーがコンテナとやり取りを行うInbound OAuth

[<img class="alignnone size-medium wp-image-101" title="Inbound OAuth" src="http://devlog.agektmr.com/wp-content/uploads/2008/08/e38394e382afe38381e383a3-3-300x88.jpg" alt="" width="300" height="88" />][3] ここでは仮に**Inbound OAuth**と呼びます。コンシューマとなる外部サーバーがサービスプロバイダであるSNSコンテナのRESTful APIを叩くケースです。type=&#8221;url&#8221;のガジェットが外部サーバーを通してSNSコンテナのRESTful APIを叩くケースもこれに該当します。

## OAuthの利用に必要なもの

OAuthの利用には前提条件がいくつか存在します。細かい仕様は別途調べていただくとして、事前に必要な条件が下記になります。

*   コンシューマが、サービスプロバイダの発行する以下を事前に知っていること。 
    *   コンシューマキー(consumer_key)
    *   コンシューマシークレット(consumer_secret)
*   コンシューマが、サービスプロバイダとOAuthのやり取りを行う以下3つのURLを知っていること 
    *   サービスプロバイダのリクエストトークンURL
    *   サービスプロバイダのアクセストークンURL
    *   サービスプロバイダの認証URL

※追記(2008/10/20)：コンシューマシークレットについては、署名方式がRSA-SHA1の場合、必須ではありません。詳しくは[コチラ][1]。 OAuth利用パターンごとにどのようにしてこの条件をクリアするかを検証してみます。

### Outbound OAuthのケース

ガジェットが外部サーバーとやり取りを行うケースですので、まずはガジェット開発者がSNSコンテナにコンシューマキーとコンシューマシークレットを登録します。ですが僕の知る限り、まだ**Outbound OAuthを実装しているSNSはありません**。なので、ここでは何かしらの手段を用いて(SSLページでFormを使って投稿等)、コンシューマキーとコンシューマシークレットをコンテナに渡したものと想定してください。(今後順次、これを実現する方法は登場するものと思われます。) 次に、サービスプロバイダの各種URLを渡す必要がありますが、v0.8ではガジェットXMLで渡すよう規定されています。OAuthをModulePrefsの中に作成してください。

<pre class="brush: xml; title: ; notranslate" title="">&lt;oauth&gt;
&lt;service name="google"&gt;
&lt;request url="https://www.google.com/accounts/OAuthGetRequestToken?scope=http://www.google.com/m8/feeds/" /&gt;
&lt;access url="https://www.google.com/accounts/OAuthGetAccessToken" /&gt;
&lt;authorization url="https://www.google.com/accounts/OAuthAuthorizeToken" /&gt;
&lt;/service&gt;
&lt;/oauth&gt;
</pre>

OAuthは必ずしも1つのサーバーとやり取りするとは限りませんので、Serviceを追加することで複数をサポートすることができるようになっています。Service@nameで使い分けることが出来るようになっていますので、必要に応じてmakeRequestのopt_paramsに下記のパラメータを加え、サービスを指定してください。

<pre>gadgets.io.RequestParameters.OAUTH_SERVICE_NAME</pre>

サービスプロバイダとOAuthのやり取りを行うURLについては、XRDS-Simpleによって解決する方法もありますが、こちらについては別の機会にまとめてご紹介します。

### Inbound OAuthのケース

外部アプリケーションがSNSコンテナのRESTful APIにアクセスする場合になります。これはまさに、FacebookのFacebook ConnectやMySpaceのData Availability、GoogleのFriendConnectに該当するもので、まだ実験的な段階にあると言えるものです。 コンシューマキーとコンシューマシークレットですが、SNSコンテナ上でアプリケーションを登録することで発行されます。それをディベロッパがメモ/コピペしてコンシューマとなるサーバーのコードに埋め込みましょう。URLについては、単純にヘルプページを見る方法と、XRDS-Simpleによるオートディスカバリを行う方法が考えられます。

## まとめ

今回は大まかな話を書きましたが、次回は実際にMySpaceのData Availabilityを使ってOAuth認証を行い、データを取得するところまでを試してみたいと思います。

 [1]: http://devlog.agektmr.com/archives/174
 [2]: http://devlog.agektmr.com/wp-content/uploads/2008/08/e38394e382afe38381e383a3-1.jpg
 [3]: http://devlog.agektmr.com/wp-content/uploads/2008/08/e38394e382afe38381e383a3-3.jpg