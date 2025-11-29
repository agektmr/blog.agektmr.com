---
layout: post
lang: en
title: 'Web push notifications: what's so great about them?'
description: 'We talk about the excitement surrounding the push notification feature available in Chrome Beta 42.'
date: 2015-03-13
tags:
- Service Worker
- Push Notification
translationOf: /2015/03/mobile-web-app.html
translated: 2025-11-29
translatedManually: false
---

On March 13th, the [Chrome Beta blog post](http://googledevjp.blogspot.jp/2015/03/chrome-42-es6-class.html) was released. For me, the highlight was that push notifications became available on Chrome for Android.

If you're thinking, "Sure, push notifications are convenient," then you're in for a surprise. You should be overwhelmed. You should be jumping for joy. 
Here's why.

<!-- excerpt -->

## User engagement is changing

Whether your website's business model is advertising or paid, the basic premise is that users will visit repeatedly. Normal websites and services devise strategies to achieve this. By actively providing opportunities for users to return, the service can keep the business running. However, it must be said that the methods for providing these opportunities are extremely limited.

Email has been a staple since the early days of the internet, social media has been around for a few years now, and more recently native app notifications (where the app itself is the place to return). And yet, with all of these methods, it's difficult to even get off the ground.

### email address

For example, even if you want to pique users' interest and keep them coming back by sending them the latest information via direct mail, it's not easy to acquire their email addresses in the first place. Email addresses are private information for users, and are often collected along with other private information in the form of membership registrations. For this reason, sites must gain a considerable amount of trust from users in a short space of time. Obtaining email addresses is so vital for web services that even major sites will resort to somewhat underhanded methods to maintain a reason to continue sending emails.

### Social Media

So-called social media marketing, which has become popular in recent years, allows you to post any information you want on users' timelines by getting them to "like" you on Facebook or "follow" you on Twitter. Compared to acquiring email addresses, this can be achieved with just the click of a button, and since you can post information in places that users are likely to visit regularly, it is a marketing method that can be said to be currently mainstream.

However, this only works on the assumption that users regularly visit that "space," and not all users necessarily behave in this way, nor is there any guarantee that users who visit the site also use Facebook or Twitter.

### Native App

Performance isn't the only reason service providers choose native apps over the web.

<blockquote class="twitter-tweet" lang="ja"><p>A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they're available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf__HTML_TAG_4____HTML_TAG_5__&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, March 12</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> In a survey conducted a year ago, the number one reason (web developers) moved to native was notifications.

These are the results of a survey conducted by Paul Irish, but I also occasionally hear from people around me that they chose a native platform over the web because they wanted to notify users.

E-commerce apps send notifications about new products and campaigns, games about the addition of new stages, social media apps about replies from friends, and email apps about new emails, among other things. With smartphones, since they're usually always on and always with you, the chances of users seeing them are much higher than with other methods. 
However, this is only if users install the app. It's usually difficult to get people to install an app in the first place.

## The impact of web push notifications

The web version of push notifications, now available in Chrome Beta, surpasses all of the above in many ways.

![](/images/2015-03-13/push-message.gif)

[Simple Push Demo](https://simple-push-demo.appspot.com/)

1. Access the above site via [Android Chrome Beta](https://play.google.com/store/apps/details?id=com.chrome.beta)
2. Tap "Enable Push Notifications"
3. If prompted for permission to send notifications, tap "Allow"
4. Tap "SEND A PUSH TO GCM VIA XHR" or copy and paste the curl command below to send a command directly to GCM from Terminal.

Did you get a notification?

Since this is a demo, the part in step 4 where the user has to trigger the notification themselves is a bit silly, but in a real service, the service provider will be able to issue this notification at any time.

The important thing to note here is that the only action required from the user to receive notifications is to "allow."

- Users simply access the website without any installation steps.
- There's no need to register by entering personal information like an email address.
- The Android OS's notification feature uses "place," so notifications are almost guaranteed to reach the user.
- The website doesn't need to be open to receive notifications.
- Because it's built on web standards, it's possible that similar functionality could be implemented in any browser in the future.

Has there ever been a time in the history of the internet where user engagement has been this easy and with such a high success rate?

## Expected use cases

- Notifications of new product releases on e-commerce sites
- Notifications of comments on social media
- Notifications of new articles added to blogs
- Notifications of new emails on webmail
- Notifications of mentions in messenger apps
- Notifications of appointments in calendar apps

etc...

## Push notification technology

I won't go into the details of how to implement it here. There's already a great article about it, so please read that. Not good at English? I'm sure someone will translate it into Japanese :)

Here are some key points: Chrome's push notifications feature:

- Uses [Service Worker](http://www.html5rocks.com/ja/tutorials/service-worker/introduction/)
- Currently, in Chrome, push notifications are sent using [Google Cloud Messaging](https://developer.android.com/google/gcm/index.html)
- HTTPS is required

Something like that.

## summary

As you can see in the FAQs for this article, Chrome's implementation still has many limitations, such as the inability to include information in GCM data. Naturally, this feature will be more effective once it is implemented in other browsers as well.

For these reasons, web push notifications may still be a technology of the future. But now is the time to start testing them. 
As attractive technology tends to be used in clever ways, I think it's important to anticipate the possibility that this feature will be overused and to start developing a strategy now for how to gain user trust.

Just like email marketing and social media marketing, terms like push notification marketing may soon become popular.

No, seriously.

## postscript

- [Safari Push Notifications](https://developer.apple.com/notifications/safari-push-notifications/) I didn't know about that. Sorry, sorry.
- I saw a comment about spam, but I don't think it's much of a problem since subscription management is up to the user.
