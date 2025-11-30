---
layout: post
lang: ja
title: WebSocket のバイナリメッセージを試したら、ウェブの未来が垣間見えた
date: 2012-03-14
updated: 2012-03-14
image:
  feature: /websocket/AudioStreamer.png
tags:
  - ArrayBuffer
  - Blob
  - HTML5
  - Web Audio API
  - WebSocket
---

長い記事なので、先に結論だけ書いておきます。WebSocketのバイナリメッセージ機能は、これまでのインターネットのあり方をひっくり返します。「そんなの知ってるよ」という方もいるとは思います。僕も理屈では分かってたつもりだけど、実際にアプリを作ってみて、具体的にそれを感じることができたので、ちょっと長いですがどういうことなのか説明してみます。

<!-- excerpt -->

## WebSocketとは
WebSocketは、HTML5関連の中でも特に注目を集めている技術の一つです。通常のHTTP通信であればクライアントからのリクエストなしにサーバーは応答しませんが、WebSocketを使うことでクライアントとサーバーの間で双方向の通信が可能となります。これを利用することで、今後様々なリアルタイム性の高いサービスを構築することが可能になるでしょう。

そんなWebSocketですが、これまで波乱の道を歩んできました。数年前から様々なブラウザで利用可能な状態ではあったのですが、セキュリティ上の理由などで大幅な仕様の見直しが入り、昨年末ようやくひとつの完成形を見せ、複雑な仕様もひとまず落ち着いたところです。現在Google Chromeですべての仕様をサポートしていますが、まもなくFirefox11、Internet Explorer10でもそれらが利用できるようになると言われています。

WebSocketが持つ機能の中で僕が最も注目しているのが、バイナリ送信機能です。これまではテキストしかやりとりできなかったのですが、最新の仕様ではバイナリのメッセージも送れるようになりました。従来からBase64などのエンコーディングを使うことで、テキストとして送ることはできましたが、バイナリをそのまま送れば、約30%のオーバーヘッドを節約できます。もちろんバイナリ送信機能の価値はそれだけではないのですが、それはこの記事を最後まで読めばもう少し分かると思います。

