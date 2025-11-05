---
title: 'Thought about Ads in HTML5 era: HTML5 Soda Can'
layout: post
lang: ja
date: 2011-08-06
tags:
  - HTML5
  - CSS3
  - Device Orientation API
---
Let me introduce the "HTML5 Soda Can" demo I made
for [ThinkMobile2011](http://www.google.co.jp/events/thinkmobile2011/livestream.html) a
while ago.

[![](/images/2011/07/233b1844c6d899c679f560e35058d333-200x300.png "Soda Can 1")](http://demo.agektmr.com/sodacan/)

The original request was to come up with some ideas of HTML5 ads for audience at
the event. It isn't that hard just to create ads using HTML5, but since the
purpose was to show off to the audience, I needed to inject "wow" feeling as
well as to put clear sign that it's made of HTML5.

## Concept

Though there's still a lot of things which native apps can do while web apps
cannot do, it's an interesting challenge to make HTML5 apps work like native
apps. On the contrary, it's advantage of web apps that you can see the app
without installing.

So, here's the demo I have come up with: "Wow" enough HTML5-ish, instantly
experience-able and easily imagine-able of actual advertisement.

## Demo

[Soda Can](http://demo.agektmr.com/sodacan/): Please access using iPhone or iPad
(you can view on Chrome but don't break your MacBookPro!)

1. When loaded, you'll see a can "Google Soda". (It was originally Coke but for
   some reason, I asked [Jerome Senaillat](http://www.senaillat.com/) to make it
   up as "Google Soda".)
2. Try tilting your iPhone / iPad. You can find the can actually tilts inside
   your browser.
3. You know what soda is like? Try shake your device. Guess what???

[![](/images/2011/07/2bf6d446a21bf24a86472b536c525421-200x300.png "Soda Can 2")](http://demo.agektmr.com/sodacan/)

When the background turns red enough, try touching tab of the can. (sorry if
browser crashes…)

How was that? Doesn't this look interesting when you see it after clicking
banner ad of some kind of soda drinks?

## Technical Tricks

Could you guess how I did it? I assume you wondered how I did:

* 3D
* Detect device tilt
* Detect device shake
* That performance on smartphone

There's roughly 3 tricks:

* Cylinder is made of long and narrow DOM elements
* CSS3 3D Transform enables it three dimensional and fast enough (using GPU)
* Device Orientation detects tilt and gravity

The side of can is made of many (180) long and narrow divs with each background
images slightly shifted. Adding top and bottom of the can completes the shape.
GPU rendering doesn't make you feel like it's actually moving more than 180 DOM
elements when Device Orientation API detects device tilt and style changes.

I don't bother writing any more details since it's much easier reading the
source code. This is roughly the tricks.

## Summary

Asking users to install native app which is actually ad via ad sounds ridiculous
but what if that app is made of HTML5? It may directly lead to conversion.

I'm hoping to see interesting ideas of ads using HTML5 soon.
