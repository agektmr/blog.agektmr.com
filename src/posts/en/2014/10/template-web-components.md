---
layout: post
lang: en
title: Template - A technology that makes up Web Components
description: I will explain Templates, one of the elements that make up Web Components.
date: 2014-10-14
updated: 2014-10-16
author: Eiji Kitamura
tags:
  - Template
  - Web Components
blogger_id: tag:blogger.com,1999:blog-1878759997851918856.post-7514316136270000024
blogger_orig_url: http://blog.agektmr.com/2014/10/template-web-components.html
translationOf: /2014/10/template-web-components.html
translated: 2026-10-03
translatedManually: false
---
*This article is cross-posted from [an article on webcomponents.org](http://webcomponents.org/articles/introduction-to-template-element/).*

I recently published a video about Templates, one of the constituent technologies of Web Components, and wanted to walk through it here.

<!-- excerpt -->

{% YouTube 'qC5xK6H0GlQ' %}

## Why Templates Now?

For developers, the benefit of using templates is that they make division of labor with designers much easier.

When building websites, templates used to be primarily implemented on the server side using technologies like PHP, Python's Django, or Ruby on Rails. Over the past few years, however, client-side templating processed directly in the browser has emerged and grown in popularity.

This shift is driven by changes in overall architecture brought about by the evolution of open web technologies like HTML5. The division of roles has advanced further—servers process data, while clients format and present it to users. It could be said that we are in a transition period where MVC (Model, View, Controller), once confined entirely to the server, now spans across both client and server to take on clearer roles.

Along with this, momentum built around the need for MVC-like architectures on the client side, and frameworks such as AngularJS, Backbone.js, and Ember.js have seen widespread adoption. By using frameworks that leverage templates, designers responsible for the HTML and CSS presentation can focus purely on declarative approaches, which are relatively easier than imperative ones, thereby boosting overall team productivity.

When it comes to client-side template engines, JavaScript-based solutions like [Mustache.js](http://mustache.github.io/), [Handlebar.js](http://handlebarsjs.com/), [AngularJS](https://angularjs.org/), and [Backbone.js](http://backbonejs.org/) have gained popularity. However, these solutions also come with several challenges that need addressing.

### The div Tag Approach

In this approach, you embed a template inside a `div` hidden with `display:none;` and clone it when it needs to be displayed. The downside is that resources like images are fetched from the server even before they are actually used, sacrificing performance.

```html
<div style="display:none;">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</div>
```

### The script Tag Approach

Here, templates are embedded in a `script` tag with a `type` attribute other than `text/javascript`, and cloned when needed. A major drawback of this approach is that it requires using `.innerHTML`, which introduces security risks.

```html
<script type="text/template">
  <div>
    <h1>Web Components</h1>
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</script>
```

This is where the `<template>` element comes in.  
`<template>` is a candidate web standard that forms part of Web Components, allowing you to embed "inert HTML" directly into the document.

"Inert HTML" has the following characteristics:

* Even if it contains `script` tags, the scripts do not execute until actually used.
* Even if it contains resources like `img` or `video`, it does not fetch them from the server until actually used.

## How to Use Templates

To declare a template, wrap the desired HTML inside a `<template>` tag. To actually use it, you will need to use JavaScript.

HTML

```html
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img src="http://webcomponents.org/img/logo.svg">
  </div>
</template>
```

JavaScript

```html
<script>
  var template = document.querySelector('#template');
  var clone = document.importNode(template.content, true);
  var host = document.querySelector('#host');
  host.appendChild(clone);
</script>
<div id="host"></div>
```

You can view the working code [here](http://jsbin.com/qaxiw/6/edit).

You clone the queried `template` node using `document.importNode()`. Passing `true` as the second argument clones the contents of the node recursively. It is only when you `appendChild()` this clone to another node that the template truly comes to life. In other words:

* If the template contains a `script` tag, it executes only after being appended.
* If the template contains resources such as images, they start loading only after being appended.
* If the template contains a `style` tag, it takes effect only after being appended.

## Caveats

There is one thing to keep in mind. If you have used existing template engines or have already played with Polymer, you might wonder how to:

**Embed variables using placeholders**

```html
<template bind="{{items}}"></template>
```

**Express iteration**

```html
<template repeat="\{\{item in items}}"></template>
```

**Handle conditional branching**

```html
<template if="{{item.active}}"></template>
```

However, this is called data binding, which is a separate feature distinct from templates themselves. If you want to use such capabilities with templates without having to implement them yourself, I recommend using a framework like [Polymer](http://www.polymer-project.org/) ([TemplateBinding](https://github.com/Polymer/TemplateBinding)) or [x-tags](http://www.x-tags.org/).

## Browser Support

As of October 2014, the `<template>` element is supported in Chrome, Opera, Safari, and Firefox. If you want to check availability in browsers you plan to support, visit chromestatus.com. To use the `<template>` element in unsupported browsers like Internet Explorer, a polyfill called [platform.js](https://github.com/polymer/platform) is available.

## Conclusion

What do you think? While Templates was designed primarily with the concept of Web Components in mind, there are likely many other use cases. Give Templates a try and build some great Web Components! Also, if you come up with any unique use cases, please let me know.

If you would like to learn more about Templates, the following resources should be helpful:

* [HTML's New Template Tag - HTML5Rocks](http://goo.gl/JEIWir)
* [WHATWG HTML Templates Specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/scripting-1.html#the-template-element)
