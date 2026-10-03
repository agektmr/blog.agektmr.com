---
title: mixi App Launched / Hatebu Checker Released
author: Eiji
layout: post
lang: en
date: 2009-04-10
categories:
  - OpenSocial
tags:
  - mixi
  - mixiアプリ
translationOf: /2009/04/mixi.html
translated: 2026-10-03
translatedManually: false
---
At long last, mixi's OpenSocial implementation, mixi Apps, has finally been released to general developers.

<a target="_blank" href="http://mixi.co.jp/press_09/0408_1.html">個人の皆さまでもソーシャルアプリケーションの開発が可能に。「mixiアプリ」オープンβ版公開！</a>

Above all, being able to provide gadgets on a platform like mixi with over 15 million users for general users to enjoy is undeniably appealing. As a supporter of OpenSocial, it feels like the time has finally arrived. At the same time, seeing all the excitement brewing everywhere makes me quite envious.

So, for the serial article series on gihyo.jp that I co-author with <a target="_blank" href="http://www.eisbahn.jp/yoichiro/">Yoichiro</a>:

<a target="_blank" href="http://gihyo.jp/dev/serial/01/opensocial/">http://gihyo.jp/dev/serial/01/opensocial/</a>

I went ahead and published the Hatebu Checker gadget we use as a sample there right away.

<a target="_blank" href="http://platform001.mixi.jp/view_appli.pl?id=682">http://platform001.mixi.jp/view_appli.pl?id=682</a>

 

 

It's a gadget originally built for <a target="_blank" href="http://sandbox.home.goo.ne.jp/">goo Home</a>, but while adapting it for mixi Apps, I noticed a few points...

* Has enough thought really been put into whether the current terms of service and developer registration process alone can cover legal issues caused by gadgets?
* While it is theoretically possible to leak personal information externally via a gadget, have general users actually consented to that under the current terms of service?
* API bugs are scattered about—or rather, quite prevalent.
* The OpenSocial extension specifications ignore OpenSocial conventions (such as `opensocial.PersonField`).

As for the specs, now that Yoichiro has transferred to mixi, hopefully we can look forward to him improving them going forward...
