---
layout: post
lang: en
title: Improving Mobile Web Conversions - Forms Edition
date: 2016-12-26
tags:
  - Payments
  - Form
translationOf: /2016/12/conversion-forms.html
translated: 2026-10-03
translatedManually: false
---
More than twenty years have passed since the dawn of the internet, and the era has shifted from desktop to mobile. On mobile, users don't just expect adaptations for smaller screens—they demand a much faster, smoother experience. E-commerce is no exception.

Data shows that 66% of mobile checkouts take place on the web rather than in native apps. Installing an app from search results just to purchase an item requires too much friction, which is likely why so many people prefer to complete their purchases directly on the web.

Conversely, data also shows that mobile websites have a 66% lower conversion rate compared to desktop websites. Looked at another way, this means there is still tremendous room for growth in mobile web conversion rates.

In this post, I'd like to introduce two ways to boost mobile web conversions by improving forms.

<!-- excerpt -->

## Why Autofill Isn't Working

When making a purchase, users need to provide information such as their address and payment details. Forms are the standard way to collect this data. Filling out forms is already tedious enough, but typing out an address using a virtual keyboard on a tiny mobile screen is nothing short of painful. I'm sure I'm not the only one who has abandoned a mobile purchase—or switched to a PC to finish it—simply because it was too frustrating.

Fortunately, most modern browsers come with a feature called "autofill" that automatically fills forms with the most appropriate information. With autofill, users spend far less time typing manually and correcting typos.

However, if autofill were working effectively, conversion rates wouldn't be lagging so far behind desktop. In other words, on many websites, autofill might not be functioning as expected. What is missing?

### How Autofill Works

First, let's look at how autofill works. In Chrome, for example, the browser remembers information the user has previously entered, allowing them to fill it in next time without repeatedly typing the same characters. Furthermore, modern browsers structure address and credit card information, automatically determining which data should go into which field.

<figure>
<img src="/images/2016/autofill-setting-chrome.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2016/autofill-setting-safari.png" style="min-width: 48%; max-width: 300px;">
<figcaption>Autofill settings: Chrome on the left, Safari on the right</figcaption>
</figure>

While Chrome reuses information saved by the user during browsing, Safari retrieves address details from the OS contacts app.

(Firefox and Edge do not seem to structure form data at this point, but they are expected to move in a similar direction in the future.)

### Structured Data

The critical point here is that the data is "structured." In other words, the information is treated as a cohesive unit following a specific template. To be more specific, Chrome treats data like this:

For addresses:

* Name
* Organization
* Country
* Postal code
* State / Prefecture
* City
* Street address
* Phone number
* Email address

For credit cards:

* Card number
* Cardholder name
* Expiration month
* Expiration year

Each set is handled as a single unit of information. As mentioned earlier, Safari uses information from the contacts app, so it operates on a very similar model.

