---
title: Shindigのphp版を試す
author: Eiji
layout: post
permalink: /archives/11
SBM_count:
  - '00002<>1271383778<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 2483557
categories:
  - OpenSocial
  - Widget
tags:
  - Gadget
  - OpenSocial
  - php
  - Shindig
  - Widget
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; "><g:plusone href="http://devlog.agektmr.com/archives/11" callback="wp_plus_one_handler"></g:plusone></div><p>先日のGoogleディベロッパー交流会でShindigのphp版が公開されていることを知り、試してみました。</p>
<h2>Shindigをチェックアウトする</h2>
<pre>&gt; svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .</pre>
<p>Shindigのソースがチェックアウトされます。(今回試したリビジョンは637739)</p>
<pre>&gt; ln -s ~/Development/Shindig/php/gadgets /Library/WebServer/Documents/gadgets</pre>
<p>これでローカルホスト上で見れるはず。ブラウザに下記のURLを入力します。</p>
<pre>http://localhost/gadgets/ifr?url=http://www.labpixies.com/campaigns/todo/todo.xml</pre>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/notfound.jpg" title="NotFound"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/notfound.jpg" alt="NotFound" /></a><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/notfound.jpg" title="NotFound"> </a></p>
<p>見れません、、、</p>
<h2>httpd.confを修正</h2>
<p>どうやら、Mac OS X(Leopard)のhttpd.confのデフォルト 設定が邪魔している模様。</p>
<pre>/etc/apache2/httpd.conf</pre>
<p>を書き換えます。/etc/httpd/httpd.confではないことに注意。(Tigerはこれだった)</p>
<pre>&lt;Directory "/Library/WebServer/Documents"&gt;</pre>
<p>内の</p>
<pre>AllowOverride None</pre>
<p>を</p>
<pre>AllowOverride All</pre>
<p>に変更します。これでいけるはず。。。</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/todogadget.jpg" title="ToDoGadget"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/todogadget.jpg" alt="ToDoGadget" /></a></p>
<p>できた！これで、色々いじれますよ・・・</p>
