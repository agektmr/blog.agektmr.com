---
layout: post
lang: en
title: How Far Can the Web Merge with Musical Instruments? — We Hosted a Web Music Hackathon
date: 2013-10-23
updated: 2013-10-23
tags:
  - Hackathon
  - Web Audio API
  - Web MIDI API
translationOf: /2013/10/web-music.html
translated: 2026-10-03
translatedManually: false
---
<script src="https://apis.google.com/js/plusone.js" type="text/javascript"></script>

On October 19, 2013, we hosted an event called the Web Music Hackathon at the Google Japan office. This was the inaugural event organized by Web Music Developers JP, a developer community led by Yamaha's [Mr. Kawai](https://plus.google.com/107183997283505818880), also known as [@ryoyakawai](https://twitter.com/ryoyakawai) (a bit confusing, I know).

Browsers have made remarkable progress in recent years. While the buzzword "HTML5" makes it easy to grasp, the Web Audio API—which allows you to manipulate audio right down to the waveform level—is now available in browsers like Chrome, Safari, and Firefox.

[![](https://3.bp.blogspot.com/-lVPh4mHvLNc/UmY8AzAOgRI/AAAAAAAAjlo/cszKvWhPf6E/s640/Screen+Shot+2013-10-22+at+17.29.08.png)](https://aikelab.net/websynth/)

This is a demo created by [Keisuke Ai](https://plus.google.com/110961519327088737405) ([@aike1000](https://twitter.com/aike1000)). You can actually tweak each knob and play it just like a full-fledged analog synthesizer. Even more than two years after its release, it still feels as fresh as ever.

It’s definitely amazing! ... But still, don't you feel like something is missing? That's right—if you're going to play with a synth, you want a physical controller rather than a mouse or trackpad. I think everyone shares that thought.

That's where the Web MIDI API comes in: an API that allows sending and receiving MIDI messages directly from the browser. While it hasn't been standardized yet, it is already implemented behind a flag in Chrome and ready to use. In other words, you can now trigger virtual synthesizers running inside Chrome directly from external MIDI hardware.

## Hosting the Hackathon

Once things had come this far, all that was left was to build momentum. Naturally, a hackathon was the first thing that came to mind. With support from AMEI (the Association of Musical Electronics Industry), and musical instruments and speakers generously provided by Yamaha, KORG, and Crimson Technology, around 30 participants gathered together.

I'll leave the detailed account of the event to organizer [Mr. Kawai's blog post](https://miscfeeling.blogspot.jp/2013/10/web-music-1.html), and instead share some photos and videos to show just how exciting the event was.

[![](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s320/IMG_7468.JPG)](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s1600/IMG_7468.JPG)

[![](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s320/IMG_7469.JPG)](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s1600/IMG_7469.JPG)

A variety of instruments prepared for this event

[![](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s320/IMG_7452.JPG)](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s1600/IMG_7452.JPG)

[![](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s320/IMG_7453.JPG)](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s1600/IMG_7453.JPG)

[![](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s320/IMG_7454.JPG)](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s1600/IMG_7454.JPG)

[![](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s320/IMG_7451.JPG)](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s1600/IMG_7451.JPG)

[![](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s400/IMG_7450.JPG)](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s1600/IMG_7450.JPG)

"Dontata-kun," seeing the light of day 25 years after development without ever being commercialized. It plays the drums in response to MIDI messages.

[![](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s320/IMG_7475.JPG)](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s1600/IMG_7475.JPG)

Someone even brought their own oscilloscope.

[![](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s320/IMG_7474.JPG)](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s1600/IMG_7474.JPG)

[![](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s320/IMG_7477.JPG)](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s1600/IMG_7477.JPG)

A soldering iron brought along in the heat of the moment.

## Demos

Here are a few projects that particularly stood out to me. (Click the images to jump directly to that part of the video.)

The winner was a project combining TENORI-ON with VJing.

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=1h1m28s" target="_blank"><img border="0" height="360" src="https://3.bp.blogspot.com/-dtGFvJbPXnM/UmZK77rSxAI/AAAAAAAAjmM/uiugZJXK2nk/s640/Screen+Shot+2013-10-22+at+18.52.30.png" width="640" /></a></div>

Here’s a slightly unexpected one: a bookmarklet that plays sound effects on mouseover.

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=25m19s" target="_blank"><img border="0" height="360" src="https://4.bp.blogspot.com/-fQt22DDJqJg/UmZJOBOm1iI/AAAAAAAAjmE/30Htzu2hJFc/s640/Screen+Shot+2013-10-22+at+18.44.44.png" width="640" /></a></div>

Dontata-kun in action.

[![](https://3.bp.blogspot.com/-lS38RE94QL4/UmM9DrNvYpI/AAAAAAAAjho/mO_lLtCnK_U/s320/IMG_7481.MOV)](https://plus.google.com/events/c0l8pcb5n0321sno0p503tsacn4/107085977904914121234/5936655867153703570)


There were plenty of other creations too, including an electric mokugyo (wooden fish) and a theremin. At about two hours, the video is a bit long, but feel free to skip around and check it out when you have some time.

{% YouTube 'MocPwUT4UTk' %}

Finally, some amazing projects from the two tutors.

@komasshu's project plays a snare drum whenever you open your mouth toward the camera.


<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UnjRGX4y4aL"></div>

Industry veteran g200kg created a project that lets you freely build rhythm sequences by placing magnets on a whiteboard.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/etXgHpup7Bc"></div>

Since this was our first time running this event, I expected there would be plenty of challenges to sort through, but honestly, it was shockingly fun. We're already talking about holding a second hackathon early next year, so if you're interested, please join [Web Music Developers JP](https://groups.google.com/forum/#!forum/web-music-developers-jp). We might even host a year-end party.

Highlights from the event are compiled on the [Google+ event page](https://plus.google.com/events/activity/c0l8pcb5n0321sno0p503tsacn4). If you can't view any of the videos, please check there.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/C6AeeHfvhb7"></div>
