---
title: iGoogle Finally Adds OpenSocial Support
layout: post
lang: en
date: 2008-04-22
tags:
  - Gadget
  - iGoogle
  - OpenSocial
translationOf: /2008/04/igoogleopensocial.html
translated: 2026-10-03
translatedManually: false
---
Starting today, [a sandbox has become available on iGoogle to support OpenSocial features](http://jp.techcrunch.com/archives/20080421hints-of-igoogle-turning-into-its-own-social-network/). This clearly signifies that **Google itself is turning into a platform built on top of a social network**. A while back, there was talk of [a project called "Maka-Maka"](http://jp.techcrunch.com/archives/googles-response-to-facebook-maka-maka/) where Google was rumored to launch its own SNS service. Seeing that take an open form through OpenSocial, and—even though it was somewhat expected—materialize as iGoogle, all I can say is: impressive.

So, I gave it a try right away.

First, signing up. You can do that [here](http://www.google.com/ig/sandbox). (It seems you need to set your language preference to English; otherwise, you won't be able to use the sandbox even after signing up.)

![igoogle_signup](/images/2008/04/igoogle_signup-300x161.jpg)

http://code.google.com/apis/igoogle/docs/anatomy.html

Here is the new iGoogle screen.

![igoogle_top](/images/2008/04/igoogle_top-300x147.jpg)

On the left side of the screen are the installed applications/gadgets. Clicking one opens the canvas view.

![igoogle_navi](/images/2008/04/igoogle_navi-110x300.jpg)

The right side of the screen is supposed to show an activity stream under "Updates," but I haven't been able to confirm it yet. Since it's an SNS, having a friends list is to be expected, but in the sandbox, you start with no friends, and you can only become friends with other users who are also registered in the sandbox. Exactly how to add friends is still unclear. In the actual production service, it's easy to imagine it starting from your Google Talk/Gmail contacts.

In addition, the way settings options are displayed for each gadget seems to have changed.

And since I have access to the sandbox, I immediately tested FriendIntroducer, which I built previously. Knowing that even with OpenSocial, view names can vary slightly by container, I added the `home` view to the gadget XML and added it via the Developer gadget.

![igoogle_gadget](/images/2008/04/igoogle_gadget.jpg)

Well, since I don't have any friends yet, it naturally displays like this, but I was able to confirm that it works. That's OpenSocial for you.

## Summary

Even if it's just infrastructure, Google is truly formidable. It lays deep roots—enough to swallow up all web services. Just look at Gmail adoption by au and livedoor, or Google App Engine. It almost feels like everything under the sun is being put on top of Google.

And Google also has Android. Yes, mobile phone address books will likely connect to this friends list as well. Once that happens, users will seamlessly be able to receive notifications of friends' blog updates via email, or browse them directly on their phones without any friction.

What's missing now is perhaps a profile view. While partially realized in Google Maps and Google Groups, it will be fascinating to see how it all comes together.
