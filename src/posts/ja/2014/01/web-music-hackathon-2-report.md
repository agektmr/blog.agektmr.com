---           
layout: post
lang: ja
title: Web Music Hackathon #2 Report
date: 2014-01-21
updated: 2014-01-21
tags:
  - English
  - Hackathon
  - Web Audio API
  - Web MIDI API
  - WebRTC
---

[日本語版はこちら](http://blog.agektmr.com/2014/01/web-music-2.html)

On January 18th 2014, Google cooperated with a community [Web Music Developers
JP](https://groups.google.com/forum/#!forum/web-music-developers-jp) and held
the second Web Music Hackathon at Google Tokyo office.

[![MIDIappy designed by g200kg](https://2.bp.blogspot.com/-pWg7ZbpuApI/UtnT0-ZQ3wI/AAAAAAAAn_E/yz5p7NI-OrE/s1600/IMG_20140118_095419.jpg)](https://2.bp.blogspot.com/-pWg7ZbpuApI/UtnT0-ZQ3wI/AAAAAAAAn_E/yz5p7NI-OrE/s1600/IMG_20140118_095419.jpg)

This hackathon is aimed to hack:

* [Web Audio API](http://www.w3.org/TR/webaudio/): API for audio synthesis
* [Web MIDI API](http://www.w3.org/TR/webmidi/): Lets you control MIDI
* [WebRTC](http://www.w3.org/TR/webrtc/): Transfer audio, video or data over P2P
* [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html): Voice recognition API

and build something within a day.

The first hackathon was a blast with quite a few fantastic apps built. Read
details on [this blog article (in
Japanese)](http://blog.agektmr.com/2013/10/web-music.html).

This hackthon again, was with cooperation from [AMEI (Association of Musical
Electronics Industry)](http://www.amei.or.jp/), [YAMAHA](http://jp.yamaha.com/),
[Korg](http://www.korg.co.jp/), [Roland](http://www.roland.co.jp/) and [Crimson
Technology](http://www.crimsontech.jp/) brought instruments to hack on, as well
as [NTT Communications](http://www.ntt.com/) brought equipments to make WebRTC
environment easier.

The demo Mr. Watanabe from Roland shows off at the beginning of the event
represented the potential of this area quite well.

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/9uSFkerFQjR"></div>

It turned out we had 30+ attendees with many observers from each instrument
manufactures etc, 60+ people packed in the venue.

[![](https://3.bp.blogspot.com/-iM3QjdgmBlQ/UtnTaoKfhzI/AAAAAAAAnzM/zYjBKbYaKDs/s1600/IMG_20140118_095100.jpg)](https://3.bp.blogspot.com/-iM3QjdgmBlQ/UtnTaoKfhzI/AAAAAAAAnzM/zYjBKbYaKDs/s1600/IMG_20140118_095100.jpg)

[![](https://4.bp.blogspot.com/-o03kTxNUi4Y/UtnTe2OytlI/AAAAAAAAnzU/rTp5iHL0mMo/s1600/IMG_20140118_095107.jpg)](https://4.bp.blogspot.com/-o03kTxNUi4Y/UtnTe2OytlI/AAAAAAAAnzU/rTp5iHL0mMo/s1600/IMG_20140118_095107.jpg)

[![](https://2.bp.blogspot.com/-Gm7zLZA9LKk/UtnTo37e4TI/AAAAAAAAnz8/oIR7WJuP2o4/s1600/IMG_20140118_095149.jpg)](https://2.bp.blogspot.com/-Gm7zLZA9LKk/UtnTo37e4TI/AAAAAAAAnz8/oIR7WJuP2o4/s1600/IMG_20140118_095149.jpg)

[![](https://3.bp.blogspot.com/-2Dq5uJXMLjk/UtnTmpD0qGI/AAAAAAAAnz0/aMZXhcziQg4/s1600/IMG_20140118_095142.jpg)](https://3.bp.blogspot.com/-2Dq5uJXMLjk/UtnTmpD0qGI/AAAAAAAAnz0/aMZXhcziQg4/s1600/IMG_20140118_095142.jpg)

[![](https://2.bp.blogspot.com/-5VB2kMqo5Lc/UtnTuBoS09I/AAAAAAAAn0M/8vrjzbRqTmY/s1600/IMG_20140118_095247.jpg)](https://2.bp.blogspot.com/-5VB2kMqo5Lc/UtnTuBoS09I/AAAAAAAAn0M/8vrjzbRqTmY/s1600/IMG_20140118_095247.jpg)

[![](https://1.bp.blogspot.com/-oM7xdAx8tV4/UtnT2fEl3UI/AAAAAAAAn0s/VaT-qiJUhZ8/s1600/IMG_20140118_095424.jpg)](https://1.bp.blogspot.com/-oM7xdAx8tV4/UtnT2fEl3UI/AAAAAAAAn0s/VaT-qiJUhZ8/s1600/IMG_20140118_095424.jpg)

## The demos

Hack started before noon, finished around half past 4 PM then we moved to the
demo time. More than 20 fantastic works were done. There's a video recording
available online. You can watch it along with other photos and comments at
[Google+ event](https://plus.google.com/events/c39ncqloticnheus2ksk34ef0bc).

I've picked up several notable presentations here since the video is very long
lasting nearly 3 hours. Each photos are linked to relevant starting time of the
video.

A browser keyboard
utilizing [@mohayonao](https://twitter.com/mohayonao)'s [CoffeeCollider](http://mohayonao.github.io/CoffeeCollider/). Your
code in the form is recognized in realtime.

[![](https://4.bp.blogspot.com/-9HsNrcuJIjU/UtuQMKW2XtI/AAAAAAAAn-E/Alyw3GwuzHg/s1600/cckb.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=8m52s)

Let browser sing with [eVY1](http://www.switch-science.com/catalog/1490/) which
has YAMAHA's new sound
module [NSX1](http://jp.yamaha.com/news_release/2013/13102301.html) on it. You
can find the app [here](http://sound.heteml.jp/webmusic2/) (requires eVY1)

[![](https://1.bp.blogspot.com/--YHskqWDRoY/UtuQLxX6caI/AAAAAAAAn-U/ZdYuR5VU1GQ/s1600/evy1.png)](https://www.youtube.com/watch?v=dCvuBz1FYWgt=31m)

Leave 2 second message associated with your Twitter account
at [My-hi.net](http://my-hi.net/). You can listen to others' voice by hovering
cursor over Twitter icons.

[![Tins as MIDI instruments.](https://1.bp.blogspot.com/-2A3FoRD1tE0/UtuYkG7rn6I/AAAAAAAAn_Y/y0cbZ8XqcaI/s1600/my-hi.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=1h3m27s)

[![](https://2.bp.blogspot.com/-0V-yR1WIItM/UtuQMdA5flI/AAAAAAAAn-Y/dxrSrVESakg/s1600/kan.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=2h15m)

"MIDIappy" is a mascot character designed by [gaito a.k.a
g200kg](https://twitter.com/g200kg). He made it dance as a 3D modeled figure on
WebGL and controllable using a MIDI controller.

[![](https://3.bp.blogspot.com/-JuSpa84yNUM/UtuQNKebvbI/AAAAAAAAn-o/xXN2z6ByRSw/s1600/midiappy.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=2h22m)

The most flashy demo at this hackathon was this one. Multiple demos together
including a Leap Motion controllable mirror ball via DMX, a visual effects demo
using WebRTC, WebGL with music analysis + MIDI controller, etc.

[![](https://3.bp.blogspot.com/-cl0wn3wx9Iw/UtuQOUgQRxI/AAAAAAAAn-4/YCMWmmpbefM/s1600/x.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=22m24s)

This one got the second prize. The presenter played music using gesture over
Leap Motion and visualized the sound to touch pads on Ableton Push. Check out
his fancy gesture.

[![](https://1.bp.blogspot.com/-nxhBYrk8jhU/UtuQNXIgCKI/AAAAAAAAn-s/JSr1hHDNh1c/s1600/mtomasz.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=57m20s)

The winner of the hackathon was a music sequencer using Google Spreadsheet +
Chrome Extension. It's amazing to see how effective to use spreadsheet as a
sequencer platform. Note that the referencing feature of spreadsheet is used to
represent chords.

[![](https://4.bp.blogspot.com/-S8eWkPrgXs8/UtuQNg9xhqI/AAAAAAAAn-w/pSmrxoQrft0/s1600/spreadsheet.png)](https://www.youtube.com/watch?v=dCvuBz1FYWg&t=47m18s)

## Conlusion

Actually, half of attendees at this hackathon had attended the last one as well.
I can tell because it was so much fun! Unfortunately I missed the after party
but this one was also a great event.

I'm hoping we can continue holding this event and gradually shift our focus on
something more musical rather than sound oriented.

If you are interested in this event, please subscribe to [our mailing
list](https://groups.google.com/forum/#!forum/web-music-developers-jp) or join
[Google+ community](https://plus.google.com/communities/111657869969887793180).
[Ryoya Kawai](https://plus.google.com/+RyoyaKAWAI/posts) who is the main
organizer of this event will give you updates.

We're looking forward to your attendance.
