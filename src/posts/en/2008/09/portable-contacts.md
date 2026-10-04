---
title: Portable Contacts, an Open Contact List Specification
layout: post
lang: en
date: 2008-09-18
tags:
  - PortableContacts
  - DataPortability
  - OpenSocial
  - SocialWeb
translationOf: /2008/09/portable-contacts.html
translated: 2026-10-03
translatedManually: false
---
[Joseph Smarr](http://www.josephsmarr.com/) of Plaxo often uses the phrase "Open Building Blocks for the Social Web." This refers to the essential "building blocks" needed to make the web more social and deepen interoperability across services.

These "building blocks" include [OpenID](http://openid.net/), [OAuth](http://oauth.net/), [microformats](http://microformats.org/), and [OpenSocial](http://www.opensocial.org/)—all of which have been covered on this blog as crucial standards shaping the future of the social web. Now, another important piece has been added to the mix: [Portable Contacts](http://portablecontacts.net/).

[Plaxo](http://www.plaxo.com), where Joseph Smarr works, has already [released a working API](http://www.plaxo.com/api/portablecontacts).

## What is Portable Contacts?

> Portable Contacts, is an easy-to-implement "people data" API that provides secure access to both traditional address book data and to modern social application data (profiles and friends lists).

Looking at the [current draft specification](http://portablecontacts.net/draft-spec.html), it covers:

* Discovery mechanisms (XRDS-Simple)
* Authentication / authorization methods (OAuth, Basic authentication)
* Query parameters (sorting, filtering, etc.)
* Response formats (JSON, XML)
* Error codes
* Contact schemas

It is designed with careful consideration not to deviate significantly from existing specifications such as vCard and OpenSocial.

## Use Cases for Portable Contacts

Since Portable Contacts represents address books and friend lists, it can be applied across a variety of areas.

### Exchanging Friend Lists Between Social Network Services

As already [demonstrated by MySpace's DataAvailability](http://jp.techcrunch.com/archives/20080508myspace-embraces-data-portability-partners-with-yahoo-ebay-and-twitter/), it will be possible to do things like importing your MySpace friend list into Twitter.

### Exchanging Address Books with Desktop Applications

For example, syncing the Mac OS X Address Book with Microsoft Outlook's contacts via a web service can now be done over a more unified standard than ever before.

### Syncing Address Books Between Mobile Phones and SNS

You will be able to load your SNS friend list directly onto your mobile phone, or vice versa. If services like [Ripplex](http://www.ripplex.com/) sit in between, even more interesting possibilities could emerge.

## Relationship with OpenSocial

Wait, aren't OpenSocial and Portable Contacts the same thing? Some of you might be wondering. Yes, fundamentally, OpenSocial's People API and Portable Contacts serve the same purpose. Having multiple similar specifications is generally undesirable, which made me wonder about this as well.

In fact, thanks to efforts led by Joseph Smarr, Portable Contacts was **merged into the OpenSocial v0.8.1 specification**. In other words, the OpenSocial People API specification and the Portable Contacts specification are **the same**.

The OpenSocial v0.8.1 specification should be published soon, and you will be able to see that its content aligns directly with Portable Contacts.

## Summary

The movement to build a social web ecosystem is accelerating as pieces like Portable Contacts fall into place. We should definitely keep a close eye on the moves made by the major players in the social web space going forward.
