---
layout: post
lang: en
title: 'OpenSocial OAuth Summary'
description: ''
date: 2008-08-02
tags:
- OAuth
  - OpenSocial
translationOf: /2008/08/opensocialoauth.html
translated: 2025-11-29
translatedManually: false
---

OpenSocial uses OAuth for authorization when a container communicates with an external server, or when an external server communicates with a container. This article summarizes the current state of OAuth in OpenSocial.

* Update (2008/10/20): Please also read the article I wrote on 2008/10/4 [here](http://devlog.agektmr.com/archives/174).

## What is OAuth again?

OAuth allows data exchange between three parties—a user, a consumer, and a service provider—to allow the consumer to access a service provider's resources without the user having to provide the consumer with credentials (ID and password). For example, imagine a user using Google's address book (resource) on MySpace (consumer). Without OAuth, the user would have to provide their Google ID and password to MySpace. However, with OAuth, the user authenticates directly with Google and can pass their address book data to MySpace without having to provide their Google ID and password to MySpace.

## Two types of OAuth

Now, there are two types of OAuth that are used in OpenSocial.

### OAuth Core

As explained earlier, [OAuth Core](http://oauth.net/core/1.0/) involves communication between three parties: a **user**,

a **consumer**, and a **service provider**. This is a basic approach, so for more details, please refer to [here](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html).

### OAuth Consumer Request

On the other hand, [OAuth Consumer Request](http://oauth.googlecode.com/svn/spec/ext/consumer_request/1.0/drafts/1/spec.html)
is a specification that removes the user authentication portion of the OAuth specification and focuses on the interaction between consumers and service providers. It is commonly referred to as "**two-legged OAuth**."
This specification establishes only a trust relationship between the consumer and service provider, without requiring user authentication. Therefore, it is intended for use when a consumer wants to obtain public information from a service provider. (This is a rather embarrassing mistake. To be precise, it is a specification in which the consumer adds a signature, allowing the service provider to verify the authenticity of the request source and request content. / Added October 2009.) Incidentally, OpenSocial v0.7 does not include the use of OAuth Core, and instead uses two-legged OAuth. OAuth Core is available only in OpenSocial v0.8 and later (of course, two-legged OAuth is also available).

## OAuth usage patterns in OpenSocial

There are two other ways to use OAuth with OpenSocial:

### Outbound OAuth, where a gadget communicates with an external server

![Outbound OAuth](/images/2008/08/e38394e382afe38381e383a3-1-300x95.jpg)
Here, we'll call this **Outbound OAuth**. This is the case where a gadget created in `type="html"` acts as a consumer, using the SNS
container as a proxy, and communicates with an external server acting as a service provider via `makeRequest`.

### Inbound OAuth, where an external server interacts with the container

![Inbound OAuth](/images/2008/08/e38394e382afe38381e383a3-3-300x88.jpg)
Here, we'll call this **Inbound OAuth**. This refers to the case where an external server (consumer) calls the RESTful API of an SNS container (service provider). This also applies to the case where the `type="url"` gadget calls the SNS container's RESTful API through an external server.

## What you need to use OAuth

There are several prerequisites for using OAuth. While you will need to look up the detailed specifications separately, the prerequisites you need to meet are listed below.

* The consumer must know the following information issued by the service provider in advance: 
* Consumer key (consumer_key)
* Consumer secret (consumer_secret)
* The consumer must know the following three URLs used for OAuth communication with the service provider: 
* Service provider's request token URL
* Service provider's access token URL
* Service provider's authentication URL

*Addendum (October 20, 2008): The consumer secret is not required if the signature method is RSA-SHA1. For details, see [here](http://devlog.agektmr.com/archives/174). We will examine how to meet this requirement for each OAuth usage pattern.

### Outbound OAuth Case

Since the gadget will be communicating with an external server, the gadget developer first registers the consumer key and consumer secret in the SNS container. However, as far as I know, there are no SNSs that implement Outbound OAuth yet. Therefore, we will assume that the consumer key and consumer secret have been passed to the container by some means (such as posting using a form on an SSL page). (Methods for achieving this will likely emerge in the future.) Next, various URLs for the service provider must be passed. In v0.8, this is specified to be passed in the gadget XML. Create OAuth in ModulePrefs.

```xml
<oauth>
  <service name="google">
    <request url="https://www.google.com/accounts/OAuthGetRequestToken?scope=http://www.google.com/m8/feeds/" />
    <access url="https://www.google.com/accounts/OAuthGetAccessToken" />
    <authorization url="https://www.google.com/accounts/OAuthAuthorizeToken" />
  </service>
</oauth>
```

OAuth does not necessarily communicate with a single server, so adding a Service
allows support for multiple servers. You can distinguish between them using Service@name, so if necessary, add the following parameters to makeRequest's opt_params to specify the service:

```
gadgets.io.RequestParameters.OAUTH_SERVICE_NAME
```

There is also a way to resolve the URL used for OAuth communication with the service provider using XRDS-Simple, but we will cover this topic in more detail on another occasion.

### Inbound OAuth Case

This is when an external application accesses the SNS container's RESTful API.
This is similar to Facebook's Facebook Connect, MySpace's Data Availability, and Google's FriendConnect, and is still in an experimental stage.
The consumer key and consumer secret are issued when you register your application on the SNS container. Developers note or copy and paste them into the consumer server code. You can find the URL by simply viewing the help page or by using autodiscovery with XRDS-Simple.

## summary

This time I've written a rough outline, but next time I'd like to actually try using MySpace's Data Availability to perform OAuth authentication and retrieve data.
