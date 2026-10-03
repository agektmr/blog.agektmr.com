---
layout: post
lang: en
title: "An Event for Enjoying Sound in the Browser: Web Music Hackathon #3 Report"
date: 2014-09-17
updated: 2014-09-17
tags:
  - Hackathon
  - Web MIDI API
  - Web Audio API
image:
  feature: /event-report-web-music-hackathon-3/guitar.jpg
translationOf: /2014/09/web-music-3.html
translated: 2026-10-03
translatedManually: false
---
Time flies—this was already the third edition of our hackathon exploring and enjoying sound using browser-ready technologies like the Web Audio API and Web MIDI API. Once again, it was packed with rich content and a ton of fantastic creations, but in this post, I'd like to share a quick overview of how it went.

<!-- excerpt -->

[![](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)

As it turns out, [Web Audio Hackday](https://www.eventbrite.co.uk/e/web-audio-hack-day-tickets-12451959145) took place in Berlin just the day before our hackathon. Since the dates were so close, we thought [it would be great to collaborate somehow](https://twitter.com/thedeftone/status/510666227401121793), reached out to each other, and decided to share our results through recap blog posts. I plan to publish an English version of this article shortly. I'll also add a link to the report from Berlin as soon as it's published.

## Opening

After introductory greetings, we kicked things off with an update on the Web MIDI API specifications by [@toyoshim](http://twitter.com/toyoshim), a Google engineer working on the [Web MIDI API](http://www.w3.org/TR/webmidi/) implementation. Here are his slides:

<div style="text-align: center;">
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39034752" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/toyoshim/web-midi-api-update">Web MIDI API update</a></strong> from <strong><a href="http://www.slideshare.net/toyoshim">Takashi Toyoshima</a></strong>
  </div>
</div>

Next, our returning tutors—[@g200kg](https://twitter.com/g200kg), [@aike1000](https://twitter.com/aike1000), and [@sascacci](https://twitter.com/sascacci), who are well-known figures in Japan's Web Music scene (and globally renowned among those in the know)—each gave demos of applications built with Web Audio and MIDI. The sheer caliber of their work raised the hackathon bar considerably.

@sascacci showcased visual effects driven by electronic drums:

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/HmEfgCHhMFS"></div></div>

@aike1000 introduced and demoed various templates. His [sample code collection](https://github.com/aike/webaudiodemo) contains incredibly handy snippets ranging from generating a sine wave with the Web Audio API to playing audio samples and using delays, pitch shifters, and distortion—anyone interested in web audio programming should definitely check it out. He also shared a [collection of synth templates](http://d.hatena.ne.jp/aike/20140909) and a [VJ framework](http://d.hatena.ne.jp/aike/20140913).

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UY4FimuRHUe"></div></div>

@g200kg demonstrated LiveBeats:

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/VWuysJxCfh7"></div></div>

In addition, Mr. Tada from Yamaha announced the Web Music DAW Connector, which bridges DAWs (Digital Audio Workstations)—professional music production software—with the browser. With this, developers can bring plugins built in JavaScript directly into professional music production workflows. You can really feel the Web Music world steadily making progress.

<div style="text-align: center;">
  <div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/L5unwFUp2Xa"></div>
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39002835" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/yukiotada/140913-web-musichackathonwmdc-39002835">140913_WebMusicHackathon_WMDC</a></strong> from <strong><a href="http://www.slideshare.net/yukiotada">Yukio Tada</a></strong>
  </div>
</div>

And to top it off, someone from JSPA (Japan Synthesizer Programmers Association) composed and performed an original song specifically for this event. Using [Pokemiku](http://otonanokagaku.net/nsx39/) as the sound source, it featured not just backing tracks but full vocals by Hatsune Miku. They even produced a video for it:

{% YouTube 'MYnUvkDKT34' %}

Since this event was originally conceived with the goal of enabling experiences on the web platform that could genuinely be called "music," this was tremendously inspiring. While we must admit that we are still at a rather primitive "sound" level right now, building up the platform step by step to unlock richer musical possibilities is what makes this effort so exciting.

## Hacking

The venue brought together over 40 participants, alongside many attendees from the W3C, musical instrument manufacturers like Yamaha, Roland, Korg, and Crimson Technology, as well as representatives from [JSPA (Japan Synthesizer Programmers Association)](http://www.jspa.gr.jp/) and [AMEI (Association of Musical Electronics Industry)](http://www.amei.or.jp/). The level of interest from the musical instrument industry was so strong that it almost overshadowed the web industry.

As with previous events, the manufacturers loaned out instruments, but it was especially impressive how many participants brought their own gear. Check out the photos below to get a sense of the creative energy during the hacking session:

[![](https://4.bp.blogspot.com/-bM8bMaRi49M/VBlAYoU4grI/AAAAAAAAt4s/N0J-psHopX0/s1600/Screen%2BShot%2B2014-09-17%2Bat%2B17.03.15.png)](https://plus.google.com/events/gallery/cqvnr68c6r4b43dikum0kaljme4)

## Demo Time

The hacking session started at 11:30 AM and concluded at 4:30 PM. In just five short hours, a total of 26 unique projects were created, including those by our tutors. While we can't feature everything, here are a few highlights.

Learning from past experiences, we captured the audio for this demo livestream directly via line-in, allowing us to preserve a very high-quality video archive. A big thank you to Roland for providing the equipment. It runs for two and a half hours, but if you're interested, please check out the [full livestream archive](https://www.youtube.com/watch?v=z_TGofN7wv8).

*Note: Each image links to the corresponding timestamp on YouTube.

### Professor Murai

[![](https://2.bp.blogspot.com/-LTLovd4pJZk/VBk7p6nAkfI/AAAAAAAAt2k/AvegmkSuuP0/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.58.11.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=5)

The demo session opened with a special guest: Professor Jun Murai from Keio University, known as the "Father of the Internet in Japan," who gave welcoming remarks. Having such an esteemed guest kicked the excitement up to another level.

### D.F.Mac

Marking his third appearance and a perfect attendance record, [D.F.Mac](https://twitter.com/tadfmac) once again baffled and delighted the room with an eccentric creation: a project where triggering vegetables and empty cans triggers sounds from a DAW hooked up to the browser. Read his detailed write-up [here](http://qiita.com/tadfmac/items/f2172cdacbdd5600256e).

[![](https://3.bp.blogspot.com/-LNhujEptdg4/VBk7xiEDhKI/AAAAAAAAt2s/PC-kzjtCHR4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.48.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=420)

### Masayuki Yokobori

A project connecting a Densha de Go! train simulator controller via MIDI to produce convincing train sound effects.

[![](https://3.bp.blogspot.com/-9NoGJKF0l-4/VBk7xtw9RmI/AAAAAAAAt20/EGc7lONVWmk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.49.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=672)

### Daichi Hirono

ScoreSketch is a lightweight sequencer. As you would expect from the winner of the previous hackathon, it showed an exceptionally high degree of polish.

[![](https://2.bp.blogspot.com/-ogx25A4rL98/VBk7xlrR_RI/AAAAAAAAt2w/IfePipKuXME/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.50.25.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1037)

### kirinsan.org

A project that analyzes the sound of an Otamatone (?) and converts it into MIDI signals to play a synthesizer.

[![](https://2.bp.blogspot.com/-lqGIZDtaxOY/VBk7yQ7DvII/AAAAAAAAt24/qbWMI8JToBA/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.51.14.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1654)

### Takashi Takagi (@okame_okame)

Electric Mokugyo ([Source code](https://github.com/okame/MOKUGYO2))
A new creation by Takagi-san, who treats us to mokugyo (wooden fish temple drum) stunts^H art every time.

[![](https://2.bp.blogspot.com/-KCxTMKZDn3Q/VBk7y3Pz4ZI/AAAAAAAAt28/4eqH3CZonzo/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.52.08.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2095)

### @watilde

[abeck.js](http://watilde.github.io/abeck/) ([Source code](http://github.com/watilde/abeck))
A project where inputting a sequence using [ABC notation](http://abcnotation.com/) plays back the music and generates the corresponding sheet music.

[![](https://2.bp.blogspot.com/-IynrkpwvCKM/VBk7zOEumGI/AAAAAAAAt3A/-WIoFx66GkQ/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.13.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2727)

### @mohayonao, @nanonum

[Automatic Composition](http://mohayonao.github.io/web-music-hack0913/) ([Source code](http://github.com/mohayonao/web-music-hack0913/))
Although it just missed an award, this was a lavish project that was musically impressive and came complete with visualizations.

[![](https://2.bp.blogspot.com/-b800JQGz7qQ/VBk7zhsXE9I/AAAAAAAAt3Y/rXNB3As33cY/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=3958)

### CookPitch

A recipe service where you can flip pages and navigate using hummed pitches. Since it's completely hands-free, you can consult your PC while cooking!

[![](https://1.bp.blogspot.com/-oTBC9lnkkuE/VBk7z1L-R5I/AAAAAAAAt3Q/eFEWVemjccw/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.55.23.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6054)

### Himakan

[Face Tracking Effector](http://himakan.github.io/facetracking-effector/) ([Source code](https://github.com/himakan/facetracking-effector/))
The winning project of this hackathon. While I've seen a few conceptually similar experiments before, the execution of this piece was overwhelmingly cool.

[![](https://3.bp.blogspot.com/-X0rcTvPXlPo/VBk7znQLwdI/AAAAAAAAt3U/I0pJ7LZ0yLE/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.54.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=4404)

### @aike1000

Effector of the Future

He took the guitar effect showcased during his opening demo, gave it an authentic look (haven't we seen that somewhere before...?), and performed it as a full song.

[![](https://2.bp.blogspot.com/-hENzeiN9T68/VBk70h-nbBI/AAAAAAAAt3g/HDgbM_I2yk4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.04.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6994)

### @sascacci

A Miraculous Collaboration

A miraculous collaboration between V-Drums and Dontata-kun. Dontata-kun played the drums in sync with the V-Drums, culminating in an impromptu jam session over the track provided by JSPA!

[![](https://2.bp.blogspot.com/-a5G6Tx7JZZk/VBk702v7-5I/AAAAAAAAt38/cJyd6zY_OTU/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.56.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7328)

### @g200kg

He presented an upgraded version of Livebeats.

[![](https://2.bp.blogspot.com/-3TewUNce3T8/VBk71kAV0uI/AAAAAAAAt3w/R2no9-0-Evk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.57.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7598)

## Wrap-up

[![](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)

This Web Music Hackathon was another resounding success. As participants become more comfortable with their chosen platforms, you can clearly tell the creations are becoming increasingly musical. There is still a ways to go, but personally, I hope this grows into an event where practicing musicians can join in and have fun as well.

Stay tuned for the next one!

[![](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)

P.S. Huge thanks to the organizer, [Mr. Kawai](https://twitter.com/ryoyakawai), for all your hard work!
