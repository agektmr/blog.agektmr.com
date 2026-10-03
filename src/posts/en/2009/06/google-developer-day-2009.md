---
title: Google Developer Day 2009
author: Eiji
layout: post
lang: en
date: 2009-06-12
categories:
  - Google
  - SocialWeb
  - イベント
tags:
  - gdd09
  - Google Developer Day
translationOf: /2009/06/google-developer-day-2009.html
translated: 2026-10-03
translatedManually: false
---
<a href="http://code.google.com/intl/ja/events/developerday/2009/home.html" target="_blank">Google Developer Day</a> was held at Pacifico Yokohama on June 9th.  
I had the opportunity to take the stage briefly during the keynote and also speak in the OpenSocial Panel Discussion session.

## Keynote Demo

In the keynote, I demonstrated a feature unique to goo Home—highlighting its concept as a social web portal—using OpenSocial on <a href="http://home.goo.ne.jp" target="_blank">goo Home</a>, which was recently released to general users. In the demo, a goo Map gadget and a photo viewer gadget worked in tandem with a gadget from <a href="http://photomemo.jp" target="_blank">Photomemo</a>. I forgot to mention it during the keynote, but this idea was originally based on something one of the developer teams presented at <a href="http://blog.goo.ne.jp/goohome_developer/e/6e7bcb5387791ebc2ad8dfbc658161ea" target="_blank">the recent Hackathon</a>.

In terms of implementation, it uses the pubsub feature included in OpenSocial. Pubsub is a fairly simple mechanism: when you publish an object to an arbitrarily created channel, callback functions on gadgets subscribing to that same channel are invoked, and the object is delivered. I'll be adding documentation about pubsub to <a href="http://developer.home.goo.ne.jp/" target="_blank">goo Developer&#8217;s Kitchen</a> soon.

Also, to make this demo possible, the Photomemo team developed both the Photomemo gadget and the photo viewer gadget for us. Thank you very much for your cooperation.

## OpenSocial Panel Discussion

The other session I took part in was the Panel Discussion. Along with Mr. Kawasaki from Recruit (whom I also joined at Developers Summit recently), the discussion included Mr. Kawagishi from mixi and Mr. Oikawa from Google.

As for the content, rather than focusing strictly on OpenSocial, we looked at the Social Web from a broader perspective—discussing how OpenSocial fits in as a currently usable piece of the puzzle, and where the expanding world of the Social Web is headed. It was only relatively recently that I realized mixi apps and goo Home gadgets are aiming for completely different things, so I tried to present in a way that made those distinctions clear.

## Wrap-up

As I mentioned during the panel discussion, I feel that the Social Web landscape in Japan still has plenty of room to grow. Compared to other countries, real names are less preferred, and the largest SNS is closed, so I fully understand that we cannot simply import overseas models as they are. Even so, I believe this technology will inevitably become something in high demand in the near future.

If this resonates with you, please consider joining <a href="http://groups.google.com/group/socialweb-japan/" target="_blank">SocialWeb Japan</a>.
