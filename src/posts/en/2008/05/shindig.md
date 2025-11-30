---
layout: post
lang: en
title: Deciphering the Shindig
description:
date: 2008-05-04
tags:
  - OpenSocial
  - Shindig
translationOf: /2008/05/shindig.html
translated: 2025-11-30
translatedManually: false
---
We previously introduced how to install Shindig ([Java
version](http://devlog.agektmr.com/archives/6) and [PHP
version](http://devlog.agektmr.com/archives/11)). The PHP version has finally reached a usable level, so we decided to decipher the source code. Note that while the Java version is more advanced, this article focuses on the PHP version only.

What is Shindig?

First of all, let's start with the basics.

Simply put, Shindig is a "sample implementation of an OpenSocial container."
By simply downloading and running it, you can test the operation of iGoogle gadgets and OpenSocial gadgets. In fact, the goal is to encourage the widespread adoption of OpenSocial, with many SNSs using Shindig as a reference or adapting it to support OpenSocial.

* [Shindig - an Apache incubator project for OpenSocial and gadgets](http://incubator.apache.org/shindig/)
* [Mailing list](http://mail-archives.apache.org/mod_mbox/incubator-shindig-dev/)
* [Repository](http://svn.apache.org/repos/asf/incubator/shindig/trunk/)

## Main directory structure

* config: Container configuration
* features: Feature set (JavaScript code)
* java: Java source code
* javascript: HTML, JavaScript code
* php: PHP source code

## Directory explanation

### config

The file `container.js` is the default configuration for the container, and contains settings such as proxies and the OpenSocial API path. If you want to change the settings, simply add a file to this directory and add only the necessary parts in JSON format. The default settings will be inherited. The JSON format is likely because it is intended to be readable from other languages, not just PHP and Java. (Perl and Ruby versions of Shindig are also planned for development.)

### features

Features described in the gadget XML using the `<Require features=";">` format are loaded as a set. The features directory is further divided into directories for each feature set, and the features.xml file in each directory specifies the required JavaScript library set.

### php

The PHP source code is based on the Java version, so the implementation is not very PHP-like.

First of all, it doesn't follow the MVC format. There are various ways to divide objects, but
rather than being like a web application, it's more like a Java method(?) in that it's divided very finely by function and setting.
It's also Java-like to have get and set methods for each member variable.

All requests to PHP are rewritten (as specified in the .htaccess file) and loaded into index.php, which handles the processing of the request among six different servlets depending on the request parameters.

* Static files (/gadgets/files)
* JavaScript (/gadgets/js)
* Proxies (/gadgets/proxy)
* Gadgets (/gadgets/ifr)
* Metadata (/gadgets/metadata)
* OpenSocial API (/social/data)

Including classes is largely simplified because __autoload is used.

`config.php` contains settings such as paths to various files.
(This is different from `config/container.js`)

Since Shindig does not use a database, the cache is managed in the /tmp directory,
settings are managed using cookies, and the friend list is managed using static XML files.

## summary

The source code appears simple at first glance, but it's actually quite complex. In addition to a Java-like implementation, there seems to be considerable room for optimization, such as generalization to allow for sharing settings with Shindig versions in other languages. Incorporating the PHP version of Shindig into an existing framework isn't difficult, but it's probably best to use it only as a reference.

Currently, it supports OpenSocial version 0.7, but there are still bugs. The feature specifications for version 0.8 are now complete, but it will likely take some time for Shindig to support it.

The OpenSocial API has been implemented, but it still feels like Shindig is not yet fully functional. Other things to consider include OAuth and a RESTful API.
