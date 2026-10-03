---
layout: post
lang: en
title: Shadow DOM - A Technology That Makes Up Web Components
description: I will explain Shadow DOM, one of the building blocks of Web Components.
date: 2014-11-01
tags:
  - Shadow DOM
  - Web Components
image:
  feature: /shadow-dom-web-components/architecture.png
translationOf: /2014/11/shadow-dom-web-components.html
translated: 2026-10-03
translatedManually: false
---
*This article is a crosspost from [an article on webcomponents.org](http://webcomponents.org/articles/introduction-to-shadow-dom/).*

Shadow DOM allows you to attach a DOM tree to a DOM element with scoped styles and markup that are isolated from the rest of the web page. In this article and video, we'll take a look at Shadow DOM.

<!-- excerpt -->

{% YouTube 'Is4FZxKGqqk' %}

## What is Shadow DOM?

[![](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)](https://2.bp.blogspot.com/-sSnMdi7jRHk/VD9ECL455-I/AAAAAAAAudQ/cXHMUu6S58M/s1600/posterImage-4215.png)

Here is a video displayed using an HTML5 video tag. As you can see, even though the code is as simple as just a video tag, it displays not only the video itself but also controls UI.

```html
<video src="http://craftymind.com/factory/html5video/BigBuckBunny_640x360.mp4" controls></video>
```

In fact, if you open DevTools in Chrome and turn on the `'Show user agent shadow DOM'` option, you can see how this controls UI is constructed.

[![](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)](https://4.bp.blogspot.com/-W-04-3shNPE/VD9EX1GZ6KI/AAAAAAAAudo/mtraUQ_D89w/s1600/Screen%2BShot%2B2014-06-03%2Bat%2B4.05.54.png)

Can you see that this controls UI is actually made of HTML? This is an example of Shadow DOM.

[![](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)](https://3.bp.blogspot.com/-oZMSpyMBoz4/VD9EDhH4vNI/AAAAAAAAudc/QZTAncpkIdM/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.26.37.png)

What's great about Shadow DOM is that this capability is also available to web developers.

## The Structure of Shadow DOM

An element that has a Shadow Root is called a Shadow Host. Since a Shadow Root can be treated just like a regular DOM element, you can append arbitrary nodes to it.

[![](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)](https://2.bp.blogspot.com/-Ja7g-lE5tLI/VD9EDMWH_dI/AAAAAAAAudY/IpVUB8uEE60/s1600/Screen%2BShot%2B2014-10-16%2Bat%2B11.28.07.png)

In Shadow DOM, all markup and CSS are scoped to the element. In other words, CSS defined inside the Shadow Root does not affect the parent document, and CSS from the parent document will not accidentally bleed into the Shadow Root.

## How to Create a Shadow DOM

To create a Shadow DOM, call `.createShadowRoot()` on any DOM element to create a Shadow Root. By appending elements to this Shadow Root object, you can build out the Shadow DOM.

```html
<div id="host"></div>
```

```javascript
var host = document.querySelector('#host');
var root = host.createShadowRoot(); // Create a Shadow Root
var div = document.createElement('div');
div.textContent = 'This is Shadow DOM';
root.appendChild(div); // Append element to Shadow Root
```

Elements added to a Shadow Root cannot be queried from outside. In this case, `document.querySelector('#host div')` returns `null`.

## Displaying Shadow Host Content Inside Shadow DOM

There may be times when you want to display child elements of the Shadow Host inside the Shadow DOM. For example, consider an element like a nametag styled with Shadow DOM. It would be convenient to be able to change just the text from external input.

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

By providing a CSS selector for the node you want to project from the Shadow Host in the `select` attribute of the `<content>` element, that element will be inserted at the position of `<content>`.

Note that the `<content>` element only accepts CSS selectors that target direct children of the Shadow Host. That means you cannot target descendants of descendants like this:

```html
<div id="host">
  <div class="child">
    <h1>This is Shadow DOM</h1>
  </div>
</div>

<content select=".child h1"></content> // This won't work
```

## Combining with Template

Shadow DOM is great, but writing imperative JavaScript every time to build DOM trees is cumbersome, leaving little room for designers to collaborate.

That is where the Template element comes in. Let's build Shadow DOM declaratively by utilizing the Template element. For more on the Template element, please refer to the [previous post](http://blog.agektmr.com/2014/10/template-web-components.html).

```html
<template id="template"> // <template> content becomes the Shadow DOM
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content> // Insert h1 here
  </div>
</template>

<div id="host">
  <h1>This is Shadow DOM</h1>
</div>
```

```javascript
var host = document.querySelector('#host');
// Create a Shadow Root
var root = host.createShadowRoot();
var template = document.querySelector('#template');
// Clone the <template>
var clone = document.importNode(template.content, true);
// Append to Shadow Root
root.appendChild(clone);
```

You can view the actual code [here](http://jsbin.com/bahera/4/edit).

## Browser Support

As of October 2014, Shadow DOM is supported in Chrome, Opera, and behind a flag in Firefox. Please check chromestatus.com or caniuse.com for the latest support status. You can also use [platform.js](https://github.com/polymer/platform) as a polyfill ([scheduled to be renamed](https://blog.polymer-project.org/announcements/2014/10/16/platform-becomes-webcomponents/) to webcomponents.js in November 2014).

## Summary

What did you think? Beyond what was covered in this article, Shadow DOM has a wealth of sophisticated specifications, including external styling, event handling, working with multiple Shadow Roots, and more.

If you'd like to learn more about Shadow DOM, please check out the following resources:

* [Shadow DOM 101](http://goo.gl/1cxTS7)
* [Shadow DOM 201 - CSS とスタイリング](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - 上級者向けコンセプトと DOM API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)
* [Shadow DOM 仕様](http://www.w3.org/TR/shadow-dom/)
