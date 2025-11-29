---
layout: post
lang: en
title: 'I wrote a book called "All About Passkeys."'
description: 'I have written a book called "All About Passkeys." I would like to briefly introduce the contents of this book, which will be released on January 28, 2025.'
date: 2025-01-13
image:
feature: /2025/everything-about-passkeys.jpg
tags:
- Passkey
- WebAuthn
- FIDO
- FIDO2
- 認証
- Authentication
- Publication
translationOf: /2025/01/everything-about-passkeys.html
translated: 2025-11-29
translatedManually: false
---

I wrote a book called ["All About Passkeys"](https://gihyo.jp/book/2025/978-4-297-14653-5). I'd like to give you a brief introduction to the contents of this book, which will be released on January 28th.

<!-- excerpt -->

{% ImageFigure '/images/2025/everything-about-passkeys.jpg', 'パスキーのすべて', 'max-width: 400px; margin: 0 auto 30px;' %}

I wrote "All About Passkeys" together with Mr. Koiwai, a director of the OpenID Foundation in the United States and leader of the OpenID Foundation Japan's KYC Working Group, and [Kura](https://x.com/kura_lab), a director and evangelist at OpenID Foundation Japan. Mr. Koiwai also helped me with last year's [Passkey Hackathon](https://web.dev/blog/passkeys-hackathon-tokyo), and we've often spoken at the same events. He's been helping me out with various things recently, not just FIDO-related. Mr. Kura and I have been good friends in the ID community for over 10 years. We are both friendly and enjoyable colleagues. While we roughly divided the work, we all took responsibility for the overall writing. Toward the end, we all retreated to the Gijutsu Hyoronsha conference room several times to write and review the book, which made the process itself a lot of fun. I'd like to thank Mr. Kikuchi, the editor, for his help, even on his day off.

As the title suggests, this book covers not only the technical aspects of Passkey, but also its origins, ecosystem, surrounding circumstances, and more, incorporating all of our knowledge. For a rough overview, it's best to take a look at the [Table of Contents](https://gihyo.jp/book/2025/978-4-297-14653-5#toc), but I'd like to share some of my personal highlights.

* Contains basic information that PMs and designers need to know.
* Contains the essentials that engineers need to know to implement passkeys.
* Includes a wealth of information for advanced users.

## A collection of basic information that PMs and designers need to know

{% ImageFigure '/images/2025/introduction.jpg', 'はじめに' %}

This book is intended to be read by a wide range of members of teams working on passkeys, and contains a lot of information that will be useful for PMs and designers as well, such as what passkeys are, the benefits of using them, user experiences with passkeys, case studies, common misconceptions and their solutions, and pitfalls. In particular, the information on passkey support on each platform across operating systems, browsers, and password managers will be extremely useful when designing services.

{% ImageFigure '/images/2025/environment.jpg', 'サポート環境' %}

It also introduces the features and usage of widely used authentication methods such as passwords, two-factor authentication, and ID linking, and touches on what authentication methods other than passkeys are available, how they should be handled, and what to do if your passkey becomes unusable. Passkeys are not the only thing you need to consider when designing authentication functions.

## Contains the essentials that engineers need to know to implement passkeys

This book provides various sample code, covering not only browser-side implementations and WebAuthn API references that align with the basic user experience, but also server-side implementation methods. It also introduces implementations for native Android and iOS apps, and provides sample code for iOS apps, for which there is little information available in Japanese.

{% ImageFigure '/images/2025/code-samples.jpg', 'パスキーのUXを実装する' %}

## Packed with information for advanced users

To encourage wider adoption of passkeys, various measures are required. To meet these needs, the book also contains a wealth of information for advanced users. It covers topics such as how to find out where passkeys are stored, how to use the same passkey for multiple domains, what attestation is, how to implement passkeys using security keys in the enterprise, details of credential payloads, and various extensions.

Although the technology industry has a short shelf life, this book covers the latest specifications for WebAuthn Level 3, which is expected to become available in the near future, making it a book you can refer to with confidence for the next two years.

## lastly

While passwords are easy to use, they have many pitfalls and require far too many precautions for anyone to use them safely, resulting in a constant stream of account hijacking. Passkeys, when implemented correctly, are easy for anyone to use and are an authentication feature that ensures security not possible with previous technology. While there is still room for growth, the time is ripe. Now is the time to start considering implementing passkeys.

I usually share information about passkeys through events and social media as part of my job, and occasionally through this blog and magazines as a hobby. The reason I decided to try the book format this time was because I once again realized the comfort of having a medium that allows me to have comprehensive information at my fingertips. If you are learning about passkeys, I would encourage you to have this book at hand.

