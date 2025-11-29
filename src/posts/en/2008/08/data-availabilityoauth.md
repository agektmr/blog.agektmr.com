---
layout: post
lang: en
title: 'Try OAuth with Data Availability'
description: ''
date: 2008-08-06
tags:
- Data Availability
  - MySpace
  - OAuth
  - OpenSocial
translationOf: /2008/08/data-availabilityoauth.html
translated: 2025-11-29
translatedManually: false
---
As promised in the previous entry, I'll actually write some server-side code and test OAuth using MySpace's Data Availability. [Data
Availability](http://developer.myspace.com/community/myspace/dataavailability.aspx)
The name may sound a bit pretentious, but it's actually the OpenSocial RESTful API. Incidentally, Data Availability currently only supports JSON format and doesn't support AtomPub (and it returns a 404 error, which was quite frustrating).
This time, I'll explain how to use OAuth to obtain authentication and authorization and then call the Data Availability API.

## Preparation

First, create an app on MySpace in a sandbox environment. If you don't know the detailed steps, please refer to [here](http://itpro.nikkeibp.co.jp/article/COLUMN/20080708/310341/).

It seems that MySpace treats gadget apps and external apps the same.

![MySpaceApps](/images/2008/08/e38394e382afe38381e383a3-11.jpg)

Edit Details allows you to edit the application's detailed settings.

Let's recall what you need to use OAuth:
First, you need a consumer key (consumer_key) and a consumer secret (consumer_secret).

![MySpaceAppConsumer](/images/2008/08/e38394e382afe38381e383a3-31.jpg)

In the case of MySpace, these two items are issued when you register your application.
You can change the consumer key to anything you like, but here I've made it a URL that looks like the application's gadget XML. You'll need it later, so copy and paste it somewhere.

![MySpaceAppDomain](/images/2008/08/e38394e382afe38381e383a3-4.jpg)

Next, at the bottom of the same page, there is an option called External Site Settings.
This is the key to Data Availability.

* Check "Use External Domain"
* Enter the URL you want to be redirected to from MySpace in "External URL"
* Enter the domain name of the server where the external app will be located in "External Domain"
* Read and agree to the terms of use

Now you're ready.

## Implement OAuth

![Inbound OAuth](/images/2008/08/e38394e382afe38381e383a3-3.jpg)

This time, we'll be testing the external service shown in the diagram above, which corresponds to the consumer.
The service provider is MySpace. While we could implement it from scratch, we have a convenient library available, so we'll try using the PHP version. We'll also use HMAC-SHA1 as the signature method.

The OAuth flow is as follows. We recommend that you read [around here](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html) to understand the specifications.

1. Obtain a request token
2. Authenticate the user
3. Obtain an access token
4. Access the resource

### **Get a request token**

Include the required libraries.

```php
require_once 'oauth/OAuth.php';
require_once 'oauth/OAuth_TestServer.php';
```

Let's set various variables. We'll use the **consumer_key** and **consumer_secret** we noted down earlier. The endpoint for obtaining a **request token** is listed in [MySpace documentation](http://developer.myspace.com/community/myspace/dataavailability.aspx).

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
$tokener = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
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
$tokener = new OAuthConsumer($tokens['oauth_token'], $tokens['oauth_token_secret']);
$resource = OAuthRequest::from_consumer_and_token($consumer, $tokener, "GET", $endpoint, array('format'=>'JSON'));
$resource->sign_request($sig_method, $consumer, $tokener);

$req = curl_init($resource);
curl_setopt($req, CURLOPT_RETURNTRANSFER, 1);
$result = curl_exec($req);
````

Now, just set the endpoint ($endpoint) to the URL of the resource you want to retrieve. The response body will return data in JSON format.

## Sample app

We have prepared a sample that uses the above code to show you the entire process and confirm its operation. This should be helpful for understanding what kind of requests you can send.

[Click here for a working example](http://devlab.agektmr.com/DataAvailability/)
