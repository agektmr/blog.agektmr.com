---
layout: post
lang: en
title: 'So, are PWAs coming or not?'
description: 'This is an answer song to "Engineers who say PWA is coming, quit now"'
date: 2018-03-23
tags:
- PWA
- Progressive Web Apps
translationOf: /2018/03/instagram-pwa.html
translated: 2025-11-29
translatedManually: false
---

I found this article on Twitter yesterday.

[Any engineers who say PWA is coming, quit now](https://anond.hatelabo.jp/20180321171652)

"Instagram's PWA is amazing! It's indistinguishable from native!" I heard some Google evangelist or engineer raving about it, so I gave it a try, but it was outdated."

Could this be it?

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Instagram PWA is so impressive. I probably won't be able to distinguish it from its native app.<br>Instagram's PWA is so impressive. I'm not sure I can distinguish it from its native app. <a href="https://t.co/DS8TfceBZ6">pic.twitter.com/DS8TfceBZ6</a></p>&mdash; Eiji Kitamura / えーじ (@agektmr) <a href="https://twitter.com/agektmr/status/956865567528374273?ref_src=twsrc%5Etfw">January 26, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Admittedly, this statement may have been a bit provocative, but when it comes to Instagram's PWA, the scrolling experience, the ability to apply filters when posting, etc., I honestly thought, "I'm not sure I can tell the difference from a native app," and that was my first impression when I used it, and I still enjoy using it today.

However, at the time of this tweet, I had not yet tried all of the features, and there were some differences that I noticed later. Please don't get me wrong, of course, I am not saying that native apps are unnecessary. In fact, I would like to take this opportunity to explain PWA a little more.

<!-- excerpt -->

What is a PWA?

If you're reading this article, you probably already know what it means, but PWA stands for Progressive Web Apps, which is written as "Progressive Web App" in Japanese. I've been talking about PWA for the past three years, so if you want to start with a basic understanding, please read this. It's a bit long, but I think the first part is enough to get an overview.

**[Progressive Web Apps Explained - Past, Present, and Future](https://html5experts.jp/agektmr/20527/)**

As stated here, PWA is simply a term that frames the latest web technology in an easy-to-understand way. It's similar to the movement that lumped together JavaScript and CSS and called it "HTML5." The anonymous post began with the line, "PWA is a rebranding of HTML5," but from an engineer's perspective, this isn't such a bad interpretation.

When people think of PWAs, they tend to think that they have to abandon their existing website and re-create something that looks exactly like a native app as a SPA (Single Page Application). Personally, I love this kind of challenge (for SPA PWAs, I recommend the [AppShell](https://developers.google.com/web/fundamentals/architecture/app-shell?hl=ja) approach), and Instagram's PWA also uses this SPA approach.

However, that's not necessarily a requirement for a PWA. You can still benefit from PWAs with SSR (server-side rendering), and in fact, quite a few PWAs take this approach. What's more, the true essence of PWAs lies in gradually adding PWA functionality to an existing website, which is where the name "progressive" comes from.

[Suumo is a good example](https://www.recruit-sumai.co.jp/press/2015/10/service-workeradd-to-homescreenoffline-cache2.html). First, make your existing site HTTPS (this may be the most difficult part). Then, create a Web App Manifest and use a Service Worker to cache the top page. This will encourage frequent users to add an icon to their home screen. Adding an icon to the home screen allows users to quickly launch the site with just one tap, significantly lowering the psychological barrier to accessing it. For more details, see [these articles](http://tech.recruit-sumai.co.jp/suumo%25e3%2582%25b9%25e3%2583%259e%25e3%2583%259b%25e3%2582%25b5%25e3%2582%25a4%25e3%2583%2588%25e3%2581%25b8%25e3%2581%25aeservice-worker%25e5%25b0%258e%25e5%2585%25a5%25e2%2591%25a0-add-to-home-screen-%25).

There are many other examples of existing websites being improved using some of the technologies categorized as PWAs. In fact, even if you keep your site as it is and simply cache frequently used resources such as images and CSS using Service Workers and the Cache API, you can achieve overall speed improvement without interfering with browsers that do not support it.

In fact, this blog is also trying to speed up in this way. Many people know that [Facebook on mobile](https://m.facebook.com/) sends personalized push notifications without prompting you to add it to your home screen.

(By the way, there is a page that shows the minimum requirements for a PWA and features that will further enhance the user experience. Personally, I think it's better not to be too hung up on some aspects, such as the "responsiveness" part.)

## Why did Instagram create a PWA?

Let's go back to Instagram for a moment. Let's start by asking why Instagram, an already hugely successful native app service, went to the trouble of recreating the experience as a web app.

- If PWAs are successful, will they abandon native apps?
- Even if PWAs can create something equivalent to native apps, what are the benefits?

Well, if you watch this video you'll find the answer.

{% YouTube 'UTZVXlcUK1w' %}

Instagram's PWA was created to target emerging countries such as India and Southeast Asia.

Emerging countries are currently experiencing rapid growth in the number of internet users, and many global services are working to develop this market. For example, Facebook Lite (native app), Twitter Lite (PWA), and Google have released a product series called the Go Edition. From a cost-effective perspective, it's not surprising that global companies are focusing their efforts on approaching emerging countries with great potential for growth, rather than competing for a limited market share in saturated developed countries.

So, if you target emerging countries, will it be possible to provide the same apps as in developed countries and have them work? Of course, it's not that simple. An easy example to understand is the difference in the internet usage environment.

For example, in parts of India, the internet connection is slow (2G), and it is said that people tend to install apps from Wi-Fi or SD cards rather than downloading and installing them over a mobile connection (they also tend to use cheap, low-performance Android devices). Setting aside whether this is good or bad, if there are places with such environments and you are targeting users there, your app's service design must take poor internet connection into account. In other words, in emerging countries, we can make the following hypothesis:

**Users don't want to use a lot of gigabytes**

To attract users in emerging countries, it is necessary to design an app that can be used without using an internet connection as much as possible. This is where PWA, which allows for lightweight implementation, came into play.

## Why Instagram's PWA UX is different from native

The anonymous article mentioned that the differences between the native app and the new app include the inability to swipe through images (carousels) and the fact that videos do not play automatically in Stories.

As some have pointed out in [Hatena Bookmark](http://b.hatena.ne.jp/entry/s/anond.hatelabo.jp/20180321171652), carousels can be implemented relatively easily using conventional web technologies, regardless of PWA. For example, among the carousels on the mobile web, I think [Mastodon](https://mstdn.jp/) is one that I find well-designed. After researching, I found that it uses a component called [react-swipable-views](https://github.com/oliviertassinari/react-swipeable-views) (Incidentally, Mastodon is now a PWA with an SPA that also supports push notifications, etc.). Among the Web Components, [paper-carousel](https://www.webcomponents.org/element/Redbility/paper-carousel) seems like it could be used as is on Instagram. There's also a demo at the link, so try it out for yourself on your smartphone.

So why hasn't Instagram implemented this?

As you know, the native app version of Instagram runs smoothly.

This actually assumes ample resource consumption: look closely: in a native app carousel, the adjacent images are already loaded when you start swiping.

<figure>
<img src="/images/2018/pwa-1.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2018/pwa-2.png" style="min-width: 48%; max-width: 300px;">
<figcaption>Native app on the left, PWA on the right</figcaption>
</figure>

To achieve this, images and videos that are not visible at first view must be loaded in the background beforehand. Although I haven't actually measured it, I imagine that in the case of a native app, several to several dozen MB of data must be loaded within the first few taps.

On the other hand, as pointed out in the article, the PWA version of Instagram does not allow you to swipe through images; you have to tap a button.

As you may have noticed, this is a deliberate design change to prevent resources from being downloaded without explicit user action, ensuring a smooth experience for data-conscious users.

Incidentally, it may be possible to achieve a UX like the native app version of Stories, where playback starts immediately after opening and you can switch between videos by swiping or tapping, on the web if you try hard enough, but I'm sure there would be various challenges. Unfortunately, this is outside my area of expertise, so I would appreciate it if someone could explain how to achieve this on the web, or why it's not possible.

Should you choose a PWA now?

Well, after reading this far, I hope that those who are wondering whether they should support PWAs and those who claim that PWAs will make native apps obsolete will no longer be worried.

When Terryman took over as Kinnikuman Great, he initially worried that he couldn't fight as gracefully as Kamehameha. However, by using his original Texas Fighting style, he was reborn as the new Kinnikuman Great and emerged victorious.

Even if something looks the same, the details of its construction and the technology used can change depending on its role. The important thing is to determine who the target audience of the service is, what approach is optimal, whether the service will reach the intended users, and whether it will be a service that they will use for a long time. PWAs, or rather, the evolution of the web, simply provides us with new options for this. We hope you will choose the approach that best suits your goals.