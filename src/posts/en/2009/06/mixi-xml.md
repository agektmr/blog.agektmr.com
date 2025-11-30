---
layout: post
lang: en
title: Bookmarklet to view mixi app gadget XML
description:
date: 2009-06-17
tags:
  - mixiアプリ
translationOf: /2009/06/mixi-xml.html
translated: 2025-11-30
translatedManually: false
---
When you think of OpenSocial, you think of mixi apps, or rather, when you think of mixi apps, you think of OpenSocial? I can really sense this kind of atmosphere, but how are you all doing?

Today, I'd like to introduce you to a bookmarklet that lets you peek inside the mixi app.

<a href="javascript:var%20url%20=%20document.getElementsByTagName('iframe')%5B1%5D.src;url%20=%20decodeURIComponent(url.replace(/%5E.*?url=(.*?)&.*$/i,%20'$1'));window.open(url);undefined;" target="_blank">Peep mixi Appli XML</a>

There's no need for detailed explanations for those reading this, so I'll keep it brief.

Please save the above link to your browser's bookmarks. Open the mixi app screen and click on the bookmark to open the gadget XML source page. It has been confirmed to work on Safari and Firefox.

Now you can easily get a peek at how the gadget is made.

*Come to think of it, <a href="http://home.goo.ne.jp/" target="_blank">goo Home</a> is also OpenSocial.
