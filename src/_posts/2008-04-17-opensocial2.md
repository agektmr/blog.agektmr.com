---
title: OpenSocialアプリケーションを作る(2)
author: Eiji
layout: post
SBM_count:
  - '00002<>1271387481<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 2513714
categories:
  - OpenSocial
  - Widget
tags:
  - Gadget
  - OpenSocial
  - Orkut
---
<a rel="bookmark" href="http://devlog.agektmr.com/archives/22">OpenSocialアプリケーションを作る(1)</a>では、ガジェットの仕組みと、Orkutでアカウントを取得するところまで書きました。今回は、<a href="http://devlab.agektmr.com/OpenSocial/Orkut/FriendIntroducer.xml" target="_blank">前回紹介したアプリケーション</a>のコードを解説します。

このアプリケーション(FriendIntroducer)は、自分が見た場合は友達の紹介文を書くことができ、他人が見た場合はその人に向けて書かれた紹介文を読むことができる、というmixiなどにもよくある簡単なアプリケーションです。JavaScriptやjQuery的にはもっと賢い実装方法があると思いますが、今回はOpenSocialのコードにフォーカスしますので、アホなコードは大目に見てください。

## ガジェットXML

<pre class="brush: xml; title: ; notranslate" title="">&lt; ?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;module&gt;
&lt;moduleprefs title="Friend Introducer" title_url="" description="Introduce your friend!" height="100"&gt;
  &lt;require feature="opensocial-0.7" /&gt;
  &lt;require feature="views" /&gt;
  &lt;require feature="dynamic-height" /&gt;
 &lt;/moduleprefs&gt;
&lt;content type="html" view="canvas"&gt;
  &lt; ![CDATA[
  &lt;link href="http://devlab.agektmr.com/OpenSocial/css/FriendIntroducer.css" rel="stylesheet" type="text/css"&gt;
  &lt;script type="text/javascript" src="http://devlab.agektmr.com/OpenSocial/js/jquery.js"&gt;&lt;/script&gt;
  &lt;script type="text/javascript" src="http://devlab.agektmr.com/OpenSocial/js/FriendIntroducer.js"&gt;&lt; /script&gt;
  &lt;/script&gt;&lt;script type="text/javascript"&gt;
    gadgets.util.registerOnLoadHandler(FriendIntroducer.init);
  &lt;/script&gt;
  &lt;div id="title"&gt;&lt;/div&gt;
  &lt;div id="friends"&gt;&lt;/div&gt;
  &lt;div id="message"&gt;&lt;/div&gt;
  ]]&gt;
 &lt;/content&gt;
&lt;/module&gt;</pre>

ここでは

*   ガジェットの設定
*   外部のCSSやJavaScriptを読み込み
*   初期化スクリプトの呼び出し
*   表示用DIV指定

を行っています。

<pre class="brush: xml; title: ; notranslate" title="">&lt;content type="html" view="profile"&gt;</pre>

Contentはhtmlタイプ、profileビューと指定しました。typeにはhtmlとurlが選択可能ですが、htmlとして内容をContentタグで囲まれた部分に記述しています。viewはOpenSocialの仕様上profile、canvasが想定されていますが、コンテナによってhomeやpreviewが存在するようです。ここでは例としてcanvasを使用しています。

また、viewを指定しない場合はdefaultビューとして扱われます。コンテナは表示場面(コンテキスト)によってビューを切り替えますが、Content内でviewを取り出してJavaScriptで処理を分ける方法もあります。

## Contentの内容

Contentの内容は、基本的に通常のウェブページと同じように扱うことができ、HTMLで書くことができますが、

<pre class="brush: xml; title: ; notranslate" title="">  &lt;script type="text/javascript"&gt;
    gadgets.util.registerOnLoadHandler(FriendIntroducer.init);
  &lt;/script&gt;</pre>

このようにgadgets.util.registerOnLoadHandlerを使って初期化処理を入れることができます。

このアプリケーションでは、表示テンプレートとして空のdivタグを3つ用意しています。

## JavaScriptのコード

JavaScriptのソースコードは<a href="http://devlab.agektmr.com/OpenSocial/js/FriendIntroducer.js" target="_blank">ここ</a>にありますが、抜粋して紹介します。

<pre class="brush: jscript; title: ; notranslate" title="">$('#friends').html('Requesting friends...');
    var req = opensocial.newDataRequest();
    req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
    req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'friends');
    req.add(req.newFetchPersonAppDataRequest('VIEWER', 'Introduction'), 'intro');
    req.send(FriendIntroducer.onLoadViewerFriends);</pre>

