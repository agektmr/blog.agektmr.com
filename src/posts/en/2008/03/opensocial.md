---
layout: post
lang: en
title: 'One question about OpenSocial has been answered'
description: ''
date: 2008-03-15
tags:
- Gadget
  - OpenSocial
  - Orkut
  - Widget
translationOf: /2008/03/opensocial.html
translated: 2025-11-29
translatedManually: false
---

**Prerequisite: When specifying the url type in Google Gadget, the contents of the remote server are displayed as is in the iframe. Therefore, if you try to obtain friend information, etc. using Ajax, domain crossing is required, and communication between servers occurs via a proxy, making it useless without a RESTful API.**

Apparently Orkut doesn't allow `Content Type="url"`.

[MYSQL database connection using PHP for my gadget? &#8211; Orkut Developer Forum | Google Groups](https://groups.google.com/group/opensocial-orkut/browse_thread/thread/f6de89397dc56576/70f57151180b87cb?lnk=gst&q=content+type+url#70f57151180b87cb)

It seems that specifying `Content Type="url"` returns a 404. The fact that a 404 is returned is itself a bug, but once `Content Type="url"` starts working, it can be confirmed that accessing the RESTful API via a proxy is required to use OpenSocial across domains. It is not confirmed whether this is a temporary measure until the RESTful API is officially released, but the premise appears to be correct.
