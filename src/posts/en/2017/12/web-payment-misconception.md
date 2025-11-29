---
layout: post
lang: en
title: 'Clearing up common misconceptions about the Payment Request API'
description: 'Clearing up common misconceptions about Web Payments / Payment Request API'
date: 2017-12-08
tags:
- Payments
- Web Payments
- Payment Request API
- PCI DSS
translationOf: /2017/12/web-payment-misconception.html
translated: 2025-11-29
translatedManually: false
---

This post is 12/8 of the [Chromium Browser Advent Calendar 2017](https://qiita.com/advent-calendar/2017/chromium). It is a translation of the [English version posted on Medium recently](https://medium.com/dev-channel/addressing-common-misconceptions-about-the-payment-request-api-4d0db51dae75), with some additions for Japan.

-----

Since the release of the Payment Request API, we've seen a huge amount of interest. However, due to its complexity, there have been some misunderstandings and excitement based on incorrect information. In this article, we'll address some common misconceptions we've seen and provide accurate information.

If you don't know what the Payment Request API is, I recommend you start by reading [here](/2017/07/conversion-api.html).

<!-- excerpt -->

## Web Payment API? Chrome Payment API? Google Payment API?

All of these are incorrect. The correct term is "Payment Request API." It's not owned by Google or Chrome, but is an open standard specification, and is supported by browsers other than Chrome. As of November 2017, the supported browsers are:

* Chrome for Android
* Chrome for iOS
* Chrome for desktop (Mac, Windows, Linux)
* Microsoft Edge
* Samsung Internet Browser

And the following browsers are currently implementing it:

*Apple Safari
*Mozilla Firefox

## If I use the Payment Request API, the browser will handle the payment for me, right?

False. Even with the Payment Request API, you still need to send your payment information to a payment gateway or processor to process the payment and initiate the transfer of funds.

Think of the Payment Request API as a JavaScript-powered alternative to forms. When a user clicks the "Pay" button, instead of a form being POSTed to your server, JavaScript receives the user's payment information. In a typical implementation, this information is then sent to a payment processor for processing.

## Does Chrome's Payment Request API use payment information associated with your Google account?

That's true, but that won't be the case forever. For now, there are two main types of payment methods: basic cards and payment apps.

![](/images/2017/payment_methods.png)

For basic cards, Chrome's Payment Request UI displays a mix of the following two payment methods:

1. Locally stored payment information
2. Payment information stored in the Google Account associated with the user's Chrome profile

You can view the card details available to the Payment Request API and forms by looking at your Chrome autofill settings (chrome://settings/autofill).

![](/images/2017/autofill_cards.png)

The information next to "Google Payments" is [Payment information stored in your Google Account](https://payments.google.com/) (locally stored card information is not stored in your Google Account).

The other payment method is a payment app, which can flexibly support a variety of payment methods, such as credit cards, electronic money, virtual currencies, and even bank transfers (unfortunately, as of November 2017, there are no payment apps that support payment methods other than credit cards). Payment apps are provided separately from browsers such as Chrome and Google.

The same is true for other browsers. In Microsoft Edge, the Payment Request API connects to Microsoft Wallet and accesses payment information associated with your Microsoft account. The same is true for Samsung Internet Browser, which, on Samsung devices only, uses payment information associated with your Samsung account. Both do this for basic cards, but may support payment apps in the future.

## The Payment Request API only handles credit cards, right?

That's incorrect. As mentioned earlier, we accept all payment methods, including electronic money, virtual currency, and bank transfers.

The Payment Request API acts as a bridge between browsers and payment methods. It flexibly connects native and web-based payment apps, and is designed to allow anyone to offer unique payment methods, at least from a technical standpoint. (In practice, the availability of payment processors may be a bottleneck.)

![](/images/2017/payment_app.png)

## If I use the Payment Request API, I don't have to worry about PCI DSS, right?

This is also incorrect. In countries where PCI DSS is required, the Payment Request API does not exempt you from it.

If your site complies with PCI DSS or [PCI SAQ A-EP](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-A_EP.pdf), you can use the Payment Request API as long as it is secure.

If your site complies with PCI SAQ A, be careful. PCI SAQ A does not allow you to handle raw credit card information. This means you should not use the Payment Request API, at least for basic cards.

In Japan, due to a lack of security measures in payment systems, the Ministry of Economy, Trade and Industry (METI) is currently promoting the "2017 Action Plan for Strengthening Security Measures for Credit Card Transactions." According to this plan, by March 2018, all online businesses that handle credit cards will either not hold credit cards or will be PCI DSS compliant. While the definition of not holding credit cards is similar to PCI SAQ A, it is not as strict. However, when implementing with the Payment Request API, it is important to understand what it means.

In any case, we recommend that you consult with your payment processor regarding PCI issues.
