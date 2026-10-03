---
layout: post
lang: en
title: So, are PWAs actually happening or not?
description: "This is an answer song to \"Engineers who say PWAs are the future should quit right now.\""
date: 2018-03-23
tags:
  - PWA
  - Progressive Web Apps
translationOf: /2018/03/instagram-pwa.html
translated: 2026-10-03
translatedManually: false
---
Yesterday, I came across this article on Twitter:

[PWA が来るって言っているエンジニアは今すぐ辞めろ](https://anond.hatelabo.jp/20180321171652)

"Some Goo*le evangelist or engineer was making noise, raving like 'Instagram's PWA is amazing~! You can't even tell it apart from the native app!!' so I tried it out, but it was a total bust."

Could they be talking about this?

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Instagram PWA is sooooooo impressive. I probably won&#39;t be able to distinguish it with its native app.<br>InstagramのPWAが、デキが良すぎて感動してる。ネイティブアプリと見分けられる自信ない。 <a href="https://t.co/DS8TfceBZ6">pic.twitter.com/DS8TfceBZ6</a></p>&mdash; Eiji Kitamura / えーじ (@agektmr) <a href="https://twitter.com/agektmr/status/956865567528374273?ref_src=twsrc%5Etfw">2018年1月26日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Admittedly, my phrasing might have been a bit provocative. However, when it came to Instagram's PWA—the smooth scrolling, being able to apply filters when posting, and so on—saying "I probably won't be able to distinguish it from the native app" was my honest initial impression, and I still use it comfortably today.

That said, I hadn't tested every single feature when I posted that tweet, and there were differences I noticed later on. To be clear, I certainly have no intention of saying native apps are unnecessary because of this. Rather, since the topic has come up, let me take this opportunity to explain PWAs in a bit more detail.

<!-- excerpt -->

## What is a PWA?

Many of you reading this are likely already familiar, but PWA stands for Progressive Web Apps. I've been talking about PWAs for three years now, so if you'd like to start with the fundamentals, please take a look at this article. It's a bit long, but just reading the beginning should be enough to get the general idea.

**[プログレッシブウェブアプリ詳解 - 過去・現在・未来](https://html5experts.jp/agektmr/20527/)**

As mentioned there, PWA is simply a convenient term for framing modern web technologies. It's similar to the movement where JavaScript, CSS, and everything else were bundled together under the banner of "HTML5." The anonymous post in question opened with "this HTML5 rebrand called PWA," and from an engineer's perspective, that actually isn't such a mistaken understanding.

When people hear "PWA," many seem to assume that you have to scrap your existing website and rebuild something that looks and feels just like a native app from scratch as an SPA (Single Page Application). Personally, I love that kind of challenge (for SPA-based PWAs, I recommend the [AppShell](https://developers.google.com/web/fundamentals/architecture/app-shell?hl=ja) approach), and [Instagram's PWA](https://instagram.com/) takes this SPA approach as well.

However, that is by no means a requirement for something to be a PWA. You can still reap the benefits of a PWA even with SSR (Server-Side Rendering), and there are quite a few PWAs built with that approach. In fact, progressively adding PWA features to an existing website is the very essence of PWA, which is where the name "Progressive" comes from.

[SUUMO is a great example](https://www.recruit-sumai.co.jp/press/2015/10/service-workeradd-to-homescreenoffline-cache2.html). First, they migrated their existing site to HTTPS (which might be the highest hurdle). Then, they added a Web App Manifest and used a Service Worker to cache the top page. By doing so, frequent visitors are prompted to add an icon to their home screen. Once added to the home screen, users can launch the site quickly with a single tap, significantly lowering the barrier to visiting again. You can read more details in [articles like this](http://tech.recruit-sumai.co.jp/suumo%25e3%2582%25b9%25e3%2583%259e%25e3%2583%259b%25e3%2582%25b5%25e3%2582%25a4%25e3%2583%2588%25e3%2581%25b8%25e3%2581%25aeservice-worker%25e5%25b0%258e%25e5%2585%25a5%25e2%2591%25a0-add-to-home-screen-%25).

There are many other examples of improving existing websites using a subset of the technologies grouped under PWA. In fact, simply keeping your conventional site and caching frequently used assets like images and CSS with Service Worker and the Cache API can speed things up overall without breaking unsupported browsers.

In fact, this blog is accelerated using that very method. Many of you might also know that [the mobile web version of Facebook](https://m.facebook.com/) sends personalized push notifications without prompting you to add the app to your home screen.

(By the way, there is [a page outlining the baseline requirements for a PWA along with features that elevate the user experience](https://developers.google.com/web/progressive-web-apps/checklist). Personally, I feel you don't need to be overly dogmatic about all of it, such as the "must be responsive" part.)

## Why Did Instagram Build a PWA?

Let's bring the conversation back to Instagram. First, let's start by considering why a service like Instagram, which is already wildly successful with its native app, went through the trouble of rebuilding that experience as a web app.

- Are they planning to pull their native apps if the PWA succeeds?
- Even if you can build something equivalent to a native app with PWA, what are the advantages?

You can actually find the answer by watching this video:

{% YouTube 'UTZVXlcUK1w' %}

Instagram's PWA was built targeting emerging markets like India and Southeast Asia.

Emerging markets are currently seeing rapid growth in internet users, and many globally expanding services are working to tap into this market. For instance, [Facebook Lite](https://play.google.com/store/apps/details?id=com.facebook.lite&hl=ja) (native app), [Twitter Lite](https://mobile.twitter.com/) (PWA), and Google has also released [a product series known as the Go edition](https://jp.techcrunch.com/2018/02/16/2018-02-15-google-launches-a-lightweight-gmail-go-app-for-android/). For global companies, focusing efforts on reaching emerging markets with massive growth potential—rather than fighting over the saturated, limited pie in developed countries—makes total sense in terms of return on investment.

That being said, if you target emerging markets, will offering the exact same app as in developed countries cut it? Of course it's not that simple. A clear example of this is the difference in internet connectivity environments.

For example, in parts of India, connections can be slow (2G), and users often prefer installing apps via Wi-Fi or SD cards rather than downloading and installing them over mobile networks (coupled with a tendency to use inexpensive, low-performance Android devices). Putting aside whether that's good or bad, such environments exist, and when targeting users there, the app's service design must account for poor internet connectivity. In other words, you can make the following hypothesis for emerging markets:

**Users don't want to consume a lot of data**

To win over users in emerging markets, you need to design apps that can be used with as little network data as possible. That is why the spotlight fell on PWAs, which allow for lightweight implementations.

## Why Is the UX of Instagram's PWA Different from Native?

The anonymous post pointed out differences from the native app, highlighting that you couldn't swipe through images (carousels) and that videos in Stories didn't play automatically.

As several people pointed out on [Hatena Bookmark](http://b.hatena.ne.jp/entry/s/anond.hatelabo.jp/20180321171652), swiping through carousels has nothing to do with PWAs per se—it can be implemented relatively easily using conventional web technologies. For instance, among mobile web carousels, one that I thought was well done is [Mastodon](https://mstdn.jp/). Looking into it, they seem to use a component called [react-swipable-views](https://github.com/oliviertassinari/react-swipeable-views) (by the way, Mastodon is also now an SPA-based PWA that supports push notifications and more). In Web Components, [paper-carousel](https://www.webcomponents.org/element/Redbility/paper-carousel) also felt like something that could be used as-is in Instagram. There's a demo at that link, so check it out on your smartphone.

So why didn't Instagram implement this?

As you know, the native Instagram app runs buttery smooth.

In fact, this is premised on generous resource consumption. Look closely: in the native app's carousel, the adjacent image is already loaded by the time you start swiping.

<figure>
<img src="/images/2018/pwa-1.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2018/pwa-2.png" style="min-width: 48%; max-width: 300px;">
<figcaption>Native app on the left, PWA on the right</figcaption>
</figure>

To achieve this, images and videos that aren't visible in the initial viewport must be preloaded in the background. While I haven't measured it directly, I imagine the native app easily loads anywhere from several megabytes to tens of megabytes between launching and making a few taps.

Conversely, looking at the PWA version of Instagram, as the article pointed out, you cannot swipe images—you have to tap a button instead.

As you may have already realized, this is an intentional design choice to prevent downloading resources without an explicit action from the user, ensuring a comfortable experience for data-conscious users.

By the way, as for the UX in the native app's Stories—where playback starts immediately upon opening, and you transition seamlessly with swipes and taps—it might not be impossible on the web if you push for it, but there are undoubtedly various challenges. Unfortunately, this isn't my area of expertise, so I'd appreciate it if someone could explain how to achieve this on the web, or why it might not be feasible.

## Should You Choose PWA Right Now?

Having read this far, I imagine no one is still agonizing over whether they must adopt PWAs, nor claiming that PWAs will make native apps disappear.

[When Terryman took over as Kinnikuman Great](https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q12135222022), he initially struggled because he couldn't replicate Prince Kamehame's fluid fighting style. But by bringing out his own trademark Texas fight style, he was reborn as the new Kinnikuman Great and seized victory.

Even when things look the same on the surface, the underlying details and the technologies used can differ depending on their role. What is important is to clearly identify who the service's target audience is, what approach is optimal, whether you can deliver the service to those intended users, and whether it will become a service they use for the long haul. PWAs—or rather, the evolution of the web—simply offer us new options to accomplish that. I hope you will choose the approach that best suits the goals you want to achieve.
