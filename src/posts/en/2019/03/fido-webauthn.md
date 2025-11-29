---
layout: post
lang: en
title: 'How a password-free world is possible - Learn the basics of FIDO2 and WebAuthn'
description: ''
date: 2019-03-14
updated: 2022-06-06
tags:
- WebAuthn
- FIDO
- FIDO2
- 認証
- Authentication
translationOf: /2019/03/fido-webauthn.html
translated: 2025-11-29
translatedManually: false
---

There's no end to incidents caused by passwords, such as fraudulent money transfers and account hijacking. Ideally, we'd like to live in a world where even people with low IT literacy, such as the elderly, can easily and securely manage their online accounts. However, the history of the Internet has proven that the first priority is to realize a world without passwords. FIDO (Fast IDentity Online) is a technology that has recently been attracting attention as a way to achieve password-free logins. WebAuthn (Web Authentication) makes FIDO available from a browser. Based on reports, some may believe that these technologies are designed to achieve fingerprint authentication, but in reality, that's not quite the case.

Numerous articles have already been published about WebAuthn, so I will leave the technical details of how to use it to those articles. In this article, I will explain the big picture and the big vision of how this technology will change identity in the future.

<!-- excerpt -->

## Authentication Basics

To understand the concept of FIDO, it is essential to understand the basics of authentication.

### Three Factors of Authentication

It is said that there are three main elements that must be verified to confirm a person's identity, whether online or offline.

* **Knowledge**: Something only you know, such as a password or security question.
* **Possession**: A specific device only you have, such as a security key.
* **Biometric**: The user's own fingerprint, iris, veins, face, etc.

<figure>
  <img src="/images/2019/fido-1.png">
</figure>

For example, bank ATMs verify your identity by having the card (possession) and knowing the PIN (knowledge). Similarly, with credit cards that have a security chip, you insert the card into the terminal instead of signing and enter the correct PIN, which is two-factor authentication that satisfies both possession and knowledge.

However, these are offline cases, and the situation has been different for online authentication over the Internet via PCs and smartphones. In an all-online system, it is difficult to prove that you have something, and there was no infrastructure in place to read biometrics. For this reason, only knowledge-based authentication, such as passwords, has been used for a long time.

However, because passwords are used online, they are always at risk, with countless automated login attempts being made using programs, traps being set to anonymously steal information, and passwords being guessed. It can be said that both users and service providers have had difficulty using passwords safely if they did not know how to handle them properly.

### OTP and its weaknesses

Recently, a popular authentication method is combining a password with an OTP (One-Time Password). After entering your password, you enter a number sent to you via SMS or a number displayed on an app or device. In either case, the same number is never displayed to anyone other than you, making it more secure.

<figure>
  <img src="/images/2019/fido-2.png">
</figure>

However, OTPs have a weakness in that if they are intercepted, they can be used by a third party. For example, if you enter your password and OTP on a phishing site (a fraudulent site that looks exactly like the real thing but has a different URL) believing it to be genuine, your account will be stolen without you even realizing it.

Recently, multi-factor authentication using security keys has become popular, especially among enterprises. This method achieves two-factor authentication by combining a user's security key with their password as possession authentication.

### Public Key Cryptography and Security Keys

Proof of ownership using security keys is achieved using public key cryptography, which engineers will be familiar with using ssh and other similar methods.

In the case of passwords, the same string is stored in some form both in the user's mind and on the server, so if either is leaked, there is a risk of it being hijacked. However, with public key cryptography, the user has a private key and the server has a public key.

<figure>
  <img src="/images/2019/fido-3.png">
</figure>

An interesting feature of private keys is that they can be verified with their corresponding public key, and a "signature" can be issued that can only be generated with that private key. If the server sends a random string called a challenge, and the user signs it using their private key and returns it, the server, which has the corresponding public key, can verify the signature and confirm that the challenge was sent by the user.

The general flow is as follows.

1. **Register (only required the first time)**: The user creates a public key pair, stores the private key in a safe place, and places the public key on the server.
2. **Login**: The user receives a challenge from the server, signs it with the private key, and sends it back. The server verifies the signature and challenge using the public key, and if the user's identity is confirmed, grants access.

