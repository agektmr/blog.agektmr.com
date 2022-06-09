---
title: Mac OS X に Shindig をインストールする
layout: post
date: 2008-03-12
tags:
  - Java
  - Mac OS X
  - OpenID
  - Shindig
  - OpenSocial
---

参考資料 : [Shindig - an Apache incubator project for OpenSocial and gadgets](http://incubator.apache.org/shindig/)

## 予め Maven のインストールが必要

[Maven - Download Maven 2.0.8](http://maven.apache.org/download.html) からダウンロード。特にインストール作業は必要なく、適当なところに置いといて、パスを切る必要あり。ひとまず

```shell
> ~/Development/apache-maven-2.0.8
```

に置いておこう。環境変数も設定しておく。

```shell
> export JAVA_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/A' > export PATH=$PATH:/Users/ekita/Development/apache-maven-2.0.8/bin
```

・・・とか思ったら、Maven 入ってるじゃん！なにこれ OS X!!

## Shindig を設置

```shell
> mkdir Shindig
```

レポジトリから Shindig のソースをチェックアウトする

```shell
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

ビルドする

```shell
> cd ~/Development/Shindig/java/gadgets&gt; mvn package
```

勝手に色々ダウンロードしてよしなにしてくれるみたい。

## Shindig を起動してみる

```shell
> mvn jetty:run-war
```

で動くらしいのだが、、、

```shell
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

うまく動かない、、、 どうやら [Jetty](http://jetty.mortbay.org/maven-plugin/index.html) というのが必要らしい。

## Jetty を動かす

Java サーバーはさっぱりなのでよくわからないけど、とりあえず jetty-6.1.8 をダウンロードし、 `~/Development` 配下に移動。

```shell
> cd ~/Development/jetty-6.1.8
> java -jar start.jar
```

とかやってみる。どうやらこれで jetty というウェブサーバーが動いてることになってるらしい(多分 Apache も動いてる必要アリ)そこで、先ほどビルドした Shindig の war ファイルをシンボリックリンクして

```shell
> ln -s ~/Development/Shindig/java/gadgets/target/gadgets.war ~/Development/jetty-6.1.8/webapps/gadgets.war
```

アクセスしてみると、、、

```shell
http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html
```

![Shindig](/images/2008/03/shindig.jpg)

動いた〜！！今日はここまで。
