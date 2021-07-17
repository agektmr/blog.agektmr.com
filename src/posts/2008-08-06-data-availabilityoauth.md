---
title: Data AvailabilityでOAuthを試す
author: Eiji
layout: post
SBM_count:
  - '00003<>1271395930<>1<>0<>1<>1<>0'
dsq_thread_id:
  - 2475389
categories:
  - OAuth
tags:
  - Data Availability
  - MySpace
  - OAuth
  - OpenSocial
---
[][1]前エントリでの予告通り、実際にサーバーサイドでコードを書き、MySpaceのData Availabilityを使ってOAuthを試してみます。<a href="http://developer.myspace.com/community/myspace/dataavailability.aspx" target="_blank">Data Availability</a>という名前は大げさに聞こえるかもしれませんが、実際はOpenSocial RESTful APIです。ちなみにData AvailabilityではまだJSON形式のみのサポートで、AtomPubには対応していません(しかも404が返ってくる。これに相当ハマった○|￣|＿)。

今回はOAuthを使って認証・認可を取得し、Data Availability APIを叩くところまでを解説します。

## 下準備

まずはサンドボックス環境にMySpaceにアプリを作ってください。細かい手順が分からない方は<a href="http://itpro.nikkeibp.co.jp/article/COLUMN/20080708/310341/" target="_blank">この辺</a>を参考にしてください。

MySpaceではガジェットアプリも外部アプリも同じように扱われるようです。

<img class="alignnone size-full wp-image-108" title="MySpaceApps" src="/images/2008/08/e38394e382afe38381e383a3-11.jpg" alt="" width="500" height="98" />

Edit Detailsを開くと、アプリケーションの詳細設定を編集することができます。

ここで<a href="http://devlog.agektmr.com/archives/79" target="_blank">OAuthの利用に必要なもの</a>を思い出してください。まずはコンシューマキー(consumer\_key)とコンシューマシークレット(consumer\_secret)です。

<span style="text-decoration: underline;"><a href="/images/2008/08/e38394e382afe38381e383a3-31.jpg"><img class="alignnone size-full wp-image-110" title="MySpaceAppConsumer" src="/images/2008/08/e38394e382afe38381e383a3-31.jpg" alt="" width="500" height="126" /></a></span>

MySpaceの場合、アプリケーションを登録した段階でこれら2つが発行されます。コンシューマキーについては好きなものに変更できますが、ここではアプリケーションのガジェットXMLぽいURLにしてみました。後で必要になりますので、どこかにコピペっておきましょう。

[<img class="alignnone size-full wp-image-111" title="MySpaceAppDomain" src="/images/2008/08/e38394e382afe38381e383a3-4.jpg" alt="" width="500" height="309" />][2]

次に、同じページの下の方にExternal Site Settingsという項目があります。これがData Availabilityの肝です。

*   Use External Domainにチェックを入れる
*   External URLにMySpaceからの誘導先URLを入力
*   External Domainに実際に外部アプリを置くサーバーのドメインを入力
*   利用規約を読んで同意

これで準備オッケー。

## OAuthを実装する

[<img class="alignnone size-full wp-image-101" title="Inbound OAuth" src="/images/2008/08/e38394e382afe38381e383a3-3.jpg" alt="" width="500" height="148" />][3]

今回試すのは上図の外部サービス、つまりコンシューマに当たる部分です。サービスプロバイダに当たるのはMySpace。ゼロから実装してもよいのですが、せっかく<a href="http://code.google.com/p/oauth/" target="_blank">便利なライブラリ</a>がありますので、これのPHP版を使って試してみます。また、署名方式はHMAC-SHA1を使います。

OAuthのフローは下記の通り。<a href="http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html" target="_blank">この辺り</a>を読んで仕様を理解しておく事をお勧めします。

1.  リクエストトークンを取得
2.  ユーザー認証
3.  アクセストークンを取得
4.  リソースにアクセス

### **リクエストトークンを取得**

必要なライブラリをインクルードします。

<pre class="brush: php; title: ; notranslate" title="">require_once 'oauth/OAuth.php';
require_once 'oauth/OAuth_TestServer.php';</pre>

各種変数をセットしておきましょう。先程メモった**consumer_key**と**consumer_secret**はここで使います。**リクエストトークン**を取得するためのエンドポイントは<a href="http://developer.myspace.com/community/myspace/dataavailability.aspx" target="_blank">MySpaceのドキュメント</a>に記載されています。

