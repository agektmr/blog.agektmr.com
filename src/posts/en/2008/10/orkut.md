---
layout: post
lang: en
title: Bookmarklet to peek into the source code of Orkut apps
description:
date: 2008-10-20
tags:
  - Gadget
  - Orkut
  - Service
translationOf: /2008/10/orkut.html
translated: 2025-11-30
translatedManually: false
---
Here's a little tip I posted on the OpenSocial-Japan mailing list.

OpenSocial apps (gadgets) are displayed within an iframe, and the query portion of the URL included in the src attribute of the iframe tag actually contains the URL of the XML source code.  Using this bookmarklet, you can open the source code with a single click.

[Open Orkut Gadget XML](javascript:var%20inner_doc%20=%20document.getElementsByTagName('iframe')[0].contentDocument;var%20iframes%20=%20inner_doc.getElementsByTag Name('iframe');var%20src%20=%20iframes[0].src.replace(/^.*?\?url=(.*?)&.*$/i,%20&quot;$1&quot;);window.open(decodeURIComponent(src));undefined;)

↑ Save the above as a bookmarklet, and click it while viewing an Orkut app. The source code page will open in a new window. (If multiple source code pages are displayed, the source code of the topmost app will open.)

*I have only tested it on Firefox, so please let me know if it doesn't work.
