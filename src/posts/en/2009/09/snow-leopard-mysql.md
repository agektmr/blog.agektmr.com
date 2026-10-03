---
title: Installing MySQL on Snow Leopard
author: Eiji
layout: post
lang: en
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
translated: 2026-10-03
translatedManually: false
---
Upgrading Mac OS X to Snow Leopard bumped PHP to version 5.3, which means I no longer need to install entropy to use Partuza or Shindig—which is fantastic.

However, getting MySQL to work in this environment required a bit of tweaking, so I'm leaving a quick note here. (Information is as of September 2009)

## Download MySQL

Download the MySQL binary from [here](http://dev.mysql.com/downloads/). Under Mac OS X (package format) towards the bottom of the page, choose Mac OS 10.5 (x86_64) (even though Snow Leopard is 10.6).

## Install MySQL

You can install it using the GUI. Go ahead and install the preference pane and startup items as well. Let's also set up the PATH.

Create `~/.bash_profile` or add the following to it if it already exists:

```shell
PATH=$PATH:/usr/local/mysql/bin
export PATH
```

Then run:

```shell
> source ~/.bash_profile
```

to apply the changes immediately.

## Doing the Tweaks

Here comes the key part.

```shell
>  cd /usr/local/mysql
>  sudo ./script/mysql_install_db
```

Next:

```shell
> sudo cp /etc/php.ini.default /etc/php/ini
>  sudo vim /etc/php.ini
```

Find the line:

```shell
mysqli.default_socket = /var/mysql/mysql.sock
```

and change it to:

```shell
mysqli.default_socket = /tmp/mysql.sock
```

Now, restart MySQL and you're good to go. Start MySQL from System Preferences, and you should be able to use MySQL with PHP.

### Update

Note that I've only verified this setup with Partuza, so you might need further tweaks if you're doing other things.
