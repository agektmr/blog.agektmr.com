---
layout: post
lang: en
title: What is a passkey and its challenges?
description: We will explain the basic features of passkeys and the issues that may arise as of 2022.
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
translated: 2025-11-30
translatedManually: false
---
Passkeys are a new authentication method that is resistant to phishing and easy to use even for non-tech-savvy users, and are said to eventually replace passwords. In this article, we'll summarize the basics of passkeys and what they mean for the future of the web.

<!-- excerpt -->

## What is a passkey?

On December 9, 2022, Google announced that Chrome for Android now supports passkeys. Apple has also already added support for passkeys in Safari on the latest versions of macOS Ventura and iOS/iPadOS 16.

Passkey is the name of the [FIDO credential](/2019/03/fido-webauthn.html) jointly used by Apple, Google, and Microsoft. The brand and icon "Passkey" were decided upon to allow end users to recognize it as a password-less, intuitive way to log in. From a web developer perspective, it can be safely considered an extension of [WebAuthn (Web Authentication)](https://w3c.github.io/webauthn), defined by the [FIDO Alliance](https://fidoalliance.org/) and W3C. In this article, "Passkey" is replaced with "FIDO credential." I previously wrote an article about FIDO and WebAuthn, so if you haven't already, I recommend you read it.

At first glance, a passkey is a biometric login experience, but if you're a techie, it's worth knowing what's going on behind the scenes.

### User Experience {#user-experience}

Before users can log in with a passkey, they must create one for each site.

When you try to create or register a passkey, a biometric authentication dialog box will pop up and you will be asked to perform [local authentication](#luv). Once authentication is complete, a new passkey will be created.

{% YouTube 'lZXGXxZIMTU' %}

When you log in, an account selector will be displayed. Select the account you want to use and tap to perform local authentication and complete the login process.

{% YouTube '6GMDhF1eQOQ' %}

The passkey is synchronized, so it can be used on other devices. If the environment does not allow passkey synchronization, you can log in across devices.

When logging in, the browser will display a menu like "Log in on another device." Tap this to display a QR code. Scanning it with your smartphone will perform local authentication, and once complete, you will automatically be logged in on your desktop.

{% YouTube '8D84Yosw-Ws' %}

Chrome will remember your device, so you can tap the device name to specify it without having to scan the QR code the second time. Of course, if you create a new passkey on your desktop after that, you'll be able to log in even without your smartphone.

You can try it out for yourself by watching the demo here.

## Why passkeys are better than passwords

### Passkeys are phishing resistant {:#phishing}

The domain of the site where the passkey was created is stored as metadata along with the credentials. Therefore, authentication cannot be performed unless the domain matches. This makes phishing virtually impossible, and also has the benefit of freeing users from having to worry about URLs.

### Passkey authentication is done locally {#luv}

Local authentication with a passkey is resistant to remote attacks.

When you create a passkey or log in with it, you authenticate using the same method you use to unlock your device's screen lock: fingerprint, facial recognition, or a PIN or pattern on Android; Touch ID, Face ID, or a passcode on iOS/iPadOS; Touch ID or a password on macOS; and Windows Hello or a PIN on Windows. This authentication occurs on the user's device, rather than sending credentials directly to the network, and is called "local authentication."

When you create a passkey, local authentication triggers the creation of a new public key pair, with the private key stored on the device and the public key stored on the server. The passkey essentially refers to this private key and its metadata. The passkey is then synchronized and can be used on other devices.

With a password, remote authentication is performed by sending the string entered by the user to the server, but with a passkey login, local authentication is triggered to generate a signature, which is then sent to the server. The server then verifies the signature using the public key stored when the passkey was created, and authenticates it.

Have you noticed that authentication is performed twice in total: local authentication and signature verification on the server? In other words, the passkey alone performs two-factor authentication: biometric authentication (or knowledge authentication) and possession authentication. This is because, unlike a password, a passkey is strong on its own, is difficult to leak, and cannot be reused.

{% Aside %}

**Updated 12/26/2024:** Over time, opinions have shifted regarding whether a passkey alone constitutes two-factor authentication. With FIDO2 authentication (authentication using WebAuthn, which predates passkeys), credentials were stored on a secure chip on the device, and local authentication reliably used the device's built-in features, making it undoubtedly two-factor authentication. However, with passkeys, credentials are stored in a password manager of the user's choosing, and local authentication is also specified by the password manager, making it unclear how reliable the local authentication certificate is. Some password managers, like 1Password, return the UV flag with `true` even when skipping local authentication.

Taking all of this into consideration, I have come to the conclusion that passkeys are not two-factor authentication. However, I don't think that just because they aren't two-factor authentication makes them weak. Rather, I understand that thanks to passkeys, the era of measuring strength based on whether or not it is two-factor authentication is over. For more details on this, I recommend reading [Koiwai's article](https://sizu.me/kkoiwai/posts/vrbdbodcbsub) and [Yuriy Ackermann's article](https://herrjemand.medium.com/are-passkeys-mfa-f2720c983d5e).

{% endAside %}

### Passkeys can be synchronized across devices {#synchronization}

The greatest feature of Passkey is that it can be synchronized across devices.

With traditional FIDO, credentials created on one device could only be used on that same device. This meant that remote attacks were impossible, meaning that an attacker had no power unless they had physical access to the target device. However, this posed problems [in terms of both usability and security](#security) when migrating to a new device. Passkey synchronization completely solves these problems.

However, passkey synchronization is limited to within the same ecosystem. "Same ecosystem" refers to the password managers and other mechanisms of each platform, such as those of Google, Apple, and Microsoft. For example, passkeys are synchronized via iCloud Keychain for Apple and Google Password Manager for Google (it is unclear whether Microsoft will officially support passkeys as of December 2022).

Because Apple is vertically integrated, Safari won't work on devices other than Apple devices, and all syncing is primarily based on your Apple ID via iCloud Keychain. Google Chrome syncs between Android devices using Google Password Manager based on your Google Account, but passkeys aren't synced on other operating systems. Google has stated that it plans to sync passkeys using Apple and Microsoft's ecosystems once their sync APIs are available.

{% Aside %}

Android has also stated that it will support third-party password managers syncing passkeys in the future, so password managers that have announced passkey support, such as 1Password, may become available on Android.

{% endAside %}

### Account selector can be used {#account-selector}

Although technically this feature has been available in Safari and desktop Chrome for some time, Android's support for it has made the account selector feature a prime example of passkey usage. In WebAuthn, this is called Discoverable Credentials (formerly [Resident Key](/2019/03/fido-webauthn.html#resident-key)), and it stores user information as metadata in the passkey, enabling the account selector UI. Users can log in simply by tapping to select an account and using local authentication, without having to type their username. This significantly improves usability for users who often forget their usernames, let alone their passwords.

### Sign in with a smartphone {#sign-in-with-a-phone}

This is the feature that allows you to log in using your smartphone, which was explained in the user experience section.

Google Accounts have long had the ability to register your smartphone as a security key for two-factor authentication. This feature is FIDO-compliant and has been expanded to include more than just Google Accounts. This is the feature that lets you log in from another browser via a QR code. It was previously called caBLE, but has now been renamed hybrid.

Because Hybrid was originally intended as a standard, a similar feature was implemented in Safari at the same time as Passkey, allowing you to log in to Safari on macOS using your Android device, and to log in to Chrome on Windows using your iPhone.

{% Aside %}

Google's two-factor authentication has a similar feature, [send a push notification to allow login](https://support.google.com/accounts/answer/6361026?hl=ja), but it's its own unique mechanism.

{% endAside %}

## Passkey Considerations

### Privacy

When a website suddenly requires biometric authentication, I think many end users wonder where their fingerprint or facial information goes. Especially as passkeys become more common and users are still getting used to them, it's only natural to feel fear that fingerprint or facial information might be collected and monitored, or that it could fall into the wrong hands if the service is hacked and leaked.

FIDO has a rule that biometric information must be stored on the authenticator device and must not be sent to a server, etc., so you can rest assured that this rule will be observed at least as long as you use a FIDO Certified authenticator (this includes Android. iPhones are probably included as well, but I couldn't find the source).

Additionally, the information used to create a passkey and passed to the service is a public key and a credential ID, both of which are meaningless byte sequences issued per site. The credential ID is used to limit the authenticators that can be used during authentication and to search for a public key that matches the signature authenticated by the server. The public key is used to verify the signature sent during authentication. Therefore, unless the passkey is registered in combination with personal information such as the user's email address or name, it is not possible to track users across sites using the passkey.

Passkeys may be an authentication method that poses a high psychological hurdle for end users, especially in the early stages, so I think service providers need to provide reassuring measures that address this.

### Is passkey synchronization the right thing to do? {#security}

FIDO is based on possession authentication using public key cryptography. The key point is that it is difficult to break the authentication unless you have physical access to the authenticator. However, passkeys can be synchronized and used on multiple devices. This has raised concerns that this could deviate from AAL3 (Authenticator Assurance Level 3) defined in [NIST SP800-63B](https://pages.nist.gov/800-63-3-Implementation-Resources/63B/AAL/).

However, if we only accept credentials that are tightly bound to the device, when migrating to a new device:

* You must transfer all accounts for which you have created credentials.
* You must log in to your new device using a non-FIDO method that is vulnerable to phishing.

There are problems such as:

Leaving aside the question of continuing to use passwords, the question is whether to choose traditional FIDO credentials, which are inconvenient and leave authentication methods vulnerable to phishing, or passkeys, which are more convenient but pose slightly increased risks. I think it's best to choose based on your needs.

For example, for consumer services such as social media or news apps, the economic damage would not be so great even if an account were to be hijacked, so it would be wise to choose the convenience of a passkey.

On the other hand, enterprises that handle confidential information, or banks and wallet apps that handle money, may want to keep their devices linked to their devices even if it is slightly less convenient, as there is a possibility of significant economic damage.

In Chrome, if you enable Discoverable Credentials and create a passkey, it will be synced, but if you disable it and create a passkey, it will not be synced as a traditional FIDO credential. In Safari, all credentials are synced as passkeys, which may make it difficult to use in enterprises (perhaps the solution is to use a security key for two-factor authentication).

### Device Public Key {#dpk}

Another option proposed is the [Device Public Key Extension](https://w3c.github.io/webauthn/#sctn-device-publickey-extension), which combines the advantages of a passkey and a device-bound FIDO credential. This creates another device-specific public key pair along with the passkey, allowing the server to detect whether the passkey is already registered on the device. It is expected that this will combine the advantages of both the ease of use of a passkey and the advantages of a device-bound FIDO credential.

However, while Device Public Key is currently planned for implementation on Android, there has been no announcement yet as to whether it will be available on Apple devices. We will be keeping an eye on future developments, including Microsoft's actions.

## summary

With the introduction of Passkey, FIDO has finally entered the practical stage. In addition to the issues mentioned above, there are still issues remaining, such as [Firefox not supporting it](https://bugzilla.mozilla.org/show_bug.cgi?id=1530370) and the need for further improvement in the synchronization environment, but these are likely to be resolved with time. Some services, such as [PayPal](https://newsroom.paypal-corp.com/2022-10-24-PayPal-Introduces-More-Secure-Payments-with-Passkeys) and [Yahoo! JAPAN](https://support.yahoo-net.jp/SccLogin/s/article/H000004626), have already deployed it in practice.

Here are some resources:

* Official Google documentation: [Passwordless login with passkeys](https://goo.gle/passkeys)
* Official Apple documentation: [Authenticating a User Through a Web Service](https://developer.apple.com/documentation/authenticationservices/authenticating_a_user_through_a_web_service)
* [Create a passkey for passwordless logins](https://web.dev/passkey-registration/)
* [Sign in with a passkey through form autofill](https://web.dev/passkey-form-autofill/)

We expect the implementation of Passkey to accelerate even further in 2023.

## DevFest & Android Dev Summit Japan 2022 will be held

Finally, a little promotion: [DevFest & Android Dev Summit Japan 2022](https://developersonair.withgoogle.com/events/adsjapan_2022) will be held at the Google office this Friday, December 16th. In addition to web, there will be many sessions on Flutter, Firebase, and Android.

Just for the web section, we have an impressive lineup of speakers scheduled to speak, including Google Developers Experts Yoshiko and Yagura, Chrome team PM Kenji Baheux, Chrome Developer Relations team lead Paul Kinlan, and teammates Milica Mihajlija, Adriana Jara, and Jhey Tompkins. I'll also be talking about passkeys, the subject of this article.

If you have any in-depth questions about any of the sessions, please come and talk to us in person. Since it's a hybrid event, you can also watch the live stream by registering here. We look forward to seeing you there!

Photo by <a href="https://unsplash.com/@fess0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Filip Szalbot</a> on <a href="https://unsplash.com/s/photos/keys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
