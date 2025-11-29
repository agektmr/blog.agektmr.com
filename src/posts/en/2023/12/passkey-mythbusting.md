---
layout: post
lang: en
title: 'The basics of passkeys and clearing up misconceptions surrounding them'
description: 'We will review the basics of passkeys and explain some common misconceptions about passkeys.'
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
translated: 2025-11-29
translatedManually: false
---

2023 has undoubtedly become the "first year of passkeys." A huge number of services will support passkeys, and 2024 is likely to be the year passkeys finally become widespread.

In this article, we will review the basics of passkeys and explain some common misconceptions about passkeys.

<!-- excerpt -->

In 2023, many websites now support passkeys. For example:

-Adobe
- Amazon
-Apple
- eBay
- GitHub
-Google
- KDDI
- Mercari
- Mixi
- MoneyForward
- Nintendo
- NTT Docomo
-PayPal
- Shopify
- Toyota
-Uber
-Yahoo! JAPAN

Of course, this list is not exhaustive, but even just these should cover a large portion of the world's population, making it a huge leap forward. If you haven't tried Passkey yet, now is your chance to give it a try.

That said, at this stage, the number of actual users is not the same as the covered population, and even from a developer's perspective, there is still room for improvement in the user experience and implementation, and it feels like it will take at least two or three years for it to mature. First of all, I am writing this article in the hope that as many people as possible will gain more accurate knowledge of passkeys.

I would be delighted if Passkey could help create a world where logging in is no longer a barrier to using the latest technology, and where even someone like your mother can easily and securely use the functions of websites and apps without having to consult with an expert.

## Passkey Basics

First, let's review the basics of passkeys. I've created a short video summarizing passkeys, so please take a look. It's in English, but you can translate it and get Japanese subtitles.

{% YouTube '2xdV-xut7EQ' %}

Simply put, a passkey is a mechanism that allows device owners to log in to websites and apps using a key stored on the device.

* You can create multiple passkeys for each site and app.
* When creating a passkey or logging in, local device authentication such as unlocking is required.
* Passkeys are stored in a password manager and can be synchronized across devices.
* By forcing users to use a password manager, users are less likely to fall victim to phishing scams.
* Since only public keys are stored on the RP (Relying Party) server, the chances of account login information being stolen are extremely low.

If you'd like to go into more detail, I've covered this topic twice on this blog, so please take a look.

