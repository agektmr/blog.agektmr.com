---           
layout: post
lang: ja
title: 超カンタン！HTML5 で GIF アニメを作る方法
date: 2013-08-02
updated: 2013-08-02
tags:
  - GIF
  - HTML5
  - JavaScript
---

知っている人は知っている方法だと思いますが、実際にやってみたのでメモ。

※ デモの画像は[こちら](https://github.com/masakihirokawa/objc-frame-by-frame-animation)からお借りしました。特にライセンスが記述されていなかったのですが、問題があれば差し替えます。

[![](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)](https://1.bp.blogspot.com/-tVe6Xu1Yjyo/UftKax2zaWI/AAAAAAAAhi0/nwanIQS_vFw/s1600/ossan.gif)

ライブラリは [jsgif](https://github.com/antimatter15/jsgif) というのを使わせて頂きました。

手順はライブラリを読み込み、画像をひとコマ分ずつ canvas にロード、ライブラリに追加。終わったらバイナリから gif ファイルを生成、という感じ。

もう少し詳しい解説は以下。

1. `LZWEncoder.js` `NeuQuant.js` `GIFEncoder.js` を読み込む
2. 適切なサイズの canvas を用意
3. `GIFEncoder` からエンコーダを作る  
   ```js
   var encoder = new GIFEncoder();
   ```
4. アニメーションの時間間隔などを `encoder` に設定 
   ```js
   encoder.setRepeat(0);
   encoder.setDelay(100);
   encoder.setSize(120, 120);
   ```
5. 一コマずつ書き始める  
    ```js  
    encoder.start();
    ```  
    1. canvas に絵を書く  
        ```js
        canvas.drawImage(img);
        ```
    2. `encoder` に canvas のコンテキストを追加することで一コマを追加  
        ```js
        encoder.addFrame(ctx);
        ```
6. 書き込み終了
    ```js
    encoder.finish()
    ```
7. `encoder` からバイナリを吐き出して、`Blob`を作る  
    ```js
    var bin = new Uint8Array(encoder.stream().bin);
    var blob = new Blob([bin.buffer], {type: ‘image/gif’});
    ```
8. `Blob` から URL を作って表示 (revoke を忘れずに)
    ```js
    var url = URL.createObjectURL(blob);  
    var image = new Image();  
    image.src = url;  
    image.onload = function() {  
    URL.revokeObjectURL(url);  
    };
    ```

デモは[この辺](http://demo.agektmr.com/gif_anim/)に。

~~※ このデモは Firefox 推奨です。Chrome では [img.onload で実際に画像が読み込まれ
ない場合があるというバ
グ](https://code.google.com/p/chromium/issues/detail?id=267279)のせいで、アニ
メーションが一部抜けたりしてしまいます。画像を読み込むのに Ajax を使うなどの回避
方法はあるのですが、このデモでは可読性を優先して画像を src から読み込む方法を採
りました。ただ、僕のコードにバグがある可能性もあるので、その場合は[こっそり教え
て](http://google.com/+agektmr)下さい :)~~

[こっそりじゃないけど Google+ で教えてもらいまし
た](https://plus.google.com/u/0/+agektmr/posts/fsCH9oUCkPQ)。完全に僕の勘違いで
した。お恥ずかしい・・・。

[ソースコードはこちら](https://gist.github.com/agektmr/6131721)。

参考：

* [JavaScript](http://antimatter15.com/wp/2010/07/javascript-to-animated-gif/)
* [pure JavaScript でアニメーション GIF を作
  る](http://uiureo.hatenablog.com/entry/2012/12/22/000852)