This information can be reused across domains. When an autofillable form is displayed, the browser suggests the address or credit card details. Users can populate the fields simply by selecting the suggestion, without typing on their keyboard (information is never filled in against the user's intent).

Here is how an `input` field looks when focused, suggesting an address, and how it looks after being filled:

<figure>
<img src="/images/2016/autofill-1-safari.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-safari.png" style="min-width: 48%; max-width:300px;">
<figcaption>Safari</figcaption>
</figure>

<figure>
<img src="/images/2016/autofill-1-chrome.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-chrome.png" style="min-width: 48%; max-width:300px;">
<figcaption>Chrome</figcaption>
</figure>

Both Chrome and Safari allow autofill information to sync across devices, making it possible to use details entered on a PC on your mobile device as well.

## Optimizing for Modern Autofill

In the screenshots above, almost all the fields are filled in cleanly. This was achieved by applying the best practices introduced in this article. So why doesn't this work well on typical websites? There are two main reasons.

### 1. Aligning Form Structure with Standards

One major reason is that the form structure on many websites differs from what standard autofill expects.

This is understandable. Until recently, standard structures were never clearly defined, and because HTML forms can be designed with total flexibility, each site naturally ended up building its own custom layout.

Take postal codes as an example: in Japan, postal codes consist of seven digits, such as "106-6144." Some websites split this into two fields of 3 and 4 digits, while others use a single 7-digit field, resulting in a lack of consistency.

Similarly, for credit cards, some sites use a single 16-digit field, while others use four separate 4-digit fields.

![](/images/2016/credit-card-multiple.png)

![](/images/2016/credit-card-single.png)

Which approach is the right one?

The answer is to match the format that is easiest for browsers to store—using a single field for both postal codes and credit cards, in line with the structured address and credit card models mentioned earlier. By doing this, the browser can map its structured autofill data directly to your form fields, allowing users to provide their information effortlessly.

### 2. Adding Annotations to Prompt Autofill

Another reason websites fail to autofill properly comes down to annotations (how attributes are assigned).

A browser's autofill feature attempts to guess what should go into each field based on the available form attributes, such as `name` and `id` (using heuristics). In browsers designed primarily for English, straightforward values like `name="address"` make it easy to infer that a field represents an address. However, with annotations like `name="kokyakuJushoBanchi"` (Japanese written in romanized letters), it becomes very difficult for heuristics alone to recognize it as a street address.

As an improvement, developers can provide annotations independent of the `name` attribute to explicitly state what belongs in each field: the `autocomplete` attribute.

Previously, `autocomplete` only supported `on` and `off`, but [many other values are now defined in the specification](https://html.spec.whatwg.org/multipage/forms.html#autofill).

![](/images/2016/whatwg-autofill.png)

While the parameters defined here are not yet supported by all browsers, a subset of them can already be used in Chrome and Safari.

You might have already noticed: the structured autofill data browsers store corresponds directly to the `autocomplete` parameters defined here.

For addresses:

* Name (`name`)
* Organization (`organization`)
* Country (`country`)
* Postal code (`postal-code`)
* State / Prefecture (`address-level1`)
* City (`address-level2`)
* Street address (`street-address`)
* Phone number (`tel`)
* Email address (`email`)

For credit cards:

* Card number (`cc-number`)
* Cardholder name (`cc-name`)
* Expiration month (`cc-exp-month`)
* Expiration year (`cc-exp-year`)

In the case of a postal code, this means you should write:

```html
<input type="text" name="zip-code" autocomplete="postal-code">
```

(The `name` attribute can be anything, but using standard English names is a good practice to ensure heuristics still work on browsers that do not yet support `autocomplete`.)

## Summary

Here is a summary of the two methods to improve forms and boost mobile web conversions covered in this post:

* Align form structure with standard browser expectations
* Provide proper annotations using the `autocomplete` attribute

By following these practices, you can make full use of browser autofill features and allow users to complete required fields with just a few taps.

Below is an example form incorporating these techniques. (There are many other best practices, but they are omitted here. If you are interested, check out [these resources](https://developers.google.com/web/fundamentals/design-and-ui/input/forms/).)

[http://jsbin.com/qubixac/edit?html](http://jsbin.com/qubixac/edit?html)

You can also test it live [here](https://output.jsbin.com/qubixac). (Credit card information requires HTTPS, which is why a separate link is provided):

```html
<form action="#">
  <fieldset>
    <legend>住所</legend>
    <label>
      名前: <input type="text" name="name" autocomplete="name">
    </label><br>
    <label>
      組織: <input type="text" name="organization" autocomplete="organization">
    </label><br>
    <label>
      郵便番号: <input type="text" name="postal-code" autocomplete="postal-code">
    </label><br>
    <label>
      都道府県: <input type="text" name="address-level1" autocomplete="address-level1">
    </label><br>
    <label>
      市区町村: <input type="text" name="address-level2" autocomplete="address-level2">
    </label><br>
    <label>
      その他の住所: <input type="text" name="street-address" autocomplete="street-address">
    </label><br>
    <label>
      国: <input type="text" name="country" autocomplete="country-name">
    </label><br>
    <label>
      メールアドレス: <input type="text" name="email" autocomplete="email">
    </label><br>
    <label>
      電話番号: <input type="text" name="tel" autocomplete="tel">
    </label>
  </fieldset>
  <fieldset>
    <legend>クレジットカード</legend>
    <label>
      クレジットカード番号: <input type="number" name="cc-number" autocomplete="cc-number">
    </label><br>
    <label>
      名前: <input type="text" name="cc-name" autocomplete="cc-name">
    </label><br>
    <label>
      有効期限:
      <select autocomplete="cc-exp-month">
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>月
      <select autocomplete="cc-exp-year">
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>年
    </label><br>
  </fieldset>
  <input type="submit" value="Submit">
</form>
```

In the next article, covering the Payment Request API, I'll introduce modern browser capabilities that can take conversion improvements even further.
