---
layout: post
lang: en
title: 'Yahoo! USA now supports OpenSocial'
description: ''
date: 2008-10-29
tags:
- SocialWeb
  - OpenSocial
  - Y!OS
  - Yahoo!
translationOf: /2008/10/yahooopensocial.html
translated: 2025-11-29
translatedManually: false
---
Today, Yahoo! US released the Yahoo! Open Strategy 1.0 to developers, including the Yahoo! Application Platform (YAP), Yahoo! Social Platform (YSP), and Yahoo! Query Language (YQL).

##Yahoo! Social Platform

It provides a REST-based API for social media such as profiles, address books, and update information. It uses OAuth for authentication, and PHP and Flash libraries are also provided, but this REST API is not OpenSocial compatible.

##Yahoo! Query Language

A web-based API that allows you to retrieve data by sending SQL-like commands, similar to Yahoo! Pipes. It's similar to Facebook's FQL.

## Yahoo! Application Platform

An embeddable application that runs on Yahoo!.
The OpenSocial gadget platform is not currently supported, but the JavaScript API appears to be available.
There are two main views:

![yos_appdef](/images/2008/10/yos_appdef-300x184.jpg)

### Small View

Only HTML or [YML Lite](http://developer.yahoo.com/yap/yml/) is supported.
JavaScript is not supported. YML is similar to [Facebook's equivalent of
FBML](http://wiki.developers.facebook.com/index.php/FBML), and is intended to be displayed as a component on various pages, such as My!Yahoo!.

### **Canvas View**

****This is an application that proxies and displays YML output from a URL specified by the developer. It's a Facebook-like system. Of course, by writing a program using Yahoo! Social Platform on the server side, you can authenticate with OAuth and retrieve the social graph and contact list via REST.

It also supports the OpenSocial JavaScript API (v0.8), so it seems possible to add updates from the client side. Because it uses Caja, it seems like it can be implemented without security concerns. (I wonder when it reached a practical level...)

I'll try to create a sample application when I have time.

## Impressions

This Yahoo! release seems to combine the best of both the Facebook Platform and OpenSocial. However, since it's not fully OpenSocial compliant, it won't be possible to simply repurpose applications created elsewhere with a few minor changes.

For example, you can't use JavaScript APIs that use makeRequest to retrieve data from external servers. Also, unlike OpenSocial, which only requires HTML output, you must output YML. (PS: The Gadgets Core API appears to be available, but features specified with features like Pref and View are not. Also, YML appears to allow for extended functionality using custom tags in addition to standard HTML. However, the inability to load external scripts due to Caja compatibility likely poses a barrier to importing gadgets implemented in other containers.)

However, the fact that the world's largest portal site is supporting OpenSocial is significant, and future developments will be worth keeping an eye on. From an overall perspective, OpenSocial support is merely a component, but it will have important implications for the future of the web. The presentation at the recent [Yahoo! Open Hack Day](http://www.kidsallright.com/blog/2008/09/18/yahoo-open-strategy-overview/) is definitely worth a watch.

I believe it won't be long before people in Japan recognize the importance of the web, which is rapidly becoming a platform, and the social functions that it holds within it.
