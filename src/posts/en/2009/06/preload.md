---
title: Preload to Improve Gadget Rendering Speed
layout: post
lang: en
date: 2009-06-17
categories:
  - OpenSocial
translationOf: /2009/06/preload.html
translated: 2026-10-03
translatedManually: false
---
In this post, I will explain Preload in OpenSocial—a feature about which there is relatively little information online.

## The Gadget Rendering Flow

Let's use a gadget that simply displays an RSS feed as an example. When displaying this gadget within a container SNS, the following steps take place:

1.  The container SNS renders.
2.  The gadget server renders the gadget.
3.  The gadget's JavaScript initializes in the browser.
4.  An Ajax request to fetch the external site's RSS feed is sent to the gadget server.
5.  The gadget server sends a request to the external server (skipped if a cache exists).
6.  The gadget server returns the response to the browser.
7.  The gadget's JavaScript in the browser renders the list of articles based on the response content.

![rendering without
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgoAGA0tPgASBzogcmVuZGVyaW5nIGcAQgUKbm90ZSBvdmVyADUIOiBKUyBpbml0KCkKAEkHLT4AZw06IHJlcXVlc3QgZXh0ZXJuYWwgY29udGVudAphY3RpdmF0ZSAAgRgNAH4QAIFRDQBECgA0EQCBeQ0KAIIHDS0AgQETc3BvbnNlAIEDCWRlADIXAIICGgA7BwCBRhEAQAsAgUsOAIIrEwCCWQk&s=napkin)

That is roughly how it works.

If you are unfamiliar with how an OpenSocial container operates, this might be a bit hard to follow. Please refer to [this article](http://devlog.agektmr.com/archives/363).

Now, there is a way to make the overall perceived rendering speed faster by streamlining this sequence of events. That is Preload, which I will introduce in this post.

## Preload: Speeding Up Gadget Rendering

Preload does literally what its name suggests: it loads content in advance of rendering. It is easy to use—simply specify the URL you want to call in `/Module/ModulePrefs/Preload@href`. With this, the rendering behavior described above changes as follows:

1.  The container SNS renders.
2.  The gadget server sends a request to the external server specified in Preload (skipped if a cache exists).
3.  The gadget server renders the gadget.
4.  The gadget initializes its JavaScript in the browser.
5.  The Ajax request to fetch the external site's RSS is processed within the browser.
6.  The gadget's JavaScript in the browser renders the list of articles based on the response content.

![rendering with
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgAXDS0-AEINOiByZXF1ZXN0IGNvbnRlbnQKYWN0aXZhdGUgAGoNCgB4DS0tPgBsDTogcmVzcG9uc2UAPglkZQAyFwCAfw8AgR8HOiByZW5kZXJpbmcgZwCBTwUKbm90ZSBvdmVyAIFCCDogSlMgaW5pdCgpCgCBVgcANQtwcmVsb2FkZWQAJRQAVAkK&s=napkin)

As you can clearly see from the diagram, this eliminates network communication overhead. Quite handy!

The mechanism is simple: the gadget passes source code containing the prefetched external content to the browser, and when `makeRequest` is called, if the prefetched content is available, it returns the response immediately without making an actual Ajax request.

## Caveats When Using Preload

While Preload is very convenient, it also has some tricky characteristics. You need to understand the following points and choose where to use it carefully.

### Inability to Control Cache Expiration

This is quite a critical issue. If you cannot control cache expiration, the default cache duration (often 24 hours) will be applied. A case where you can circumvent this is when the user triggers `makeRequest` via an explicit action, allowing you to clear the cache expiration at that moment. Conversely, it is not suitable for gadgets that only display RSS without allowing user-initiated refreshes, but have an update frequency of around once an hour.

### Inability to Specify ContentType

Normally when using `makeRequest`, you can select a `ContentType` from `DOM`, `FEED`, `JSON`, or `TEXT`. In particular, `FEED` is convenient for those familiar with it because it normalizes RSS/RDF/Atom and returns it as JSON.

However, this behavior relies on explicitly specifying `FEED` as the `ContentType` so that the gadget server performs special processing when fetching the external content. Since you cannot specify a `ContentType` with Preload, this cannot be done. If you want to preload something like RSS, you have no choice but to select `DOM` and parse it yourself.

### UserPrefs Can Be Reflected

You can include UserPrefs values in `/Module/ModulePrefs/Preload@href` using the format `__UP_****__`. Unfortunately, this trick cannot be used with mixi Apps.

```xml
<Preload href="http://example.com/example.php?id=__UP_userpref__" >
```

### Signed Requests Can Be Used

By specifying "signed" in `/Module/ModulePrefs/Preload@authz`, you can make signed requests. The advantage here is that the gadget does not need to specify the viewer's ID, as the server sends it along with the signature—eliminating the need to manipulate URLs as in the UserPrefs case above.

### No Need to Change Code

Preload only involves adding metadata to the gadget XML, so basically there is no need to touch your JavaScript code. Of course, if you want to manage caching, modifying the code might be a good idea.

### You Can Specify Multiple Preloads

In fact, you can specify as many Preloads as you like. If your use case meets the criteria mentioned above, go ahead and give it a try.

## Summary

In this post, I introduced the Preload feature—a low-profile capability that does not get much attention, but is extremely useful when utilized properly. Master it well and aim to become a top-tier OpenSocial developer!
