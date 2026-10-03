---
layout: post
lang: en
title: A New Way to Pay on the Web – About Web Payments and the Payment Request API
description: This article introduces a new way to make payments on the web using the Payment Request API.
date: 2017-07-04
tags:
  - Payments
  - Web Payments
  - Payment Request API
translationOf: /2017/07/conversion-api.html
translated: 2026-10-03
translatedManually: false
---
In my [previous post](/2016/12/conversion-forms.html), I wrote about ideas for improving the web checkout flow by optimizing forms. This time, I'll discuss an approach using a new standard API.

<!-- excerpt -->

The difference is visually quite striking, so please take a look at this first:

{% YouTube 'undqD82MBvA' %}

You can try the demo [here](https://polykart-credential-payment.appspot.com/) (you cannot actually purchase items, and credit card information will never be sent to the server).

As you can see, a dedicated payment user interface is used instead of traditional forms. In fact, this UI is not built by the website itself—it is provided by the browser. By invoking it, site operators can collect accurate payment information from users much more effortlessly than with conventional forms. What makes this possible is the [Payment Request API](https://www.w3.org/TR/payment-request/), which I will introduce in this post.

The Payment Request API is a central building block of Web Payments, a suite of specifications aimed at standardizing payments on the web. The key components comprising Web Payments include:

* [Payment Request API](https://www.w3.org/TR/payment-request/)
* [Payment Handler API](https://www.w3.org/TR/payment-handler/)
* [Payment Method Identifiers](https://www.w3.org/TR/payment-method-id/)
* [Basic Card Payment](https://www.w3.org/TR/payment-method-basic-card/)

The Payment Request API has been supported since version 53 in [Chrome for Android](https://play.google.com/store/apps/details?id=com.android.chrome), and other browsers such as [Microsoft Edge](https://www.microsoft.com/windows/microsoft-edge) and [Samsung Internet Browser](https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser) already support it as well. Chrome for Desktop is also scheduled to support it starting from version 61.

## What is the Payment Request API?

Essentially, what you can do with the Payment Request API is **replace forms**. Please note that **it does not process payments by itself**. In other words, all this API does is retrieve payment information; developers must handle the subsequent payment processing separately.

The information you can collect using this API includes:

* Shipping address
* Shipping options
* Payment method
* Payer contact information

## Payment Request Flow

If you watch the earlier video carefully, you can see several distinct steps:

1. First, the user selects the items to purchase. Up to this point, everything happens normally within the website.
1. Once the items are decided, the user taps the purchase button. At this moment, the Payment Request UI is displayed.
1. The UI displays the following information from top to bottom (in Chrome's case), where the user selects their shipping address, payment method, and so on:
    * Site name and domain
    * Details of the items being purchased
    * Shipping address
    * Shipping options
    * Payment method
    * Contact information
1. Tap the pay button
1. Enter the credit card CVC number
1. Purchase complete

There are three key points worth noting here.

### Leveraging Autofill for Shipping Addresses and Contact Info

Shipping addresses and contact information can be populated from data stored in the browser's autofill. Of course, users can also enter new details on the spot, but if they have entered them before, they can select them with a single tap. (This connects back to the previous post: [restructure your forms so they can be parsed accurately](https://blog.agektmr.com/2016/12/conversion-forms.html).)

<figure class="half">
<img src="/images/2017/edit_address.png" alt="Edit autofill address in Chrome" />
<figcaption>Chrome address autofill settings</figcaption>
</figure>

### Leveraging Autofill for Credit Card Information

Just like address information, credit card details—such as card number, cardholder name, and expiration date—can also be populated in a structured format. In this case, the CVC number (the 3- or 4-digit code on the back of the card) is not included in the autofilled data, so the user is prompted to enter it each time they finalize the payment as an authorization step.

In Chrome, in addition to credit card details saved in the browser, cards stored in [Google Payments](https://payments.google.com/) via the user's Google Account can also be used. (Similar integrations seem to be in place with [Samsung Pass](http://www.samsung.com/global/galaxy/apps/samsung-pass/) in Samsung Internet Browser and [Microsoft Wallet](https://www.microsoft.com/en-us/payments) in Microsoft Edge.)

<figure class="half">
<img src="/images/2017/credit_cards_settings.png" alt="Credit Card settings in Chrome" />
<figcaption>Credit card settings in Chrome</figcaption>
</figure>

### Dynamic Updates Based on Shipping Address and Options

The Payment Request API can also flexibly present "shipping options," such as free shipping or express shipping for an additional fee. It can also adjust shipping costs depending on the region, or even indicate that shipping is unavailable for unsupported areas. Naturally, the total amount updates automatically based on the selected shipping fee.

<figure class="half">
<img src="/images/2017/shipping_options.png" alt="Shipping Options in Payment Request" />
<figcaption>Shipping options</figcaption>
</figure>

## Completing the Payment

Once the user verifies the details in the Payment Request UI and taps the "Pay" button, credit card CVC verification is performed, and only then is the data handed over to the website. The information passed at this point is JSON-formatted data containing raw credit card numbers and address details. How developers use this is up to them, but typically it is forwarded to an intermediary known as a Payment Gateway or Payment Processor to handle the actual fund transfer.

For detailed implementation instructions on the Payment Request API, please refer to the [Japanese documentation](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/?hl=ja).

## Does Safari Support the Payment Request API?

**Update (2017/08/24): [A flag for the Payment Request API was implemented in Safari Technology Preview 38](https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/), and its [status](https://webkit.org/status/) has changed to "In Development." Hooray!**

In Japan, where iOS has a large user base, this is probably the most frequently asked question. Safari has its own feature called [Apple Pay JS](https://developer.apple.com/documentation/applepayjs). In short, it allows users to pay using Apple Pay on the web. While I'll leave the detailed differences for another time, their API structures are quite similar. Because of that, I published a library called [appr-wrapper](https://github.com/GoogleChrome/appr-wrapper) that lets you handle Apple Pay JS as if it were part of the Payment Request API. You can try it out on [this site](https://web-payment-apis.appspot.com/) in both Safari and Chrome (you won't actually be charged even if you complete a payment).

## Summary

In this post, I discussed replacing traditional form-based payment information collection with the Payment Request API. However, some of you might feel that UX improvement alone isn't a compelling enough reason to adopt it. With numerous security incidents still being reported, many developers are likely concerned about the risks of handling raw credit card data.

The Web Payments standards are continuously being developed with solutions to these very problems in mind. I hope to cover that in upcoming posts.
