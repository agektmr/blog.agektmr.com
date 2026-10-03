---
title: What is Caja?
layout: post
lang: en
date: 2008-04-23
tags:
  - Caja
  - JavaScript
  - OpenSocial
  - Shindig
translationOf: /2008/04/caja.html
translated: 2026-10-03
translatedManually: false
---
When researching things around OpenSocial, you often run into the term Caja. I only knew that it was something designed to achieve secure JavaScript, so I decided to look into the details.

## Cross-Site Scripting and Blog Widgets

Those who have used hosted blogging services like goo, livedoor, or fc2 probably know that depending on the service, some allow embedding blog widgets (blog parts), some don't, and some only permit certain ones. Why is that?

Cookies have a property where they can only be accessed by scripts executed from the same domain. Leveraging this, many services use cookies as a storage location for session information and browsing history. The reason the aforementioned blog services disallow blog widgets is to protect this information from malicious JavaScript. Conversely, if JavaScript can be executed on the same domain, those session details and browsing histories can be stolen. This is called XSS (Cross-Site Scripting).

XSS can occur when someone uses a submission form to embed and execute JavaScript on a page within that domain. However, allowing arbitrary blog widgets is essentially the same in the sense that it allows embedding JavaScript; any properly built site would never normally permit this.

That said, blogs where you can actually embed blog widgets do exist, and there are several approaches to achieving this while sidestepping security issues.

## Approaches to Embedding JavaScript

### Separating Domains

Host the blog on a domain that doesn't store critical cookies such as session information. If there's nothing to steal, having a burglar break in causes no harm. livedoor Blog is an example that takes this approach.

### Permitting Only Verified Safe JavaScript

In this approach, the service provider curates a list of safe blog widgets, and blog owners can choose from them. Users generally dislike this because it narrows their widget options, but it's certainly better than not being able to embed anything at all. goo Blog and Hatena Diary take this approach.

### Rendering in an iframe

If you render it inside an iframe served from a different domain, it can be treated just like the "Separating Domains" approach mentioned above. iGoogle is an example that takes this approach. While iGoogle isn't a blog, if you equate blog widgets with gadgets, it addresses the same problem.

### Neutralizing Dangerous Parts of JavaScript

Before the server outputs the JavaScript, it rewrites and neutralizes the dangerous parts. I don't know if any blogs actually take this approach, but the idea itself is something anyone could think of. However, implementing it requires an immense amount of effort and knowledge. How wonderful would it be if something like this existed as open source? And what makes this possible is Caja, which I'm introducing today.

## What Caja Can Achieve

Caja is pronounced "KA-ha". Caja is the name of an open-source project by Google that allows you to safely embed third-party JavaScript on a page hosted under the same domain.

[Introduction to Caja (Japanese Translation)](http://devlog.agektmr.com/wiki/index.php?JavaScript%2FCaja)

[List of attack vectors intended to be prevented using Caja during development](http://code.google.com/p/google-caja/wiki/AttackVectors)

## Where Caja is Used

Caja seems to be built with usage within OpenSocial containers in mind. The explanation in [Introduction to Caja (Japanese Translation)](http://devlog.agektmr.com/wiki/index.php?JavaScript%2FCaja) also assumes running applications on Shindig, noting that rendering gadgets inline using Caja improves performance.

## The Architecture of Caja

To be honest, this is an area I haven't fully researched yet, but it seems to consist of server-side rewriting in Java and a JavaScript library. I'll need to look into this a bit more.

If anyone has more information on this, please let me know!
