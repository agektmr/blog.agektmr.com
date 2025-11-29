---
layout: post
lang: en
title: 'What is Caja?'
description: ''
date: 2008-04-23
tags:
- Caja
  - JavaScript
  - OpenSocial
  - Shindig
translationOf: /2008/04/caja.html
translated: 2025-11-29
translatedManually: false
---

While researching OpenSocial, I came across the term Caja. I only knew that it was something that enabled secure JavaScript, so I decided to look into the details.

## Cross-site scripting and blog widgets

Those who have used blog services including hosting services such as goo, livedoor, and fc2 will know that some services allow you to post blog widgets, others do not, and some only allow some. Why is this?

Cookies have the characteristic that they can only reference scripts executed from the same domain. Many services take advantage of this by using cookies to store session information and browsing history. The reason the blog services listed above do not allow blog widgets is to protect this information from malicious JavaScript. Conversely, if JavaScript can be executed on the same domain, it could be possible to steal session information and browsing history. This is called XSS (Cross-Site Scripting).

XSS can occur when a posting form is used to embed and execute JavaScript on a page on that domain, but the ability to post blog widgets is also the same in the sense that JavaScript can be embedded, and on a properly designed site, this would be impossible.

However, there are blogs that do allow you to embed blog widgets, and there are several approaches to making this possible while avoiding security issues.

## Approaches for pasting JavaScript

### Separate domains

The domain that displays the blog is one that does not store critical cookies such as session information. If there is nothing to steal, there is no harm in getting a thief in. Livedoor Blog is an example of a site that takes this approach.

### Only allow JavaScript that has been verified to be safe

This approach involves the service provider creating a list of safe blog widgets, and blog administrators choosing from that list. This narrows the selection of blog widgets, which is not popular with users, but it is better than not being able to post any at all. Goo Blog and Hatena Diary have adopted this approach.

### Display in iframe

If you display it in a different domain within an iframe, you can handle it in the same way as "separating domains" above. iGoogle is an example of an approach that takes this approach. Although iGoogle is not a blog, if you think of blog parts as gadgets, you could say that it deals with the same problem.

### Neutralizing dangerous parts of JavaScript

Before the server outputs JavaScript, it rewrites and neutralizes the dangerous parts. I don't know if there are any blogs that take this approach, but I'm sure anyone can think of a way to do it. However, it requires a huge amount of effort and knowledge to achieve this. It would be wonderful if such an open source solution existed. And the tool that can achieve this is Caja, which I will introduce here.

## What you can achieve with Caja

Caja is pronounced "kaha." Caja is the name of a Google open source project that allows you to safely include external JavaScript in pages on the same domain.

[Caja Introduction (Japanese)](http://devlog.agektmr.com/wiki/index.php?JavaScript%2FCaja)

[List of attacks that Caja was designed to prevent during development](http://code.google.com/p/google-caja/wiki/AttackVectors)

## Where to use Caja

Caja appears to be designed for use on OpenSocial containers. The explanation in [Caja Introduction (Japanese)](http://devlog.agektmr.com/wiki/index.php?JavaScript%2FCaja) also assumes that applications will be used on Shindig, and states that displaying gadgets inline using Caja will improve performance.

## Caja Form

Actually, this is an area I haven't fully investigated yet, but it appears to be composed of server-side rewrites in Java and a JavaScript library. I think I need to look into this a bit more.

If anyone has any other information, please let us know.
