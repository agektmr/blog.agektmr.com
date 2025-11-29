---
layout: post
lang: en
title: 'Template - The technology that makes up Web Components'
description: 'We will explain Templates, one of the elements that make up Web Components.'
date: 2014-10-14
updated: 2014-10-16
tags:
- Template
- Web Components
translationOf: /2014/10/template-web-components.html
translated: 2025-11-29
translatedManually: false
---

*This article is a cross-post of [webcomponents.org article](http://webcomponents.org/articles/introduction-to-template-element/). *

I recently published a video about Templates, one of the technologies that make up Web Components, so I would like to explain it here.

<!-- excerpt -->

{% YouTube 'qC5xK6H0GlQ' %}

## Why Templates Now?

The advantage of using templates for us developers is that it makes it easier to divide the work between us and the designers.

Previously, templates used to be implemented on the server side using PHP, Python's Django, Ruby on Rails, and other web server-side technologies. However, in recent years, browser-side template processing has emerged and become increasingly popular.

This is because the overall architecture is changing with the development of open web technologies such as HTML5. The division of roles is becoming more advanced, with the server computer processing data and the client side processing data by the user. It could be said that we are in a period of transition where the MVC (Model, View, Controller) architecture, which was previously completed on the server side, is now spanning the client side and taking on a more clearly defined role.

As a result, there's been a growing demand for MVC-like structures on the client side, and frameworks like AngularJS, Backbone.js, and Ember.js have become increasingly popular recently. By using frameworks that leverage templates, designers responsible for the visual appearance of HTML and CSS can focus solely on declarative programming, which is relatively easier than imperative programming, and this can lead to improved team productivity.

Speaking of browser-side templating engines, JavaScript-based solutions such as [Mustache.js](http://mustache.github.io/), [Handlebar.js](http://handlebarsjs.com/), [AngularJS](https://angularjs.org/), and [Backbone.js](http://backbonejs.org/) have gained popularity, but these solutions present several challenges that need to be addressed.

### Div tag approach

The `div` tag is hidden as `display:none;`, and the template is embedded in it, which is then copied and used when displaying. This approach has the drawback of sacrificing performance, since resources such as images that haven't yet been used must be fetched from the server.

```html
<div style="display:none;">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</div>
```

### Script tag approach

Embed the template by adding an attribute other than `script` to the tag, then copy and use it when displaying. This approach has the disadvantage of requiring the use of `.innerHTML`, which poses a security risk.

```html
<script type="text/template">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</script>
```

That's where the `<template>` element comes in.   
`<template>` is a proposed web standard that forms part of Web Components, allowing you to embed "non-autonomously processed HTML" into a document.

"HTML that is not processed autonomously" has the following characteristics:

* Even if the `script` tag is included, the script will not be executed until it is actually used.
* Even if resources such as `img` and `video` are included, the resource will not be retrieved from the server until it is actually used.

## How to use Templates

To declare a template, add the HTML of the template you want to use: ``<template>``
タグで囲んでください。実際に利用するには、JavaScript を使う必要があります。

HTML

__CODE_BLOCK_2__

JavaScript

__CODE_BLOCK_3__

実際のコードは[こちら](http://jsbin.com/qaxiw/6/edit)でご覧頂けます。

クエリーした `template` ノードは `document.importNode()` を使ってクローンしま
す。2 つめの引数に`true` を指定することで再帰的にノードの中身もクローンされま
す。これを別のノードに `appendChild()` して、はじめて template に命が吹き込まれ
ます。つまり

* テンプレートに `script` タグがある場合、append されてから実行される
* テンプレートに画像などのリソースがある場合、append されてから読み込みが始まる
* テンプレートに `style` タグがある場合、append されてから有効になる

## 注意

ひとつ注意点があります。既存のテンプレートエンジンを使われたことのある方や、既に
Polymer をすでにいじっている方であれば、どうやって

**プレースホルダーを使って変数を埋め込む**

__CODE_BLOCK_4__

**繰り返しを表現する**

__CODE_BLOCK_5__

**条件分岐をする**

__CODE_BLOCK_6__

と思われるかもしれません。しかしこれはデータバインディングといって、テンプレート
とは区別される別の機能です。そういった機能を自分で実装することなくテンプレートで
利用したい場合は、
[Polymer](http://www.polymer-project.org/)([TemplateBinding](https://github.com/Polymer/TemplateBinding))
や [x-tags](http://www.x-tags.org/) といったフレームワークを利用することをおすす
めします。

## ブラウザサポート状況

`<template>` 要素は 2014 年 10 月現在 Chrome, Opera, Safari, Firefox でサ
ポートされています。サポート対象としたいブラウザで利用可能かどうか知りたい場合
は、chromestatus.com をご覧下さい。Internet Explorer のような未対応ブラウザで
`<template>` To use elements,

[platform.js](https://github.com/polymer/platform) is a polyfill available.

## summary

What did you think? While Templates is primarily designed to realize the concept of Web Components, it seems there are other uses for it. We encourage you to try using Templates to create some great Web Components. Also, if you come across any unique uses for them, please let us know.

If you would like to learn more about Templates, the following documents may be of help:

* [HTML Template Tags Now Available - HTML5Rocks](http://goo.gl/JEIWir)
* [WhatWG HTML Templates Specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#the-template-element)