When using public key cryptography, a public key pair is created exclusively for the combination of that service and user, so even if a third party intercepts the signature through phishing or other means, it cannot be misused. Also, even if the server is cracked and the public key is leaked, it cannot be used to impersonate the user's account. As long as the user protects their private key, they can prove possession (User Presence = UP) and be authenticated, with the possibility of their account being hijacked extremely low.

However, it is not as simple as it sounds to ask users with low IT literacy to store their private keys in a way that ensures they are never leaked.

To make this entire process easier for anyone, a system using a dedicated device called a security key was invented. A more general term for this is "authenticator." An authenticator has specialized authentication functions: it creates a new public key pair during registration, securely stores the private key, and returns only the public key, as well as generating and returning a signature upon login.

## Standardization by FIDO

Authenticators are valuable, but if their mechanisms differ for each PC, smartphone, OS, and platform, they will not become widespread. This is where standardization by an organization called the [FIDO Alliance](https://fidoalliance.org/) comes in. The FIDO Alliance defined CTAP (Client To Authenticator Protocol), a protocol for communication between devices and authenticators, [UAF (Universal Authentication Framework)](https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-overview-v1.1-ps-20170202.html), which enables identity verification using biometric information, and [U2F (Universal Second Factor)](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-overview-v1.2-ps-20170411.html), which enables two-factor authentication. These specifications have been implemented on multiple platforms and are in actual use.

For example, U2F has enabled biometric authentication on Docomo mobile phones. While not yet implemented as a browser feature, the desktop version of Google Chrome has an invisibly installed extension that allows users to use USB U2F security keys via a JavaScript API. Additionally, installing the Google Authenticator app allows users to use NFC-enabled U2F security keys on the Android version of Google Chrome. It also appears that Firefox can use U2F security keys by setting a flag. These U2F-based two-factor authentication features are available for services such as Google, Dropbox, and Facebook.

## And now to FIDO2

To further promote adoption and convenience, FIDO subsequently developed a new, expanded version: FIDO2. FIDO2 unified UAF and U2F, standardizing the CTAP2 protocol for communicating with authenticators and a W3C-based JavaScript API called WebAuthn (Web Authentication) for handling authenticators from a browser. It has already been implemented in Google Chrome, Mozilla Firefox, and Microsoft Edge, and Apple Safari appears to be well underway.

Not only has FIDO2 refined its specifications, but its standard implementation in browsers and platforms has made it easier for even general developers to use, and it is expected to become more widely used in the future.

### FIDO2 and Authenticators

One thing that is often overlooked when understanding FIDO2 is the characteristics of authenticators. Many people know that fingerprint authentication can be used with FIDO2 and WebAuthn, but are unable to explain how it relates to security keys.

There are many different types of authenticators: those that support U2F, those that connect via USB-C, those that connect via BLE, those that are built into devices such as smartphones and PCs, those that can authenticate using fingerprints, etc. Although they may seem complicated at first glance, they can be classified based on three criteria.

* **Transport**: The connection method between the authenticator and the device. Available options are USB, BLE, NFC, and internal.
* **Attachment**: Whether the authenticator is directly built into the device (such as a smartphone or PC) (platform) or not (cross-platform).
* **User Verification (UV)**: Whether or not it has identity authentication functionality, including biometric authentication.

<figure>
<img src="/images/2019/fido-4.png" >
<figcaption> Typical security key image</figcaption>
</figure>

For example, the [YubiKey 5 Nano](https://www.yubico.com/product/yubikey-5-nano/#yubikey-5-nano) has a Transport of USB, and because it can be removed from the device (although it is intended to be left attached), the Attachment is cross-platform, and the UV is "none."

[Feitian BioPass FIDO](https://www.ftsafe.com/Products/FIDO2) is categorized as USB for Transport, cross-platform for Attachment since it can be removed from the device, and UV is categorized as "yes" since it supports fingerprint authentication.

What's interesting is authenticators where Attachment is a platform. For example, the [Google Pixel 3](https://store.google.com/product/pixel_3) can treat the device itself as an authenticator. In this case, Transport is internal, Attachment is platform, and fingerprint authentication is available, so it can be classified as UV "enabled."

Many security keys and authenticators currently on the market can be used with FIDO as U2F, but they are backward compatible and can also be used with FIDO2. The distinctive feature of FIDO2 is the User Verification section.

### What is User Verification?

User Verification refers to the identity verification function of an authenticator. Identity verification here includes biometric authentication such as fingerprint, face, and iris recognition, as well as non-biometric fallback methods such as a PIN. With a PIN, identity verification is performed by entering a pre-set short string of numbers or alphanumeric characters via a UI such as a browser. With UV-enabled authenticators, a signature will not be issued unless identity verification is successful. This is why people say FIDO2 will eliminate the need for passwords.

In other words, security keys with fingerprint authentication capabilities, such as the aforementioned BioPass FIDO, Android devices with biometric authentication capabilities, Windows devices that support Windows Hello, and in the future iOS/macOS that support TouchID or FaceID, can combine public key cryptography-based ownership authentication (User Presence = UP) with biometric authentication (User Verification = UV) to **achieve two-factor authentication on their own**, creating an environment where you can log in completely without a password.

<figure>
<img src="/images/2019/fido-5.png" >
</figure>

Wouldn't it be great if it not only eliminated the risk of passwords, but also allowed you to log in just by touching and looking?

The future of FIDO2

If you have one of the authenticators listed above, you can try out the demo.

[https://try-webauthn.appspot.com](https://try-webauthn.appspot.com/)

<figure>
<img src="/images/2019/fido-6.png" >
<figcaption>webauthndemo.appspot.com</figcaption>
</figure>

If you want to try out the U2F security key, you can register it by clicking "Register New Credential" and try logging in by clicking "Authenticate" (this works on Chrome, Firefox, and Edge).

If you want to try biometric authentication built into your device, such as Android fingerprint authentication or MacBook Pro TouchID, you can register it with "Register Platform Authenticator" and try logging in with "Authenticate" (as of March 2019, this only works with Chrome). If all goes well, a dialog will appear in your browser, allowing you to try fingerprint authentication. "ISUVPAA" stands for "Is User Verifying Platform Authenticator Available" and tells you whether you are using a device (Platform Authenticator) with an embedded authenticator, including biometric authentication (User Verification).

If you open the menu on the left, you can adjust the parameters in more detail individually, but we will not explain that here.

### New User Experience - Re-authentication

One of the new and unprecedented user experiences using FIDO2 is re-authentication. This allows users to log in to a device they have already logged in to again using just their fingerprint. This experience has already been realized at Yahoo! JAPAN, where users can log in again using just their fingerprint if they are using the browser on the same device. (Image taken from the press release)

<figure>
<img src="/images/2019/fido-8.png" >
<figcaption>Yahoo! JAPAN re-authentication flow</figcaption>
</figure>

This is particularly useful in places like banks and shopping sites that require high security. There are many banks that require you to log in every time you return after a short session, and many shopping sites that require you to re-enter your password when paying. If you can authenticate with your fingerprint or face in such situations, you can expect users to use the site without compromising the user experience.

### Authenticators are bound to devices

I said "once logged in on a device," but why is biometric authentication tied to the same device? You might think that even if you switch to a different device, it's fine if you can continue to log in using the same fingerprint of the same person.

This is because, for security reasons, the biometric data used for biometric authentication is stored only on the device and is protected so that it cannot be accessed from the network or unrelated software. The same is true for private keys, so ownership authentication cannot be used across devices. In other words, with FIDO2, every time you change devices, you need to log in to the same account in some way, create a new public key pair linked to it, and register your biometric information.

Currently, the most common environments for biometric authentication are platform-specific authenticators such as Android devices and MacBook Pros, but there are also cross-platform authenticators such as BioPass FIDO. For example, by using this, you can log in to the same account anywhere using fingerprint authentication by simply inserting the authenticator into the device you want to log in to.

However, since the majority of users will not purchase a cross-platform authenticator, if you want to implement FIDO2, you must come up with a practical solution for how those users will log in to a new device for the first time. If users create a password, that could potentially become an opportunity for account hijacking, so if security is a priority, a more practical solution may be to not require users to create a new password, but to have them log in by sending a temporary code via email or SMS.

### Turn your smartphone into an authenticator using caBLE {#cable}

Google has proposed an extension to FIDO2 called caBLE (cloud assisted BLE, or "cable"), which would enable smartphones to be used as cross-platform authenticators for BLE. If this is realized, it is expected that many people will be able to use the smartphones they already carry as authenticators, without having to go to the trouble of preparing a dedicated authenticator, enabling password-free login across devices.

In any case, we will need to design systems that take into account account recovery, which restores an account from scratch, including cases where an authenticator has been lost.

### Resident Key {#resident-key}

The future proposed by FIDO2 also includes another exciting feature: Resident Keys. Authenticators have a data store where, whenever you register with a service and create a public key pair, information about the user is stored along with information about the service.

When logging in without using Resident Key, the user must declare the account they want to use to log in. However, with Resident Key, you can create a user experience where a list of accounts pre-saved in the authenticator is displayed, and the user can select one and log in using biometric authentication.

<figure>
<img src="/images/2019/fido-7.png">
<figcaption>Resident Key Mockup</figcaption>
</figure>

This feature has not yet been implemented in Chrome, but it is already available in Edge (non-Chromium version) on Windows 10, and you can benefit from it by using a cross-platform authenticator that supports Resident Key. Because Windows is essentially a desktop OS, people who use Windows Hello as a platform authenticator may not see the benefits as readily. However, if cross-platform authenticators become possible with caBLE, which is implemented on mobile devices like Android and iPhone in the future, it will enable a world in which you can always carry your identity with you.

The day may come when our smartphones will become a representation of our identity, allowing us to navigate the internet without having to log in.

### What is Attestation {#attestation}

This has gotten quite long, but there's one more important thing to mention. Even though FIDO2 offers strong security, it would be pointless if a forged, malicious authenticator were already in possession of the user. This is why FIDO2 includes a mechanism called attestation.

Attestation is like a certificate, and a different certificate is pre-embedded for each authenticator model (not device-specific). By using a root certificate authority called MDS (Metadata Service), the server can verify whether this attestation is genuine. Of course, the FIDO Alliance also has a certification system that certifies authenticators, so we recommend using a certified authenticator (Android was recently certified). For more information on attestation, please see this article (in English).

Unless required for compliance reasons (such as for banks, enterprises, or government agencies), there is usually no need to request attestation. (Note: If you are using it in a Google enterprise environment, please also see the [Security Keys page on the Chromium website](https://www.chromium.org/security-keys).) Ideally, each user would only need to have one authenticator. If you do use it, make sure to take advantage of MDS to avoid accepting only certain models.

**Updated: 2019/03/18** We initially wrote that Attestation was "not recommended from a privacy perspective," but we have temporarily withdrawn this statement as we cannot rule out the possibility that this was a misunderstanding on our part. We will update this statement as soon as we have accurate information. 
**Updated: 2019/03/22** We have confirmed that there are virtually no privacy concerns, so we have revised the above statement.

## summary

If you'd like to try implementing FIDO2 fingerprint authentication using WebAuthn development from a browser, we recommend starting with the codelab created by FIDO evangelist Yuriy Ackermann. His Medium post covers not only browser-side but also server-side signature verification and various attestation methods, so we recommend reading it thoroughly. It's also very helpful to have a collection of resources, including documentation, libraries, and demos in one place, including those in Japanese.

[WebAuthn Awesome](https://github.com/herrjemand/awesome-webauthn/blob/master/README.md)

However, if you're thinking of immediately implementing FIDO2 and WebAuthn in production, please be a little cautious. While there is certainly a lot of information and compatible environments available, it must be said that the server-side discussion is still in its infancy. Unless your team is extremely confident in their encryption-related products, I don't think it's time to jump in and use them carelessly.

Some people have already released open source libraries (the Japanese community is particularly active even on a global scale), and some companies, such as Yahoo! JAPAN, have already started using them in production environments. We will likely see IDaaS products and FIDO Certified libraries in the future. LINE has announced that it will release its own FIDO Certified library as open source within this year.

It's not too late to put FIDO2/WebAuthn into production once there are enough proven results, products, and open source solutions. I recommend starting by reading various documents and thinking about the future that FIDO2 and WebAuthn can realize.

Finally, I'd like to thank [@herrjemand](https://twitter.com/herrjemand), [@super_reader](https://twitter.com/super_reader), [@watahani](https://twitter.com/watahani), and [@sisidovski](https://twitter.com/sisidovski) for their reviews and help in writing this article.
