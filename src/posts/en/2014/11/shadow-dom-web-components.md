---
layout: post
lang: en
title: 'Shadow DOM - The technology that makes up Web Components'
description: 'We will explain Shadow DOM, one of the elements that make up Web Components.'
date: 2014-11-01
image:
feature: /shadow-dom-web-components/architecture.png
tags:
- Shadow DOM
- Web Components
translationOf: /2014/11/shadow-dom-web-components.html
translated: 2025-11-29
translatedManually: false
---
*This article is a cross-post from [webcomponents.org article](http://webcomponents.org/articles/introduction-to-shadow-dom/). *

Shadow DOM allows you to add a DOM tree to a DOM element, containing styles and markup that are local to that node, separate from the rest of the webpage. This article and video explain Shadow DOM.

<!-- excerpt -->

{% YouTube 'Is4FZxKGqqk' %}

## What is Shadow DOM?

[![](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)

This is a video displayed using the HTML5 video tag. As you can see,
the code is simple, consisting only of a video tag, but it is able to display not only the video itself but also the control UI.

```html
<video src="http://craftymind.com/factory/html5video/BigBuckBunny_640x360.mp4" controls></video>
```

In fact, if you open DevTools in Chrome and turn on the `'Show user agent shadow DOM'` option, you can see how this control UI is structured.

[![](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)

Did you know that this control UI is actually made of HTML? This is an example of Shadow DOM.

[![](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)

The great thing about Shadow DOM is that it's actually available to web developers.

Shadow DOM structure

An element with a shadow root is called a shadow host. A shadow root can be treated like a normal DOM element, so you can add any node to it.

[![](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)

In Shadow DOM, all markup and CSS is scoped to the element. In other words, CSS defined within a shadow root cannot affect the parent document, and CSS from the parent document cannot accidentally affect the shadow root.

How to create Shadow DOM

To create a Shadow DOM, call `.createShadowRoot()` on any DOM element to create a Shadow Root. You can then build the Shadow DOM by adding elements to this Shadow Root object.

```html
<div id="host"></div>
```

```javascript
var host = document.querySelector('#host');
var root = host.createShadowRoot(); // Shadow Root を作る
var div = document.createElement('div');
div.textContent = 'This is Shadow DOM';
root.appendChild(div); // Shadow Root に要素を追加
```

Elements added to the shadow root cannot be queried either. In this case, `document.querySelector('#host div')` becomes `null`.

## Displaying Shadow Host content in Shadow DOM

There may be times when you want to display child elements of a Shadow Host within Shadow DOM.
For example, consider an element like a name tag that is styled by Shadow DOM.
It would be convenient to be able to change just the text using external input.

[![](https://2.bp.blogspot.com/-8NLBoVflV6A/VD9FVei9BVI/AAAAAAAAudw/6FEbhEJuOSs/s1600/posterImage-4222.png)](https://2.bp.blogspot.com/-8NLBoVflV6A/VD9FVei9BVI/AAAAAAAAudw/6FEbhEJuOSs/s1600/posterImage-4222.png)

```html
<div id="nameTag">Bob</div>
```

To achieve this, use the `<content>` element.

```javascript
var host = document.querySelector('#host');
var root = host.createShadowRoot();
var content = document.createElement('content');
content.setAttribute('select', 'h1'); //<content select="h1"></content>
root.appendChild(content);
```

```html
<div id="host">
  <h1>This is Shadow DOM</h1>
<div>
```

By giving the `<content>` element an `select` attribute with a CSS selector pointing to the node you want to remove from the Shadow Host, that element will be inserted at the `<content>` position.

Note that the `<content>` element can only specify CSS selectors that represent elements that are direct descendants of the Shadow Host. This means that you cannot specify a descendant of a descendant, as in the following:

```html
<div id="host">
  <div class="child">
    <h1>This is Shadow DOM</h1>
  </div>
</div>

<content select=".child h1"></content> // これはダメ
```

## Combine with Template

Shadow DOM is great, but writing JavaScript that imperatively builds a DOM tree is not easy, and it leaves no room for a designer.

This is where the Template element comes in. By utilizing the Template element, you can construct the Shadow DOM declaratively. For more information about the Template element, please refer to the previous post.

```html
<template id="template"> // <template> の中身が Shadow DOM になる
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content> // h1 をここに挿入
  </div>
</template>

<div id="host">
  <h1>This is Shadow DOM</h1>
</div>
```

```javascript
var host = document.querySelector('#host');
// Shadow Root を作る
var root = host.createShadowRoot();
var template = document.querySelector('#template');
// <template> をコピー
var clone = document.importNode(template.content, true);
// Shadow Root に追加
root.appendChild(clone);
```

You can see the actual code here.

## Browser support status

As of October 2014, Shadow DOM is supported in Chrome, Opera, and, if flagged, Firefox. Check the latest support status at chromestatus.com or caniuse.com. A polyfill is also available: [platform.js](https://github.com/polymer/platform) (scheduled to be renamed to webcomponents.js in November 2014).

## summary

What did you think? In addition to what I covered in this article, Shadow DOM has many other very complex specifications, such as external styling, how to handle events, and how to handle multiple shadow roots.

If you want to learn more about Shadow DOM, please refer to the following documentation:

* [Shadow DOM 101](http://goo.gl/1cxTS7)
* [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - Advanced Concepts and DOM API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)
* [Shadow DOM Specification](http://www.w3.org/TR/shadow-dom/)
