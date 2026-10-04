---
title: Control external file caching with the content-rewrite feature
author: Eiji
layout: post
lang: en
date: 2009-02-18
categories:
  - OpenSocial
tags:
  - Cache
translationOf: /2009/02/content-rewite.html
translated: 2026-10-03
translatedManually: false
---
In my <a href="http://devlog.agektmr.com/ja/archives/396" target="_blank">previous post about caching</a>, I wrote that the content-rewrite feature was not available in the PHP version of Shindig, but it turns out it was already implemented as of version 1.0.x.

Although the content-rewrite feature was proposed in OpenSocial 0.9, it seems it can also be used in 0.8 and 0.7.

Here is how to use it:

<pre class="brush: xml; title: ; notranslate" title="">&lt;Optional feature="content-rewrite"&gt;
  &lt;Param name="expires"&gt;86400&lt;/Param&gt;
  &lt;Param name="include-url"&gt;&lt;/Param&gt;
  &lt;Param name="exclude-url"&gt;excluded&lt;/Param&gt;
  &lt;Param name="exclude-url"&gt;moreexcluded&lt;/Param&gt;
  &lt;Param name="minify-css"&gt;true&lt;/Param&gt;
  &lt;Param name="minify-js"&gt;true&lt;/Param&gt;
  &lt;Param name="minify-html"&gt;true&lt;/Param&gt;
&lt;/Optional&gt;
</pre>

*   **expires:** Specifies the cache expiration time in seconds. The default is 86400 seconds (24 hours).
*   **include-url:** Specifies the URLs of external content you want to cache. Asterisks ("*") can be used. Specifying something like ".gif" assumes asterisks before and after. Can be repeated.
*   **exclude-url:** Specifies the URLs of external content you do not want to cache. Handled the same way as include-url.
*   **minify-css:** Specifies whether to minify CSS files before caching with "true" or "false". The default is "true".
*   **minify-js:** Specifies whether to minify JS files before caching with "true" or "false". The default is "true".
*   **minify-html:** Specifies whether to minify HTML files before caching with "true" or "false". The default is "true".

exclude-url takes precedence over include-url. "*" matches all URLs. Specific behavior depends on the container.

This should make development a bit easier.