<pre class="brush: php; title: ; notranslate" title="">$consumer['key'] = 'http://devlab.agektmr.com/MyOpenSpace/DataAvailabilityExample';
$consumer['secret'] = '************';
$endpoint = 'http://api.myspace.com/request_token';</pre>

署名のロジックはめんどくさいのでライブラリにお任せ。

<pre class="brush: php; title: ; notranslate" title="">$server = new TestOAuthServer(new MockOAuthDataStore());
$server-&gt;add_signature_method(new OAuthSignatureMethod_HMAC_SHA1());

$sig_methods = $server-&gt;get_signature_methods();
$sig_method = $sig_methods['HMAC-SHA1'];

$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$request = OAuthRequest::from_consumer_and_token($consumer, NULL, "GET", $endpoint, null);
$request-&gt;sign_request($sig_method, $consumer, NULL);

$req = curl_init($request);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);</pre>

ここまでのコードで$resultにリクエストトークンが返ってくることになります。URLのquery部と同じ形式で返ってきますので、必要に応じてパースしましょう。

<pre class="brush: php; title: ; notranslate" title="">parse_str($result, $tmp);</pre>

これで、**oauth_token**と**oauth\_token\_secret**が取得できたはずです。

### 認証

次にユーザーに認証を行ってもらいます。エンドポイントはhttp://api.myspace.com/authorizeで行います。その際、先程取得した**oauth_token**と**oauth_callback**をパラメータとして付属します。oauth_callbackは認証後に呼び出されるページのURL。

<pre class="brush: php; title: ; notranslate" title="">$callback_url = 'http://devlab.agektmr.com/MyOpenSpace/access.php';
$auth_url = 'http://api.myspace.com/authorize?oauth_token='.urlencode($tokens['oauth_token']).
    '&oauth_callback='.urlencode($callback_url);</pre>

[][4][<img class="alignnone size-medium wp-image-115" title="MySpaceAppAuth" src="/images/2008/08/e38394e382afe38381e383a3-5-300x288.jpg" alt="" width="300" height="288" />][5]

### アクセストークンを取得

先程指定したoauth_callbackのURLに**oauth_token**をパラメータとして付属してリダイレクトされてきます。これはこのoauth_tokenが認証済みであることを示しており、**アクセストークン**への交換が可能となります。

<pre class="brush: php; title: ; notranslate" title="">$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$tokener  = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
$access = OAuthRequest::from_consumer_and_token($consumer, $tokener, "GET", $endpoint, null);
$access-&gt;sign_request($sig_method, $consumer, $tokener);

$req = curl_init($access);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);</pre>

コードはリクエストトークン取得の際とあまり変わりありません。これでアクセストークンの**oauth_token**と**oauth\_token\_secret**が返っきたら準備オッケー。

### RESTful APIを叩く

ここまでに取得した**consumer_key**、**consumer_secret**、**oauth_token**、**oauth\_token\_secret**を使って署名したOAuthリクエストをRESTful APIに投げることにより、友達リストなどのデータ取得が可能になります。

<pre class="brush: php; title: ; notranslate" title="">$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$tokener  = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
$resource = OAuthRequest::from_consumer_and_token($consumer, $tokener, "GET", $endpoint, array('format'=&gt;'JSON'));
$resource-&gt;sign_request($sig_method, $consumer, $tokener);

$req = curl_init($resource);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);</pre>

これでエンドポイント($endpoint)を取得したいリソースのURLにすればOK。レスポンスボディにJSON形式でデータが返ってきます。

## サンプルアプリ

上記コードを使って一連の流れを見ながら動作を確認できるサンプルを用意しました。どういうリクエストを投げるのか参考になると思います。

<p style="text-align: center;">
  <a href="http://devlab.agektmr.com/DataAvailability/" target="_blank">実際に動作するサンプルはコチラ</a>
</p>

 [1]: http://devlog.agektmr.com/archives/79
 [2]: /images/2008/08/e38394e382afe38381e383a3-4.jpg
 [3]: /images/2008/08/e38394e382afe38381e383a3-3.jpg
 [4]: /images/2008/08/e38394e382afe38381e383a3-2.jpg
 [5]: /images/2008/08/e38394e382afe38381e383a3-5.jpg