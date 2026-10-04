---
layout: post
lang: en
title: Tips for Living with Passkeys
description: After reviewing the basics of passkeys, I will explain some common misconceptions people often have about them.
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
translated: 2026-10-03
translatedManually: false
---
Lately, I have been seeing complaints that passkeys are hard to use. I have also observed several posts from people who were in trouble because they couldn't sign in to a service they wanted to use, simply because the passkey they were sure they had created could not be found.

So in this blog post, I'd like to explore why this happens, how to avoid such situations, what actions users can take, and what service providers can do to reduce the number of users who feel this way.

<!-- excerpt -->

Of course, as a fundamental premise, any feature that forces users to rack their brains is undesirable—far from driving adoption, it just causes trouble. However, while passkeys are maturing as individual products from various vendors, the overall ecosystem is still evolving, and it is undeniable that some aspects remain difficult to use. That is why I am writing this article: to share some tips and workarounds that might lighten your burden a bit until we reach a world where passkeys are truly seamless.

## Passkey Basics

As for what passkeys are and the world they aim for, I covered that in [パスキーとは何か、そしてその課題](https://blog.agektmr.com/2022/12/passkey). Two years have already passed since I wrote that post, but the fundamentals have barely changed. In the meantime, however, operating systems, passkey providers (password managers), browsers, and services (Relying Parties, or RPs) have each gradually evolved.

## What Makes Passkeys Hard to Use?

As far as I can tell within my observation range, the main reasons people find passkeys frustrating are:
- I'm sure I created a passkey, but I can't find it.
- I don't know what to do when my passkey doesn't work.

There are probably many other minor points, but if these two are resolved, the remaining issues are likely trivial.

## Passkey Cannot Be Found

"The service told me to create a passkey, so I did. But when I switched to another environment, it disappeared. I heard passkeys sync, but I can't find it."

When this situation occurs, several reasons are possible:
1. You cannot access the passkey provider where the passkey was saved from your new environment.
2. The passkey provider is accessible, but you are not accessing the account where the passkey was saved.
3. The passkey provider does not sync passkeys in the first place.
4. The biometric feature you thought was a passkey is actually not a passkey.
5. You cannot sign in because the service does not offer an authentication method other than passkeys.

### 1. You cannot access the passkey provider where the passkey was saved from your new environment

A passkey provider is the place where created passkeys are stored and synced, and in most cases, a "password manager" serves this role. The default passkey provider where a passkey is stored depends on your environment. In many cases, the passkeys you create are saved to the system's default passkey provider.

If your passkey cannot be found, there may be a compatibility issue between your environments. For example, a passkey created in Edge on Windows cannot be accessed from Edge on Android. This is because a passkey created in Edge on Windows is saved to Windows Hello, whereas Edge on Android only integrates with Google Password Manager.

I will cover passkey provider support across different environments further below.

### 2. The passkey provider is accessible, but you are not accessing the account where the passkey was saved

Another possibility is that even within the same passkey provider, you cannot find the passkey because it was saved to a different account. For example, if you create a passkey in Chrome, by default it is saved to the Google Password Manager associated with the [Google Account signed in to Chrome](https://support.google.com/chrome/answer/185277?hl=ja). If you want to access that same passkey in a different environment, you naturally must access it from Chrome signed in with the same Google Account. If you [use multiple Google Accounts](https://support.google.com/chrome/answer/2364824?hl=ja), it might be worth checking whether the account currently being referenced is the same one you previously saved the passkey to.

Also, Android has a feature called [work profiles](https://support.google.com/work/android/answer/6191949?hl=ja), which completely separates personal and work apps and data within the same OS. I myself have panicked when a passkey couldn't be found because of this. If you cannot access your passkey, check this as well.

### 3. The passkey provider does not sync passkeys in the first place

There are cases where passkeys were never synced to begin with. As of late 2024, passkeys are not synced in the following three scenarios:

#### You created a passkey in Windows Hello

A case many people are likely to encounter is creating a passkey in Windows Hello. Previously, passkeys created in any browser were not synced, and even now, [with the exception of Chrome on Windows devices with TPM available](https://developer.chrome.com/blog/passkeys-gpm-desktop?hl=ja), any passkey created in any browser and saved to Windows Hello will not be synced.

#### You created a passkey in iCloud Keychain on macOS, iOS, or iPadOS, and tried to access it from a non-Apple device

When you create a passkey on macOS, iOS, or iPadOS, it is often saved in iCloud Keychain or the "Passwords" app. As of late 2024, passkeys saved in iCloud Keychain do not sync to environments such as Windows or Android, making them unavailable there. Since a [Windows app](https://www.microsoft.com/store/apps/9PKTQ5699M62) and a [browser extension](https://support.apple.com/ja-jp/guide/icloud-windows/icw76039ec0f/icloud) exist, we can hopefully look forward to passkey support there in the future.

#### You created a passkey on a service that opts out of syncing

Android retains legacy pre-passkey FIDO2 functionality, which allows creating non-syncing passkeys. Since passkeys are fundamentally meant to sync, it might be more accurate to call these simply "FIDO2 credentials." Of course, this feature is no longer recommended, but because it also represents the highest level of security, some services still seem to use it deliberately.

### 4. The biometric feature you thought was a passkey is actually not a passkey

When encountering biometric authentication on a smartphone, some people might immediately assume it is a passkey, but not everything is a passkey. Features such as [BiometricManager](https://developer.android.com/reference/android/hardware/biometrics/BiometricManager) on Android apps or [Local Authentication Framework](https://developer.apple.com/documentation/localauthentication) on iOS apps exist, and users might be confusing them. Typically, these features are used in banking apps and the like, and cannot be configured until you have already signed in using another method.

### 5. You cannot sign in because the service does not offer an authentication method other than passkeys

Whether it's a passkey or not, as a user, being able to sign in is all that matters. However, some services disable all authentication methods other than passkeys once a passkey is created. While it is understandable to feel frustrated by this, let's pause and consider why.

When deciding whether to retain authentication methods other than passkeys, there are two perspectives to consider:

1. Keeping authentication methods that are weaker than passkeys leaves them vulnerable to attackers.
2. Eliminating all authentication methods weaker than passkeys makes things secure, but leaves users stranded if they lose their passkey.

#### Approach 1: Keep authentication methods weaker than passkeys

Add passkeys to existing authentication methods as a new option. While this does not fundamentally raise the security baseline of the system as a whole, passkeys offer a faster and simpler sign-in experience with fewer steps compared to other secure authentication methods (such as two-factor authentication).

The ideal path is to strengthen or eventually eliminate weaker authentication methods while waiting for the passkey ecosystem to mature further. If users can authenticate effortlessly with a passkey, having fallback authentication methods take a bit more effort is far better than being completely locked out when a passkey is lost. With passkeys in place, existing authentication methods only need to serve as fallbacks for emergencies, so a slightly worse user experience—such as additional authentication steps—should be acceptable. For most services, this approach is the sensible choice.

#### Approach 2: Eliminate authentication methods weaker than passkeys

However, what if your users are actively suffering severe phishing attacks, causing ongoing damages every day? Even if some users encounter access difficulties, it is entirely understandable for a service to fully migrate to phishing-resistant passkeys, relying on identity verification via customer support for account recovery. [I included a list of services supporting passkeys in my previous article](https://blog.agektmr.com/2023/12/passkey-mythbusting)—aren't you surprised by how many major services are on it? Usually, it is agile small companies that jump on new technologies, while larger corporations move more slowly. Despite this, major players rushed to support passkeys, and I suspect that is because they wanted to deploy countermeasures against phishing attacks as quickly as possible.

## Tips for Users to Master Passkeys

As discussed so far, the passkey ecosystem still has its pitfalls. Here are several suggestions on how general users can get along better with passkeys:

- Display a QR code and try signing in with a passkey on another device (cross-device authentication)
- Be conscious of which passkey provider you are saving your passkeys to
- Create passkeys in multiple passkey providers

### Tip 1: Display a QR code and try signing in with a passkey on another device (cross-device authentication)

When a passkey cannot be found, you may be able to sign in using a passkey saved on another device. If you see "Other options" or similar in the passkey dialog, tap it to display a QR code, scan it with the device that holds your passkey, and try signing in that way.

### Tip 2: Be conscious of which passkey provider you are saving your passkeys to

Being mindful of which passkey provider you save your passkey to when creating it makes it much easier to understand your situation. Below is a summary of which passkey providers are available in which environments.

There are three major passkey providers:
- Microsoft's Windows Hello
- Apple's iCloud Keychain (or the "Passwords" app)
- Google's Google Password Manager

Browsers run on these platform OSes, but the passkey providers actually available depend on the combination. I have summarized below where passkeys are saved for each OS and major browser. Finding the optimal combination for the apps and browsers you frequently use should be helpful.

**Example:** For someone who only uses Apple devices, saving passkeys in iCloud Keychain is sufficient. For a user with both Windows and an iPhone, using both iCloud Keychain and Google Password Manager in combination might be a good approach.

{% Aside %}

* Note: I haven't investigated all Chromium-based browsers, but most are likely the same as Edge. For the latest information, please refer to [passkeys.dev](https://passkeys.dev/device-support/).

{% endAside %}

#### Windows

|                        | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️ (TPM required)  | ❌️        | ❌️           |
| **Windows Hello**      | ✅️          | ✅️        | ✅️           |
| **iCloud Keychain**      | -          | -        | -           |
#### macOS

|                        | **Chrome** | **Edge** | **Firefox** | **Safari** |
| ---------------------- | ---------- | -------- | ----------- | ---------- |
| **Google Password Manager** | ✅️          | ❌️        | ❌️           | ❌️          |
| **Windows Hello**      | -          | -        | -           | -          |
| **iCloud Keychain**      | ✅️          | ✅️        | ✅️           | ✅️          |
#### iOS/iPadOS

|                        | **Chrome**    | **Edge** | **Firefox** | **Safari** |
| ---------------------- | ------------- | -------- | ----------- | ---------- |
| **Google Password Manager** | △<sup>1</sup> | ❌️        | ❌️           | ❌️          |
| **Windows Hello**      | -             | -        | -           | -          |
| **iCloud Keychain**      | ✅️             | ✅️        | ✅️           | ✅️          |

<sup>1</sup> Coming soon

#### Android

|                        | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️          | ✅️        | ✅️           |
| **Windows Hello**      | -          | -        | -           |
| **iCloud Keychain**      | -          | -        | -           |
#### Linux

|                        | **Chrome** | **Edge** | **Firefox** |
| ---------------------- | ---------- | -------- | ----------- |
| **Google Password Manager** | ✅️          | ❌️        | ❌️           |
| **Windows Hello**      | -          | -        | -           |
| **iCloud Keychain**      | -          | -        | -           |
#### ChromeOS

|                        | **Chrome** |
| ---------------------- | ---------- |
| **Google Password Manager** | ✅️          |
| **Windows Hello**      | -          |
| **iCloud Keychain**      | -          |

#### Third-Party Passkey Providers

In addition to the above, third-party passkey providers (non-default password managers) that support passkeys include:
- 1Password
- Dashlane
- BitWarden
- NordPass
- RoboForm
- Keeper

The advantage of many third-party passkey providers is that they are not tied to a single platform and can be used anywhere.

### Tip 3: Create passkeys in multiple passkey providers

Depending on the service, passkeys are inherently designed to allow creating multiple passkeys per account. By creating multiple passkeys across different passkey providers—such as Google Password Manager and iCloud Keychain—you can significantly reduce issues when a passkey cannot be found. Even if you accidentally delete a passkey, you can recover using another one.

Furthermore, if you are using Android 14 or later, or iOS/iPadOS 16 or later, you can specify multiple third-party passkey providers at the OS level.

* **Android:** System Settings > Passwords & accounts
* **iOS/iPadOS:** Settings > General > AutoFill & Passwords

On desktop as well, most third-party passkey providers offer browser extensions, making them readily usable. This might be a great opportunity to start using a third-party passkey provider.

### Tip 4: Wait until passkeys become even more convenient to use

Since the discussion has leaned quite negative, let me offer some brighter news. Several developments that will improve passkey usability are planned (likely during 2025):

- Passkeys created in Chrome are currently saved to Google Password Manager and can sync across Android, Windows, macOS, Linux, and ChromeOS, with iOS/iPadOS sync coming soon. Once this is realized, as long as you use Chrome, you will be able to access the same passkeys across all environments via Google Password Manager.
- [In October 2024, Microsoft announced plans to soon sync passkeys across Windows devices](https://blogs.windows.com/windowsdeveloper/2024/10/08/passkeys-on-windows-authenticate-seamlessly-with-passkey-providers/). We can likely expect some movement on this during 2025.
- In October, the FIDO Alliance [announced](https://fidoalliance.org/fido-alliance-publishes-new-specifications-to-promote-user-choice-and-enhanced-ux-for-passkeys/) [CXP (Credential Exchange Protocol) and CXF (Credential Exchange Format)](https://fidoalliance.org/specifications-credential-exchange-specifications/), specifications designed to enable secure importing and exporting of passkeys and passwords. In the future, this will allow copying or moving passkeys between passkey providers.

Hopefully, passkeys will become even more convenient to use in 2025!

## What Services Can Do to Make Passkeys More Useful

Finally, let's consider what service providers should keep in mind when implementing passkeys so that users can use them with peace of mind.

### Make non-syncing passkeys and passkey providers clear to users

[Passkey design guidelines recommend creating a passkey management screen](https://www.passkeycentral.org/ja/design-guidelines/optional-patterns/passkey-management-ui-best-practices-for-combining-all-passkey-types). By clearly indicating which passkey provider a passkey is saved to, and whether it syncs or not, you can help users understand what to expect.

### Adjust the frequency of passkey promotions

Some users feel uncomfortable with aggressive "Use passkeys!" pressure. While passkeys are great, pushing them too persistently may backfire.

### Provide authentication methods other than passkeys

Unless there are exceptional circumstances, provide a backup authentication method for when a passkey is unavailable. Identity federation, two-step verification, or in some cases passwordless options like magic links are all viable. Naturally, ensure robust security measures are in place for each. However, password-only sign-ins are easily targeted, so services should migrate toward identity federation, passwordless authentication, or two-factor authentication as soon as possible.

### Adjust behavior based on the environment

For example, even within Windows, passkeys created in browsers other than Chrome do not sync as of late 2024. By inspecting the user agent string and clearly communicating that passkeys created in such browsers will not sync, you may be able to manage user expectations to some extent.

### Follow the guidelines

The FIDO Alliance recently launched a website called [Passkey Central](https://www.passkeycentral.org/ja/home). It features plenty of resources intended not just for developers, but especially for product managers and designers. Be sure to check it out.

## Summary

I've covered a comprehensive overview of how to deal with passkeys. Some of you might feel that something this complex is impossible to master. As a user, that reaction is entirely reasonable. The ultimate goal of passkeys is authentication that anyone can use securely without ever having to think about any of this. It may just take a little more time to get there.

To wrap up, here is a summary of the tips covered in this article:

Tips for users to handle passkeys effectively:

- Leverage cross-device authentication
- Be conscious of which passkey provider you are saving your passkeys to
- Create passkeys in multiple passkey providers
- Wait until passkeys become even more convenient to use

Tips for service providers to implement passkeys effectively:

- Adjust the frequency of passkey promotions
- Clearly indicate the passkey provider and sync status of registered passkeys
- Retain authentication methods other than passkeys whenever possible
- Adjust passkey creation behavior based on the environment
- Follow the guidelines

Happy New Year!
