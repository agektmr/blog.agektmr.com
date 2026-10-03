---
title: I made a metronome with HTML5
author: Eiji
layout: post
lang: en
date: 2011-04-09
categories:
  - HTML5
tags:
  - CSS3
  - Web Audio API
  - WebFonts
translationOf: /2011/04/html5.html
translated: 2026-10-03
translatedManually: false
---
I built a metronome using HTML5 and wanted to share it here.

<p style="text-align: center;">
  <a href="/images/2011/04/metronome.png"><img class="size-medium wp-image-722 aligncenter" title="metronome" src="/images/2011/04/metronome-272x300.png" alt="" width="272" height="300" /></a>
</p>

<p style="text-align: center;">
  <a title="Metornome Experiment" href="http://demo.agektmr.com/metronome/" target="_blank">http://demo.agektmr.com/metronome/</a>
</p>

I tested it on Chrome 12, Firefox 4, Safari 5, and Opera 10. I also confirmed that it runs (though without sound) on iOS 4 Safari and the default browser on Android 2.3.

The HTML5-related technologies I used are:

*   Application Cache
*   CSS3 transform, transition, box-shadow
*   Web Audio API
*   Audio element
*   Drag
*   WebFonts

...just to name a few. No images are used at all. In Chrome 12, if you enter `about:flags` into the Omnibox (the address bar) and enable the Web Audio API, it should run relatively stably. If it's disabled, it falls back to the Audio element, though it seems somewhat unstable in Chrome.

The trick is simple: it combines `transform` and `transition` to repeatedly swing the metronome pendulum back and forth at regular intervals. At the exact moment it reverses direction, a click sound is played using either the Web Audio API or the Audio element.

You can start and stop the metronome by clicking the button or pressing the spacebar. Moving the weight up and down adjusts the tempo.

Enjoy!
