---
title: A Glimpse into the Future of the Social Web Through FriendConnect
layout: post
lang: en
date: 2008-06-20
tags:
  - OAuth
  - OpenID
  - OpenSocial
  - PortableContacts
  - DataPortability
  - FriendConnect
  - SocialWeb
translationOf: /2008/06/friendconnect.html
translated: 2026-10-03
translatedManually: false
---
A bit late now, but I recently attended Google I/O held in San Francisco.

Among all the sessions, the one that left the strongest impression on me was "OpenSocial, OpenID, and OAuth: Oh My!" by Joseph Smarr of Plaxo. Out of all the sessions I saw, it was by far the most popular—not only were all the chairs in the room taken, but it was so packed that people were overflowing into the standing room.

The topic was the future of the social web. Currently, the landscape is centered around closed worlds where services hold their own OpenSocial social graphs, but the web of the near future will achieve socialization in a more global sense through technologies like OpenSocial, OpenID, OAuth, and [PortableContacts](http://www.portablecontacts.net/).

For details, [the video and slides are uploaded to Google Code](http://sites.google.com/site/io/opensocial-openid-and-oauth-oh-my), so please check them out. He talks quite fast, but it's very interesting content.

## What OpenSocial and FriendConnect Mean

Up until v0.7, OpenSocial only offered a JavaScript API. For an OpenSocial container, this meant having external services add applications as gadgets, which were then used within the closed boundaries of that OpenSocial container's social graph. Application developers could use OpenSocial's JavaScript API to retrieve the friend list of the container site where the gadget was placed and run their application there. Of course, it was also possible to host the gadget on their own service's domain, but the gadget only ran on the container, and importing a friend list as an external service was impossible, effectively resulting in nothing more than walled-garden services.

However, OpenSocial v0.8 + FriendConnect dramatically expands that world. When users visit a FriendConnect-enabled site, they are given the choice via OAuth to select the SNS service they want to use. At the same time, their activity on that site is fed back into the chosen SNS service.

Let's recall the elements of a social service:

1. Identity
2. Social graph (friends list)
3. Access control of posts (privacy)
4. Feed

**FriendConnect aims to solve Identity with OpenID, the social graph with OpenSocial v0.8's RESTful API, access control of posts with OAuth, and the feed with Activity Streams.**

Looking deeply into what these mean naturally reveals the future of the social web.

## Joseph Smarr's (Plaxo) Vision for the Future Social Web

To further clarify the picture of FriendConnect, here is a blog post Joseph Smarr wrote when Plaxo introduced support for FriendConnect:

[Plaxo and FriendConnect are now Best Friends](http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html)

> Plaxo is now fully integrated with FriendConnect, Google’s new widget-based tool for making any website social. Now any FriendConnect-enabled site can securely connect with your Plaxo account so you can see if your friends are there, invite friends, and—best of all—publish activities from that site back to Pulse, so your Plaxo friends can keep in touch with you across the web and find out about the new sites you discover.
> 
> This is a really useful and exciting integration—it’s a big step towards a [seamless social web ecosystem](http://therealmccrea.com/2008/05/02/can-lifestreaming-and-aggregation-go-mainstream/) where users can take their identity and relationships with them across the web, finding people they know on new sites, sharing activities back to their existing friends, and creating a virtuous cycle of more social discovery and sharing. That’s how the social web should work—not having to start over every time you use a new social site (like most of them make you do now). Every new experience you have should enrich all the others.
> 
> This can only happen if services give their users control of their data and provide secure access using open standards, and that’s exactly what we did with FriendConnect: we use [OAuth](http://oauth.net/) to connect your Plaxo account, so you never have to give out your Plaxo password and you can revoke access at any time; we use the [OpenSocial 0.8 RESTful Activities API](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FRESTful%20API%20Specification) for publishing activities back to Pulse using FriendConnect; and the only integration that wasn't an open standard is the address book API, which [we’re actively working to standardize](http://portablecontacts.net/). We strongly believe in our role as an [identity provider, social graph provider, and content aggregator](http://blog.plaxo.com/archives/2008/05/plaxo_becomes_s.html)—which means letting you take your data and relationships wherever you want on the web and share back from anywhere—which is good for you, good for Plaxo, and good for the whole web. But this is just the beginning—look for future enhancements like being able to choose which groups of people (friends, family, work, etc.) you share your activities with when publishing from FriendConnect-enabled sites.
> 
> Below is a screenshot of the Plaxo / Google FriendConnect integration in action—you can also experience it on any of the [sites using FriendConnect](http://www.google.com/friendconnect/home/examples).

Please check the [actual page](http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html) for the images.

## Summary

To be honest, I was somewhat skeptical about OpenSocial as merely a gadget container, but imagining the future painted by FriendConnect makes me excited again. I will continue to keep an eye on developments in this space.

## Update

I found an article touching on a similar topic, so I'm adding it and sending a trackback. (Trackback failed, so gave up on that orz)

[グーグルが見たソーシャルネットワーキング–その 3 つの傾向:スペシャルレポート – CNET Japan](http://japan.cnet.com/special/story/0,2000056049,20375542,00.htm)
