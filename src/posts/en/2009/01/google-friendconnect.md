---
title: Google Friend Connect-Compatible Gadget Completed
layout: post
lang: en
date: 2009-01-06
tags:
  - FriendConnect
translationOf: /2009/01/google-friendconnect.html
translated: 2026-10-03
translatedManually: false
---
I have released a gadget called Friend Introducer that lets FriendConnect members write introductions for their friends. It's displayed on the left side of this blog, so if you're already a member, please give it a try! (And if you aren't yet, feel free to join and try it out!)

## What is FriendIntroducer?

It mainly consists of three views. The first is the profile view displayed directly on the blog.

![FriendConnect4](/images/2009/01/e38394e382afe38381e383a3-2-155x300.png)

It shows up to 5 introductions written for FriendConnect members. It supports pagination, and the introductions written for each member are displayed at random.

Clicking on a member's thumbnail switches to the detail view ~~(though it's not an OpenSocial view per se)~~. (* Edit to avoid confusion: "detail view" is just what I call it personally; in OpenSocial terms, it's still a profile view.)

![FriendConnect5](/images/2009/01/e38394e382afe38381e383a3-3-166x300.png)

Since multiple people might write introductions for a single person, the detail view lets you browse all the introductions written about that user.

Clicking the button at the top of the gadget switches to the canvas view.

![FriendConnect6](/images/2009/01/e38394e382afe38381e383a3-4-300x188.png)

In the canvas view, you can write introductions for the logged-in user's friends. If you don't have any friends yet, add someone on the same FriendConnect instance as a friend first!

## How to add FriendIntroducer to your blog

First, sign up for FriendConnect [here](http://www.google.com/friendconnect/). Once your site is registered...

![FriendConnect1](/images/2009/01/e38394e382afe38381e383a3-12.png)

Click on "Social gadgets".

![FriendConnect2](/images/2009/01/e38394e382afe38381e383a3-13-300x86.png)

Click the "Custom gadget" link at the very bottom.

![FriendConnect3](/images/2009/01/e38394e382afe38381e383a3-14-213x300.png)

Set the Gadget URL to:
[http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml](http://devlab.agektmr.com/OpenSocial/FriendConnect/FriendIntroducer.xml)

Adjust the gadget's width, click "Generate Code", and HTML code will be generated for you to paste into your blog or website.

## Thoughts

As I mentioned in a previous post, the key points of building a FriendConnect gadget are:

* The OWNER is a virtual persona—the blog itself
* You can navigate back and forth between the canvas view and profile view using `requestNavigateTo`
* The canvas view background can be customized by editing the `canvas.html` imported during site setup

That pretty much sums it up.

For now, OpenSocial doesn't have a built-in concept of "communities," but it might be easier to understand FriendConnect as a community-oriented application with a clever twist.

Also, an interesting aspect of FriendConnect is that it allows you to merge and use friend lists imported from multiple social networks. For example, I have imported friends from orkut, Google, Plaxo, and Twitter; if someone registered on the same blog is my friend on any of those social networks, they become my friend on FriendConnect as well.

Someday, if Google turns iGoogle into a full-fledged social network, we might be able to use these merged friend lists directly there too.
