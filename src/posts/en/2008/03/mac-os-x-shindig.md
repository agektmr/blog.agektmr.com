---
layout: post
lang: en
title: 'Installing Shindig on Mac OS X'
description: ''
date: 2008-03-12
tags:
- Java
  - Mac OS X
  - OpenID
  - Shindig
  - OpenSocial
translationOf: /2008/03/mac-os-x-shindig.html
translated: 2025-11-29
translatedManually: false
---

References: [Shindig - an Apache incubator project for OpenSocial and gadgets](http://incubator.apache.org/shindig/)

## Maven must be installed first

Download it from [Maven - Download Maven 2.0.8](http://maven.apache.org/download.html). No special installation is required, just place it somewhere convenient and change the path.

```shell
> ~/Development/apache-maven-2.0.8
```

Let's put it in . We'll also set the environment variables.

```shell
> export JAVA_HOME='/System/Library/Frameworks/JavaVM.framework/Versions/A' > export PATH=$PATH:/Users/ekita/Development/apache-maven-2.0.8/bin
```

...or so I thought, but Maven is included! What is this OS X!!

## Install Shindig

```shell
> mkdir Shindig
```

Check out the Shindig source from the repository

```shell
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

Build

```shell
> cd ~/Development/Shindig/java/gadgets&gt; mvn package
```

It seems to download various things automatically and do whatever you want with them.

## Try starting Shindig

```shell
> mvn jetty:run-war
```

It seems to work with...

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

It doesn't work properly... It seems that something called [Jetty](http://jetty.mortbay.org/maven-plugin/index.html) is required.

## Run Jetty

I don't know much about Java servers so I don't really understand, but for now I'll download jetty-6.1.8 and move it under `~/Development`.

```shell
> cd ~/Development/jetty-6.1.8
> java -jar start.jar
```

Apparently, this will run a web server called jetty (probably Apache needs to be running as well). So, I symbolically linked the Shindig war file I just built,

```shell
> ln -s ~/Development/Shindig/java/gadgets/target/gadgets.war ~/Development/jetty-6.1.8/webapps/gadgets.war
```

When I try to access it...

```shell
http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html
```

![Shindig](/images/2008/03/shindig.jpg)

It worked!! That's all for today.
