---
title: Caching Features to Be Aware of in OpenSocial Gadget Development
author: Eiji
layout: post
lang: en
date: 2009-02-03
categories:
  - OpenSocial
translationOf: /2009/02/opensocial-cache.html
translated: 2026-10-03
translatedManually: false
---
In a recent article, I touched upon the powerful caching mechanisms in Shindig's OpenSocial architecture. Shindig has four main types of caches:

*   Gadget XML cache
*   External API cache accessed via `makeRequest`
*   Bundled feature JavaScript cache
*   Cache for resources linked from HTML, such as JavaScript, CSS, and images

## Gadget XML Cache

When you start developing OpenSocial gadgets, this gadget XML cache is likely the first stumbling block you'll encounter. If you make changes to the gadget XML but don't see them reflected in the rendered gadget, the first thing to suspect is that the gadget XML is cached.

If you want to edit JavaScript code in the gadget XML and test it inside a sandbox environment, you can disable the cache by adding `nocache=1` to the query string of the URL. This should make development much easier. (Be aware that depending on the container, the end of the URL might turn into a hash (`#` onwards), so pay close attention to where you add it.)

Additionally, some containers have specific features: for example, you can disable caching via <a target="_blank" href="http://www.google.com/ig/directory?hl=en&#038;type=gadgets&#038;url=www.google.com/ig/modules/developer.xml">My Gadgets</a> in the iGoogle sandbox, and hi5 disables caching by default in its sandbox environment without requiring any extra setup.

## External API Cache Accessed via makeRequest

When you make a GET request to access external resources using `makeRequest`, the response is also cached. For example, when fetching RSS feeds that update infrequently, this helps reduce the load on the destination server even by a small amount.

If you want to bypass this cache, add the `gadgets.io.ProxyUrlRequestParamters.REFRESH_INTERVAL` parameter to `makeRequest`'s `opt_params` and set it to `0`. This will prevent the response from being cached.

## Bundled Feature JavaScript Cache

OpenSocial specifies that various features can be utilized by adding `Require@feature` to the gadget XML. These features work by injecting JavaScript into the HTML rendered within the gadget, and Shindig optimizes this process for lightweight and efficient delivery as well. Feature JavaScript is obfuscated, concatenated into a single bundle, and cached at render time.

End users and gadget developers rarely need to worry about this, but it's good to keep in the back of your mind.

## Cache for Resources Linked from HTML, such as JavaScript, CSS, and Images

Depending on the container (services currently using the Java version of Shindig, such as orkut, iGoogle, and hi5), external JavaScript, CSS, and images specified within the gadget XML are cached at render time. If you inspect the rendered gadget's HTML, you can tell these resources are cached because the path of the cached external resource URLs ends with `concat`.

This feature is called Content Rewrite. While it will be officially incorporated starting from OpenSocial version 0.9, it is currently a feature exclusive to the Java version of Shindig. In 0.9, you will be able to configure in the gadget XML which file types to rewrite, whether to minify JavaScript, how long the cache expiration should be, and more.

While the purpose of this cache is to reduce the load on servers hosting these files in production, it can hinder productivity during development since code changes aren't immediately reflected. To avoid this, add the following to your XML:

<pre class="brush: xml; title: ; notranslate" title="">&lt;optional feature="content-rewrite&gt;
  &lt;param name="include-tabs" /&gt;
&lt;/optional&gt;
</pre>

Please note that some containers may not support this.

By the way, the PHP version of Shindig does not have this feature. This means that if a gadget references files hosted on your own server, a request is made every time the gadget renders. While this is convenient during development, it can overload your server if high traffic hits in production. To prevent this, there is a technique to take advantage of the caching mechanism intentionally.

By appending `/gadgets/proxy?url=` to the domain, such as `http://opensocial-container/gadgets/proxy?url=http://devlog.agektmr.com/image.gif`, you can intentionally route the request through Shindig's proxy. (Unlike `concat`, this does not obfuscate or minify the resource.)

### Update (2009/2/3)

Regarding the above, mainya shared an approach using `getProxyUrl` in the comments:

<pre class="brush: jscript; title: ; notranslate" title="">var params = {'REFRESH_INTERVAL' : 3600*24*7};
var url = 'http://example.com/img/logo.jpg';
try{
  url = gadgets.io.getProxyUrl(url, params);
}catch(e){}
</pre>

By retrieving the URL this way, you can reference resources with intentional caching in a container-independent manner. (Since this doesn't work on MySpace, wrapping it in a `try/catch` block is recommended.)
