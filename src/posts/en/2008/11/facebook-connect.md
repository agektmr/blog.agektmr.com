---
layout: post
lang: en
title: "Facebook Connect: The Future of the Social Web"
description:
date: 2008-11-20
tags:
  - DataPortability
  - Facebook
  - Service
  - SocialWeb
  - Facebook Connect
translationOf: /2008/11/facebook-connect.html
translated: 2025-11-30
translatedManually: false
---
It's been six months since the Data Availability, Facebook Connect, and FriendConnect technologies that enable DataPortability were announced, and services that actually use them are finally starting to appear.

Until now, gadgets and embedded applications on Facebook and OpenSocial have only plugged into the core social network, with external services providing functionality. Data Availability and Facebook Connect, on the other hand, export the social network to external services using RESTful APIs. Today, I'd like to use Facebook Connect, implemented in a service called Citysearch, as an example to show the concrete shape of the social web of the future.

Citysearch now supports Facebook Connect in beta

As far as I know, this is the first decent Facebook Connect/DataPortability compatible service.

[Citysearch](http://beta.citysearch.com/) is a social network where people who have actually stayed at restaurants, hotels, etc. can write and share reviews.

![citysearch1](/images/2008/11/citysearch1.jpg)

If you look closely, you will see the words "Sign In Using Facebook" in the top right corner of the screen.

![signinfacebook](/images/2008/11/signinfacebook.png)

Click here to try logging in.

### certification

![citysearch2](/images/2008/11/citysearch2.jpg)

A Lightbox-like dialog box will pop up, asking you if you want to sign in with your Facebook account.

The important thing here is

* The Citysearch logo is included. This suggests that there was some prior interaction between Facebook and Citysearch, even if it was automated.
* This dialog is an **iframe**. In my case, I was already logged in to Facebook, so only a confirmation message was displayed. However, if you're not logged in, a separate window will pop up requesting your Facebook ID and password (as a phishing prevention measure).
* You must agree to the terms of use. While modest, legal hurdles in Japan are likely to become an issue in the future.

### Service registration

![citysearch3](/images/2008/11/citysearch3.jpg)

When you connect, you will be asked for your member name because you are not registered. This appears to be for people who do not have an existing account. There are a few points to note here as well.

* Facebook's authentication method is proprietary, but if it were open, it would likely be an [OAuth/OpenID combo](http://step2.googlecode.com/svn/spec/openid_oauth_extension/drafts/0/openid_oauth_extension.html). In other words, Facebook's proprietary method seems to perform authentication and authorization simultaneously.
* As you'll see later, the created account at least imports your Facebook profile picture, name, and friend list. If it were open, you'd probably import your nickname and profile picture using sreg with OpenID, and your friend list using OAuth. OAuth alone might be sufficient.
* There's a link that asks, "Merge your Facebook profile with an existing Citysearch account?" This is quite a clever touch, considering the lack of services that allow you to merge an existing account with OpenID.
* This appears to require you to agree to Citysearch's own terms of use.

### Connection complete

![citysearch4](/images/2008/11/citysearch4.jpg)

When you log in, you'll see your Facebook profile picture in the top right corner of the screen.

![citysearch5](/images/2008/11/citysearch5.jpg)

My Page only displays my name and profile picture. I haven't investigated whether any other information is exported.

![citysearch6](/images/2008/11/citysearch6.jpg)

The key point here is the friend list. Unfortunately, as it says "None of your Facebook friends are Citysearch members," it seems that only Facebook friends who are registered on both sites are displayed as friends. I think it would be nice to have a feature that displays unregistered friends and allows you to "invite them to Citysearch."

Feedback Activities

So, everything we've seen so far has been on Citysearch. Facebook just gives away its data, and it doesn't seem like there's anything good to be gained from it. I can't even find a way to place ads. So why is it so generously sharing its social graph?

In fact, Facebook Connect has a mechanism for feeding activity back to Facebook, which allows Facebook to act as an aggregator of connected services. This is the "Post a post to a message board" section in the image below. In OpenSocial terms, this corresponds to the activity stream.

![citysearch7](/images/2008/11/citysearch7.png)

I would like to post the actual screenshots, but I don't have the courage to write a review on Citysearch, so I'll just link to [John McCrea's example](http://www.flickr.com/photos/56624456@N00/3044329360/).

![Citysearch_Facebook](https://farm4.static.flickr.com/3278/3044329360_6171dc1f04.jpg?v=0)

Becoming an activity aggregator is a crucial strategy for attracting traffic. Simply by visiting Facebook, you can see your friends' activity across various services at a glance. Through your friends, you can discover new services you didn't know about before. Furthermore, the aggregated activity can be used in a variety of ways, opening up various potential monetization opportunities.

### Reference sites

* [CitySearch Goes Social with Great Facebook Connect Implementation – The Real
  McCrea](http://therealmccrea.com/2008/11/19/citysearch-goes-social-with-great-facebook-connect-implementation/)
* [Dare Obasanjo aka Carnage4Life – Some Thoughts on Facebook Connect and
  CitySearch](http://www.25hoursaday.com/weblog/2008/11/19/SomeThoughtsOnFacebookConnectAndCitySearch.aspx)
