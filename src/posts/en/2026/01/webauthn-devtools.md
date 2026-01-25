---
layout: post
lang: en
title: Introducing WebAuthn DevTools
description: Explaining the newly added WebAuthn tab in Chrome DevTools. Learn how to create virtual authenticators and streamline WebAuthn debugging.
date: 2026-01-25
updated: 2026-01-25
organic: 90
image:
  feature: /2026/webauthn-devtools.jpg
tags:
  - Chrome
  - DevTools
  - Chrome Extension
  - WebAuthn
  - Security
translationOf: /2026/01/webauthn-devtools.html
translated: 2026-01-25
translatedManually: true
---

When implementing passkeys yourself or investigating how passkeys work on other websites, setting up a debugger to capture requests and responses or parsing binaries to read the contents is not easy. You can easily achieve this using a Chrome Extension called WebAuthn DevTools.

<!-- excerpt -->

## What is WebAuthn DevTools?

[WebAuthn DevTools](https://chromewebstore.google.com/detail/webauthn-devtools/ogpaejcbmlcjnkcbnfmdfheifgodnnec) is a Chrome Extension that streamlines WebAuthn debugging.

{% ImageFigure '/images/2026/webauthn-devtools-chromewebstore.jpg', 'WebAuthn DevTools at the Chrome Web Store', 'max-width: 600px; margin: 0 auto 30px;' %}

You can use it immediately by launching Chrome DevTools on a page where WebAuthn is used and selecting the "WebAuthn" tab.

The left panel displays executed WebAuthn commands, and the right panel shows detailed requests and responses.

{% ImageFigure '/images/2026/webauthn-devtools.jpg', 'WebAuthn DevTools Screen', 'max-width: 600px; margin: 0 auto 30px;' %}

In particular, responses from `navigator.credentials.get()` and `navigator.credentials.create()` contain binaries, making it tedious to decode and read the contents, but WebAuthn DevTools displays parsed information on the spot. [If the AAGUID is included, it also displays the name of the corresponding password manager](https://web.dev/articles/webauthn-aaguid).

{% ImageFigure '/images/2026/webauthn-devtools-response-details.jpg', 'WebAuthn DevTools Response Details', 'max-width: 600px; margin: 0 auto 30px;' %}

Also, some parameters display brief descriptions and links to learn more details.

{% ImageFigure '/images/2026/webauthn-devtools-infolink.jpg', 'Explanations displayed in WebAuthn DevTools', 'max-width: 400px; margin: 0 auto 30px;' %}

## Summary

[The source code is available at GitHub](https://github.com/agektmr/webauthn-devtools). I'm also considering Safari and Firefox versions in the future. It is a handy tool for those interested in passkeys and WebAuthn for quick investigation and debugging. Please give it a try.
