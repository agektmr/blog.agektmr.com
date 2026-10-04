---
title: One of my questions about OpenSocial has been resolved.
layout: post
lang: en
date: 2008-03-15
tags:
  - Gadget
  - OpenSocial
  - Orkut
  - Widget
translationOf: /2008/03/opensocial.html
translated: 2026-10-03
translatedManually: false
---
**Premise: When specifying the url type in a Google Gadget, the remote server's content is displayed directly inside the iframe. As a result, attempting to retrieve friend information or similar data via Ajax requires cross-domain requests, turning it into server-to-server communication via a proxy—which is useless without a RESTful API.**

Apparently, Orkut does not allow `Content Type="url"`.

[MYSQL database connection using PHP for my gadget ? &#8211; Orkut Developer Forum | Google グループ](https://groups.google.com/group/opensocial-orkut/browse_thread/thread/f6de89397dc56576/70f57151180b87cb?lnk=gst&q=content+type+url#70f57151180b87cb)

Specifying `Content Type="url"` seems to return a 404. While returning a 404 itself is reportedly a bug, I was able to confirm that even if `Content Type="url"` were working, accessing OpenSocial across domains still requires RESTful API access via a proxy. I have not confirmed whether this is just an interim measure until the RESTful API is officially introduced, but it seems my initial premise was not mistaken.
