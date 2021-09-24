---
title: Mac OS XにShindigをインストールする
layout: post
date: 2008-03-12
tags:
  - Java
  - Mac OS X
  - OpenID
  - Shindig
  - OpenSocial
---

参考資料 : [Shindig - an Apache incubator project for OpenSocial and
gadgets](http://incubator.apache.org/shindig/)

## 予めMavenのインストールが必要

[Maven - Download Maven 2.0.8](http://maven.apache.org/download.html) からダウン
ロード。特にインストール作業は必要なく、適当なところに置いといて、パスを切る必要
あり。ひとまず

```
> ~/Development/apache-maven-2.0.8
```

に置いておこう。環境変数も設定しておく。

```
> export JAVA_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/A'&gt; export PATH=$PATH:/Users/ekita/Development/apache-maven-2.0.8/bin
```

・・・とか思ったら、Maven入ってるじゃん！なにこれOS X!!

## Shindigを設置

```
> mkdir Shindig
```

レポジトリからShindigのソースをチェックアウトする

```
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

ビルドする

```
> cd ~/Development/Shindig/java/gadgets&gt; mvn package
```

勝手に色々ダウンロードしてよしなにしてくれるみたい。

## Shindigを起動してみる

```
> mvn jetty:run-war
```

で動くらしいのだが、、、

```
[INFO] Scanning for projects...
[INFO] Searching repository for plugin with prefix: 'jetty'.
[INFO] org.apache.maven.plugins: checking for updates from central
[INFO] org.codehaus.mojo: checking for updates from central
[INFO] artifact org.apache.maven.plugins:maven-jetty-plugin: checking for updates from central
[INFO] ------------------------------------------------------------------------
[ERROR] BUILD ERROR
[INFO] ------------------------------------------------------------------------
[INFO] The plugin 'org.apache.maven.plugins:maven-jetty-plugin' does not exist or no valid version could be found
[INFO] ------------------------------------------------------------------------
[INFO] For more information, run Maven with the -e switch
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2 seconds
[INFO] Finished at: Wed Mar 12 16:18:09 JST 2008
[INFO] Final Memory: 1M/2M
[INFO] ------------------------------------------------------------------------
```

うまく動かない、、、 どうやら
[Jetty](http://jetty.mortbay.org/maven-plugin/index.html) というのが必要らしい。

## Jettyを動かす

Java サーバーはさっぱりなのでよくわからないけど、とりあえず jetty-6.1.8 をダウン
ロードし、 `~/Development` 配下に移動。

```
> cd ~/Development/jetty-6.1.8
> java -jar start.jar
```

とかやってみる。どうやらこれでjettyというウェブサーバーが動いてることになってる
らしい(多分Apacheも動いてる必要アリ)そこで、先ほどビルドしたShindigのwarファイル
をシンボリックリンクして

```
> ln -s ~/Development/Shindig/java/gadgets/target/gadgets.war ~/Development/jetty-6.1.8/webapps/gadgets.war
```

アクセスしてみると、、、

`http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html`

[![Shindig](/images/2008/03/shindig.jpg)](/images/2008/03/shindig.jpg)

動いた〜！！今日はここまで。
