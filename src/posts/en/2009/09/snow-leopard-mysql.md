---
layout: post
lang: en
title: Installing MySQL on Snow Leopard
description:
date: 2009-09-11
categories:
  - Mac
tags:
  - Mac OS X
  - MySQL
  - Partuza!
  - Shindig
  - Snow Leopard
translationOf: /2009/09/snow-leopard-mysql.html
translated: 2025-11-30
translatedManually: false
---
When I updated my Mac OS X to Snow Leopard, PHP was updated to 5.3, so I no longer needed to install entropy to use Partuza or Shindig, which was great.

However, I had to do a bit of fiddling to use MySQL in the same environment, so I'll leave a note here. (This information is current as of September 2009.)

## Download MySQL

Download the MySQL binary from [here](http://dev.mysql.com/downloads/). Select Mac OS 10.5 (x86_64) from the Mac OS X (package format) section at the bottom of this page (although Snow Leopard is 10.6).

## Install MySQL

The installation can be done using the GUI. It will also install the environment settings and startup items. Make sure to clear the path.

Create `~/.bash_profile` or add the following if it already exists.

```shell
PATH=$PATH:/usr/local/mysql/bin
export PATH
```

moreover

```shell
> source ~/.bash_profile
```

If you do this, it will be reflected immediately.

## Mumble

This is the key point.

```shell
>  cd /usr/local/mysql
>  sudo ./script/mysql_install_db
```

And then

```shell
> sudo cp /etc/php.ini.default /etc/php/ini
>  sudo vim /etc/php.ini
```

Or something like that,

```shell
mysqli.default_socket = /var/mysql/mysql.sock
```

part

```shell
mysqli.default_socket = /tmp/mysql.sock
```

Rewrite it as:

Now, just restart MySQL and you're good to go. If you start MySQL from the environment settings, you should now be able to use MySQL with PHP.

### postscript

By the way, this setting was only used to check the operation of Partuza, so if you want to do other things, you may need to tweak it a bit more.
