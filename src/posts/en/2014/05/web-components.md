---
layout: post
lang: en
title: 'Why Web Components will revolutionize web development'
description: ''
date: 2014-05-19
updated: 2014-07-12
tags:
- Template
- Shadow DOM
- Custom Elements
- HTML Imports
- Web Components
translationOf: /2014/05/web-components.html
translated: 2025-11-29
translatedManually: false
---

{% YouTube 'T5y_lmLngAk' %}

<!-- excerpt -->

If you're involved with the front-end of web applications, there are probably very few people who haven't heard of the term Web Components. There are already many related articles, and many people have started to use it. But how many of you can succinctly explain to those around you why this is such a revolutionary technology? In this article, I'd like to attempt to do just that.

## Digital parts distribution revolution

Major changes are currently occurring in the distribution of software components.

Remember the open source environment of a few years ago? Repositories were centrally managed using Subversion, releases were done using zip files, and testing was done manually. Each project had its own bug management system for registering issues, which made it difficult to get started and sending patches a pain.

The open source environment has undergone remarkable development, beginning with the emergence of git and GitHub. With the establishment of network repository environments, automated testing and deployment through CI (Continuous Integration), and the development of package managers that allow for easy downloading of the latest source code when needed, everything has become easier and faster. The cycle from development to reuse of software components has been shortened to minutes, stimulating feedback and contributions (patch/pull requests) through the community, and systems for improving quality have become more efficient than ever before. It's no exaggeration to say that open source is finally gaining a true ecosystem.

This trend has also been extremely useful in front-end development. In particular, the combination with grunt,
npm, bower, etc. has become quite widespread.

## UI Component Ecosystem

