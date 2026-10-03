---
layout: post
lang: en
title: A Talk on SharedArrayBuffer and Transitional Cross-Origin Isolation
description: "This article explains cross-origin isolation, which uses standard technologies to enable `SharedArrayBuffer` and high-resolution timers in browsers in the post-Spectre web, along with its challenges and current solutions."
date: 2021-11-04
updated: 2021-12-26
image:
  feature: /2021/require-corp.png
tags:
  - Security
  - Cross-origin isolation
  - SharedArrayBuffer
  - Spectre
translationOf: /2021/11/cross-origin-isolation.html
translated: 2026-10-03
translatedManually: false
---
{% Aside %}

**2021/12/26:** [Safari also supports `SharedArrayBuffer` using COOP/COEP starting from 15.2](https://developer.apple.com/documentation/safari-release-notes/safari-15_2-release-notes), so the relevant descriptions have been updated.

{% endAside %}

This is a long article, so let's start with the conclusion.

`SharedArrayBuffer` and high-resolution timers are now available in Chrome, Firefox, and Safari. To use them, you need to enable a state called cross-origin isolation by sending the following two headers with the parent HTML document:

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

However, enabling this comes with various conditions and constraints, and most sites will struggle with it at this stage. If your goal for now is simply to keep things running in Chrome as they have been, registering for a [Deprecation Trial](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) and taking a wait-and-see approach might be the safest bet.

<!-- excerpt -->

## The Threat of Spectre, Browser Mitigations, and Site Isolation

In the [previous article](/2021/11/browser-security.html), I explained that the threat of Spectre puts cross-origin loaded resources at risk by allowing the inference of memory space handled by the same process. Browsers mitigated this risk by disabling `SharedArrayBuffer` and reducing the precision of high-resolution timers, while some browsers introduced an architectural approach called Site Isolation for a more fundamental fix. I also discussed how standardized web platform features can isolate resources from attacks by cross-origin pages to ensure security. Specifically, by using HTTP headers such as CORP, `X-Content-Type-Options`, `X-Frame-Options`, CSP `frame-ancestors`, and COOP, resources are protected before they ever reach the renderer process.

Browsers that adopted Site Isolation re-enabled `SharedArrayBuffer` and high-resolution timers. However, even if all browsers supported Site Isolation, would it be healthy for the web if the availability of these features depended on underlying browser architecture?

This is where **cross-origin isolation** comes in. By combining several HTTP headers, the browser determines that it is in an environment completely severed from other origins (cross-origin isolated), which enables `SharedArrayBuffer`, high-resolution timers, and other powerful capabilities.

In this article, I will explain how to enable cross-origin isolation, the challenges it presents, and what the next steps look like.

## What Becomes Possible in a Cross-Origin Isolated Environment

Enabling cross-origin isolation unlocks the following capabilities:

* [`SharedArrayBuffer` becomes available (enabling Wasm Threads)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/Planned_changes)
* [`performance.measureUserAgentSpecificMemory()` becomes available](https://web.dev/monitor-total-page-memory-usage/)
* [The resolution of `performance.now()` and `performance.timeOrigin` is increased](https://developer.chrome.com/blog/cross-origin-isolated-hr-timers/)

Chrome had temporarily allowed `SharedArrayBuffer` and high-resolution timers based on Site Isolation, but [starting in Chrome 92, this prerequisite was removed (aligning conditions with other browsers), requiring cross-origin isolated status instead](https://developer.chrome.com/blog/enabling-shared-array-buffer/) (and [sorry for the commotion back then](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja)).

## Enabling Cross-Origin Isolation Using Standardized Technologies

To enable cross-origin isolation—confirming that a web page is in a secure environment completely isolated from other origins—there are currently two requirements.

### Condition 1: The HTML document sends a `Cross-Origin-Opener-Policy: same-origin` header

When a browser opens a new window with `window.open()`, it uses the same process even across origins to maintain communication channels such as `postMessage()`. In the [previous article](/2021/11/browser-security.html#cross-origin-opener-policy-(coop)-%E3%81%A7%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E9%96%93%E3%81%AE%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B), I introduced how using the COOP header can split processes to avoid the threat of Spectre. By setting `COOP: same-origin`, the opened window will be placed in a separate process unless it is same-origin, thereby guaranteeing safety.

```http
Cross-Origin-Opener-Policy: same-origin
```

However, keep in mind that this disables bidirectional communication via `postMessage()`.

This is Condition 1 for enabling cross-origin isolation.

### Condition 2: The HTML document sends a `Cross-Origin-Embedder-Policy: require-corp` header

The `Cross-Origin-Embedder-Policy` (COEP) header, which did not appear in the previous article, is not in itself designed to provide security directly. **COEP is intended to eliminate vulnerable resources by blocking all unauthorized resource embeddings, thereby achieving cross-origin isolation.** Specifying `COEP: require-corp` will block any resource that has not explicitly granted permission to be loaded into this page via CORS or CORP.

```http
Cross-Origin-Embedder-Policy: require-corp
```

This is Condition 2 for enabling cross-origin isolation.

![COEP: require-corp](/images/2021/require-corp.png)

### Checking If You Are Cross-Origin Isolated

You can check whether a web page sending the two headers above is in a cross-origin isolated state by using `self.crossOriginIsolated`. It returns `true` if cross-origin isolated, and `false` otherwise.

```js
if (self.crossOriginIsolated) {
  // The environment is cross-origin isolated.
} else {
  // The environment is NOT cross-origin isolated.
}
```

You can try out cross-origin isolation in [this demo](https://first-party-test.glitch.me/).

## Wait, Resources Are Being Blocked?!

If it ended here, things would be very simple—but this is where the real challenge begins. As those who have tried cross-origin isolation may have noticed, doing only this will completely break an ordinary website. That is because any cross-origin resource without special handling will be blocked. To load cross-origin or same-site cross-origin resources, you must explicitly configure CORS or CORP to signal that loading them from cross-origin contexts is safe.

{% Aside %}

Reference: [same-site/cross-site, same-origin/cross-origin をちゃんと理解する](https://zenn.dev/agektmr/articles/f8dcd345a88c97)

{% endAside %}

### Adding CORS or `Cross-Origin-Resource-Policy` Headers to Resources

{% Aside %}

Here, "resources" refers to everything that can be loaded from an HTML document, including documents, images, videos, fonts, scripts, and stylesheets.

{% endAside %}

[As introduced in the previous article](/2021/11/browser-security.html#cross-origin-resource-policy-(corp)-%E3%81%A7%E3%83%AA%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B), CORP indicates whether a resource can be loaded: only from same-origin if set to `same-origin`, only from same-site if set to `same-site`, or from any origin if set to `cross-origin`.

For example, when `https://www.example.com` sends `COEP: require-corp`, an image can be loaded if it supports CORS, or under the following conditions:

* If served from the same origin, it is loaded unconditionally (having `CORP: same-origin` is also fine).
* If served from the same site (e.g., `https://images.example.com/image.png`), it is loaded if it has `CORP: same-site` or `CORP: cross-origin`. Otherwise, it is blocked.
* If served from a completely different site, it is loaded only if it has `CORP: cross-origin`. Otherwise, it is blocked.

```http
Cross-Origin-Resource-Policy: cross-origin
```

When using CORS, the resource request must explicitly ask for it. Specifically, adding the `crossorigin` attribute to an `<img>` tag, for instance, sends a CORS request.

```html
<img src="***/image.png" crossorigin>
```

[The `crossorigin` attribute can be added to `<audio>`, `<img>`, `<link>`, `<script>`, and `<video>` tags.](https://developer.mozilla.org/docs/Web/HTML/Attributes/crossorigin)

You can test how COEP and CORS/CORP interact in this [demo](https://first-party-test.glitch.me/coep).

### Adding COEP to HTML Documents Loaded in iframes

[As mentioned in the previous article](/2021/11/browser-security.html#x-frame-options-%E3%81%BE%E3%81%9F%E3%81%AF-csp-frame-ancestors-%E3%81%A7%E3%83%89%E3%82%AD%E3%83%A5%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE-iframe-%E5%9F%8B%E3%82%81%E8%BE%BC%E3%81%BF%E3%82%92%E5%88%B6%E5%BE%A1%E3%81%99%E3%82%8B), HTML documents loaded inside an iframe are also exposed to the threat of Spectre if they are cross-origin. But what happens if that cross-origin HTML document further loads cross-origin resources or documents?

In fact, unless the requirements are met recursively, everything will be blocked. To embed an iframe, the embedded document itself also requires `COEP: require-corp`.

To summarize, when embedding a cross-origin HTML document via an iframe into a cross-origin isolated page, the HTML document loaded into that iframe must also have:

* `COEP: require-corp`
* `CORP: cross-origin` (or `CORP: same-site` if it is same-site / cross-origin)

{% Aside %}

* In this case, `self.crossOriginIsolated` inside the iframe will be `false`, but setting `allow="cross-origin-isolated"` on the iframe tag makes it `true`, allowing the use of `SharedArrayBuffer` and other features.
* You might want to enable cross-origin isolation only inside an iframe, but unfortunately, there is no way to do that. All frames on the same page must be part of the top-level frame's cross-origin isolation.

{% endAside %}

You can also test iframes using this [demo](https://first-party-test.glitch.me/coep).

{% Aside %}

Everything covered up to this point is already supported across all major browsers: Chrome, Edge, Firefox, and Safari.

{% endAside %}

## Challenges of Cross-Origin Isolation and Countermeasures

If you fully execute everything described above, `SharedArrayBuffer` and other features will become available in the browser.

However, challenges still remain:

* **Challenge 1: `COOP: same-origin` breaks popup window integrations like OAuth and payments.**
Due to the nature of `COOP: same-origin`, common integrations that open cross-origin windows to communicate—such as OAuth or payment flows—will cease to work.
* **Challenge 2: You cannot specify CORS or `CORP: cross-origin` on resources provided by third parties.**
This is another classic problem with cross-origin isolation.

For example, while many resources served by Google already support `CORP: cross-origin`, some services do not support cross-origin isolation due to the challenges mentioned above. Google Ads, for instance, delivers advertisements using iframes, and in some cases the content inside the iframe is served by advertisers. Because demanding CORS or CORP adoption across all of them is unrealistic, [they have indicated they will not support it](https://developers.google.com/publisher-tag/guides/cross-origin-embedder-policy).

Given this situation, Chrome provides a way to re-enable `SharedArrayBuffer` without cross-origin isolation, while discussions are underway on the web standards side to relax the conditions for enabling cross-origin isolation.

### Enabling `SharedArrayBuffer` in Chrome Without Cross-Origin Isolation

As explained earlier, Chrome originally supported the Site Isolation architecture, and the transition to cross-origin isolation was made to stay in sync with other browsers. However, due to the issues outlined above, an option is provided to continue using `SharedArrayBuffer` without supporting cross-origin isolation. By applying a mechanism called a [Deprecation Trial](https://developer.chrome.com/ja/blog/origin-trials/#deprecation-trials), you can continue to use `SharedArrayBuffer` as before, at least until the solutions described below are ready.

{% Aside %}

Reference: [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)

As of November 2021, the post states this can be worked around via the deprecation trial until Chrome 103, but it may be extended if the solutions below are not ready in time. You will likely be notified by email if an extension occurs if you have signed up for the Origin Trial, and the blog post above will be updated (even if this blog post is not).

{% endAside %}

To register for the deprecation trial, [apply here by specifying your origin](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481), and deliver the issued token via an `Origin-Trial` header or a `<meta>` tag on your site. For details, see [Getting started with Chrome's origin trials](https://developer.chrome.com/ja/blog/origin-trials/).

### Relaxing the Requirements for Cross-Origin Isolation

Efforts are also underway from a standards perspective to make cross-origin isolation more flexible. Here are the proposed specifications being worked on.

#### `COEP: credentialless`

While requiring CORS or CORP support from resources provided by other services is difficult, is it really necessary in the first place? Most resources are public assets like images, styles, and fonts available on the internet. Anyone can download them as long as they know the URL; if they need protection, authentication should be applied.

If so, rather than making CORS or CORP mandatory, why not create a mode based on making requests without credentials? That is how `COEP: credentialless` was conceived.

```http
Cross-Origin-Embedder-Policy: credentialless
```

With `COEP: credentialless`, credentials such as cookies, client certificates, and Authorization headers are stripped from requests to the server. This enables cross-origin isolation without putting third-party resources at risk.

{% Aside %}

Even with `COEP: credentialless`, you can still explicitly send credentials by making requests with the `crossorigin` attribute attached.

Reference: [Load cross-origin resources without CORP headers using `COEP: credentialless`](https://developer.chrome.com/blog/coep-credentialless-origin-trial/)

{% endAside %}

Currently, this is only available in Chrome, starting with version 96.

![COEP: credentialless](/images/2021/credentialless.png)

#### anonymous iframe

Based on the same concept, [anonymous iframes are being explored](https://github.com/camillelamy/explainers/blob/master/anonymous_iframes.md) to avoid putting third-party resources at risk by not sending credentials for iframes either. However, because iframes are architecturally complex within browsers, this is currently under active development, including the specification itself.

#### `COOP: same-origin-allow-popups-plus-coep`

Mitigations are also being considered for the issue where `COOP: same-origin` breaks popup-based integrations like OAuth and payments. The idea is that since `COOP: same-origin-allow-popups` allows communication with windows opened from your own origin, perhaps this could serve as a condition for cross-origin isolation instead.

A dedicated mode, [`COOP: same-origin-allow-popups-plus-coep`, is being explored](https://github.com/camillelamy/explainers/blob/master/coi-with-popups.md) for this purpose, though it is still in the early stages of discussion.

## Summary

This article has covered how to enable cross-origin isolation in browsers to use `SharedArrayBuffer` and high-resolution timers, but there are many things to consider and it is quite complex.

If you need your site to work in Firefox and Safari right away, one option is to accept giving up certain cross-origin integrations and enable cross-origin isolation. However, if your immediate goal is simply to keep things running in Chrome as before, registering for the [Deprecation Trial](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) and waiting to see how things develop is likely the best course of action right now.

The content explained in this article was also presented as a session video at Chrome Dev Summit 2020:

{% YouTube 'XLNJYhjA-0c' %}

Finally, on November 17, I will be hosting an approximately one-hour workshop as part of [Chrome Dev Summit](https://goo.gle/cds2021), covering the full journey from Spectre to Site Isolation and cross-origin isolation:

* [Gain security and powerful features with cross-origin isolation](https://developer.chrome.com/devsummit/events/week-2/workshops/gain-security-powerful-features-cross-origin-isolation/)

If you have questions or want to discuss anything, please join! (The session will primarily be in English.)

### References

* [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
* [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
* [クロスオリジンアイソレーションを有効にするためのガイド](https://web.dev/i18n/ja/cross-origin-isolation-guide/)
* [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)
* [SharedArrayBuffer オブジェクトに関するメッセージについての説明](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja)
* [Chrome 92以降のSharedArrayBuffer警告に対するZOZOTOWNが実施した調査と解決策](https://techblog.zozo.com/entry/zozotown-shared-array-buffer)
