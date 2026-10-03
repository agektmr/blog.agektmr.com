---
layout: post
lang: en
title: Why Web Components Will Revolutionize Web Development
date: 2014-05-19
updated: 2014-07-12
tags:
  - Template
  - Shadow DOM
  - Custom Elements
  - HTML Imports
  - Web Components
comments: false
categories: Web Components
translationOf: /2014/05/web-components.html
translated: 2026-10-03
translatedManually: false
---
{% YouTube 'T5y_lmLngAk' %}

<!-- excerpt -->

If you are involved in front-end web application development, chances are you have already heard of Web Components.
Numerous articles have already been published, and many of you may have already started experimenting with it. However, how many people can concisely explain to those around them why this is a revolutionary technology? In this post, I would like to try to do just that.

## The Distribution Revolution for Digital Components

A major shift is happening in how software components are distributed.

Do you remember the open-source environment from just a few years ago? Repositories were centralized on Subversion, releases were distributed as zip files, and testing was manual. Issue tracking relied on different bug tracking systems for each project, making them cumbersome to get involved with, and submitting patches was a hassle.

Starting with the emergence of Git and GitHub, the environment surrounding open source has evolved dramatically. Networked repositories are well-established, testing and deployment are automated through CI (Continuous Integration), and a wealth of package managers allow you to easily download the latest source code whenever you need it—everything has become easier and faster. By reducing the cycle from developing software components to reusing them down to minutes, community feedback and contributions (Patches / Pull Requests) have also become more vibrant, and the mechanisms for improving quality have become more efficient than ever. It is no exaggeration to say that open source is finally gaining a true ecosystem.

This movement has also brought immense benefits to front-end development. Combinations with tools like Grunt, npm, and Bower, in particular, have become quite widespread, haven't they?

## The UI Component Ecosystem

