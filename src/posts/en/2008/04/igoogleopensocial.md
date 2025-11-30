---
layout: post
lang: en
title: iGoogle finally supports OpenSocial
description:
date: 2008-04-22
tags:
  - Gadget
  - iGoogle
  - OpenSocial
translationOf: /2008/04/igoogleopensocial.html
translated: 2025-11-30
translatedManually: false
---
Starting today, [iGoogle's sandbox is now available for use in preparation for the launch of OpenSocial features](http://jp.techcrunch.com/archives/20080421hints-of-igoogle-turning-into-its-own-social-network/). This clearly means that **Google itself is becoming a social network-based system**. Previously, there was talk of a [project called Maka-Maka](http://jp.techcrunch.com/archives/googles-response-to-facebook-maka-maka/) that would see Google launch its own social networking service, but while it was expected that this would take the open form of OpenSocial, seeing it become a reality in the form of iGoogle is nothing short of impressive.

So I tried it right away.

First, sign up. You can do so [here](http://www.google.com/ig/sandbox). (It seems that you won't be able to use the sandbox even if you sign up unless your language setting is set to English.)

![igoogle_signup](/images/2008/04/igoogle_signup-300x161.jpg)

http://code.google.com/apis/igoogle/docs/anatomy.html

This is the new iGoogle screen.

![igoogle_top](/images/2008/04/igoogle_top-300x147.jpg)

On the left side of the screen are the installed applications/gadgets. Clicking on this will open the canvas view.

![igoogle_navi](/images/2008/04/igoogle_navi-110x300.jpg)

Apparently, an activity stream (activity history) will be displayed as an Update on the right side of the screen, but I haven't been able to confirm this yet. Since it's a social networking service, it's not surprising that there would be a friend list, but in the sandbox, you start with no friends, and only users registered in the sandbox can become friends. It's still unclear how users can become friends. It's easy to imagine that when the service is actually released, users will start with their Google Talk/Gmail address book.

In addition, it appears that the way settings for each gadget are displayed has been changed.

Since I had a sandbox, I immediately tried out the FriendIntroducer I created previously. Even though it's OpenSocial, the view names are slightly different depending on the container, so I added the home view to the gadget XML and added it from the Developer gadget.

![igoogle_gadget](/images/2008/04/igoogle_gadget.jpg)

Hmm. Since I don't have any friends, it naturally shows this, but I was able to confirm that it's working. After all, it's OpenSocial.

## summary

Even though it's just a platform, Google is truly a formidable entity. It's so deep in the ground that it can swallow up all web services. Just like au and Livedoor's Gmail, and Google App Engine. It's like they want to put everything on Google.

And Google has Android, too. Yes, your phone's address book will be able to connect to this friends list. This will allow you to receive updates from your friends' blogs via email or view them directly on your phone, without any hassle.

The only thing missing is a profile view. Google Maps and Google Groups have partially implemented this, but it will be interesting to see how it all plays out.
