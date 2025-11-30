---
layout: post
lang: en
title: OpenSocial (Shindig) server architecture
description:
date: 2009-01-12
tags:
  - Shindig
translationOf: /2009/01/opensocialshindig.html
translated: 2025-11-30
translatedManually: false
---
How to get involved with OpenSocial

* Become a container
* Develop a gadget
* Create a client service using REST

Regardless of which option you choose, it is very important to know about architecture. Especially when developing gadgets, knowing the architecture often makes development easier.

So, in this article, I would like to explain the architecture of <a href="http://incubator.apache.org/shindig/" target="_blank">Shindig</a>, the open source reference implementation used by most containers that support OpenSocial.

## The relationship between gadgets and social media

Did you know how iGoogle (which already uses Shindig) displays gadgets made by third parties? In fact, it displays gadgets rendered on a different domain (gmodules.com in the case of iGoogle) in an iframe.

The reason is that placing JavaScript written by a third party on the same domain is a security risk. For more information, please see our previous article [Explaining Caja][1].

![OpenSocial Gadget Rendering][2]

Where is the API?

OpenSocial provides four social APIs: People, Group, Activity, and Persistent, each of which is provided in RESTful JSON, XML, and AtomPub formats, as well as RPC JSON format. Shindig's JavaScript API uses the RPC JSON format.

I explained about two domains earlier, but since it's a JavaScript API, it's Ajax, so naturally it's the same domain, and the endpoint exists on Shindig's domain.

![OpenSocial Server Architecture][3]

## Gadget display flow

Now that we understand the basic structure, let's take a look at the process of actually displaying a gadget.

### Which gadgets to display

In order to display a gadget, the user must first have the intention to display the gadget. In the case of iGoogle, this is done by the service side, where the user selects the gadget of their choice from the gadget directory and displays their page. Once the service knows which gadget they want to display, it also needs to display an iframe to display the gadget, so it collects information about the gadget. This is done using Shindig's metadata API.

### Getting metadata

When Shindig receives a metadata API request, it refers to its cache. If the gadget information is not stored in the cache, it retrieves the gadget XML based on the request from the service and parses it.

### Rendering an iframe

After obtaining the information about the gadget, the service renders an iframe to display the gadget, which causes the browser to send a request to Shindig to display the gadget in the iframe.

Basically, the contents of the Contents described in the gadget XML will be displayed as is, but:

* JavaScript for the specified gadget's feature (the gadget's function set, such as tab or minimessage) is added to the HTML.
* Depending on the settings, all external content such as JavaScript, CSS, and images may be cached on Shindig and called.

It wouldn't hurt to keep this in mind.

This completes the display of the gadget. If you try the API using Firebug or similar, you will see that a request is being sent to Shindig.

## API using external server

When using an external server, gadgets.io.makeRequest is used as the JavaScript API. Selecting FEED as the content type will return RSS, RDF, or Atom in a common format, while selecting JSON will allow you to handle the returned data as a JSON object immediately.

There are also several security options available.

* Standard Request
* Signed Request
* OAuth

Normal requests are made to APIs that do not require any special authentication. Signed Request refers to <a target="_blank" href="http://oauth.googlecode.com/svn/spec/ext/consumer_request/1.0/drafts/1/spec.htm">OAuth Consumer Request</a>, and by using this, the external server can handle requests only from the gadget. OAuth refers to <a target="_blank" href="http://oauth.net/core/1.0/">OAuth Core</a>, and the external server can handle requests not only by verifying that they are from a gadget, but also by authenticating who made the request with secure credentials.

For more information about OAuth, please refer to [here][4] or [here][5].

One thing to note here is that everything is done via Shindig's proxy. As I mentioned earlier, a powerful cache function is used for GET requests here as well, so you may need to be a little careful. I'll write a comprehensive article on caches from next time onwards.

 [1]: /2008/04/caja.html
 [2]: /images/2009/01/e38394e382afe38381e383a3-6.png
 [3]: /images/2009/01/e38394e382afe38381e383a3-7.png
 [4]: http://devlog.agektmr.com/archives/79
 [5]: http://devlog.agektmr.com/archives/174
