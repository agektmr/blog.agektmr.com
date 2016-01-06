---
layout: post
title: 'Custom Elements - Web Components を構成する技術'
description: 'Web Components を構成する要素のひとつ、Custom Elements について解説します。'
date: '2014-11-25T23:30:51.000+9:00'
tags:
- Custom Elements
- Web Components
image:
  feature: custom-elements-web-components/image.png
---
*この記事は [webcomponents.org の記事](http://webcomponents.org/articles/introduction-to-custom-elements/)とのクロスポストです。*

HTML は言うまでもなく、ウェブページを構成する最も重要な要素です。しかし、提供される機能が低レベルなため、複雑なコンポーネントを作ろうとすると、途端に div だらけの分かりにくい構造になってしまいがちです。例えば、あなたが必要な機能を盛り込んだ独自のコンポーネントを作れるとしたらどうでしょう？例えばそのコンポーネントに、機能を的確に表すタグ名を付けられるとしたら？既存のタグを拡張して、新しい機能を追加できるとしたら？
Custom Elements は、それを可能にします。

<!-- excerpt -->

<div class="video-wrap">
  <iframe src="//www.youtube.com/embed/iVJA-lGkEFw"></iframe>
</div>

## Custom Elements とはなにか？
Custom Elements は開発者が独自に HTML タグを定義し、サイト上で利用できるようにすることで、繰り返し利用されるコンポーネントを単純化し、再利用する手間を大幅に削減します。

## Custom Element の作り方
Custom Element の定義はシンプルです。`document.registerElement()` の第一引数に要素名を示す文字列を入れるだけ。

```javascript
var XComponent = document.registerElement('x-component');
```

これで定義後は HTML 上に `<x-component>` を使うことができます。

```html
<x-component></x-component>
```

※ `<x-component>` は要素の定義前にドキュメント上に存在していて構いません。詳しくは [HTML5Rocks の記事](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/)をご確認下さい。

Custom Elements をサポートしないブラウザをターゲットにしたい場合は、Polyfill である [webcomponents.js](http://webcomponents.org/polyfills/) をロードしておきましょう。

```html
<script src="bower_components/webcomponentsjs/webcomponents.js"></script>
```

### タグ名のルール
Custom Element に利用するタグ名には「'`-`' が含まれること」というルールがあります。'`-`' がない場合はエラーになりますのでご注意下さい。

**Good**

* x-component
* x-web-component

**Bad**

* web_component
* xelement
* XElement

### 命令的利用方法
タグは HTML 上に `<x-component></x-component>` のように宣言的に (declarative) 利用することができますが、命令的に (imperative) に利用することもできます。

```javascript
var XComponent = document.registerElement('x-component');
var dom = new XComponent();
document.body.appendChild(dom);
```

上記の例では `new` を使って要素のコンストラクタをインスタンス化しています。

```javascript
document.registerElement('x-component');
var dom = document.createElement('x-component');
document.body.appendChild(dom);
```

この例では `document.createElement()` を使ってインスタンス化しています。

## Custom Element に機能を追加する
タグ名が使えるようになっただけでは何の役にも立ちません。この Custom Element に機能を追加してみましょう。

まずは `HTMLElement.prototype` を `Object.create()` の引数として呼び出し、プロトタイプとなるオブジェクトを取得します。次に、そのオブジェクトに任意の関数やプロパティを追加します。これが新しく作る Custom Element のプロトタイプとなります。このオブジェクトを `document.registerElement()` の第二引数に与えるオブジェクトの `'prototype'` をキーとする値として渡します。

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.name = 'Custom Element';
proto.alert = function() {
  alert('This is ' + this.name);
};
document.registerElement('x-component', {
  prototype: proto
});
```

### 継承構造
こうして定義された Custom Element を Chrome DevTools でインスペクトすると、`HTMLElement` をプロトタイプとする `x-component` が、さらに `x-component` インスタンスのプロトタイプになっていることが分かります。

![](/images/custom-elements-web-components/inheritance.png)

## Type Extension Custom Element
ネイティブの DOM 要素の機能はそのままに、拡張して Custom Element を作ることもできます。これを Type Extension Custom Element と呼び、既存タグに Custom Element のタグ名を値とする `is` 属性を追加して利用することができます。

```html
<div is="x-component"></div>
```

Type Extension Custom Element を作るには、`document.registerElement()` の第二引数に、`extends` をキーとする拡張したいタグ名を文字列で渡します。また、`prototype` には `HTMLElement` ではなく、拡張したいタグのプロトタイプを利用します。

下記は `input` タグを拡張する場合の例です。

```javascript
var XComponent = document.registerElement('x-component', {
  extends: 'input',
  prototype: Object.create(HTMLInputElement.prototype)
});
```

`extends: 'input'` として拡張したい要素をタグ名で指定し、`HTMLElement` の代わりに `HTMLInputElement` が使われている点に注意して下さい。これで `<input is="x-component">` として `input` タグを拡張することができます。プロトタイプに機能を足すことで`、input` タグに新たな API を追加することができます。

**注意**：ここで敢えて `extends` と `prototype` に不一致な要素にしたら何がおきるか試してみたいと思われる方もいるかもしれません。それは可能ですし、ひょっとしたら思いもよらなかったアイディアが生まれるかもしれませんが、筆者が試した限り、あまり有益な結果は得られませんでした。

### GitHub のユースケース
ここまでの説明では、Type Extension Custom Element が何の役に立つのか、イメージしづらいかもしれません。実はこれの良さを最大限利用した素晴らしい実装が GitHub 上で既に動いています。

![](/images/custom-elements-web-components/relative-time.png)

GitHub にはソースコードが更新された日時を示す文字列が数多く表示されていますが、画像のように、相対的な表現になっています。相対的な時間を表現するは、ちょっとしたロジックが必要になるであろうことは、開発者の皆さんであればすぐに分かると思いますが、この部分を、GitHub では [`time-elements`](https://github.com/github/time-elements) という Type Extension Custom Element 群で実現しています。

DevTools で要素を確認してみると、下記の画像のようになっています。

![](/images/custom-elements-web-components/time.png)

4 つの点に着目して下さい。

* `time` タグが使われている
* `datetime` 属性として絶対日時が指定されている
* Type Extension Custom Element として `is="relative-time"` が指定されている
* `TextContent` として相対日時が指定されている

これは Type Extension Custom Element が絶対日時 (`datetime`) から相対日時を計算し、`TextContent` を挿入して実現されています。

Type Extension Custom Element を使う利点は、JavaScript がオフにされていたり、ブラウザが Custom Elements に対応していない、もしくは Polyfill が正常に動作しない環境であっても、フォールバックとして `time` 要素の内容がそのまま表示され、セマンティクスが壊れないという点にあります。試しに DevTools で JavaScript をオフにすると、単純に絶対日時が表示されることが確認できます。

`time-elements` について詳しくは webcomponents.org の [How GitHub is using Web Components in production](http://webcomponents.org/articles/interview-with-joshua-peek/) をご覧下さい。

## ライフサイクルコールバック
`relative-time` の例で、相対日時を `TextContent` に挿入する、と書きましたが、それはいつ実行されるのでしょう？Custom Elements では、ライフサイクルコールバックと呼ばれる、各種イベント発生時に呼び出す関数を定義することができます。

**.createdCallback()**
要素が作られた直後に呼ばれます。

**.attachedCallback()**
作った要素がドキュメント上の DOM に接続されると呼ばれます。

**.detachedCallback()**
作った要素がドキュメント上の DOM から切り離されると呼ばれます。

**.attributeChangedCallback()**
作った要素の属性が変更されると呼ばれます。

`relative-time` の例では、`.createdCallback()` と `.attributeChangedCallback()` のタイミングで相対日時を計算し、`TextContent` を書き換える処理が行われています。

### 例
ライフサイクルコールバックを使うには、Custom Element 定義時にプロトタイプオブジェクトに関数を定義します。

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  var div = document.createElement('div');
  div.textContent = 'This is Custom Element';
  this.appendChild(div);
};
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

## Template, Shadow DOM と組み合わせて使う
Custom Element と Template、Shadow DOM を組み合わせることで、開発効率と再利用のしやすさが向上します。Template では宣言的に (つまり HTML をそのまま書くだけで) 要素の中身を定義することができるようになります。Shadow DOM では、スタイルや id、class などを要素内に閉じ込めることができるようになります。

これを実現するには、Custom Element が作られた際に呼び出される `.createdCallback()` 内で Template、Shadow DOM と組み合わせます。  
なお、Template と Shadow DOM については、以前の記事 ([Template](http://blog.agektmr.com/2014/10/template-web-components.html)、[Shadow DOM](http://blog.agektmr.com/2014/11/shadow-dom-web-components.html)) を参考にして下さい。

**HTML**

```html
<!-- Template の定義 -->
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content>
  </div>
</template>
```

```html
<!-- Custom Element を使用 -->
<x-component>
  <h1>This is Custom Element</h1>
</x-component>
```

**JavaScript**

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  // Shadow DOM を追加
  var root = this.createShadowRoot();
  // Template を追加
  var template = document.querySelector('#template');
  var clone = document.importNode(template.content, true);
  root.appendChild(clone);
}
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

実際のコードは[こちら](http://jsbin.com/yugoka/1/edit?html,js,output)でご覧頂けます。

## ブラウザサポート状況
Custom Elements は 2014 年 11 月現在 Chrome, Opera, フラグ付きなら Firefox でもサポートされています。最新のサポート状況は [chromestatus.com](https://www.chromestatus.com/features/4642138092470272) または [caniuse.com](http://caniuse.com/#feat=custom-elements) でチェックしてみて下さい。Polyfill として [webcomponents.js](http://webcomponents.org/polyfills/) ([platform.js](https://github.com/Polymer/platform) から名称変更) も利用できます。

## まとめ
いかがでしたでしょうか？[上記のリンク先](http://webcomponents.org/articles/interview-with-joshua-peek/)にもある通り、Custom Elements は Web Components の中でも比較的 Polyfill の実装が現実的なこともあり (IE9 でも動作)、GitHub でも実用されているようです。ぜひ実際に試してみてください。

Custom Elements についてより詳しく知りたいという方は、下記のドキュメントも参考になります。

* [Custom Elements: HTML に新しい要素を定義する - HTML5Rocks](http://goo.gl/ozdC4Q)
* [Custom Elements 仕様](http://w3c.github.io/webcomponents/spec/custom/)
