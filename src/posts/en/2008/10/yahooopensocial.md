---
title: Yahoo Supports OpenSocial
layout: post
lang: en
date: 2008-10-29
tags:
  - SocialWeb
  - OpenSocial
  - Y!OS
  - Yahoo!
translationOf: /2008/10/yahooopensocial.html
translated: 2026-10-03
translatedManually: false
---
Today, Yahoo! US announced the [release](http://developer.yahoo.net/blog/archives/2008/10/yos_10_launch.html) of Yahoo! Open Strategy 1.0 for developers, featuring [Yahoo! Application Platform (YAP)](http://developer.yahoo.com/yap/), [Yahoo! Social Platform (YSP),](http://developer.yahoo.com/social/) and [Yahoo! Query Language (YQL)](http://developer.yahoo.com/yql/).

## Yahoo! Social Platform

This provides REST-based APIs for social features such as profiles, address books, and updates. It uses OAuth for authentication, and libraries are provided for PHP and Flash. However, these REST APIs are not OpenSocial-compatible.

## Yahoo! Query Language

A web-based API that lets you query data like Yahoo! Pipes by sending SQL-like commands. It seems similar to [Facebook's FQL](http://wiki.developers.facebook.com/index.php/FQL).

## Yahoo! Application Platform

Embedded applications that run within Yahoo!. While OpenSocial's gadget platform is not supported at this time, the JavaScript API appears to be available. There are two main views:

![yos_appdef](/images/2008/10/yos_appdef-300x184.jpg)

### Small View

Supports only HTML or [YML Lite](http://developer.yahoo.com/yap/yml/). JavaScript is not supported. YML is similar to [FBML in Facebook](http://wiki.developers.facebook.com/index.php/FBML), and it is designed to be displayed as widgets on various pages like My Yahoo!.

### **Canvas View**

Applications of this type proxy and display YML output by a URL specified by the developer. It's a Facebook-like mechanism. Naturally, by writing server-side programs that leverage the Yahoo! Social Platform, you can authenticate via OAuth and fetch social graphs or contact lists via REST.

It also [supports the OpenSocial JavaScript API (v0.8)](http://developer.yahoo.com/yap/guide/yap-opensocial.html), so it seems possible to do things like posting updates from the client side. Since [Caja](http://devlog.agektmr.com/archives/49) is used, you can implement features without having to worry too much about security. (When did it reach such a practical stage...?)

I'd like to build a sample application when I have some time.

## Thoughts

This release from Yahoo! feels like taking the best of both worlds from the Facebook Platform and OpenSocial. However, since it isn't fully compliant with OpenSocial, you probably won't be able to just tweak an existing application built for other platforms and reuse it directly.

~~For example, JavaScript APIs for fetching external server data from the client, such as `makeRequest`, cannot be used. Also, while OpenSocial lets you output standard HTML, here you must output YML, among other differences...~~ (Update: It appears that the Gadgets Core API can indeed be used. However, features specified through feature tags, like Pref or View, cannot be used. Additionally, YML allows you to use extended capabilities via custom tags on top of regular HTML. Still, the inability to load external scripts due to Caja compliance may be a barrier when porting gadgets implemented on other containers.)

Nonetheless, the fact that the world's largest portal site is embracing OpenSocial is a significant milestone, and its future direction is definitely worth watching. Looking at the overall strategy, OpenSocial support is merely one piece of the puzzle, yet it holds crucial importance in defining the future of the web. The presentation from the recent [Yahoo! Open Hack Day](http://www.kidsallright.com/blog/2008/09/18/yahoo-open-strategy-overview/) is a must-see.

I believe the day is not far off when the increasing platformization of the web, and the vital role social features play within it, will be recognized in Japan as well.
