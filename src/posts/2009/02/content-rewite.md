---
title: content-rewite機能で外部ファイルのキャッシュを制御する
author: Eiji
layout: post
date: 2009-02-18
categories:
  - OpenSocial
tags:
  - Cache
---
<a href="http://devlog.agektmr.com/ja/archives/396" target="_blank">先日のキャッシュに関する記事</a>でPHP版Shindigではcontent-rewrite機能が使えないと書いたのですが、1.0.xの段階で、既に実装されているようです。

content-rewrite機能はOpenSocial0.9で提案された機能ではありますが、0.8や0.7でも実行できそうです。

使い方はこんな感じ。

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

*   **expires:** キャッシュの有効期限を秒で指定。デフォルトは86400秒(24時間)。
*   **include-url:** キャッシュしたい外部コンテンツのURLを指定。&#8221;*&#8221;アクタリスクが使える。&#8221;.gif&#8221;などとすると、前後にアスタリスクがあるものと想定される。繰り返し可。
*   **exclude-url:** キャッシュしたくない外部コンテンツのURLを指定。適用方法はinclude-urlと同じ。
*   **minify-css:** CSSファイルの内容を圧縮してキャッシュするかどうかを&#8221;true&#8221;または&#8221;false&#8221;で指定。デフォルトは&#8221;true&#8221;
*   **minify-js:** JSファイルの内容を圧縮してキャッシュするかどうかを&#8221;true&#8221;または&#8221;false&#8221;で指定。デフォルトは&#8221;true&#8221;
*   **minify-html:** HTMLファイルの内容を圧縮してキャッシュするかどうかを&#8221;true&#8221;または&#8221;false&#8221;で指定。デフォルトは&#8221;true&#8221;

exclude-urlがinclude-urlよりも優先される。&#8221;*&#8221;はすべてのURLを指定。詳細な動作はコンテナ依存。

これで、開発がもう少し楽になりますね