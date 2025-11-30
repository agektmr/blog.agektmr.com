---
layout: post
lang: en
title: I created a widget for FriendFeed Dashboard
description:
date: 2008-04-03
tags:
  - Dashboard
  - FriendFeed
  - Widget
translationOf: /2008/04/friendfeed-dashboard.html
translated: 2025-11-30
translatedManually: false
---
![FriendFeedr](/images/2008/04/friendfeeder.jpg)

I've created a Dashboard widget for Mac OS X called FriendFeeder (working name), which is compatible with the popular FriendFeed app, and I'm releasing it to the public. I think there are still a lot of bugs, but it works for now, so I'm going with the flow.

##What is FriendFeed?

![friendfeedservices](/images/2008/04/friendfeedservices-186x300.jpg)

[FriendFeed](http://friendfeed.com/) is a web service that has been getting a lot of buzz recently around [TechCrunch](http://jp.techcrunch.com/tag/friendfeed/). It's said to be the next big thing after Twitter. Simply put, it's a social networking aggregator. It's a social networking service that brings together a number of social networking services.

Although it is called SNS, it is not an SNS like Facebook, but rather it is specialized in aggregating the latest information from general blogs and SNS-like services such as Twitter, Flickr, YouTube, del.icio.us, Last.fm, etc. It also has a feature that allows you to add comments to entries and star them.

## Why is FriendFeed so hot?

The answer is simple: this service is clearly aware of Twitter's existence and is an extension of it.

Twitter has become a desktop app/service for many people (I personally use the Dashboard widget called TwitterBoard). What's interesting is that a service with a bland interface like Twitter has become more diverse with the number of apps developed by many developers. FriendFeed's bland interface and comprehensive API make it seem like it's taking inspiration from Twitter, but aiming to be something even better.

Another feature that seems to be inspired by Twitter is the comment function. FriendFeed sorts replies on Twitter to show the flow of conversations more clearly. There is also an option to update comments on FriendFeed directly to Twitter.

In that sense, it might be more appropriate to call it Twitter + α rather than a social media aggregator. At least for me, that's probably going to be the main way I use it.

![friendfeedscreen](/images/2008/04/friendfeedscreen.jpg)

## More than just a feed aggregator

Until now, feed aggregators have been RSS readers, but FriendFeed is more than just a feed aggregator because it handles authentication and authorization.

RSS feeds are generally publicly available, so there's no need to worry about privacy. Since it's likely that many people will view the same content, caching has made it much more efficient. However, FriendFeed uses external services, including Gmail, that require authentication. This means that each user must access the feed once.

This seems like a much bigger task than Twitter. The more users there are, the harder it becomes. What kind of architecture is this?

What's next for FriendFeed?

They plan to release a desktop application using Adobe AIR. Currently, only predefined services can be registered, but they plan to provide a system that allows service providers to create their own APIs for FriendFeed.

It's no coincidence that it's similar to Facebook's direction, except for the variety of user interfaces (API) and the ease of friend requests (Follow). Social graph aggregation is a given, but it will be interesting to see which path will attract the most users.

## How to download and use FriendFeeder

Finally, the main topic (lol)

[**Download here**](http://devlab.agektmr.com/DashboardWidget/FriendFeeder.zip)
**Requires Mac OS X 10.4.3 or later.**

### Known Issues

There is no scroll bar! Please use the mouse wheel.

### How to use

First, create an account with FriendFeed.
Enter your ID and Remote Key (not your password) on the back of the widget (settings screen). You can get your Remote Key at [`http://friendfeed.com/remotekey`](http://friendfeed.com/remotekey).

### Feedback

We are considering adding a comment function and a Twitter posting function in the future. If you have any other ideas, please comment on this entry or let us know on [Twitter](http://twitter.com/agektmr).

Also, my FriendFeed account is at [`http://friendfeed.com/agektmr`](http://friendfeed.com/agektmr), so feel free to follow me.
