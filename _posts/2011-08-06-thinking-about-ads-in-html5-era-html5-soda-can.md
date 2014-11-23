---
title: 'Thought about Ads in HTML5 era: HTML5 Soda Can'
author: Eiji
layout: post
permalink: /archives/730
wp_plus_one_redirect:
  - 
categories:
  - HTML5
tags:
  - CSS3
  - Device Orientation API
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/730" callback="wp_plus_one_handler"></g:plusone>
</div>

Let me introduce the &#8220;HTML5 Soda Can&#8221; demo I made for <a href="http://www.google.co.jp/events/thinkmobile2011/livestream.html" target="_blank">ThinkMobile2011</a> a while ago.

<a href="http://demo.agektmr.com/sodacan/" target="_blank"><img class="aligncenter" title="Soda Can 1" src="http://devlog.agektmr.com/wp-content/uploads/2011/07/233b1844c6d899c679f560e35058d333-200x300.png" alt="" width="200" height="300" /></a>

The original request was to come up with some ideas of HTML5 ads for audience at the event. It isn&#8217;t that hard just to create ads using HTML5, but since the purpose was to show off to the audience, I needed to inject &#8220;wow&#8221; feeling as well as to put clear sign that it&#8217;s made of HTML5.

<span class="Apple-style-span" style="font-size: 20px; font-weight: bold;">Concept</span>

Though there&#8217;s still a lot of things which native apps can do while web apps cannot do, it&#8217;s an interesting challenge to make HTML5 apps work like native apps. On the contrary, it&#8217;s advantage of web apps that you can see the app without installing.

So, here&#8217;s the demo I have come up with: &#8220;Wow&#8221; enough HTML5-ish, instantly experience-able and easily imagine-able of actual advertisement.

<span class="Apple-style-span" style="font-size: 20px; font-weight: bold;">Demo</span>

<a href="http://demo.agektmr.com/sodacan/" target="_blank">Soda Can</a>: Please access using iPhone or iPad (you can view on Chrome but don&#8217;t break your MacBookPro!)

1.  When loaded, you&#8217;ll see a can &#8220;Google Soda&#8221;. (It was originally Coke but for some reason, I asked <a href="http://www.senaillat.com/" target="_blank">Jerome Senaillat</a> to make it up as &#8220;Google Soda&#8221;.)
2.  Try tilting your iPhone / iPad. You can find the can actually tilts inside your browser.
3.  You know what soda is like? Try shake your device. Guess what???

<a href="http://demo.agektmr.com/sodacan/" target="_blank"><img class="aligncenter" title="Soda Can 2" src="http://devlog.agektmr.com/wp-content/uploads/2011/07/2bf6d446a21bf24a86472b536c525421-200x300.png" alt="" width="200" height="300" /></a>

When the background turns red enough, try touching tab of the can. (sorry if browser crashes&#8230;)

How was that? Doesn&#8217;t this look interesting when you see it after clicking banner ad of some kind of soda drinks?

## Technical Tricks

Could you guess how I did it? I assume you wondered how I did:

*   3D
*   Detect device tilt
*   Detect device shake
*   That performance on smartphone

There&#8217;s roughly 3 tricks:

*   Cylinder is made of long and narrow DOM elements
*   CSS3 3D Transform enables it three dimensional and fast enough (using GPU)
*   Device Orientation detects tilt and gravity

The side of can is made of many (180) long and narrow divs with each background images slightly shifted. Adding top and bottom of the can completes the shape. GPU rendering doesn&#8217;t make you feel like it&#8217;s actually moving more than 180 DOM elements when Device Orientation API detects device tilt and style changes.

I don&#8217;t bother writing any more details since it&#8217;s much easier reading the source code. This is roughly the tricks.

<span class="Apple-style-span" style="font-size: 20px; font-weight: bold;">Summary</span>

Asking users to install native app which is actually ad via ad sounds ridiculous but what if that app is made of HTML5? It may directly lead to conversion.

I&#8217;m hoping to see interesting ideas of ads using HTML5 soon.