---
title: Experimenting with FriendConnect
author: Eiji
layout: post
lang: en
date: 2008-12-10
categories:
  - FriendConnect
  - Google
  - OpenSocial
tags:
  - FriendConnect
translationOf: /2008/12/friendconnect.html
translated: 2026-10-03
translatedManually: false
---
Near the bottom of this blog's left sidebar, I added Friend Introducer—an OpenSocial gadget I created previously—slightly modified for FriendConnect (as of December 9, 2008).

[<img class="alignnone size-medium wp-image-265" title="e38394e382afe38381e383a3-1" src="/images/2008/12/e38394e382afe38381e383a3-1-126x300.png" alt="" width="126" height="300" />][1]

Originally, this gadget was designed so that you write an introduction for your friends in canvas view, and read introductions written about that person in profile view. It was something I had been testing in sandboxes like Orkut and hi5.

However, trying out the gadget on FriendConnect revealed a few clear takeaways:

*   A blog only has one surface. Therefore, you must choose either profile or canvas view. You can configure this in the FriendConnect Social Gadget settings screen.
*   There seems to be a friendconnect feature. It's unclear what it specifically does.
*   The Owner is the site itself. Come to think of it, adding the FriendConnect gadget didn't automatically make me a member. It seems the Owner role is assumed by a virtual persona representing the site where it is embedded.

Regarding the view, setting it to profile view shows the site as the Owner, resulting in a confusing state. I haven't tested yet what happens when fetching a profile via the API. It is currently displayed in canvas view, but as a result, it has turned into a rather pointless gadget where I can only write intros for my own friends without being able to show them to anyone (&#8211;;.

Come to think of it, other FriendConnect gadgets have a button in the upper right to switch to canvas view. How can you enable that? I'd like to look into it when I have some time.

 [1]: /images/2008/12/e38394e382afe38381e383a3-1.png
