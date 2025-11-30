---
layout: post
lang: en
title: Tips for using your passkey
description: We will review the basics of passkeys and explain some common misconceptions about passkeys.
date: 2024-12-26
image:
  feature: /2024/passkeys-tips.jpg
tags:
  - Passkey
  - WebAuthn
  - FIDO
  - FIDO2
  - 認証
  - Authentication
translationOf: /2024/12/passkeys-tips.html
translated: 2025-11-30
translatedManually: false
---
Recently, I've seen a lot of people complaining about passkeys being difficult to use. I've also seen several posts from people who have trouble logging in to services they want to use because they can't find the passkeys they thought they had created.

So in this blog post, I would like to consider why this happens, how to avoid such situations, what measures users can take, and what service providers can do to reduce the number of users who feel this way.

<!-- excerpt -->

Of course, a basic premise is that features that require users to think hard to use are undesirable, as they will cause inconvenience rather than promote widespread adoption. However, while Passkey is maturing as a product from each company, it is still in the early stages of development as a total ecosystem, and it cannot be denied that there are some aspects that are difficult to use. Therefore, I am writing this article in the hope that by sharing some ingenuity, I can help ease the burden on everyone until the world becomes more user-friendly.

## Passkey Basics

First, I wrote about what Passkey is and what kind of world it aims to create in [What is Passkey and its Challenges?](https://blog.agektmr.com/2022/12/passkey). It's been two years since I wrote that article, but the fundamentals haven't changed much. However, during that time, operating systems, passkey providers (password managers), browsers, and services (Relying Parties or RPs) have all gradually evolved.

## What makes passkeys difficult to use?

From what I've observed, the main reasons people find passkeys difficult to use are as follows:
- I created a passkey, but I can't find it.
- I don't know what to do when my passkey doesn't work.

There are probably many other minor issues, but if these are resolved, the remaining problems will likely be minor.

## Passkey not found

"The service asked me to create a passkey, so I did, but it disappeared when I moved to another environment. I was told that the passkey would be synchronized, but I can't find it now."

This situation may occur for the following reasons:
1. The passkey provider where you saved your passkey cannot be accessed from the new environment.
2. The passkey provider is available, but you cannot access the account where you saved your passkey.
3. The passkey from the passkey provider is not synchronized in the first place.
4. The biometric authentication feature you thought was a passkey is not actually a passkey.
5. You cannot log in because the service does not offer any authentication methods other than passkeys.

### 1. The passkey provider that saved the passkey cannot be accessed from the new environment.

A passkey provider is a place where you can save and synchronize the passkeys you create, and in most cases, a "password manager" also serves this role. The default passkey provider where your passkeys are saved is determined by your environment. In most cases, the passkeys you create will be saved in the system's default passkey provider.

If you can't find your passkey, it may be due to an incompatibility between your devices. For example, a passkey created in Edge for Windows cannot be accessed from Edge for Android. This is because the passkey created in Edge for Windows is stored in Windows Hello, while Edge for Android only works with Google Password Manager.

The passkey provider support status for each environment is described below.

### 2. The passkey provider is available, but you can't access the account where the passkey is stored

Another possibility is that even if you use the same passkey provider, you can't find your passkey because you saved it in a different account. For example, if you create a passkey in Chrome, by default it's saved in the Google Password Manager linked to the [Google Account you're logged in to Chrome with](https://support.google.com/chrome/answer/185277?hl=ja). If you want to access the same passkey in a different environment, you'll need to access it in Chrome logged in with the same Google Account. If you use multiple Google accounts, you might want to check whether the account you're using to access the passkey is the same one you saved previously.

Android also has a feature called [Work Profile](https://support.google.com/work/android/answer/6191949?hl=ja) that completely separates apps and data for personal and work accounts within the same OS. I've personally experienced panicked situations where I couldn't find my passkey because of this feature. If you can't access your passkey, please check the following.

### 3. The passkey provider's passkey is not synchronized in the first place

In fact, there are cases where passkeys are not synchronized. As of the end of 2024, passkeys will not be synchronized in the following three cases:

#### Created a passkey for Windows Hello

One issue many people are likely to encounter is creating a passkey in Windows Hello. Previously, passkeys created in any browser were not synced, and even now, [with the exception of Chrome on TPM-enabled Windows devices](https://developer.chrome.com/blog/passkeys-gpm-desktop?hl=ja), passkeys created in any browser are not synced once they are saved in Windows Hello.

#### You created a passkey in iCloud Keychain on macOS, iOS, or iPadOS and tried to access the passkey from a non-Apple device

When you create a passkey on macOS, iOS, or iPadOS, it's often stored in iCloud Keychain or the Passwords app. Passkeys stored in iCloud Keychain won't sync with Windows or Android as of the end of 2024, so they won't be available. There are Windows apps and browser extensions, so hopefully they'll support passkeys.

#### I created a passkey for a service that I don't want to sync

Android still has a FIDO2 feature that predates passkeys, which allows you to create passkeys that are not synchronized. Since passkeys should be synchronized, it may be more appropriate to simply call them "FIDO2 credentials." Of course, this feature is no longer recommended, but it is still used intentionally by some services because it offers the strongest security.

### 4. The biometric authentication feature you thought was a passkey is actually not a passkey

When you encounter biometric authentication on your smartphone, you might immediately assume it's a passkey, but not all of them are passkeys. Android apps have a feature called [BiometricManager](https://developer.android.com/reference/android/hardware/biometrics/BiometricManager), and iOS apps have a feature called [Local Authentication Framework](https://developer.apple.com/documentation/localauthentication), so this may be a misunderstanding. These features can usually only be set up after logging in to a banking app or similar app using a different method.

### 5. I can't log in because the service doesn't offer any authentication method other than a passkey

Whether you use a passkey or not, as long as you can log in, that should be fine for the user. However, there are some services that, once you create a passkey, you cannot use any other authentication method. You might think that's outrageous, but let's stop and think about it for a moment.

There are two points to consider when considering whether authentication methods other than passkeys should remain:

1. If you leave authentication features weaker than a passkey, they will be targeted by attackers.
2. Removing all authentication features weaker than a passkey will make your device safe, but removing the passkey will put you in trouble.

Approach 1: Preserve authentication mechanisms weaker than a passkey

Adding a passkey as a new authentication option to your existing authentication methods doesn't fundamentally improve the security of the system as a whole, but the passkey experience has the advantage of being quicker and easier to log in with fewer steps than other secure authentication methods (such as two-factor authentication).

Ideally, weak authentication functions should be strengthened or eventually eliminated while waiting for the passkey ecosystem to become more robust in the future. If authentication can be easily achieved with a passkey, even if other authentication methods require a little more effort, it is far better than being stuck with the loss of the passkey. With a passkey, existing authentication methods are positioned as merely useful in emergencies, and even if the experience is slightly worse, such as by increasing the number of authentication steps, it should be acceptable. It would be wise for many services to adopt this approach.

Approach 2: Eliminate authentication mechanisms weaker than a passkey

But what if your company's users were currently being subjected to brutal phishing scams, causing daily losses? It wouldn't be surprising if there were services that would completely switch to Passkey, which would reduce phishing scams, even if it meant users had some access issues and could recover by verifying their identity through support. [In our previous article, we listed services that support Passkey](https://blog.agektmr.com/2023/12/passkey-mythbusting), but aren't you surprised that so many of them are major companies? Usually, it's small, ambitious companies that jump on new technologies; larger companies tend to be slow to act. Despite this, I imagine the major companies all supported Passkey because they wanted to quickly implement a countermeasure against phishing scams.

## Tips for users to master passkeys

As we have seen, there are still pitfalls in Passkey as an ecosystem. Here are some suggestions on how general users can use Passkey in a positive way.

- Display a QR code and attempt to log in with a passkey from another device (cross-device authentication)
- Be aware of which passkey provider you have saved your passkeys to
- Create passkeys for multiple passkey providers

Tip 1: Display the QR code and try logging in with the passkey on another device (cross-device authentication)

If you can't find your passkey, you may be able to log in using a passkey saved on another device. If the passkey dialog doesn't show "More options," tap it to display a QR code, then scan it with the device that has your passkey to see if you can log in.

### Tip 2: Be aware of which passkey provider you store your passkeys with

When creating a passkey, it's easier to understand the situation if you consider which passkey provider you're saving it in. Below is a summary of which passkey providers can be used in which environments.

There are three main passkey providers:
- Microsoft's Windows Hello
- Apple's iCloud Keychain (or "Passwords" app)
- Google's Google Password Manager

Browsers run on the operating systems of these platforms, but the passkey providers that can actually be used vary depending on the combination. Below we've summarized which passkey provider your passkey is stored in for each operating system and major browser. We recommend that you find the combination that best suits the apps and browsers you access most frequently.

For example: If you only use Apple devices, storing your passkey in iCloud Keychain may be sufficient, while Windows and iPhone users may want to use iCloud Keychain in conjunction with Google Password Manager.

{% Aside %}

*I haven't checked all Chromium-based browsers, but I think most of them are probably the same as Edge. For the latest information, please refer to [passkeys.dev](https://passkeys.dev/device-support/).

{% endAside %}

#### Windows

| | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️ (Requires TPM) | ❌️ | ❌️ |
| **Windows Hello** | ✅️ | ✅️ | ✅️ |
| **iCloud Keychain** | - | - | - |
#### macOS

| | **Chrome** | **Edge** | **Firefox** | **Safari** |
| ---------------------- | ---------- | -------- | ----------- | ---------- |
| **Google Password Manager** | ✅️ | ❌️ | ❌️ | ❌️ |
| **Windows Hello** | - | - | - | - |
| **iCloud Keychain** | ✅️ | ✅️ | ✅️ | ✅️ |
#### iOS/iPadOS

| | **Chrome** | **Edge** | **Firefox** | **Safari** |
| ---------------------- | ------------- | -------- | ----------- | ---------- |
| **Google Password Manager** | △<sup>1</sup> | ❌️ | ❌️ | ❌️ |
| **Windows Hello** | - | - | - | - |
| **iCloud Keychain** | ✅️ | ✅️ | ✅️ | ✅️ |

<sup>1</sup> Coming soon

#### Android

| | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️ | ✅️ | ✅️ |
| **Windows Hello** | - | - | - |
| **iCloud Keychain** | - | - | - |
#### Linux

| | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️ | ❌️ | ❌️ |
| **Windows Hello** | - | - | - |
| **iCloud Keychain** | - | - | - |
#### ChromeOS

| | **Chrome** |
| ---------------------- | ---------- |
| **Google Password Manager** | ✅️ |
| **Windows Hello** | - |
| **iCloud Keychain** | - |

#### Third-Party Passkey Providers

Other third-party passkey providers (non-default password managers) that support passkey include:
- 1Password
- Dashlane
- BitWarden
- NordPass
- RoboForm
- Keeper

The advantage of many third-party passkey providers is that they are platform-agnostic and can be used anywhere.

### Tip 3: Create passkeys for multiple passkey providers

Depending on the service, passkeys are designed to allow multiple passkeys to be created for each account. Creating multiple passkeys across multiple passkey providers, such as Google Password Manager and iCloud Keychain, can significantly reduce the trouble of losing your passkey. Even if you accidentally delete your passkey, you can recover it using another passkey.

Additionally, if you're using Android 14 or later, or iOS/iPadOS 16 or later, you can specify multiple third-party passkey providers at the OS level.

* **Android:** System Settings > Passwords & Accounts
* **iOS/iPadOS:** Settings > General > Autofill & Passwords

Even on desktop, most third-party passkey providers offer browser extensions that you can use, so this is a good opportunity to start using a third-party passkey provider.

Tip 4: Wait until a passkey becomes more convenient

Since things have been going in a rather negative direction, let me offer some positive news. Here are some upcoming changes (probably sometime in 2025) that will improve the usability of passkeys:

- Passkeys created in Chrome are currently stored in the Google Password Manager and can be synced across Android, Windows, macOS, Linux, and ChromeOS, and will soon be synced to iOS/iPadOS as well. This means that as long as you use Chrome, you'll be able to use the same passkey across all environments via Google Password Manager.
- [In October 2024, Microsoft announced that it plans to soon sync passkeys across Windows devices](https://blogs.windows.com/windowsdeveloper/2024/10/08/passkeys-on-windows-authenticate-seamlessly-with-passkey-providers/). It's likely that some movement will occur sometime in 2025.
- In October, the FIDO Alliance announced specifications called [CXP (Credential Exchange Protocol) and CXF (Credential Exchange Format)](https://fidoalliance.org/specifications-credential-exchange-specifications/) to enable the secure import and export of passkeys and passwords. This will enable passkeys to be copied and moved between passkey providers in the future.

Hopefully, passkeys will be even more convenient to use in 2025!

## Services that can make passkeys more convenient to use

Finally, we will consider what points service providers should pay attention to when implementing passkeys so that users can use them with confidence.

### Let users know which passkeys cannot be synced and which passkey providers they use

[The Passkey Design Guidelines recommend creating a Passkey Management screen](https://www.passkeycentral.org/ja/design-guidelines/optional-patterns/passkey-management-ui-best-practices-for-combining-all-passkey-types). You can help users understand by clearly indicating which Passkey provider stores the passkey and whether or not it is synchronized.

### Adjust passkey promotion frequency

It seems that some users don't like the pressure to use a passkey. I think passkeys are a good thing, but pushing them too much may have the opposite effect.

### Guide to authentication methods other than passkey

Unless there are extraordinary circumstances, provide a backup authentication method in case a passkey cannot be used. ID linking, two-step authentication, and in some cases passwordless methods such as magic links are also acceptable. Of course, you should take all possible security measures for each method. However, since password-only logins are vulnerable to attacks, you should move to ID linking, passwordless authentication, two-factor authentication, etc. as soon as possible.

### Change behavior for each environment

For example, even for Windows, passkeys created in browsers other than Chrome will not be synchronized as of the end of 2024. By identifying the user agent string and explicitly stating that passkeys created in such browsers will not be synchronized, it may be possible to control user expectations to some extent.

### Follow the guidelines

The FIDO Alliance recently launched a website called [Passkey Central](https://www.passkeycentral.org/ja/home). It's not aimed at developers, but it contains many resources that product managers and designers can refer to. I highly recommend checking it out.

## summary

We've put together a comprehensive guide to using passkeys. Some of you may feel like you can't master something so complicated! But as a user, that's not a bad feeling. The goal of passkeys is to provide a secure authentication system that anyone can use without having to think about these things at all. It may take a little more time until that happens.

Finally, here are some tips that we've covered in this article:

Tips for users to use passkeys effectively:

- Utilize cross-device authentication
- Be aware of which passkey providers you store your passkeys in
- Create passkeys for multiple passkey providers
- Wait until passkeys become more convenient

Tips for service providers to successfully implement passkeys:

- Adjust the frequency of passkey promotion
- Indicate the passkey provider and synchronization status of registered passkeys
- Keep authentication methods other than passkeys available if possible
- Change passkey creation behavior for each environment
- Follow guidelines

Have a great new year.
