---
layout: post
lang: en
title: 'Experimenting with WebSocket binary messages offers a glimpse into the future of the web'
description: ''
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
translationOf: /2012/03/websocket.html
translated: 2025-11-29
translatedManually: false
---

This is a long article, so I'll just give you the conclusion first. WebSocket's binary messaging feature will overturn the way the Internet has always been. Some of you may be thinking, "I already knew that." I thought I understood it in theory, but after actually creating an app, I was able to experience it in concrete terms, so I'll try to explain what it means, even though it's a bit long.

<!-- excerpt -->

## What is WebSocket?
WebSocket is one of the most popular HTML5-related technologies. While standard HTTP communication requires a server to respond without a client request, WebSocket enables two-way communication between the client and server. This will likely enable the creation of a variety of highly real-time services in the future.

WebSocket has had a tumultuous journey so far. It has been available in various browsers for several years, but the specifications underwent a major revision due to security reasons and other reasons. At the end of last year, a finalized version was finally released, and the complex specifications have now been settled for the time being. Currently, all specifications are supported by Google Chrome, but it is said that they will soon be available in Firefox 11 and Internet Explorer 10 as well.

Of all the features of WebSocket, the one that has caught my eye the most is the binary transmission function. Until now, only text could be exchanged, but the latest specifications now allow binary messages to be sent as well. Previously, it was possible to send data as text by using encoding such as Base64, but sending binary data as is can save about 30% of overhead. Of course, the value of the binary transmission function goes beyond that, but you'll understand that a little more by reading this article to the end.

## Audio Stream Experiment
Here, I'd like to introduce a demo I recently created that uses WebSocket's binary messaging capabilities. This demo allows users to stream audio files in real time. From here on, I'll be talking about building the app. If you're only interested in how WebSocket will change the web, you can skip ahead to "What WebSocket Binary Messaging Means."

