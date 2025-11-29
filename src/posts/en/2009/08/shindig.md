---
layout: post
lang: en
title: 'I became a Shindig committer'
description: ''
date: 2009-08-29
tags:
- Shindig
translationOf: /2009/08/shindig.html
translated: 2025-11-29
translatedManually: false
---
"The web should be social." This is something I've been advocating since I joined my current company around 2005. There's a lot we can achieve by turning the social graph into a platform. Our first goal was to make the entire portal site social, and that's how we created <a href="http://home.goo.ne.jp/" target="_blank">goo Home</a>.

At that point, we already had a vision for the future, and we envisioned eventually connecting to sites outside the portal, and connecting the entire internet through a social graph. That's when <a href="http://www.facebook.com/" target="_blank">Facebook</a> came along.

What Facebook was trying to do was to incorporate services into a social networking site, which was the exact opposite of what I was thinking, but in the end what they were trying to do was similar, and I felt frustrated that they had achieved it first. Then <a href="http://www.opensocial.org/" target="_blank">OpenSocial</a> appeared.

OpenSocial was an open system where specifications were decided democratically. The benefits of openness are immeasurable. It is obvious that when connecting two or more systems, it is quicker if there are already rules in place than if you have to create specifications from scratch. In addition to the technical ingenuity, communication costs can be significantly reduced.

Furthermore, open specifications make it easier to create products that use them. A variety of open source products have already been created around OpenSocial, including Yoichiro's <a href="http://code.google.com/p/opensocial-development-environment/" target="_blank">OpenSocial Development Environment</a> and <a href="http://groups.google.com/group/opensocial-client-libraries" target="_blank">OpenSocial Client Library</a>, OAuth-related libraries, and my own <a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">OpenSocial Signed Request Library</a>, which is boosting the productivity of new products.

At the heart of these OpenSocial-related products is <a href="http://incubator.apache.org/shindig/" target="_blank">Shindig</a>, the reference implementation of the OpenSocial container.

It was Shindig that I unraveled when I was learning about the existing OpenSocial specifications. At the time, very few people in Japan had started working with it, so I was approached to be an API Expert because I had published information about Shindig on this blog.

After that, when it came time to actually deploy it on goo Home, I wrote various patches and provided them to the Shindig development team. (Of course, I also had a say in the OpenSocial specifications themselves.) And so, about a year and a half has passed...

**I'm now a Shindig <a href="http://ja.wikipedia.org/wiki/コミッター" target="_blank"> committer</a>. **

I had been in contact with Chris Chabot, the main committer for the PHP version of Shindig, since before the first commit for the PHP version, and met him in person at Google IO last year. We have continued to talk via messenger since then, and it was Chris who recommended me to be a committer for Shindig.

Apparently, to become a committer at the Apache Software Foundation, you need a vote from an existing committer, and my past contributions were recognized and I was approved.

The PHP version of Shindig is now used by a total of 500 million people (!) around the world on over 26 social networking sites. Despite this, there weren't many patches that were fed back, so it seems that what I had done was valuable.

To me, OpenSocial is simply a tool for realizing the ideal Social Web, but at least in Japan it has become the de facto standard, and the Shindig product used by mixi and goo Home supports its core.

In the future, as a Shindig committer, I hope to help create and support Japan's Social Web.