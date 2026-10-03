---
title: A Deep Dive into OAuth Signature Methods
layout: post
lang: en
date: 2008-10-04
tags:
  - HMAC-SHA1
  - iGoogle
  - MySpace
  - Orkut
  - RSA-SHA1
  - OAuth
translationOf: /2008/10/oauth.html
translated: 2026-10-03
translatedManually: false
---
I have covered OAuth in relation to OpenSocial several times on this blog, but because I was using MySpace as a reference, I focused exclusively on HMAC-SHA1 as the signature method. However, when digging deeper into Shindig, RSA-SHA1 is unavoidable; in fact, I realized that without a solid understanding of it, moving forward is difficult. So, I’ll take this opportunity to summarize it. (While this assumes OpenSocial to some extent, the topic of signatures is not limited to OpenSocial.)

## What Is a Signature?

In the IT world, a signature can be described as a means to prove that the requester is indeed who they claim to be. In OAuth, this means proving to the Service Provider that the Consumer is who it says it is. This is achieved by attaching something to the request that only "oneself" or "both parties" know.

The [OAuth specification](http://oauth.net/core/1.0) does not strictly mandate a signature method, but it describes three methods: HMAC-SHA1, RSA-SHA1, and PLAINTEXT.

> OAuth does not mandate a particular signature method, as each implementation
> can have its own unique requirements. The protocol defines three signature
> methods: <tt>HMAC-SHA1</tt>, <tt>RSA-SHA1</tt>, and <tt>PLAINTEXT</tt>, but
> Service Providers are free to implement and document their own methods.
> Recommending any particular method is beyond the scope of this specification.

## HMAC-SHA1

In OAuth using HMAC-SHA1, the Consumer and the Service Provider share the same Consumer Key (`oauth_consumer_key`) and Consumer Secret (`oauth_consumer_secret`) beforehand. Naturally, since it is called a "secret," the Consumer Secret must not be known to anyone other than the two parties. Because the two parties share the Consumer Secret, it is also referred to as a Shared Secret.

In MySpace, the Consumer Key is the application's URL, and the Consumer Secret is a random(?) hash string that looks like MD5, but the Consumer Key can be changed at the developer's discretion. For details, please see [around here](http://devlog.agektmr.com/archives/tag/oauth).

## RSA-SHA1

Conversely, with the RSA-SHA1 method, the Consumer holds a public key and a private key, but the Service Provider never knows the private key. The Consumer sends a request with an attached signature encrypted with the private key. Since this encrypted signature can only be decrypted with the public key and can only be created with the private key, the Consumer can prove its identity.

When creating a signature with HMAC-SHA1, the key is constructed by concatenating the Consumer Secret (`oauth_consumer_secret`) and the Token Secret (`oauth_token_secret`) with `&`. With RSA-SHA1, however, the private key itself is used as the key for encryption. Therefore, the Consumer Secret and Token Secret are unnecessary.

On the other hand, the Service Provider verifies that the signature is valid using the public key.

```php
$publickeyid = openssl_get_publickey($cert);
$ok = openssl_verify($raw, $signature, $publickeyid);
openssl_free_key($publickeyid);
```

`$cert` represents the public key, `$raw` is the Signature Base String, and `$signature` is the signature string (`oauth_signature`). While `$raw` and `$signature` can be generated from the Consumer's request, `$cert` requires a bit more thought.

## Handling the RSA-SHA1 Public Key

The [OAuth Key Rotation Extension](http://dirk.balfanz.googlepages.com/oauth_key_rotation.html) has been proposed as an extension to OAuth. This specification allows a Service Provider to download/recognize the key by having the Consumer pass a public key ID along with the request when making a call to the Service Provider. The public key ID is passed via the `xoauth_signature_publickey` parameter.

* Note: Several documents, such as the [OAuth Key Rotation Extension](http://dirk.balfanz.googlepages.com/oauth_key_rotation.html) draft and the [OpenSocial / Gadget specification](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest), describe this as `xoauth_public_key`, but Shindig's implementation uses `xoauth_signature_publickey`, which seems to be the official one.

I mentioned a public key ID, but of course, you cannot obtain the public key from this alone, so you need to do some extra work using it.

However...

The [OpenSocial / Gadget specification](http://www.opensocial.org/Technical-Resources/opensocial-spec-v08/gadgets-reference08#gadgets.io.makeRequest) states:

> The container should make its public key available for download at a
> well-known location. The
> location `https://container-hostname/opensocial/certificates/xoauth_public_keyvalue` is
> recommended.

Yet in Shindig's implementation, it points to `http://container-hostname/public.cer`, showing that the specifications are inconsistent.

What happens in reality? Developers often ignore `xoauth_signature_publickey`, copy-paste the public key from the container's documentation, and **hardcode it into the source code**. I was able to confirm this working for hi5 and Orkut. For iGoogle, the public key is documented [here](https://sites.google.com/site/oauthgoog/oauth-proxy), but it didn't work for me.

Until OAuth spreads further and diverse Consumers emerge, this halfway-done state of affairs will likely continue.

## Who Is the Consumer?

Those who are sharp might have realized this by now: in the RSA-SHA1 method, the signer is **the OpenSocial container site itself**. Unlike MySpace, **it is not the gadget**. This means that the Consumer Key (`oauth_consumer_key`) also represents the container site—such as "orkut.com" for Orkut or "hi5.com" for hi5.

Additionally, with this method, an **`xoauth_app_url` parameter** is added to indicate which gadget is sending the request. This is proposed by the [OAuth Gadget Extension](http://dirk.balfanz.googlepages.com/oauth_gadget_extension.html).

When using HMAC-SHA1 like MySpace, a Consumer Key was configured per gadget, and the container proxied the gadget's requests. This stems from a difference in approach between Shindig-based containers like iGoogle, Orkut, and hi5, and MySpace, which implemented OpenSocial independently.

If you try to treat the container as the Consumer using the HMAC-SHA1 method, the secret must be shared strictly between two parties, meaning the Consumer must issue a key and secret for every single Service Provider. With RSA-SHA1, however, even if the container is the Consumer, a single public/private key pair can be reused. In an architecture where the container fetches data from external services—like `makeRequest` (Outbound OAuth) in OpenSocial—adopting RSA-SHA1 makes it easier for Consumers to add Service Providers, and it also simplifies the process of verifying Consumer signatures for Service Providers.

This seems to be why Shindig is implemented primarily around the RSA-SHA1 method. By the way, Shindig's development is centered around Google, and while HMAC-SHA1 is supposedly being implemented as well, obtaining a Consumer Key and Consumer Secret on iGoogle requires submitting a request via email, so it doesn't seem like they are taking it very seriously at the moment.

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

## Summary

At present, with OpenSocial Outbound OAuth, MySpace uses HMAC-SHA1 with the gadget as the Consumer, while Shindig-based containers use RSA-SHA1 with the container as the Consumer. Therefore, when building an OpenSocial gadget that communicates frequently with external servers, it is likely necessary to design the backend to accept requests from both approaches.

## **References**

* [Outbound OAuth を実現する OAuth Proxy – Codin’ In The Free
  World](http://d.hatena.ne.jp/lyokato/20080818/1219081040)
* [OAuth Proxy(Google OAuth & Federated Login
  Research)](https://sites.google.com/site/oauthgoog/oauth-proxy)
