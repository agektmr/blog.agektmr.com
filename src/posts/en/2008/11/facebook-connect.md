---
title: The Future of the Social Web as Seen Through Facebook Connect
layout: post
lang: en
date: 2008-11-20
tags:
  - DataPortability
  - Facebook
  - Service
  - SocialWeb
  - Facebook Connect
translationOf: /2008/11/facebook-connect.html
translated: 2026-10-03
translatedManually: false
---
It has been six months since technologies enabling DataPortability—such as Data Availability, Facebook Connect, and FriendConnect—were announced, and services that actually utilize them are finally starting to appear.

Until now, gadgets and embedded applications on Facebook and OpenSocial were almost exclusively built as plugins where external services provided functionality to the central social network. In contrast, Data Availability and Facebook Connect use RESTful APIs and similar mechanisms to export the social network out to external services. Today, I'd like to introduce a concrete picture of what the future social web will look like, using Citysearch's implementation of Facebook Connect as an example.

## Citysearch Adds Beta Support for Facebook Connect

As far as I know, this is the first decent service supporting Facebook Connect / DataPortability.

[Citysearch](http://beta.citysearch.com/) is a social network where people who have visited restaurants, hotels, and other venues write and share reviews.

![citysearch1](/images/2008/11/citysearch1.jpg)

If you look closely, there is a "Sign In Using Facebook" button in the upper right corner of the screen.

![signinfacebook](/images/2008/11/signinfacebook.png)

Let's click it and try logging in.

### Authentication

![citysearch2](/images/2008/11/citysearch2.jpg)

A Lightbox-style dialog pops up, asking for confirmation to sign in using your Facebook account.

The important points here are:

* The Citysearch logo is displayed. This indicates that some prior communication occurred between Facebook and Citysearch, even if automated.
* This dialog is an **iframe**. In my case, I was already logged into Facebook, so it only showed a confirmation prompt. However, if you are not logged in, it appears to pop up a separate window (as an anti-phishing measure) asking for your Facebook username and password.
* You need to agree to the terms of service. Though subtle, legal hurdles in Japan will likely become an issue going forward.

### Service Registration

![citysearch3](/images/2008/11/citysearch3.jpg)

Once connected, you are prompted for a member name because you aren't registered yet. This seems to be provided for users without an existing account. Here again, there are a few interesting points:

* Facebook's authentication is proprietary, but if this were an open standard, it would likely be an [OAuth/OpenID combo](http://step2.googlecode.com/svn/spec/openid_oauth_extension/drafts/0/openid_oauth_extension.html). In other words, Facebook's proprietary approach seems to handle authentication and authorization simultaneously.
* As we'll see later, the newly created account imports at least the Facebook profile photo, name, and friends list. With open standards, you would perhaps use OpenID with sreg to import the nickname and profile photo, and OAuth to import the friends list—or perhaps OAuth alone would suffice.
* There is a link that says "Merge your Facebook profile with an existing Citysearch account?". Considering how few services allow merging existing accounts with OpenID, this is quite thoughtful.
* Here, it seems users are asked to agree to Citysearch's own terms of service.

### Connection Complete

![citysearch4](/images/2008/11/citysearch4.jpg)

Once logged in, your Facebook profile picture is displayed in the upper right corner of the screen.

![citysearch5](/images/2008/11/citysearch5.jpg)

My profile page only shows my name and profile photo. I haven't investigated whether other information gets exported.

![citysearch6](/images/2008/11/citysearch6.jpg)

Here is the key feature: the friends list. Unfortunately, as indicated by "None of your Facebook friends are Citysearch members", it seems only Facebook friends who are registered on both services are shown. It would be nice to have a feature here that also displays unregistered friends and allows you to "Invite them to Citysearch."

## Activities as Feedback

Everything we have seen so far was on the Citysearch interface. Facebook is merely providing the data it holds, and if you think about it, there doesn't seem to be any benefit for them. There is no obvious way to display ads either. So why would they generously share their social graph?

The reason is that Facebook Connect has a mechanism to feed activities back into Facebook, allowing Facebook to become an aggregator for connected services. The part in the image below labeled "Publish stories to my Wall" corresponds to this. In OpenSocial terms, this is the equivalent of an activity stream.

![citysearch7](/images/2008/11/citysearch7.png)

I wanted to post an actual screenshot of this in action, but since I don't feel quite brave enough to write a review on Citysearch, I'll link to [John McCrea's sample](http://www.flickr.com/photos/56624456@N00/3044329360/) instead.

![Citysearch_Facebook](https://farm4.static.flickr.com/3278/3044329360_6171dc1f04.jpg?v=0)

Becoming an activity aggregator is an extremely important strategy for driving traffic. Simply by visiting Facebook, users can see at a glance what their friends are doing across various services. They can discover services they didn't know about through their friends. Furthermore, there are [ways to leverage](http://www.ideaxidea.com/archives/2007/11/facebooksocial_ads.html) these aggregated activities, holding a variety of monetization possibilities.

### Reference Links

* [CitySearch Goes Social with Great Facebook Connect Implementation – The Real McCrea](http://therealmccrea.com/2008/11/19/citysearch-goes-social-with-great-facebook-connect-implementation/)
* [Dare Obasanjo aka Carnage4Life – Some Thoughs on Facebook Connect and CitySearch](http://www.25hoursaday.com/weblog/2008/11/19/SomeThoughtsOnFacebookConnectAndCitySearch.aspx)
