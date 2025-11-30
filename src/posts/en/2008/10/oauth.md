---
layout: post
lang: en
title: Digging deeper into OAuth signature methods
description:
date: 2008-10-04
tags:
  - HMAC-SHA1
  - iGoogle
  - MySpace
  - Orkut
  - RSA-SHA1
  - OAuth
translationOf: /2008/10/oauth.html
translated: 2025-11-30
translatedManually: false
---
I've covered OAuth in relation to OpenSocial several times on this blog.
However, because I was using MySpace as a reference, I only focused on HMAC-SHA1 as a signature method. However, when delving into Shindig, I couldn't avoid RSA-SHA1, and I realized that it would be difficult to move forward without a solid understanding of it.
So I'd like to take this opportunity to summarize it. (While I'm assuming OpenSocial to some extent, the discussion of signatures is not limited to OpenSocial.)

## What is a signature?

In the IT world, a signature is a way to prove that the source of an inquiry is who they claim to be. In OAuth, it means that the consumer proves to the service provider that they are who they say they are. This is achieved by adding something to the request that only "you" or "you and the other party" can understand.

The OAuth specification does not specify the exact signature method, but describes three signature methods: HMAC-SHA1, RSA-SHA1, and PLAINTEXT.

> OAuth does not mandate a particular signature method, as each implementation
> can have its own unique requirements. The protocol defines three signatures
> methods: <tt>HMAC-SHA1</tt>, <tt>RSA-SHA1</tt>, and <tt>PLAINTEXT</tt>, but
> Service Providers are free to implement and document their own methods.
> Recommending any particular method is beyond the scope of this specification.

## HMAC-SHA1

In OAuth using HMAC-SHA1, the consumer and service provider already have the same consumer key (`oauth_consumer_key`) and consumer secret (`oauth_consumer_secret`). The consumer secret is, of course, a secret, and should not be known to anyone other than the two parties. Because the two parties share the consumer secret, it is sometimes called a shared secret.

MySpace uses the consumer key as the application URL and the consumer secret as a random (?) hash string similar to MD5, but the consumer key can be changed by the developer. For details, see [here](http://devlog.agektmr.com/archives/tag/oauth).

## RSA-SHA1

Conversely, with RSA-SHA1, the consumer has a public key and a private key, but the service provider never knows the private key. The consumer submits a request with a signature encrypted with the private key. This encrypted signature can only be decrypted with the public key and created with the private key, allowing the consumer to prove their identity.

When creating a signature, the HMAC-SHA1 method uses the consumer secret (`oauth_consumer_secret`) and token secret (`oauth_token_secret`) concatenated with `&` as the key. However, the RSA-SHA1 method uses the private key as the key for encryption. Therefore, the consumer secret and token secret are not required.

In turn, the service provider uses the public key to verify that the signature is valid.

```php
$publickeyid = openssl_get_publickey($cert);
$ok = openssl_verify($raw, $signature, $publickeyid);
openssl_free_key($publickeyid);
```

`$cert` represents the public key, `$raw` represents the Signature Base String, and `$signature` represents the signature string (`oauth_signature`). `$raw` and `$signature` can be generated upon request from the consumer, but `$cert` requires some consideration.

## Handling RSA-SHA1 public keys

The OAuth Key Rotation Extension (URL 30) has been proposed as an extension to OAuth. This specification allows consumers to request a service provider by passing a public key ID along with the request, allowing the service provider to download and recognize the key. The public key ID is passed in the INLINE_CODE 13 parameter.

*Some documents, such as the draft of the [OAuth Key Rotation Extension](http://dirk.balfanz.googlepages.com/oauth_key_rotation.html) and the [OpenSocial / Gadget Specification](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest), refer to `xoauth_public_key`, but Shindig's implementation uses `xoauth_signature_publickey`, which appears to be the official version.

I mentioned the public key ID here, but of course this alone won't get you the public key, so you'll need to do some digging around with it.

but,,,.

[OpenSocial / Gadget Specification](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest)


> The container should make its public key available for download at a
> well-known location.
> location `https://container-hostname/opensocial/certificates/xoauth_public_keyvalue` is
> recommended.

However, the Shindig implementation uses `http://container-hostname/public.cer`, so the specification is inconsistent.

What I actually do is ignore `xoauth_signature_publickey` and copy and paste the public key from the container's documentation and **hardcode** it into the source code. I was able to confirm that it works with hi5 and Orkut. The public key for iGoogle is listed [here](https://sites.google.com/site/oauthgoog/oauth-proxy), but it didn't work.

Until OAuth becomes widespread and various consumers emerge, this half-baked state will likely continue.

## Who is the consumer?

Those with a keen eye may have noticed that with the RSA-SHA1 method, the signature is provided by the OpenSocial container site itself, not a gadget like MySpace. This means that the consumer key (`oauth_consumer_key`) will naturally be something that represents the container site, such as "orkut.com" for Orkut or "hi5.com" for hi5.

In addition, with this method, a parameter called `xoauth_app_url` is added to indicate which gadget is making the request. This is proposed by the [OAuth Gadget
Extension](http://dirk.balfanz.googlepages.com/oauth_gadget_extension.html).

When using HMAC-SHA1 like MySpace, a consumer key is set for each gadget, and the container proxies gadget requests. This is due to differences in policy between iGoogle, Orkut, and hi5, which use Shindig, and MySpace, which implements OpenSocial independently.

If you use the HMAC-SHA1 method to treat a container as a consumer, the secret must be shared only between the two parties, so the consumer must issue a key and secret for each service provider. However, with the RSA-SHA1 method, even if the container is a consumer, only one public/private key combination is needed. Therefore, in architectures where the container retrieves data from external services, such as OpenSocial's `makeRequest` (Outbound OAuth), the RSA-SHA1 method makes it easier for consumers to add service providers and for service providers to verify consumer signatures.

This is likely why Shindig is primarily implemented using the RSA-SHA1 method. Incidentally, Shindig is being developed primarily by Google, and they're apparently currently working on implementing the HMAC-SHA1 method, but since issuance of consumer keys and consumer secrets on iGoogle is requested by email, they don't appear to be seriously considering implementing it at the moment.

> In the case of the iGoogle sandbox, you can send mail
> to oauthproxyreg@google.com with the following information to register your
> shared secret:
> * URL of your gadget
> * The shared secret assigned to you by the service provider
> * The consumer key assigned to you by the service provider
> * Whether to use symmetric or asymmetric signing with the service provider (or
> say that you don't know)
> Until your shared secret has been registered, your gadget will not work. If
> you change the URL of your gadget, you will need to re-register the secret
> for that gadget.

## summary

Currently, OpenSocial's Outbound OAuth uses HMAC-SHA1 for MySpace, with the gadget as the consumer, and RSA-SHA1 for Shindig-based containers, with the container as the consumer. Therefore, if you are creating an OpenSocial gadget that interacts frequently with external servers, it will likely be necessary to configure it so that it can accept requests from both.

## **Reference sites**

* [OAuth Proxy for Outbound OAuth – Codin’ In The Free World](http://d.hatena.ne.jp/lyokato/20080818/1219081040)
* [OAuth Proxy (Google OAuth & Federated Login
Research)](https://sites.google.com/site/oauthgoog/oauth-proxy)
