---
layout: post
lang: en
title: MarkdownPastr lets you paste HTML as Markdown
date: 2014-02-21
updated: 2014-02-21
tags:
  - Chrome Extension
  - Markdown
  - MarkdownPastr
translationOf: /2014/02/html-markdown-markdownpastr.html
translated: 2026-10-03
translatedManually: false
---
I released an updated version of my Chrome extension while practicing writing tests, so I'd like to introduce it. [MarkdownPastr](https://chrome.google.com/webstore/detail/markdown-pastr/pjeclabeidkcjhopjbgpiimlaccpdkgk) is a Chrome extension that lets you paste rich text copied to your clipboard directly as Markdown.

<!-- excerpt -->

As many developers probably know, [Markdown](http://ja.wikipedia.org/wiki/Markdown) is a popular wiki-like syntax. Its adoption by [GitHub](https://github.com/) caused its popularity to explode. Another reason for its widespread use is that it remains easily readable even as plain text. Recently, more people have also started writing blogs in Markdown using tools like [Jekyll](http://jekyllrb.com/).

While Markdown is great, I personally found myself often wanting to convert text written in Google Docs—including tables—into Markdown, which used to be quite a hassle. That's why I created MarkdownPastr. It's very simple to use: just copy HTML you want to convert from a web page, and paste it into a `textarea`.

This:

[![](https://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)](https://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)

Becomes this:

[![](https://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)](https://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)

With Google Docs, parts written in the Courier New font are recognized as `code`. Also, if an entire line is in Courier New, it is recognized as a code block.

If you want to paste as plain text instead of Markdown, just hold down the `Shift` key while pasting. Another great point is that the process remains idle unless you paste into a `textarea` on a web page, so it doesn't consume unnecessary resources (which is the recommended behavior for modern Chrome Extensions).

By the way, my personal recommendations for Markdown writing environments are:

* [wri.pe](https://wri.pe/) (by [@masuidrive](https://twitter.com/masuidrive))
* [Gists](https://gist.github.com/)
* [Online Markdown Editor](http://www.ctrlshift.net/project/markdowneditor/)
* [Gitter](http://gitter.im/)

The code is [available on GitHub](https://github.com/agektmr/MarkdownPastr). For general feedback, please head [here](https://chrome.google.com/webstore/support/pjeclabeidkcjhopjbgpiimlaccpdkgk).

Give it a try!
