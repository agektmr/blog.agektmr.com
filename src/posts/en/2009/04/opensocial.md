---
layout: post
lang: en
title: OpenSocial's permission model
description: ''
date: 2009-04-29
tags:
- パーミッションモデル
translationOf: /2009/04/opensocial.html
translated: 2025-11-29
translatedManually: false
---
Recently, there have been a few questions raised about OpenSocial permissions in the article "<a target="_blank" href="http://groups.google.com/group/opensocial-japan/browse_thread/thread/ffa5f8182c36252f#">Optional method for persisting data per Owner or per Owner* app in OpenSocial</a>", so I will summarize what data can be accessed in what circumstances, and also the permission model in FriendConnect.

First, as a minimum level of knowledge, you should understand the concepts of viewer/owner and basic information/personal information.

## Viewers and Owners

Gadgets are called different views depending on where they are placed. OpenSocial provides the standard home view, profile view, and canvas view. Please refer to [here][1].

As you can see, gadgets in the home view are intended to be placed on your personal page, while gadgets in the profile view are intended to be placed on the profile page that others see. So what does "you see" and "others see" mean?

OpenSocial gadgets have the concept of an owner. An owner is the person who has attached a gadget to a page. Conversely, the person who views a gadget is called a viewer.

In other words, in the home view, "I see" refers to the owner and the viewer. Conversely, in the profile view, "others see" refers to the viewer looking at the page and the owner of the page. Of course, if the owner is looking at the profile page, the owner and the viewer are the same person. The same applies to the canvas view.

## Basic and personal information

In OpenSocial, profile information is broadly divided into two categories.
On goo Social Platform, this is called basic information (id, profileUrl, thumbnailUrl, nickname) and personal information (other profile information). For more details, please see [here][2].

Basic information is the minimum information required, while personal information is more detailed and important.

## Basic rules

With this in mind, the following basic rules are necessary when exchanging various types of information.

* To obtain personal information, the target user (object) must have the same gadget installed.
* If the object is a friend, basic information can be obtained even if the gadget is not installed.
* Updates and deletions are only possible when the viewer is manipulating their own data.

 

Miso is

* You can't get personal information from friends who don't have the gadget installed.
* You can get personal information from non-friends who have the gadget installed.

Where.

 

Many people may be wondering, "Why is it so troublesome?" or "Why can't personal information be obtained unless the gadget is installed?", but the simple reason is "protecting privacy."

* Personal information is collected from users by containers.
* Under the Personal Information Protection Act, collected personal information must not be used for purposes other than those previously notified.
* Personal information is collected by containers, and users must understand that if it is transferred or disclosed to a third party (for use by developers on gadgets), the user must understand this.
* Users must be able to understand who has collected their personal information.
* Developers are theoretically able to leak or sell the personal information they receive.
* Even if information is publicly available online, the legal implications are different if it is provided passively (e.g., by scraping) or actively (via an API). (In that sense, it's treated the same whether it's a closed social networking site like mixi or an open social networking site like goo Home.)
* If a developer intentionally or accidentally leaks personal information, the developer is of course responsible, but the container that provided the information must have a reliable means of contacting the developer.

 

It's a little complicated, but for these reasons, the policy is basically to not give out personal information to gadgets that the user does not intend to use. This is not just a goo Home issue, and although it has not been made clear yet, I think that similar implementations will be used in all OpenSocial containers that will be released in the future, including mixi.

The special rules for the basic rules are complicated, so we won't explain them here. If you're interested, please see [here][3].

FriendConnect Permissions Model

Now that we've explained OpenSocial in general, let's consider gadget permissions in FriendConnect.

While OpenSocial, a typical social networking service, determines whether or not to provide personal information based on whether or not a user has a gadget installed, FriendConnect is a bit different in that it is based on the idea that the owner of a gadget is not a person, but a website.

If you read [this article][4], you will understand.

> The Owner is the site. By the way, when I installed the FriendConnect gadget, I didn't automatically become a member. It seems that the owner is a virtual personality called the attached site.

The key point is that the site has a virtual personality. In other words, with FriendConnect, the user cannot be the owner. Therefore, the general OpenSocial permission model explained above cannot be applied as is.

 

So, in what circumstances can FriendConnect collect personal information?

In reality, as far as I know, it is not yet possible to obtain more than basic information (personal information) on FriendConnect, so this is not necessarily correct, but it seems that the condition for obtaining permission is whether or not you are a member of the site.

In other words the basic rules of FriendConnect:

* To retrieve personal information, the target user (object) must be registered on the site where the gadget is running.
* If the object is registered on the same site, personal information can be retrieved (though this is only a guess, as it cannot actually be retrieved).
* Updating and deleting are only possible when the viewer manipulates their own data.

If you compare it with the general OpenSocial basic rules, you will see the difference.

 

## summary

This time, I'd like to explain the permission model, which was a topic of many questions at the recent Hackathon. While it's just a hassle for developers, it's very important for containers and users to protect their privacy.

Once you have reached a certain level in OpenSocial gadget development, I think it is important to have a solid understanding of this area.

 [1]: http://developer.home.goo.ne.jp/document/サイト構成
 [2]: http://developer.home.goo.ne.jp/document/友達情報を取得する#goo_Social_Platform.E3.81.8C.E6.89.B1.E3.81.86.E5.80.8B.E4.BA.BA.E6.83.85.E5.A0.B1
 [3]: http://developer.home.goo.ne.jp/document/パーミッションモデル#.E7.89.B9.E5.88.A5.E3.83.AB.E3.83.BC.E3.83.AB
 [4]: http://devlog.agektmr.com/ja/archives/262
