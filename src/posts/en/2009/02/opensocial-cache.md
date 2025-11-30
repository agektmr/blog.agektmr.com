---
layout: post
lang: en
title: Cache functions to be aware of when developing OpenSocial gadgets
description:
date: 2009-02-03
categories:
  - OpenSocial
translationOf: /2009/02/opensocial-cache.html
translated: 2025-11-30
translatedManually: false
---
In a recent article, we mentioned the powerful cache functionality of Shindig's OpenSocial architecture. Shindig has four main types of caches.

* Caching gadget XML
* Caching external APIs accessed with makeRequest
* Caching feature-rich JavaScript
* Caching resources linked from HTML, such as JavaScript, CSS, and images

## Gadget XML cache

The first thing you may encounter when you start developing an OpenSocial gadget is the caching of the gadget XML. If you make changes to the gadget XML but the changes are not reflected in the actual gadget display, the first thing to suspect is that the gadget XML is being cached.

If you want to develop your gadget in a sandbox environment while modifying the JavaScript code in the gadget XML, you can disable the cache by adding nocache=1 to the query part of the URL. This should make development much easier. (Please note that depending on the container, the URL may end with a hash (# and subsequent characters).)

In addition, in the iGoogle sandbox, you can disable caching by using <a target="_blank" href="http://www.google.com/ig/directory?hl=en&#038;type=gadgets&#038;url=www.google.com/ig/modules/developer.xml">My Gadgets</a>, and in the hi5 sandbox, caching is disabled without you having to do anything special.

## Cache external APIs accessed with makeRequest

If you use makeRequest to access an external resource with GET, this will also be cached. For example, if you are retrieving RSS feeds that are updated infrequently, this can reduce the load on the other server.

If you want to avoid this, add the parameter gadgets.io.ProxyUrlRequestParamters.REFRESH_INTERVAL to opt_params of makeRequest and set it to 0. This will prevent caching.

## JavaScript cache with solidified features

OpenSocial has a specification that allows various functions to be used by adding Require@feature to the gadget XML. This feature is realized by adding JavaScript to the HTML displayed in the gadget, and Shindig strives to make this lightweight and efficient as well. The JavaScript of the feature is obfuscated when it is rendered, and then all of it is concatenated and cached.

There is almost no need for average users/gadget developers to be aware of this, but it's good to keep it in the back of your mind.

## Caching resources linked from HTML, such as JavaScript, CSS, and images

Some containers (such as Orkut, iGoogle, and hi5, which currently use the Java version of Shindig) cache external JavaScript, CSS, and images specified in the gadget XML when they are rendered. If you look at the HTML of the rendered gadget, you will see that the cached external resource has a concat at the end of its path in the URL.

This feature, called Content Rewrite, will be officially incorporated into OpenSocial version 0.9, but is currently exclusive to the Shindig Java edition. In version 0.9, you'll be able to specify in the gadget XML settings which file types to rewrite, whether to compress JavaScript, and the expiration period for caching.

Now, the purpose of this cache is to reduce the load on the server where each file is located during production, but during development, code changes may not be reflected immediately, which can reduce efficiency. To avoid this, add the following to the XML:

<pre class="brush: xml; title: ; notranslate" title="">&lt;optional feature="content-rewrite&gt;
  &lt;param name="include-tabs" /&gt;
&lt;/optional&gt;
</pre>

Please note that some containers may not support this.

By the way, the PHP version of Shindig does not have this feature. In other words, if a gadget points to a file prepared on your server, for example, a request will be generated each time the gadget is rendered. While this is convenient for development, it will put a strain on the server if there is a large amount of access in a production environment. To avoid this, one technique is to make good use of the cache function.

http://opensocial-container/gadgets/proxy?url=http://devlog.agektmr.com/image.gifのように、ドメインに&#8221;/gadgets/proxy?url=&#8221;を付けて、意図的にShindigのプロキシを入れてしまいましょう。(concatと異なり、難読化や圧縮はされません。)

### Addendum (2009/2/3)

Regarding the above, mainya-san told me in the comments section how to do it using getProxyUrl.

<pre class="brush: jscript; title: ; notranslate" title="">var params = {'REFRESH_INTERVAL' : 3600*24*7};
var url = 'http://example.com/img/logo.jpg';
try{
  url = gadgets.io.getProxyUrl(url, params);
}catch(e){}
</pre>

If you get the URL in this way, you can make a reference that intentionally activates the cache in a container-independent way. (It doesn't work with MySpace, so it seems better to use try/catch.)
