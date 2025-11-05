---
title: Orkut アプリのソースコードを覗くブックマークレット
layout: post
lang: ja
date: 2008-10-20
tags:
  - Gadget
  - Orkut
  - Service
---

OpenSocial-Japan のメーリングリストで出した小ネタを貼っておきます。

OpenSocial アプリ(ガジェット)は iframe 内に表示されているのですが、iframe タグの src 属性に含まれる URL の query 部分に、実はソースコードとなる XML の URL が書いてあります。 このブックマークレットを使えば、ワンクリックでソースコードを開くことができます。

[Open Orkut Gadget XML](javascript:var%20inner_doc%20=%20document.getElementsByTagName('iframe')[0].contentDocument;var%20iframes%20=%20inner_doc.getElementsByTagName('iframe');var%20src%20=%20iframes[0].src.replace(/^.*?\?url=(.*?)&.*$/i,%20&quot;$1&quot;);window.open(decodeURIComponent(src));undefined;)

↑上記をブックマークレットとして保存し、Orkut アプリを表示した状態でクリックすると、ソースコードのページが新規ウィンドウで開きます。 (複数表示されている場合は、一番上のアプリのソースコードが開きます)

※Firefox でしか動作確認してないので、動かなかったら教えてください。