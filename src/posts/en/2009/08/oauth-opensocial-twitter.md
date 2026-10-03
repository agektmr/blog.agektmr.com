---
title: "(Probably) The world's first! Released \"GadgeTwi!\", an OpenSocial Twitter client using OAuth"
author: Eiji
layout: post
lang: en
date: 2009-08-18
categories:
  - OAuth
  - OpenSocial
tags:
  - Gadget
  - ガジェツイ！
translationOf: /2009/08/oauth-opensocial-twitter.html
translated: 2026-10-03
translatedManually: false
---
<a href="http://home.goo.ne.jp/gadget/qYpTF5ucNCt2/detail" target="_blank"><img class="size-full wp-image-643" title="GadgeTweetr_Logo" src="/images/2009/08/GadgeTweetr_Logo.png" alt="GadgeTweetr_Logo" width="616" height="119" /></a>

To coincide with the release of the <a href="http://developer.home.goo.ne.jp/document/OAuthリクエスト" target="_blank">OAuth feature</a> on <a href="http://home.goo.ne.jp/" target="_blank">goo Home</a>, I have released a gadget that uses Twitter's OAuth called "<a href="http://home.goo.ne.jp/gadget/qYpTF5ucNCt2/detail" target="_blank">GadgeTweetr</a>" (Japanese name: ガジェツイ！). Despite being a gadget, I believe it turned out to be simpler, more feature-rich, and easier to use than many run-of-the-mill Twitter clients out there, so let me introduce it to you.

*Note: The GadgeTweetr logo uses the "<a href="http://d.hatena.ne.jp/y05k/20070519/p1" target="_blank">Twittler (ついってる)</a>" font.*

## Key Features

*   OAuth login
*   Tab interface
*   In-reply-to viewer
*   Search functionality
*   Multi-account support

## OAuth Login

With support for <a href="http://oauth.net/core/1.0" target="_blank">OAuth</a>, there is no need to enter your ID and password directly into goo Home. Clicking the "Login" button opens a screen on the twitter.com domain, so users can log in with peace of mind.

<img style="border: 0px initial initial;" title="login_using_oauth" src="/images/2009/08/decd90d6f3baa9553fd625ecb11d3b8b-300x203.png" alt="login_using_oauth" width="300" height="203" />

## Tab Interface

This Twitter client displays various types of statuses side by side using tabs. It supports a full range of views including Timeline, Mentions, Direct Messages, and Favorites.

<img class="alignnone" style="border: 0px initial initial;" title="tabs" src="/images/2009/08/tabs.png" alt="tabs" width="288" height="143" />

## In-Reply-To Viewer

If a status is a reply, you can follow the conversation by clicking "In reply to."

<img class="size-medium wp-image-633 alignnone" title="replies" src="/images/2009/08/replies-300x157.png" alt="replies" width="300" height="157" />

## Search Functionality

Free-word search is also supported.

<img class="size-medium wp-image-634 alignnone" title="search" src="/images/2009/08/search-300x203.png" alt="search" width="300" height="203" />

## Multi-Account Support

You can add as many gadgets as you like and assign a different account to each one.

<img class="size-thumbnail wp-image-631 alignnone" title="multi-account" src="/images/2009/08/multi-account-150x150.png" alt="multi-account" width="150" height="150" />

## Other Features

### Three Views

It supports the home, profile, and canvas views. By default, the home view opens with Timeline and Mentions; the profile view opens with that user's statuses; and the canvas view opens with Timeline, Mentions, Direct Messages, and Favorites.

### Auto-Linking

It automatically detects and creates links not only for external URLs, but also for @mentions and #hashtags. Clicking a URL opens a new window, while clicking an @ or # opens a new tab displaying the corresponding list of statuses.

### ReTweet

Clicking this icon on any tweet you like lets you "ReTweet" it. You can, of course, add your own comments as well.

### Profile Display

Clicking an avatar displays profile information such as follower counts and post counts.

### Follow / Unfollow

You can follow a user directly from their profile view, or unfollow them if you are already following them.

## Summary

Since this is a Twitter client built on OpenSocial, I had planned some unique social features, but unfortunately they didn't make it in time for this release (I will publish them as soon as they're implemented).

Even so, despite starting out simply as a way to let people experience goo Home's OAuth, it turned out to be both simple and feature-packed. Please give GadgeTweetr a try!
