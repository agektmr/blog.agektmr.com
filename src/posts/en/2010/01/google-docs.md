---
layout: post
lang: en
title: The significance of Google Docs as a storage service
description:
date: 2010-01-14
tags:
  - GDrive
  - Google Docs
  - SocialWeb
translationOf: /2010/01/google-docs.html
translated: 2025-11-30
translatedManually: false
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/692" callback="wp_plus_one_handler"></g:plusone>
</div>

In the early hours of the 13th (Japan time), it was announced that Google Docs will be adding a new storage feature that will allow users to store up to 1GB of any file format for free, for $0.25 per GB per year, in addition to the existing formats such as Spreadsheet, Docs, and Presentation.

Although no client software was announced this time, the API has already been made public, so whether it's made by Google or another company, I'm sure that powerful Dropbox-like client software will eventually appear on various platforms. I'm looking forward to it.

By the way, this Google Docs storage, also known as GDrive, seems to have extremely important implications for the social web.

## Social Web and Access Control

I have long argued that the web will become an operating system, and that the social web will play a key role in this. I have a few theories about the social web.

* The social web will eventually become so ubiquitous that we won't even have to think about it.
* We'll need identities that can be used across all services.
* Social graphs will be linked to identities and can be carried around with us.
* Social graphs will be available on mobile phones, TVs, and home appliances.
* Social graphs will be used for access control in addition to sharing and invitations.
* File systems will eventually have ACL functionality that uses social graphs.

Of these, the last one, ACL, is an OS-level issue, so I thought it was still a long way off...

## Google Docs' ACL feature

In fact, the new Google Docs storage seems to have a powerful ACL function that uses this social graph. As Google Docs users will be well aware, this is because Google Docs itself originally had access management functionality.

![Google Docs ACL2](/images/2010/01/Google-Docs-ACL2.png)

When you create a file in Google Docs, you can set it to private by default, then make it public, open to a group, or share it by email address. When specifying email addresses, you can also use auto-complete from Google's social graph, known as your Gmail contact list. You can also set different viewing and editing access rights for each shared recipient.

What if this powerful access control feature could be applied to other types of files, such as images, music, and videos, stored in Google Docs storage, and managed in your own local folder? Files would always be synchronized with the cloud, and access rights could be managed by identities all over the world...wouldn't that be convenient?

I think this is truly the world of web OS.

## summary

We often hear people say that Google doesn't have a social networking site, but that's only true as an application platform. Taking the example of Google Docs storage, it seems that Google is steadily building a web OS platform that surpasses it.

With Chrome OS joining these services, Google's web OS will become even more powerful, and one day Facebook and Twitter may end up being in the palm of Google's hand.
