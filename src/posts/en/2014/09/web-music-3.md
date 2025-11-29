---
layout: post
lang: en
title: 'Web Music Hackathon #3 Report: Enjoying Sound in Your Browser'
description: ''
date: 2014-09-17
updated: 2014-09-17
image:
feature: /event-report-web-music-hackathon-3/guitar.jpg
tags:
- Hackathon
- Web MIDI API
- Web Audio API
translationOf: /2014/09/web-music-3.html
translated: 2025-11-29
translatedManually: false
---
This hackathon, which aims to create fun sound using browser-based APIs like the Web Audio API and Web MIDI API, is now in its third year. This year's event was packed with great content and amazing ideas, but in this post I'd like to briefly summarize the content.

<!-- excerpt -->

[![](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)

In fact, the day before this hackathon, an event called [Web Audio
Hackday](https://www.eventbrite.co.uk/e/web-audio-hack-day-tickets-12451959145) was held in Berlin. Since the dates are so close, we thought we might want to collaborate on something. So, we've been in touch and are trying to share our results in the form of a blog post. We plan to post an English version of this article later. We'll also link to the report from Berlin as soon as it's published.

## Opening

After some greetings, [@toyoshim](http://twitter.com/toyoshim), a Google engineer in charge of implementing the [Web MIDI API](http://www.w3.org/TR/webmidi/), kicked off the event with an update on the Web MIDI API specifications. The materials are available here:

<div style="text-align: center;">
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39034752" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/toyoshim/web-midi-api-update">Web MIDI API update</a></strong> from <strong><a href="http://www.slideshare.net/toyoshim">Takashi Toyoshima</a></strong>
  </div>
</div>

Also participating as tutors this time were [@g200kg](https://twitter.com/g200kg), [@aike1000](https://twitter.com/aike1000), and [@sascacci](https://twitter.com/sascacci), all well-known figures in the Japanese web music world (and in fact, even known to a select few worldwide). Each demoed an application using Web Audio/MIDI. The level of their work was so high that it raised the bar for the hackathon significantly.

@sascacci demonstrated a visual effect using electronic drums.

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/HmEfgCHhMFS"></div></div>

@aike1000 introduced and demonstrated various templates. [Sample Code Collection](https://github.com/aike/webaudiodemo) contains some very useful snippets, from generating sine waves using the Web Audio API to playing sample sounds, and using delay, pitch changers, and distortion. Anyone interested in web-based audio programming should definitely check it out. Other resources include [Synth Template Collection](http://d.hatena.ne.jp/aike/20140909) and [VJ Framework](http://d.hatena.ne.jp/aike/20140913).

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UY4FimuRHUe"></div></div>

@g200kg has a LiveBeats demo.

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/VWuysJxCfh7"></div></div>

Yamaha's Tada also announced the Web Music DAW Connector, which connects a DAW (Digital Audio Workstation), a professional music production environment, to a browser. This allows you to incorporate JavaScript-based plugins into professional music production. It really feels like the world of web music is steadily moving forward.

<div style="text-align: center;">
  <div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/L5unwFUp2Xa"></div>
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39002835" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/yukiotada/140913-web-musichackathonwmdc-39002835">140913_WebMusicHackathon_WMDC</a></strong> from <strong><a href="http://www.slideshare.net/yukiotada">Yukio Tada</a></strong>
  </div>
</div>

And this time, members of the JSPA (Japan Synthesizer Programmers Association) created a song especially for this event and performed it. The sound source is [PokeMiku](http://otonanokagaku.net/nsx39/), so it not only has accompaniment but also Hatsune Miku's vocals. They also produced a video.

{% YouTube 'MYnUvkDKT34' %}

This event was originally intended to be a platform for creating something that could be called "music," so it was a great inspiration. While it's true that at this stage we're still stuck at the primitive level of "sound," the real excitement lies in building the platform even further and enabling even more musical possibilities.

Hacking

In addition to the over 40 attendees, we also had many attendees from musical instrument manufacturers such as W3C, Yamaha, Roland, Korg, and Crimson Technology, as well as representatives from the Japan Synthesizer Programmers Association (JSPA)(http://www.jspa.gr.jp/) and the Musical Electronics Industry Association (AMEI)(http://www.amei.or.jp/). The event attracted more attention from the musical instrument industry than from the web industry.

This time too, various instrument manufacturers lent out instruments, but it was impressive to see so many people bringing their own instruments. Check out the photos to see the excitement during the hacking session.

[![](https://4.bp.blogspot.com/-bM8bMaRi49M/VBlAYoU4grI/AAAAAAAAt4s/N0J-psHopX0/s1600/Screen%2BShot%2B2014-09-17%2Bat%2B17.03.15.png)](https://plus.google.com/events/gallery/cqvnr68c6r4b43dikum0kaljme4)

## Demo time

Hacking time began at 11:30 and ended at 4:30. It was only five hours, but the students produced a total of 26 unique creations, including those by the tutors. We can't introduce them all, so we'll just highlight a few.

Learning from past experiences, we recorded the audio over line during this demo livestream, which allowed us to deliver a very high-quality video. We'd like to thank Roland for providing us with the equipment. The video is two and a half hours long, but if you're interested, please check out the full livestream archive.

*Each image links to the corresponding section on YouTube.

### Professor Murai

[![](https://2.bp.blogspot.com/-LTLovd4pJZk/VBk7p6nAkfI/AAAAAAAAt2k/AvegmkSuuP0/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.58.11.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=5)

The first special guest to appear during demo time was Professor Jun Murai of Keio University, known as the father of the Internet in Japan. He gave a speech. The excitement rose with the arrival of this special guest.

### D.F.Mac

This was [D.F.Mac]'s third appearance, and he's back with a perfect record. He once again left the audience baffled with his unique piece. His piece uses vegetables and empty cans as triggers to play sounds from a DAW linked to a browser. For a detailed explanation, click [here](http://qiita.com/tadfmac/items/f2172cdacbdd5600256e).

[![](https://3.bp.blogspot.com/-LNhujEptdg4/VBk7xiEDhKI/AAAAAAAAt2s/PC-kzjtCHR4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.48.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=420)

### Masayuki Yokobori

This work allows you to connect a Densha de Go! controller via MIDI to produce similar sounds.

[![](https://3.bp.blogspot.com/-9NoGJKF0l-4/VBk7xtw9RmI/AAAAAAAAt20/EGc7lONVWmk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.49.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=672)

### Daichi Hirono
ScoreSketch is a simple sequencer. Like the previous winner's work, it's extremely polished.

[![](https://2.bp.blogspot.com/-ogx25A4rL98/VBk7xlrR_RI/AAAAAAAAt2w/IfePipKuXME/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.50.25.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1037)

### kirinsan.org

This piece analyzes the sound of an Otamatone, converts it into a MIDI signal, and plays it on a synthesizer.

[![](https://2.bp.blogspot.com/-lqGIZDtaxOY/VBk7yQ7DvII/AAAAAAAAt24/qbWMI8JToBA/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.51.14.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1654)

### Takagi Takashi (@okame_okame)

Electric Mokugyo ([Source Code](https://github.com/okame/MOKUGYO2))
A new work by Takagi, who always showcases his Mokugyo art.

[![](https://2.bp.blogspot.com/-KCxTMKZDn3Q/VBk7y3Pz4ZI/AAAAAAAAt28/4eqH3CZonzo/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.52.08.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2095)

### @watilde

[abeck.js](http://watilde.github.io/abeck/) ([Source Code](http://github.com/watilde/abeck)) 
This work allows you to play music and generate sheet music by registering a sequence using [ABC Notation](http://abcnotation.com/).

[![](https://2.bp.blogspot.com/-IynrkpwvCKM/VBk7zOEumGI/AAAAAAAAt3A/-WIoFx66GkQ/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.13.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2727)

### @mohayonao, @nanonum

[Automatic Composition](http://mohayonao.github.io/web-music-hack0913/) ([Source Code](http://github.com/mohayonao/web-music-hack0913/))
Although it didn't win a prize, this is a gorgeous piece that's musically cool and even includes visualizations.

[![](https://2.bp.blogspot.com/-b800JQGz7qQ/VBk7zhsXE9I/AAAAAAAAt3Y/rXNB3As33cY/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=3958)

### CookPitch

A recipe service that lets you turn pages by humming. No hands required, so you can check your PC while cooking!

[![](https://1.bp.blogspot.com/-oTBC9lnkkuE/VBk7z1L-R5I/AAAAAAAAt3Q/eFEWVemjccw/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.55.23.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6054)

### Himakan

[Face Tracking Effector](http://himakan.github.io/facetracking-effector/) ([Source Code](https://github.com/himakan/facetracking-effector/))
This is the winning entry. I've seen a few similar ideas, but this one is by far the coolest.

[![](https://3.bp.blogspot.com/-X0rcTvPXlPo/VBk7znQLwdI/AAAAAAAAt3U/I0pJ7LZ0yLE/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.54.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=4404)

### @aike1000

Effects of the Future

He added a similar look (somewhere I've seen this before...?) to the guitar effects shown in the opening demo and performed it as a song.

[![](https://2.bp.blogspot.com/-hENzeiN9T68/VBk70h-nbBI/AAAAAAAAt3g/HDgbM_I2yk4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.04.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6994)

### @sascacci

A miraculous collaboration

This is a miraculous collaboration between V-Drums and Dontata. Dontata plays along with V-Drums. And they jam together to music provided by JSPA!

[![](https://2.bp.blogspot.com/-a5G6Tx7JZZk/VBk702v7-5I/AAAAAAAAt38/cJyd6zY_OTU/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.56.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7328)

### @g200kg

They showed off an improved version of Livebeats.

[![](https://2.bp.blogspot.com/-3TewUNce3T8/VBk71kAV0uI/AAAAAAAAt3w/R2no9-0-Evk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.57.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7598)

## summary

[![](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)

This year's Web Music Hackathon was another exciting one. Everyone is becoming familiar with the platform and it feels like things are gradually becoming more musical. It will probably take some time, but I personally hope that it will become an event that musicians can enjoy.

Stay tuned for next time!

[![](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)

P.S. Thanks to the organizer, [Kawai-san](https://twitter.com/ryoyakawai) for your hard work!
