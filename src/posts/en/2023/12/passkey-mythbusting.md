---
layout: post
lang: en
title: Passkey Basics and Clearing Up Common Misconceptions
description: After reviewing the basics of passkeys, I will explain some common misconceptions about them.
date: 2023-12-18
updated: 2024-12-26
image:
  feature: /2023/passkeys.jpg
tags:
  - Passkey
  - WebAuthn
  - FIDO
  - FIDO2
  - 認証
  - Authentication
translationOf: /2023/12/passkey-mythbusting.html
translated: 2026-10-03
translatedManually: false
---
2023 was indisputably the "Year of the Passkey." An immense number of services added support for passkeys, and 2024 looks set to finally be the year passkeys achieve widespread adoption.

In this article, after reviewing the basics of passkeys, I will address some common misconceptions people often have about them.

<!-- excerpt -->

In 2023, a truly massive number of websites rolled out passkey support. Here are just a few examples:

- Adobe
- Amazon
- Apple
- eBay
- GitHub
- Google
- KDDI
- Mercari
- Mixi
- MoneyForward
- Nintendo
- NTT Docomo
- PayPal
- Shopify
- Toyota
- Uber
- Yahoo! JAPAN

Of course, this list is far from exhaustive, but these services alone cover a significant portion of the global population, marking a true leap forward. If you haven't experienced passkeys yet, I highly recommend giving them a try.

That said, at this stage, the number of users actually using them does not match that covered population. From a developer's perspective, there is still plenty of room for improvement in both the user experience and implementation, and my sense is that it will take at least two to three years before the technology truly matures. I am writing this article in hopes that as many people as possible can gain a more accurate understanding of passkeys.

I would love to see passkeys create a world where signing in is no longer a barrier to using modern technology, allowing people like my own mother to use website and app features easily and securely without having to consult someone tech-savvy.

## The Basics of Passkeys

First, let's review the basics of passkeys. I created a short video summarizing passkeys, so please check it out. It's in English, but translated subtitles are also available.

{% YouTube '2xdV-xut7EQ' %}

In short, a passkey is **a mechanism that allows the owner of a device to sign in to websites and apps using keys stored on that device**.

* Multiple passkeys can be created for each site or app
* Creating a passkey or signing in requires local device authentication, such as unlocking the device
* Passkeys are stored in password managers and can be synced across devices
* Because the use of a password manager is enforced, users are far less susceptible to phishing scams
* What is stored on the RP (Relying Party) server is a public key, so the chances of sign-in credentials being stolen from there are vanishingly small

I've covered more detailed explanations twice on this blog, so feel free to check those out as well:

