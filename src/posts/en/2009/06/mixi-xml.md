---
title: A bookmarklet to peek at mixi app gadget XML
author: Eiji
layout: post
lang: en
date: 2009-06-17
categories:
  - OpenSocial
tags:
  - mixiアプリ
translationOf: /2009/06/mixi-xml.html
translated: 2026-10-03
translatedManually: false
---
When people think of OpenSocial, they think of mixi Appli—or perhaps it's more like, "Wait, mixi Appli is OpenSocial, isn't it?" That's very much the vibe I've been sensing lately. How is everyone doing?

Today, I'd like to share a bookmarklet that lets you peek inside these mixi Appli apps.

<a href="javascript:var%20url%20=%20document.getElementsByTagName('iframe')%5B1%5D.src;url%20=%20decodeURIComponent(url.replace(/%5E.*?url=(.*?)&.*$/i,%20'$1'));window.open(url);undefined;" target="_blank">Peep mixi Appli XML</a>

Anyone reading this probably doesn't need a detailed explanation, so I'll keep it brief.

Save the link above to your browser's bookmarks. Navigate to a mixi Appli page and click the bookmark, and the source page for the gadget XML will open. Confirmed to work in Safari and Firefox.

Now you can easily take a look at how these gadgets are put together.

*By the way, <a href="http://home.goo.ne.jp/" target="_blank">gooホーム</a> is also OpenSocial.
