---
layout: post
lang: en
title: What Are Passkeys, and What Are Their Challenges?
description: This article explains the basic features of passkeys and the potential challenges as of 2022.
date: 2022-12-13
updated: 2024-12-26
image:
  feature: /2022/keys.jpg
tags:
  - Passkey
  - WebAuthn
  - FIDO
  - FIDO2
  - 認証
  - Authentication
translationOf: /2022/12/passkey.html
translated: 2026-10-03
translatedManually: false
---
Passkeys are a new authentication method that is resistant to phishing and easy to use even for non-tech-savvy users, and they are widely expected to replace passwords eventually. In this article, I'll summarize the basics of passkeys and what they mean for the future of the web.

<!-- excerpt -->

## What Are Passkeys?

On December 9, 2022, Google [announced that passkeys are now supported in Chrome on Android](https://blog.chromium.org/2022/12/introducing-passkeys-in-chrome.html). Apple had already [added passkey support to Safari in the latest macOS Ventura and iOS / iPadOS 16](https://developer.apple.com/videos/play/wwdc2022/10092/).

Passkey is the consumer-facing name for [FIDO credentials](/2019/03/fido-webauthn.html) adopted through coordination among Apple, Google, and Microsoft. The "passkey" brand and icon were established so that end users could recognize them as a password replacement and log in intuitively. From a web developer's perspective, it's safe to think of passkeys as an extension of [WebAuthn (Web Authentication)](https://w3c.github.io/webauthn), defined by the [FIDO Alliance](https://fidoalliance.org/) and the W3C. In this article, "passkey" can be used interchangeably with "FIDO credential." I previously wrote an [article about FIDO and WebAuthn](/2019/03/fido-webauthn.html), so if you haven't read it yet, please check it out.

At first glance, passkeys feel like logging in with biometrics, but as engineers, it's worth understanding what's happening behind the scenes.

### User Experience {#user-experience}

For a user to log in with a passkey, they first need to create one for each website.

When attempting to create and register a passkey, a biometric prompt pops up to perform [local authentication](#luv). Once authentication is complete, a new passkey is created.

{% YouTube 'lZXGXxZIMTU' %}

When logging in, an account selector is displayed. After selecting and tapping the account they want to use, local authentication is performed, and the sign-in is complete.

{% YouTube '6GMDhF1eQOQ' %}

Because passkeys are synchronized, they can also be used on other devices. In environments where passkeys cannot sync directly, cross-device sign-in is possible.

During login, the browser shows a menu such as "Sign in with another device," and tapping it displays a QR code. Scanning it with a smartphone triggers local authentication, and once finished, the desktop login completes automatically as well.

{% YouTube '8D84Yosw-Ws' %}

Chrome remembers your devices, so starting from the second time, you can simply tap the device name instead of scanning a QR code. Of course, if you then create a new passkey on the desktop, you'll be able to sign in without needing the phone at all.

You can try this out yourself with [this demo](https://passkeys-demo.appspot.com).

## Why Passkeys Are Better Than Passwords

### Passkeys Are Phishing-Resistant {:#phishing}

A passkey is stored with metadata that includes the domain of the website where it was created. Because of this, authentication cannot proceed unless the domain matches. This virtually eliminates phishing while also offering the benefit that users no longer need to worry about scrutinizing URLs.

### Passkeys Authenticate Locally {#luv}

Passkey local authentication is resilient against remote attacks.

When creating a passkey or logging in with one, authentication is performed using the device's screen lock—the same method used to unlock the device itself. On Android, that means fingerprint, face recognition, a PIN, or a pattern. On iOS / iPadOS, Touch ID, Face ID, or a passcode. On macOS, Touch ID or a password, and on Windows, Windows Hello or a PIN. This authentication happens directly on the user's device without sending credentials over the network, which is why it's called "local authentication."

When a passkey is created, local authentication triggers the generation of a new public key pair: the private key remains on the device, while the public key is sent to and stored on the server. A passkey essentially refers to this private key and its metadata. Afterwards, the passkey is synchronized so it can be used from other devices.

With passwords, remote authentication happens by sending the string entered by the user to the server; with passkey logins, local authentication triggers the generation of a cryptographic signature, which is then sent to the server. The server verifies this signature using the public key that was saved when the passkey was created.

Did you notice that authentication is actually performed twice—once through local authentication, and once through signature verification on the server? In other words, a passkey by itself provides two-factor authentication combining inherence (or knowledge) and possession. Unlike passwords, passkeys are inherently strong, difficult to leak, and cannot be reused.

{% Aside %}

**Update (December 26, 2024):** As time has passed since passkeys were introduced, opinions on whether a passkey alone qualifies as two-factor authentication have shifted. In FIDO2 authentication (WebAuthn authentication before passkeys), credentials were saved in a secure chip on the device, and local authentication strictly used the device's built-in capabilities, so it was undeniably two-factor authentication. With passkeys, however, the storage destination is a password manager of the user's choosing, and local authentication is determined by that password manager, making it hard to know how trustworthy the proof of local authentication really is. Some password managers, such as 1Password, return the UV flag as `true` even when local authentication is skipped.

Taking this into account, I have come to the conclusion that passkeys are not two-factor authentication. That said, I don't believe that not being two-factor makes them weak, either. Rather, my view is that thanks to passkeys, the era of evaluating security strength purely by whether something is two-factor has come to an end. For more details on this topic, I recommend reading [Koiwai-san's article](https://sizu.me/kkoiwai/posts/vrbdbodcbsub) and [Yuriy Ackermann's article](https://herrjemand.medium.com/are-passkeys-mfa-f2720c983d5e).

{% endAside %}

### Passkeys Can Sync Across Devices {#synchronization}

The most significant feature of passkeys is that they can sync across devices.

With traditional FIDO, a credential created on one device could only be used on that same device. While that meant remote attacks were impossible and attackers couldn't do anything without physical access to the target device, it also created problems [both in terms of usability and security](#security) when migrating to a new device. Passkey synchronization solves all of these issues.

However, passkey sync is limited to within the same ecosystem. An "ecosystem" here refers to mechanisms like password managers provided by the major platforms, namely Google, Apple, and Microsoft. For instance, Apple syncs passkeys via iCloud Keychain, and Google syncs them via Google Password Manager (Microsoft's plans are still unclear as of December 2022, as they have not yet made a formal announcement regarding passkey support).

Because Apple is vertically integrated, Safari doesn't run on non-Apple devices, and everything is essentially centered around Apple IDs and synced via iCloud Keychain. Google Chrome syncs between Android devices based on Google Accounts using Google Password Manager, but passkey sync does not occur on other operating systems. That said, Google has [stated](https://developers.google.com/identity/passkeys/supported-environments#chromes_passkey_support_on_different_operating_systems) that it plans to sync passkeys across those ecosystems once Apple and Microsoft make the sync APIs available.

{% Aside %}

Android has also announced future support for third-party password managers to sync passkeys, which means password managers that have committed to supporting passkeys, such as 1Password, may become usable on Android as well.

{% endAside %}

### You Can Use the Account Selector {#account-selector}

Strictly speaking, this feature was already available in Safari and desktop Chrome, but Android's support has brought the account selector to the forefront of how passkeys are used. In WebAuthn, this is known as Discoverable Credentials (formerly [Resident Key](/2019/03/fido-webauthn.html#resident-key)), which enables the account selector UI by storing user information as metadata within the passkey. Users don't need to type their username; they can sign in simply by tapping to select their account, followed by local authentication. For users who tend to forget not just passwords but their usernames too, this significantly improves usability.

### You Can Sign In with a Phone {#sign-in-with-a-phone}

This is the phone sign-in feature described earlier in the user experience section.

Google Accounts have long supported [registering a smartphone as a security key for two-factor authentication](https://support.google.com/accounts/answer/9289445?hl=ja). This FIDO-compliant mechanism was expanded so it could be used beyond Google Accounts. That expanded mechanism is what powers the ability to log in from another browser via a QR code. It used to be called [caBLE](/2019/03/fido-webauthn.html#cable), but it has since been renamed to hybrid.

Because Hybrid was designed from the start with standardization in mind, an equivalent feature was implemented in Safari alongside passkeys. This makes it possible to log in to Safari on macOS using an Android device, or log in to Chrome on Windows using an iPhone.

{% Aside %}

Google's 2-Step Verification has a similar feature that [sends a push notification to approve a login](https://support.google.com/accounts/answer/6361026?hl=ja), but that is a proprietary mechanism.

{% endAside %}

## Thoughts on Passkeys

### Privacy {#privacy}

When suddenly prompted for biometric authentication on a website, many end users will naturally wonder where their fingerprint or face data is going. Especially in the early days of passkey adoption before users are accustomed to them, it's completely understandable to worry that fingerprint or face data might be collected for surveillance, or that a service breach could leak it into the wrong hands.

FIDO enforces a [rule](https://fidoalliance.org/wp-content/uploads/FIDO_Authentication_and_GDPR_White_Paper_May2018-1.pdf) that biometric data must be stored on the authenticator device and must never be sent to a server. As long as a FIDO Certified authenticator is used ([Android is certified](https://prtimes.jp/main/html/rd/p/000000008.000037279.html); the iPhone likely is as well, though I couldn't find a source), this principle is guaranteed to be upheld, so you can rest assured.

Furthermore, the only information handed over to a service upon creating a passkey is the public key and a credential ID—both of which are site-specific byte sequences that carry no inherent meaning on their own. The credential ID is used to restrict which authenticators can be used during authentication, or to look up the public key matching the signature verified by the server. The public key is used to verify the signature sent during authentication. Therefore, unless combined with personal information like an email address or name at registration, a passkey cannot be used to track a user across websites.

Passkeys may pose a psychological hurdle for end users, especially early on, so service providers will likely need to be mindful of this and provide reassuring context.

### Is Passkey Synchronization the Right Approach? {#security}

FIDO is fundamentally based on possession authentication using public-key cryptography. The key premise was that breaching authentication is extremely difficult without physical access to the authenticator. However, passkeys make credentials syncable, allowing them to be used across multiple devices. Some have raised concerns that this departs from [AAL3 (Authenticator Assurance Level 3) as defined in NIST SP800-63B](https://pages.nist.gov/800-63-3-Implementation-Resources/63B/AAL/).

That said, if we refuse to accept anything other than strictly device-bound credentials, migrating to a new device brings its own set of problems:

* You have to migrate every single account where a credential was created.
* You are forced to log in to the new device using non-FIDO, phishing-susceptible methods.

Setting aside the non-option of continuing to use passwords, the real question is whether to stick with traditional FIDO credentials—which carry poor usability and force fallback to phishing-susceptible methods—or choose passkeys, which offer high usability at a slight increase in risk. In my view, the best approach is to choose based on your specific needs.

For consumer-facing services like social media or news apps, where an account takeover doesn't typically result in devastating financial damage, prioritizing the convenience of passkeys is the sensible choice.

Conversely, for enterprise environments dealing with confidential data, or banks and wallet apps handling money where severe financial harm is possible, you'd likely want to keep credentials device-bound even if it means sacrificing some usability.

Chrome allows this distinction: creating a passkey with Discoverable Credentials enabled will sync it, while creating one with it disabled results in a traditional, non-synced FIDO credential. In Safari, all credentials become passkeys and are synced, which might make it harder to adopt in enterprise scenarios (perhaps under the pragmatic view that enterprises can simply require two-factor authentication with hardware security keys).

### Device Public Key {#dpk}

Another option being proposed is an extension called [Device Public Key](https://w3c.github.io/webauthn/#sctn-device-publickey-extension), which aims to offer the best of both worlds between passkeys and device-bound FIDO credentials. This mechanism creates an additional, device-specific public key pair alongside the passkey, enabling the server to detect whether a request is coming from a device where the passkey has already been registered. The hope is that this will allow us to combine the usability of passkeys with the guarantees of device-bound FIDO credentials.

That said, while Device Public Key is currently planned for implementation in Android, there has been no announcement yet regarding support on Apple devices. It will be worth keeping an eye on future developments, including Microsoft's moves.

## Conclusion

With the arrival of passkeys, FIDO has finally entered the realm of practical, everyday use. While challenges remain—such as the questions discussed above, [lack of support in Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1530370), and room for improvement in sync environments—these issues are likely to be resolved over time. Services like [PayPal](https://newsroom.paypal-corp.com/2022-10-24-PayPal-Introduces-More-Secure-Payments-with-Passkeys) and [Yahoo! JAPAN](https://support.yahoo-net.jp/SccLogin/s/article/H000004626) have already rolled them out in production.

Here are a few resources to check out:

* Official Google Documentation: [Passwordless login with passkeys](https://goo.gle/passkeys)
* Official Apple Documentation: [Authenticating a User Through a Web Service](https://developer.apple.com/documentation/authenticationservices/authenticating_a_user_through_a_web_service)
* [Create a passkey for passwordless logins](https://web.dev/passkey-registration/)
* [Sign in with a passkey through form autofill](https://web.dev/passkey-form-autofill/)

I look forward to seeing passkey implementations accelerate even further in 2023.

## DevFest & Android Dev Summit Japan 2022 Is Coming Up

Lastly, a quick plug: this Friday, December 16, [DevFest & Android Dev Summit Japan 2022](https://developersonair.withgoogle.com/events/adsjapan_2022) will be held at the Google office. There will be plenty of sessions covering Flutter, Firebase, and Android, in addition to the web.

On the web side alone, there's a fantastic lineup of speakers including Google Developers Experts [Yoshiko-san](https://twitter.com/yoshiko_pg) and [Yakura-san](https://twitter.com/myakura), Chrome team PM [Kenji Baheux](https://twitter.com/KenjiBaheux), Chrome Developer Relations team lead [Paul Kinlan](https://twitter.com/Paul_Kinlan) (video), along with my teammates [Milica Mihajlija](https://twitter.com/bibydigital), [Adriana Jara](https://twitter.com/tropicadri), and [Jhey Tompkins](https://twitter.com/jh3yy). I'll also be giving a talk on passkeys, the topic of this article.

If you have in-depth questions about any of the sessions, please come chat in person at the venue! It's a hybrid event, so you can also [watch the livestream by registering here](https://gdg-tokyo.connpass.com/event/266648/). We look forward to seeing you there!

Photo by <a href="https://unsplash.com/@fess0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Filip Szalbot</a> on <a href="https://unsplash.com/s/photos/keys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
