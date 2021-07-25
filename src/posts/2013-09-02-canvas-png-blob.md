---
layout: post
title: Canvas に描いた画像を png などの形式の Blob に変換する方法
date: 2013-09-02
updated: 2013-09-02
categories:
---
`canvas` の DOM エレメント (コンテキストではない) から [`toBlob()`](https://developer.mozilla.org/ja-JP/docs/Web/API/HTMLCanvasElement) を使う、というのが一番簡潔な回答です。が、これは Firefox には実装されているのですが、[残念ながら Chrome にはまだ実装されていません](https://code.google.com/p/chromium/issues/detail?id=83103)。そこで下記の方法を使って png や jpeg など、任意の画像形式で `Blob` を作ることができます。

<!-- excerpt -->

```javascript
/***
canvas に絵を書くコード
***/
var type = 'image/jpeg';
// canvas から DataURL で画像を出力
var dataurl = canvas.toDataURL(type);
// DataURL のデータ部分を抜き出し、Base64からバイナリに変換
var bin = atob(dataurl.split(',')[1]);
// 空の Uint8Array ビューを作る
var buffer = new Uint8Array(bin.length);
// Uint8Array ビューに 1 バイトずつ値を埋める
for (var i = 0; i < bin.length; i++) {
  buffer[i] = bin.charCodeAt(i);
}
// Uint8Array ビューのバッファーを抜き出し、それを元に Blob を作る
var blob = new Blob([buffer.buffer], {type: type});
```

これで jpeg 形式の `Blob` が完成です。`type` の部分を `'image/png'` などに変更することで、当然ながら別の形式の画像を得ることもできます。この `Blob` を使えば例えば

```javascript
var url = window.URL.createObjectURL(blob);
```

としてその画像を参照する URL を取得することができます。破棄する前に`window.URL.revokeObjectURL(url)` するのも忘れないで下さい。これをダウンロードするには、(破棄する前に) その URL を `a` タグに渡してあげます。

```html
<a href="[blob url]" download="image.png">Download</a>
```

`[blob url]` の部分が先程作った `Blob` の URL、`image.png` の部分がダウンロードしたもののファイル名になります。`Blob` が必要なければ `canvas.toDataURL('image/png')` を直接 `href` 属性に渡してしまうのもアリです。
