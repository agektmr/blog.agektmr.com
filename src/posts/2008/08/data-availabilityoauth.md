---
title: Data Availability で OAuth を試す
layout: post
date: 2008-08-06
tags:
  - Data Availability
  - MySpace
  - OAuth
  - OpenSocial
---

[前エントリ](http://devlog.agektmr.com/archives/79)での予告通り、実際にサーバー
サイドでコードを書き、MySpace の Data Availability を使って OAuth を試してみま
す。[Data
Availability](http://developer.myspace.com/community/myspace/dataavailability.aspx)
という名前は大げさに聞こえるかもしれませんが、実際は OpenSocial RESTful API で
す。ちなみに Data Availability ではまだ JSON 形式のみのサポートで、AtomPub には
対応していません(しかも 404 が返ってくる。これに相当ハマった○|￣|＿)。今回は
OAuth を使って認証・認可を取得し、Data Availability API を叩くところまでを解説し
ます。

## 下準備

まずはサンドボックス環境に MySpace にアプリを作ってください。細かい手順が分から
ない方は[この辺](http://itpro.nikkeibp.co.jp/article/COLUMN/20080708/310341/)を
参考にしてください。

MySpace ではガジェットアプリも外部アプリも同じように扱われるようです。

![MySpaceApps](/images/2008/08/e38394e382afe38381e383a3-11.jpg)

Edit Details を開くと、アプリケーションの詳細設定を編集することができます。

ここで [OAuth の利用に必要なもの](http://devlog.agektmr.com/archives/79)を思い出し
てください。まずはコンシューマキー (consumer_key) とコンシューマシークレット
(consumer_secret) です。

![MySpaceAppConsumer](/images/2008/08/e38394e382afe38381e383a3-31.jpg)

MySpace の場合、アプリケーションを登録した段階でこれら 2 つが発行されます。コン
シューマキーについては好きなものに変更できますが、ここではアプリケーションのガ
ジェット XML ぽい URL にしてみました。後で必要になりますので、どこかにコピペって
おきましょう。

![MySpaceAppDomain](/images/2008/08/e38394e382afe38381e383a3-4.jpg)

次に、同じページの下の方に External Site Settings という項目があります。これが
Data Availability の肝です。

* Use External Domain にチェックを入れる
* External URL に MySpace からの誘導先 URL を入力
* External Domain に実際に外部アプリを置くサーバーのドメインを入力
* 利用規約を読んで同意

これで準備オッケー。

## OAuthを実装する

![Inbound OAuth](/images/2008/08/e38394e382afe38381e383a3-3.jpg)

今回試すのは上図の外部サービス、つまりコンシューマに当たる部分です。サービスプロ
バイダに当たるのは MySpace。ゼロから実装してもよいのですが、せっかく[便利なライ
ブラリ](http://code.google.com/p/oauth/)がありますので、これの PHP 版を使って試
してみます。また、署名方式は HMAC-SHA1 を使います。

OAuth のフローは下記の通り。[この辺
り](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html)を読んで仕
様を理解しておく事をお勧めします。

1. リクエストトークンを取得
2. ユーザー認証
3. アクセストークンを取得
4. リソースにアクセス

### **リクエストトークンを取得**

必要なライブラリをインクルードします。

```php
require_once 'oauth/OAuth.php';
require_once 'oauth/OAuth_TestServer.php';
```

各種変数をセットしておきましょう。先程メモった **consumer_key** と
**consumer_secret** はここで使います。**リクエストトークン**を取得するためのエン
ドポイントは [MySpace のドキュメン
ト](http://developer.myspace.com/community/myspace/dataavailability.aspx)に記載
されています。

```php
$consumer['key'] = 'http://devlab.agektmr.com/MyOpenSpace/DataAvailabilityExample';
$consumer['secret'] = '************';
$endpoint = 'http://api.myspace.com/request_token';
```
```

署名のロジックはめんどくさいのでライブラリにお任せ。

```php
$server = new TestOAuthServer(new MockOAuthDataStore());
$server->add_signature_method(new OAuthSignatureMethod_HMAC_SHA1());

$sig_methods = $server->get_signature_methods();
$sig_method = $sig_methods['HMAC-SHA1'];

$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$request = OAuthRequest::from_consumer_and_token($consumer, NULL, "GET", $endpoint, null);
$request->sign_request($sig_method, $consumer, NULL);

$req = curl_init($request);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);
```

ここまでのコードで `$result` にリクエストトークンが返ってくることになります。URL の query 部と同じ形式で返ってきますので、必要に応じてパースしましょう。

```php
parse_str($result, $tmp);
```

これで、**oauth_token**と**oauth_token_secret** が取得できたはずです。

### 認証

次にユーザーに認証を行ってもらいます。エンドポイントは `http://api.myspace.com/authorize` で行います。その際、先程取得した **oauth_token** と **oauth_callback** をパラメータとして付属します。oauth_callback は認証後に呼び出されるページの URL。

```php
$callback_url = 'http://devlab.agektmr.com/MyOpenSpace/access.php';
$auth_url = 'http://api.myspace.com/authorize?oauth_token='.urlencode($tokens['oauth_token']).
    '&oauth_callback='.urlencode($callback_url);
```

![MySpaceAppAuth](/images/2008/08/e38394e382afe38381e383a3-5-300x288.jpg)

### アクセストークンを取得

先程指定した oauth_callback の URL に **oauth_token** をパラメータとして付属して
リダイレクトされてきます。これはこの oauth_token が認証済みであることを示してお
り、**アクセストークン**への交換が可能となります。

```php
$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$tokener  = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
$access = OAuthRequest::from_consumer_and_token($consumer, $tokener, "GET", $endpoint, null);
$access->sign_request($sig_method, $consumer, $tokener);

$req = curl_init($access);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);
```

コードはリクエストトークン取得の際とあまり変わりありません。これでアクセストーク
ンの **oauth_token** と **oauth_token_secret** が返っきたら準備オッケー。

### RESTful APIを叩く

ここまでに取得した **consumer_key**、**consumer_secret**、**oauth_token**、
**oauth_token_secret** を使って署名した OAuth リクエストを RESTful API に投げる
ことにより、友達リストなどのデータ取得が可能になります。

```php
$consumer = new OAuthConsumer($consumer['key'], $consumer['secret'], NULL);
$tokener  = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
$resource = OAuthRequest::from_consumer_and_token($consumer, $tokener, "GET", $endpoint, array('format'=>'JSON'));
$resource->sign_request($sig_method, $consumer, $tokener);

$req = curl_init($resource);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);
```

これでエンドポイント($endpoint)を取得したいリソースの URL にすれば OK。レスポンスボディに JSON 形式でデータが返ってきます。

## サンプルアプリ

上記コードを使って一連の流れを見ながら動作を確認できるサンプルを用意しました。どういうリクエストを投げるのか参考になると思います。

[実際に動作するサンプルはコチラ](http://devlab.agektmr.com/DataAvailability/)
