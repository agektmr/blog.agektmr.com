---
title: Google Developer Meetup
layout: post
lang: en
date: 2008-03-15
tags:
  - Gadget
  - Google
  - OpenSocial
  - Shindig
  - Widget
translationOf: /2008/03/google.html
translated: 2026-10-03
translatedManually: false
---
I attended the Google Developer Meetup held at the Diamond Hall in Omotesando. Since the theme this time was OpenSocial, it was spot on for my interests. I was able to clear up quite a few questions.

## Are OpenSocial applications (gadgets) not portable across different SNSs?

This is a very fundamental question. Since the purpose of OpenSocial is to reduce the burden on application developers by standardizing APIs across different SNSs, I had assumed that compatibility would be guaranteed, but it seems that's not necessarily the case. **That's because OpenSocial does not define what hosts the application (Google Gadgets in Orkut's case).**

Looking at the OpenSocial specifications, all the sample code is written assuming Google Gadgets, but the actual spec does not state that Google Gadgets are a requirement. In other words, whether it's an Opera Widget, Yahoo! Widget, or Dashboard Widget, you can host it wherever it fits. So, to clear this up, I asked Chris (I forgot his last name), who gave the presentation.

* Gadgets are not limited solely to Google Gadgets.
* MySpaceApp, hi5, and Orkut will be provided in Google Gadget format (unconfirmed).
* Applications can basically be shared across SNSs, but if they rely on extended features, they might not work on other SNSs.

With my poor English skills, I only got answers that left me feeling somewhat unconvinced. It still feels a bit fuzzy, but here's my personal take on it:

* Gadgets do not need to be Google Gadgets.
* Application developers can share the core functionality, but they will need to prepare the gadget container part for each individual SNS.

## Is OpenSocial useless until the RESTful API specification comes out?

The main highlight of OpenSocial is being able to retrieve friends' information from an SNS, which naturally requires authentication and authorization. While the JavaScript API makes it look as though you can easily fetch this using something like `newDateRequest`, the implementation on the container side isn't quite that simple.

Assuming Google Gadgets, there are two choices for content types. One is "html" mode, where the HTML is also written inside the Gadget XML. The other is "url" mode, where you specify a remote URL inside the Gadget XML. While "html" mode runs on the gmodules.com domain managed by Google, "url" mode runs on an entirely different domain managed by a third party. The sharp-eyed among you will probably realize at this point:

**To access OpenSocial SNS information from a remote server, there is no other way than hitting the SNS's RESTful API via that remote server's proxy.**

This simply stems from the fact that Ajax cannot make cross-domain requests, but it's a very important point. Since OpenSocial doesn't have an official RESTful API ready yet, won't it be pretty useless without it? What's MySpace's RESTful API anyway!? Isn't Orkut's iLike app hosted remotely!? Questions kept piling up. (Wait, can't Ajax send requests directly if it's the domain where the JavaScript itself is hosted?!)

## About Shindig

Regarding Shindig, which I installed the other day, I was completely under the impression that it only supported Java. But then I heard that, although its implementation is behind Java's, there's also a PHP version!! I rushed home to check the code, and... sure enough, it was there. Its coding conventions feel a bit like Java, which is a little odd, but as someone who mainly uses PHP, this was a great discovery.

## Other things

* [An OpenSocial-compatible Dokoiku? beta service](http://beta.doko.jp/sandbox/) built with Shindig, created by someone from Recruit
* An Orkut app version of [Commusuke](http://commusuke.eisbahn.jp/)
* CodeRunner, an OpenSocial app coding environment (an app on Orkut)
* [The OpenSocial Japan community](http://sandbox.orkut.com/Community.aspx?cmm=47213793) on Orkut

...and so on. The kids are being noisy, so I'll wrap it up here for today.
