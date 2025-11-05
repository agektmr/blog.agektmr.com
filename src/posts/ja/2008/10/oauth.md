---
title: OAuth の署名方式を掘り下げる
layout: post
lang: ja
date: 2008-10-04
tags:
  - HMAC-SHA1
  - iGoogle
  - MySpace
  - Orkut
  - RSA-SHA1
  - OAuth
---

当ブログでこれまで何度か OpenSocial に絡んだ OAuth について取り上げてきました
が、MySpace を参考にしていたため、署名方式として HMAC-SHA1 のみを対象にしてきま
した。しかし Shindig を掘り下げる上で RSA-SHA1 を避けて通ることはできず、むしろ
こちらについても十分な知識を得ていないとなかなか先に進めないことが分かりましたの
で、この機会にまとめてみます。(OpenSocial をある程度前提にしていますが、署名の話
は OpenSocial に限らないものです。)

## 署名とは何か

IT の世界で署名とは、問い合わせ元がその人であることを証明するための手段、と言え
ます。OAuth だと、コンシューマがサービスプロバイダに対して、名乗っている通りの者
であることを証明することを意味します。これは、「自分」もしくは「相手と自分」にし
か分からないものをリクエストに付け加えて送ることで実現されます。

[OAuth の仕様](http://oauth.net/core/1.0)では、署名方式について厳密に規定していま
せんが、HMAC-SHA1、RSA-SHA1、PLAINTEXT の 3 つの署名方式を説明しています。

> OAuth does not mandate a particular signature method, as each implementation
> can have its own unique requirements. The protocol defines three signature
> methods: <tt>HMAC-SHA1</tt>, <tt>RSA-SHA1</tt>, and <tt>PLAINTEXT</tt>, but
> Service Providers are free to implement and document their own methods.
> Recommending any particular method is beyond the scope of this specification.

## HMAC-SHA1

HMAC-SHA1 を使った OAuth では、予めコンシューマとサービスプロバイダが、同じコン
シューマキー (`oauth_consumer_key`) とコンシューマシークレット
(`oauth_consumer_secret`) を持ちます。コンシューマシークレットはもちろん、秘密とい
うくらいですから、2 者以外に知られてはいけません。2 者がコンシューマシークレット
を共有することから、Shared Secret と呼んだりもします。

MySpace では、コンシューマキーをアプリケーションの URL、コンシューマシークレット
を MD5 らしきランダムな(?)ハッシュ文字列としていますが、コンシューマキーはディベ
ロッパの任意で変更可能です。詳しくは[この辺
り](http://devlog.agektmr.com/archives/tag/oauth)をご覧下さい。

## RSA-SHA1

逆に、RSA-SHA1 の方式では、コンシューマが公開鍵と秘密鍵を持ちますが、サービスプ
ロバイダは秘密鍵を知ることはありません。コンシューマは秘密鍵で暗号化した署名を加
えたリクエストを投げます。この暗号化された署名は、公開鍵でしか解くことができませ
んし、秘密鍵でしか作ることができないため、コンシューマが身分を証明できる、という
訳です。

署名を作る際、HMAC-SHA1 方式の場合、コンシューマシークレット
(`oauth_consumer_secret`) とトークンシークレット (`oauth_token_secret`) を `&`で
繋いだものを key として利用しますが、RSA-SHA1 方式の場合、秘密鍵を key として
使って暗号化します。そのため、コンシューマシークレットとトークンシークレットは不
要です。

逆にサービスプロバイダは、公開鍵を使って署名が正当なものであることを確認します。

```php
$publickeyid = openssl_get_publickey($cert);
$ok = openssl_verify($raw, $signature, $publickeyid);
openssl_free_key($publickeyid);
```

`$cert` は公開鍵、`$raw` は署名の基本文字列(Signature Base String)、`$signature`
は署名文字列 (`oauth_signature`) を表しています。`$raw` と `$signature` はコン
シューマからのリクエストで生成することができますが、`$cert` についてはちょっと考
察が必要です。

## RSA-SHA1 の公開鍵の扱い

OAuth の拡張として[OAuth Key Rotation
Extension](http://dirk.balfanz.googlepages.com/oauth_key_rotation.html) が提案さ
れています。これはコンシューマがサービスプロバイダにリクエストする際、公開鍵の ID
をリクエストと一緒に渡すことで、サービスプロバイダに鍵をダウンロード/認識させる
ための仕様です。公開鍵の ID は `xoauth_signature_publickey` パラメータで渡されま
す

※ [OAuth Key Rotation
Extension](http://dirk.balfanz.googlepages.com/oauth_key_rotation.html)のドラフ
ト、[OpenSocial / Gadget の仕様
書](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest)
など、いくつかのドキュメントに `xoauth_public_key` と記述されていますが、Shindig
の実装で `xoauth_signature_publickey` が使用されており、こちらが正式なものとなる
ようです。

ここで公開鍵の ID と言いましたが、もちろん、これだけでは公開鍵を取得することがで
きないので、これを使ってゴニョゴニョする必要があります。

が、、、。

[OpenSocial / Gadget の仕様
書](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest)
には

> The container should make its public key available for download at a
> well-known location. The
> location `https://container-hostname/opensocial/certificates/xoauth_public_keyvalue` is
> recommended.

と書いてあるのですが、Shindig の実装では `http://container-hostname/public.cer`
になっていたりと、仕様が一貫していません。

現実はどうしているかというと、`xoauth_signature_publickey` を無視して、コンテナ
のドキュメントに書いてある公開鍵をコピペして**ソースコードにハードコーディング**
しています。hi5、Orkut については動作確認ができました。iGoogle については[こ
こ](https://sites.google.com/site/oauthgoog/oauth-proxy)に公開鍵が書いてあります
が、動作しませんでした。

OAuth が広まって様々なコンシューマが登場するまでは、まだまだこの中途半端な状態が
続くのではないでしょうか。

## コンシューマは誰か

ここで勘のいい方は気付かれたと思いますが、RSA-SHA1 方式の場合、署名元が
**OpenSocial のコンテナサイトそのもの**になっています。MySpace のように、**ガ
ジェットではありません**。ということは、もちろんコンシューマキー
(`oauth_consumer_key`)も Orkut なら "orkut.com"、hi5 なら "hi5.com" といった具合
に、コンテナサイトを表すものが使用されます。

またこの方式の場合、どのガジェットがリクエストを投げているのかを表すため、
**`xoauth_app_url` というパラメータ**が追加されます。これを提案しているのが
[OAuth Gadget
Extension](http://dirk.balfanz.googlepages.com/oauth_gadget_extension.html)で
す。

MySpace のように HMAC-SHA1 を使っている場合は、ガジェットごとにコンシューマキー
を設定し、ガジェットのリクエストをコンテナが Proxy するという形を取っていまし
た。これは Shindig を使っている iGoogle、Orkut、hi5 と、独自に OpenSocial を実装
している MySpace との方針の違いから来るものです。

HMAC-SHA1 方式でコンテナをコンシューマとして扱おうとすると、シークレットは 2 者
間のみで共有されなければならないため、コンシューマは、サービスプロバイダごとに
キーとシークレットを発行しなければなりません。しかし、RSA-SHA1 方式であれば、コ
ンテナがコンシューマでも、公開鍵と秘密鍵の組み合わせは一つだけあれば使い回せるた
め、OpenSocial における `makeRequest` (Outbound OAuth)のように、コンテナが外部
サービスからデータを取得するアーキテクチャの場合、RSA-SHA1 方式にした方がコン
シューマにとってサービスプロバイダの追加も容易になりますし、サービスプロバイダに
とってコンシューマの署名を確認する作業も楽になるのが利点です。

Shindig が RSA-SHA1 方式を中心に実装されているのはそんな理由がありそうです。ちな
みに、Shindig の開発は Google が中心になって行われており、HMAC-SHA1 方式について
も現在実装中らしいですが、iGoogle でのコンシューマキーとコンシューマシークレット
の発行は、メールで依頼することになっているため、今のところ本気で考えてはいなさそ
うです。

> In the case of the iGoogle sandbox, you can send mail
> to oauthproxyreg@google.com with the following information to register your
> shared secret:  
> * URL of your gadget  
> * The shared secret assigned to you by the service provider  
> * The consumer key assigned to you by the service provider  
> * Whether to use symmetric or asymmetric signing with the service provider (or
>   say that you don't know)  
>   Until your shared secret has been registered, your gadget will not work.  If
>   you change the URL of your gadget, you will need to re-register the secret
>   for that gadget.

## まとめ

現時点では OpenSocial の Outbound OAuth では MySpace が HMAC-SHA1 方式でガジェッ
トをコンシューマに、Shindig 系コンテナは RSA-SHA1 方式でコンテナをコンシューマに
していますので、外部サーバーとやり取りを多なう OpenSocial ガジェットを作る場合、
どちらからのリクエストも受け付けられるよう構築しておく必要がありそうです。

## **参考サイト**

* [Outbound OAuth を実現する OAuth Proxy – Codin’ In The Free
  World](http://d.hatena.ne.jp/lyokato/20080818/1219081040)
* [OAuth Proxy(Google OAuth & Federated Login
  Research)](https://sites.google.com/site/oauthgoog/oauth-proxy)
