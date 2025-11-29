---
layout: post
lang: en
title: 'How to convert an image drawn on a canvas to a Blob in a format such as png'
description: ''
date: 2013-09-02
updated: 2013-09-02
tags:
- HTML5
  - Canvas
translationOf: /2013/09/canvas-png-blob.html
translated: 2025-11-29
translatedManually: false
---
The simplest answer is to use [`toBlob()`](https://developer.mozilla.org/ja-JP/docs/Web/API/HTMLCanvasElement)
from the DOM element (not the context) in `canvas`. However, while this is implemented in Firefox, unfortunately it's not yet implemented in Chrome. So, you can use the following method to create `Blob` in any image format, such as png or jpeg.

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

This completes the jpeg format `Blob`. Of course, you can also get an image in a different format by changing `type` to `'image/png'`, etc. Using this `Blob`, for example,

```javascript
var url = window.URL.createObjectURL(blob);
```

You can get a URL that references the image by using the `window.URL.revokeObjectURL(url)` tag. Don't forget to `a` before discarding it. To download it, pass the URL to the `[blob url]` tag (before discarding it).

```html
<a href="[blob url]" download="image.png">Download</a>
```

The __INLINE_CODE_12__ part is the URL of the `Blob` you just created, and the `image.png` part is the file name of the downloaded file. If you don't need `Blob`, you can also pass `canvas.toDataURL('image/png')` directly to the `href` attribute.
