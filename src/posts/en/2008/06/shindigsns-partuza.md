---
layout: post
lang: en
title: 'Open source Shindig compatible social networking site - Partuza!'
description: ''
date: 2008-06-03
tags:
- OpenSocial
  - Partuza!
  - Shindig
translationOf: /2008/06/shindigsns-partuza.html
translated: 2025-11-29
translatedManually: false
---

Speaking of OpenSocial containers,
[Shindig](http://devlog.agektmr.com/archives/tag/shindig) is a popular choice, but the PHP version is already compatible with
OpenSocial v0.7.
[Partuza!](http://code.google.com/p/partuza/) is an open-source Shindig-compatible SNS developed by Chris Chabot, the developer of the PHP version of Shindig.

You may be wondering, "If Shindig is a container, then what does Partuza! do?" This time, I will explain how to install it and its relationship with Shindig.

## Install Partuza!

We've previously explained how to install Shindig, so we won't go into detail here. Let's assume that Shindig is installed under `~/shindig` and can be accessed via `http://localhost:8080/gadgets/…`.

First, you will need an environment that includes Apache, PHP5 (requires mcrypt), and MySQL5.

### Checkout from repository

Check out the SVN repository on Google Code.

```shell
> svn checkout http://partuza.googlecode.com/svn/trunk/ ~/partuza
```

### Prepare the database

Create an empty database with an appropriate database name, username, and password.
For now, we'll use partuza, root, and no password. Now, let's dump `~/partuza/partuza.sql`.

```shell
> mysql -u root partuza > partuza.sql
```

### Set DocumentRoot

In the Apache configuration (`httpd.conf`), set `DocumentRoot` to `~/partuza/html`, and then make it accessible via `http://localhost/`. Of course, you'll need to prepare a domain separate from Shindig, so use a virtual host, etc.

### Modify the configuration file

Edit `~/partuza/html/config.php`. Here, set the database-related information you created earlier
and the gadget server root URL (`gadget_server`). The gadget
server URL will be the Shindig URL, so it will be `http://localhost:8080/`.

### Copy Database Handler

Copy `~/partuza/Shindig/PartuzaDbFetcher.php` and `~/partuza/Shindig/PartuzaHandler.php` to `~/shindig/php/src/social`.

```shell
> cp ~/partuza/Shindig/Partuza* ~/shindig/php/src/social
```

### Fix Shindig database settings

`~/shindig/php/src/social/PartuzaDbFetcher.php` also contains database-related information, so modify it accordingly. Also, modify `~/shindig/php/config.php` so that Shindig uses the database handler. Here, set "handlers => PartuzaHandler".

This completes the setup. If you access `http://localhost/` and the welcome screen appears, you've succeeded. You can register and use it as a regular Orkut-like social networking site.

## The relationship between Partuza! and Shindig

We've previously explained that OpenSocial gadgets are displayed via an iframe.
To put it simply, Partuza is in front of the iframe, and Shindig is behind it.
Shindig has previously allowed you to create OpenSocial-like displays using simple HTML by accessing the URL below, but using Partuza transforms it into a full-fledged social networking site.

http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html

However, as you can imagine from the PartuzaHandler specification, the database is shared. You can see it in action on [Chris Chabot's site](http://partuza.us.chabotc.com/).

By using Partuza!, you can not only analyze how Shindig can be incorporated into a social networking site, but you can also develop a simple social networking site using it. Please give it a try.