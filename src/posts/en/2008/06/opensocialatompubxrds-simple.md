---
title: "OpenSocial's AtomPub uses XRDS-Simple for discovery."
layout: post
lang: en
date: 2008-06-12
tags:
  - AtomPub
  - OpenSocial
  - Service Document
  - XRDS-Simple
translationOf: /2008/06/opensocialatompubxrds-simple.html
translated: 2026-10-03
translatedManually: false
---
The [OpenSocial v0.8 RESTful API Specification](http://code.google.com/apis/opensocial/docs/0.8/restfulspec.html) specifies the use of [XRDS-Simple](http://xrds-simple.net/core/1.0/) for auto-discovery.

On the other hand, the RESTful API used in OpenSocial v0.8 follows the [AtomPub](http://tools.ietf.org/html/rfc5023) format, and AtomPub specifies the use of a Service Document.

This leaves container sites wondering which one to use, or if they should support both. I posted a [question](http://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/a447a1f155f4f06b) regarding this to the [Google Group for discussing OpenSocial specifications](http://groups.google.com/group/opensocial-and-gadgets-spec).

Question:

> Which should container sites adopt: AtomPub's Service Document or XRDS-Simple? Should they support both?

David Primmer's response:

> AtomPub's Service Document is not well-suited for defining parts of a URL as templates and filling in variables. It seems to be designed for specifying relatively fixed URLs.  
> In that regard, XRDS-Simple is superior in that it allows discovering URLs by filling values into blanks.

On this point, [Takemaru-san also pointed this out](http://teahut.sakura.ne.jp/b/2008-04-09-1.html) when implementing an AtomPub Perl library, and there is general agreement that using XRDS-Simple makes more sense.

Still, it's undeniably uncomfortable in the sense that it doesn't strictly adhere to the specification, and I'm wondering if this can be resolved somewhere. In the Google Group mentioned earlier, I asked, "Are there any plans to propose a specification change to the AtomPub spec authors?", but there has been no response since.

At the moment, someone named Rod Yates suggested that [this specification](http://tools.ietf.org/html/draft-snell-atompub-feature-12) might be applicable, so I'd like to consult with AtomPub experts and take some form of action.
