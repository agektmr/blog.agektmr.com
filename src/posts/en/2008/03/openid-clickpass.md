---
layout: post
lang: en
title: 'Clickpass, a service that uses OpenID to integrate accounts'
description: ''
date: 2008-03-12
tags:
- Service
  - Clickpass
  - OpenID
  - 認証
translationOf: /2008/03/openid-clickpass.html
translated: 2025-11-29
translatedManually: false
---

[TechCrunch Japanese Archive » Clickpass aims to expand the general use of OpenID](http://jp.techcrunch.com/archives/clickpass-could-change-the-way-you-surf-the-web/)OpenID is a technology that can be thought of as a passport on the web, enabling single sign-on across domains. In Japan, Yahoo, livedoor, Hatena, and mixi all support issuing OpenIDs and have announced that they will do so in the future. While OpenID is convenient, it also has some problems:

* While the number of sites issuing OpenIDs is increasing, there are still few that accept them.
* There's a risk of phishing.
* It's difficult to integrate with existing accounts/it's inconvenient to use.

Clickpass is a service that aims to solve all these problems at once.

When you use OpenID for the first time, Clickpass will ask you if you already have an account with the service you're trying to log in to. If you do, provide that information. Clickpass will then pass that information to the authentication site and link your accounts together. As you add sites to your ClickPass OpenID, you can view them in a list on the ClickPass site. You'll also receive a site-specific OpenID URL, which you can use to manage multiple IDs, all of which are linked together on ClickPass. Also, if you want to fill out your profile information in ClickPass, your personal information will be automatically entered each time you sign up for a new site. Clickpass also offers thorough privacy controls, allowing you to choose the information you want to share with sites.

When registering for a new account, you can easily use your Clickpass OpenID account to provide your personal information via AX or Sreg. If you have an existing account, you don't need to enter your password every time. It also seems to be possible to use an image of a Yahoo login sticker, which also helps prevent phishing. In other words, it's a web-based keychain service.

If users are aware from the start that the service's purpose is to aggregate and distribute personal information, then the exchange of personal information would likely not pose any legal issues, and this may be a pretty good idea. As long as the number of partner sites increases and users are not hesitant to entrust their authentication information to Clickpass, it should work well.