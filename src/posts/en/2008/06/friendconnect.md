---
layout: post
lang: en
title: 'FriendConnect gives a glimpse into the future of the social web'
description: ''
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
translated: 2025-11-29
translatedManually: false
---

It's a little late, but I recently attended Google I/O in San Francisco.

The session that left the biggest impression on me was "OpenSocial, OpenID, and OAuth: Oh My!" by Joseph Smarr of Plaxo. It was by far the most popular of the sessions I saw, and the room was packed with people, with standing room only available.

The topic was the future of the social web. Currently, the world is becoming closed off to services that own social graphs called OpenSocial. However, in the not-too-distant future, the web will become more globally socialized through technologies such as OpenSocial, OpenID, OAuth, and PortableContacts.

For more details, please see the video and slides uploaded to Google Code. It's a very fast-paced presentation, but the content is very interesting.

The Implications of OpenSocial and FriendConnect

Up until v0.7, OpenSocial only had a JavaScript API. This meant that applications were added to the OpenSocial container as gadgets from external services, and were used in a closed manner within the social graph of the OpenSocial container. Application developers could use OpenSocial's JavaScript API to obtain the friend list of the container site where the gadget was located and run their application there. Of course, it was possible to host gadgets on their own service domain, but gadgets only ran within the container, and it was impossible to import friend lists as external services, which essentially led to closed-door services.

Now, with OpenSocial v0.8 + FriendConnect, this world is about to expand.
When using a FriendConnect-enabled site, users have the right to choose the SNS service they want to use using OAuth. At the same time, their activity on the site is returned to the SNS service they choose to integrate with.

Remember the social service element here?

1. Identity
2. Social Graph (Friends List)
3. Controlling Entry Visibility (Privacy)
4. Feed

**FriendConnect aims to solve identity issues with OpenID, social graph issues with the OpenSocial v0.8 RESTful API, entry visibility control with OAuth, and feed issues with Activity Stream.**

If we look deeply into these implications, the future of the social web becomes clear.

## Joseph Smarr (Plaxo) on the Future of the Social Web

To get a better understanding of FriendConnect, here's a blog post by Joseph Smarr about Plaxo's FriendConnect support:

[Plaxo and FriendConnect are now Best
Friends](http://blog.plaxo.com/archives/2008/06/plaxo_and_frien_1.html)

Plaxo is now fully integrated with FriendConnect, Google's widget-based tool that makes any site social. Now, you can securely connect any FriendConnect-enabled site to your Plaxo account, see your friends on that site, and invite them to join. Best of all, your activity on that site will now stream into Pulse, allowing your Plaxo friends to stay in touch with you across the web and learn about new sites you discover. This is a truly useful and exciting integration—it brings us closer to a seamless social web ecosystem, where users can carry their identity and relationships with them everywhere on the web, discover contacts on new sites, share their activity with existing friends, and create a virtuous cycle of social discovery and sharing. This is the way the social web should be going—you shouldn't have to start from scratch every time you try a new social site (as most services do today). Every new experience you have should be engaging for others. 

> This can only happen if services give users control over their data and provide secure access using open standards. And that's exactly what Plaxo wants to do with FriendConnect. When you connect your Plaxo account, we use [OAuth](http://oauth.net/), so you don't need to pass your Plaxo password and can disconnect later. When you use FriendConnect to share your activities with Pulse, you use the [OpenSocial 0.8 RESTful Activities
> API](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FRESTful%20API%20Specification). The only integration that isn't an open standard is the Address Book API, which we've begun working on. We strongly believe in fulfilling our roles as an identity provider, social graph provider, and content aggregator. This means we empower users to carry and share their data and relationships anywhere on the web—a win for users, for Plaxo, and for the web as a whole. But we're just getting started—look forward to further enhancements, such as more granular control over who you share your activities with from FriendConnect-enabled sites, including family, friends, and business associates.

The screenshot below shows Plaxo's integration with Google FriendConnect—and you can experience it on any FriendConnect-enabled site.

Please see the actual page for images.

## summary

To be honest, I was somewhat skeptical about OpenSocial as a gadget container, but
I'm excited about the future that FriendConnect envisions.
I'll continue to follow developments in this area.

## postscript

I found an article that touched on a similar topic, so I'll add it here and track it down. (I gave up because it didn't work out. ○|￣|＿)

[Google's View of Social Networking – Three Trends: Special Report –
CNET Japan](http://japan.cnet.com/special/story/0,2000056049,20375542,00.htm)
