---
title: "Clickpass: A service that integrates accounts using OpenID"
layout: post
lang: en
date: 2008-03-12
tags:
  - Service
  - Clickpass
  - OpenID
  - 認証
translationOf: /2008/03/openid-clickpass.html
translated: 2026-10-03
translatedManually: false
---
[TechCrunch Japanese アーカイブ » OpenID の一般利用拡大を図る「Clickpass」](http://jp.techcrunch.com/archives/clickpass-could-change-the-way-you-surf-the-web/) OpenID is a technology often described as a digital passport for the web, enabling single sign-on across domains. In Japan, services like Yahoo, livedoor, Hatena, and mixi have either supported or announced plans to support issuing OpenIDs. While OpenID is convenient, it also comes with several challenges:

* While the number of sites issuing OpenIDs is growing, the number of sites accepting OpenID is still quite small
* Phishing risks exist
* Inability or friction when trying to integrate with existing accounts

Clickpass is a service designed to solve all of these problems at once.

> When using OpenID for the first time, Clickpass asks if you already have an account on the service you are trying to log into. If you do, providing that information allows Clickpass to pass it to the authenticating site to link the accounts together. As you add sites to your Clickpass OpenID, you can view them all in a list on the Clickpass website. You are also provided with site-specific OpenID URLs from Clickpass, which can be used to manage multiple IDs, with all IDs linked together on Clickpass. Additionally, if you fill in your profile details on Clickpass, your personal information is automatically populated whenever you join a new site. Clickpass also enforces thorough privacy controls, letting you choose what information you want to share with each site.

When signing up for a new site, you can register effortlessly because Clickpass passes along your personal details using AX or Sreg via your Clickpass OpenID account. For existing accounts, you no longer need to enter your password every time. It also mitigates phishing risks using an image-based feature similar to Yahoo's Sign-In Seal. In other words, you could think of it as a keychain service for the web.

As long as users understand upfront that the service is intended for aggregating and distributing personal information, exchanging such data shouldn't run into legal hurdles, making it quite a good idea. Beyond that, as long as more partner sites join in and users don't hesitate to entrust their credentials to Clickpass, it could work out really well.