One of the most successful front-end software to date is [jQuery](http://jquery.com/). Many developers utilize plugins like [jQuery UI](http://jqueryui.com/), which not only allow for DOM manipulation but also allows for the easy creation of complex UIs. jQuery UI also significantly lowered the barrier to implementing user interfaces that are difficult to achieve with plain HTML, such as calendar UIs (datepickers), tabbed interfaces, and dialog boxes.

[![](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)

Of course, many competing UI libraries have also emerged, including Kendo UI,
ExtJS, Dojo, Bootstrap, and the list goes on and on. However, one thing is certain:
each has its own unique philosophy and approach. Therefore, to actually use one,
you must start by learning the philosophy and approach, rather than the API.
Also, with so many options, different people have different preferences and are better suited to different libraries. Therefore, if you're forced to choose one for a project, it's important to remember that someone will have to compromise or incur additional learning costs.

Web Components

So, what if UI libraries could be used with the same philosophy and practices? In other words, "what if the philosophy and practices of UI components were standardized?"

The answer is [Web Components](http://webcomponents.org/). Web Components have the following features:

* Planned to become a **web standard**
* Can be used as an extension of existing HTML/CSS/JavaScript knowledge
* **UI components can be created as HTML tags**
* Components are **encapsulated, so they do not pollute the outside world**
* **Reusable**
* Easy division of labor

It's easier to understand by seeing it in action than by reading about it in theory. Here's a simple example.

[![](https://3.bp.blogspot.com/-S7lGeyTaSj0/U3oPRGV-xJI/AAAAAAAAsO0/ZcSH2kFqkcI/s1600/Screen+Shot+2014-05-19+at+13.32.44.png)](https://agektmr.github.io/webaudio-controls/sample1.html)

Click on the image to see a working demo (http://agektmr.github.io/webaudio-controls/sample1.html). The source code for this demo is available here (https://github.com/WebMusicDevelopersJP/webaudio-controls). These cool-looking knobs were created using Web Components (Polymer). Drag them up and down to increase or decrease the parameter. Hold down the `Shift` key while dragging to increase or decrease the parameter by one. The changed parameter will be set to `value`.

```html
<webaudio-knob
  diameter="64"
  max="100"
  sprites="100"
  src="img/LittlePhatty.png"
  step="1"
  style="left: 128px; position: absolute; top: 76px;" tooltip="Knob2 tooltip" value="50">
</webaudio-knob>
```

Best of all, if you look at the source, you'll notice that these elements use the `<webaudio-knob>` tag. The knob's appearance and range can be customized using attributes, just like with native HTML elements.

What I want you to pay attention to is what is in the `head` tag

```html
<link href="webcomponents/webaudio-controls.html" rel="import"></link>
```

This line enables the use of `<webaudio-knob>` (and actually loads the polyfill platform.js). Wouldn't it be great if you could achieve this with just HTML tags, without any JavaScript?

As Web Components become mainstream, users will be able to treat UI components just like native DOM elements, without worrying about ideology or conventions.

I'd like to see some more examples

As a simple example, how about [Twitter
Button](https://github.com/zenorocha/twitter-button)?
By providing the necessary information as attributes using `<twitter-button></twitter-button>`,
you can display a Twitter button. If you've ever implemented a Twitter button, you'll know how easy this is.

[![](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)

You can also find publicly available UI components made with Web Components on the site [customelements.io](http://customelements.io/).

Here's a perfect video for you. At a recent Google event called [All About Polymer](http://www.meetup.com/sfhtml5/events/169452272/), [Rob Dodson](https://plus.google.com/+RobDodson/posts) demonstrated live coding of an app using Google Maps. It's impressive to see how a flashy app can be created by simply adding tags. It's in English, but with subtitles, so be sure to check it out and practice your English.

<div class="video-wrap">
  <iframe src="//www.youtube.com/embed/75EuHl6CSTo"></iframe>
</div>

## Building blocks of Web Components

Here's a bit of technical explanation: Web Components is made up of four main technologies:

*Custom Elements
*HTML Imports
*Template
* Shadow DOM

Let's briefly explain each technology.

### Custom Elements

This allows the browser to recognize your custom tag.
This tag can have properties, methods, and events, making it similar to native DOM
elements.
In the example above, `<webaudio-knob></webaudio-knob>`:

```javascript
var knob = document.querySelectorAll('webaudio-knob')[0];
knob.setValue(100);
```

This will change `value` to imperative (the opposite of declarative) from JavaScript.

```javascript
knob.value = 100;
```

You can also do this.

In fact, Custom Elements are already being used on GitHub.

[![](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)

Looking at it in DevTools

[![](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)

* The `time` tag is extended (`is="relative-time"`) to make the time displayed within the tag relative.
* The `title-format` attribute is used to specify the format for the date and time displayed in the tooltip.

That's how it seems to be used.

For unsupported browsers, it seems they also use Polymer Custom Elements
Polyfills. I was amazed by how it works.

### Template

It provides standard template functionality.
The concept of templates has been under consideration for a long time. Recently, Handlebars.js,
Backbone.js (Underscore), and AngularJS templates have become popular, but think of this as a web-standards version of those. Compared to existing hacks,

* No matter where you place it, the template is not recognized as DOM, so it won't execute the script or retrieve images.
* When you import it, it's recognized as DOM rather than a string, making it easy to handle.

It provides functions that seem possible but are not. Please note that it does not provide placeholder or binding functions.

### HTML Imports

You can load multiple resources with a single tag. 
Whether it's jQuery UI or Bootstrap, you had to include JavaScript, CSS, etc. separately. By using the import tag, you can include UI components and their required resources with a single tag.

Shadow DOM

You can add encapsulated HTML elements.
At first glance, the effect is that you can add invisible markup, but its bigger role is
encapsulation. A common pitfall with UI libraries is

* Using the same class name can cause styles to be applied to unintended elements.
* Styles applied to other elements can affect unintended areas.

But Shadow DOM enables encapsulation by separating the outside world from the inside world.

## Browser vendors' stance

Although we said we are aiming for standardization, standardization cannot be achieved unless browser vendors are on the same page. However, each browser vendor is focusing on Web Components, and is working on implementation and specification development in parallel.

### Google

Google plays the largest role in Web Components. All of the specifications were written by Google engineers. Google Chrome has already implemented most of the features, and version 36 will incorporate HTML Imports, meaning all features will work without the `about:flags` flag. Also, while still in alpha, they are developing a framework based on Web Components called [Polymer](http://www.polymer-project.org/). Once completed, they are working to enable various components to run on it. At the same time, they are also developing a polyfill (a library that emulates functionality in JavaScript) called [platform.js](https://github.com/Polymer/platform) to enable Web Components to work in browsers that do not support it.

### Mozilla

After Google, Mozilla is undoubtedly the most active developer of Web Components. They've developed a framework called [x-tag](http://www.x-tags.org/) and have also released a collection of UI components called [Brick](http://mozilla.github.io/brick/).

### Apple

When Blink was forked from WebKit, Shadow DOM was removed, and at one point, support for Web Components was seen as negative. However, [it was recently announced that development would proceed on a separate branch](https://lists.webkit.org/pipermail/webkit-dev/2014-February/026251.html)
and people are now interested, albeit cautiously.

### Microsoft

As far as Microsoft's support for Web Components is concerned, both features are currently under consideration, as seen on [status.modern.ie](http://status.modern.ie/), but they are showing interest, including [related to the HTML Templates specification](http://www.w3.org/TR/html-templates/).

## Use Cases

In what situations can you use Web Components? Here are some examples:

### Create product-specific UI components

When developing a service, we design it with the UI as a component.
This allows the team creating the UI components to focus on their functionality, and the team using them can proceed with development with the assumption that the interface will work as expected.
One of the benefits of Web Components is that it makes division of labor easier.

### Creating shared UI components across multiple services

Companies that operate portal sites or sites that integrate multiple services often want to unify the theme and UI. This is where Web Components can really shine. Many sites already have infrastructure in place to deliver CSS and images from a common server, so this can be achieved by replacing it with Web Components.

### Use public UI components

If you want to create a simple service on your own, it can be quite a hassle for a developer to handle the design as well. While it's great to have ready-made UIs like Bootstrap, Web Components make it relatively easy to achieve more complex designs. By searching for and reusing publicly available Web Components libraries on sites like [customelements.io](http://customelements.io/), you can significantly reduce development time. While there aren't many of them yet, as Web Components become more widespread, it may actually become more difficult to find the ones you need.

## Where to learn

If you've read this far and are excited to try Web Components, where can you learn how to use them? It sounds like a lot of work to read the specs, right? A spec is just a spec, so it doesn't tell you how to use it. Fortunately, there are already many articles on HTML5Rocks. These articles are maintained, so you can rest assured that they follow the latest specifications (implementations).

However, HTML5Rocks articles are written in English, so it can be difficult to read them... For those of you who find it difficult, I have translated them into Japanese.

* [Custom Elements - Defining New Elements in HTML](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/)
* [HTML Template Tags Now Available - Standardizing Client-Side Templates](http://www.html5rocks.com/ja/tutorials/webcomponents/template/)
* [HTML Imports - #include for the Web](http://www.html5rocks.com/ja/tutorials/webcomponents/imports/)
* [Shadow DOM
101](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom/)
* [Shadow DOM 201 - CSS and Styling](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - Advanced Concepts and DOM API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)

## Other Japanese materials

* [Revolutionizing Web Developers! A Super Introduction to "Web Components"
](http://liginc.co.jp/web/html-css/html/58267) This article by LIG King
is the first hit in a search, but unfortunately, the specifications have changed considerably since then. However, I think it's a very good resource for understanding the overall framework, so I highly recommend taking a look.
* [Componentizing HTML with Web Components
](http://ameblo.jp/ca-1pixel/entry-11815188808.html) This is an article from CyberAgent's
@1000ch. Since it's a recent article, it's up to date with the latest specifications, so you can read it with confidence.
* [I'm Creating Shadow DOM and Web Components Because I Want to Make the Web Right
](http://www.youtube.com/watch?v=GCw4fJEEVe8) This is a video of a talk given at last year's HTML5 Conference by [Hayato Ito](https://plus.google.com/+HayatoIto/posts), an engineer at Google Japan, a Shadow DOM specification editor, and a leader in the implementation of Shadow DOM on Blink.
* [Polymer and Web Components ](http://steps.dodgson.org/b/2013/05/19/polymer-and-web-components/) A 2013 article by a Google engineer about Web Components. It covers not only Web Components but also the concept of Polymer.

## Where are the questions?

If you're asking in Japanese, I'm sure someone will answer you if you ask on the [html5j mailing list](https://groups.google.com/group/html5-developers-jp). If you're asking in English, I recommend [using the polymer tag on StackOverflow](http://stackoverflow.com/questions/tagged/polymer).

## summary

If someone asks me, "What's so great about Web Components?" I'd answer:

**Web Components is a technology that dramatically improves development efficiency by standardizing web UI components and incorporating them into an ecosystem.**

We look forward to seeing all of your amazing UI components!
