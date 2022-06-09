---
title: OpenSocial アプリケーションを作る (2)
layout: post
date: 2008-04-17
tags:
  - Widget
  - Gadget
  - OpenSocial
  - Orkut
---

[OpenSocial アプリケーションを作る (1)](http://devlog.agektmr.com/archives/22)では、ガジェットの仕組みと、Orkut でアカウントを取得するところまで書きました。今回は、[前回紹介したアプリケーション](http://devlab.agektmr.com/OpenSocial/Orkut/FriendIntroducer.xml)のコードを解説します。 このアプリケーション (FriendIntroducer) は、自分が見た場合は友達の紹介文を書くことができ、他人が見た場合はその人に向けて書かれた紹介文を読むことができる、という mixi などにもよくある簡単なアプリケーションです。JavaScript や jQuery 的にはもっと賢い実装方法があると思いますが、今回は OpenSocial のコードにフォーカスしますので、アホなコードは大目に見てください。

## ガジェット XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<module>
<moduleprefs title="Friend Introducer" title_url="" description="Introduce your friend!" height="100">
  <require feature="opensocial-0.7" />
  <require feature="views" />
  <require feature="dynamic-height" />
 </moduleprefs>
<content type="html" view="canvas">
  < ![CDATA[
  <link href="http://devlab.agektmr.com/OpenSocial/css/FriendIntroducer.css" rel="stylesheet" type="text/css">
  <script type="text/javascript" src="http://devlab.agektmr.com/OpenSocial/js/jquery.js"></script>
  <script type="text/javascript" src="http://devlab.agektmr.com/OpenSocial/js/FriendIntroducer.js">< /script>
  </script><script type="text/javascript">
    gadgets.util.registerOnLoadHandler(FriendIntroducer.init);
  </script>
  <div id="title"></div>
  <div id="friends"></div>
  <div id="message"></div>
  ]]>
 </content>
</module>
```

ここでは

* ガジェットの設定
* 外部の CSS や JavaScript を読み込み
* 初期化スクリプトの呼び出し
* 表示用 DIV 指定

を行っています。

```xml
<content type="html" view="profile">
```

Content は html タイプ、profile ビューと指定しました。`type` には `html` と`url` が選択可能ですが、`html` として内容を Content タグで囲まれた部分に記述しています。`view` は OpenSocial の仕様上 `profile`、`canvas` が想定されていますが、コンテナによって `home` や `preview` が存在するようです。ここでは例として `canvas`を使用しています。

また、`view` を指定しない場合は `default` ビューとして扱われます。コンテナは表示場面 (コンテキスト) によってビューを切り替えますが、Content 内で `view` を取り出して JavaScript で処理を分ける方法もあります。

## Content の内容

Content の内容は、基本的に通常のウェブページと同じように扱うことができ、HTML で書くことができますが、

```xml
<script type="text/javascript">
  gadgets.util.registerOnLoadHandler(FriendIntroducer.init);
</script>
```

このように `gadgets.util.registerOnLoadHandler` を使って初期化処理を入れることができます。

このアプリケーションでは、表示テンプレートとして空の `div` タグを 3 つ用意しています。

## JavaScript のコード

JavaScript のソースコードは<a href="http://devlab.agektmr.com/OpenSocial/js/FriendIntroducer.js" target="_blank">ここ</a>にありますが、抜粋して紹介します。

```js
$('#friends').html('Requesting friends...');
var req = opensocial.newDataRequest();
req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'friends');
req.add(req.newFetchPersonAppDataRequest('VIEWER', 'Introduction'), 'intro');
req.send(FriendIntroducer.onLoadViewerFriends);
```

最も基本的な処理となる、閲覧者、閲覧者の友達、保存したデータを取り出す処理です。

`opensocial.newDataRequest()` でデータリクエストオブジェクトを作り、`add` で 3 種類のリクエストを追加、最後に `send` でコールバック関数を指定した上、データリクエストを送信しています。3 種類のリクエストにはそれぞれ後で区別するため `viewer`, `friends`, `intro` という名前(キー)を付けています。

```js
var viewer  = response.get('viewer').getData();
var friends = response.get('friends').getData();
var intro   = response.get('intro').getData();
```

コールバック関数では、引数 `response` を使って、`response.get(キー名).getData()` でリクエストしていたデータを取り出すことができます。

```js
var viewer_id = viewer.getId();
var json = null;
if (intro[viewer_id]) {
  if (intro[viewer_id].Introduction) {
    var json_str = gadgets.util.unescapeString(intro[viewer_id].Introduction);
    var json = eval(json_str)[0];
  }
}
```

intro は、このアプリケーションを使ってコンテナのデータ保存領域に予め保存しておいた内容、つまり「以前保存した友達の紹介文」です。

```js
$('#title').html('<p>Friends of '+viewer.getDisplayName()+':</p>');
var html = '';
if (friends.size() == 0) {
  $('#message').html("<p>You don't have any friends yet!</p>");
}
```

友達が誰もいない場合を考慮して、メッセージを表示しています。

```js
friends.each(function(person) {
  var t = FriendIntroducer.template.friend_list_canvas;
  t = t.replace('##thumbnail_url##', person.getField(opensocial.Person.Field.THUMBNAIL_URL));
  t = t.replace('##profile_url##',   person.getField(opensocial.Person.Field.PROFILE_URL));
  t = t.replace('##display_name##',  person.getDisplayName());
  t = t.replace('##input_id##',      'input_'+person.getId());
  if (json) {
    t = t.replace('##intro_text##',  json[person.getId()] ? json[person.getId()] : '');
  } else {
    t = t.replace('##intro_text##', '');
  }
  html += t;
});
$('#friends').html('<ul>'+html+'</ul>');
```

OpenSocial では配列をなめる、いわゆる iteration も仕様に含まれていて、each を使うことができます。ここでは、友達のリストをループして、友達の名前やサムネイル画像、保存されていた紹介文を HTML テンプレートに埋め込んでいきます。

![Orkut5](/images/2008/03/orkut5.jpg)

ここまでで、友達の紹介文を書き込むことができる canvas ページの表示することができました。次に、友達の紹介文をユーザーが書き込んだものと想定し、投稿して保存するところまでを解説します。

## データの保存

OpenSocial はコンテナにデータ保存領域を持っており、アプリケーションがデータを保存することができます。これはパーシステントデータ (Persistant data) や、アプリケーションデータ (AppData) と呼ばれています。アプリケーションデータはバージョン 0.7 では**エスケープした文字列のみ**サポートしています (次のバージョンでは JSON そのものの保存も可能になるようです)。

```js
var list = $('#friends ul li');
var intro = "{result:[{";
for (var i=0; i < list.length; i++) {
  var textarea = list[i].lastChild.lastChild;
  var uid = textarea.id.substring(6);
  var intro_text = textarea.value.replace("'", "\'");;
  intro += "'"+uid+"':'"+intro_text+"'";
  intro += (list.length-1)==i ? "" : ",";
};
intro += '}]};';
var req = opensocial.newDataRequest();
intro = gadgets.util.escapeString(intro);
```

この処理は、ユーザーが友達の紹介文を書き終わって「投稿ボタン」を押すことでトリガーされるものです。DOM を辿って各友達のユーザー ID と紹介文の内容を取得する、普通の JavaScript です。取得した内容は JSON の文字列になるよう連結し、エスケープすることで、アプリケーションデータとして保存が可能になります。

```js
req.add(req.newUpdatePersonAppDataRequest('VIEWER', 'Introduction', intro));
req.send(function() {
  $('#message').html('<p>Your introduction has been submitted.');
});
```

最後に、JSON 形式になった文字列をデータリクエストオブジェクトに追加して送信して、完了です。

## まとめ

解説というよりはソースコード並べただけみたいな記事になってしまいましたが、OpenSocial アプリケーションのほとんどが JavaScript でできてしまうということは、分かったかと思います。次回は外部サーバーとの連携を行う `makeRequest` に触れたいと思います。
