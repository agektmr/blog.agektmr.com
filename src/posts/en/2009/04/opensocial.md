---
title: OpenSocial Permission Model
author: Eiji
layout: post
lang: en
date: 2009-04-29
categories:
  - FriendConnect
  - OpenSocial
tags:
  - パーミッションモデル
translationOf: /2009/04/opensocial.html
translated: 2026-10-03
translatedManually: false
---
Recently, several questions regarding OpenSocial permissions were raised around "<a target="_blank" href="http://groups.google.com/group/opensocial-japan/browse_thread/thread/ffa5f8182c36252f#">OpenSocialでOwnner毎 or Owner*アプリ毎の永続化方法 オプション</a>". So, I'd like to summarize when and which data can be accessed, and along the way, cover the permission model in FriendConnect as well.

First, let's establish some foundational knowledge: the concept of VIEWER / OWNER, and basic information vs. personal information.

## VIEWER and OWNER

Gadgets are referred to differently depending on where they are placed, and this is called a "view." In OpenSocial, the standard views provided are home view, profile view, and canvas view. Please refer to [here][1].

As you can see, the assumption is that gadgets in the home view are placed on the user's own page (My Page) viewed by themselves, while the profile view is meant for profile pages viewed by others. So, what do "viewed by oneself" and "viewed by others" actually mean?

OpenSocial gadgets have the concept of an OWNER. An owner refers to the person who owns the page where the gadget is placed. Conversely, the person viewing the gadget is called the VIEWER.

In other words, in the home view, "viewed by oneself" means the person is both OWNER and VIEWER. In contrast, in the profile view, "viewed by others" involves the VIEWER looking at the page, and the OWNER who owns that page. Of course, in cases where the owner views their own profile page, the OWNER and VIEWER are the same person. The same applies to the canvas view.

## Basic Information and Personal Information

In OpenSocial, profile information is broadly divided into two categories.  
In the goo Social Platform, these are categorized as basic information (id, profileUrl, thumbnailUrl, nickname) and personal information (all other profile details). For more details, it's best to look [here][2].

Think of basic information as the minimum necessary data, and personal information as more detailed and sensitive data.

## Basic Rules

Based on this, here are the basic rules required when exchanging various types of information:

*   To retrieve personal information, the target user (object) must have the same gadget installed.
*   If the object is a friend, only basic information can be retrieved even if they do not have the gadget installed.
*   Updates and deletions are only possible when the viewer is manipulating their own data.

 

The key takeaways are:

*   Even if someone is your friend, you cannot retrieve their personal information if they haven't installed the gadget.
*   Even if someone is not your friend, you can retrieve their personal information as long as they have the gadget installed.

 

Many people might wonder, "Why does it have to be so troublesome?" or "Why can't I access personal information unless the gadget is installed?" The short answer is simply "privacy protection."

*   Personal information is data that the container has collected from users.
*   Under the Act on the Protection of Personal Information, collected personal information must not be used for purposes other than those notified in advance.
*   Since personal information is collected by the container, when transferring or disclosing it to a third party (i.e., a developer using it within a gadget), the user must understand and consent to it.
*   Users must be able to track who has accessed their personal information.
*   It is theoretically possible for developers to leak or sell the personal information they receive.
*   Even for information that is public on the web, there is a legal difference between passive provision (scraping, etc.) and active provision (via an API). (In that sense, whether it's a closed SNS like mixi or an open SNS like goo Home, the handling does not change.)
*   If a developer leaks personal information intentionally or accidentally, the developer is naturally responsible, but the container that provided the information must also have a reliable means of contacting that developer.

 

It's a bit complicated, but for these reasons, the policy leans heavily toward not providing personal information to gadgets that the user has not intentionally chosen to use. This isn't just about goo Home; although not yet explicitly stated, I believe similar implementations will be adopted across all upcoming OpenSocial containers, including mixi.

Note that special rules extending beyond the basic rules get quite complex, so I won't cover them here. If you're interested, please see [here][3].

## FriendConnect's Permission Model

Now that we've covered standard OpenSocial, let's take a look at gadget permissions in FriendConnect.

In standard SNS-based OpenSocial, whether personal information is provided or not is determined by whether the user has installed the gadget, but things are slightly different in FriendConnect. That's because it's based on the idea that the owner of the gadget is not a person, but a site.

As you can see from [this article][4]:

> The Owner is the site. Come to think of it, simply placing the FriendConnect gadget didn't automatically make me a member. The Owner seems to be played by the virtual persona of the site where it's embedded.

The key point here is the "virtual persona of the site." In other words, in FriendConnect, **it's impossible for a user to become the owner**. Therefore, the permission model of standard OpenSocial described earlier cannot be directly applied.

 

So, under what circumstances can personal information be retrieved in FriendConnect?

In reality, as far as I know, it is not yet possible to retrieve anything beyond basic information (personal information) on FriendConnect, so this may not be completely definitive. However, it seems that "whether the user has joined the site" is the condition for obtaining permissions.

In other words, the basic rules for FriendConnect:

*   To retrieve personal information, the target user (object) must be registered with the site where the gadget is running.
*   If the object is registered with the same site, their information (including personal information) can be retrieved (this is an assumption, since it cannot actually be retrieved yet).
*   Updates and deletions are only possible when the viewer is manipulating their own data.

If you compare these side-by-side with the standard OpenSocial basic rules, you should be able to see the difference.

 

## Summary

In this post, I explained the permission model, which was the subject of many questions at the recent Hackathon. While it may just seem troublesome to developers, it is critically important for containers and users in order to protect privacy.

Once your OpenSocial gadget development reaches a certain level, having a firm grasp of these concepts becomes essential.

 [1]: http://developer.home.goo.ne.jp/document/サイト構成
 [2]: http://developer.home.goo.ne.jp/document/友達情報を取得する#goo_Social_Platform.E3.81.8C.E6.89.B1.E3.81.86.E5.80.8B.E4.BA.BA.E6.83.85.E5.A0.B1
 [3]: http://developer.home.goo.ne.jp/document/パーミッションモデル#.E7.89.B9.E5.88.A5.E3.83.AB.E3.83.BC.E3.83.AB
 [4]: http://devlog.agektmr.com/ja/archives/262
