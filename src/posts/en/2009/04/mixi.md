---
layout: post
lang: en
title: 'Mixi app released / Hatebu checker released'
description: ''
date: 2009-04-10
tags:
- mixi
  - mixiアプリ
translationOf: /2009/04/mixi.html
translated: 2025-11-29
translatedManually: false
---
Finally, mixi's implementation of OpenSocial and mixi apps have been released to general developers.

<a target="_blank" href="http://mixi.co.jp/press_09/0408_1.html">Even individuals can now develop social applications. "mixi App" open beta version released! </a>

What's appealing about Mixi is that anyone can contribute gadgets to the platform, which has over 15 million users, and have them used by the general public. As a supporter of OpenSocial, I feel like the time has finally come. At the same time, seeing the excitement building up everywhere makes me envious.

So, this article is serialized on gihyo.jp together with <a target="_blank" href="http://www.eisbahn.jp/yoichiro/"> Yoichiro </a>.

<a target="_blank" href="http://gihyo.jp/dev/serial/01/opensocial/">http://gihyo.jp/dev/serial/01/opensocial/__HTML_TAG_5__

We have already released the Hatena Bookmark Checker gadget that we are using as a sample.

<a target="_blank" href="http://platform001.mixi.jp/view_appli.pl?id=682">http://platform001.mixi.jp/view_appli.pl?id=682__HTML_TAG_7__

 

 

This is a gadget I created using <a target="_blank" href="http://sandbox.home.goo.ne.jp/">goo Home</a>, but I noticed a few things when making it compatible with the mixi app...

* Are there adequate measures in place to cover legal issues arising from gadgets using only the current terms of use and developer registration method?
* It is theoretically possible to leak personal information to external parties via gadgets, but do ordinary users allow this under the current terms of use?
* There are many, if not all, API glitches.
* OpenSocial extension specifications ignore the OpenSocial style (opensocial.PersonField, etc.).

As for the specifications, since Yoichiro has moved to mixi, I hope they will continue to improve them in the future...