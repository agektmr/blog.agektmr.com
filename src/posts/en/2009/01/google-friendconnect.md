---
layout: post
lang: en
title: 'Google FriendConnect compatible gadget completed'
description: ''
date: 2009-01-06
tags:
- FriendConnect
translationOf: /2009/01/google-friendconnect.html
translated: 2025-11-29
translatedManually: false
---
We've released a gadget called Friend Introducer, which allows FriendConnect members to write introductions to their friends. It's displayed on the left side of this blog, so if you're a member, please give it a try. (If you're not, please become a member and give it a try!)

What is FriendIntroducer?

There are three main views: the profile view that is displayed on the blog;

![FriendConnect4](/images/2009/01/e38394e382afe38381e383a3-2-155x300.png)

Displays up to five testimonials from FriendConnect members. Pageable, with testimonials written for each member displayed in random order.

Clicking on a member's thumbnail image will switch to the detail view (although it's not the OpenSocial-style view). (Note: I've corrected this to avoid confusion. I just call it the detail view; in OpenSocial terms, it's the profile view.)

![FriendConnect5](/images/2009/01/e38394e382afe38381e383a3-3-166x300.png)

Since multiple people may have written testimonials for a single person, the detail view allows you to view all testimonials about that person.

Click the button at the top of the gadget to switch to canvas view.

![FriendConnect6](/images/2009/01/e38394e382afe38381e383a3-4-300x188.png)

In the canvas view, you can write introductions for the logged-in user's friends. If you don't have any friends, you can add someone on the same FriendConnect account as your friend.

## How to paste FriendIntroducer into your blog

First, register for FriendConnect here. Once you've registered on the site...

![FriendConnect1](/images/2009/01/e38394e382afe38381e383a3-12.png)

Click Social gadgets.

![FriendConnect2](/images/2009/01/e38394e382afe38381e383a3-13-300x86.png)

Click the Custom gadget link at the bottom.

![FriendConnect3](/images/2009/01/e38394e382afe38381e383a3-14-213x300.png)

Please set the Gadget URL to [http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml](http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml].

Adjust the width of the gadget and click Generate Code to generate HTML code that you can paste into your blog or other website.

## Impressions

As I mentioned in a previous post, the key to creating a FriendConnect gadget is:

* The OWNER is a virtual personality called a blog.
* You can switch between the canvas view and the profile view using requestNavigateTo.
* The canvas view background can be changed by modifying the canvas.html file included when creating the site.

That's about it.

At the moment, OpenSocial does not have a community-oriented concept, but it may be easier to understand FriendConnect as a slightly twisted application of community.

Another interesting feature of FriendConnect is that you can merge and use friend lists imported from multiple social networks. For example, I import friends from Orkut, Google, Plaxo, and Twitter, and if someone who subscribes to the same blog as me is a friend on these social networks, they will also become friends on FriendConnect.

Perhaps one day, when Google turns iGoogle into a social networking site, these friend lists will be available for use as is.