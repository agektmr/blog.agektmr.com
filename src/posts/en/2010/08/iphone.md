---
layout: post
lang: en
title: Mobile web apps on iPhone
description:
date: 2010-08-11
categories:
  - HTML5
  - WebApp
tags:
  - iPhone
  - OpenAppMkt
translationOf: /2010/08/iphone.html
translated: 2025-11-30
translatedManually: false
---
It's been a while. I'm Eiji, and I spend every day working on web apps. Today, I'd like to share with you some interesting ideas I've come across for mobile web apps.

## OpenAppMkt

<a href="http://openappmkt.com/" target="_blank">http://openappmkt.com/__HTML_TAG_1__

This is a service for iPhones. You can use it without registering, so if you have an iPhone, give it a try.

[<img class="alignnone size-full wp-image-711" title="openappmkt_bookmark" src="/images/2010/08/10-23-57-28.jpg" alt="" width="320" height="480" />][1]

When I access it on my iPhone, it immediately asks me to "bookmark it to the home screen," so I try it. And sure enough, an icon appears on the home screen. Here's the problem.

[<img class="alignnone size-full wp-image-710" title="openappmkt_top" src="/images/2010/08/10-23-57-15.jpg" alt="" width="320" height="480" />][2]

When I clicked on the icon to launch it, it didn't launch a browser, but what looked like a native app! This is an app for installing apps, so I tried installing Facebook and launching it. This installation procedure also requires bookmarking it on the home screen.

[<img title="openappmkt_facebook" src="/images/2010/08/11-0-10-35.jpg" alt="" width="320" height="480" />][3]

When I launch the Facebook app, something that looks like a native app launches, but it's clearly the smartphone version of Facebook.

Actually, this is a web app. It's just that the navigation and menu aren't displayed, but Safari is running. I didn't know you could do this on an iPhone.

## Mobile Web Applications

When you actually try it, you'll notice that this alone makes a big difference to the user experience (mainly your mood). It's strange why most iPhone web apps haven't adopted this approach until now. Even if it looks like a website in Safari, when you can see the screen like this without navigation, you won't hesitate to treat it as a normal app.

It also has a solid response, so if the app is lightweight, you can use it without even thinking about it being a web app, and above all, it's great news for web developers that you can create iPhone apps with the same feeling you have when creating a web app. It's a simple technique that shouldn't be overlooked, as it also means you can make use of your existing assets.

At this point, the next issue is distribution. How do you distribute the web app you've created? That's what OpenAppMkt does. In short, it's the "web app version of the iTunes Store." Oh, and let's not forget about <a href="http://www.apple.com/webapps/" target="_blank"> and </a>. I haven't looked into the details, but it seems you can charge for it.

Combine with HTML5 to create the ultimate web app

As mentioned above, it seems that removing the Safari menu and status bar is very easy, just by adding the meta tag apple-mobile-web-app-capable to your HTML. For details, see <a href="http://developer.apple.com/safari/library/documentation/appleapplications/reference/safarihtmlref/articles/metatags.html" target="_blank">here</a>.

Apparently, this feature has been around since OS 2.1, and I remember hearing about it, but this was the first time I'd actually seen a web app running. In a sense, it could be said that the iPhone was waiting for the arrival of HTML5 for this feature to see the light of day.

For example, imagine combining this with ApplicationCache and Web SQL Database. All basic resources are cached locally with AppCache. Dynamic data is stored in Web SQL Database when offline, and is synchronized to the cloud when it detects that the application is online, creating a web app that can run completely offline.

I have so many dreams that it's a bit of a problem...

[1]: /images/2010/08/10-23-57-28.jpg
[2]: /images/2010/08/10-23-57-15.jpg
[3]: /images/2010/08/11-0-10-35.jpg
