---
layout: post
lang: en
title: 'Controlling caching of external files with the content-rewrite feature'
description: ''
date: 2009-02-18
tags:
- Cache
translationOf: /2009/02/content-rewite.html
translated: 2025-11-29
translatedManually: false
---
<a href="http://devlog.agektmr.com/ja/archives/396" target="_blank">In my recent article about caching</a>, I wrote that the content-rewrite function cannot be used in the PHP version of Shindig, but it appears that it has already been implemented in the 1.0.x version.

Although the content-rewrite function was proposed for OpenSocial 0.9, it appears that it can also be implemented in 0.8 and 0.7.

Here's how to use it.

<pre class="brush: xml; title: ; notranslate" title="">&lt;Optional feature="content-rewrite"&gt;
  &lt;Param name="expires"&gt;86400&lt;/Param&gt;
  &lt;Param name="include-url"&gt;&lt;/Param&gt;
  &lt;Param name="exclude-url"&gt;excluded&lt;/Param&gt;
  &lt;Param name="exclude-url"&gt;more excluded&lt;/Param&gt;
  &lt;Param name="minify-css"&gt;true&lt;/Param&gt;
  &lt;Param name="minify-js"&gt;true&lt;/Param&gt;
  &lt;Param name="minify-html"&gt;true&lt;/Param&gt;
&lt;/Optional&gt;
</pre>

* **expires:** Specifies the cache expiration time in seconds. The default is 86400 seconds (24 hours).
* **include-url:** Specifies the URL of external content you want to cache. You can use asterisks (*). For example, &#8221;.gif&#8221;, it will be assumed to have an asterisk before and after it. Repeatable.
* **exclude-url:** Specifies the URL of external content you do not want cached. The method of application is the same as for include-url.
* **minify-css:** Specifies whether to compress and cache the contents of CSS files using &#8221;true&#8221; or &#8221;false&#8221;. The default is &#8221;true&#8221;
* **minify-js:** Specifies whether to compress and cache the contents of JS files with &#8221;true&#8221; or &#8221;false&#8221;. The default is &#8221;true&#8221;
* **minify-html:** Specifies whether to compress and cache the contents of HTML files with &#8221;true&#8221; or &#8221;false&#8221;. The default is &#8221;true&#8221;

exclude-url takes precedence over include-url. &#8221;*&#8221; specifies all URLs. Detailed behavior is container-dependent.

This will make development a little easier.