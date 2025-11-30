---
layout: post
lang: en
title: "Try OAuth authentication with MySpace's RESTful API"
description:
date: 2008-04-19
tags:
  - MySpace
  - OAuth
  - RESTful API
translationOf: /2008/04/myspacerestful-apioauth.html
translated: 2025-11-30
translatedManually: false
---
The MySpace Developer Platform (MDP) published by MySpace includes not only OpenSocial but also its own RESTful API, which can be used to create server-side applications. This article focuses on OAuth authentication for the MDP RESTful API.

## About OAuth for OpenSocial/MDP

OAuth is an authorization protocol that allows containers such as OpenSocial (hereafter referred to as consumers) that act as intermediaries between users and the services they want to use (hereafter referred to as service providers) to operate APIs without knowing the service provider's authentication information.

For example, when a user tries to use a service provider's app on a consumer device, they are redirected to an authentication screen on the service provider's domain, and only then can the consumer use the service provider's APIs.

However, the OAuth standard currently specified in OpenSocial is not a full specification, and does not anticipate the user being redirected to the service provider's authentication screen, or the consumer and service provider exchanging tokens.

This is apparently due to the fact that OpenSocial gadgets run on JavaScript and therefore cannot manage tokens, but the conditions appear to be the same for MySpace's own RESTful API, and as long as you have the consumer key and consumer secret, you can perform OAuth authentication without a token.

*For detailed specifications of OAuth, please refer to [around here](http://www.atmarkit.co.jp/fsecurity/special/106oauth/oauth01.html).

## Create an application profile

First, prepare to create an application on MySpace.

To create an application on MySpace, you need a user account and an application profile account. Please refer to the following site for instructions with screenshots.

[Build a MySpace Application – Learning Life.](http://d.hatena.ne.jp/yorihito_tanaka/20080408)

## Preparing for OAuth authentication

Once you have created an application profile, you no longer need to write any XML or JavaScript code. The purpose of this tutorial is to test RESTful API authentication, so click [My Apps](http://developer.myspace.com/modules/apps/pages/myapps.aspx) on the left side of the screen and click Edit Details for the application profile you created.

![myspace_myapps](/images/2008/04/myspace_myapps-300x160.jpg)

At the bottom of the screen, there are sections called OAuth Consumer Key and OAuth Consumer Secret. You will need these to access the RESTful API, so copy and paste them into a notepad or similar. You can change the OAuth Consumer Key as you wish, so you may want to do so (don't forget to save it).

![myspace_myapp_detail](/images/2008/04/myspace_myapp_detail.jpg)

## Try authenticating with OAuth Tool

OAuth performs authentication by creating a signature from the consumer key, nonce, timestamp, etc. Creating a signature is complicated, so this time we will try it using the [OAuth Tool](http://developer.myspace.com/modules/apis/pages/oauthtool.aspx) provided by MDP.

![myspace_oauthtool](/images/2008/04/myspace_oauthtool-300x209.jpg)

Fill in the fields on the right side of the screen.

* **Server:** The server URL. This corresponds to `scheme` and `authority` in RFC3986.
We'll use `http://api.myspace.com` here.
* **ResourceURL:** The path after the server URL. This corresponds to path in RFC3986.
This does not include query or fragment. Enter `/users/{user_id}/friends` here, and your user ID in `user_id`. Other available endpoints are listed [here](http://developer.myspace.com/community/RestfulAPIs/resources.aspx).
* **Request Method:** The HTTP method. We'll use GET.
* **Consumer Key:** The OAuth consumer key. Enter the Consumer Key you noted down earlier.
* **Consumer Secret:** The OAuth consumer secret. Enter the Consumer Key you noted down earlier.
* **OAuth Token:** The token. With formal OAuth, authorization is only granted after receiving permission from the service provider and exchanging it for an access token. Leave this field empty this time.
* **OAuth Token Secret:** Token secret. This is required for formal OAuth token exchange. Leave this field empty this time.
* **OAuth TimeStamp:** TimeStamp. Enter the current time in UNIX time. Leave this field empty this time.
* **OAuth Nonce:** Nonce. Any value is fine, but you must send a different value each time. Leave this field empty this time.
* **Signature Method:** Signature method. Select HMAC-SHA1.
* **Version:** OAuth version. Set to 1.0.
* **OAuth Mode:** OAuth mode. Set to Authorization Header.
* **Query options:** How to use the OAuth Tool. Set to Generate URI and Submit.

![myspace_oauthtool_detail](/images/2008/04/myspace_oauthtool_detail.jp)

OK, now click execute.

What kind of display is returned in the Response Body? If it returns your friend list, then the request was successful. You can also format the results as JSON by adding `.json` to the end of the Resource URL.

## summary

In fact, this method of OAuth is not only used when an external server makes a request to the container MySpace, but also when a request is sent to an external server via the container's proxy using OpenSocial's `makeRequest`. In that case, of course, the server you prepare must support OAuth.

What bothers me is that the parts that require token exchange and authentication on the service provider side are omitted. I thought OpenSocial and OAuth were a perfect match, but if authentication is not possible, it will be impossible to link the service provider's User ID with the container's User ID. Am I just misunderstanding the specifications, or will OAuth be properly supported in the future?

We will explain data exchange with external servers using `makeRequest` on another occasion.

*The API (OAuth Tool?) seems to be unstable, and although it worked fine at lunchtime, at the time of writing this article, for some reason it was returning "Not Found"...
