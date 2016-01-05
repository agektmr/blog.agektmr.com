---
title: mixiアプリのガジェットXMLを覗き見るブックマークレット
author: Eiji
layout: post
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00011<>1271388274<>9<>0<>1<>1<>0'
categories:
  - OpenSocial
tags:
  - mixiアプリ
---
OpenSocialといえばmixiアプリ、いやむしろmixiアプリってそういえばOpenSocial？という感じの空気をひしひしと感じてますが、皆さんいかがお過ごしでしょうか。

今日はそんなmixiアプリの中身を覗き見るブックマークレットをご紹介します。

<a href="javascript:var%20url%20=%20document.getElementsByTagName('iframe')%5B1%5D.src;url%20=%20decodeURIComponent(url.replace(/%5E.*?url=(.*?)&.*$/i,%20'$1'));window.open(url);undefined;" target="_blank">Peep mixi Appli XML</a>

これを読んでるであろう人に詳しい説明は不要なので、簡単に書きます。

上記リンクをブラウザのブックマークに保存してください。mixiアプリの画面を開いてそのブックマークをクリックすると、ガジェットXMLのソースページが開きます。SafariとFirefoxで動作確認済みです。

これで、ガジェットがどんな風にできているのか、気軽に覗き見ることができますね。

※そういえば<a href="http://home.goo.ne.jp/" target="_blank">gooホーム</a>もOpenSocialです。