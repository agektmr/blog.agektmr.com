---
layout: post
lang: en
title: Why Web Payments Will Become Inevitable - A New Way to Pay on the Web
description: I believe there is a very high probability that most payments on the web will eventually shift to being made through Web Payments. Let me explain why.
date: 2017-08-24
tags:
  - Payments
  - Web Payments
  - Payment Request API
  - Tokenization
  - Payment Apps
translationOf: /2017/08/web-payments.html
translated: 2026-10-03
translatedManually: false
---
As explained in [the previous article](https://blog.agektmr.com/2017/07/conversion-api.html), the Payment Request API has the potential to dramatically change the user experience of paying on the web. But will it really become mainstream? Will you need to support it on your own site in the future? Many people are probably wondering about this.

I predict with high confidence that most payments on the web will transition to going through Web Payments in the future. In this article, I will explain why.

<!-- excerpt -->

## Credit Card Security Issues

Have you ever lost a credit card and had to have it reissued?

When a credit card is lost or stolen and its number might have been compromised, you have to change the card number. Changing the number means having to reconfigure all your automated recurring payments. Just considering the hassle of that process, losing a credit card entails significant damage—not just financially, but also in terms of the effort required to deal with it.

Fundamentally, the mechanism behind credit cards is fragile. For in-person payments at brick-and-mortar stores, a certain level of security has been maintained through presenting a physical card, providing a signature or PIN, and the presence of surveillance cameras. But what about today, when online payments have become the norm?

In most online services, you can make a purchase as long as the card number, cardholder name, and expiration date are correct. This means that whoever is on the other end, the payment will go through as long as that information is valid. And that information is immediately visible once someone gets hold of the card; moreover, if a service storing your card details is breached and the data stolen, it can easily be abused. Indeed, [such cases continue unabated](http://www.j-credit.or.jp/download/news20160630.pdf).

Of course, credit card companies are not just sitting idly by. There are several security measures available for credit cards.

First, as constraints imposed on the party receiving card information, there are security standards known as PCI DSS designed to protect credit card data. In the US, PCI DSS compliance is practically mandatory for operating an e-commerce business.

In Japan as well, initiatives are underway under the "[Implementation Plan for Strengthening Security Measures in Credit Card Transactions](http://www.meti.go.jp/press/2016/03/20170308003/20170308003.html)", which includes requirements to adopt PCI DSS for online payments by March 2018.

The use of CVC numbers has also become quite widespread. A CVC is a three-digit (or so) number printed on the back of the card, and entering it along with the card number at a merchant performs identity verification. Naturally, it is pointless if it gets leaked through a merchant's vulnerability, so it is strictly not supposed to be stored in databases. That said, it is printed right on the card, and since it is transmitted over the network from a client such as a browser, there is always the possibility of a vulnerability somewhere—so it cannot be called completely foolproof.

Another approach is [3D Secure](https://ja.wikipedia.org/wiki/3D%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2), where authentication is performed on the credit card issuer's website at checkout. However, because users are asked to authenticate with an ID and password every time they pay, it is easy to imagine how this leads to drop-offs. Considering the merchant's effort required to implement the system, it is hardly something adopted with open arms, and adoption rates do not appear very high. While [a new version of 3D Secure](http://www.sbbit.jp/article/cont1/33946) aims to minimize authentication friction by introducing risk-based authentication, it does not reduce the implementation effort.

In any case, what is essential is minimizing the risk of credit card information leaks as much as possible.

As a result, PCI DSS version 3.2, released in 2015, introduced stricter constraints than before regarding handling raw credit card data within the browser. The same applies to Japan's "Implementation Plan for Strengthening Security Measures in Credit Card Transactions."

Going forward, online merchants will be forced to choose between adopting "non-retention of credit card data"—handling no card data whatsoever—or complying with PCI DSS.

## Payment Request API + Payment Apps + Tokenization

Is it really possible to effectively prevent credit card data leaks without increasing the effort required for users to use their cards?

That is where a solution called "tokenization" comes in as a trump card.

What makes tokenization revolutionary is that instead of protecting the card information passed along, it takes the approach of not passing the card information in the first place. Payment is processed by having the credit card company issue a temporary string called a "token" and passing that to the merchant.

Because this token is issued specifically for that transaction and cannot be used for any other purpose, and because the original card number cannot be reverse-engineered from the token itself, damage is kept to an absolute minimum even if it gets leaked (strictly speaking, there are various implementations, but I will not delve into them here).

In other words, using this allows merchants to indirectly achieve "non-retention of credit card data."

So, how do we obtain this token and pass it to the merchant through the browser? This is where the Payment Request API comes in.

![Payment Request API + ペイメントアプリ + トークナイゼーション](/images/2017/tokenization.png)

With the Payment Request API, in addition to [the basic card payment method handling raw card data introduced last time](https://blog.agektmr.com/2017/07/conversion-api.html), payment methods called payment apps can be provided. Since this app provides a token from the credit card company on behalf of the user, merchants can pass payment information to their server or payment gateway more securely than before, without ever touching raw credit card details.

Let's take a look at an actual demo.

{% YouTube '3eP-FRdbDa8' %}

The payment method named BobPay is the demo payment app. When you press "PAY", the app launches, and pressing "CONTINUE" approves the payment; in a real-world app, this approval step might involve entering a PIN or authenticating with a fingerprint.

And the key point is that because these are built on the open specification and open ecosystem of Web Payments, anyone can provide their own payment app.

Payment apps are supported starting with Chrome 60 on Android (currently Stable). Services like Alipay and Samsung Pay have already announced support, and merchants supporting them should start appearing soon. If you would like to try it yourself, please check out the payment flow on [this demo site](https://polykart-credential-payment.appspot.com/) (you will not actually be charged). You can install the demo BobPay app from [here](https://bobpay.xyz/). The specification for Android payment apps is also available there.

## Summary

Here are the key takeaways:

* "Non-retention of credit card data" is an urgent priority for online commerce.
* With tokenization and payment apps, online payments become more secure than ever.
* The Payment Request API brings this ecosystem to the web.

The remaining question is browser support, but there is definitely reason to be optimistic about this.

In the Edge browser installed by default on Windows, it is already available (at least the basic functionality), and implementation is also underway in Firefox.

Also today, news broke that [Safari has begun implementing the Payment Request API](https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/). What this means is that Safari, which previously only allowed the [Apple Pay](https://www.apple.com/jp/apple-pay/) payment app via the proprietary [Apple Pay JS](https://developer.apple.com/documentation/applepayjs), is adding open Web Payments—opening up the possibility that other payment apps could become available there as well.

Whether Apple, with its strict App Store restrictions, will allow third-party payment apps remains an interesting question, but considering their ongoing implementation of Service Workers, it is possible that only [web-based payment apps](https://www.w3.org/TR/payment-handler/) might become available. Either way, it will be fascinating to watch.

The day when an open payment ecosystem is born and widely adopted on top of the open web platform may not be as far off as we think.
