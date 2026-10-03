---
layout: post
lang: en
title: "It's been 10 years since I joined Google."
date: 2020-06-01
image:
  feature: /2020/10th-anniversary.jpg
tags:
  - Google
  - Developer Advocate
translationOf: /2020/06/google-10th-anniversary.html
translated: 2026-10-03
translatedManually: false
---
Today marks exactly 10 years since I joined Google as a Developer Advocate. I rarely write blog posts about non-technical topics, but since this is a meaningful milestone, I wanted to take this opportunity to leave a record.

<!-- excerpt -->

## How I ended up joining Google

"Create an identity layer for the internet, and turn the entire web into an open foundation for social networking." That was the ambition I held at my previous job. As a first step, my proposal to transform the entire web portal my company operated into a social platform was accepted. As we moved that forward, I worked extensively with OpenSocial, a technology led primarily by Google. Since there was very little information available in Japanese in this space, I wrote blog posts, ran community events, and gave technical talks. That led [Yoichiro Tanaka](https://twitter.com/yoichiro), who was (and still is) a great friend of mine, to nominate me as a [Google API Expert (now Google Developer Expert)](https://developers.google.com/community/experts). A few years later, a contact at Google invited me to join the company.

When I first joined, I was part of the Chrome DevRel (Chrome Developer Relations) team, starting my journey advocating for web technologies centered around Chrome. Today, reflecting team strategy shifts, our role has evolved from advocating for "Chrome" to advocating for "the web." Through various organizational changes and twists along the way, I have spent these 10 years doing essentially the same kind of work on virtually the same team.

## What I've been working on lately

A while back, [I wrote an article about what a Developer Advocate does](/2013/04/google-developer-advocate.html). Back then, much of my work focused on contributing to the Japanese web community, but today the weight has shifted toward more global and technical work. Although there is a fairly large Chrome engineering team in Japan, by coincidence none of the engineers working on my specific projects are based in Japan, so I almost always collaborate with folks in North America or Europe (I recently had the opportunity to work with Tokyo-based engineers for the first time in a while, and the sense of reassurance was on a completely different level). In fact, I've never once had a manager based in Japan, either.

Since this is a good opportunity, let me summarize what kind of work I've been doing lately.

### Assisting with web standardization

Since HTML5, the technical domains browsers cover have expanded so broadly—audio, graphics, hardware, networking, and more—that you can't really keep up without specializing. Within that spectrum, I'm responsible for identity/authentication and payment technologies.

Although I had a long hiatus, authentication is an area where my past knowledge proves incredibly useful, and because I've always had a personal interest in it, it fits naturally. To throw out some keywords, projects I've been involved in recently include the [Credential Management API](https://developers.google.com/web/updates/2016/04/credential-management-api), [FIDO / WebAuthn](https://developers.google.com/identity/fido/), [Web OTP](https://web.dev/web-otp/), and [WebID](https://github.com/samuelgoto/webid). WebID in particular is an upcoming project, but because it lies directly on the extension of my original ambition, I'm genuinely thrilled to be involved.

As for payment technologies, when I first started I was a complete novice, but over time I've accumulated quite a bit of knowledge. In terms of web technology keywords, it's just [Web Payments](https://g.co/dev/WebPayments/), but it requires knowledge of existing payment infrastructure, regulations, and other aspects that sit far outside the traditional realm of the web, making it a rather unique domain.

That said, authentication and payments share many technical intersections, so I often feel fortunate to work on both. In particular, with privacy-related technologies such as third-party cookies expected to change drastically going forward, having knowledge that spans both areas gives me many opportunities to help others. While I keep a healthy distance from direct specification authoring, I do leverage that knowledge to pitch ideas and offer advice (incidentally, spec drafting is done [openly on GitHub](https://github.com/w3c/), so anyone can contribute feedback).

When it comes to my day-to-day output, perhaps the easiest way to explain it is that I digest primary sources—such as technical specifications proposed for web standards—and produce secondary resources. What I create is content that external web developers can quickly understand, digest, and put to use. This includes written articles, of course, but also demos, codelabs, videos, presentations, and, when appropriate, working with external developers to build case studies. This aspect hasn't changed much over the years. Naturally, the goal is for the content itself to be useful, but I also look forward to others building even clearer content or demos inspired by it. That's one of the fun parts of this job.

### Writing technical articles for official Google sites

The team I'm currently on has several official channels for publishing information:

* [web.dev](https://web.dev): Currently the primary content site. The content is created with a strong emphasis on remaining as browser-neutral as possible. In addition to blog posts, it offers structured learning pathways. I've already written several articles here, and alongside the newly launched [`/payments`](https://web.dev/payments/) section, discussions are underway to create a new `/identity` section. ([My past articles](https://web.dev/authors/agektmr/))
* [Web Fundamentals](https://developers.google.com/web/): Although content is gradually migrating to web.dev, this site holds a massive archive accumulated over the past several years. Chrome-specific information still tends to be published here. ([My past articles](https://developers.google.com/web/resources/contributors/agektmr))
* [Dev Channel](https://medium.com/dev-channel): A semi-official Medium publication. It aggregates blog posts written by members of the team in a more casual, hobby-like spirit rather than strictly as official work. ([My past articles](https://medium.com/@agektmr))

Recent notable articles and resources:

* [Your First WebAuthn (Codelab)](https://codelabs.developers.google.com/codelabs/webauthn-reauth/): A codelab for developers looking to implement biometric login using WebAuthn
* [Verify phone numbers on the web with the Web OTP API](https://web.dev/web-otp/): A feature that allows the browser to automatically obtain an OTP delivered via SMS (and other channels)
* [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/): How to implement security features that prevent cross-origin information leaks
* [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/): An explanation of the COOP+COEP concepts mentioned above
* [Understanding "same-site" and "same-origin"](https://web.dev/same-site-same-origin/): An explanation of the differences between same-site and same-origin
* [Web Payments](https://web.dev/payments/): A new documentation set for Web Payments, which we'll continue expanding

### Speaking

Over the past few years, I've had many opportunities to speak at official Google events such as Google I/O and Chrome Dev Summit.

{% YouTube 'NJ-sphu2DqQ' %}

{% YouTube 'DBBFK7bvEQo' %}

{% YouTube 'kGGMgEfSzMw' %}

{% YouTube 'WxXF17k1dko' %}

## Looking ahead to the next 10 years

With the ubiquity of smartphones, browsers have permeated every demographic, and the web has truly become part of society's critical infrastructure. Just like electricity, gas, water, telephone lines, and broadband connections, it is no exaggeration to say that the mechanism of the web—browsers included—is an integral part of our daily lives. Just as software has accelerated the pace of global change, the web leverages its unique fluidity to accelerate that change even further.

The web belongs to no one. Even if Google, Apple, and Mozilla were to disappear, the web would endure as a monument of collective human wisdom, continuing to enrich people's lives for a long time to come. However, the web cannot fulfill that purpose through standard specifications alone. It only functions as social infrastructure when someone builds content and services on top of it. Who gets to build them? Anyone can. A platform where anyone can create and deliver content freely without asking for anyone's permission—that is the web.

I see my job as helping web developers make effective use of standard web technologies to build content and services that make the world a better place. As I move forward, I hope to continue contributing to the growth and nurturing of this ecosystem.
