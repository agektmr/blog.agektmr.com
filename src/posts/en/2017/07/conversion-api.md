---
layout: post
lang: en
title: 'A new way to pay on the web - About Web Payments and the Payment Request API'
description: 'Introducing a new way to pay on the web using the Payment Request API.'
date: 2017-07-04
tags:
- Payments
- Web Payments
- Payment Request API
translationOf: /2017/07/conversion-api.html
translated: 2025-11-29
translatedManually: false
---

In my previous article, I discussed ideas for improving web payment flows by optimizing forms, but this time I'll talk about an approach using new standard APIs.

<!-- excerpt -->

The difference is easy to see, so take a look here first.

{% YouTube 'undqD82MBvA' %}

You can try out the demo [here](https://polykart-credential-payment.appspot.com/) (you will not be able to actually purchase anything, and your credit card information will not be passed on to the server).

You'll notice that instead of the traditional forms, a new user interface for payments has been introduced. This UI is not provided by the website, but by the browser. By calling this interface, site administrators can ensure that users provide accurate payment information more easily than with traditional forms. This article will introduce the [Payment Request API](https://www.w3.org/TR/payment-request/), which makes this possible.

The Payment Request API is a central component of Web Payments, a set of specifications that aims to standardize payments on the web. Web Payments includes the following components:

* [Payment Request API](https://www.w3.org/TR/payment-request/)
* [Payment Handler API](https://www.w3.org/TR/payment-handler/)
* [Payment Method Identifiers](https://www.w3.org/TR/payment-method-id/)
* [Basic Card Payment](https://www.w3.org/TR/payment-method-basic-card/)

The Payment Request API has been supported by [Chrome for Android](https://play.google.com/store/apps/details?id=com.android.chrome) since version 53, but other browsers such as [Microsoft Edge](https://www.microsoft.com/windows/microsoft-edge) and [Samsung Internet Browser](https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser) also support it. Support for the Desktop version of Chrome will be available from version 61.

What is the Payment Request API?

The Payment Request API essentially acts as a form replacement. It's important to note that it doesn't process payments itself. This means that all you can do with this API is retrieve payment information; any further payment processing is up to you.

The information that can be collected using this API is as follows:

* Shipping Address
* Shipping Options
* Payment Method
* Contact Information

## Payment Request Flow

If you watch the video carefully, you can see a few steps.

1. First, the user selects the product they wish to purchase. This step is normally done on the website.
1. Once they have decided on the product they wish to purchase, they tap the purchase button. The Payment Request UI will then be displayed.
1. In Chrome, the UI displays the following information from top to bottom, allowing them to select their shipping address, payment method, etc.
* Site name and domain
* Purchase details
* Shipping address
* Shipping options
* Payment method
* Contact information
1. Press the payment button
1. Enter your credit card CVC number
1. Purchase complete

There are three points worth noting here:

### Use the autofill feature for shipping addresses and contact information

You can input shipping address and contact information saved in your browser's autofill. Of course, you can add new information by typing it on the spot, but if you have previously entered information, you can select it with a single tap. (This leads us to the point in the previous article about [restructuring forms so they can be structured correctly](https://blog.agektmr.com/2016/12/conversion-forms.html).)

<figure class="half">
<img src="/images/2017/edit_address.png" alt="Edit autofill address in Chrome" />
<figcaption>Address AutoFill Settings in Chrome</figcaption>
</figure>

### Using the autofill feature for credit card information

Similarly to address information, credit card information can also be entered in a structured format, including card number, cardholder name, and expiration date. In this case, the information entered does not include the CVC number (the 3- or 4-digit number found on the back of the card), which is required for payment authorization purposes each time a payment is made.

By the way, in the case of Chrome, in addition to the credit card information stored in the browser, you can also use the credit card information stored in [Google Payments](https://payments.google.com/) in your Google Account (it seems that similar integration is available in [Samsung Pass](http://www.samsung.com/global/galaxy/apps/samsung-pass/) for Samsung Internet Browser and [Microsoft Wallet](https://www.microsoft.com/en-us/payments) for Microsoft Edge).

<figure class="half">
<img src="/images/2017/credit_cards_settings.png" alt="Credit Card settings in Chrome" />
<figcaption>Credit Card Settings in Chrome</figcaption>
</figure>

### Changes depending on shipping address and shipping options

The Payment Request API allows you to flexibly offer "shipping options," such as free shipping or express shipping for a small fee. It also supports changing shipping fees by region, so you can opt out of shipping to regions where shipping is not available. Of course, it also supports changing the total price in response to changes in shipping fees.

<figure class="half">
<img src="/images/2017/shipping_options.png" alt="Shipping Options in Payment Request" />
<figcaption>Shipping Options</figcaption>
</figure>

## Payment processing completed

When the user confirms the information entered in the Payment Request UI and presses the "Pay" button, the credit card CVC is authenticated and only then is the information passed to the website. The information passed here is JSON-formatted data including the raw credit card number and address. How this information is used is up to the developer, but it is generally passed to an intermediary called a Payment Gateway or Payment Processor, which handles the actual transfer of funds.

For detailed instructions on how to implement the Payment Request API, please see the [Japanese documentation available](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/?hl=ja).

## Doesn't Safari support the Payment Request API?

**Update (2017/08/24): [The Payment Request API flag has been implemented in Safari Technology Preview 38](https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/) and the [status](https://webkit.org/status/) has also been changed to "In Development". Yay!! **

This is the most frequently asked question in Japan, where there are many iOS users. Safari has its own feature called [Apple Pay JS](https://developer.apple.com/documentation/applepayjs). Simply put, it allows you to pay with Apple Pay on the web. While we'll leave the detailed differences for another time, the API structures are similar. Therefore, we've released a library called [appr-wrapper](https://github.com/GoogleChrome/appr-wrapper) that allows you to use Apple Pay JS as if it were part of the Payment Request API. You can try it out for yourself from [this site](https://web-payment-apis.appspot.com/), so please try it from both Safari and Chrome (you won't actually be charged even if you complete the payment).

## summary

In this article, I've written about replacing traditional forms for obtaining payment information with the Payment Request API. However, some people may feel that UX improvements alone are not enough of a reason to adopt it. With so many incidents still being reported, some may be concerned about the risks of handling raw credit card information.

Web Payments continues to develop specifications with a view to resolving these issues. I would like to touch on this topic in future articles.
