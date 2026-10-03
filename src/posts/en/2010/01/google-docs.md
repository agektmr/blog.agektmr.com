---
title: The implications of turning Google Docs into storage
layout: post
lang: en
date: 2010-01-14
tags:
  - GDrive
  - Google Docs
  - SocialWeb
translationOf: /2010/01/google-docs.html
translated: 2026-10-03
translatedManually: false
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/692" callback="wp_plus_one_handler"></g:plusone>
</div>

Early in the morning on the 13th (JST), Google [announced](http://googledocs.blogspot.com/2010/01/upload-and-store-your-files-in-cloud.html) that Google Docs will essentially gain cloud storage capabilities, allowing users to upload any file type in addition to existing formats like Spreadsheets, Docs, and Presentations, with up to 1GB for free and extra storage available for $0.25/GB/year.

Although no official client software was announced this time, the [API has already been released](http://code.google.com/intl/ja/apis/documents/docs/3.0/developers_guide_protocol.html). Whether built by Google or third parties, it seems certain that powerful [Dropbox](http://dropbox.com/)-like client apps will eventually appear on various platforms. Exciting times ahead.

By the way, this Google Docs storage—essentially "GDrive"—seems to have tremendous significance for the social web.

## The Social Web and Access Control

I have long argued that the web will [take on the role of an OS](http://japan.cnet.com/special/story/0,2000056049,20406495,00.htm), and that the social web will play a major part in that. I hold several theories regarding the social web:

* The social web will eventually become so ubiquitous that we won't even think about it
* We will need an identity that can be used across any service
* Social graphs will be portable and tied to this identity
* Social graphs will be usable on mobile phones, TVs, and home appliances
* Social graphs will be used not only for sharing and invitations, but also for access control
* Eventually, file systems will feature ACL capabilities powered by social graphs

Among these, I thought the last point about ACLs was still far off in the future, since it operates at the OS level...

## ACL Capabilities in Google Docs

As it turns out, this Google Docs storage seems to come equipped with powerful ACL features powered by social graphs. Those who use Google Docs are probably well aware of this, simply because Google Docs has had access control features from the beginning.

![Google Docs ACL2](/images/2010/01/Google-Docs-ACL2.png)

In Google Docs, when you create a file, it defaults to private. From there, you can choose to make it public, share it with a group, or share it via specific email addresses. When specifying email addresses, you can naturally auto-complete them using the social graph of Google's Gmail contact list. You can also separate view and edit permissions for each person you share with.

What if this powerful access control could be applied to all kinds of files—like images, music, and videos—stored in Google Docs storage, and managed directly from your local folders? A world where your files are always in sync with the cloud, and access permissions can be managed against identities from all around the world... Doesn't that sound incredibly convenient?

I believe this is precisely what a Web OS looks like.

## Summary

I often see arguments along the lines of "Google doesn't have an SNS...", but that only looks at things through the lens of an application platform. Taking this Google Docs storage as an example, Google appears to be steadily building a Web OS platform that transcends that.

As Chrome OS joins these services moving forward, Google's Web OS will become even more powerful. The day might come when even Facebook and Twitter are simply operating within the palm of Google's hand.