## Audio Stream Experiment
ここで最近僕が作った、[WebSocketのバイナリメッセージング機能を使ったデモ](http://agektmr.node-ninja.com:3000/)をご紹介しましょう。このデモでは、ユーザーが手元に持っているオーディオファイルをリアルタイムにストリーミング配信することができます。ここからはアプリの作りの話をしますので、WebSocketでウェブがどう変わっていくのかだけに興味のある方は、「WebSocketのバイナリメッセージが意味するもの」まで読み飛ばしてしまっても構いません。

[![](https://1.bp.blogspot.com/-YvvFxUQbyaA/T1XMwMfG_XI/AAAAAAAAEkQ/7sGuHBvw8ME/s960/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2012-03-05+16.56.01.png)](https://1.bp.blogspot.com/-YvvFxUQbyaA/T1XMwMfG_XI/AAAAAAAAEkQ/7sGuHBvw8ME/s960/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2012-03-05+16.56.01.png)

このアプリで使われている技術に興味のある方は、何はともあれ、試してみて下さい(要Chrome)。ソースコードも[githubで公開](https://github.com/agektmr/AudioStreamer)しています。

適当な名前を入れてconnect後、mp3, wav, m4aなどのオーディオファイルをデスクトップからドラッグドロップしたら、playボタンを押すことで、オーディオのストリーミング再生を開始できます。もしAttendeeリストに他に人がいなければ、自分で2つのウィンドウを開いて同じサイトにアクセスすることで、どのようにオーディオがストリーミングで配信されているか、試すことができます。

## アーキテクチャ
ここで使っているオーディオ再生の仕組みは、[Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)と呼ばれるものです。Googleのエンジニアが中心になって作っている仕様で、現在Chromeのみで利用できますが、いずれはSafariなど他のWebkit系ブラウザでも利用できるようになるでしょう。今も標準化の議論が進んでいますが、2012年3月現在、Webkit系以外で実装するという話は聞いていません。Firefoxにも同種のAudio Data APIと呼ばれるものがありますが、こちらは標準化の予定はないようです。Web Audio APIについて詳しい説明はここでは割愛しますが、以前[HTML5とか勉強会で使った資料](http://slides.agektmr.com/webaudio_basic/)がありますので、よければそちらを参照して下さい。

サーバーは[node.js](http://nodejs.org/)を使っています。ノンブロッキング・非同期入出力が特徴のnode.jsは、現在最も注目を集めているサーバー技術で、JavaScriptで記述することができます。2012年3月現在、どの言語の実装でもバイナリを扱えるWebSocketライブラリは数多くありませんが、node.js向けの中から[ws](https://github.com/einaros/ws)というライブラリを選びました。

node.jsのサーバーは、ファーストサーバー社の提供している[node-ninja](http://node-ninja.com/)(node.jsの総本山とも言える[Joyent](http://no.de/)の開発した[SmartMachines](http://www.joyent.com/products/smartmachines/)という仮想サーバー使用)を使わせてもらいました。

今回のデモでは、このnode.jsで構築されたサーバーから受け取ったオーディオデータをブロードキャストすることで、すべての接続しているユーザーに同じオーディオストリーミング環境を提供しています。

[![](https://3.bp.blogspot.com/-fgG-s5KuFng/T1XEL98ut8I/AAAAAAAAEkA/1QHKqQnYnvE/s960/AudioStreamer.png)](https://3.bp.blogspot.com/-fgG-s5KuFng/T1XEL98ut8I/AAAAAAAAEkA/1QHKqQnYnvE/s960/AudioStreamer.png)

各クライアントはPlayerとListenerと呼ばれる、合計2つのオーディオ再生機構を持ちます。デスクトップからドラッグドロップされたオーディオファイルは、Playerを使って再生されると同時に、node.jsのサーバーにWebSocketを使って転送されます。サーバーは受け取ったオーディオデータをすべてのクライアントに即時にブロードキャストします。各クライアントは、サーバーから受け取ったオーディオデータをListenerに流しこみ、音声を再生します。

ちなみにデモには、オーディオストリーミングだけでなく、簡単なチャット機能も実装してあります。

## WebSocketの基本
まずはWebSocketの基本的な使い方から。

### テキストメッセージのやりとり
ブラウザで使えるWebSocketのAPIは非常にシンプルです。

まずはソケットを開きます。

```javascript
var ws = new WebSocket('ws://localhost:3000');
```

サーバーでコネクションを受け付けると、openというイベントが返ってきます。

```javascript
ws.onopen = function() {
  ...
}
```

メッセージを送信する際は

```javascript
ws.send(message);
```

とします。
メッセージを受信する場合は、messageというイベントで受け取ります。

```javascript
ws.onmessage = function(msg) {
  ...
}
```

コネクションが閉じられた場合も同様にcloseというイベントが発生します。

```javascript
ws.onclose = function(event) {
  ...
}
```

WebSocketのAPI自体は非常にシンプルだということがことが分かりましたでしょうか？

問題は、このシンプルさゆえの、その上に乗るプロトコルの重要性です。
WebSocket APIにはSub Protocolという仕様が含まれていますが、これは標準化とサーバーへの実装が必要であるにも関わらず、実のところ2012年3月現在[IANAにはSOAPしか登録されていません](http://www.iana.org/assignments/websocket/websocket.xml)し、実装しているサーバーもありませんので、実質的に使えるものではありません。つまり、WebSocketを使って複数種類の命令を送信したい場合は、何かしらの決まりを自分で作ってあげなければならないのです。

例えばこのデモでは

* セッションを開始するconnectメッセージ
* 他のユーザーの参加状態を知らせるconnectionメッセージ
* テキストメッセージを送受信するmessageメッセージ
* コネクションを切らせないためのheartbeatメッセージ
* 誰が音楽を再生し始めたのか知らせるためのstart_musicメッセージ

これだけの種類のメッセージを扱っています。ここに、「誰が送信したのか」「どんなメッセージを送信したのか」「誰が今コネクションを張っているのか」などの付随情報を追加する必要がありますので、JSONなどの構造化されたメッセージを送ることが必須であることは言うまでもありません。

### バイナリメッセージのやりとり
オーディオデータを送信する際はバイナリメッセージを使います。最初甘く見ていたのですが、バイナリメッセージの送受信は、テキスト以上に一筋縄では行きません。WebSocketでメッセージの構造化が必要なのはテキストだけでなく、バイナリの場合でも同様なのです。実はWebSocketは、テキストメッセージとバイナリメッセージを混ぜて送信することができません。バイナリはバイナリ、テキストはテキストとして、別々に送信する必要があるのです。つまり、バイナリメッセージに何か付随情報を追加したい場合は、何かしらの工夫をする必要があります。

このデモを作る際、実際にバイナリメッセージに付随させたかったのは

* オーディオを再生したユーザーのID
* オーディオのチャンネル数
* オーディオのバッファ長
* 実際のオーディオバッファ×チャンネル数分

これだけの情報を他のクライアントに送り届けなければならないのです。
WebSocketの持つシンプルなAPIの制約から、これを実現するための方法としてパッと思いつくのは3つしかありません。

* テキストメッセージとバイナリメッセージを一組にして送る
* クライアントごとに別々のWebSocketコネクションを張り、テキスト+バイナリを送る
* 付随情報をバイナリに埋め込んで送る

まずは一つ目。これはクライアントからサーバーに送るだけなら、アリな方法です。サーバーは仕様上、誰が繋いでいるのか把握できていますので、1つ目のテキストメッセージを受け取ってから次に届くべきバイナリメッセージを待ち受けることができます。しかし、サーバーがこれを受け取った順にそのままブロードキャストする場合、このままでうまくいくでしょうか？クライアントに他に誰が繋いでいるかを把握させることは可能ですが、ランダムに届く2つ一組の情報を、順番を入れ替えずにクライアント側でマッチングさせるのは、簡単ではありません。うまく工夫すれば不可能ではないですが、それではnode.jsのノンブロッキングという最大の特徴を犠牲にせざるを得なくなってしまいます。

２つ目のクライアントごとに別々のWebSocketコネクションを張り、テキストとバイナリを送る、という方法は、上記の問題を解決します。コネクション自体がユーザーを表す付随情報として扱える上、メッセージの組み合わせを保証できます。ただ、繋いでいるユーザーが増えれば増えるほど、消費されるリソースは指数的に増えていきます。[Multiplexing Extension](http://tools.ietf.org/html/draft-tamplin-hybi-google-mux-01)が使えるようになればこれも解決できるかもしれませんが、使えない現時点では、あまり良い選択肢とは言えません。

そして３つ目が、バイナリ自体を操作して付随情報を埋め込むという方法です。このやり方であれば、ひとつのメッセージに実際のデータと必要な情報を組み合わせて送信できるため、バイナリ操作の実装は面倒ですが、その他の部分がだいぶ楽になります。今回のデモではこの方法を採りました。

## JavaScriptで扱えるバイナリ
JavaScriptにおけるバイナリの操作は従来から不可能ではありませんでした。しかしそのために必要なテクニックは複雑で、実行速度も犠牲にしてしまいます。しかし最近登場したバイナリを扱ういくつかの仕様によって、それは格段に楽になりました。新しくJavaScriptで利用できるようになったバイナリには大きく2種類あります。それが[Blob](https://developer.mozilla.org/en/DOM/Blob)と[ArrayBuffer](https://developer.mozilla.org/en/JavaScript_typed_arrays)です。

### Blob
Blobはバイナリの塊ですが、中身はいわゆるファイルと思って差し支えありません。FileオブジェクトはBlobから継承されたものですので、input[type=”file”]で入力されたファイルや、ドラッグドロップされたファイルなどはこれと同様に扱うことができます。FileReader APIを使うことで、ArrayBufferやData URLに変換することもできます。

今回のデモではドラッグドロップした時点でBlobのファイルを、FileReaderのreadAsArrayBuffer関数を使ってArrayBuffer化するのに使っています。

```javascript
    updatePlayer: function(file, callback, playEndCallback) {
      var that = this;
      var reader = new FileReader();
      reader.onload = function(e) {
        ac.decodeAudioData(e.target.result, function(buffer) {
          that.audioReady = true;
          if (that.audioPlayer) that.audioPlayer.stop();
          that.visualizer.disconnect();
          that.audioPlayer = new AudioPlayer(that.audioMerger);
          if (playEndCallback) that.audioPlayer.onPlayEnd = playEndCallback;
          that.audioPlayer.load(buffer, that.websocket);
          that.visualizer.connect(that.audioMerger, ac.destination);
          callback();
        }, function() {
          throw 'failed to load audio.';
        });
      };
      reader.readAsArrayBuffer(file);
    },
```

### ArrayBuffer
ArrayBufferもバイナリの塊ですが、こちらは型付き配列(TypedArray)を使って、配列として扱うことができるのが特徴です。型付き配列はArrayBufferから符号なし整数(Uint8Array)や浮動小数点数(Float32Array)などいくつかの「ビュー」を使って切り出すことができます。Web Audio APIではオーディオデータがFloat32Arrayをバッファ長分、チャンネルごとに格納されるので、これを扱うことになります。

JavaScriptのいわゆる配列(array)とは違い、ArrayBufferには任意のバイトを必要に応じて追加・削除する機能がありません。つまり最初に必要なメモリ領域を確保して、任意の値を埋めていくというアプローチを取らなければなりません。また、異なる型のTypedArrayをArrayBufferに当てはめていくのは、ちょっとコツが必要です。

## Web Audio APIからオーディオデータを引っこ抜く
先ほどのBlobのサンプルコードではdecodeAudioData関数を使ってWeb Audio APIのAudioBufferオブジェクトに変換しました。AudioBufferオブジェクトは、Float32Arrayのバイナリとしてオーディオデータを扱います。しかしこのFloat32Arrayをそのまま送ったのでは、ストリーミングではなくただのアップロードとダウンロードと変わりありません。このデータを細切れに送信するにはどうすればいいのでしょう？

幸いWeb Audio APIには、[JavaScriptAudioNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#JavaScriptAudioNode-section)という便利なものがあります。これをルーティングの途中に挿入することで、任意のバッファ長ごとにonaudioprocessイベントを発生させ、通り過ぎようとしているデータを切り出すことができます。ここではこれを使いましょう(ちなみにWeb Audio APIを作っているChris Rogersによると、JavaScriptAudioNodeは非推奨で廃止したいとのこと。同様のニーズを満たす方法は未確認です)(2012/3/14追記：Chris Rogersに再度確認したところ、JavaScriptAudioNodeを廃止する予定はないとのことでした)。

```javascript
    this.js.onaudioprocess = function(event) {
      var buffers = [];
      for (var i = 0; i &lt; that.audioBuffer.length; i++) {
        buffers.push(that.audioBuffer[i].shift() || new Float32Array(BUFFER_LENGTH));
      }
      if (that.type == 'Player') {
        if (that.audioBuffer[0].length == 0) {
          that.stop();
        } else {
          var msg = AudioMessage.createMessage({
            user_id:UserManager.getUserId(),
            buffer_length:BUFFER_LENGTH,
            buffer_array:buffers
          });
          that.socket.send(msg.buffer);
        }
      }
      for (var i = 0; i &lt; buffers.length; i++) {
        event.outputBuffer.getChannelData(i).set(buffers[i]);
      }
    };
```

バッファ長(BUFFER_LENGTH)は2048を指定しています。既存のオーディオファイルを再生したいだけの場合、[AudioBufferSourceNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioBufferSourceNode-section)を使うのが通例ですが、ここではJavaScriptAudioNodeにバッファを直接挿し込むアプローチを採っています。その際、ついでにWebSocketに送信する準備をしています。

## バイナリを操作する
取り出した2048のFloat32Arrayは2チャンネル分ですので、これを他の情報と組み合わせてバイナリに固めます。

```javascript
      createMessage: function(msg_obj) {
        var bl = msg_obj.buffer_length;
        var ch_num = msg_obj.buffer_array.length;
        var ab = new ArrayBuffer(4 + 1 + 4 + (bl * ch_num * 4));
        var view = new DataView(ab);
        var offset = 0;
        view.setUint32(offset, msg_obj.user_id);
        offset += 4;
        view.setUint8(offset, ch_num);
        offset += 1;
        view.setUint32(offset, bl);
        offset += 4;
        for (var i = 0; i &lt; ch_num; i++) {
          for (var j = 0; j &lt; bl; j++) {
            view.setFloat32(offset, msg_obj.buffer_array[i][j]);
            offset += 4;
          }
        }
        return new Uint8Array(view.buffer);
      },
```

バイナリに複数の型を含めたい場合、[DataView](https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView)を使います。これにより、JSONオブジェクトを元にして、何バイト目からこの型でこの値を埋める、といった指定が可能になります。これで複数のデータを埋め込んだバイナリができあがりましたので、そのままWebSocketに乗せて送ります。node.jsは単純に受け取ったものをブロードキャストするだけですので、受け取ったクライアントはこれをパースして音を鳴らすだけ、ということになります。詳細はソースコードを読んで下さい。

## WebSocketのバイナリメッセージが意味するもの
ここまで読んできて、「うぉーめんどい！」と思った方、その通りだと思います。でもこういうものは、きっと近いうちにライブラリが解決してくれるでしょうし、プロトコルも整備されれば、使う側は何も考えなくても良くなるはずです。それこそ(まだTypedArrayに対応してませんが)[JSON Schema](http://json-schema.org/)とか、[Protocol Buffer](http://code.google.com/apis/protocolbuffers/)なんかは、僕がまっさきに思いついた、これらの諸問題を解決してくれるものです。

例えばnode.jsでは、[Socket.IO](http://socket.io/)というライブラリが既に存在しています。まだバイナリメッセージに対応していませんが、v1.0では対応すると表明していますし、時間の問題でしょう。そういったライブラリを使えば、ディベロッパーはどんなプロトコルで通信しているのかすら意識することなく、データのやり取りが可能になります。そして、今回僕が垣間見た未来はここに存在しています。

今後インターネットでスピードを追求していく上で、WebSocketはなくてはならない存在になるでしょう。リアルタイムなサービスを作る必要がなくても使われるテクノロジーになります。理由は大きく2つ。WebSocketの持つオーバーヘッドの削減と、データの圧縮という特徴です。

例えば頻繁に通信を要するサービスでWebSocketを使ってるとしたら、別途Ajaxを利用する意義は存在するでしょうか？以前[Google API Expert](https://sites.google.com/site/devreljp/Home/api-expert)の小松さんがWebSocketとAjaxの通信速度を比較する[興味深い記事](http://blog.livedoor.jp/kotesaki/archives/1373945.html)を公開されています。これを見るだけでも、WebSocketのコネクションがもうあるなら、わざわざAjaxを別途やるメリットないよね、と思うはずです。突き詰めていけば、サーバーが一度ウェブページをレンダリングしたら、あとはWebSocketでコネクションを張ってすべての通信を制御し、Ajaxは全く行わない、というアーキテクチャは割と早い段階で登場してくると思います。

それからデータの圧縮。バイナリ化することで、テキストを送る場合と比べて送るデータ量を小さくできることは、疑う余地もありません。それに加えてこれから登場する[WebSocket Deflate Extension](http://tools.ietf.org/html/draft-tyoshino-hybi-websocket-perframe-deflate-05)が加われば、さらに圧縮され、データは小さくなるでしょう。

加えてこの記事でも検証した通り、バイナリーを送るためにはバイナリーに付随情報を追加する必要があります。だったら、別途テキストデータを送る意義ってなんでしょう？最初から全部バイナリーで送ることでスピードをアピールするライブラリが登場するのは時間の問題です。僕はインターネット上でWebSocketを使って流れるデータが、将来的に全部バイナリーになる可能性すらあるのではないかと思っています。

## まとめ
少し大げさに言うと、これはウェブにおけるパラダイムシフトになり得ます。ウェブで使われるプロトコルがHTTPからWebSocketに乗る何かしらのプロトコルに置き換わる可能性は、全くないとは言い切れないのではないでしょうか。
