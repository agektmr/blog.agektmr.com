---
layout: undefined
lang: en
title: ''
description: ''
date: undefined
translationOf: /2013/10/web-music.html
translated: 2025-11-29
translatedManually: false
---
---
layout: post
lang: ja
title: How far can the web integrate with musical instruments? ~ Web Music Hackathon held
date: 2013-10-23
updated: 2013-10-23
tags:
- Hackathon
- Web Audio API
- Web MIDI API
---

<script src="https://apis.google.com/js/plusone.js" type="text/javascript"></script>

On October 19, 2013, we held a Web Music Hackathon at the Google Japan office. This was the first such event, organized by a developer community called Web Music Developers JP, led by Yamaha's [@ryoyakawai](https://twitter.com/ryoyakawai), also known as [Kawai-san](https://plus.google.com/107183997283505818880) (confusing).

Browsers have made remarkable progress in recent years. While the buzzword HTML5 is easy to understand, browsers such as Chrome, Safari, and Firefox now offer the Web Audio API, which allows you to manipulate audio at the waveform level.

[![](https://3.bp.blogspot.com/-lVPh4mHvLNc/UmY8AzAOgRI/AAAAAAAAjlo/cszKvWhPf6E/s640/Screen+Shot+2013-10-22+at+17.29.08.png)](https://aikelab.net/websynth/)

This demo was created by [Aike Keisuke](https://plus.google.com/110961519327088737405)
([@aike1000](https://twitter.com/aike1000)). Each knob can actually be moved, and it plays sounds like a full-fledged analog synthesizer. It's been over two years since it was released, but it still feels fresh.

It's certainly amazing! But don't you think there's something missing with just this? Yes, if you're going to play around with a synth, you'd want a physical controller, not a mouse or trackpad. I think we all think the same thing.

This is where the Web MIDI API comes in, an API that allows you to send and receive MIDI messages directly from the browser. While it hasn't yet been standardized, it's already implemented in Chrome with a flag, making it available for use. This means you can now actually play a virtual synthesizer in Chrome from an external MIDI device.

## Hackathon held

Now that we've come this far, all that's left is to get the event going. We decided to start with a hackathon, so we enlisted the help of AMEI, the Japanese MIDI industry association. Yamaha, KORG, and Crimson Technology each provided instruments, speakers, and other equipment, and we gathered together with around 30 participants.

We'll leave the details of the event to the organizer, Mr. Kawai's blog, but we'll show you just how exciting this event was with photos and videos.

[![](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s320/IMG_7468.JPG)](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s1600/IMG_7468.JPG)

[![](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s320/IMG_7469.JPG)](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s1600/IMG_7469.JPG)

A variety of instruments prepared for the event

[![](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s320/IMG_7452.JPG)](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s1600/IMG_7452.JPG)

[![](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s320/IMG_7453.JPG)](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s1600/IMG_7453.JPG)

[![](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s320/IMG_7454.JPG)](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s1600/IMG_7454.JPG)

[![](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s320/IMG_7451.JPG)](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s1600/IMG_7451.JPG)

[![](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s400/IMG_7450.JPG)](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s1600/IMG_7450.JPG)

Dontata has finally seen the light of day after 25 years of development, never to be commercialized. He plays drums in response to MIDI messages.

[![](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s320/IMG_7475.JPG)](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s1600/IMG_7475.JPG)

Some people brought their own oscilloscopes.

[![](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s320/IMG_7474.JPG)](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s1600/IMG_7474.JPG)

[![](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s320/IMG_7477.JPG)](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s1600/IMG_7477.JPG)

A soldering iron was brought in in a fit of excitement.

## Demo

Here are a few works that particularly impressed me. (Click on the image to watch the video from the beginning.)

The winning entry was a work that combined Tenorion and VJ.

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=1h1m28s" target="_blank"><img border="0" height="360" src="https://3.bp.blogspot.com/-dtGFvJbPXnM/UmZK77rSxAI/AAAAAAAAjmM/uiugZJXK2nk/s640/Screen+Shot+2013-10-22+at+18.52.30.png" width="640" /></a></div>

This is a slightly unexpected piece of work: a bookmarklet that plays a sound effect when you hover your mouse over it.

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=25m19s" target="_blank"><img border="0" height="360" src="https://4.bp.blogspot.com/-fQt22DDJqJg/UmZJOBOm1iI/AAAAAAAAjmE/30Htzu2hJFc/s640/Screen+Shot+2013-10-22+at+18.44.44.png" width="640" /></a></div>

Dontata's brave figure.

[![](https://3.bp.blogspot.com/-lS38RE94QL4/UmM9DrNvYpI/AAAAAAAAjho/mO_lLtCnK_U/s320/IMG_7481.MOV)](https://plus.google.com/events/c0l8pcb5n0321sno0p503tsacn4/107085977904914121234/5936655867153703570)

There's also an electric mokugyo, a theremin, and much more. It's a little long at 2 hours, but if you have the time, please take a look around.

{% YouTube 'MocPwUT4UTk' %}

Finally, here are some amazing works by the two tutors.

@komasshu If you open your mouth towards the camera, the teacher will make a snare sound.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UnjRGX4y4aL"></div>

The master g200kg created a piece in which you can freely create rhythmic sequences by placing magnets on a whiteboard.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/etXgHpup7Bc"></div>

Since this was the first event, I expected there would be many challenges.
But honestly, I was surprised by how much fun it was!
We're talking about holding a second event early next year, so if you're interested, please join us at [Web Music Developers
JP](https://groups.google.com/forum/#!forum/web-music-developers-jp).
We might even have a year-end party.

The event is summarized on the [Google+ event page](https://plus.google.com/events/activity/c0l8pcb5n0321sno0p503tsacn4). If you can't watch the video, please click here.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/C6AeeHfvhb7"></div>