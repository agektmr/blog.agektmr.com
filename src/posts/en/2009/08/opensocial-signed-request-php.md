---
layout: post
lang: en
title: OpenSocial Signed Request library (PHP) released in beta
description: ''
date: 2009-08-14
tags:
- OAuth
  - Signed Request
translationOf: /2009/08/opensocial-signed-request-php.html
translated: 2025-11-29
translatedManually: false
---
OpenSocial's Signed Request is a mechanism that attaches a signature to external communication requests from a gadget, making it possible to verify that the parameter contents have not been tampered with. Generally, the names 2-legged OAuth, Signed Request, and OAuth Consumer Request are all the same, and they represent this.

<a href="http://developer.mixi.co.jp/appli/pc/lets_enjoy_making_mixiapp/require_servers" target="_blank">The implementation itself is not difficult at all</a>, but since there don't seem to be many easy-to-use libraries available, I decided to make one. <a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">I'll release it as a beta first</a>.

## Features

<a href="http://code.google.com/p/oauth/" target="_blank">This uses the OAuth library </a> from Google Code. Public keys for orkut, Google, Friendster, hi5, hyves, Netlog, goo home, and mixi are included.

## How to use

Check it out on Google Code.

<pre>svn checkout http://opensocial-signed-request-php-library.googlecode.com/svn/trunk/ opensocial-signed-request-php-library-read-only</pre>

The contents include a sample gadget (SignedRequest.xml), a sample server-side implementation (example.php), and a library.

The easiest way to understand this is to look at the sample <a href="http://code.google.com/p/opensocial-signed-request-php-library/source/browse/trunk/example.php" target="_blank">Server-side implementation</a>, but it's simple to use. Just create a new SignedRequestValidator with the gadget URL as an argument and call the validate_request method. If signature verification fails, it will automatically return 401. You can write the code for when signature verification is successful after that.

## Reference

As far as I know, there are several people who have published code or libraries for verifying signed requests in other languages.

* Google AppEngine Python version: Works on Django <a href="http://code.google.com/p/gaeoauth/" target="_blank">gaeoauth</a>
* Google AppEngine Python version: Works on <a href="http://yamashita.dyndns.org/blog/verifying-opensocial-signed-request-with-google-app-engine/" target="_blank">code</a>
* Works at the Apache module level <a href="http://code.google.com/p/mod-auth-opensocial/" target="_blank">mod_auth_opensocial</a>

## summary

Although it is a beta release, I don't think there are any operational issues. However, the current code will allow requests from both Google and Mixi if the gadget URL matches, so I would like to get feedback and decide whether it would be better to make it possible to specify the URL arbitrarily.

*By the way, oauth\_body\_hash is not supported.

So, please give it a try.
