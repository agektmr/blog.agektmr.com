---
title: Mac OS XにShindigをインストールする
author: Eiji
layout: post
permalink: /archives/6
SBM_count:
  - '00002<>1271396435<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 2491778
categories:
  - OpenSocial
tags:
  - Java
  - Mac OS X
  - OpenID
  - Shindig
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; "><g:plusone href="http://devlog.agektmr.com/archives/6" callback="wp_plus_one_handler"></g:plusone></div><p>参考資料 :<a href="http://incubator.apache.org/shindig/" target="_blank" title="Shindig - an Apache incubator project for OpenSocial and gadgets">Shindig &#8211; an Apache incubator project for OpenSocial and gadgets</a></p>
<h2>予めMavenのインストールが必要</h2>
<p><a href="http://maven.apache.org/download.html">Maven &#8211; Download Maven 2.0.8 </a>からダウンロード。特にインストール作業は必要なく、適当なところに置いといて、パスを切る必要あり。ひとまず</p>
<pre>&gt; ~/Development/apache-maven-2.0.8</pre>
<p>に置いておこう。環境変数も設定しておく。</p>
<pre>&gt; export JAVA_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/A'&gt; export PATH=$PATH:/Users/ekita/Development/apache-maven-2.0.8/bin</pre>
<p>・・・とか思ったら、Maven入ってるじゃん！なにこれOS X!!</p>
<h2>Shindigを設置</h2>
<pre>&gt; mkdir Shindig</pre>
<p>レポジトリからShindigのソースをチェックアウトする</p>
<pre>&gt; svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .</pre>
<p>ビルドする</p>
<pre>&gt; cd ~/Development/Shindig/java/gadgets&gt; mvn package</pre>
<p>勝手に色々ダウンロードしてよしなにしてくれるみたい。</p>
<h2>Shindigを起動してみる</h2>
<pre>&gt; mvn jetty:run-war</pre>
<p>で動くらしいのだが、、、</p>
<pre>[INFO] Scanning for projects...[INFO] Searching repository for plugin with prefix: 'jetty'.[INFO] org.apache.maven.plugins: checking for updates from central[INFO] org.codehaus.mojo: checking for updates from central[INFO] artifact org.apache.maven.plugins:maven-jetty-plugin: checking for updates from central[INFO] ------------------------------------------------------------------------[ERROR] BUILD ERROR[INFO] ------------------------------------------------------------------------[INFO] The plugin 'org.apache.maven.plugins:maven-jetty-plugin' does not exist or no valid version could be found[INFO] ------------------------------------------------------------------------[INFO] For more information, run Maven with the -e switch[INFO] ------------------------------------------------------------------------[INFO] Total time: 2 seconds[INFO] Finished at: Wed Mar 12 16:18:09 JST 2008[INFO] Final Memory: 1M/2M[INFO] ------------------------------------------------------------------------</pre>
<p>うまく動かない、、、 どうやら<a href="http://jetty.mortbay.org/maven-plugin/index.html">Jetty</a>というのが必要らしい。</p>
<h2>Jettyを動かす</h2>
<p>Javaサーバーはさっぱりなのでよくわからないけど、とりあえずjetty-6.1.8をダウンロードし、~/Development配下に移動。</p>
<pre>&gt; cd ~/Development/jetty-6.1.8</pre>
<pre>&gt; java -jar start.jar</pre>
<p>とかやってみる。どうやらこれでjettyというウェブサーバーが動いてることになってるらしい(多分Apacheも動いてる必要アリ)そこで、先ほどビルドしたShindigのwarファイルをシンボリックリンクして</p>
<pre>&gt; ln -s ~/Development/Shindig/java/gadgets/target/gadgets.war ~/Development/jetty-6.1.8/webapps/gadgets.war</pre>
<p>アクセスしてみると、、、</p>
<pre>http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html</pre>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/shindig.jpg" title="Shindig"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/shindig.jpg" alt="Shindig" /></a></p>
<p>動いた〜！！今日はここまで。</p>
