---
layout: post
lang: en
title: How to convert an image drawn on a canvas into a Blob in formats such as PNG
date: 2013-09-02
updated: 2013-09-02
tags:
  - HTML5
  - Canvas
translationOf: /2013/09/canvas-png-blob.html
translated: 2026-10-03
translatedManually: false
---
The simplest answer is to use [`toBlob()`](https://developer.mozilla.org/ja-JP/docs/Web/API/HTMLCanvasElement) from the `canvas` DOM element (not the context). However, while this is implemented in Firefox, [unfortunately it is not yet implemented in Chrome](https://code.google.com/p/chromium/issues/detail?id=83103). Therefore, you can use the method below to create a `Blob` in any image format, such as PNG or JPEG.

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

Now you have a `Blob` in JPEG format. By changing the `type` to something like `'image/png'`, you can of course get images in other formats as well. Using this `Blob`, for example:

```javascript
var url = window.URL.createObjectURL(blob);
```

allows you to obtain a URL referencing that image. Don't forget to call `window.URL.revokeObjectURL(url)` before discarding it. To download this, pass that URL to an `a` tag (before revoking it).

```html
<a href="[blob url]" download="image.png">Download</a>
```

The `[blob url]` part is the URL of the `Blob` you just created, and `image.png` will be the file name of the downloaded file. If you don't need a `Blob`, directly passing `canvas.toDataURL('image/png')` to the `href` attribute is also an option.
