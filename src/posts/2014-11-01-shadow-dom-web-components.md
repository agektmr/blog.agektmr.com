---
layout: post
title: Shadow DOM - Web Components を構成する技術
description: 'Web Components を構成する要素のひとつ、Shadow DOM について解説します。'
date: 2014-11-01
tags:
- Shadow DOM
- Web Components
image:
  feature: shadow-dom-web-components/architecture.png
---

*この記事は [webcomponents.org の記
事](http://webcomponents.org/articles/introduction-to-shadow-dom/)とのクロスポス
トです。*

Shadow DOM を利用すると、DOM 要素に、ウェブページの他の部分とは切り離された、
ノード内だけで有効なスタイルやマークアップを含んだ DOM ツリーを追加することがで
きます。この記事と動画では、この Shadow DOM について解説します。

<!-- excerpt -->

{% YouTube 'Is4FZxKGqqk' %}

## Shadow DOM とはなにか？

[![](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)

こちらは HTML5 の video タグで表示された動画です。ご覧頂けるとお分かりのように、
コードは video タグのみという単純さでありながら、動画そのものだけでなく、制御用
の UI も表示することができています。

```html
<video src="http://craftymind.com/factory/html5video/BigBuckBunny_640x360.mp4" controls></video>
```

実は Chrome で DevTools を開いて、`'Show user agent shadow DOM'` オプションを on
にすると、この制御用 UI がどのようにできているか確認することができます。

[![](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)

この制御用 UI が、実際は HTML でできていることがお分かりでしょうか？これが Shadow
DOM の一例です。

[![](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)

Shadow DOM が素晴らしいのは、実はこの機能がウェブ開発者にも使える、ということで
す。

## Shadow DOM の構造

Shadow Root を持った要素は Shadow Host と呼ばれます。Shadow Root は通常の DOM 要
素と同様に扱えるため、任意のノードを追加することもできます。

[![](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)

Shadow DOM では、すべてのマークアップと CSS が要素内にスコープされます。言い換え
ると、Shadow Root 内で定義された CSS は親ドキュメントに影響を与えず、親ドキュメ
ントの CSS が誤って Shadow Root 内に影響を与えることもありません。

## Shadow DOM の作り方

Shadow DOM を作るには、任意の DOM 要素に対して `.createShadowRoot()` を呼び出
し、Shadow Root を作ります。この Shadow Root オブジェクトに要素を足していくこと
で、Shadow DOM を構築していくことができます。

```html
<div id="host"></div>
```

```javascript
var host = document.querySelector('#host');
var root = host.createShadowRoot(); // Shadow Root を作る
var div = document.createElement('div');
div.textContent = 'This is Shadow DOM';
root.appendChild(div); // Shadow Root に要素を追加
```

Shadow Root に追加された要素はクエリすることもできません。この場合、
`document.querySelector('#host div')` は `null` になります。

## Shadow DOM 内に Shadow Host のコンテンツを表示する

Shadow DOM 内に Shadow Host の子要素を表示したい場合があると思います。例えば
Shadow DOM によってスタイルを与えられているネームタグのような要素を考えてみま
しょう。外部からの入力で文字だけ変更できると便利ですよね。

[![](https://2.bp.blogspot.com/-8NLBoVflV6A/VD9FVei9BVI/AAAAAAAAudw/6FEbhEJuOSs/s1600/posterImage-4222.png)](https://2.bp.blogspot.com/-8NLBoVflV6A/VD9FVei9BVI/AAAAAAAAudw/6FEbhEJuOSs/s1600/posterImage-4222.png)

```html
<div id="nameTag">Bob</div>
```

これを実現するには、`<content>` 要素を用います。

```javascript
var host = document.querySelector('#host');
var root = host.createShadowRoot();
var content = document.createElement('content');
content.setAttribute('select', 'h1'); //<content select="h1"></content>
root.appendChild(content);
```

```html
<div id="host">
  <h1>This is Shadow DOM</h1>
<div>
```

`<content>` 要素に `select` 属性として Shadow Host から取り上げたいノードを指し
示す CSS セレクタを与えることで、その要素が `<content>` の位置に挿入されます。

なお、`<content>` 要素で指定できるのは、Shadow Host の直接の子孫となる要素を示す
CSS セレクタのみです。つまり以下のように、子孫の子孫を示すようなことはできませ
ん。

```html
<div id="host">
  <div class="child">
    <h1>This is Shadow DOM</h1>
  </div>
</div>

<content select=".child h1"></content> // これはダメ
```

## Template と組み合わせる

Shadow DOM は素晴らしいですが、構築のためにいちいち命令的に DOM ツリーを構築する
JavaScript を書くのは楽ではありませんし、デザイナーが入ってくる余地もありませ
ん。

そこで登場するのが Template 要素です。Template 要素を活用することで、Shadow DOM
の構築が宣言的に行いましょう。Template 要素については、[前回のポス
ト](http://blog.agektmr.com/2014/10/template-web-components.html)を参考にして下
さい。

```html
<template id="template"> // <template> の中身が Shadow DOM になる
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content> // h1 をここに挿入
  </div>
</template>

<div id="host">
  <h1>This is Shadow DOM</h1>
</div>
```

```javascript
var host = document.querySelector('#host');
// Shadow Root を作る
var root = host.createShadowRoot();
var template = document.querySelector('#template');
// <template> をコピー
var clone = document.importNode(template.content, true);
// Shadow Root に追加
root.appendChild(clone);
```

実際のコードは[こちら](http://jsbin.com/bahera/4/edit)でご覧頂けます。

## ブラウザサポート状況

Shadow DOM は 2014 年 10 月現在 Chrome, Opera, フラグ付きなら Firefox でもサポー
トされています。最新のサポート状況は chromestatus.com または caniuse.com で
チェックしてみて下さい。ポリフィルとして
 [platform.js](https://github.com/polymer/platform) (2014 年 11 月から
webcomponents.js に[名称変更予
定](https://blog.polymer-project.org/announcements/2014/10/16/platform-becomes-webcomponents/))
も利用できます。

## まとめ

いかがでしたでしょうか？Shadow DOM は今回記事にした内容の他にも、外部からのスタ
イリングやイベントの扱い方、複数の Shadow Root の扱い方など、非常に複雑な仕様が
盛りだくさんです。

Shadow DOM についてより詳しく知りたいという方は、下記のドキュメントを参考にして
ください。

* [Shadow DOM 101](http://goo.gl/1cxTS7)
* [Shadow DOM 201 - CSS とスタイリン
  グ](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - 上級者向けコンセプトと DOM
  API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)
* [Shadow DOM 仕様](http://www.w3.org/TR/shadow-dom/)
