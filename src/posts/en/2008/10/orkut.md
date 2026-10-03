---
title: Bookmarklet to peek at Orkut app source code
layout: post
lang: en
date: 2008-10-20
tags:
  - Gadget
  - Orkut
  - Service
translationOf: /2008/10/orkut.html
translated: 2026-10-03
translatedManually: false
---
Posting a quick tip that I shared on the OpenSocial-Japan mailing list.

OpenSocial apps (gadgets) are displayed inside an iframe, and the query part of the URL in the iframe tag's `src` attribute actually contains the URL of the XML source code. With this bookmarklet, you can open the source code with just one click.

[Open Orkut Gadget XML](javascript:var%20inner_doc%20=%20document.getElementsByTagName('iframe')[0].contentDocument;var%20iframes%20=%20inner_doc.getElementsByTagName('iframe');var%20src%20=%20iframes[0].src.replace(/^.*?\?url=(.*?)&.*$/i,%20&quot;$1&quot;);window.open(decodeURIComponent(src));undefined;)

↑ Save the above link as a bookmarklet and click it while viewing an Orkut app; the source code page will open in a new window. (If multiple apps are displayed, it will open the source code for the top one.)

*Note: I have only tested this in Firefox, so please let me know if it doesn't work.
