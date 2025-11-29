---
layout: post
lang: en
title: 'SharedArrayBuffer and the transitional story of cross-origin isolation'
description: 'This article explains cross-origin isolation, which uses standard technologies to enable `SharedArrayBuffer` and high-resolution timers in browsers on the Spectre-prevented web, as well as the challenges and current solutions.'
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
translated: 2025-11-29
translatedManually: false
---

{% Aside %}

**2021/12/26:** [Safari also now supports `SharedArrayBuffer` using COOP/COEP from version 15.2](https://developer.apple.com/documentation/safari-release-notes/safari-15_2-release-notes), so we have changed the notation in the relevant section.

{% endAside %}

This is a long article, so I'll start with the conclusion.

Chrome, Firefox, and Safari now support `SharedArrayBuffer` and high-resolution timers. To do so, enable cross-origin isolation, which sends the following two headers to the parent HTML document:

```http
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

However, there are various conditions and restrictions to enable this, and many sites will struggle at this stage. If you just want to continue using Chrome as usual for the time being, it may be a safe option to sign up for the [Deprecation Trial](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) and see how it goes for a while.

<!-- excerpt -->

Spectre threats, browser countermeasures, and site isolation

In our previous article, we discussed the Spectre threat, which exposes cross-origin resources by inferring the memory space used by the same process. We noted that browsers have mitigated the risk by disabling `SharedArrayBuffer` or reducing the precision of high-resolution timers. We also noted that some browsers have implemented a more fundamental solution by introducing an architecture called Site Isolation. We also noted that standardized features can isolate resources from cross-origin page attacks and ensure their safety. Specifically, various HTTP headers, such as CORP, `X-Content-Type-Options`, `X-Frame-Options`, CSP `frame-ancestors`, and COOP, are used to protect resources before they reach the renderer process.

Browsers that adopt Site Isolation can now use `SharedArrayBuffer` and high-resolution timers again, but even if all browsers support Site Isolation, is it healthy for the web if these features are only available or unavailable depending on the architecture?

That's where cross-origin isolation comes in. It's a combination of HTTP headers that allows the browser to determine that it is in a safe environment (cross-origin isolated) from other origins, enabling things like `SharedArrayBuffer` and high-resolution timers.

This article explains how to enable cross-origin isolation, the challenges it poses, and next steps.

## What is possible in a cross-origin isolated environment?

Enabling cross-origin isolation allows you to:

* [`SharedArrayBuffer` can now be used (Wasm Threads can now be used)](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/Planned_changes)
* [`performance.measureUserAgentSpecificMemory()` can now be used](https://web.dev/monitor-total-page-memory-usage/)
* [`performance.now()` and `performance.timeOrigin` have improved accuracy](https://developer.chrome.com/blog/cross-origin-isolated-hr-timers/)

For a while, Chrome introduced Site Isolation to enable the use of `SharedArrayBuffer` and high-resolution timers, but [starting with Chrome 92, this requirement was removed (changing the conditions to be the same as other browsers) and the condition was changed to require cross-origin isolated mode](https://developer.chrome.com/blog/enabling-shared-array-buffer/) (we're sorry for the inconvenience this caused](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja)).

## Enabling cross-origin isolation using standardized techniques

There are currently two conditions for enabling cross-origin isolation, a secure environment where web pages are completely isolated from other origins:

### Condition 1. The HTML document sends the `Cross-Origin-Opener-Policy: same-origin` header

When a browser opens a new window with `window.open()`, it maintains communication using `postMessage()` etc., so it uses the same process even cross-origin. In our previous article, we discussed how using COOP headers to separate processes and prevent Spectre We have introduced a method to avoid this threat. If you set `COOP: same-origin`, the opened window will be opened in a separate process unless it is of the same origin, ensuring safety.

```http
Cross-Origin-Opener-Policy: same-origin
```

However, it should be noted that this means that communication using `postMessage()` will no longer be possible.

This is condition 1 for enabling cross-origin isolation.

Condition 2. The HTML document sends the `Cross-Origin-Embedder-Policy: require-corp` header

The header `Cross-Origin-Embedder-Policy` (COEP), which was not mentioned in the previous article, is not intended for security purposes in itself. **COEP eliminates all embedded resources that are not permitted, thereby eliminating exposed resources and achieving cross-origin isolation.** Specifying `COEP: require-corp` will block all resources that are not explicitly permitted by CORS or CORP from being loaded on this page.

```http
Cross-Origin-Embedder-Policy: require-corp
```

This is condition 2 for enabling cross-origin isolation.

![COEP: require-corp](/images/2021/require-corp.png)

### Check for cross-origin isolated

You can check whether a web page that sends the above two headers is cross-origin isolated by checking `self.crossOriginIsolated`. If it returns `true`, it is cross-origin isolated, and if it returns `false`, it is not.

```js
if (self.crossOriginIsolated) {
  // The environment is cross-origin isolated.
} else {
  // The environment is NOT cross-origin isolated.
}
```

You can try out cross-origin isolation in this demo.

## Resources are blocked!?

It would be very easy if it ended here, but the difficult part begins from here. If you have actually tried cross-origin isolation, you will notice that this alone completely breaks normal websites. This is because all cross-origin resources that do not have special treatment are blocked. To load cross-origin or same-site cross-origin resources, you need to explicitly configure CORS or CORP to indicate that it is okay for them to be loaded from cross-origin.

{% Aside %}

Reference: [Understanding same-site/cross-site, same-origin/cross-origin](https://zenn.dev/agektmr/articles/f8dcd345a88c97)

{% endAside %}

### Add CORS or `Cross-Origin-Resource-Policy` headers to resources

{% Aside %}

"Resources" here refers to anything that can be loaded from an HTML document, such as documents, images, videos, fonts, scripts, styles, etc.

{% endAside %}

As mentioned in our previous post, CORP indicates that resources can only be loaded from the same origin (`same-origin`), same-site (`same-site`), or any origin (`cross-origin`).

For example, if `https://www.example.com` sends `COEP: require-corp`, the condition for loading an image is CORS-enabled, or:

* If it is served from the same origin, it will be loaded unconditionally (`CORP: same-origin` may be specified).
* If it is served from the same site (e.g. `https://images.example.com/image.png`), it will be loaded if it has `CORP: same-site` or `CORP: cross-origin`. Otherwise it will be blocked.
* If it is served from a completely different site, it will be loaded if it has `CORP: cross-origin`. Otherwise it will be blocked.

```http
Cross-Origin-Resource-Policy: cross-origin
```

If you want to use CORS, you need to require it when loading a resource, for example by adding the `crossorigin` attribute to the `<img>` tag to send a CORS request.

```html
<img src="***/image.png" crossorigin>
```

[`crossorigin` attribute can be added to `<audio>`, `<img>`, `<link>`, `<script>`, `<video>` tags](https://developer.mozilla.org/docs/Web/HTML/Attributes/crossorigin)

You can try out the combined functionality of COEP and CORS/CORP in this demo.

### Add COEP to the HTML document loaded in the iframe

As I mentioned in my previous article, HTML documents loaded in an iframe are also vulnerable to the Spectre threat if they are cross-origin. But what happens if that cross-origin HTML document also loads other cross-origin resources or documents?

In fact, if you don't meet the requirements recursively, everything will be blocked. Embedding an iframe requires that it itself has `COEP: require-corp` .

In summary, if you embed a cross-origin HTML document in an iframe on a cross-origin isolated page, the HTML document loaded in that iframe must also:

* Must be `COEP: require-corp`
* Must be `CORP: cross-origin` (`CORP: same-site` is also acceptable for same-site/cross-origin)

It will be.

{% Aside %}

* In this case, `self.crossOriginIsolated` within the iframe will become `false`, but by specifying `allow="cross-origin-isolated"` in the iframe tag, it will become `true`, allowing you to use `SharedArrayBuffer` etc.
* There may be cases where you want to enable cross-origin isolation only within an iframe, but unfortunately there is no way to do this. All frames on the same page must be part of the cross-origin isolation of the parent frame.

{% endAside %}

You can also try out the iframe demo here:

{% Aside %}

The above is already supported by all major browsers: Chrome, Edge, Firefox, and Safari.

{% endAside %}

## Challenges of cross-origin isolation and solutions

If you follow the above steps completely, you will have `SharedArrayBuffer` etc available in your browser.

However, there are still challenges remaining.

* **Issue 1. `COOP: same-origin` breaks integrations that use popup windows, such as OAuth and payments. ** 
Due to the nature of `COOP: same-origin`, integrations common with OAuth and payments, which open cross-origin windows for communication, become impossible. 
* **Issue 2. Even if you try to specify CORS or `CORP: cross-origin`, you can't do so because they are resources from other companies. ** 
This is also a typical problem with cross-origin isolation.

For example, while many resources delivered by Google already support `CORP: cross-origin`, some services do not support cross-origin isolation due to the challenges mentioned above. For example, Google Ads delivers ads using iframes, but in some cases the content of the iframes is delivered by the advertiser. Since it is not realistic to require all of them to implement CORS or CORP, they have [indicated their intention not to support it](https://developers.google.com/publisher-tag/guides/cross-origin-embedder-policy).

In light of these developments, discussions are underway to re-enable `SharedArrayBuffer` in Chrome without cross-origin isolation, and to relax the conditions for enabling cross-origin isolation from the standard specification side.

### Enabling `SharedArrayBuffer` without cross-origin isolation in Chrome

I explained that Chrome originally supported an architecture called Site Isolation, and that the transition to cross-origin isolation was made to align with other browsers. However, due to the issues mentioned above, there is also an option to continue using `SharedArrayBuffer` without supporting cross-origin isolation. By applying a mechanism called [Deprecation Trial](https://developer.chrome.com/ja/blog/origin-trials/#deprecation-trials), you can continue to use `SharedArrayBuffer` as before, at least until the improvements described below are ready.

{% Aside %}

Reference: [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)

As of November 2021, the deprecation trial can be used to avoid the issue up to Chrome 103, but if the following improvements are not implemented in time, it may be extended. If you signed up for the Origin Trial, you will be notified by email whether the trial will be extended, but we will update the blog post above (even if this blog post is not updated).

{% endAside %}

To sign up for a deprecation trial, [apply here and specify your origin](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) and distribute the issued token in the `Origin-Trial` header or `<meta>` tag on your site. For more information, see [Introduction to Chrome Origin Trials](https://developer.chrome.com/ja/blog/origin-trials/), which has just been translated into Japanese.

### Relaxing cross-origin isolation requirements

Efforts are also underway to make cross-origin isolation more flexible from a standardization perspective. We will introduce the proposed specifications for this purpose.

#### `COEP: credentialless`

The challenge is that it is difficult to require resources provided by other services to comply with CORS or CORP, but is that even necessary? Many resources are images, styles, fonts, and other resources that are publicly available on the Internet. Anyone can download them if they know the URL, so authentication should be required to protect them.

So, instead of requiring CORS or CORP as a COEP mode, it would be better to create a mode that assumes requests are made without authentication, and that's how `COEP: credentialless` was devised.

```http
Cross-Origin-Embedder-Policy: credentialless
```

`COEP: credentialless` omits authentication methods such as cookies, client certificates, and Authorization headers from requests to the server, allowing you to enable cross-origin isolation without exposing third-party resources to risk.

{% Aside %}

Even in the case of `COEP: credentialless`, you can explicitly send authentication information by adding the `crossorigin` attribute to the request.

Reference: [Load cross-origin resources without CORP headers using `COEP: credentialless`](https://developer.chrome.com/blog/coep-credentialless-origin-trial/)

{% endAside %}

Only available in Chrome from version 96.

![COEP: credentialless](/images/2021/credentialless.png)

#### anonymous iframe

Following a similar approach, we are considering an anonymous iframe method that does not send authentication information to iframes, thereby not putting third-party resources at risk. However, due to the complexity of iframe architecture, the specifications are currently under development.

#### `COOP: same-origin-allow-popups-plus-coep`

A mitigation is also being considered for the issue where using `COOP: same-origin` breaks popup window integrations such as OAuth and payments. The idea is that using `COOP: same-origin-allow-popups` allows communication with windows opened from your own origin, so it might be a good idea to make this a condition for cross-origin isolation.

A dedicated mode for this purpose, [`COOP: same-origin-allow-popups-plus-coep`](https://github.com/camillelamy/explainers/blob/master/coi-with-popups.md), is being considered, but is still in the early stages of development.

## summary

This article has explained how to enable cross-origin isolation in browsers and use `SharedArrayBuffer` and high-resolution timers, but it's quite complicated and requires a lot of thought.

If you want it to work on Firefox or Safari right away, you could consider giving up on cross-origin resource integration to some extent and enabling cross-origin isolation. However, if you just want it to work on Chrome as usual for the time being, the best option for now is to sign up for a [deprecation trial](https://developer.chrome.com/origintrials/#/view_trial/303992974847508481) and see how it goes for a while.

The content explained in this article was released as a session video at the Chrome Dev Summit in 2020.

{% YouTube 'XLNJYhjA-0c' %}

Finally, on November 17th, as part of the Chrome Dev Summit, we will be hosting a one-hour workshop that will explain the journey from Spectre to Site Isolation and cross-origin isolation.

* [Gain security and powerful features with cross-origin isolation](https://developer.chrome.com/devsummit/events/week-2/workshops/gain-security-powerful-features-cross-origin-isolation/)

If you have any questions, please feel free to join us (sessions will mainly be in English).

### Reference articles

* [Making your website "cross-origin isolated" using COOP and COEP](https://web.dev/coop-coep/)
* [Why you need "cross-origin isolated" for powerful features](https://web.dev/why-coop-coep/)
* [Guide to enabling cross-origin isolation](https://web.dev/i18n/ja/cross-origin-isolation-guide/)
* [SharedArrayBuffer updates in Android Chrome 88 and Desktop Chrome 92](https://developer.chrome.com/blog/enabling-shared-array-buffer/)
* [Explanation of messages regarding SharedArrayBuffer objects](https://developers.google.com/search/blog/2021/03/sharedarraybuffer-notes?hl=ja)
* [ZOZOTOWN's research and solution for SharedArrayBuffer warnings in Chrome 92 and later](https://techblog.zozo.com/entry/zozotown-shared-array-buffer)
