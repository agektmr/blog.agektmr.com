---
title: I became a Shindig committer.
author: Eiji
layout: post
lang: en
date: 2009-08-29
categories:
  - OpenSocial
  - SocialWeb
tags:
  - Shindig
translationOf: /2009/08/shindig.html
translated: 2026-10-03
translatedManually: false
---
"The web should be social." This is something I've been advocating ever since I joined my current company around 2005. There is so much that can be achieved by turning the social graph into a platform. Aiming first to socialize our entire portal site, what we built was <a href="http://home.goo.ne.jp/" target="_blank">gooホーム</a>.

I already had a future vision at that point: imagining that we would eventually connect with sites outside the portal, linking the entire internet through the social graph. It was right around then that <a href="http://www.facebook.com/" target="_blank">Facebook</a> came along.

What Facebook was trying to do—pulling external services inside the social network—was the exact opposite of my approach, but the end result they were aiming for was quite similar, and I felt frustrated that they pulled it off first. And then, <a href="http://www.opensocial.org/" target="_blank">OpenSocial</a> arrived.

OpenSocial adopted an open approach where specifications were decided democratically. The benefits of openness are immeasurable. When connecting two or more systems, having predefined rules rather than creating specifications from scratch obviously makes things much faster. Beyond the technical ingenuity involved, it drastically reduces communication costs.

Furthermore, open specifications make it easier for products using them to emerge. Around OpenSocial, various open source products have already been born—such as Yoichiro's <a href="http://code.google.com/p/opensocial-development-environment/" target="_blank">OpenSocial Development Environment</a>, the <a href="http://groups.google.com/group/opensocial-client-libraries" target="_blank">OpenSocial Client Library</a>, OAuth-related libraries, and the <a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">OpenSocial Signed Request Library</a> that I created—boosting productivity for those who follow.

At the center of these OpenSocial-related products is <a href="http://incubator.apache.org/shindig/" target="_blank">Shindig</a>, the reference implementation of an OpenSocial container.

When I was learning the existing OpenSocial specifications, Shindig was what I unpacked and studied. At the time, hardly anyone in Japan was working with it yet, which is why I was invited to become an API Expert after publishing information about Shindig on this blog.

Later, when actually deploying it on gooホーム, I wrote various patches and contributed them to the Shindig development team. (Of course, I was also giving input on the OpenSocial specification itself.) As time went by like this, about a year and a half passed...

**I have now become a <a href="http://ja.wikipedia.org/wiki/コミッター" target="_blank">committer</a> for Shindig.**

I have been in touch with Chris Chabot, the main committer of the PHP version of Shindig, since before the very first PHP commit. We met in person at last year's Google I/O and continued to chat via messenger afterward, and Chris was the one who nominated me to become a Shindig committer.

Becoming a committer at the Apache Software Foundation apparently requires a vote by existing committers, and my past contributions were recognized and approved.

They say that the PHP version of Shindig is now used by a total of 500 million people (!) worldwide across more than 26 social networks. Despite this, not that many patches had been fed back into the project, so it seems the work I've done was quite valuable.

To me, OpenSocial is fundamentally just a tool to realize the ideal Social Web, but at least in Japan, it is the de facto standard, and Shindig—used by mixi and gooホーム—serves as its core foundation.

Moving forward, as a Shindig committer, I hope to continue helping build and support the Social Web in Japan.
