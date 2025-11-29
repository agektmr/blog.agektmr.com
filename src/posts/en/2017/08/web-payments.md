---
layout: post
lang: en
title: 'Why Web Payments Are Inevitable - A New Way to Pay on the Web'
description: 'We believe there is a very high probability that the vast majority of payments on the web will be made via Web Payments in the future. Here's why.'
date: 2017-08-24
tags:
- Payments
- Web Payments
- Payment Request API
- Tokenization
- Payment Apps
translationOf: /2017/08/web-payments.html
translated: 2025-11-29
translatedManually: false
---
As explained in our previous article, the Payment Request API has the potential to dramatically change the user experience for web payments. However, many people are wondering whether it will truly become mainstream, and whether they will need to adapt their sites in the future.

I believe there is a very high probability that most payments on the web will be made via Web Payments in the future. In this article, I will explain why.

<!-- excerpt -->

Credit card security issues

Have you ever lost your credit card and had to have it replaced?

If your credit card number is lost or stolen and there is a possibility that it may have been leaked and become known to someone else, you will need to change the card number. Changing the number means that all of your automatic withdrawals and other settings will have to be redone. Just considering the difficulty of this process, losing your credit card can be a huge loss, not only financially but also in terms of the measures you need to take.

The credit card system itself is vulnerable. When paying face-to-face at a brick-and-mortar store, security is guaranteed to a certain extent by the presence of a physical card, signature, PIN entry, and surveillance cameras. But what about now, when online payments are the norm?

Many online services allow payments as long as the card number, cardholder name, and expiration date are correct. This means that payments can be made regardless of who the other party is, as long as the information is correct. This information can be easily determined if the card is obtained, and even if the service that stores the card number is cracked and the information is stolen, it can be used for malicious purposes. In fact, [such cases are not limited to this](http://www.j-credit.or.jp/download/news20160630.pdf).

Of course, card companies aren't just sitting idly by, and there are several ways to protect your credit card security.

First, there are security standards for protecting credit card information called PCI DSS, which impose restrictions on recipients of card information. In the United States, PCI DSS compliance is essentially mandatory for conducting e-commerce business.

In Japan, efforts are underway to implement the PCI DSS for online payments by March 2018, as part of the "Action Plan for Strengthening Security Measures for Credit Card Transactions."

The use of CVC numbers has also become quite widespread. The CVC number is a three-digit number written on the back of the card, and is entered at the merchant along with the card number to verify identity. Of course, it would be meaningless if it were leaked due to a vulnerability in the merchant, so it is assumed that it is not stored in a database. However, since it is clearly written on the card and is passed over the network from a client such as a browser, there is a possibility that a vulnerability may exist somewhere, and it cannot be said to be absolutely secure.

Another method, called [3D Secure](https://ja.wikipedia.org/wiki/3D%E3%82%BB%E3%82%AD%E3%83%A5%E3%82%A2), involves authentication via the credit card company's website at the time of payment. However, since authentication with an ID and password is required every time a payment is made, it's easy to imagine users dropping out at this point. Considering the effort required for merchants to implement the system, it's not something that merchants are happy to adopt, and it doesn't seem to be widely adopted. The new version of [3D Secure](http://www.sbbit.jp/article/cont1/33946) incorporates risk-based authentication, which appears to minimize authentication, but this doesn't reduce the effort required for implementation.

In any case, the important thing is to minimize the possibility of your credit card information being leaked.

Therefore, PCI DSS Version 3.2, released in 2015, explicitly placed stricter restrictions on handling raw credit card information on a browser than before. The same is true in Japan's "Action Plan for Strengthening Security Measures for Credit Card Transactions."

In the future, online merchants will be forced to choose between not handling credit card information at all (not retaining credit card information) or complying with PCI DSS.

## Payment Request API + Payment App + Tokenization

Is it actually possible to effectively prevent credit card information leaks without increasing the effort required for users to use their cards?

The trump card here is a method called "tokenization."

What's revolutionary about tokenization is that it doesn't just protect the card information that's passed on, but rather takes the approach of not passing on the card information in the first place. A temporary string of characters called a "token" is issued by the credit card company, and this is passed on to the merchant to complete the payment.

This token is issued specifically for transactions and cannot be used for other purposes. In addition, the original card number cannot be reverse-looked up from the token itself, so even if it is leaked, the damage can be minimized (strictly speaking, there seem to be various variations, but we will not go into that here).

In other words, by using this, you can indirectly achieve "non-retention of credit card information."

So how do you get this token and pass it to the merchant via your browser? Enter the Payment Request API.

![Payment Request API + Payment App + Tokenization](/images/2017/tokenization.png)

In addition to the [payment method called basic card, which we introduced last time and which handles raw card information](https://blog.agektmr.com/2017/07/conversion-api.html), the Payment Request API can also offer a payment method called a payment app. This app provides a token from the credit card company on the user's behalf, allowing merchants to pass payment information to their servers or payment gateways more securely than before, without ever having to touch the raw credit card.

Let's see a live demo.

{% YouTube '3eP-FRdbDa8' %}

The demo payment app is called BobPay. When you press "PAY," the app launches and you approve the payment by pressing "CONTINUE." Depending on the app, this step may require you to enter a PIN or use fingerprint authentication.

The key point is that these are based on an open specification and open ecosystem called Web Payments, so anyone can provide their own payment app.

Payment apps are available starting with Chrome 60 for Android (currently stable). Alipay, Samsung Pay, and others have already announced support, and it's likely that actual merchants will soon begin accepting payments. If you'd like to try it for yourself, try making a payment on [this demo site](https://polykart-credential-payment.appspot.com/) (no actual money will be taken). You can install the demo BobPay app from [here](https://bobpay.xyz/). The Android Payment app specifications are also listed here.

## summary

The key points are as follows:

* "Not retaining credit card information" is an urgent need for online commerce.
* The emergence of tokenization and payment apps has made online payments more secure than ever.
* The Payment Request API makes this ecosystem available on the web.

The remaining issue is browser compatibility, which is a situation that is definitely optimistic about.

It's already available (at least with basic functionality) in the Edge browser that comes installed by default on Windows, and implementation is underway in Firefox as well.

Also today, there was news that [Safari has begun implementing the Payment Request API](https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/). This means that, while until now only the payment app [Apple Pay](https://www.apple.com/jp/apple-pay/) could be used on the Safari platform via the proprietary [Apple Pay JS](https://developer.apple.com/documentation/applepayjs), the addition of open Web Payments means that other payment apps may also be able to use it.

It will be interesting to see whether Apple, which has strict restrictions on the App Store, will allow payment apps, but considering the progress being made in implementing Service Workers, it's possible that only [web-based payment apps](https://www.w3.org/TR/payment-handler/) will be available. Either way, it's certainly interesting.

The day when an open payment ecosystem is born and widely used on the platform of the open web seems not as far away as we thought.
