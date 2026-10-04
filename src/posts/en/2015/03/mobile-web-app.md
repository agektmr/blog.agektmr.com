---
layout: post
lang: en
title: "What's so great about web push notifications?"
description: Let me talk about how exciting the push notification feature introduced in Chrome Beta 42 is.
date: 2015-03-13
tags:
  - Service Worker
  - Push Notification
translationOf: /2015/03/mobile-web-app.html
translated: 2026-10-03
translatedManually: false
---
On March 13, the [Chrome Beta blog post](http://googledevjp.blogspot.jp/2015/03/chrome-42-es6-class.html) was published. The personal highlight for me is that push notifications are now available in Chrome for Android.

If you thought, "Sure, push notifications might be handy," you're not shocked enough. You should be blown away. You should be dancing for joy.
Let me explain why.

<!-- excerpt -->

## User Engagement Will Change

Whether your website's business model relies on advertising or subscriptions, having users return repeatedly is a fundamental prerequisite. Typical websites and services constantly devise strategies to achieve this. By actively providing reasons or triggers for users to come back, businesses keep running. However, the methods available to deliver those triggers have been severely limited.

The most traditional method, used since the early days of the internet, is email; social media emerged a few years ago, and more recently, native app notifications (where the app itself is the destination you want them to return to). The reality today is that with any of these methods, it is difficult to even reach the starting line.

### Email Addresses

Even if you want to pique users' interest and bring them back by sending updates via direct mail or newsletters, acquiring their email addresses in the first place is no easy task. As personal information, email addresses are usually collected alongside other private data during account registration. This requires the site to earn a significant amount of trust from the user in a short period of time. Even major websites resort to somewhat sneaky tactics just to maintain a pretext for sending emails—that is how critical acquiring email addresses is as a lifeline for web services.

### Social Media

The popular trend in recent years, so-called social media marketing, involves getting users to "Like" on Facebook or "Follow" on Twitter so you can push updates into their feeds. Compared to acquiring an email address, it only takes a single button click from the user, and it lets you surface information in a "place" they already visit regularly. It is practically the mainstream marketing method today.

However, this entirely relies on the premise that the user actually checks that "place" on a regular basis. Not all users behave that way, and there is no guarantee that visitors to your site even use Facebook or Twitter in the first place.

### Native Apps

Performance isn't the only reason service providers choose native apps over the web.

<blockquote class="twitter-tweet" lang="ja"><p>A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they&#39;re available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, 3月 12</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> In a survey a year ago, the #1 reason (for web developers) to move to native was push notifications.

This is the result of a survey conducted by Paul Irish, and even in my own circles, I often hear people say, "We chose native over the web simply because we wanted to send notifications to users."

E-commerce apps send alerts about new products and promotions, games announce new stages, social networks notify you of replies from friends, and email apps alert you to new messages. With smartphones, which are almost always turned on and kept close at hand, the probability that a user will see the notification is dramatically higher than with other channels.
However, this is only true "if they install the app." In reality, getting users to install an app in the first place is notoriously difficult.

## The Impact of Web Push Notifications

The web push notifications now available in Chrome Beta surpass all of the options above in many ways. First, give it a try for yourself.

![](/images/2015-03-13/push-message.gif)

[Simple Push Demo](https://simple-push-demo.appspot.com/)

1. Open the site above in [Chrome Beta for Android](https://play.google.com/store/apps/details?id=com.chrome.beta)
2. Tap "Enable Push Notifications"
3. When prompted for notification permissions, tap "Allow"
4. Tap "SEND A PUSH TO GCM VIA XHR", or copy and paste the curl command below it into your terminal to send a command directly to GCM

Did you see the notification?

Since this is a demo, having the user trigger the notification themselves in step 4 feels a bit silly, but in an actual service, the provider can push it at any time.

The crucial point here is that **the only action required of the user to receive notifications is granting permission**.

- Users don't have to go through an install step; they just need to visit the website
- Users don't need to register an account or enter personal info like email addresses
- The Android OS notification shade is the "place," so it reaches the user almost without fail
- The website does not need to be open to receive notifications
- Because it is built on web standards, other browsers will likely be able to support this in the future

In the history of the internet, has there ever been a way to achieve user engagement this easily and with such a high delivery rate?

## Potential Use Cases

- E-commerce sites notifying users about new product releases
- Social networks alerting users to new comments
- Blogs announcing new posts
- Webmail notifying users of incoming emails
- Messaging apps alerting users about mentions
- Calendar apps sending event reminders

etc...

## The Technology Behind Push Notifications

I won't dive into the detailed implementation here. A [fantastic article](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web) has already been published, so please give that a read. Not confident in your English? I'm sure someone will translate it into Japanese soon :)

Here are a few key points. Chrome's push notification feature:

- Uses [Service Worker](http://www.html5rocks.com/ja/tutorials/service-worker/introduction/)
- Uses [Google Cloud Messaging](https://developer.android.com/google/gcm/index.html) (GCM) for pushing in Chrome for now
- Requires HTTPS

That's the gist of it.

## Summary

As you can see from the [FAQs in that article](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web), Chrome's current implementation still has quite a few limitations, such as not being able to include payload data directly in GCM messages. Naturally, this feature will be even more powerful once other browsers ship their implementations as well.

For reasons like these, web push notifications might still seem like a technology from the near future. But now is the time to start experimenting with it.
It's the way of the world that compelling technologies get abused, so anticipating that this feature might be exploited, I think it's vital to start strategizing now about how to earn user trust through your approach.

Just like email marketing and social media marketing, we might soon start hearing terms like "push notification marketing."

No, seriously.

## Updates

- I had no idea about [Safari Push Notifications](https://developer.apple.com/notifications/safari-push-notifications/). My apologies, my bad!
- I noticed some comments expressing concern about spam, but since subscription management is entirely in the hands of the user, my take is that it won't be as big of an issue.
