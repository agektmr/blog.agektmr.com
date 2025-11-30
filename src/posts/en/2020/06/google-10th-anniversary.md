---
layout: post
lang: en
title: "It's been 10 years since I joined Google."
description:
date: 2020-06-01
image:
  feature: /2020/10th-anniversary.jpg
tags:
  - Google
  - Developer Advocate
translationOf: /2020/06/google-10th-anniversary.html
translated: 2025-11-30
translatedManually: false
---
Today marks exactly 10 years since I joined Google as a Developer Advocate, a position focused on educating people about technology. I rarely blog about non-technical topics, but this is a good milestone, so I wanted to take this opportunity to record it.

<!-- excerpt -->

What led me to join Google?

"I want to create an identity layer on the Internet and turn the entire Internet into the foundation of an open social network." This was my ambition at my previous job. As a first step toward that goal, I proposed turning the entire portal site operated by the company into a social platform. As part of this effort, I was working on OpenSocial, a technology that Google was developing. Since there was little information available in Japanese about this field, I started blogging, running communities, and giving technical talks. My then-friend [Yoichiro Tanaka](https://twitter.com/yoichiro), who I still have a good relationship with, recommended me to [Google API Expert (now Google Developer Expert)](https://developers.google.com/community/experts). A few years later, a Google representative asked me if I wanted to join the company.

When I first joined the company, I started out working on a team called Chrome DevRel (Chrome Developer Relations), where I promoted web technologies, mainly Chrome. Now, due to team policy, I'm an advocate for the web rather than Chrome, but I've been doing the same kind of work in more or less the same team for 10 years, even going through twists and turns, including organizational changes.

## Recent work

I previously wrote an article about what a Developer Advocate does. At the time, my work focused on contributing to the Japanese web, but now I'm focusing on global and technical work. While there's a fairly large Chrome engineering team in Japan, none of the engineers involved in the project I'm working on happen to be based in Japan, so I generally work with people from North America or Europe. (Recently, I had the opportunity to work with engineers in Tokyo for the first time in a while, but it felt completely different.) Incidentally, my boss has never actually been in Japan.

Since this is a good opportunity, I'd like to summarize what kind of work I've been doing recently.

### Helping with web standards

Since HTML5, the range of technical fields covered by browsers has expanded to the point where it would be difficult to keep up without dividing them into specialized fields, including audio, graphics, hardware, and communications. Among these, I am in charge of authentication and payment technologies.

Although I've had a long break, authentication technology is a field where I can put my previous knowledge to good use, and since I've always been interested in it, it's a good fit. Keyword-wise, projects I've been involved in recently include [Credential Management API](https://developers.google.com/web/updates/2016/04/credential-management-api), [FIDO / WebAuthn](https://developers.google.com/identity/fido/), [Web OTP](https://web.dev/web-otp/), and [WebID](https://github.com/samuelgoto/webid). WebID in particular is an upcoming project, but it's an extension of my original ambitions, so I'm very excited to be involved in this work.

When I first started, I was a complete novice when it came to payment technology, but I've recently gained a lot of knowledge. The only web technology keyword I know is [Web Payments](https://g.co/dev/WebPayments/), but it's a specialized field because it requires knowledge of existing payment technologies and regulations that are quite different from the web world.

However, because the authentication and payment fields have much in common technically, I've had many opportunities to be glad that I work in both. Privacy-related technologies, such as third-party cookies, are expected to undergo major changes in the future, and my knowledge of both fields has helped me in many ways. While I keep my distance from being directly involved in the specification development process, I do use that knowledge to offer ideas and advice. (By the way, the specification development process is openly carried out on GitHub, so anyone can offer their opinions.)

The easiest way to describe the output of my work is to digest primary information, such as technical specifications proposed for web standards, and create secondary information. What I create is content that external web developers can quickly understand, digest, and use. In addition to written content, I also create demos, code labs, videos, lectures, and, if necessary, case studies with external developers. This hasn't changed much over the years. Of course, I aim for the content itself to be useful, but I also hope that others will create even easier-to-understand content and demos. This is one of the fun parts of this job.

### Writing technical articles on the official Google website

In the team I'm currently in charge of, there are several official outlets for information.

* [web.dev](https://web.dev): Currently the main information site. Content is created with an emphasis on being as browser-neutral as possible. In addition to blogs, it also provides comprehensive educational content. Several articles have already been written, and in addition to the recently launched [`/payments`](https://web.dev/payments/) section, there are plans to create a new `/identity` section. ([Past Posts](https://web.dev/authors/agektmr/))
* [Web Fundamentals](https://developers.google.com/web/): While the transition to web.dev is gradually underway, this information site has accumulated information from the past few years. Chrome-specific information still tends to appear here. ([Past Posts](https://developers.google.com/web/resources/contributors/agektmr))
* [Dev Channel](https://medium.com/dev-channel): A semi-official Medium. It aggregates blog posts written by members of the same team, not as part of their work, but as a sort of hobby. ([Past article](https://medium.com/@agektmr))

Recent major articles:

* [Your First WebAuthn (Codelab)](https://codelabs.developers.google.com/codelabs/webauthn-reauth/): A codelab for those who want to use WebAuthn to log in with biometric authentication.
* [Verify phone numbers on the web with the Web OTP API](https://web.dev/web-otp/): A feature that automatically retrieves OTPs obtained via SMS (or other means) in the browser.
* [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/): How to implement security features to prevent cross-origin information leakage.
* [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/): An explanation of the above COOP+COEP.
* [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/): An explanation of the difference between same-site and same-origin.
* [Web Payments](https://web.dev/payments/): A new documentation set for Web Payments. More articles will be added in the future.

### Lecture

In recent years, he has had many opportunities to speak at official Google events, such as Google I/O and Chrome Dev Summit.

{% YouTube 'NJ-sphu2DqQ' %}

{% YouTube 'DBBFK7bvEQo' %}

{% YouTube 'kGGMgEfSzMw' %}

{% YouTube 'WxXF17k1dko' %}

## Looking ahead to the next decade

With the spread of smartphones, browsers have spread to all levels of society, and the web has now become a part of social infrastructure. Just like electricity, gas, water, telephone, and internet lines, it is no exaggeration to say that the web, including browsers, is an essential element of our lives. Just as software has accelerated the pace of change in the world, the web's fluidity is accelerating change even more.

The web belongs to no one. Even if Google, Apple, and Mozilla disappear, it will continue to enrich people's lives as a form of human wisdom for many years to come. However, the web is meaningless if only standard specifications exist. It only begins to fulfill its role as social infrastructure when someone creates content and services on it. Who creates it? Anyone can. The web is a platform where content can be freely created and provided without anyone's permission.

I see my job as helping web developers make good use of standard technologies to create content and services that make the world a better place, and I would like to continue working with the aim of creating such an ecosystem.
