---
layout: post
lang: en
title: "I wrote a book titled \"All About Passkeys.\""
description: "I wrote a book titled \"All About Passkeys.\" Here is a brief introduction to the contents of the book, which will be released on January 28, 2025."
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
translated: 2026-10-03
translatedManually: false
---
I wrote a book titled [「パスキーのすべて」](https://gihyo.jp/book/2025/978-4-297-14653-5) (*Everything About Passkeys*). Here is a brief introduction to what's inside the book, which will be released on January 28th.

<!-- excerpt -->

{% ImageFigure '/images/2025/everything-about-passkeys.jpg', 'パスキーのすべて', 'max-width: 400px; margin: 0 auto 30px;' %}

*Everything About Passkeys* was co-authored with Koiwai-san, Director at the US OpenID Foundation and KYC WG Leader at OpenID Foundation Japan, and [Kura](https://x.com/kura_lab), Director and Evangelist at OpenID Foundation Japan. Koiwai-san collaborated with us on the [Passkeys Hackathon](https://web.dev/blog/passkeys-hackathon-tokyo) held last year, and we often speak at the same events; I've been indebted to him recently for many things beyond just FIDO. Kura and I have been good friends in the identity community for over a decade. Both are wonderful, trusted companions. While we had a rough division of roles, we wrote the book under a structure where everyone shared responsibility for the entire content. Toward the end, we gathered in a Gijutsu-Hyouron-sha conference room multiple times to write and review together, thoroughly enjoying the process itself. Huge thanks to our editor, Kikuchi-san, who provided tremendous support even through weekends and holidays.

True to its title, the book leaves nothing on the table, packing in all our collective knowledge—not just the technical aspects of passkeys, but also their origins, ecosystem, and the surrounding landscape. The best way to get an overview of the content is to check the [table of contents](https://gihyo.jp/book/2025/978-4-297-14653-5#toc), but here are a few personal highlights:

* Covers fundamental information that PMs and designers should know
* Packed with the essential knowledge engineers need to implement passkeys
* Rich in advanced topics for experienced practitioners

## Fundamental information that PMs and designers should know

{% ImageFigure '/images/2025/introduction.jpg', 'はじめに' %}

Designed to be read by a wide range of team members working on passkeys, the book contains plenty of information useful for PMs and designers—such as what passkeys are, the benefits of using them, passkey user experiences, case studies, common misconceptions versus reality, and potential pitfalls. In particular, the breakdown of passkey support across platforms—spanning OSs, browsers, and password managers—should prove extremely valuable when designing services.

{% ImageFigure '/images/2025/environment.jpg', 'サポート環境' %}

We also introduce the characteristics and usage of widely adopted authentication methods such as passwords, two-factor authentication, and federated identity (social login), discussing what alternative options exist, how to handle them, and what to do when passkeys are unavailable. When designing authentication, passkeys aren't the only thing to consider.

## Packed with the essential knowledge engineers need to implement passkeys

By providing a variety of code samples, the book covers not only browser-side implementation aligned with standard user experiences and the WebAuthn API reference, but also server-side implementation. We also introduce implementations for native Android and iOS apps, providing sample code especially for iOS apps where Japanese-language resources are scarce.

{% ImageFigure '/images/2025/code-samples.jpg', 'パスキーのUXを実装する' %}

## Rich in advanced topics for experienced practitioners

Encouraging broader adoption of passkeys requires various creative approaches. To address these needs, the book is packed with advanced topics as well. We cover how to determine where a passkey is stored, how to make the same passkey usable across multiple domains, what attestation is, how to implement passkeys using enterprise security keys, details on credential payloads, various extensions, and more.

While technology moves fast and reference material often has a short shelf life, this book also covers the latest WebAuthn Level 3 specifications expected to become available, making it a reliable reference for at least the next two years.

## In closing

While passwords are easy to start with, they are riddled with pitfalls. There are simply too many caveats for everyone to use them safely, and as a consequence, account takeovers remain an endless problem. When implemented correctly, passkeys offer an authentication mechanism that is easy for anyone to use while delivering a level of security that previous technologies could never achieve. While there is still room for growth, the time is already ripe. Now is the time to start considering passkey implementation.

I have regularly shared information about passkeys through events and social media as part of my job, and occasionally through this blog and magazine articles as a hobby. The reason I decided to take on the challenge of a book this time was that I was reminded of the reassurance and value that comes from having a comprehensive body of knowledge compiled in one place right at hand. If you are looking to learn about passkeys, I hope you will keep a copy of this book by your side as you embark on the journey.