- [How to Achieve a Password-Free World - Understanding the Basics of FIDO2 and WebAuthn](https://blog.agektmr.com/2019/03/fido-webauthn) (2019)
- [What is a Passkey and the Challenges It Faces](https://blog.agektmr.com/2022/12/passkey) (2022)

## Clearing up misconceptions about passkeys

Now that we've covered the basics of passkeys, we'll clear up some common misconceptions about passkeys.

{% Aside %}

* December 19, 2023: Misconceptions 10 to 13 have been added.
* December 21, 2023: The content of Misconceptions 10 and 11 has been revised for clarity.

{% endAside %}

### Myth 1: Using a password manager is enough to keep me safe, so there's no point in using a passkey

This is true in a sense. The point of using a passkey is that it forces you to use a password manager.

It's true that even if you continue to use passwords, if you use a password manager, it will automatically generate complex passwords for you, you don't have to remember them, and it will enter them into the appropriate domain, so you're less likely to fall victim to phishing scams.If you use it properly, you may not need a passkey.

The problem is how to protect people who do not have the literacy to use password managers or who do not know how to use them. Password managers have been available for many years, but the number of password leaks and account hijackings has not decreased because the existence of such managers alone does not solve the problem.

While websites and apps don't want to incur support costs for users who forget their passwords or have their two-factor authentication stolen through phishing, they can't force users to use a password manager. That's what Passkey does.

KDDI reports that the introduction of passkeys has reduced authentication inquiries by 30%.

### Myth 2: If I lose my device, will my passkey become useless?

Your synced passkey can be recovered even if you lose your device.

In many cases, your passkey can be backed up to the password manager's server, so if you lose your device, you won't immediately be unable to log in again. If you can log in to the same password manager account on another (or new) device, you can restore your passkey. For example, if you lose your Android device, you can recover your saved passkey from another device as long as you can log in to your Google Account.

To explain how synchronization works in more detail, for example, if you use Google Password Manager on Android, the saved passkey is encrypted using the device's PIN or pattern and backed up to Google's servers. When transferring to a new device, you first log in to your Google account, then enter the PIN or pattern from your old device to sync and decrypt the passkey and use it to log in. It's similar on Apple devices.

If you lose your device and think it has fallen into the wrong hands, you may find it more reassuring to remotely wipe the entire device.

### Misconception 3: If I use a passkey, can someone steal my account?

Everyone has been thinking about why passkeys are vulnerable and coming up with various ideas. Of course, there is discussion about the problems that need to be solved and the problems that can be solved, but when people ask questions like, "What if your device is stolen?" or "What if someone cuts off your finger and authenticates you?", the answer is often, "Passkeys don't prevent physical crimes." It's a bit harsh to say that passkeys shouldn't be used for these reasons.

Think about it.

Which is better: continuing to use a password that is subject to endless, unknown remote attacks such as server leaks, phishing attacks, and list attacks, or a passkey that can only be attacked if the device is in your possession?

Which is better: two-factor authentication, which requires a one-time password received via SMS or email, resulting in a worse login experience in exchange for security and leaving users vulnerable to remote phishing attempts, or a passkey that can only be used to log in to legitimate domains by unlocking the device?

Although it's not perfect, the number of users protected by a passkey seems to be overwhelmingly large.

### Myth 4: I don't want to use a passkey because it would make me completely dependent on Big Tech for my valuable authentication.

Passkeys can be stored, synced, and used in a third-party password manager other than the default password manager provided by your OS vendor.

By default, passkeys are stored in iCloud Keychain on Apple devices and Google Password Manager on Android devices. Fortunately, both Apple and Google offer a way for users to store and use passkeys in a third-party password manager, depending on the OS version. 1Password and Dashlane already support passkeys, so you can choose to use them if you need them.

(Microsoft doesn't yet support passkey syncing, so it's unclear whether it will enable third-party password managers.)

By the way, there is talk that if your Google or Apple account is banned, your passkey will also become unusable, but in many cases, the passkey is synced locally, so I think you can continue to log in using it (please check).

### Myth 5: If my password manager account is compromised, all my passkeys are compromised too

This is not wrong, but it's worth understanding a few more details.

It's a legitimate concern that if a password manager account that syncs passkeys is compromised, all of the stored passkeys could be stolen, making it dangerous.

Your Google account can be compromised, and so can your iCloud account. I don't think "never" should be used to describe third-party password managers like 1Password or Dashlane.

As mentioned above, Google Password Manager (and probably iCloud Keychain as well) encrypts and backs up your passkey using the device's PIN or pattern. Other password managers likely have their own similar mechanisms. Therefore, even if your account is stolen, it doesn't necessarily mean that your passkey will be leaked at the same time. It might be a good idea to check how the password manager you're using is designed just to be safe.

You might think that if you don't sync your passkey, the problem is solved. That's true, but that also has its own problems. For example, if you switch to a new device, you'll need to create a new passkey for each site where you created a passkey on that device. However, you won't be able to link it to your account unless you authenticate once before that. So how can you authenticate without using a passkey?

What you need to be careful about is that if you cannot log in using an authentication method that is equivalent to or more powerful than a passkey, that will create a hole.

Also, if you create 100 passkeys, you will have to authenticate using a method other than the passkey and register a new passkey 100 times. Anyone who has ever broken a security key will know how painful this is.

In that sense, I think that synchronizing passkeys is an excellent solution that can maintain a certain level of security without degrading the user experience.

In addition, a new specification called [Supplemental Public Key](https://w3c.github.io/webauthn/#sctn-supplemental-public-keys-extension) has been created that combines the best of both passkey synchronization and device binding. This is a general-purpose alternative to the [Device Public Key](/2022/12/passkey#dpk) introduced in a previous article, but as this feature is implemented further in the future, it will be possible to create passkeys with even higher security.

### Misconception 6: Is a passkey more secure than a password because it uses biometric information?

Many people associate passkeys with biometric authentication based on their appearance, and this is one of the misconceptions that arises from this.

The idea that passkeys are more secure and have higher entropy than passwords, which are typically only a few dozen characters, is that they use complex biometric information, but this is incorrect. The role of biometric authentication in passkey authentication is to trigger the issuance of a public key cryptographic signature.

The passkey is based on public key cryptography, and is created by storing the public key on the RP (Relying Party) server and the private key in a password manager. The passkey here refers to this private key and its metadata.

![](/images/2023/security-keys.jpg)

When using a U2F-compatible security key for two-factor authentication, touching the metal chip on the surface is the trigger. This is because the requirement for physical contact prevents remote software spoofing. The same is true for two-factor authentication on some smartphones, where you must press the volume button instead of tapping the screen. Because the button is connected to the security chip inside the device, it can be proven that it was physically pressed.

While U2F relies on proving someone's presence as the second factor, FIDO2 (passkey) uses device biometrics to at least verify that the person is the device owner. This is why biometric authentication can be used without biometric authentication, as long as you know a method to unlock the device, such as a PIN, passcode, or pattern. This is called user verification, and as mentioned in a recent blog post, it can be combined with proof of device ownership to form two-factor authentication in one step.

By the way, on Android and iPhone, biometric information is stored in secure hardware such as the Secure Enclave, so the data cannot be extracted or sent over the network.

{% Aside %}

**Updated 12/26/2024:** Over time, opinions have shifted regarding whether a passkey alone constitutes two-factor authentication. With FIDO2 authentication (authentication using WebAuthn, which predates passkeys), credentials were stored on a secure chip on the device, and local authentication reliably used the device's built-in features, making it undoubtedly two-factor authentication. However, with passkeys, credentials are stored in a password manager of the user's choosing, and local authentication is also specified by the password manager, making it unclear how reliable the local authentication certificate is. Some password managers, like 1Password, return the UV flag with `true` even when skipping local authentication.

Taking all of this into consideration, I have come to the conclusion that passkeys are not two-factor authentication. However, I don't think that just because they aren't two-factor authentication makes them weak. Rather, I understand that thanks to passkeys, the era of measuring strength based on whether or not it is two-factor authentication is over. For more details on this, I recommend reading [Koiwai's article](https://sizu.me/kkoiwai/posts/vrbdbodcbsub) and [Yuriy Ackermann's article](https://herrjemand.medium.com/are-passkeys-mfa-f2720c983d5e).

{% endAside %}

### Myth 7: Your passkey syncs across all your devices

Passkey aims to create a world where it can be synchronized across various devices. However, due to technical reasons, not all Passkeys are yet capable of synchronization, and the original expression was "synchronize for each ecosystem (platform)." The actual synchronization conditions are as follows:

#### Safari

Apple's ecosystem is such that the Safari browser and almost all compatible apps run only on Apple devices, so whether you're using macOS, iOS, or iPadOS, the passkey you create is stored and synced to iCloud Keychain by default and can be used on other Apple devices, making it very simple. The same goes for iOS apps.

#### Chrome

Chrome works across multiple platforms, including macOS, iOS, iPadOS, Windows, Android, and Linux.

Passkeys created on Apple devices, including macOS, are primarily stored in iCloud Keychain, so they sync in much the same way as Safari.

Passkeys saved on Android are stored in Google Password Manager by default and sync across Android devices, with support for Chrome OS coming soon.

For Windows, we rely on a Microsoft mechanism called Windows Hello, but unfortunately the Windows Hello passkey is not yet synced.

As you can see, Chrome's sync support is currently dependent on the OS it's running on. This is documented by Google.

#### Firefox

Firefox, which uses Gecko, the other of the three major browser engines, doesn't officially support passkeys, so it's not yet clear how passkeys will be synced, but it looks like it could happen by early 2024.

#### Third-Party Password Managers

By the way, third-party password managers often have cross-platform compatibility, so synchronization is very flexible. In most cases, you can expect synchronization across all environments.

#### Passkey authentication using QR code

Even if your passkey is not synchronized and cannot be used, you can still log in using the passkey from another device by scanning the QR code.

{% YouTube '8D84Yosw-Ws' %}

If you create a new passkey after this, you will be able to use it to log in in that environment from the next time.

### Myth 8: Is a passkey a synced FIDO credential?

There is some confusion about the definition of a passkey, but I personally call any discoverable credential a passkey.

The FIDO Alliance initially defined "passkey" as a FIDO credential that synchronizes, or in other words, a discoverable FIDO credential. (A discoverable credential is a saved passkey for a username that also triggers synchronization on Android.) However, this was later rewritten as "all FIDO credentials." The Alliance also began to distinguish between a synchronized passkey and a device-bound passkey.

### Misconception 9: Will implementing a passkey completely eliminate the need for passwords?

Because passkeys allow authentication without a password and are synchronized, ideally site operators would eliminate passwords as soon as possible after implementing passkeys, as leaving them open to attacks remains a possibility. However, there are many other things to consider before eliminating passwords.

For example, there is no guarantee that a user will not delete their only passkey, and if that happens, you should carefully consider how to recover their account.

There are several ways to recover your account without using a password, such as sending a one-time password via SMS, sending a magic link via email, or having the user contact support by phone. This process is called account recovery.

As you may have already noticed, no matter how much security a passkey improves, if account recovery is easily targeted by attackers, the point of introducing a passkey is halved.

At the same time as implementing a passkey, please also consider improving your authentication functions as a whole.

### Misconception 10: You can only create one passkey

How the passkey you create connects to websites and apps is one of the most confusing topics.

It is a common misconception that there is only one passkey and that once registered, the same passkey will be used across all websites and applications.

A passkey (public key pair) is created for each website and app account.

It is a misconception that, like passwords, you can only create one passkey per website or app account.

You can create multiple passkeys for each account. So, by creating multiple passkeys, such as one for Android, one for Windows, one for iCloud Keychain, and one for 1Password, you can create an environment where you can log in quickly from anywhere, and if you accidentally lose access to one of them, you can use the others as backups.

However, most password managers only allow you to save one password for the same account, website, or app combination, so there's no benefit to having multiple passwords in the same password manager, and you'll usually get an error if you try.

### Myth 11: If I lose access to the Google or iCloud account I use for syncing, my passkey will become useless.

As mentioned in Misconception 4, in many cases, passkeys are synced locally, so even if you lose access to your password manager account, you should be able to log in as long as the passkey remains locally. This is especially true for Google accounts and iCloud accounts, which generally remain locally (although I've never actually had an account banned, so please check).

If you find yourself in this situation and your passkey remains only locally, we recommend creating a new one using another password manager.

### Misconception 12: Passkeys can only be used on smartphones

It seems that more people than you might think think that a passkey requires a smartphone, but this is a misunderstanding.

Passkey is also supported on desktops and laptops. Many devices don't support biometric authentication, but in those cases, you can use local authentication with a PIN (Windows) or a system password (macOS) to authenticate using the passkey.

I mentioned that if you only have a passkey on your smartphone, you can authenticate using a QR code, but if you then create a new passkey in your desktop environment, you will be able to log in using only your computer without having to scan the QR code every time.

### Misconception 13: Creating a passkey prevents other authentication methods from working

No service I've seen has ever removed all other authentication methods in favor of making a passkey available.

Therefore, there is no need to worry about creating a passkey and being locked out. In most cases, you should still be able to use the same login method as before. Why not give it a try?

## summary

I hope this article clarifies some of your questions about passkeys. If you have any questions that aren't answered here, please let me know at [@agektmr](https://twitter.com/agektmr) and I might add them to this article.

Finally, here are some resources for those who want to keep track of Passkey information:

### Google related

- [**Google's Official Passkey Developer Documentation**](https://goo.gle/passkeys): Contains an overview of passkeys, UX guides, case studies, and other passkey-related information for both Android app and web developers. (The Japanese text is machine-translated, but there's a bug where the left navigation isn't up to date when translated into Japanese. Please temporarily switch to English to get the full picture.)
- [**Google's Official Passkey Developer Documentation**](https://goo.gle/passkeys-web): Contains passkey-related information for web developers.
- [**Android Developer Documentation**](https://developer.android.com/training/sign-in/passkeys): Contains passkey-related information for Android developers. Going forward, all Android app authentication will be migrated to a library called Credential Manager, so this information is part of that documentation.
- [**Passkey Developer Newsletter**](https://groups.google.com/g/google-passkeys-developer-newsletter/): Receive email notifications of updates to Google-related passkey implementations.

### FIDO Alliance Related

- [FIDO Alliance Homepage](https://fidoalliance.org/?lang=ja)
- [FIDO Alliance Official UX Guide](https://fidoalliance.org/ux-guidelines/) (English)
- [Community-Driven Passkey Documentation](https://passkeys.dev/) (English)

Photo by <a href="https://unsplash.com/@tierramallorca?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Tierra Mallorca</a> on <a href="https://unsplash.com/photos/white-and-red-wooden-house-miniature-on-brown-table-rgJ1J8SDEAY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>