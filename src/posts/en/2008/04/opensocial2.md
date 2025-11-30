---
layout: post
lang: en
title: Creating an OpenSocial Application (2)
description:
date: 2008-04-17
tags:
  - Widget
  - Gadget
  - OpenSocial
  - Orkut
translationOf: /2008/04/opensocial2.html
translated: 2025-11-30
translatedManually: false
---
In [Creating an OpenSocial Application (1)](http://devlog.agektmr.com/archives/22), I explained how gadgets work and even covered how to get an account on Orkut. This time, I'll explain the code for [the application introduced last time](http://devlab.agektmr.com/OpenSocial/Orkut/FriendIntroducer.xml). This application (FriendIntroducer) is a simple application that you often see on sites like mixi; it allows you to write an introduction for your friend if you view it, and allows others to read the introduction written for that person if they view it. There are probably smarter ways to implement this using JavaScript or jQuery, but this time I'll focus on the OpenSocial code, so please overlook the silly code.

## Gadget XML

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

where

* Gadget settings
* Loading external CSS and JavaScript
* Calling the initialization script
* Specifying the display DIV

We are currently working on the following.

```xml
<content type="html" view="profile">
```

The Content type is specified as html, with the profile view. While `type` can be set to `html` or `url`, the content is written between the Content tags as `html`. The OpenSocial specification assumes `profile` or `canvas` for `view`, but depending on the container, `home` and `preview` may also exist. Here, `canvas` is used as an example.

Also, if `view` is not specified, it will be treated as `default` view. The container switches views depending on the display situation (context), but you can also extract `view` within Content and separate the processing in JavaScript.

## Content

The contents of Content can basically be treated like a normal web page and written in HTML,

```xml
<script type="text/javascript">
  gadgets.util.registerOnLoadHandler(FriendIntroducer.init);
</script>
```

In this way, you can use `gadgets.util.registerOnLoadHandler` to include initialization processing.

This application provides three empty `div` tags as display templates.

## JavaScript code

The JavaScript source code can be found here, but here is an excerpt:

```js
$('#friends').html('Requesting friends...');
var req = opensocial.newDataRequest();
req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'friends');
req.add(req.newFetchPersonAppDataRequest('VIEWER', 'Introduction'), 'intro');
req.send(FriendIntroducer.onLoadViewerFriends);
```

This is the most basic process, retrieving viewers, their friends, and saved data.

A data request object is created in `opensocial.newDataRequest()`, three types of requests are added in `add`, and finally a callback function is specified in `send` before the data request is sent. The three types of requests are given names (keys) `viewer`, `friends`, and `intro` to distinguish them later.

```js
var viewer  = response.get('viewer').getData();
var friends = response.get('friends').getData();
var intro   = response.get('intro').getData();
```

In the callback function, you can use the argument `response` to retrieve the data you requested in `response.get(キー名).getData()`.

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

intro is the content that was previously saved in the container's data storage area using this application, in other words, the "previously saved friend introduction."

```js
$('#title').html('<p>Friends of '+viewer.getDisplayName()+':</p>');
var html = '';
if (friends.size() == 0) {
  $('#message').html("<p>You don't have any friends yet!</p>");
}
```

The message is displayed in case you have no friends.

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

OpenSocial's specification also includes the ability to iterate through an array, using the "each" method. Here, we loop through the friend list and embed the friend's name, thumbnail image, and saved description into an HTML template.

![Orkut5](/images/2008/03/orkut5.jpg)

So far, we have been able to display a canvas page where users can write introductions for their friends. Next, we will assume that a user has written an introduction for a friend, and explain how to post and save it.

## Saving data

OpenSocial has a data storage area in the container where applications can save data. This is called persistent data or application data (AppData). In version 0.7, application data only supports escaped strings (it seems that the next version will be able to save JSON itself).

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

This process is triggered when the user finishes writing a friend's introduction and presses the "Post" button. It's just regular JavaScript that traverses the DOM to get each friend's user ID and the introduction content. The retrieved content is concatenated into a JSON string, and then escaped so that it can be saved as application data.

```js
req.add(req.newUpdatePersonAppDataRequest('VIEWER', 'Introduction', intro));
req.send(function() {
  $('#message').html('<p>Your introduction has been submitted.');
});
```

Finally, add the JSON-formatted string to the data request object and send it.

## summary

This article ended up being more of a list of source code than an explanation, but I hope it gives you an idea that most OpenSocial applications can be created with JavaScript. Next time, I'd like to touch on `makeRequest`, which connects to external servers.
