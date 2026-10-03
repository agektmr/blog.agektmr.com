---
title: OpenSocial Signed Request Library (PHP) Released in Beta
author: Eiji
layout: post
lang: en
date: 2009-08-14
categories:
  - OpenSocial
tags:
  - OAuth
  - Signed Request
translationOf: /2009/08/opensocial-signed-request-php.html
translated: 2026-10-03
translatedManually: false
---
OpenSocial Signed Request is a mechanism that adds a signature to external communication requests from gadgets, making it possible to verify that the parameter contents have not been tampered with. Terms like 2-legged OAuth, Signed Request, and OAuth Consumer Request all generally refer to this exact same thing.

While <a href="http://developer.mixi.co.jp/appli/pc/lets_enjoy_making_mixiapp/require_servers" target="_blank">the implementation itself is not difficult at all</a>, there didn't seem to be many handy libraries available, so I decided to build one. <a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">I'm releasing it as a beta to start with</a>.

## Features

It uses the <a href="http://code.google.com/p/oauth/" target="_blank">OAuth library on Google Code</a>. It bundles public keys for orkut, Google, Friendster, hi5, hyves, Netlog, as well as goo Home and mixi.

## Usage

Please check it out from Google Code:

<pre>svn checkout http://opensocial-signed-request-php-library.googlecode.com/svn/trunk/ opensocial-signed-request-php-library-read-only</pre>

Inside, you will find a sample gadget (SignedRequest.xml), a sample server-side implementation (example.php), and the library itself.

Looking at the sample <a href="http://code.google.com/p/opensocial-signed-request-php-library/source/browse/trunk/example.php" target="_blank">server-side implementation</a> is the fastest way to understand it, but the usage is simple. Just instantiate SignedRequestValidator with the gadget URL as an argument, and call the validate_request method. If signature verification fails, it will automatically return a 401. If signature verification succeeds, you can simply write your code right after that.

## References

As far as I know, several others have published code and libraries to verify Signed Requests in other languages:

*   <a href="http://code.google.com/p/gaeoauth/" target="_blank">gaeoauth</a>, running on Django for Google App Engine Python
*   <a href="http://yamashita.dyndns.org/blog/verifying-opensocial-signed-request-with-google-app-engine/" target="_blank">Code</a> running on Google App Engine Python
*   <a href="http://code.google.com/p/mod-auth-opensocial/" target="_blank">mod_auth_opensocial</a>, running at the Apache module level

## Summary

Although this is a beta release, there shouldn't be any operational issues. However, with the code as-is, requests from both Google and mixi will pass as long as the gadget URL matches, so I'd like to gather feedback to decide whether making provider specification optional or configurable is desirable.

* By the way, oauth\_body\_hash is not yet supported.

So please, give it a try!
