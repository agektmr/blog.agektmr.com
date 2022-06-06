---
layout: post
title: Template - Web Components を構成する技術
description: 'Web Components を構成する要素のひとつ、Templates について解説します。'
date: 2014-10-14
author: Eiji Kitamura
tags:
- Template
- Web Components
updated: 2014-10-16
blogger_id: tag:blogger.com,1999:blog-1878759997851918856.post-7514316136270000024
blogger_orig_url: http://blog.agektmr.com/2014/10/template-web-components.html
---

*この記事は [webcomponents.org の記事](http://webcomponents.org/articles/introduction-to-template-element/)とのクロスポストです。*

先日 Web Components を構成する技術のひとつである Templates に関するビデオを公開
しましたので、解説したいと思います。

<!-- excerpt -->

{% YouTube 'qC5xK6H0GlQ' %}

## なぜ今 Templates なのか

我々開発者にとってテンプレートを使うメリットは、デザイナーとの分業を容易にでき
る、という点にあります。

ウェブサイトを構築する際に利用されるテンプレートというと、以前は PHP や Python
の Django, Ruby on Rails をはじめとするサーバー側での実装が主流でした。それがこ
こ数年、ブラウザ側で処理するテンプレート技術が登場し、人気となってきています。

これは HTML5 などオープンウェブ技術の発展により、全体的なアーキテクチャが変わり
つつあるためです。サーバーはコンピューターがデータを処理するもの、クライアント側
はユーザーがデータを加工するもの、といった分担がより進んでおり、サーバー側で完結
していた MVC (Model, View, Controller) がクライアント側とまたがり、より明確な役
割を担うべく変遷をしている時期である、と言えるかもしれません。

それに伴い、クライアント側でも MVC のような構成が必要だという機運が高まり、ここ
最近は特に AngularJS や Backbone.js, Ember.js といったフレームワークがよく使われ
るようになってきました。テンプレートを活用できるフレームを利用することで、HTML
や CSS といった見た目を担当するデザイナーが、命令的手法 (imparative) より比較的
容易な宣言的手法 (declarative) のみに集中してプログラムを記述することでき、チー
ムとしての生産性の向上が期待できます。

ブラウザ側のテンプレートエンジンといえば
 [Mustache.js](http://mustache.github.io/), [Handlebar.js](http://handlebarsjs.com/), [AngularJS](https://angularjs.org/), [Backbone.js](http://backbonejs.org/)
 など、JavaScript で実現するものが人気を博していますが、こういったソリューション
 にはいくつか解決すべき課題もあります。

### div タグを使ったアプローチ

`div` タグを `display:none;` として表示されないようにしたものにテンプレートを埋
め込み、表示する際にコピーして利用します。このアプローチでは、まだ利用されていな
い画像などのリソースでもサーバーに取りに行ってしまうため、パフォーマンスが犠牲に
なるという欠点があります。

```html
<div style="display:none;">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</div>
```

### script タグを使ったアプローチ

`script` タグに `type="text/javascript"` 以外の属性を付与してテンプレートを埋め
込み、表示する際にコピーして利用します。このアプローチでは、`.innerHTML` を使う
必要があるため、セキュリティ上のリスクが伴うという欠点があります。

```html
<script type="text/template">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</script>
```

そこで登場したのが、`<template>` 要素です。   
`<template>` は Web Components の一翼を担うウェブ標準候補技術で、「自律的に
処理されない HTML」をドキュメントに埋め込むことができます。

「自律的に処理されない HTML」とは、下記のような特徴を持ったものです。

* `script` タグが含まれても、実際に利用されるまでスクリプトを実行しない
* `img` や `video` といったリソースが含まれても、実際に利用されるまでサーバーに
  リソースを取りに行かない

## Templates の使い方

テンプレートを宣言するには、利用したいテンプレートの HTML を ``<template>``
タグで囲んでください。実際に利用するには、JavaScript を使う必要があります。

HTML

```html
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</template>
```

JavaScript

```html
<script>
  var template = document.querySelector('#template');
  var clone = document.importNode(template.content, true);
  var host = document.querySelector('#host');
  host.appendChild(clone);
</script>
<div id="host"></div>
```

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

```html
<template bind="{{items}}"></template>
```

**繰り返しを表現する**

```html
<template repeat="\{\{item in items}}"></template>
```

**条件分岐をする**

```html
<template if="{{item.active}}"></template>
```

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
`<template>` 要素を利用するには
 [platform.js](https://github.com/polymer/platform) という Polyfill があります。

## まとめ

いかがでしたでしょうか？Templates は主に Web Components の概念を実現することを視
野に考えられた仕様ではありますが、それ以外の利用法もありそうです。ぜひ Templates
を活用して、素敵な Web Components を作ってみてください。また、何かユニークな活用
法があれば、教えて下さい。

Templates についてより詳しく知りたいという方は、下記のドキュメントが参考になると
思います。

* [HTML で利用可能になった Template タグ - HTML5Rocks](http://goo.gl/JEIWir)
* [WhatWG HTML Templates 仕
  様](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#the-template-element)
