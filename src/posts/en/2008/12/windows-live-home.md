---
title: Introducing Windows Live Home
layout: post
lang: en
date: 2008-12-04
tags:
  - SocialWeb
  - Windows Live
translationOf: /2008/12/windows-live-home.html
translated: 2026-10-03
translatedManually: false
---
Major global players are going social one after another. And now, it's finally Microsoft's turn.

Speaking of Windows Live, [Spaces](http://spaces.live.com/) originally existed as an SNS—a blogging service incorporating the Messenger social graph—but now [Home](http://home.live.com/) takes center stage, making it even more SNS-like.

## Windows Live Profile

![livenew1](/images/2008/12/livenew1.jpg)

In the upper right corner of the screen is a friends list, and in the center is what other social networks call an activity stream. Just like Facebook, the activity stream is strictly chronological, without being grouped by service. The fact that Live Messenger mood messages are mixed in gives it an interesting, Twitter-like feel. Feeds from specified external services are also displayed mixed into the stream.

The URL is simple, represented with what looks like an internal user ID in a sub-subdomain (?). It would be sleek if this internal ID could be changed later on.

## Windows Live Home

![livenew3](/images/2008/12/livenew3.jpg)

At the very top are the latest emails from [Live Mail](http://mail.live.com/) (formerly Hotmail). Below that, updates from people connected via Live Messenger are displayed as an activity stream. How it's organized relative to Spaces is somewhat unclear.

On the right side of the screen are ad spaces, news, and horoscopes. Hmm, pretty plain.

## Windows Live Photo

![livenew2](/images/2008/12/livenew2.jpg)

A photo storage service integrated with [SkyDrive](http://skydrive.live.com/) (MS's 25GB(!) free storage service). There is an activity stream here as well, but it seems to display a feed specifically tailored to Live Photo. In addition to checking out your friends' latest photos, you can also upload your own.

## Importing External Services

![livenew4](/images/2008/12/livenew4-300x207.jpg)

You can import external sites such as [Twitter](http://twitter.com/) and [Flickr](http://flickr.com/) to mix them into your activity stream. The first similar service that comes to mind is [FriendFeed](http://friendfeed.com/), but given that Windows Live is an SNS itself, in a way it might be closer to [Facebook](http://www.facebook.com/) or [Plaxo](http://www.plaxo.com/).

## Other New Services

There also appears to be a group collaboration service called [Windows Live Group](http://group.live.com/).

![livenew5](/images/2008/12/livenew5-300x202.jpg)

It seems to be usable for group chat via Live Messenger and photo sharing.

## Technical Aspects

Microsoft has announced that Windows Live ID will support OpenID, but has not yet made any specific mention regarding other components of the Open Stack—namely, [OpenSocial](http://www.opensocial.org/), [OAuth](http://oauth.net/), and [PorableContacts](http://portablecontacts.net/). Looking into it, they seem to be achieving OAuth-like functionality using a proprietary protocol called [Delegated Authentication](http://msdn.microsoft.com/en-us/library/cc287637.aspx).

Will they continue down this proprietary path? Or will they follow the route of Yahoo! and MySpace with a proprietary + open standards approach? Questions remain.

## The Significance of Windows Live Going Social

In the end, even Microsoft has jumped into going social in addition to web services. This suggests that services built on social graphs as a platform will become the norm for the future web. However, going social isn't a silver bullet, nor does it immediately solve everything. Only when there are services capable of leveraging it can users truly reap the benefits. So, what is Microsoft's strategy?

Actually, a client application capable of syncing with the server has already been released for Windows Live Mail, and there are rumors of a client that enables seamless use of SkyDrive across desktop and web. Messenger goes without saying. The social graph has long since been shared between Messenger and Hotmail. In addition, a blog editing software called Writer has already been released.

These are clearly conscious of combining web services in the cloud with desktop software, and all of them can unlock greater potential through SNS-like features.

Microsoft has felt somewhat subdued in the web services space so far, but looking at it this way, you can't rule out the possibility of them making a massive transformation when Windows 7 launches.

## Lingering Questions

One thing that catches my attention is that they haven't provided a place to use [Windows Live Gadget](http://gallery.live.com/) on Home. I'm not familiar with the Gadget specs, but what if they are preparing a proprietary JavaScript API to replace OpenSocial...?!

Their strategy in this area will be very interesting to watch.
