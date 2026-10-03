---
title: Deciphering Shindig
layout: post
lang: en
date: 2008-05-04
tags:
  - OpenSocial
  - Shindig
translationOf: /2008/05/shindig.html
translated: 2026-10-03
translatedManually: false
---
I previously covered how to install Shindig ([Java version](http://devlog.agektmr.com/archives/6), [PHP version](http://devlog.agektmr.com/archives/11)). The PHP version has finally reached a usable state, so I took a deep dive into the source code. Note that while the Java implementation is further along, this post focuses strictly on the PHP version.

## What is Shindig?

Let's start from the basics.

In short, Shindig is a "**sample implementation of an OpenSocial container**." Simply downloading and running it allows you to test both iGoogle gadgets and OpenSocial gadgets. In practice, its goal is to drive widespread OpenSocial adoption by serving as a reference or a starting point for numerous social networking services to support OpenSocial.

* [Shindig - an Apache incubator project for OpenSocial and
  gadgets](http://incubator.apache.org/shindig/)
* [Mailing list](http://mail-archives.apache.org/mod_mbox/incubator-shindig-dev/)
* [Repository](http://svn.apache.org/repos/asf/incubator/shindig/trunk/)

## Main Directory Structure

* config: Container configuration
* features: Various feature sets (JavaScript code)
* java: Java source code
* javascript: HTML and JavaScript code
* php: PHP source code

## Directory Breakdown

### config

The file `container.js` serves as the container's default configuration, specifying settings like proxies and OpenSocial API paths. If you want to change the configuration, you can add a file to this directory and append only the necessary parts in JSON format, which will inherit the default settings. The reason JSON format is used is likely to allow it to be loaded not just by PHP and Java, but by other languages as well. (Perl and Ruby versions of Shindig are also reportedly planned for development.)

### features

This loads feature sets that are declared in gadget XML in the form of `<Require features=";">`. The `features` directory is further divided into subdirectories for each feature set, and the `features.xml` file in each directory specifies the required JavaScript library set.

### php

Perhaps because the PHP source code is modeled after the Java version, it doesn't feel very idiomatic to PHP.

First, it doesn't adopt an MVC pattern. While there are various ways to divide objects, rather than taking a typical web application approach, it is split up very finely by feature and configuration in what seems like a Java-esque style(?). Providing get/set methods for every single member variable also feels very Java-like.

Requests to PHP are rewritten (specified in the `.htaccess` file) and all routed to `index.php`. Based on the request parameters, `index.php` delegates processing to six types of servlets:

* Static files (/gadgets/files)
* JavaScript (/gadgets/js)
* Proxy (/gadgets/proxy)
* Gadgets (/gadgets/ifr)
* Metadata (/gadgets/metadata)
* OpenSocial API (/social/data)

Class includes are rarely written explicitly because `__autoload` is used.

`config.php` contains settings such as paths to various files. (This is distinct from `config/container.js`.)

Additionally, since Shindig does not use a database, caching is handled in the `/tmp` directory, settings in cookies, and friend lists in static XML files.

## Summary

At first glance, the source code looks simple, but it is quite complex. Between the Java-like implementation style and general abstractions intended to share configurations with other language versions of Shindig, there seems to be plenty of room for optimization. While integrating the PHP version of Shindig into an existing framework wouldn't be difficult, it is probably best treated purely as a reference.

Also, while it currently supports OpenSocial version 0.7, there are still plenty of bugs. Specifications for version 0.8 are starting to take shape, but there will likely be a delay before Shindig catches up.

Although the OpenSocial API is implemented, it still feels far from being able to say that OpenSocial features are fully ready to use in Shindig. Next up would be things like OAuth, RESTful APIs, and so on...
