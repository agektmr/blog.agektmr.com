---
title: "Thoughts on Ads in the HTML5 Era: HTML5 Soda Can"
layout: post
lang: en
date: 2011-08-06
tags:
  - HTML5
  - CSS3
  - Device Orientation API
translationOf: /2011/08/thinking-about-ads-in-html5-era-html5-soda-can.html
translated: 2026-10-03
translatedManually: false
---
Let me introduce the "HTML5 Soda Can" demo I made for [ThinkMobile2011](http://www.google.co.jp/events/thinkmobile2011/livestream.html) a while ago.

[![](/images/2011/07/233b1844c6d899c679f560e35058d333-200x300.png "Soda Can 1")](http://demo.agektmr.com/sodacan/)

The original request was to come up with some ideas for HTML5 ads for the audience at the event. It isn't that hard just to create ads using HTML5, but since the purpose was to show off to the audience, I needed to inject a "wow" factor as well as make it clearly evident that it's made with HTML5.

## Concept

Although there are still many things that native apps can do which web apps cannot, it's an interesting challenge to make HTML5 apps behave like native apps. On the flip side, an advantage of web apps is that you can experience them without having to install anything.

So, here is the demo I came up with: featuring enough of a "wow" factor and HTML5 flavor, instantly experienceable, and easy to imagine as a real-world advertisement.

## Demo

[Soda Can](http://demo.agektmr.com/sodacan/): Please access it using an iPhone or iPad (you can view it in Chrome, but don't break your MacBook Pro!).

1. When loaded, you'll see a can of "Google Soda". (It was originally Coke, but for various reasons, I asked [Jerome Senaillat](http://www.senaillat.com/) to redesign it as "Google Soda".)
2. Try tilting your iPhone or iPad. You'll see that the can actually tilts inside your browser.
3. You know what soda is like, right? Try shaking your device. Guess what happens?

[![](/images/2011/07/2bf6d446a21bf24a86472b536c525421-200x300.png "Soda Can 2")](http://demo.agektmr.com/sodacan/)

When the background turns sufficiently red, try touching the tab of the can. (Sorry if your browser crashes...)

How was that? Doesn't this look intriguing if you were to see it after clicking a banner ad for a soda drink?

## Technical Tricks

Could you guess how I built it? You might be wondering how I achieved:

* 3D
* Detecting device tilt
* Detecting device shake
* That level of performance on a smartphone

There are roughly three tricks:

* The cylinder is made of tall, narrow DOM elements
* CSS3 3D Transforms make it three-dimensional and fast enough (by utilizing the GPU)
* Device Orientation detects tilt and gravity

The side of the can is made of many (180) narrow divs, each with its background image slightly shifted. Adding the top and bottom of the can completes the shape. Thanks to GPU rendering, you hardly feel like it's actually animating over 180 DOM elements when the Device Orientation API detects tilt and updates styles.

I won't go into further detail since it's much easier to just read the source code. That's the gist of the tricks.

## Summary

Asking users to install a native app that is essentially just an ad via an ad sounds absurd, but what if that app is built with HTML5? It could directly lead to conversions.

I hope to see more interesting HTML5 ad ideas in the near future.
