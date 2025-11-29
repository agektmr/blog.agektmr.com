---
layout: post
lang: en
title: 'I made a metronome using HTML5'
description: ''
date: 2011-04-09
tags:
- CSS3
  - Web Audio API
  - WebFonts
translationOf: /2011/04/html5.html
translated: 2025-11-29
translatedManually: false
---
I created a metronome using HTML5, so I'd like to introduce it to you.

<p style="text-align: center;">
  <a href="/images/2011/04/metronome.png"><img class="size-medium wp-image-722 aligncenter" title="metronome" src="/images/2011/04/metronome-272x300.png" alt="" width="272" height="300" /></a>
</p>

<p style="text-align: center;">
  <a title="Metornome Experiment" href="http://demo.agektmr.com/metronome/" target="_blank">http://demo.agektmr.com/metronome/__HTML_TAG_7__
</p>

I've tested it on Chrome 12, Firefox 4, Safari 5, and Opera 10. I've also confirmed that it works on iOS 4's Safari and Android 2.3's standard browser, although there is no sound.

HTML5 related technologies used

* Application Cache
* CSS3 transform, transition, box-shadow
* Web Audio API
* Audio elements
* Drag
* WebFonts

That's about it. No images are used. In Chrome 12, if you enable the Web Audio API by entering about:flags in the Omnibox (URL field), it should work fairly stably. If it is disabled, it will fall back to using the Audio element, but it seems to be unstable in Chrome.

The trick is simple: combine transform and transition to animate a metronome stick swinging back and forth at regular intervals. When it flips, a click sound is played using the Web Audio API or Audio element.

You can start and stop the metronome by clicking the button or by pressing the spacebar. You can adjust the speed by moving the weight up and down.

Enjoy!