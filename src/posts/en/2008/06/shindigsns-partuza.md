---
title: "Open-source Shindig-compatible social network - Partuza!"
layout: post
lang: en
date: 2008-06-03
tags:
  - OpenSocial
  - Partuza!
  - Shindig
translationOf: /2008/06/shindigsns-partuza.html
translated: 2026-10-03
translatedManually: false
---
When it comes to OpenSocial containers, [Shindig](http://devlog.agektmr.com/archives/tag/shindig) is the go-to reference, and its PHP version already supports OpenSocial v0.7. [Partuza!](http://code.google.com/p/partuza/) is an open-source, Shindig-compatible SNS developed by Chris Chabot, the developer of the PHP version of Shindig.

You might wonder: if Shindig is the container, then what exactly does Partuza! do? In this post, I'll explain how to install it and how it relates to Shindig.

## Installing Partuza!

Since [I’ve previously covered how to install Shindig](http://devlog.agektmr.com/archives/11), I'll skip that part here. Let's assume that Shindig is installed under `~/shindig` and can be accessed at `http://localhost:8080/gadgets/…`.

First, the environment requires Apache, PHP5 (mcrypt required), and MySQL5.

### Check Out from the Repository

Check out the code from the Google Code repository using SVN.

```shell
> svn checkout http://partuza.googlecode.com/svn/trunk/ ~/partuza
```

### Prepare the Database

Create an empty database with an appropriate database name, username, and password. For now, let's assume they are `partuza`, `root`, and no password, respectively. In this state, dump `~/partuza/partuza.sql`.

```shell
> mysql -u root partuza > partuza.sql
```

### Configure DocumentRoot

Set `DocumentRoot` to `~/partuza/html` in your Apache configuration (`httpd.conf`) so that it can be accessed at `http://localhost/`. Of course, you'll need a separate domain from Shindig, so consider using virtual hosts or a similar setup.

### Edit the Configuration File

Edit `~/partuza/html/config.php`. Here, configure the database information you created earlier and the gadget server's root URL (`gadget_server`). In this case, the gadget server URL will be the Shindig URL, so set it to `http://localhost:8080/`.

### Copy the Database Handlers

Copy `~/partuza/Shindig/PartuzaDbFetcher.php` and `~/partuza/Shindig/PartuzaHandler.php` to `~/shindig/php/src/social`.

```shell
> cp ~/partuza/Shindig/Partuza* ~/shindig/php/src/social
```

### Update Shindig's Database Settings

`~/shindig/php/src/social/PartuzaDbFetcher.php` also contains database-related settings, so update those as well. In addition, edit `~/shindig/php/config.php` so that Shindig uses the database handlers. Set it to `"handlers => PartuzaHandler"`.

That completes the general setup. If you access `http://localhost/` and see the welcome screen, you're good to go. You can register right away and use it as a standard, Orkut-like SNS.

## The Relationship Between Partuza! and Shindig

As I explained previously, OpenSocial gadgets are displayed via iframes; simply put, the front side of the iframe is Partuza, and the back side is Shindig. Shindig has long allowed you to display an OpenSocial-like view from a simple HTML page by accessing the following URL, but by using Partuza, it becomes a complete SNS.

http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html

That said, as you might guess from specifying `PartuzaHandler`, the database is shared. You can see a live instance running on [Chris Chabot's site](http://partuza.us.chabotc.com/).

Using Partuza! not only lets you analyze how to integrate Shindig into an SNS, but it also allows you to build a small social network right out of the box. Give it a try!
