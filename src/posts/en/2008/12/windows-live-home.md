---
layout: post
lang: en
title: Windows Live Home is released
description:
date: 2008-12-04
tags:
  - SocialWeb
  - Windows Live
translationOf: /2008/12/windows-live-home.html
translated: 2025-11-30
translatedManually: false
---
Major overseas players are increasingly going social. This time it's finally Microsoft.

Speaking of Windows Live, it originally existed as a social networking service called [Spaces](http://spaces.live.com/), a blogging service that incorporated Messenger's social graph. Now, however, [Home](http://home.live.com/) has become the centerpiece, making it even more social networking-like.

## Windows Live Profile

![livenew1](/images/2008/12/livenew1.jpg)

The top right of the screen displays your friend list, and the center displays what's commonly referred to as your activity stream on other social networking sites. Like Facebook, the activity stream is displayed entirely chronologically, not organized by service. What's interesting about it is that it mixes in mood messages from Live Messenger, giving it a Twitter-like feel. Feeds from selected external services are also displayed.

The URL is simple, as it is expressed as a sub-subdomain(?) with a string that appears to be the user's secret ID. It would be smart if this secret ID could be changed later.

Windows Live Home

![livenew3](/images/2008/12/livenew3.jpg)

At the top is your latest email from [Live Mail](http://mail.live.com/) (formerly Hotmail). Below that, an activity stream displays updates from people you're connected to via Live Messenger. I'm not sure how it's organized with Spaces.

On the right side of the screen are ad slots, news, and fortune-telling.

Windows Live Photos

![livenew2](/images/2008/12/livenew2.jpg)

It's a photo storage service linked to [SkyDrive](http://skydrive.live.com/) (Microsoft offers 25GB(!) of free storage).
It also has an activity stream, but it likely displays a feed specifically for Live Photos. Not only can you see your friends' latest photos, but you can also upload your own.

## Importing external services

![livenew4](/images/2008/12/livenew4-300x207.jpg)

You can incorporate external sites like Twitter and Flickr into your activity stream. The first service that comes to mind is FriendFeed, but Facebook and Plaxo are more similar in that they're also social.

## Other new services

There also appears to be a group collaboration service called [Windows Live Group](http://group.live.com/).

![livenew5](/images/2008/12/livenew5-300x202.jpg)

It seems to be usable for group chats and photo sharing on Live Messenger.

## Technical aspects

Microsoft has announced that it will convert Windows Live ID to OpenID, but has not yet made any specific mention of other Open Stack features, such as [OpenSocial](http://www.opensocial.org/), [OAuth](http://oauth.net/), or [PorableContacts](http://portablecontacts.net/). Upon investigation, it appears that they are using a proprietary protocol called [Delegated
Authentication](http://msdn.microsoft.com/en-us/library/cc287637.aspx) to achieve something similar to OAuth.

Will they continue down their own path? Or will they go the route of Yahoo! or MySpace, combining their own path with open standards? The question remains.

## The meaning of Windows Live socialization

Even Microsoft has branched out into not only web services but also social media. This suggests that services that use social graphs as a platform will become commonplace on the web in the future. However, social media is not a panacea, nor does it mean that you can achieve anything immediately. It's only when there are services that can utilize it that it can be useful and enjoyable. So, what is Microsoft's strategy?

In fact, Windows Live Mail already has client software that can sync with server-based emails, and SkyDrive is rumored to have a client that can be used seamlessly on the desktop and web. And that goes without saying for Messenger. The social graph has long been shared between Messenger and Hotmail. Another blog editing software, Writer, has already been released.

These are clearly designed to be used in combination with cloud-based web services and desktop software, and each of them can be made even more effective with social networking-like features.

Microsoft has been quietly developing web services up until now, but with that in mind, we can't deny the possibility that they'll make a big splash when Windows 7 is released.

## Things I was curious about

I'm concerned that there's no use for [Windows Live Gadget](http://gallery.live.com/) in Home. I'm not familiar with the gadget specifications, but what if they were to create their own JavaScript API to replace OpenSocial...?

The strategy here is a concern.