- [パスワードの不要な世界はいかにして実現されるのか - FIDO2 と WebAuthn の基本を知る](https://blog.agektmr.com/2019/03/fido-webauthn) (2019)
- [パスキーとは何か、そしてその課題](https://blog.agektmr.com/2022/12/passkey) (2022)

## Dispelling Misconceptions About Passkeys

With the basics in mind, let's debunk some common misconceptions about passkeys circulating out there.

{% Aside %}

* December 19, 2023: Added Misconceptions 10 to 13.
* December 21, 2023: Revised Misconceptions 10 and 11 for clarity.

{% endAside %}

### Misconception 1: If you use a password manager, it's safe enough, so there's no point in using passkeys

In a sense, this isn't wrong. Part of the value of passkeys lies in enforcing the use of password managers.

Indeed, even if you continue using passwords, as long as you use a password manager, it will automatically generate complex passwords, eliminate the need to memorize them, and autofill them only on the correct domain, making the chances of falling for phishing very low. If someone uses one properly, they might not strictly need passkeys.

The issue is how to protect people who lack the literacy to use a password manager or don't know how to use one. Environments where people can opt to use a password manager have existed for years, yet password leaks and account takeovers haven't declined—precisely because their mere existence doesn't solve the problem.

From the perspective of websites and apps, they'd prefer not to spend support costs on users who forget passwords or have their two-factor authentication stolen via phishing, but they cannot force users to adopt password managers. Passkeys make that possible.

[KDDI reported that introducing passkeys reduced authentication-related inquiries by 30%](https://k-tai.watch.impress.co.jp/docs/news/1553203.html#:~:text=kddi%E3%81%A6%E3%82%99%E3%81%AF%E3%80%81au%20id%E3%81%AEfido%E7%99%BB%E9%8C%B2%E3%81%AF1000%E4%B8%87%E3%82%92%E8%B6%85%E3%81%88%E3%81%A6%E3%81%8A%E3%82%8A%E3%80%81%E3%83%AD%E3%82%AF%E3%82%99%E3%82%A4%E3%83%B3%E9%96%A2%E9%80%A3%E3%81%AE%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%82%84%E9%96%A2%E9%80%A3%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%AB%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC%E5%85%A5%E9%9B%BB%E6%95%B0%E3%81%8B%E3%82%993%E5%89%B2%E6%B8%9B%E5%B0%91%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B).

### Misconception 2: If you lose your device, will your passkeys become unusable?

Synced passkeys can be recovered even if you lose your device.

In most cases, passkeys can be backed up to the password manager's servers, so losing a device doesn't immediately lock you out forever. As long as you can sign in to the same password manager account on another (or new) device, you can restore your passkeys. For example, if you lose an Android device, as long as you can sign in to your Google Account, you can restore your saved passkeys from another device.

To explain how syncing works in a bit more detail: when using Google Password Manager on Android, for instance, saved passkeys are encrypted using that device's PIN or pattern before being backed up to Google's servers. When migrating to a new device, you first sign in to your Google Account, and then enter the PIN or pattern from your old device to sync and decrypt your passkeys, making them available for sign-in. Apple devices follow a similar approach.

If you lose a device and suspect it may have fallen into malicious hands, performing a remote wipe on the device might give you peace of mind.

### Misconception 3: "Can't an account still be stolen with passkeys if you do X?"

People often brainstorm reasons why passkeys might be vulnerable and suggest all sorts of scenarios. Of course, problems that need to be and can be solved are being actively discussed. However, when it comes to retorts like "What if the device is stolen?" or "What if someone cuts off your finger to authenticate?", the response is usually: "Passkeys are not designed to prevent physical crimes." Rejecting passkeys on these grounds is a bit reckless.

Think about it:

Which is better: continuing to use passwords, which can be endlessly subjected to unknown attacks from remote locations—such as server breaches, phishing attacks, and credential stuffing—or passkeys, which cannot be attacked unless someone physically has the device in hand?

Which is better: passwords with two-factor authentication, where requiring a one-time password sent via SMS or email degrades the sign-in experience while still leaving users vulnerable to remote phishing, or passkeys, where simply unlocking your device signs you in exclusively to the legitimate domain?

Even if they aren't flawless, the number of users protected by passkeys is overwhelmingly greater.

### Misconception 4: I don't want to use passkeys because it means relying entirely on Big Tech for my critical authentication

Passkeys can be stored, synced, and used in third-party password managers, not just the default password managers provided by OS vendors.

By default, passkeys are stored in iCloud Keychain on Apple devices and in Google Password Manager on Android. Fortunately, depending on the OS version, both Apple and Google provide ways for users to save and use passkeys in third-party password managers. Password managers like 1Password and Dashlane have already implemented passkey support and are fully usable, so you can choose those if needed.

(Microsoft does not yet support passkey syncing, so it is unclear whether they will enable third-party password managers.)

By the way, there are concerns that if your Google or Apple account gets banned, your passkeys will become unusable too. However, in most cases, passkeys are synced locally, so I suspect you should still be able to continue signing in with them (needs verification).

### Misconception 5: If your password manager account is hijacked, all your passkeys are compromised as well

This isn't wrong. However, it's worth understanding the details a bit better.

The concern that if the password manager account used to sync passkeys is hijacked, all stored passkeys will be stolen too—and therefore it's dangerous—is a reasonable one.

The chance of a Google Account being hijacked isn't zero, and the same goes for iCloud accounts. Even for third-party password managers like 1Password or Dashlane, one should never say "never."

As mentioned earlier, Google Password Manager (and likely iCloud Keychain as well) encrypts passkeys using the device's PIN or pattern before backing them up. Other password managers likely have their own similar mechanisms. Therefore, even if those accounts are compromised, it does not immediately mean the passkeys are leaked as well. It's a good idea to check how your specific password manager is implemented, just in case.

You might think: wouldn't not syncing passkeys solve the problem? That's true, but it comes with its own issues. For example, when moving to a new device, you would need to recreate a new passkey on that device for every site where you previously made one. But to associate it with your account, you must authenticate first. How do you authenticate without using a passkey?

What you have to be careful about is that unless you can sign in with an authentication method of equal or greater strength than a passkey, that alternative method becomes a vulnerability.

Furthermore, if you had created, say, 100 passkeys, you would have to repeat non-passkey authentication and new passkey registration 100 times. Anyone who has ever broken a security key probably knows how excruciating that process is.

In that sense, syncing passkeys strikes me as an exquisite solution that maintains a solid level of security without degrading the user experience.

Additionally, a specification called [Supplemental Public Key](https://w3c.github.io/webauthn/#sctn-supplemental-public-keys-extension) was created to get the best of both worlds: passkey syncing and device binding. This is a more generalized approach conceived to replace the [Device Public Key](/2022/12/passkey#dpk) introduced in my earlier post. As implementation of this feature progresses in the future, even higher-security passkeys will become possible.

### Misconception 6: Are passkeys safer than passwords because they use biometrics?

Quite a few people associate passkeys with biometric authentication based on their appearance. This is one of the misconceptions that arises from that.

The idea that passkeys are more secure because they use complex biometric data with higher entropy compared to passwords, which at most consist of several dozen characters, is incorrect. The role of biometrics in passkey authentication is simply a trigger to issue a public-key cryptographic signature.

Passkeys are based on public-key cryptography and are created by storing a public key on the RP (Relying Party) server and a private key in the password manager. By the way, in this context, the passkey refers to this private key and its metadata.

![](/images/2023/security-keys.jpg)

When performing two-factor authentication with a U2F-compliant security key, touching the metal contact on its surface serves as the trigger. Requiring physical touch imposes a constraint that prevents remote spoofing via software. It's the same reason why some two-factor authentication on smartphones requires pressing a volume button rather than tapping the screen: because the button is wired to the device's security chip, it can prove a physical press.

Thus, while U2F verified that "someone is there" as the second factor, FIDO2 (passkeys) uses on-device biometrics to verify that it is indeed the intended person—that is, the owner of the device. This is the true meaning behind biometrics here. That is also why authentication works even without biometrics, as long as you know a way to unlock the device, such as a PIN, passcode, or pattern. As I described in [a previous blog post](/2019/03/fido-webauthn#user-verification-%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B), [this is called User Verification](/2019/03/fido-webauthn#user-verification-%E3%81%A8%E3%81%AF%E4%BD%95%E3%81%8B), and when combined with proof of device possession, it forms two-factor authentication in a single step.

Incidentally, on Android and iPhone, biometric data is stored in secure hardware like the Secure Enclave, making it impossible to extract or send across a network.

{% Aside %}

**Updated Dec 26, 2024:** As time has passed since passkeys were introduced, perspectives on whether a passkey alone qualifies as two-factor authentication have shifted. With FIDO2 authentication (authentication using WebAuthn prior to passkeys), credentials were saved in the device's secure chip and local authentication reliably utilized the device's built-in capabilities, making it undeniably two-factor authentication. However, with passkeys, the destination for storing credentials is a password manager of the user's choosing, and local authentication is determined by that password manager, making it hard to know how trustworthy the proof of local authentication is. Some password managers, like 1Password, return the UV flag as `true` even when local authentication is skipped.

Taking this into account, I have come to the conclusion that passkeys are not two-factor authentication. That said, I don't believe that not being two-factor authentication makes them weak. Rather, I understand it as passkeys putting an end to the era where security strength is measured by whether something is two-factor authentication or not. For more details on this topic, I recommend reading [Koiwai-san's article](https://sizu.me/kkoiwai/posts/vrbdbodcbsub) and [Yuriy Ackermann's article](https://herrjemand.medium.com/are-passkeys-mfa-f2720c983d5e).

{% endAside %}

### Misconception 7: Passkeys can sync across all devices

Passkeys aim for a world where they sync across various devices. However, for technical reasons, not all passkeys can sync just yet, and the original phrasing was "sync within each ecosystem (platform)." The actual conditions for syncing are as follows:

#### Safari

Apple operates an ecosystem where Safari and supported apps run almost exclusively on Apple devices. As a result, whether on macOS, iOS, or iPadOS, created passkeys are saved and synced to iCloud Keychain by default and can be used on other Apple devices, making things very straightforward. The same applies to iOS apps and the like.

#### Chrome

Chrome runs across multiple platforms, including macOS, iOS, iPadOS, Windows, Android, and Linux.

Passkeys created on Apple devices, including macOS, are fundamentally saved to iCloud Keychain, syncing in much the same way as Safari.

Passkeys saved on Android are stored in Google Password Manager by default, syncing between Android devices, with support for ChromeOS coming soon.

On Windows, Chrome relies on Microsoft's Windows Hello, but unfortunately, Windows Hello passkeys do not sync yet.

As such, Chrome's sync support currently depends on the operating system it is running on. This is [summarized in Google's documentation](https://developers.google.com/identity/passkeys/supported-environments).

#### Firefox

In Firefox, which uses Gecko—the other of the three major browser engines—passkeys are not yet officially supported, so it remains to be seen how passkeys will sync, but [it looks like this will be realized in early 2024](https://x.com/agektmr/status/1736222571937558900).

#### Third-Party Password Managers

Third-party password managers, on the other hand, often work across platforms, making syncing extremely flexible. In most cases, you can expect synchronization across all environments.

#### Passkey Authentication Using QR Codes

Even in an environment where passkeys aren't synced and readily available, you can still sign in using a passkey from another device by scanning a QR code.

{% YouTube '8D84Yosw-Ws' %}

If you create a new passkey on that device afterward, you'll be able to sign in using that passkey directly from then on.

### Misconception 8: Does "passkey" mean a synced FIDO credential?

There is some confusion regarding the definition of a passkey, but personally, I call discoverable credentials passkeys.

Initially, the FIDO Alliance officially defined "passkeys" as synced FIDO credentials, or in other words, [discoverable FIDO credentials](/2019/03/fido-webauthn#resident-key) (a discoverable credential is a passkey where the username is stored, which also triggers syncing on Android). However, this was later rewritten to [all FIDO credentials](https://fidoalliance.org/passkeys/#faq). Since then, they distinguish between synced passkeys and device-bound passkeys.

### Misconception 9: Once passkeys are implemented, are passwords completely unnecessary?

Because passkeys allow passwordless authentication and sync across devices, ideally site operators should eliminate passwords as soon as possible after implementing passkeys. Leaving them in place leaves a potential attack vector open. However, eliminating passwords requires considering many factors.

For instance, you can't guarantee that a user will never accidentally delete their only passkey. If that happens, how to recover the account must be carefully considered.

Even without passwords, several methods can be considered—such as sending a one-time password via SMS, sending a sign-in magic link via email, or having the user contact support by phone. This process is called account recovery.

As you may have already realized, no matter how much passkeys improve security, if account recovery is vulnerable to attackers, the benefit of introducing passkeys is cut in half.

Alongside implementing passkeys, please be sure to consider raising the baseline security of your entire authentication flow.

### Misconception 10: You can only create one passkey

How a created passkey is associated with a website or app is an easily misunderstood topic.

The idea that there is only one passkey, and once registered, that same passkey is used across all websites and applications, is a misconception.

A passkey (public-key pair) is created separately for each website or app account.

The belief that, just like passwords, you can only create one passkey per website or app account is also a misconception.

You can create as many passkeys as you want for a single account. Therefore, creating multiple passkeys—such as one for Android, one for Windows, one for iCloud Keychain, and one for 1Password—lets you set up an environment where you can sign in instantly from anywhere. And if an accident leaves you unable to access one, you can use the others as backups.

However, for the same combination of account, website, and app, most password managers can only store one passkey. Since there is no benefit to creating multiple passkeys in the same password manager, attempting to do so will usually return an error.

### Misconception 11: If you lose access to the Google Account or iCloud account used for syncing, passkeys will become unusable

As mentioned in Misconception 4, in most cases passkeys are synced locally, so even if you lose access to the password manager account, you should still be able to sign in as long as the passkeys remain locally. This is especially true for Google Accounts and iCloud accounts, where they should fundamentally remain on the device (though I've never had an account banned, so this needs verification).

If you actually encounter such a scenario and your passkeys only remain locally, I recommend creating new passkeys in another password manager.

### Misconception 12: Passkeys can only be used on smartphones

There seem to be more people than expected who assume passkeys are strictly for smartphones, but this is a misconception.

Passkeys are supported on desktops and laptops as well. Many devices might not support biometric authentication, but in that case, you can perform local authentication for passkey sign-in by entering a PIN on Windows or the system password on macOS.

As mentioned earlier, if you only have a passkey on your smartphone, you can authenticate using a QR code. But if you create a new passkey on your desktop environment after that, you won't need to scan a QR code every time going forward—you can sign in directly within the computer environment alone.

### Misconception 13: Once you create a passkey, you won't be able to use other authentication methods

Among the services I've seen so far, none have completely eliminated all other authentication methods in exchange for enabling passkeys.

Therefore, there's no need to worry about being locked out just by creating a passkey. In most cases, your existing sign-in methods should continue to work. Why not give it a try?

## Summary

I hope this article helps clear up any questions you had about passkeys. If you have questions about anything not covered here, feel free to let me know on [@agektmr](https://twitter.com/agektmr). I might add updates to this post.

Finally, for those who want to stay up to date on passkeys, here are a few resources:

### Google Resources

- [**Google の開発者向けパスキー公式ドキュメント**](https://goo.gle/passkeys): Covers passkey overviews, UX guides, case studies, and common passkey-related information for both Android app and web developers. (Machine-translated Japanese is available, but when viewing in Japanese, there is a bug where the left navigation is not up to date. Please temporarily switch to English to see the complete picture.)
- [**ウェブ開発者向けパスキー公式ドキュメント**](https://goo.gle/passkeys-web): Features passkey-related information for web developers.
- [**Android 開発者向けパスキー公式ドキュメント**](https://developer.android.com/training/sign-in/passkeys): Features passkey-related information for Android developers. As all Android app authentication is transitioning to a library called Credential Manager going forward, this is part of its documentation.
- [**パスキー開発者向けニュースレター**](https://groups.google.com/g/google-passkeys-developer-newsletter/) (English): Provides email updates whenever there are updates to Google's passkey implementation.

### FIDO Alliance Resources

- [**FIDO Alliance ホームページ**](https://fidoalliance.org/?lang=ja)
- [**FIDO Alliance 公式 UX ガイド**](https://fidoalliance.org/ux-guidelines/) (English)
- [**関連コミュニティによるパスキードキュメント**](https://passkeys.dev/) (English)

Photo by <a href="https://unsplash.com/@tierramallorca?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tierra Mallorca</a> on <a href="https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
