---
layout: post
lang: en
title: 'HTML Imports - The technology that makes up Web Components'
description: 'This article explains HTML Imports, one of the elements that make up Web Components.'
date: 2015-01-07
image:
feature: /custom-elements-web-components/image.png
tags:
- HTML Imports
- Web Components
translationOf: /2015/01/html-imports-web-components.html
translated: 2025-11-29
translatedManually: false
---
*This article is a cross-post of [webcomponents.org article](http://webcomponents.org/articles/introduction-to-html-imports/).*

We've previously explained that using [Template](/2014/10/template-web-components.html), [Shadow DOM](/2014/11/shadow-dom-web-components.html), and [Custom Elements](/2014/11/custom-elements-web-components.html) allows you to create UI components for each function. However, it's inefficient to call the HTML, CSS, and JavaScript of a component that uses these methods separately.

Resolving dependencies is also not easy. Think of jQuery UI or Bootstrap. You had to write various resources such as JavaScript, CSS, and web fonts in separate tags as needed. It's easy to imagine how things could get complicated, especially with Web Components, which are supposed to treat each tag as a component.

HTML Imports allows you to load all of these resources together in a single HTML file.

<!-- excerpt -->

{% YouTube 'JhpOw8mq1jo' %}

## How to Use HTML Imports
To load a collection of resources into HTML, add the `rel` attribute of the `link` tag, specifying the URLs of the resources you want to load in the `import` and `href` attributes. For example, if you want to load an HTML file called component.html from an HTML file called index.html, you would write it like this:

index.html

```html
<link rel="import" href="component.html" >
```

The imported HTML can contain any resources, such as JavaScript, CSS, web fonts, etc., just like regular HTML:

component.html

```html
<link rel="stylesheet" href="css/style.css">
<script src="js/script.js"></script>
```

`doctype`, `html`, `head`, and `body` are not required. The HTML written in the imported document is loaded at the same time, and any JavaScript in subresources linked from there will be executed immediately.

## Resource Execution Order
So, if JavaScript is written in both the parent HTML and the imported child HTML, which one will execute first? Understanding this is very important, as the execution order may not be what you expect.

HTML Imports behave similarly to defer in script tags when loading. For example, in the code below, when index.html loads component.html, it will execute everything in component.html, including the script, before executing the next script.

index.html

```html
<link rel="import" href="component.html"> // 1.
<title>Import Example</title>
<script src="script3.js"></script>        // 4.
```

component.html

```html
<script src="js/script1.js"></script>     // 2.
<script src="js/script2.js"></script>     // 3.
```

1. Load component.html on the first line of index.html and wait for component.html to process.
2. Execute script1.js on the first line of component.html.
3. After script1.js on component.html has finished executing, execute script2.js on the second line.
4. After script2.js on component.html has finished executing, execute script3.js on the third line of index.html.

Note that `link[rel="import"]` can have the `async` attribute added. Adding `async` will continue loading the document without waiting for the process to complete, just like the `script` tag. If the order of execution is not critical, adding `async` may speed up the overall page load time.

## Origin barriers cannot be crossed.
For security reasons, HTML Imports cannot cross origin barriers. In other words, it is generally not possible to import a resource at [http://example.com/](http://example.com/) from [http://webcomponents.org/](http://webcomponents.org/]. (An origin is an exact match, including not only the domain but also the protocol (e.g., http/https), subdomain, and port number.)

To avoid this limitation, the server of the resource you are importing must support CORS (Cross Origin Resource Sharing). For more information about CORS, please read [here](http://www.html5rocks.com/tutorials/cors/) (English. [Translations welcome!](https://github.com/html5j-english/README)).

## window and document
Earlier, we mentioned that importing HTML loads its contents and executes JavaScript, but that doesn't mean the HTML will automatically appear in the browser. This requires additional JavaScript support.

When using JavaScript to move HTML between documents, it's important to note what `document` means in each context.

In fact, both refer to the HTML that imports them. In the sample code above, both the JavaScript in component.html and the JavaScript in index.html refer to `document` in index.html. So how can we make it point to `document` in the imported document?

To get `document` of component.html from index.html, reference the `import` property of the `link` tag.

index.html

```js
var link = document.querySelector('link[rel="import"]');
link.addEventListener('load', function(e) {
  var importedDoc = link.import; // component.html の document
});
```

If you want to get `document` of component.html in JavaScript of component.html, you would reference `document.currentScript.ownerDocument`.

component.html

```js
var mainDoc = document.currentScript.ownerDocument;
// mainDoc は component.html の document を指す
```

If you are using webcomponents.js (renamed from platform.js), use `document._currentScript` instead of `document.currentScript`.

component.html

```js
var mainDoc = document._currentScript.ownerDocument;
```

If you put the following code at the beginning of your JS, it will be handled transparently from `document._currentScript`.

```js
document._currentScript = document._currentScript || document.currentScript;
```

## Performance with HTML Imports
As mentioned above, the advantage of HTML imports is that they allow you to organize your components, but this also increases the number of resources you load. This naturally raises some concerns.

### Dependency Resolution
One concern is dependency resolution. For example, what happens if multiple included HTML files all load jQuery?

In fact, if you load jQuery resources directly from the imported HTML using the `script` tag, not only will two network requests be made, but the script itself will also be executed twice.

index.html

```html
<link rel="import" href="component1.html">
<link rel="import" href="component2.html">
```

component1.html

```html
<script src="js/jquery.js"></script>
```

component2.html

```html
<script src="js/jquery.js></script>
```

While it's possible to manage URLs and prevent them from being loaded multiple times, writing that code can be tedious. HTML Imports can solve this automatically.

Unlike the `script` tag, HTML Imports automatically omits loading multiple instances of the same resource and limits its execution to one instance at a time. For example, in the example above where jQuery is being loaded, instead of calling the jQuery resource directly, you can limit its loading and execution to one instance by wrapping it in HTML containing the `script` tag.

index.html

```html
<link rel="import" href="component1.html">
<link rel="import" href="component2.html">
```

component1.html

```html
<link rel="import" href="jquery.html">
```

component2.html

```html
<link rel="import" href="jquery.html">
```

jquery.html

```html
<script src="js/jquery.js"></script>
```

This way, js/jquery.js will only be loaded and executed once.

![](/images/html-imports-web-components/dependency.png)

However, this adds another concern: wrapping it in HTML means an additional network request. Is there anything we can do about this?

One way to solve this problem is with a tool called Vulcanize.

### Combining Network Requests
vulcanize is a tool that combines multiple HTML resources into one to reduce network requests. It can be installed with npm and used from the command line. It also provides tasks for Grunt and Gulp, making it convenient to incorporate into your build process.

To resolve dependencies starting from index.html in the sample code above:

```js
$ vulcanize -o vulcanized.html index.html
```

By running the above on the command line, it will resolve dependencies and generate an HTML file called vulcanized.html that aggregates resources.

For more information about vulcanize, please see [here](https://www.polymer-project.org/articles/concatenating-web-components.html).

## Using Templates, Shadow DOM, and Custom Elements in Combination
Let's take a look at an example of using Templates, Shadow DOM, Custom Elements, and HTML Imports in combination, using the code from [the previous article](http://webcomponents.org/articles/introduction-to-custom-elements/).

Templates allow you to declaratively define the content of an element. Shadow DOM allows you to confine styles, ids, classes, etc. within an element. Custom Elements allow you to use original tags with any tag name.

By combining these with HTML Imports, you can make custom components available to your web pages with just one tag.

x-component.html

```html
<template id="template">
  <style>
    ...
  </style>
  <div id="container">
    <img class="webcomponents" src="http://webcomponents.org/img/logo.svg">
    <content select="h1"></content>
  </div>
</template>
<script>
// This element will be registered to index.html
// Because `document` here means `document` in index.html
var XComponent = document.registerElement('x-component', {
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {
        var root = this.createShadowRoot();
        var template = document.querySelector('#template');
        var clone = document.importNode(template.content, true);
        root.appendChild(clone);
      }
    }
  })
});
</script>
```

index.html

```html
  ...
  <link rel="import" href="x-component.html">
</head>
<body>
<x-component>
  <h1>This is Custom Element</h1>
</x-component>
...
```

Because the document of the imported HTML (x-component.html) points to the document of the importing index.html, it should work fine without any special modifications.

## Browser Support
As of December 2014, HTML Imports is supported in Chrome, Opera, and, if flagged, in Firefox. (Update: [Mozilla has announced that it will no longer ship HTML Imports due to conflicts with ES6 Modules](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/)). Check the latest support status at [chromestatus.com](https://www.chromestatus.com/features/4642138092470272) or [caniuse.com](http://caniuse.com/#feat=custom-elements). A polyfill is also available: [webcomponents.js](http://webcomponents.org/polyfills/) (formerly [platform.js](https://github.com/Polymer/platform)).

## Summary
What do you think? If you want to learn more about HTML Imports, please refer to the following documents:

* [HTML Imports: #include for the Web - HTML5Rocks](http://goo.gl/EqeOBI)
* [HTML Imports Specification](http://w3c.github.io/webcomponents/spec/imports/)
