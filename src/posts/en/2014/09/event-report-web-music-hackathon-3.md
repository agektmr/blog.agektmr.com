---
layout: post
lang: en
title: "Event Report: Web Music Hackathon #3"
date: 2014-09-18
tags:
  - Hackathon
  - Web MIDI API
  - Web Audio API
image:
  feature: /event-report-web-music-hackathon-3/guitar.jpg
translationOf: /2014/09/event-report-web-music-hackathon-3.html
translated: 2026-10-03
translatedManually: false
---
Did you know web browsers can now make music? Or at least sound. By using the Web Audio API, you can synthesize, add effects, modulate, split, and merge—whatever audio processing you can imagine is now available across many browsers.
There is also MIDI support. Chrome has a Web MIDI API implementation behind a flag, so you can hook up your synthesizer to send and receive MIDI signals.

<!-- excerpt -->

[![](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)

These APIs are quite low-level, so there's plenty of groundwork required to create actual "music" in the browser. But that also means this is an exciting time to help lay the foundations for the future of web-based music platforms.

That brings us to the "Web Music Hackathon," an event hosted since last year by Google and the community "[Web Music Developers JP](https://groups.google.com/forum/#!forum/web-music-developers-jp)." Participants enjoy building apps using the Web Audio API, the Web MIDI API, and related technologies such as WebRTC and the Web Speech API—exploring whatever their imaginations can cook up when combining the web and music.

Every time we run this event, we see incredible ideas and implementations that make the most of this intersection.

Check out the winner's demo from the first hackathon:

<!-- Place this tag where you want the widget to render. --> <div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/etXgHpup7Bc"></div></div>

And here is the second one ([full report in English here](http://blog.agektmr.com/2014/01/web-music-hackathon-2-report.html)):

{% YouTube 'dCvuBz1FYWg?start=2838' %}

Coincidentally, a similar event called [Web Audio Hackday](https://www.eventbrite.co.uk/e/web-audio-hack-day-tickets-12451959145) was taking place in Berlin around the same time. We decided to collaborate and cross-share our event reports. To any Web Audio Hackday attendees reading this: nice to meet you! :)
I'll link to the WAH report once it's available.

## Opening

We kicked off the day with an update from Google engineer and Web MIDI API implementor [@toyoshim](http://twitter.com/toyoshim) covering what's new in the Web MIDI API. Here are the slides:

<div style="text-align: center;">
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39034752" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/toyoshim/web-midi-api-update">Web MIDI API update</a></strong> from <strong><a href="http://www.slideshare.net/toyoshim">Takashi Toyoshima</a></strong>
  </div>
</div>

Three mentors followed with demos of their own. They are household names in the Japanese Web Music scene, though I imagine many worldwide recognize them as well :) [@g200kg](https://twitter.com/g200kg), [@aike1000](https://twitter.com/aike1000), and [@sascacci](https://twitter.com/sascacci).

@sascacci showcased a V-Drums visual effect.

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/HmEfgCHhMFS"></div></div>

@aike1000 shared some practical knowledge with the attendees: [web audio sample codes](https://github.com/aike/webaudiodemo), which compiles useful snippets for generating sine waves, playing samples, creating delay, pitch shifting, distortion, and more. He also shared [a synthesizer template](http://d.hatena.ne.jp/aike/20140909) and a [VJ framework](http://d.hatena.ne.jp/aike/20140913).

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UY4FimuRHUe"></div></div>

@g200kg demonstrated his latest project: LiveBeats.

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/VWuysJxCfh7"></div></div>

Mr. Tada from Yamaha Corporation introduced a new tool called the "Web Music DAW Connector." It is a VST plugin that connects a DAW environment to a browser over WebSocket. In his demo, Cubase connected over Wi-Fi to Chrome running on a remote Nexus 7 to insert an audio effect.
The web and music production are drawing closer than ever.

<div style="text-align: center;">
  <div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/L5unwFUp2Xa"></div>
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39002835" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/yukiotada/140913-web-musichackathonwmdc-39002835">140913_WebMusicHackathon_WMDC</a></strong> from <strong><a href="http://www.slideshare.net/yukiotada">Yukio Tada</a></strong>
  </div>
</div>

JSPA (Japan Synthesizer Programmer Association) presented a track composed specifically for this event. It was designed to play through [PokeMiku](http://otonanokagaku.net/nsx39/), so it actually sings. For those unfamiliar with [Vocaloid](http://en.wikipedia.org/wiki/Vocaloid) technology, definitely check it out—it is immensely popular in Japan.

{% YouTube 'MYnUvkDKT34' %}

This was a great reminder that making music directly in the browser is the ultimate goal here. While we are still experimenting with generating "sounds," eventually creating full-fledged "music" with these technologies is where we want to be.

## Hacking

We had over 40 participants, including representatives from the W3C, instrument manufacturers (Yamaha, Roland, Korg, Crimson Technology), JSPA, and [AMEI (Association of Musical Electronics Industry)](http://www.amei.or.jp/). From an outsider's perspective, it looked almost like an instrument industry convention (though most attendees were web developers!).

As always, the instrument makers generously lent us an abundance of gear, and attendees brought plenty of their own fun gadgets to the venue. Check out photos from the event (click the image below):

[![](https://4.bp.blogspot.com/-bM8bMaRi49M/VBlAYoU4grI/AAAAAAAAt4s/N0J-psHopX0/s1600/Screen%2BShot%2B2014-09-17%2Bat%2B17.03.15.png)](https://plus.google.com/events/gallery/cqvnr68c6r4b43dikum0kaljme4)

## Demos

Hacking started at 11:30 AM and wrapped up at 4:30 PM. Despite having only 5 hours of hacking time, people produced an impressive total of 26 projects! I can't cover all of them here, so let me highlight a few standouts.

You can watch the full [archive of the two-and-a-half-hour demo livestream](https://www.youtube.com/watch?v=z_TGofN7wv8). If you have some time, check it out! (Click on the screenshots below to jump to the respective timestamps in the video.)

### Mr. Murai

[![](https://2.bp.blogspot.com/-LTLovd4pJZk/VBk7p6nAkfI/AAAAAAAAt2k/AvegmkSuuP0/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.58.11.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=5)

Jun Murai, widely recognized as the father of the internet in Japan, made a special guest appearance. It was an honor to see his interest in these technologies, and the room was thrilled to have him.

### D.F.Mac

This was the third time [D.F.Mac](https://twitter.com/tadfmac) has joined this hackathon. Everything he builds is delightfully inventive, and this project was no exception. He turned vegetables and tin cans into musical instruments. Check out the video to hear the quirky sounds! While I don't know the exact inner workings, he wrote up [the technical details here](http://qiita.com/tadfmac/items/f2172cdacbdd5600256e) (in Japanese).

[![](https://3.bp.blogspot.com/-LNhujEptdg4/VBk7xiEDhKI/AAAAAAAAt2s/PC-kzjtCHR4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.48.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=420)

### Masayuki Yokobori

He borrowed his son's toy train set to create an interactive app: the moving train triggers sounds via MIDI.

[![](https://3.bp.blogspot.com/-9NoGJKF0l-4/VBk7xtw9RmI/AAAAAAAAt20/EGc7lONVWmk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.49.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=672)

### Daichi Hirono

ScoreSketch is an intuitive sequencer created by the winner of our 2nd hackathon.

[![](https://2.bp.blogspot.com/-ogx25A4rL98/VBk7xlrR_RI/AAAAAAAAt2w/IfePipKuXME/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.50.25.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1037)

### kirinsan.org

This project detects the pitch generated by an [Otamatone](https://www.youtube.com/watch?v=B8WjnyvpaMg), translates it into MIDI signals, and drives a synthesizer in real time.

[![](https://2.bp.blogspot.com/-lqGIZDtaxOY/VBk7yQ7DvII/AAAAAAAAt24/qbWMI8JToBA/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.51.14.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1654)

### Takashi Takagi (@okame_okame)

Electric Mokugyo ([Source code](https://github.com/okame/MOKUGYO2))
A mokugyo is a wooden slit drum used in Buddhist chanting. He wired it up to use as an expressive percussion instrument.

[![](https://2.bp.blogspot.com/-KCxTMKZDn3Q/VBk7y3Pz4ZI/AAAAAAAAt28/4eqH3CZonzo/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.52.08.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2095)

### @watilde

[abeck.js](http://watilde.github.io/abeck/) ([Source code](http://github.com/watilde/abeck))
Write out a sequence using [ABC notation](http://abcnotation.com/), and it renders sheet music while playing back the score.

[![](https://2.bp.blogspot.com/-IynrkpwvCKM/VBk7zOEumGI/AAAAAAAAt3A/-WIoFx66GkQ/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.13.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2727)

### @mohayonao, @nanonum

[Automatic composition](http://mohayonao.github.io/web-music-hack0913/) ([Source code](http://github.com/mohayonao/web-music-hack0913/))
Many in the community know [@mohayonao](http://twitter.com/mohayonao) for his stunning Web Audio demos. Together with @nanonum, he built a polished generative music and audio visualization project.

[![](https://2.bp.blogspot.com/-b800JQGz7qQ/VBk7zhsXE9I/AAAAAAAAt3Y/rXNB3As33cY/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=3958)

### CookPitch

A clever and practical application of Web Audio: it allows users to navigate recipe pages by humming, completely hands-free—ideal when your hands are messy while cooking.

[![](https://1.bp.blogspot.com/-oTBC9lnkkuE/VBk7z1L-R5I/AAAAAAAAt3Q/eFEWVemjccw/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.55.23.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6054)

### Himakan

[Face Tracking Effector](http://himakan.github.io/facetracking-effector/) ([Source code](https://github.com/himakan/facetracking-effector/))

The overall winner of this hackathon. While face-tracking audio control has been attempted before, this execution was exceptionally slick.

[![](https://3.bp.blogspot.com/-X0rcTvPXlPo/VBk7znQLwdI/AAAAAAAAt3U/I0pJ7LZ0yLE/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.54.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=4404)

### @aike1000

Future effectors
Realistic guitar effects pedals built right into the browser. @aike1000 played an original guitar composition live through them.

[![](https://2.bp.blogspot.com/-hENzeiN9T68/VBk70h-nbBI/AAAAAAAAt3g/HDgbM_I2yk4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.04.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6994)

### @sascacci

Miracle collaboration
A duet between electronic V-Drums and "Dontata-kun"—a small robotic drummer controlled over MIDI. He demonstrated Dontata-kun drumming along in perfect synchronization with his own playing to the JSPA song!

[![](https://2.bp.blogspot.com/-a5G6Tx7JZZk/VBk702v7-5I/AAAAAAAAt38/cJyd6zY_OTU/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.56.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7328)

### @g200kg

@g200kg demonstrated an updated build of LiveBeats.

[![](https://2.bp.blogspot.com/-3TewUNce3T8/VBk71kAV0uI/AAAAAAAAt3w/R2no9-0-Evk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.57.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7598)

## Closing

[![](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)

This was once again a fun and rewarding hackathon. Developers seem increasingly comfortable building rich audio applications on the web. Looking ahead, we hope to bring musicians into the mix to collaborate on writing actual music alongside building apps.

See you next time!

[![](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)

P.S. A big thank-you to our main organizer, [Ryoya Kawai](https://twitter.com/ryoyakawai). Otsukare-sama!