Among the most successful front-end software to date is [jQuery](http://jquery.com/). Many developers likely use plugins like [jQuery UI](http://jqueryui.com/) to easily implement complex UIs in addition to DOM manipulation. jQuery UI significantly lowered the bar for implementing user interfaces that vanilla HTML struggled with, such as calendar UIs (Datepicker), tabbed interfaces, and dialogs.

[![](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)](https://3.bp.blogspot.com/-GoHPt1aa4Ko/U3oPR4DsaOI/AAAAAAAAsPA/xxC4YVCyb0s/s1600/jquery-ui-delta.png)

Of course, many rival UI libraries have also emerged: Kendo UI, ExtJS, Dojo, Bootstrap, and countless others. But one thing is certain: each has its own philosophy and conventions. Therefore, to actually use them, you must start by learning the philosophy and conventions before you even get to the API.
Moreover, having so many options means everyone has their own preferences and libraries they excel at. When a project forces you to choose just one, someone inevitably has to compromise, and we shouldn't forget the added learning costs involved.

## Web Components

What if UI libraries could be used with the same philosophy and conventions? Put another way, "What if the philosophy and conventions of UI components were standardized?"

The answer to that is [Web Components](http://webcomponents.org/). Web Components features the following characteristics:

* Slated to become a **web standard**
* Can be used as an extension of existing HTML / CSS / JavaScript knowledge
* Allows you to create **UI components as HTML tags**
* Components are **encapsulated, so they do not pollute the outside scope**
* **Reusable**
* Facilitates division of labor

Rather than explaining the theory, it is much quicker to see something working in practice. Let me introduce a simple example.

[![](https://3.bp.blogspot.com/-S7lGeyTaSj0/U3oPRGV-xJI/AAAAAAAAsO0/ZcSH2kFqkcI/s1600/Screen+Shot+2014-05-19+at+13.32.44.png)](https://agektmr.github.io/webaudio-controls/sample1.html)

Click the image to see a [live demo](http://agektmr.github.io/webaudio-controls/sample1.html). You can find the [source code for this demo here](https://github.com/WebMusicDevelopersJP/webaudio-controls).
These cool-looking knobs are built with Web Components (Polymer).
Dragging them up and down increases or decreases parameters. Holding the `Shift` key while dragging moves them in increments of 1. The modified parameter is then reflected in `value`.

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

Above all, when you inspect the source code, you will notice that these elements use the `<webaudio-knob>` tag. The appearance of the knob and the range of values can be changed using attributes, following standard native HTML element conventions.

Pay attention to this line inside the `head` tag:

```html
<link href="webcomponents/webaudio-controls.html" rel="import"></link>
```

This single line makes using `<webaudio-knob>` possible (in reality, it also loads the platform.js polyfill). Doesn't it seem remarkably straightforward if you can achieve this purely with HTML tags without any JavaScript?

Once Web Components becomes mainstream, users will be able to handle UI components just like native DOM elements, without worrying about conflicting philosophies or conventions.

## Want to See a Few More Concrete Examples?

As an easy-to-understand example, how about the [Twitter Button](https://github.com/zenorocha/twitter-button)?
By writing `<twitter-button></twitter-button>` and providing the required information via attributes, you can display a Twitter button. Anyone who has ever implemented a Twitter button will appreciate just how effortless this is.

[![](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)](https://4.bp.blogspot.com/-poErBXaS0QM/U3oPREvTnYI/AAAAAAAAsOw/g635hFv-EFE/s1600/687474703a2f2f7a6e6f2e696f2f517475532f747769747465722d656c656d656e742e706e67.png)

Furthermore, on a site called [customelements.io](http://customelements.io/), you can search for publicly available UI components built with Web Components, including this one.

There is also a perfect video for this. At an event held at Google called [All About Polymer](http://www.meetup.com/sfhtml5/events/169452272/), [Rob Dodson](https://plus.google.com/+RobDodson/posts) did a live coding session building an app using Google Maps. Watching a flashy app come together just by adding a few tags is truly impressive. It is in English with subtitles available, so please check it out.

<div class="video-wrap">
  <iframe src="//www.youtube.com/embed/75EuHl6CSTo"></iframe>
</div>

## Building Blocks of Web Components

Let's dive into a brief technical explanation. Web Components consists primarily of four technologies:

* Custom Elements
* HTML Imports
* Template
* Shadow DOM

Let's briefly look at each technology.

### Custom Elements

Makes the browser recognize custom tags.
These tags can have properties, methods, and events, allowing them to provide the same usability as native DOM elements.
In the `<webaudio-knob></webaudio-knob>` example above:

```javascript
var knob = document.querySelectorAll('webaudio-knob')[0];
knob.setValue(100);
```

By doing this, you can change `value` imperatively (as opposed to declaratively) from JavaScript.

```javascript
knob.value = 100;
```

You can also do it this way.

In fact, Custom Elements are already being used on GitHub.

[![](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)](https://4.bp.blogspot.com/--2iDG5Utfx8/U3oPRLoIwrI/AAAAAAAAsOs/1RaBIcB4egA/s1600/Screen+Shot+2014-05-19+at+18.28.12.png)

Looking at DevTools:

[![](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)](https://1.bp.blogspot.com/-xJAxVXmp534/U3oPR13ZjrI/AAAAAAAAsO8/-b_sUpEVTF4/s1600/Screen+Shot+2014-05-19+at+18.39.14.png)

* Extending the `time` tag (`is="relative-time"`) to make the time displayed inside the tag relative
* Using the `title-format` attribute to specify the date/time format displayed in the tooltip

It appears they are using it in ways like this.

For unsupported browsers, it seems they are also [using](https://twitter.com/joshpeek/status/464153518169792513) the [Polymer Custom Elements Polyfill](https://github.com/Polymer/CustomElements). Just looking at this makes you appreciate how elegant it is.

### Template

Provides a standardized templating feature.
The concept of templates has been under discussion for a long time. Recently, templates from Handlebar.js, Backbone.js (Underscore), and AngularJS have been popular; think of this as the web standard version. Compared to existing hacks, it provides features that were previously impossible or cumbersome, such as:

* No matter where it is placed, the contents inside the template are not recognized as part of the live DOM, so it won't execute scripts inside or fetch images on its own.
* When imported, it can be handled as a DOM fragment rather than a string, making it much easier to work with.

Note that it does not provide placeholders or data-binding capabilities by itself.

### HTML Imports

Allows you to load multiple resources with a single tag.
Whether using jQuery UI or Bootstrap, you had to load JavaScript, CSS, and other assets separately. With the import tag, you can pull in a UI component along with all of its required resources using just this one tag.

### Shadow DOM

Allows you to add encapsulated HTML elements.
At a glance, the visible effect is that you can add hidden markup, but its far more significant role is encapsulation. Common pitfalls in UI libraries include:

* Unintentionally styling other elements because of colliding class names
* Styles applied to one element leaking out and affecting unintended parts of the page

Shadow DOM enables encapsulation by separating the outside world from the inside world.

## Browser Vendors' Stance

While I mentioned that the goal is standardization, it cannot become a standard unless browser vendors are aligned. However, all major browser vendors are paying close attention to Web Components, progressing implementation and specification drafting in parallel.

### Google

Google plays the most prominent role in Web Components. The specification authors are all Google engineers, and Google Chrome has already implemented most features. In version 36, HTML Imports is expected to land, making all features functional without needing flags in `about:flags`.
Furthermore, while still in alpha, Google is developing a framework called [Polymer](http://www.polymer-project.org/) based on Web Components, preparing an environment where various components can run on top of it once complete. Alongside Polymer development, the [platform.js](https://github.com/Polymer/platform) polyfill (a library emulating features in JavaScript) is also being actively developed to ensure compatibility with browsers that do not yet support Web Components.

### Mozilla

Next to Google, Mozilla is undoubtedly the most proactive in working on Web Components. They are developing a framework called [x-tag](http://www.x-tags.org/) and have also released a UI component collection called [Brick](http://mozilla.github.io/brick/).

### Apple

When Blink was forked from WebKit, Shadow DOM was initially removed, leading some to believe Apple was opposed to supporting Web Components. However, [they recently announced that development would proceed on a separate branch](https://lists.webkit.org/pipermail/webkit-dev/2014-February/026251.html), showing interest while monitoring the situation.

### Microsoft

Regarding Microsoft's support for Web Components, according to [status.modern.ie](http://status.modern.ie/), all features are currently Under Consideration. However, they have shown interest, such as [participating in the HTML Templates specification](http://www.w3.org/TR/html-templates/).

## Use Cases

In what kinds of scenarios can you use Web Components? Here are a few examples:

### Building Product-Specific UI Components

When developing a service, you design with componentizing UI in mind. This allows the team building the UI components to focus entirely on their functionality, while the team consuming them can proceed with development assuming the interface works as expected. Making division of labor easier is another major advantage of Web Components.

### Building Shared UI Components Across Multiple Services

For companies operating portals or sites that integrate multiple services, there is often a strong desire to unify themes and UI. That is precisely where Web Components shines. Many organizations already have the infrastructure to serve CSS and images from a shared server, so replacing that with Web Components makes this easily achievable.

### Using Publicly Available UI Components

When you want to build a small personal project, it can be quite tough for developers to handle everything down to the design. Being able to easily assemble a UI with ready-made designs like Bootstrap is great, but Web Components makes even more complex implementations relatively easy. By finding and reusing publicly available Web Components libraries on places like [customelements.io](http://customelements.io/), you will be able to drastically reduce development time. While the selection is still limited, as Web Components spreads, finding what you need might become the bigger challenge.

## Where to Learn More

If you've read this far and are eager to use Web Components, where should you go to learn how? Telling you to read the specs... would be daunting. Specifications are specifications; they don't teach you how to use the technology. Fortunately, many articles have already been published on HTML5Rocks. Since these articles are actively maintained, you can trust them to reflect the latest specifications (and implementations).

However, HTML5Rocks articles are in English, which might be tough to read for some... For those readers, I have provided Japanese translations:

* [Custom Elements - HTML に新しい要素を定義する](http://www.html5rocks.com/ja/tutorials/webcomponents/customelements/)
* [HTML で利用可能になった Template タグ - クライアントサイドのテンプレートの標準化](http://www.html5rocks.com/ja/tutorials/webcomponents/template/)
* [HTML Imports - ウェブのための #include](http://www.html5rocks.com/ja/tutorials/webcomponents/imports/)
* [Shadow DOM 101](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom/)
* [Shadow DOM 201 - CSS とスタイリング](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-201/)
* [Shadow DOM 301 - 上級者向けコンセプトと DOM API](http://www.html5rocks.com/ja/tutorials/webcomponents/shadowdom-301/)

## Other Japanese Resources

* [Web 開発者に革命をもたらす！「Web Components」超入門 ](http://liginc.co.jp/web/html-css/html/58267) An article by Mr. Wang at LIG that comes up first in search results. Unfortunately, the specifications have changed considerably since it was written. Nonetheless, it serves as a great resource for grasping the big picture, so it is definitely worth a read.
* [Web Components で行う HTML のコンポーネント化 ](http://ameblo.jp/ca-1pixel/entry-11815188808.html) An article by @1000ch from CyberAgent. Since it's a recent article, it reflects the newer specifications, so you can read it with confidence.
* [Web をまともにしたいので Shadow DOM と Web Components をつくってます ](http://www.youtube.com/watch?v=GCw4fJEEVe8) A video of a talk at last year's HTML5 Conference by [Hayato Ito](https://plus.google.com/+HayatoIto/posts), an engineer at Google Japan, editor of the Shadow DOM specification, and lead on the Shadow DOM implementation in Blink.
* [Polymer と Web Components ](http://steps.dodgson.org/b/2013/05/19/polymer-and-web-components/) A 2013 article by a Google engineer working on Web Components. In addition to Web Components itself, it covers concepts behind Polymer.

## Where to Ask Questions?

If you prefer Japanese, asking on the [html5j mailing list](https://groups.google.com/group/html5-developers-jp) should get you an answer from someone. In English, using the [polymer tag on StackOverflow](http://stackoverflow.com/questions/tagged/polymer) is a great option.

## Summary

If someone were to ask me why Web Components is so amazing, I would answer:

**Because Web Components standardizes UI components on the web and integrates them into the ecosystem, dramatically boosting development efficiency.**

I look forward to seeing the wonderful UI components everyone publishes!
