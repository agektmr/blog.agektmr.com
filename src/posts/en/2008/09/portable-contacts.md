---
layout: post
lang: en
title: 'Portable Contacts, an open contact list specification'
description: ''
date: 2008-09-18
tags:
- PortableContacts
  - DataPortability
  - OpenSocial
  - SocialWeb
translationOf: /2008/09/portable-contacts.html
translated: 2025-11-29
translatedManually: false
---

Plaxo's [Joseph Smarr](http://www.josephsmarr.com/) uses the term "Open
Building Blocks for the Social Web," which describes the "elements" needed to make the web more social and deepen the connections between services.

These "elements" include [OpenID](http://openid.net/), [OAuth](http://oauth.net/),
[microformats](http://microformats.org/),
[OpenSocial](http://www.opensocial.org/), all of which are important standards that will shape the future of the social web and have been discussed in this blog. One of these important elements is [Portable Contacts](http://portablecontacts.net/).

Joseph Smarr's company, Plaxo, has already published a usable API.

What is Portable Contacts?

> Portable Contacts, is an easy-to-implement "people data" API that provides
> secure access to both traditional address book data and to modern social
> application data (profiles and friends lists).

PortableContacts is an easy-to-implement "people data" API that provides secure access to both traditional address book data and modern social application data (profiles and friend lists).

If we take a look at the current spec:

* Discovery method (XRDS-Simple)
* Authentication/authorization method (OAuth, Basic Auth)
* Query parameters (sort, filter, etc.)
* Response format (JSON, XML)
* Error codes
* Contact schema

It was designed with the intention of not straying too far from existing specifications such as vCard and OpenSocial.

## When to use Portable Contacts

Portable Contacts represents an address book or a friend list, so it is expected to be applicable in a variety of fields.

### Exchange friend lists between social network services

A service example is already available in [MySpace DataAvailability](http://jp.techcrunch.com/archives/20080508myspace-embraces-data-portability-partners-with-yahoo-ebay-and-twitter/), but it will also make it possible to import your MySpace friend list into Twitter.

### Exchange address book with desktop app

For example, you can now synchronize your Mac OS X Address Book app with your Microsoft Outlook address book via a web service, all with a more unified standard than ever before.

### Sync your mobile phone and social networking address book

You can now have your social networking friend list on your phone, and vice versa. Things get even more interesting when a service like [Ripplex](http://www.ripplex.com/) comes into play.

Relationship with OpenSocial

Some of you may be wondering, "Wait, aren't OpenSocial and Portable Contacts the same thing?"
Yes, OpenSocial's People API and Portable Contacts basically have the same role. I personally wondered about this because I don't think it's a good idea to have multiple similar specifications.

In fact, thanks to Joseph Smarr's efforts, Portable Contacts was integrated into the OpenSocial v0.8.1 specification. In other words, the OpenSocial People API specification and the Portable Contacts specification are the same.

The OpenSocial v0.8.1 specification will likely be released soon, and we can confirm that its content is in line with Portable
Contacts.

## summary

The movement to build a social web ecosystem is accelerating even further with pieces like Portable Contacts coming together. We'll be keeping a close eye on the developments of the social web's main players.