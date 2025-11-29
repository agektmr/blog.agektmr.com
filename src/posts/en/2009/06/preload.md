---
layout: post
lang: en
title: 'Preload to improve gadget rendering speed'
description: ''
date: 2009-06-17
translationOf: /2009/06/preload.html
translated: 2025-11-29
translatedManually: false
---
This time, I will explain Preload, an OpenSocial feature about which there is not much information available online.

## Gadget rendering flow

Let's take a simple example of a gadget that displays RSS feeds. To display this gadget on a container SNS, follow the steps below.

1. Rendering the container SNS
2. The gadget server renders the gadget
3. The gadget's JavaScript is initialized in the browser
4. An Ajax request is sent to the gadget server to retrieve the RSS feed from the external site
5. The gadget server sends the request to the external server (skip if cached)
6. The gadget server returns the response to the browser
7. The gadget's JavaScript in the browser renders a list of articles based on the response.

![rendering without
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgoAGA0tPgASBzogcmVuZGVyaW5nIGcAQgUKbm90ZSBvdmVyADUIOiBKUyBpbml0KCkKAEkHLT4AZw06IHJlcXVlc3QgZXh0ZXJuYWwgY29udGVudAphY3RpdmF0ZSAAgRgNAH4QAIFRDQBECgA0EQCBeQ0KAIIHDS0AgQETc3BvbnNlAIEDCWRlADIXAIICGgA7BwCBRhEAQAsAgUsOAIIrEwCCWQk&s=napkin)

It will look something like this.

This may be a little confusing for those who don't understand how the OpenSocial container works.
Please refer to [this article](http://devlog.agektmr.com/archives/363).

Now, there is a way to speed up the overall perceived rendering speed by streamlining this series of actions.
That is Preload, which I will introduce to you today.

## Preload to speed up gadget rendering

Preload is a feature that literally loads things before rendering.
Usage is simple: just enter the URL you want to call in /Module/ModulePrefs/Preload@href.
This will change the rendering behavior shown above as follows:

1. Rendering the container SNS
2. The gadget server sends a request to the external server specified by Preload
(Skip if cached)
3. The gadget server renders the gadget
4. The gadget initializes JavaScript in the browser
5. The browser processes an Ajax request to retrieve RSS from the external site
6. The gadget's JavaScript in the browser renders a list of articles based on the response

![rendering with
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgAXDS0-AEINOiByZXF1ZXN0IGNvbnRlbnQKYWN0aXZhdGUgAGoNCgB4DS0tPgBsDTogcmVzcG9uc2UAPglkZQAyFwCAfw8AgR8HOiByZW5kZXJpbmcgZwCBTwUKbm90ZSBvdmVyAIFCCDogSlMgaW5pdCgpCgCBVgcANQtwcmVsb2FkZWQAJRQAVAkK&s=napkin)

As you can see from the diagram, the overhead of the communication part has been reduced. This is very convenient.

The mechanism is simple: the gadget passes source code embedding prefetched external content to the browser, and if the prefetched content exists at the time of makeRequest, it returns a response without making an actual Ajax request.

## Precautions when using Preload

Preload is very useful, but it can also be tricky to use. You need to understand the following points and use it carefully.

### No control over cache expiration

This is a rather fatal flaw. If you cannot control the cache expiration time, the default cache expiration time (often 24 hours) will be applied. One way to avoid this is if the user performs a makeRequest action, and you can clear the cache expiration time at that time. Conversely, this is not suitable for gadgets that simply display RSS feeds, where the user cannot update them at will, but where the update frequency is around one hour.

### ContentType cannot be specified

Normally, when you make a request, you can choose the ContentType from DOM, FEED, JSON, and TEXT. FEED, in particular, wraps RSS/RDF/Atom and returns it in JSON, making it a convenient format for those familiar with it.

However, this behavior is achieved by explicitly specifying FEED as the ContentType and performing special processing when the gadget server retrieves external content.
This is not possible with Preload, which does not allow you to specify the ContentType.
If you want to preload RSS or similar content, you have no choice but to select and parse the DOM.

### Can reflect the contents of UserPrefs

You can include the contents of UserPrefs in the /Module/ModulePrefs/Preload@href content using the `__UP_****__` format. Unfortunately, this technique doesn't work with mixi apps.

```xml
<Preload href="http://example.com/example.php?id=__UP_userpref__" >
```

### Signed Request can be used

You can make a signed request by specifying "signed" in `/Module/ModulePrefs/Preload@authz`. The advantage of this is that you don't need to specify the viewer ID on the gadget side; the server will send it along with the signature, so you don't need to devise a URL like in the UserPrefs case above.

### No code changes required

Preload simply adds metadata to the gadget XML, so you generally don't need to modify the JavaScript code. Of course, you might want to modify it if you're concerned about caching.

### You can specify any number of Preloads

In fact, you can specify any number of Preloads. If the conditions listed above are met, go ahead and use them.

## summary

This time, we introduced the Preload feature, which is a rather unassuming feature that doesn't get much attention, but can be extremely useful if used properly. Use it well and aim to become a top-notch OpenSocializer.