最も基本的な処理となる、閲覧者、閲覧者の友達、保存したデータを取り出す処理です。

opensocial.newDataRequest()でデータリクエストオブジェクトを作り、addで3種類のリクエストを追加、最後にsendでコールバック関数を指定した上、データリクエストを送信しています。3種類のリクエストにはそれぞれ後で区別するためviewer, friends, introという名前(キー)を付けています。

<pre class="brush: jscript; title: ; notranslate" title="">var viewer    = response.get('viewer').getData();
   var friends   = response.get('friends').getData();
   var intro     = response.get('intro').getData();</pre>

コールバック関数では、引数(response)を使って、response.get(キー名).getData()でリクエストしていたデータを取り出すことができます。

<pre class="brush: jscript; title: ; notranslate" title="">var viewer_id = viewer.getId();
    var json = null;
    if (intro[viewer_id]) {
      if (intro[viewer_id].Introduction) {
        var json_str = gadgets.util.unescapeString(intro[viewer_id].Introduction);
        var json = eval(json_str)[0];
      }
    }</pre>

introは、このアプリケーションを使ってコンテナのデータ保存領域に予め保存しておいた内容、つまり「以前保存した友達の紹介文」です。

<pre class="brush: jscript; title: ; notranslate" title="">$('#title').html('&lt;p&gt;Friends of '+viewer.getDisplayName()+':&lt;/p&gt;');
    var html = '';
    if (friends.size() == 0) {
      $('#message').html("&lt;p&gt;You don't have any friends yet!&lt;/p&gt;");
    }</pre>

友達が誰もいない場合を考慮して、メッセージを表示しています。

<pre class="brush: jscript; title: ; notranslate" title="">friends.each(function(person) {
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
    $('#friends').html('&lt;ul&gt;'+html+'&lt;/ul&gt;');</pre>

OpenSocialでは配列をなめる、いわゆるiterationも仕様に含まれていて、eachを使うことができます。ここでは、友達のリストをループして、友達の名前やサムネイル画像、保存されていた紹介文をHTMLテンプレートに埋め込んでいきます。

<p style="text-align: center;">
  <a href="/images/2008/03/orkut5.jpg"><img title="Orkut5" src="/images/2008/03/orkut5.jpg" alt="" width="300" height="264" /></a>
</p>

ここまでで、友達の紹介文を書き込むことができるcanvasページの表示することができました。次に、友達の紹介文をユーザーが書き込んだものと想定し、投稿して保存するところまでを解説します。

## データの保存

OpenSocialはコンテナにデータ保存領域を持っており、アプリケーションがデータを保存することができます。これはパーシステントデータ(Persistant data)や、アプリケーションデータ(AppData)と呼ばれています。アプリケーションデータはバージョン0.7では**エスケープした文字列のみ**サポートしています(次のバージョンではJSONそのものの保存も可能になるようです)。

<pre class="brush: jscript; title: ; notranslate" title="">var list = $('#friends ul li');
    var intro = "{result:[{";
    for (var i=0; i &lt; list.length; i++) {
      var textarea = list[i].lastChild.lastChild;
      var uid = textarea.id.substring(6);
      var intro_text = textarea.value.replace("'", "\\'");;
      intro += "'"+uid+"':'"+intro_text+"'";
      intro += (list.length-1)==i ? "" : ",";
    };
    intro += '}]};';
    var req = opensocial.newDataRequest();
    intro = gadgets.util.escapeString(intro);</pre>

この処理は、ユーザーが友達の紹介文を書き終わって「投稿ボタン」を押すことでトリガーされるものです。DOMを辿って各友達のユーザーIDと紹介文の内容を取得する、普通のJavaScriptです。取得した内容はJSONの文字列になるよう連結し、エスケープすることで、アプリケーションデータとして保存が可能になります。

<pre class="brush: jscript; title: ; notranslate" title="">req.add(req.newUpdatePersonAppDataRequest('VIEWER', 'Introduction', intro));
    req.send(function() {
      $('#message').html('&lt;p&gt;Your introduction has been submitted.');
    });</pre>

最後に、JSON形式になった文字列をデータリクエストオブジェクトに追加して送信して、完了です。

## まとめ

解説というよりはソースコード並べただけみたいな記事になってしまいましたが、OpenSocialアプリケーションのほとんどがJavaScriptでできてしまうということは、分かったかと思います。次回は外部サーバーとの連携を行うmakeRequestに触れたいと思います。</content>