---
layout: post
lang: en
title: Custom Elements - Technology for composing Web Components
description: This article explains Custom Elements, one of the elements that make up Web Components.
date: 2014-11-25
image:
  feature: /custom-elements-web-components/image.png
tags:
  - Custom Elements
  - Web Components
translationOf: /2014/11/custom-elements-web-components.html
translated: 2025-11-30
translatedManually: false
---
*This article is a cross-post of [webcomponents.org article](http://webcomponents.org/articles/introduction-to-custom-elements/).*

Needless to say, HTML is the most important element that makes up a web page. However, because the functionality it provides is low-level, when you try to create a complex component, it can quickly become an unclear structure full of divs. For example, what if you could create a unique component that incorporated the functionality you needed? For example, what if you could give that component a tag name that accurately represented its function? What if you could extend existing tags to add new functionality? Custom Elements makes this possible.

<!-- excerpt -->

{% YouTube 'iVJA-lGkEFw' %}

## What are Custom Elements?
Custom Elements allow developers to define their own HTML tags and use them on their sites, dramatically simplifying and reusing recurring components.

## How to Create a Custom Element
Defining a custom element is simple. Just enter the element name as the first argument to `document.registerElement()` .

```javascript
var XComponent = document.registerElement('x-component');
```

Now, after defining it, you can use `<x-component>` in your HTML.

```html
<x-component></x-component>
```

* `<x-component>` can exist in the document before the element is defined. For more information, see the [HTML5Rocks article](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/).

If you want to target browsers that don't support custom elements, make sure to load the polyfill [webcomponents.js](http://webcomponents.org/polyfills/).

```html
<script src="bower_components/webcomponentsjs/webcomponents.js"></script>
```

### Tag Name Rules
The tag name used for a Custom Element must contain '`-`'. Please note that an error will occur if '`-`' is not included.

**Good**

*x-component
*x-web-component

**Bad**

* web_component
*xelement
*XElement

### Imperative Usage
Tags can be used declaratively in HTML, such as `<x-component></x-component>`, but they can also be used imperatively.

```javascript
var XComponent = document.registerElement('x-component');
var dom = new XComponent();
document.body.appendChild(dom);
```

In the above example, `new` is used to instantiate the element's constructor.

```javascript
document.registerElement('x-component');
var dom = document.createElement('x-component');
document.body.appendChild(dom);
```

In this example, it is instantiated using `document.createElement()`.

## Adding functionality to a custom element
Just having a tag name doesn't do anything useful. Let's add functionality to this custom element.

First, call `HTMLElement.prototype` as an argument to `Object.create()` to obtain a prototype object. Next, add any functions or properties to that object. This will become the prototype for your new Custom Element. Pass this object as the value of the object you provide as the second argument to `document.registerElement()`, using `'prototype'` as the key.

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.name = 'Custom Element';
proto.alert = function() {
  alert('This is ' + this.name);
};
document.registerElement('x-component', {
  prototype: proto
});
```

### Inheritance Structure
When you inspect the custom element defined above in Chrome DevTools, you'll see that `x-component`, which has `HTMLElement` as its prototype, is itself the prototype of an instance of `x-component`.

![](/images/custom-elements-web-components/inheritance.png)

## Type Extension Custom Element
You can create a custom element that extends the functionality of a native DOM element. This is called a Type Extension Custom Element, and can be used by adding the `is` attribute to an existing tag with the custom element's tag name as its value.

```html
<div is="x-component"></div>
```

To create a Type Extension Custom Element, pass the tag name you want to extend as a string to the second argument of `document.registerElement()`, using `extends` as the key. Also, use the prototype of the tag you want to extend for `prototype` instead of `HTMLElement`.

Below is an example of extending the `input` tag.

```javascript
var XComponent = document.registerElement('x-component', {
  extends: 'input',
  prototype: Object.create(HTMLInputElement.prototype)
});
```

Note that we specify the element we want to extend by tag name as `extends: 'input'` and use `HTMLInputElement` instead of `HTMLElement`. Now we can extend the `input` tag as `<input is="x-component">`. We can add new APIs to the `、input` tag by adding functionality to the prototype.

**NOTE**: You might be tempted to try and see what happens if you set `extends` and `prototype` to mismatched elements. It's possible, and it might inspire some unexpected ideas, but in my experience, it didn't produce any useful results.

### GitHub Use Cases
From the explanation so far, it may be hard to imagine what the Type Extension Custom Element is useful for. In fact, a great implementation that makes full use of its benefits is already running on GitHub.

![](/images/custom-elements-web-components/relative-time.png)

GitHub displays many strings indicating the date and time when source code was updated, but as shown in the image, they are expressed relative to the current date and time. Any developer will immediately understand that expressing relative time requires some logic, and GitHub achieves this with a set of Type Extension Custom Elements called [`time-elements`](https://github.com/github/time-elements).

If you check the element in DevTools, it will look like the image below.

![](/images/custom-elements-web-components/time.png)

Please pay attention to four points.

* The `time` tag is used.
* An absolute date and time is specified as the `datetime` attribute.
* The `is="relative-time"` Type Extension Custom Element is specified.
* A relative date and time is specified as `TextContent`.

This is achieved by the Type Extension Custom Element calculating the relative date and time from the absolute date and time (`datetime`) and inserting `TextContent`.

The advantage of using Type Extension Custom Element is that even if JavaScript is turned off, the browser does not support Custom Elements, or the Polyfill does not work properly in an environment, the content of the `time` element is displayed as is as a fallback, and semantics are not broken. If you try turning off JavaScript in DevTools, you can confirm that the absolute date and time are simply displayed.

For more information about `time-elements` , see [How GitHub is using Web Components in production](http://webcomponents.org/articles/interview-with-joshua-peek/) on webcomponents.org.

## Lifecycle Callbacks
In the `relative-time` example, we wrote that a relative date and time is inserted into `TextContent`, but when is this executed? Custom elements allow you to define lifecycle callbacks, functions that are called when various events occur.

**.createdCallback()**
Called immediately after an element is created.

**.attachedCallback()**
Called when the created element is attached to the document's DOM.

**.detachedCallback()**
Called when the created element is detached from the document's DOM.

**.attributeChangedCallback()**
Called when the attributes of an element you created change.

In the `relative-time` example, the relative date and time is calculated at the timing of `.createdCallback()` and `.attributeChangedCallback()`, and `TextContent` is rewritten.

### Example
To use lifecycle callbacks, define functions on the prototype object when defining a custom element.

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  var div = document.createElement('div');
  div.textContent = 'This is Custom Element';
  this.appendChild(div);
};
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

## Using Custom Elements in Combination with Templates and Shadow DOM
Combining Custom Elements with Templates and Shadow DOM improves development efficiency and ease of reuse. Templates allow you to define the content of an element declaratively (i.e., by simply writing HTML). Shadow DOM allows you to confine styles, ids, classes, and more within elements.

To achieve this, we combine Template and Shadow DOM in `.createdCallback()`, which is called when the Custom Element is created.
For more information on Template and Shadow DOM, please refer to our previous articles ([Template](http://blog.agektmr.com/2014/10/template-web-components.html), [Shadow DOM](http://blog.agektmr.com/2014/11/shadow-dom-web-components.html)).

**HTML**

```html
<!-- Template の定義 -->
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content>
  </div>
</template>
```

```html
<!-- Custom Element を使用 -->
<x-component>
  <h1>This is Custom Element</h1>
</x-component>
```

**JavaScript**

```javascript
var proto = Object.create(HTMLElement.prototype);
proto.createdCallback = function() {
  // Shadow DOM を追加
  var root = this.createShadowRoot();
  // Template を追加
  var template = document.querySelector('#template');
  var clone = document.importNode(template.content, true);
  root.appendChild(clone);
}
var XComponent = document.registerElement('x-component', {
  prototype: proto
});
```

You can see the actual code here.

## Browser Support
As of November 2014, Custom Elements are supported in Chrome, Opera, and, if flagged, Firefox. Check the latest support status at [chromestatus.com](https://www.chromestatus.com/features/4642138092470272) or [caniuse.com](http://caniuse.com/#feat=custom-elements). A polyfill, [webcomponents.js](http://webcomponents.org/polyfills/) (formerly [platform.js](https://github.com/Polymer/platform)), is also available.

## Summary
What did you think? As mentioned in the [link above](http://webcomponents.org/articles/interview-with-joshua-peek/), Custom Elements are relatively easy to implement polyfills for compared to other Web Components (they work with IE9), and they seem to be in use on GitHub. Please give them a try!

If you would like to learn more about Custom Elements, please refer to the following documentation:

* [Custom Elements: Defining New Elements in HTML - HTML5Rocks](http://goo.gl/ozdC4Q)
* [Custom Elements Specification](http://w3c.github.io/webcomponents/spec/custom/)
