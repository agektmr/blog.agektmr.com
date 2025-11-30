---
layout: post
lang: en
title: "OpenSocial's AtomPub is discovered with XRDS-Simple"
description:
date: 2008-06-12
tags:
  - AtomPub
  - OpenSocial
  - Service Document
  - XRDS-Simple
translationOf: /2008/06/opensocialatompubxrds-simple.html
translated: 2025-11-30
translatedManually: false
---
The [OpenSocial v0.8 RESTful API Specification](http://code.google.com/apis/opensocial/docs/0.8/restfulspec.html) specifies the use of [XRDS-Simple](http://xrds-simple.net/core/1.0/) for autodiscovery.

On the other hand, the RESTful API used in OpenSocial v0.8 is in the [AtomPub](http://tools.ietf.org/html/rfc5023) format, and AtomPub specifies the use of a Service Document.

This leaves open the question of which container site should use, and whether they should use both. I posed a question to the Google Groups OpenSocial specification group.

question

> Should a container site adopt AtomPub's Service Document or XRDS-Simple?
> Should it support both?

Answer by David Primmer

AtomPub's Service Document is not suitable for defining parts of a URL as a template and assigning variables. It seems to be designed to be specified on a relatively fixed URL. XRDS-Simple excels in that it allows you to discover URLs by filling in the blanks.

Regarding this point, [Takemaru], who implemented the AtomPub Perl library, also pointed it out, and we agree that using XRDS-Simple is more reasonable.

However, it's certainly unsightly in terms of not conforming to the specification, and I'm wondering if this issue can be resolved somehow. I asked the AtomPub spec creators on the Google Groups I mentioned earlier whether they planned to propose changes to the specification, but I haven't received a response since.

At present, Rod Yates has suggested that we could apply [this specification](http://tools.ietf.org/html/draft-snell-atompub-feature-12), so we will consult with AtomPub experts and make some kind of effort to address this.
