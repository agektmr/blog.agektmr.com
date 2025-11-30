---
layout: post
lang: en
title: The Spectre threat and the headers websites should set
description: The emergence of Spectre has increased the security requirements for websites. We have summarized the types of attacks that Spectre can cause and the specific countermeasures that are required.
date: 2021-11-01
updated: 2021-11-04
image:
  feature: /2021/spectre1.png
tags:
  - Security
  - Spectre
translationOf: /2021/11/browser-security.html
translated: 2025-11-30
translatedManually: false
---
This is a long article, so I'll start with the conclusion.

The emergence of Spectre has increased the security requirements for websites. Specific measures required are as follows:

* All resources should use the `Cross-Origin-Resource-Policy` header to control loading into cross-origin documents.
* HTML documents should include the `X-Frame-Options` header or the `Content-Security-Policy` (CSP) header with the `frame-ancestors` directive to control embedding in an iframe in a cross-origin page.
* HTML documents should include the `Cross-Origin-Opener-Policy` header to control communication with cross-origin pages when opened as a popup window.
* All resources should include appropriate `Content-Type` and `X-Content-Type-Options: nosniff` headers to prevent malicious cross-origin loading.

<!-- excerpt -->

To understand why such a header is necessary and to understand the details, we first need to look at how modern browsers display web pages.

## A look back at how browsers work

Each tab in a browser has a URL that tells the user which page they are currently viewing. The URL displayed in a tab usually points to an HTML document, which represents the entire web page by loading various resources such as images, videos, stylesheets, scripts, and fonts. In this case, the domain of each resource does not necessarily match the domain of the currently viewed page.

In this case, the domain displayed in the URL bar is called the "first party," and any domain other than the first party of the loaded resource is called the "third party." (So, a "third-party cookie" is a cookie associated with a third-party resource.)

Regarding the relationship between two domains, if only the eTLD+1 (effective Top Level Domain and the one above = e.g. `example.com`) is the same, it is called same-site; if the scheme, hostname, and port number all match (e.g. `https://www.example.com:8080`), it is called same-origin; otherwise it is called cross-site or cross-origin.

In the rest of this article, we will explicitly use same-site/cross-site and same-origin/cross-origin, so if you are unsure about the difference between them, please start here.

{% Aside %}

