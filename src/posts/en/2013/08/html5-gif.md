---
layout: post
lang: en
title: "Super easy! How to create GIF animations with HTML5"
description:
date: 2013-08-02
updated: 2013-08-02
tags:
  - GIF
  - HTML5
  - JavaScript
translationOf: /2013/08/html5-gif.html
translated: 2025-11-30
translatedManually: false
---
Those who know it will probably already know this method, but I actually tried it, so I'll make a note of it.

*The demo image was borrowed from [here](https://github.com/masakihirokawa/objc-frame-by-frame-animation). There is no license information written in it, but I will replace it if there is any problem.

[![](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)

The library used is [jsgif](https://github.com/antimatter15/jsgif).

The procedure is to load the library, load the images one frame at a time into the canvas, add them to the library, and then generate a gif file from the binary.

A more detailed explanation is below.

1. Load `LZWEncoder.js` `NeuQuant.js` `GIFEncoder.js`
2. Prepare a canvas of the appropriate size
3. Create an encoder from `GIFEncoder`
```js
   var encoder = new GIFEncoder();
   ```
4. Set the animation interval, etc. in `encoder`
```js
   encoder.setRepeat(0);
   encoder.setDelay(100);
   encoder.setSize(120, 120);
   ```
5. Start drawing one frame at a time
```js
    encoder.start();
    ```
1. Draw an image on the canvas
```js
        canvas.drawImage(img);
        ```
2. Add a frame by adding a canvas context to `encoder`
```js
        encoder.addFrame(ctx);
        ```
6. Finish writing
```js
    encoder.finish()
    ```
7. Export the binary from `encoder` and create `Blob`
```js
    var bin = new Uint8Array(encoder.stream().bin);
    var blob = new Blob([bin.buffer], {type: ‘image/gif’});
    ```
8. Create a URL from `Blob` and display it (don't forget to revoke it).
```js
    var url = URL.createObjectURL(blob);
    var image = new Image();
    image.src = url;
    image.onload = function() {
    URL.revokeObjectURL(url);
    };
    ```

The demo is [around here](http://demo.agektmr.com/gif_anim/).

~~※ Firefox is recommended for this demo. In Chrome, there's a bug where img.onload doesn't actually load the image, causing some animations to be missing. While there are workarounds, such as using Ajax to load the image, this demo prioritizes readability by loading the image from src. However, there's a chance my code might contain a bug, so if that's the case, please let me know. :)~~

[Not secretly, I learned about it on Google+](https://plus.google.com/u/0/+agektmr/posts/fsCH9oUCkPQ). It was a complete misunderstanding on my part. How embarrassing...

[Source code here](https://gist.github.com/agektmr/6131721).

reference:

* [JavaScript](http://antimatter15.com/wp/2010/07/javascript-to-animated-gif/)
* [Create animated GIFs with pure JavaScript](http://uiureo.hatenablog.com/entry/2012/12/22/000852)
