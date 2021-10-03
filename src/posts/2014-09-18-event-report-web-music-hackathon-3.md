---
layout: post
title: 'Event Report: Web Music Hackathon #3'
date: 2014-09-18
tags:
- Hackathon
- Web MIDI API
- Web Audio API
image:
  feature: event-report-web-music-hackathon-3/guitar.jpg
---

Did you know web browsers can now make music? Or at least sound. By using Web
Audio API, you can synthesize, add effects, modulate, split, merge - whatever
you can imagine to process audio: they are available on many browsers.  
There's also MIDI support. Chrome has Web MIDI implementation behind a flag so
you can hook up your synthesizer and send or receive MIDI signals with it.  

<!-- excerpt -->

[![](http://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)](http://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)

Those APIs are quite low level. So there's tons of things you need to do to make
"music" on top of browsers, but that also means an interesting time of building
up fundamentals for the future music platform.  

So, this is the event Google and a community "[Web Music Developers
JP](https://groups.google.com/forum/#!forum/web-music-developers-jp)" have been
running since last year called "Web Music Hackathon". Attendees enjoy building
apps using Web Audio API, Web MIDI API and other related technologies such as
WebRTC, Web Speech API, etc - whatever they can imagine web + music can do.  

Every time we run this event, we saw incredible ideas and implementations of
music apps that take advantage of fusion between web and music.  

Check out the first hackathon's winner's demo:  

<!-- Place this tag where you want the widget to render. --> <div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/etXgHpup7Bc"></div></div>

And the second one ([English full report is
here](http://blog.agektmr.com/2014/01/web-music-hackathon-2-report.html)):  

{% YouTube 'dCvuBz1FYWg?start=2838' %}

Coincidentally, there was a similar event called [Web Audio
Hackday](https://www.eventbrite.co.uk/e/web-audio-hack-day-tickets-12451959145) in
Berlin. So we decided to collaborate and show event reports each other. Web
Audio Hackday attendees, if you are reading this, nice to meet you :)  
I will link back to the WAH report when available.  

## Opening

We started the day with an update from Google engineer and Web MIDI API
implementor [@toyoshim](http://twitter.com/toyoshim) about what's new in Web
MIDI API. Here's the slides:  
  
<div style="text-align: center;">
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39034752" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/toyoshim/web-midi-api-update">Web MIDI API update</a></strong> from <strong><a href="http://www.slideshare.net/toyoshim">Takashi Toyoshima</a></strong>
  </div>
</div>

3 tutors followed him giving demos. They are well known in Japanese Web Music
land, but I assume they are famous world wide as well
:) [@g200kg](https://twitter.com/g200kg), [@aike1000](https://twitter.com/aike1000),
and [@sascacci](https://twitter.com/sascacci).  

@sascacci introduced V-drum visual effect.  

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/HmEfgCHhMFS"></div></div>

@aike1000 gave attendees some wisdoms: [web audio sample
codes](https://github.com/aike/webaudiodemo) list useful snippets such as
generating sign waves, play samples, how to write delay, pitch shift,
distortion, etc. Also [a template for
synthesizer](http://d.hatena.ne.jp/aike/20140909), and [VJ
framework](http://d.hatena.ne.jp/aike/20140913).  

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UY4FimuRHUe"></div></div>

@g200kg showed off demo of his new project: LiveBeats  

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/VWuysJxCfh7"></div></div>
  
Mr. Tada from YAMAHA Corp introduced a new product called "Web Music DAW
Connector". This is a VST plugin that connects a DAW system with a browser via
WebSocket. He showed us a demonstration: his Cubase connects with Chrome running
on remote Nexus 7 over Wifi and that inserts an effect.  
Web and music are getting closer and closer.  

<div style="text-align: center;">
  <div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/L5unwFUp2Xa"></div>
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39002835" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/yukiotada/140913-web-musichackathonwmdc-39002835">140913_WebMusicHackathon_WMDC</a></strong> from <strong><a href="http://www.slideshare.net/yukiotada">Yukio Tada</a></strong>
  </div>
</div>

JSPA (Japan Synthesizer Programmer Association) presented us a song written
specifically for this event. And it is intended to play
on [PokeMiku](http://otonanokagaku.net/nsx39/), so it sings. For those who are
not familiar with [Vocaloid](http://en.wikipedia.org/wiki/Vocaloid) technology,
check this out. It's a very popular technology in Japan.  

{% YouTube 'MYnUvkDKT34' %}

This reminded me of making music on top of browsers is the goal for this event.
We are still making "sounds" but eventually creating "music" using these
technologies, should be the ultimate goal.  

## Hacking

There were 40+ attendees and people from W3C, instrument makers (YAMAHA, Roland,
Korg, Crimson Technologies), JSPA, [AMEI (Association of Musical Electronics
Industry)](http://www.amei.or.jp/),etc. It's more like instrument industry event
from outside. (Attendees were mostly web engineers I guess)  

The instrument makers lent us many equipments as usual, but attendees also
brought their own fun gadgets to the venue. Check out photos from the event
(click on the picture below).  

[![](http://4.bp.blogspot.com/-bM8bMaRi49M/VBlAYoU4grI/AAAAAAAAt4s/N0J-psHopX0/s1600/Screen%2BShot%2B2014-09-17%2Bat%2B17.03.15.png)](https://plus.google.com/events/gallery/cqvnr68c6r4b43dikum0kaljme4)

## Demos

We started hacking at 11:30AM, finished at 4:30PM. There was only 5 hours
hacking time, but people came up with fantastic works in total 26! I can't
mention about everything, so let me pick up some best ones.  

We have [an archive of live streaming of 2 and half hours of demo
time](https://www.youtube.com/watch?v=z_TGofN7wv8). If you are interested or
bored, check it out. (click on pictures to start the video from relevant time)  

### Mr. Murai

[![](http://2.bp.blogspot.com/-LTLovd4pJZk/VBk7p6nAkfI/AAAAAAAAt2k/AvegmkSuuP0/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.58.11.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=5)

Mr. Murai is called a father of Japanese internet. He showed up as a special
guest and it was an honor that he's interested in this technology. People got
excited.  

### D.F.Mac

This was the 3rd attendance for [D.F.Mac](https://twitter.com/tadfmac) to this
hackathon. Everything he creates is unique and this one didn't betray us. He
made vegetables and cans into instruments. Try the video to hear the weird
sound. I don't know how it works in detail, but here's [the technical
document](http://qiita.com/tadfmac/items/f2172cdacbdd5600256e) he wrote (in
Japanese).  

[![](http://3.bp.blogspot.com/-LNhujEptdg4/VBk7xiEDhKI/AAAAAAAAt2s/PC-kzjtCHR4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.48.53.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=420)

### Masayuki Yokobori

He stole his son's toys and created an app using them. The train make sounds
using MIDI.

[![](http://3.bp.blogspot.com/-9NoGJKF0l-4/VBk7xtw9RmI/AAAAAAAAt20/EGc7lONVWmk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.49.53.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=672)
  
### Daichi Hirono

ScoreSketch is a simple sequencer by the winner of 2nd hackathon.  

[![](http://2.bp.blogspot.com/-ogx25A4rL98/VBk7xlrR_RI/AAAAAAAAt2w/IfePipKuXME/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.50.25.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=1037)

### kirinsan.org

Dictates
sound [Otamatone](https://www.youtube.com/watch?v=B8WjnyvpaMg) generates,
convert it to MIDI signals, and play synthesizer.  

[![](http://2.bp.blogspot.com/-lqGIZDtaxOY/VBk7yQ7DvII/AAAAAAAAt24/qbWMI8JToBA/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.51.14.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=1654)

### Takashi Takagi(@okame_okame)

Electric Mokugyo ([Source code](https://github.com/okame/MOKUGYO2))  
Mokugyo is a wooden drum that buddhists use to pray. He used it as an
instrument.  

[![](http://2.bp.blogspot.com/-KCxTMKZDn3Q/VBk7y3Pz4ZI/AAAAAAAAt28/4eqH3CZonzo/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.52.08.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=2095)

### @watilde

[abeck.js](http://watilde.github.io/abeck/) ([Source
code](http://github.com/watilde/abeck))  
By writing a music sequence using [ABC notation](http://abcnotation.com/), it
plays music and draws a sheet.  

[![](http://2.bp.blogspot.com/-IynrkpwvCKM/VBk7zOEumGI/AAAAAAAAt3A/-WIoFx66GkQ/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.13.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=2727)

### @mohayonao, @nanonum

[Automatic composition](http://mohayonao.github.io/web-music-hack0913/) ([Source
code](http://github.com/mohayonao/web-music-hack0913/))  
Some people may know [@mohayonao](http://twitter.com/mohayonao) for creating
incredible web audio demos. He and @nanonum created a cool music / visualization
demo.  

[![](http://2.bp.blogspot.com/-b800JQGz7qQ/VBk7zhsXE9I/AAAAAAAAt3Y/rXNB3As33cY/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.43.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=3958)

### CookPitch

This is one of unique demos using Web Audio. It demonstrated a recipe site user
can navigate pages by hamming, without using hand. Good for cooks.  

[![](http://1.bp.blogspot.com/-oTBC9lnkkuE/VBk7z1L-R5I/AAAAAAAAt3Q/eFEWVemjccw/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.55.23.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=6054)

### Himakan

[Face Tracking
Effector](http://himakan.github.io/facetracking-effector/) ([Source
code](https://github.com/himakan/facetracking-effector/))  

The winner of this hackathon. I've seen similar ideas before, but this one is
way cooler.  

[![](http://3.bp.blogspot.com/-X0rcTvPXlPo/VBk7znQLwdI/AAAAAAAAt3U/I0pJ7LZ0yLE/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.54.53.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=4404)

### @aike1000

Future effectors  
Realistic effectors on a browser. @aike1000 played one of his composition with
his guitar using these.  

[![](http://2.bp.blogspot.com/-hENzeiN9T68/VBk70h-nbBI/AAAAAAAAt3g/HDgbM_I2yk4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.04.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=6994)

### @sascacci

Miracle collaboration  
A collaboration of V-Drum and Dontata-kun. Dontata-kun is a little drum player
controlled via MIDI. He demonstrated Dontata-kun playing drums synching him
playing drums! using JSPA's song.  

[![](http://2.bp.blogspot.com/-a5G6Tx7JZZk/VBk702v7-5I/AAAAAAAAt38/cJyd6zY_OTU/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.56.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=7328)

### @g200kg

@g200kg showed a revised version of Livebeats.  

[![](http://2.bp.blogspot.com/-3TewUNce3T8/VBk71kAV0uI/AAAAAAAAt3w/R2no9-0-Evk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.57.43.png)](http://www.youtube.com/watch?v=z_TGofN7wv8#t=7598)

## Closing

[![](http://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)](http://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)

This one was again, successful and fun hackathon. Attendees seem to be getting
used to using their own favorite platform to build an audio app. Hopefully we
can invite musicians and create music as well as apps, in the future.  

See you next time!  

[![](http://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)](http://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)

P.S. Main organizer [Ryoya Kawai.](https://twitter.com/ryoyakawai) Otsukare
sama!
