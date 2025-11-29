---
layout: undefined
lang: en
title: ''
description: ''
date: undefined
translationOf: /2014/02/html-markdown-markdownpastr.html
translated: 2025-11-29
translatedManually: false
---
--- 
layout: post
lang: ja
title: MarkdownPastr: Paste HTML as Markdown
date: 2014-02-21
updated: 2014-02-21
tags:
- Chrome Extension
- Markdown
- MarkdownPastr
---

While practicing writing tests, we've updated the version, so we'd like to introduce it to you. We've released a new version of the Chrome Extension: [MarkdownPastr](https://chrome.google.com/webstore/detail/markdown-pastr/pjeclabeidkcjhopjbgpiimlaccpdkgk), which allows you to paste rich text copied to the clipboard as Markdown.

<!-- excerpt -->

As developers likely know, [Markdown](http://ja.wikipedia.org/wiki/Markdown) is a popular wiki-like syntax these days. Its adoption on [GitHub](https://github.com/) has made it explosively popular. One of the reasons for its popularity is likely that it's relatively easy to understand even when viewed as plain text. Recently, some people have started writing blogs in Markdown using [Jekyll](http://jekyllrb.com/) and other tools. 

However, I often find myself needing to convert documents containing tables written in Google Docs into Markdown, which can be inconvenient. That's why I created MarkdownPastr. It's simple to use: just copy the HTML you want to convert to Markdown on a web page and paste it into `textarea`.

This is

[![](https://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)](https://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)

It looks like this.

[![](https://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)](https://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)

In Google Docs, anything written in Courier New font will be recognized as `code`. Also, if the entire line is in Courier New font, it will be recognized as a code block.

If you want to paste in simple text instead of Markdown, just hold down the `Shift` key while pasting. The process will stop unless you paste into `textarea` on the web page, so it doesn't consume unnecessary resources (this is the recommended behavior in the new Chrome Extension).

By the way, my personal recommended Markdown writing environment is

* [wri.pe](https://wri.pe/) (by [@masuidrive](https://twitter.com/masuidrive))
* [Gists](https://gist.github.com/)
* [Online Markdown Editor](http://www.ctrlshift.net/project/markdowneditor/)
* [Gitter](http://gitter.im/)

It's around here.

The code is available on [GitHub](https://github.com/agektmr/MarkdownPastr). General feedback can be found [here](https://chrome.google.com/webstore/support/pjeclabeidkcjhopjbgpiimlaccpdkgk).

Please give it a try.
