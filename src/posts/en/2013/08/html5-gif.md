---
layout: post
lang: en
title: "Super Easy! How to Make Animated GIFs with HTML5"
date: 2013-08-02
updated: 2013-08-02
tags:
  - GIF
  - HTML5
  - JavaScript
translationOf: /2013/08/html5-gif.html
translated: 2026-10-03
translatedManually: false
---
This might be familiar to those who know, but I tried it out myself, so here is a quick note.

* The demo image is borrowed from [here](https://github.com/masakihirokawa/objc-frame-by-frame-animation). No specific license was mentioned, but I will replace it if there are any issues.

[![](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)

For the library, I used [jsgif](https://github.com/antimatter15/jsgif).

The basic flow is to load the library, draw each frame onto a canvas, add it to the library, and once finished, generate a GIF file from the binary data.

Here is a slightly more detailed walkthrough:

1. Load `LZWEncoder.js`, `NeuQuant.js`, and `GIFEncoder.js`
2. Prepare a canvas of the appropriate size
3. Create an encoder instance from `GIFEncoder`  
   ```js
   var encoder = new GIFEncoder();
   ```
4. Configure animation settings such as frame delays on the `encoder` 
   ```js
   encoder.setRepeat(0);
   encoder.setDelay(100);
   encoder.setSize(120, 120);
   ```
5. Start writing frames  
    ```js  
    encoder.start();
    ```  
    1. Draw the image onto the canvas  
        ```js
        canvas.drawImage(img);
        ```
    2. Add the frame to the `encoder` by passing the canvas context  
        ```js
        encoder.addFrame(ctx);
        ```
6. Finish writing
    ```js
    encoder.finish()
    ```
7. Output the binary data from the `encoder` and create a `Blob`  
    ```js
    var bin = new Uint8Array(encoder.stream().bin);
    var blob = new Blob([bin.buffer], {type: ‘image/gif’});
    ```
8. Create an Object URL from the `Blob` and display it (don't forget to revoke it)
    ```js
    var url = URL.createObjectURL(blob);  
    var image = new Image();  
    image.src = url;  
    image.onload = function() {  
    URL.revokeObjectURL(url);  
    };
    ```

You can find the demo [around here](http://demo.agektmr.com/gif_anim/).

~~* Firefox is recommended for this demo. In Chrome, due to [a bug where images may not actually be loaded upon img.onload](https://code.google.com/p/chromium/issues/detail?id=267279), some frames in the animation may be skipped. While there are workarounds like using Ajax to fetch images, I opted for loading them via `src` for readability in this demo. That said, it could just be a bug in my own code, so if that's the case, please [let me know quietly](http://google.com/+agektmr) :)~~

[Someone pointed it out on Google+ (not so quietly, though!)](https://plus.google.com/u/0/+agektmr/posts/fsCH9oUCkPQ). It turned out to be completely my misunderstanding. How embarrassing...

[Source code is here](https://gist.github.com/agektmr/6131721).

References:

* [JavaScript](http://antimatter15.com/wp/2010/07/javascript-to-animated-gif/)
* [pure JavaScript でアニメーション GIF を作る](http://uiureo.hatenablog.com/entry/2012/12/22/000852)