Reference: [Understanding same-site/cross-site, same-origin/cross-origin](https://zenn.dev/agektmr/articles/f8dcd345a88c97)

{% endAside %}

The Web's greatest appeal is its composability, which allows you to combine various resources from different domains (services) like a puzzle to create rich expressions. Especially since Web 2.0, the concept of APIs has been added to this and further developed. For example:

* Implement analytics simply by loading a script and analyze or track the behavior of users who visit your site.
* Use iframes to embed information from external sites as widgets, and embed ads, social media buttons, personalizable maps, and videos.
* Communicate with external sites via popup windows to enable integration such as login and payment.

Cross-origin collaboration is what makes the web the web.

![](/images/2021/spectre1.png)

### Same-Origin Policy

By the way, one of the scary things about the online world is that information that you thought you had entrusted to the right place could end up in a place or be used by someone you didn't intend. This is especially serious if that information is credit card numbers or bank account information. In a web browser, the "right place" is represented in the form of a domain, and its reliability is guaranteed by using HTTPS.

Attackers can steal information from three main points: browsers, networks, and servers. Browser attacks can also be said to involve crossing domain barriers. The **Same-Origin Policy** allows different domains to communicate with each other on a browser while still maintaining a certain level of security for each site. This policy is based on a delicate balance between maintaining mutual inviolability at the origin boundary, while allowing some degree of communication.

Let's take an embedded video as an example. This cross-origin video is embedded in an iframe, allowing for personalization using third-party cookies. If the user is logged in to the hosting domain, they can access the account and perform actions like "watch later," which is convenient. However, unless a specific API is provided, the embedding site cannot access this account information. This is because navigating the DOM tree of the `window` object obtained from the iframe only provides limited information. It is impossible to see what HTML is being displayed, let alone the contents of cookies.

The same applies to windows opened as popup windows. For example, if a typical payment service is linked to a window opened using `window.open()` and the DOM tree is accessible, the store could eavesdrop on the user's credit card information. For this reason, browsers limit the information that can be accessed from the return value of `window.open()` and from `window.opener` of the opened window.

In this way, the browser's Same-Origin Policy prevents cross-origin scripts from accessing arbitrary information.

### Cross-Origin Resource Sharing (CORS)

By the way, when you research [Cross-Origin Resource Sharing](https://web.dev/cross-origin-resource-sharing/) (CORS), most articles describe it as "a mechanism for requesting resources hosted on cross-origin sites using `fetch()`." While that's true, not all of them are. In fact, CORS also plays a role in access control on the browser.

For example, when loading a cross-origin image into your page, you can simply use the `<img>` tag and not worry about CORS. There's no problem if the image is displayed on the page at the specified size and the user can view it. However, in this case, the browser uses the Same-Origin Policy to protect the image's contents (binary) from being viewed by cross-origin scripts. This is called an **Opaque Response**.

For example, if you try to get the binary of an image loaded from a cross-origin browser, and then try to retrieve it as `canvas`, [`drawImage()`](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/drawImage) and then [`getImageData()`](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/getImageData), Chrome will display the error `DOMException: Failed to execute 'getImageData' on 'CanvasRenderingContext2D': The canvas has been tainted by cross-origin data.` and fail. This is because the browser is protected by the Same-Origin Policy.

To enable this, you must explicitly allow it by specifying the `<img>` attribute with the `crossorigin` attribute and by supporting CORS on the server side.

I've created a simple demo, so give it a try.

In this way, the Same-Origin Policy ensures the security of the web to some extent by allowing browsers to control access between origins.

What is the Spectre threat?

Spectre is a vulnerability in the architecture of CPUs that was announced in 2018. Simply put, it allows values in memory space controlled by the same process to be inferred. Spectre makes it possible for cross-origin scripts to spy on resources that transcend the Same-Origin Policy, which poses a major threat given the nature of the web.

Once malicious JavaScript was loaded, an attacker could bypass the Same-Origin Policy and read any DOM element running in the same process. With the architecture of most browsers at the time, simply loading resources via an attacker's page could result in information theft. If the resources included authentication information or other information requiring authentication, even that information could be compromised.

![](/images/2021/spectre2.png)

### Measures taken by each browser

Spectre's ability to efficiently steal information by leveraging high-resolution timers has led browser vendors to disable functions related to high-resolution timers. A prime example of a function that became unavailable as a result of this was `SharedArrayBuffer`. Other measures taken included reducing the accuracy of `performance.now()`. However, these measures only reduced efficiency, and Google research has shown that completely eliminating the threat of Spectre would require fundamental changes to the browser's architecture.

### Site Isolation

That's where Site Isolation comes in. [Site Isolation](https://developers.google.com/web/updates/2018/07/site-isolation) was a project the Chrome team had been working on since before Spectre became known, to mitigate the risk of exploiting memory bugs to bypass the Same-Origin Policy. The discovery of Spectre accelerated the completion of this architecture, and it was released experimentally in May 2018.

Chrome originally created processes roughly on a tab-by-tab basis, but Site Isolation, as the name suggests, separates processes on a site-by-site basis to isolate cross-site resources and protect against Spectre threats. Specifically, it uses techniques such as [Cross-Origin Read Blocking (CORB)](https://www.chromium.org/Home/chromium-security/corb-for-developers) and [Out-of-process iframe (OOPIF)](https://www.chromium.org/developers/design-documents/oop-iframes). For more information, see the [Site Isolation page](https://www.chromium.org/developers/design-documents/site-isolation).

{% Aside %}

Actually, it would be more correct to say "separate the Browsing Context Group" rather than "separate the process," but for convenience we use the word "process" here.

{% endAside %}

Dividing processes into smaller ones incurs overhead, increasing memory consumption by about 10%, making it unsuitable for resource-scarce mobile devices. For this reason, Site Isolation is generally only enabled in desktop environments and for some mobile sites. This is why `SharedArrayBuffer` was available only in the desktop version of Chrome for a while.

The problem is that Site Isolation is a Chrome-specific architecture. Firefox is currently working on a project called Fission to introduce a Site Isolation architecture, but the web is built on standard technologies, so security cannot be guaranteed by assuming a specific architecture.

This is where the main topic comes in: HTTP response headers that require the browser to handle cross-origin resources appropriately, regardless of the browser architecture, such as by routing them to a separate process.

## Preventing Spectre attacks before they happen

To prevent Spectre attacks, you need to stop resources from your origin before they are pulled into the same process as a malicious origin. By looking at the HTTP response headers, the browser's network process can block the resource before it is passed to the malicious origin's renderer process, or pass it to a different renderer process.

If you open Chrome's Task Manager, you can see how processes are grouped by Process ID.

The four HTTP response headers that should be added are:

* `Cross-Origin-Resource-Policy`
* `X-Frame-Options` or CSP `frame-ancestors`
* `Cross-Origin-Opener-Policy: same-origin-allow-popups`
* `Content-Type` and `X-Content-Type-Options: nosniff`

### Controlling resource embedding with `Cross-Origin-Resource-Policy` (CORP)

You can allow resources to be loaded from `same-origin`, `same-site`, or from anywhere with `cross-origin`, such as images, videos, audio, scripts, and JSON via API. For example, adding the respective headers to an image hosted in `https://images.example.com` will result in the following:

```http
Cross-Origin-Resource-Policy: same-origin
```

This image can only be loaded from an HTML document served from the same-origin `https://images.example.com`.

```http
Cross-Origin-Resource-Policy: same-site
```

This image can be loaded from domains containing the same-site `example.com`, e.g. `https://www.example.com`, but not from other eTLD+1s, e.g. `https://site.example`.

```http
Cross-Origin-Resource-Policy: cross-origin
```

{% Aside %}

**Added 2021/11/04:** It was originally written as `cross-site`, but it was a mistake and should have been `cross-origin`.

{% endAside %}

Images with the default `cross-origin` can be loaded from any origin, not just `https://images.example.com` or `example.com`.

You can try these headers out in this demo. Open DevTools and see the impact of the `Cross-Origin-Resource-Policy` header.

[CORP](https://caniuse.com/mdn-http_headers_cross-origin-resource-policy) is already supported in Chrome, Firefox, and Safari.

{% Aside %}

Please note that CORP does not prevent a resource from being served. It is not like an ACL (Access Control List) on the server, and does not determine whether a resource will be served in response to a request from a browser that does not support CORP, or from another server, or from an HTTP client that is not a browser.

CORS is similar to CORP, but differs in that it allows for more granular determination of conditions and can choose not to serve requests depending on the origin ([Preflight Request](https://developer.mozilla.org/docs/Glossary/Preflight_request)).

{% endAside %}

Note that it's not a problem if publicly available resources are stolen. What's problematic is information served when authenticated, which often requires a third-party cookie. If you set the appropriate `SameSite` attribute, even if you fall victim to Spectre, no authenticated requests will be sent.

Fortunately, the default `SameSite` attribute for cookies in Chrome and Edge is `Lax`. If you are a service provider who has inadvertently set `SameSite` to `None`, we recommend that you review your settings in conjunction with the introduction of the CORP header.

### Control document iframe embedding with `X-Frame-Options` or CSP `frame-ancestors`

As of October 2021, all browsers allow embedding HTML documents in iframes by default, and resource providers must take appropriate action to prevent this.

To prevent cross-origin sites from loading in an iframe, you can either block them entirely using the `X-Frame-Options` header, or explicitly specify which origins are allowed to be embedded using the `frame-ancestors` CSP (Content Security Policy) header directive.

```http
X-Frame-Options: DENY
```

HTML documents with `DENY` will not be loaded in an iframe regardless of the parent page's origin. You can also set this to `SAMEORIGIN` to load in an iframe only if the parent page is the same-origin.

```http
Content-Security-Policy: frame-ancestors 'self' https://www.example.com;
```

An HTML document with the above CSP specified will not be loaded in an iframe unless the parent page has the same origin as the original or is `https://www.example.com`.

It is recommended that all documents that are not intended to be loaded in an iframe use `X-Frame-Options: DENY`.

Both [`X-Frame-Options`](https://caniuse.com/x-frame-options) and [CSP `frame-ancestors`](https://caniuse.com/mdn-http_headers_csp_content-security-policy_frame-ancestors) are already supported by Chrome, Firefox, and Safari.

### Controlling communication between windows with `Cross-Origin-Opener-Policy` (COOP)

Windows opened using `window.open()` can communicate with each other using `postMessage()`. In this case, even if the browser is cross-origin, it is deployed in the same process, making it vulnerable to Spectre attacks.

By using the `Cross-Origin-Opener-Policy` (COOP) header, you can ensure safety by separating processes when opening cross-origin windows. However, please note that in this case, communication using `postMessage()` will no longer be possible.

```http
Cross-Origin-Opener-Policy: same-origin
```

If you specify `same-origin`, even if you open a cross-origin popup window yourself or if a document from your origin is opened from a cross-origin window, they will be in separate processes and communication will be impossible.

```http
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

`same-origin-allow-popups` separates processes when opened from a cross-origin window, but not when you open the cross-origin window yourself (however, the cross-origin window must not specify COOP or must specify `unsafe-none`).

```http
Cross-Origin-Opener-Policy: unsafe-none
```

`unsafe-none` is the default, and can be used to specify that a separate process is not required when opening a cross-origin window or when opening a cross-origin window (provided that the cross-origin window does not specify COOP or specifies `unsafe-none`).

You can try out these headers in this demo:

{% Aside %}

Similar to `Cross-Origin-Opener-Policy: same-origin` is `a[rel="noopener"]`. This also serves to avoid the risk of Spectre, which occurs because new windows opened with the `<a target="_blank">` tag are opened in the same process by default. Fortunately, `rel="noopener"` has now been changed to the default in [Chrome](https://www.chromestatus.com/feature/6140064063029248), [Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=1503681), and [Safari](https://bugs.webkit.org/show_bug.cgi?id=190481), so you no longer need to worry about it. Conversely, to achieve the same result as `Cross-Origin-Opener-Policy: unsafe-none`, specify `rel="opener"`.

Reference: [Preventing Tabnabbing by Adding rel=noopener to Links | blog.jxck.io](https://blog.jxck.io/entries/2016-06-12/noopener.html)

{% endAside %}

While COOP can protect your site from Spectre attacks from cross-origin windows, you still need to be careful with pages that use features that require cross-origin windows to be opened, such as OAuth or payment functions. We recommend adding `Cross-Origin-Opener-Policy: same-origin-allow-popups` to all HTML documents. (For debugging instructions, see [Making your website "cross-origin isolated" using COOP and COEP // Debug issues using Chrome DevTools](https://web.dev/coop-coep/#debug-issues-using-chrome-devtools).)

[COOP](https://caniuse.com/mdn-http_headers_cross-origin-opener-policy) is already supported in Chrome and Firefox, and [it appears that support for Safari will be coming soon (as of October 2021)](https://webkit.org/blog/11962/release-notes-for-safari-technology-preview-131/).

### Protect resources from malicious cross-origin loading with `X-Content-Type-Options: nosniff`

Some browsers may automatically change the MIME-Type from the resource content and load it into the page, even if `Content-Type` is set, which is a known vulnerability. This can be used as a means to load resources into the same page process, making it applicable to Spectre attacks. Specifying `X-Content-Type-Options: nosniff` will prevent the browser from doing this. Be sure to specify the appropriate `Content-Type` header and `X-Content-Type-Options: nosniff`.

```http
X-Content-Type-Options: nosniff
```

`X-Content-Type-Options` is available in all browsers, including IE.

## A story of the future

I've tried to simplify this complex topic as much as possible, but I don't think it's realistic for every web developer to understand and implement these headers. It would be great if browsers could do it automatically. But that would mean completely reversing the current default behavior, which is:

* Disable embedding of cross-origin HTML documents by default = `X-Frame-Options: DENY` default.
* Disable communication with cross-origin popup windows by default = `Cross-Origin-Opener-Policy: same-origin-allow-popups` default.

The Chrome team is working to make this a reality, but reversing the default is a disruptive change. We understand that this is an unavoidable step in making the web a safer place, and we hope that as many developers as possible will understand this and begin preparing little by little.

Additionally, the content explained in this article will be made available as a session video at Google I/O 2021. It will also have Japanese subtitles, so please take a look.

{% YouTube 'J6BZ9IQELNA' %}

{% Aside %}

This article touched on some of the HTTP headers related to Spectre, but there are a few other important ones. Please refer to this page for a summary.

* [Security headers quick reference](https://web.dev/security-headers/):

Also, [Mike West](https://twitter.com/mikewest)'s Post-Spectre Web Development is a more practical take on the topics discussed in this article, broken down by use case.

* [Post-Specter Web Development](https://www.w3.org/TR/post-spectre-webdev/)

{% endAside %}

*The illustrations for this article were created by [@kosamari](https://twitter.com/kosamari).