[![](https://1.bp.blogspot.com/-YvvFxUQbyaA/T1XMwMfG_XI/AAAAAAAAEkQ/7sGuHBvw8ME/s960/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2012-03-05+16.56.01.png)](https://1.bp.blogspot.com/-YvvFxUQbyaA/T1XMwMfG_XI/AAAAAAAAEkQ/7sGuHBvw8ME/s960/%25E3%2582%25B9%25E3%2582%25AF%25E3%2583%25AA%25E3%2583%25BC%25E3%2583%25B3%25E3%2582%25B7%25E3%2583%25A7%25E3%2583%2583%25E3%2583%2588+2012-03-05+16.56.01.png)

If you're interested in the technology used in this app, please give it a try (Chrome required). The source code is also available on github.

After entering an appropriate name and connecting, drag and drop an audio file (mp3, wav, m4a, etc.) from your desktop and press the play button to start streaming audio. If there are no other people in the Attendee list, you can open two windows and access the same site yourself to see how the audio is being streamed.

## Architecture
The audio playback mechanism used here is called the [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html). This specification, primarily developed by Google engineers, is currently only available in Chrome, but will eventually be available in other WebKit-based browsers such as Safari. Standardization discussions are ongoing, but as of March 2012, no plans have been heard for it to be implemented in browsers other than WebKit. Firefox also has a similar implementation called the Audio Data API, but there are no plans for standardization. A detailed explanation of the Web Audio API will not be provided here, but please refer to the materials previously used in [HTML5 study sessions](http://slides.agektmr.com/webaudio_basic/) if you are interested.

The server uses [node.js](http://nodejs.org/). Node.js, characterized by its non-blocking, asynchronous I/O, is currently the most popular server technology and can be written in JavaScript. As of March 2012, there are not many WebSocket libraries that can handle binary data in any language, but we chose a library for node.js called [ws](https://github.com/einaros/ws).

For the node.js server, we used [node-ninja](http://node-ninja.com/) provided by First Server (using a virtual server called [SmartMachines](http://www.joyent.com/products/smartmachines/) developed by [Joyent](http://no.de/), which can be said to be the headquarters of node.js).

In this demo, the audio data received from this Node.js server is broadcasted to provide the same audio streaming environment to all connected users.

[![](https://3.bp.blogspot.com/-fgG-s5KuFng/T1XEL98ut8I/AAAAAAAAEkA/1QHKqQnYnvE/s960/AudioStreamer.png)](https://3.bp.blogspot.com/-fgG-s5KuFng/T1XEL98ut8I/AAAAAAAAEkA/1QHKqQnYnvE/s960/AudioStreamer.png)

Each client has two audio playback mechanisms, called Player and Listener. Audio files dragged and dropped from the desktop are played using Player and simultaneously transferred to the Node.js server using WebSocket. The server immediately broadcasts the received audio data to all clients. Each client streams the audio data received from the server to Listener and plays the audio.

By the way, the demo not only supports audio streaming but also a simple chat function.

## WebSocket Basics
Let's start with the basics of using WebSocket.

### Exchanging Text Messages
The WebSocket API available in the browser is very simple.

First, open the socket.

```javascript
var ws = new WebSocket('ws://localhost:3000');
```

When the server accepts a connection, it returns an open event.

```javascript
ws.onopen = function() {
  ...
}
```

When sending a message

```javascript
ws.send(message);
```


To receive a message, you will receive it through an event called message.

```javascript
ws.onmessage = function(msg) {
  ...
}
```

When a connection is closed, a close event is also generated.

```javascript
ws.onclose = function(event) {
  ...
}
```

Did you know that the WebSocket API itself is very simple?

The problem is that this simplicity makes the protocol on top of it important.
The WebSocket API includes a specification called a Sub Protocol, but although this needs to be standardized and implemented on servers, as of March 2012, only SOAP has been registered with IANA, and no servers have implemented it, so it is not practically usable. In other words, if you want to send multiple types of commands using WebSocket, you will have to create some kind of rule yourself.

For example, in this demo

* A connect message to start a session
* A connection message to notify other users of their participation status
* A message message to send and receive text messages
* A heartbeat message to maintain the connection
* A start_music message to notify who has started playing music

We handle all these different types of messages, and we need to add additional information such as "who sent it," "what kind of message it was," and "who is currently connected," so it goes without saying that it is essential to send structured messages such as JSON.

### Exchanging Binary Messages
Binary messages are used to send audio data. At first, I underestimated it, but sending and receiving binary messages is even more complicated than text. WebSocket requires message structuring not only for text but also for binary. In fact, WebSocket cannot send a mixture of text and binary messages. Binary messages must be sent separately, as binary and text, respectively. In other words, if you want to add additional information to a binary message, you'll need to use some kind of ingenuity.

When creating this demo, what I actually wanted to include in the binary message was

* ID of the user playing the audio
* Number of audio channels
* Audio buffer length
* Actual audio buffer x number of channels

This much information needs to be sent to the other client. 
Due to the constraints of WebSocket's simple API, there are only three ways I can think of to achieve this:

* Send a text message and a binary message as a pair
* Establish a separate WebSocket connection for each client and send the text and binary data
* Embed additional information in the binary data and send it

Let's start with the first point. This is a valid method if you're just sending messages from the client to the server. By design, the server knows who's connected, so after receiving the first text message, it can wait for the next binary message to arrive. However, if the server simply broadcasts these messages in the order they're received, will this work? While it's possible to have the client know who else is connected, it's not easy to match pairs of randomly arriving information on the client side without shuffling them. With some clever ingenuity, it's not impossible, but it would mean sacrificing Node.js's greatest feature: non-blocking.

Opening a separate WebSocket connection for each secondary client and sending text and binary data solves the above problem. The connection itself can be treated as ancillary information representing the user, and message combination is guaranteed. However, the more users connected, the more resources consumed. This may be solved if the [Multiplexing Extension](http://tools.ietf.org/html/draft-tamplin-hybi-google-mux-01) becomes available, but for now, it's not a very good option.

The third method is to embed additional information by manipulating the binary itself. With this method, you can send a single message that combines the actual data and the necessary information, so although the binary manipulation is more tedious to implement, it makes the other parts much easier. This is the method we used in this demo.

## Binary Handling in JavaScript
Manipulating binary data in JavaScript has always been possible. However, the techniques required are complex and often sacrifice execution speed. However, several recent specifications for handling binary data have made it much easier. There are two main types of binary data that can now be used in JavaScript: [Blob](https://developer.mozilla.org/en/DOM/Blob) and [ArrayBuffer](https://developer.mozilla.org/en/JavaScript_typed_arrays).

### Blob
A Blob is a binary block, but its contents can be thought of as a file. The File object inherits from Blob, so files entered via input[type="file"] or dragged and dropped can be treated in the same way. You can also convert a Blob to an ArrayBuffer or Data URL using the FileReader API.

In this demo, the Blob file is converted into an ArrayBuffer using the FileReader's readAsArrayBuffer function at the time of dragging and dropping.

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
An ArrayBuffer is also a binary block, but its unique feature is that it can be treated as an array using a typed array (TypedArray). Typed arrays can be extracted from an ArrayBuffer using several "views," such as unsigned integers (Uint8Array) and floating-point numbers (Float32Array). In the Web Audio API, audio data is stored in a Float32Array for each channel, up to the buffer length, and this is what you'll be working with.

Unlike JavaScript's arrays, ArrayBuffers don't have the ability to add or remove arbitrary bytes as needed. This means you have to first allocate the memory you need and then fill it with the values you want. Also, applying different types of TypedArrays to ArrayBuffers can be a bit tricky.

## Extracting Audio Data from the Web Audio API
In the previous Blob sample code, we used the decodeAudioData function to convert the data into a Web Audio API AudioBuffer object. AudioBuffer objects handle audio data as a binary Float32Array. However, sending this Float32Array as is is no different from simple uploading and downloading, not streaming. How can we send this data in chunks?

Fortunately, the Web Audio API has a handy feature called [JavaScriptAudioNode](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#JavaScriptAudioNode-section). By inserting this in the middle of the routing, you can trigger an onaudioprocess event for each buffer length you specify, and extract the data as it passes through. We'll use this here. (By the way, according to Chris Rogers, who created the Web Audio API, JavaScriptAudioNode is deprecated and he wants to discontinue it. I haven't confirmed how to meet similar needs yet.) (Update: 2012/3/14: I checked with Chris Rogers again, and he said there are no plans to discontinue JavaScriptAudioNode.)

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

The buffer length (BUFFER_LENGTH) is set to 2048. If you just want to play an existing audio file, it's common to use an AudioBufferSourceNode, but here we take the approach of inserting the buffer directly into a JavaScriptAudioNode, while also preparing to send it to the WebSocket.

## Manipulating binary
The extracted 2048 Float32Array contains two channels, so we combine it with other information to solidify it into binary.

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

If you want to include multiple types in a binary, use [DataView](https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView). This allows you to specify, based on a JSON object, the starting byte to fill with a certain value and type. Now that you have a binary with multiple data embedded, you can send it directly over WebSocket. Node.js simply broadcasts what it receives, so the receiving client simply parses it and plays a sound. Please read the source code for details.

## What WebSocket Binary Messages Mean
If you've read this far and thought, "Wow, this is a pain!", you're probably right. But I'm sure libraries will solve these issues soon, and once protocols are established, users won't have to think about them at all. [JSON Schema](http://json-schema.org/) and [Protocol Buffer](http://code.google.com/apis/protocolbuffers/) (although they don't yet support TypedArrays) are the first things I thought of that would solve these problems.

For example, in Node.js, there is already a library called [Socket.IO](http://socket.io/). It does not yet support binary messages, but they have announced that it will be supported in v1.0, so it's only a matter of time. Using such a library, developers can exchange data without even being aware of the protocol they are using. And this is the future I glimpsed today.

WebSocket will likely become indispensable in the pursuit of speed on the Internet in the future. It will become a technology that will be used even if there is no need to create real-time services. There are two main reasons for this: WebSocket's reduced overhead and its ability to compress data.

For example, if you're using WebSocket for a service that requires frequent communication, is there any point in using Ajax separately? Previously, [Google API Expert](https://sites.google.com/site/devreljp/Home/api-expert) Komatsu published an interesting article comparing the communication speeds of WebSocket and Ajax. Just reading this article should make you think, "If a WebSocket connection is already available, there's no point in using Ajax separately." Ultimately, I think we'll see the emergence of an architecture in which the server renders a web page once, then establishes a WebSocket connection to control all communication, completely eliminating Ajax altogether.

Then there's data compression. There's no doubt that converting data to binary format reduces the amount of data sent compared to sending text. With the upcoming WebSocket Deflate Extension, data will be compressed even further, making it even smaller.

Additionally, as we've verified in this article, sending binary data requires additional information to be added to it. So what's the point of sending text data separately? It's only a matter of time before libraries emerge that emphasize speed by sending everything in binary from the start. I even think there's a chance that in the future, all data transmitted over the Internet using WebSockets will be binary.

## Summary
To put it a little dramatically, this could be a paradigm shift for the web. It's not impossible that the protocol used on the web will be replaced from HTTP to some kind of protocol that runs on WebSocket.
