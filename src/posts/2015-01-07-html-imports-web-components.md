---
layout: post
title: 'HTML Imports - Web Components を構成する技術'
description: 'Web Components を構成する要素のひとつ、HTML Imports について解説します。'
date: 2015-01-07
tags:
- HTML Imports
- Web Components
image:
  feature: custom-elements-web-components/image.png
---
*この記事は [webcomponents.org の記事](http://webcomponents.org/articles/introduction-to-html-imports/)とのクロスポストです。*

[Template](/2014/10/template-web-components.html) や [Shadow DOM](/2014/11/shadow-dom-web-components.html)、[Custom Elements](/2014/11/custom-elements-web-components.html) を使うことで、機能ごとの UI コンポーネントが実現できるようになることはこれまでに説明してきました。しかし、それらを使ったコンポーネントの HTML、CSS、JavaScript を別々に呼び出すのは、非効率です。

依存関係の解決も容易ではありません。jQuery UI や Bootstrap を思い出して下さい。JavaScript、CSS、Web Font といった各種リソースを、必要に応じて別々のタグに記述しなければなりませんでした。特にタグごとにコンポーネントとして扱うことが想定されている Web Components の場合、状況が複雑化することは簡単に想像できます。

これらのリソースを、ひとつの HTML ファイルにまとめてロードできるのが、HTML Imports です。

<!-- excerpt -->

{% YouTube 'JhpOw8mq1jo' %}

## HTML Imports の使い方
HTML にまとまったリソースをロードするには、`link` タグの `rel` 属性に `import`、`href` 属性にロードしたいリソースの URL を指定して、追加します。例えば index.html という HTML から component.html という HTML を読み込みたい場合、このように記述します：

index.html

```html
<link rel="import" href="component.html" >
```

インポートされる HTML には、通常の HTML と同様、JavaScript や CSS、Web Font など、どんなリソースでも記述することができます：

component.html

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>
```

`doctype` や `html`、`head`、`body` は不要です。インポートされたドキュメントに記述された HTML は、ロードと同時に読み込まれ、そこからリンクされたサブリソースに JavaScript があれば、即座に実行されます。

## リソースの実行順序
それでは、親となる HTML と、子となるインポートされた HTML の両方に JavaScript が記述されていた場合、どちらが先に実行されるでしょうか？実行順によっては期待通りの動作にならないこともありえるので、ここを理解しておくことは、とても重要です。  

HTML Imports は読み込みの際、script タグにおける defer と同様に振る舞います。例えば下記のコードでは、index.html は component.html を読み込む際、component.html 内の script を含むすべてを実行してから次の script を実行します。  

index.html

```html
<link rel="import" href="component.html"> // 1.
<title>Import Example</title>
<script src="script3.js"></script>        // 4.
```

component.html

```html
<script src="js/script1.js"></script>     // 2.
<script src="js/script2.js"></script>     // 3.
```

1. index.html 最初の行の component.html を読み込み、component.html の処理を待つ
2. component.html 最初の行の script1.js を実行する
3. component.html の script1.js を実行完了後、二行目の script2.js を実行する
4. component.html の script2.js を実行完了後、index.html 三行目の script3.js を実行する

なお、`link[rel="import"]` は、`async` 属性を追加することができます。`async` を追加すると、[`script` タグの場合と同様](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)、処理の完了を待たずにドキュメントの読み込みを続行します。実行順に依存した処理でなければ、`async` を追加することで、ページ全体のロード時間を高速化できる可能性があります。

## オリジンの壁は超えられない
HTML Imports はセキュリティ上、オリジンの壁を超えられません。別の言い方をすると、[http://webcomponents.org/](http://webcomponents.org/) から、[http://example.com/](http://example.com/) のリソースをインポートすることは、通常できません。(オリジンとは、ドメインだけではなく http / https といったプロトコルやサブドメイン、ポート番号も含めて、完全に一致するものを指します。)

この制限を回避するには、import するリソースのサーバーが CORS (Cross Origin Resource Sharing) に対応している必要があります。CORS について詳しくは[こちら](http://www.html5rocks.com/tutorials/cors/)(英語です。[翻訳募集中！](https://github.com/html5j-english/README))をお読み下さい。

## window と document
先程、HTML をインポートすると、内容が読み込まれ、JavaScript が実行されると述べましたが、そこに記述されている HTML が勝手にブラウザに表示されるわけではありません。この部分は、別途 JavaScript で手助けしてやる必要があります。

JavaScript を使ってドキュメントからドキュメントに HTML を移し替える際に注意しなければならないのは、それぞれのコンテキストで `document` が何を指すかです。

実はどちらも、import 元となる HTML のものを指します。これは上記のサンプルコードで言うと、component.html 上の JavaScript も、index.html 上の JavaScript も、いずれも index.html の `document` を指すということです。それでは、import されたドキュメントの `document` を指すにはどうすればよいのでしょう？

index.html から component.html の `document` を取得するには、`link` タグの `import` プロパティを参照します。

index.html

```js
var link = document.querySelector('link[rel="import"]');
link.addEventListener('load', function(e) {
  var importedDoc = link.import; // component.html の document
});
```

  component.html の JavaScript で component.html の `document` を取得したい場合は、`document.currentScript.ownerDocument` を参照します。

component.html

```js
var mainDoc = document.currentScript.ownerDocument;
// mainDoc は component.html の document を指す
```

webcomponents.js (platform.js から名称変更) を利用している場合は、`document.currentScript` の代わりに `document._currentScript` を利用して下さい。

component.html

```js
var mainDoc = document._currentScript.ownerDocument;
```

JS の最初の方に下記のようなコードを入れておくと、`document._currentScript` から透過的に扱うことができます。

```js
document._currentScript = document._currentScript || document.currentScript;
```

## HTML Imports を使った場合のパフォーマンス
これまで述べたように、HTML imports の利点はコンポーネントを整理できることですが、これは逆に、ロードするリソースの数を増やすことにも繋がります。ここでおのずと、幾つか懸念が生まれてくるはずです。

### 依存関係の解決
懸念のひとつは依存関係の解決です。例えば取り込んだ複数の HTML が、いずれも jQuery を読み込んでいた場合、どういう挙動をするのでしょうか？

実は、インポートされた HTML から直接 `script` タグで jQuery のリソースをロードしてしまうと、2 度のネットワークリクエストに加え、スクリプト自体も 2 度実行されることになってしまいます。

index.html

```html
<link rel="import" href="component1.html">
<link rel="import" href="component2.html">
```

component1.html

```html
<script src="js/jquery.js"></script>
```

component2.html

```html
<script src="js/jquery.js></script>
```

URL を管理して複数読み込まれないようにすることは不可能ではありませんが、そんなコードを書くのは面倒ですよね。HTML Imports を使えば、そこを自動的に解決してくれます。

HTML Imports は `script` タグと異なり、複数の同じリソースの読み込みは自動的に省略され、実行も一度に制限されます。例えば上記の jQuery を読み込む例では、直接 jQuery のリソースを呼び出すのではなく、`script` タグを記述した HTML でラップすることにより、読み込みと実行を一度だけに抑制することができます。

index.html

```html
<link rel="import" href="component1.html">
<link rel="import" href="component2.html">
```

component1.html

```html
<link rel="import" href="jquery.html">
```

component2.html

```html
<link rel="import" href="jquery.html">
```

jquery.html

```html
<script src="js/jquery.js"></script>
```

こうすれば、js/jquery.js の読み込みと実行は一度だけとなります。

![](/images/html-imports-web-components/dependency.png)

ただ、またひとつ懸念を増やしてしまいました。HTML でラップすることで、ネットワークリクエストがひとつ増えてしまったのです。なんとかならないでしょうか？  

この問題を解決する方法として、Vulcanize というツールがあります。

### ネットワークリクエストをまとめる
vulcanize はネットワークリクエストを減らすため、複数の HTML リソースをひとつにまとめてくれるツールです。npm でインストールし、コマンドラインから利用できます。grunt や gulp のタスクも用意されているため、ビルドプロセスに組み込むと便利です。

上記のサンプルコードで index.html から始まる依存関係を解決する場合：

```js
$ vulcanize -o vulcanized.html index.html
```

上記をコマンドライン上で実行することで、依存関係を解決し、リソースを集約した vulcanized.html という HTML を生成してくれます。

vulcanize について、詳しくは[こちら](https://www.polymer-project.org/articles/concatenating-web-components.html)をご覧ください。

## Template, Shadow DOM, Custom Elements と組み合わせて使う
それでは、[これまでの記事で作ってきたコード](http://webcomponents.org/articles/introduction-to-custom-elements/)を元に、Template, Shadow DOM, Custom Elements と HTML Imports を組み合わせて使う例をご紹介しましょう。

Template  では宣言的に要素の中身を定義することができるようになります。Shadow DOM では、スタイルや id、class などを要素内に閉じ込めることができるようになります。Custom Elements では、任意のタグ名でオリジナルのタグを使うことができます。

これらと HTML Imports を組み合わせることにより、タグひとつ追加するだけで、カスタムコンポーネントをあなたのウェブページで使えるようにすることも可能です。

x-component.html

```html
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img class="webcomponents" src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content>
  </div>
</template>
<script>
// This element will be registered to index.html
// Because `document` here means `document` in index.html
var XComponent = document.registerElement('x-component', {
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        var root = this.createShadowRoot();
        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);
      }
    }
  })
});
</script>
```

index.html

```html
  ...
  <link rel="import" href="x-component.html">
</head>
<body>
<x-component>
  <h1>This is Custom Element</h1>
</x-component>
...
```

インポートされる HTML (x-component.html) の document が、インポート元である index.html のそれを指してくれているおかげで、特にひねったことをしなくてもうまく動作してくれるはずです。  

## ブラウザサポート状況
HTML Imports は 2014 年 12 月現在 Chrome, Opera, フラグ付きなら Firefox でもサポートされています (Update: [Mozilla は ES6 Modules との兼ね合いから、HTML Imports の ship を見合わせる方針を発表しました](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/))。最新のサポート状況は [chromestatus.com](https://www.chromestatus.com/features/4642138092470272) または [caniuse.com](http://caniuse.com/#feat=custom-elements) でチェックしてみて下さい。Polyfill として [webcomponents.js](http://webcomponents.org/polyfills/) ([platform.js](https://github.com/Polymer/platform) から名称変更) も利用できます。

## まとめ
いかがでしたでしょうか？HTML Imports についてより詳しく知りたいという方は、下記のドキュメントも参考になります。

* [HTML Imports: ウェブのための #include - HTML5Rocks](http://goo.gl/EqeOBI)
* [HTML Imports 仕様](http://w3c.github.io/webcomponents/spec/imports/)
