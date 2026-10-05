---
layout: post
lang: en
title: "What is EVP? Bridging the remaining gap in the passkey era"
description: "How the Email Verification Protocol (EVP) solves passkey fallback and account recovery challenges by bringing phishing resistance to email verification without sacrificing user experience."
date: 2026-10-05
updated: 2026-10-05
organic: 80
translationOf: /2026/10/email-verification-protocol.html
translated: 2026-10-05
translatedManually: true
image:
  feature: /2026/evp.jpg
tags:
  - Email Verification
  - Passkey
  - Phishing
  - Identity Verification
  - Security
  - Authentication
---

The Email Verification Protocol (EVP) allows websites to verify ownership of an email address without users ever having to leave their browser, substantially reducing user friction. Beyond this immediate UX benefit, however, adopting EVP serves an even more critical purpose: completing the account lifecycle by seamlessly complementing passkeys.

<!-- excerpt -->

## Why do we verify email addresses?

Most online services that manage user accounts require users to register an email address. A registered email address is used to deliver important service notifications and marketing communications, but above all, it is essential for account recovery.

Today, there are two primary approaches for verifying email address ownership, each with its own trade-offs:

1. **One-Time Passwords (OTP)**: A temporary code sent via email for the user to type into a form.
    - Pros: Can be entered on any screen, allowing the user to stay in the same browser.
    - Cons: Vulnerable to [phishing attacks using adversary-in-the-middle (AiTM)](https://www.trendmicro.com/ja_jp/jp-security/25/j/securitytrend-20251003-01.html) techniques.
2. **Magic Links**: A temporary verification link sent via email for the user to click.
    - Pros: Less susceptible to phishing since the link points directly to the legitimate domain.
    - Cons: Clicking the link from an email client may open an in-app browser or switch away from the user's active session.

What both approaches have in common is that users are forced to navigate away from the application and open their email client. While there have been [efforts to ease input without leaving the browser](https://www.apple.com/newsroom/2023/09/macos-sonoma-is-available-today/#:~:text=the%20one%2Dtime,leaving%20the%20browser), these features are not supported everywhere. In reality, most users have simply learned to tolerate this inconvenient experience.

The [Email Verification Protocol](https://developer.chrome.com/docs/identity/email-verification-protocol) (EVP) fundamentally transforms this experience. Take a look at this video:

{% YouTube "qZelpf_OJE8" %}

Rather than clicking a link or opening an email client, the user completes email verification entirely within the browser.

## What makes EVP compelling

EVP eliminates many long-standing pain points of conventional email verification, without placing unreasonable demands on either users or developers.

From a user experience standpoint, its standout beauty lies in **preserving existing mental models completely**. Users simply enter their email address into the form as they normally do. There is no need to switch to an email app, memorize and copy a code, or worry about getting trapped inside an in-app browser. With no new concepts to learn, users experience a verification process that finishes almost imperceptibly in the background. Because manual OTP entry is eliminated, attackers have no opportunity to trick users with spoofed entry forms.

For developers and service operators, implementation friction is intentionally minimal. EVP operates via **progressive enhancement**: supported browsers and providers perform instant background verification, while unsupported environments gracefully fall back to the traditional verification email flow. You can incrementally enhance the experience for supported users without breaking existing signup flows.

Furthermore, services are liberated from high drop-off rates caused by users who leave to check their email and never return, as well as delivery delays and undelivered email issues caused by email infrastructure bottlenecks.

{% Aside %}

While EVP verifies ownership of an email address, it does not confirm deliverability. If you intend to use the email address for transactional communications, you should perform a separate deliverability check.

{% endAside %}

## How the Email Verification Protocol works

How does EVP verify email ownership securely in the background without opening an email client? The core concept is direct collaboration between the browser and the email provider.

When a user enters or autofills their email address into a form, the browser checks with the email provider hosting that address to determine whether the user has an active session. For example, if a Gmail address is entered, the browser checks whether the user is currently signed in to their Google account. If an active session exists in that browser, the provider issues a cryptographic token—an Email Verification Token (EVT)—proving that the user is the legitimate owner of that email address.

Importantly, the email provider never learns which website requested verification. The browser acts as an intermediary, binding the requesting origin and a `nonce` to the token received from the provider before passing it to the website.

The relying party (the website) simply verifies the token's digital signature on its server to confirm legitimate ownership. There is no waiting for an email to arrive, no searching through the inbox, and no copying of codes.

For detailed protocol specifications and implementation guidance, refer to the [Chrome for Developers documentation](https://developer.chrome.com/docs/identity/email-verification-protocol) and the [WICG Explainer](https://github.com/WICG/email-verification-protocol).

EVP, however, does more than streamline sign-ups: it is poised to fill a critical gap in the modern account lifecycle by complementing passkeys. To appreciate why, let's revisit what passkeys revolutionized in the first place.

## What made passkeys innovative

In an era where account takeover is a constant threat, passwords must be long, complex, and unique for every site. Naturally, this is impossible for human beings to manage unassisted. While password managers are widely recommended, websites cannot enforce their use, necessitating additional safeguards. Multi-factor authentication (MFA)—sending OTPs via email or SMS alongside passwords—became widespread, but sophisticated attackers still bypassed these measures through credential phishing. As long as humans are required to manually enter credentials, deception remains possible. The only real solution is to take credential entry out of human hands altogether.

This led to the arrival of [passkeys](/2022/12/passkey.html). Passkeys generate a public-private key pair, storing the private key securely in a password manager or device authenticator, and the public key on the server. During authentication, instead of manually typing credentials, the user verifies device ownership (typically via biometrics), prompting the authenticator to create a digital signature with the private key. The server then validates this signature using the public key. Crucially, the browser supplies the authentic origin (domain) to the authenticator during signing. Even if a user falls victim to a phishing site, the domain mismatch is detected and rogue authentication is prevented.

Passkeys were innovative because they delegated credential management to password managers and cryptographically bound sessions to origins, delivering robust phishing resistance without compromising user convenience.

## The challenges with passkeys

While passkeys solved phishing resistance at login, a critical, unresolved challenge remains across the broader account lifecycle: **recovering an account when passkeys are unavailable (account recovery)**.

Passkeys achieve strong security by isolating private keys within secure enclaves on devices or password managers. However, users inevitably encounter situations where they cannot use their passkeys—such as when a device is damaged, lost, or when navigating synchronization barriers across disparate ecosystems (e.g., migrating between iOS, Windows, Android, and macOS).

When a user has no access to their passkey, services have no choice but to provide fallback authentication. Today, however, nearly all available fallbacks rely on legacy mechanisms: passwords, SMS OTPs, email verification codes, or magic links.

Security is dictated by its weakest link. Hardening the front door with passkeys offers little protection if the back door—account recovery—remains vulnerable to phishing. Attackers naturally target this weak point. This creates a persistent dilemma: as long as legacy recovery options remain, an account's overall phishing resistance cannot be guaranteed.

## Why EVP rescues account recovery

This is where EVP enters the picture.

When encountering EVP demos, many focus on the registration flow: "How convenient that typing an email address verifies ownership without extra steps." While that is a welcome improvement, EVP's true significance extends much further.

What makes EVP truly transformative is that **it brings phishing resistance to account recovery using the one identifier almost everyone already has: an email address**.

Today, email addresses (and in some regions, phone numbers) serve as the backbone of identity verification for consumer web services. Yet traditional verification codes and links sent via email or SMS remain susceptible to adversary-in-the-middle attacks, lacking phishing resistance.

At the same time, practical options for phishing-resistant identity verification have been virtually non-existent. Federated identity (Social Login) is rarely designed as an account recovery mechanism, and government-issued digital credentials (such as national ID cards) impose excessive friction for everyday consumer services outside regulated finance.

Account recovery has been trapped in a dilemma: either convenient but vulnerable to phishing, or secure but far too burdensome for everyday use.

EVP offers a path out of this dilemma. Because EVTs issued via EVP are cryptographically bound by the browser to the active origin, it is mathematically impossible for an attacker to obtain a valid token for a spoofed domain, regardless of how convincing their phishing site is.

In short, phishing resistance is embedded directly into the ubiquitous act of confirming an email address. Users do not need to install dedicated apps or provide identity documents; simply entering their email address into their trusted browser allows them to securely re-issue a passkey onto a new device and recover their account.

**Passkeys protect day-to-day sign-ins, while EVP safeguards emergency recovery and new device provisioning. Together, they eliminate phishing-vulnerable backdoors across the entire account lifecycle.** This synergy is why EVP is essential to realizing the full potential of passkeys.

## Remaining challenges

Of course, this vision assumes an ecosystem where EVP is widely deployed and supported. Currently, EVP is implemented only in Chrome and has not yet graduated to a stable, cross-browser standard. While Gmail already supports EVP, broader email provider participation will be necessary. Users on other browsers or utilizing alternative email providers must continue to remain vigilant against phishing threats.

Furthermore, EVP is not the only avenue being explored for phishing-resistant verification. For instance, [Firebase Phone Number Verification](https://firebase.google.com/docs/phone-number-verification) queries mobile carriers directly to confirm phone number ownership in a phishing-resistant manner. Several other approaches to robust identity verification are also actively under evaluation across the industry.

## Summary

With passkeys, web authentication has finally started breaking free from the decades-long curse of passwords. Yet until the account recovery puzzle is solved, the transition to true passwordless security remains incomplete.

The Email Verification Protocol is far more than an incremental UX enhancement. It resolves the long-standing trade-off between security and user experience in account recovery, serving as an indispensable step toward completing the authentication ecosystem.

While cross-browser adoption and provider rollout remain ongoing journeys, EVP represents a decisive stride toward the future of web authentication—one well worth watching closely.
