---
layout: post
lang: en
title: 'Improving Mobile Web Conversions - Forms'
description: ''
date: 2016-12-26
tags:
- Payments
- Form
translationOf: /2016/12/conversion-forms.html
translated: 2025-11-29
translatedManually: false
---

More than 20 years have passed since the advent of the Internet, and the era has shifted from desktop to mobile. Mobile not only accommodates smaller screens, but also demands a faster experience. E-commerce businesses are no exception.

Data shows that 66% of mobile payments are made on the web rather than through native apps. This is likely because installing an app from a search result to purchase a product is too much of a hassle, so many people choose to pay directly on the web.

However, there is also data that shows that mobile websites have a 66% lower conversion rate than desktop websites, which means that there is still room for improvement in mobile web conversion rates.

So today, I'd like to share two ways you can improve your mobile web conversions by improving your forms.

<!-- excerpt -->

## Why AutoFill Doesn't Work

When purchasing a product, users need to provide information such as their address and payment details. Forms are widely used for this purpose. Filling out forms can be tedious enough, but for users, typing in their address using a virtual keyboard on a small mobile device screen is a pain. I'm sure I'm not the only one who has either bought something on a computer or given up on it because buying on mobile was too much.

Fortunately, many modern browsers have a feature called "autofill" that automatically fills in the most appropriate information for a form, significantly reducing the need for users to type in the information themselves or repeatedly correct mistakes.

But if it worked, conversion rates shouldn't be lower than on desktop. This means that on many websites, autofill may not be working as expected. What am I missing?

### How AutoFill Works

Let's start by explaining how autofill works. For example, Chrome's autofill feature remembers the information a user has entered once, allowing them to fill it in without having to repeatedly type the characters from the second time onwards. Furthermore, recently, the information to be filled in, such as addresses and credit cards, has been structured so that it automatically determines what to fill in which field.

<figure>
<img src="/images/2016/autofill-setting-chrome.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2016/autofill-setting-safari.png" style="min-width: 48%; max-width: 300px;">
<figcaption>Autofill settings for Chrome on the left and Safari on the right</figcaption>
</figure>

Chrome reuses information saved by the user while browsing, while Safari retrieves addresses using the OS's address book functionality.

(Firefox and Edge do not currently structure form data, but this is expected to move in the future.)

### Structured Data

The important thing here is that it is "structured." In other words, the information is treated as a single block in a certain format. To be more specific, in Chrome,

For addresses:

* Name
* Affiliation
* Country
* Postal Code
* Prefecture
* City/Ward
* Subsequent Address
* Phone Number
* Email Address

For credit cards:

* Card Number
* Cardholder Name
* Expiration Month
* Expiration Year

In this way, each is treated as a single block of information. As mentioned above, Safari also uses information from the Contacts app, so it's safe to think of them as being similar.

This information can be reused across domains, and when presented with an autofillable form, the browser will suggest address or credit card details, allowing the user to simply select them and the fields will be filled in without any typing (though they won't be filled in against the user's wishes).

Here's what it looks like when you focus on the `input` field and an address is suggested, and what it looks like when the `input` field is actually filled in.

<figure>
<img src="/images/2016/autofill-1-safari.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-safari.png" style="min-width: 48%; max-width:300px;">
<figcaption>For Safari</figcaption>
</figure>

<figure>
<img src="/images/2016/autofill-1-chrome.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-chrome.png" style="min-width: 48%; max-width:300px;">
<figcaption>For Chrome</figcaption>
</figure>

Chrome and Safari allow you to sync autofill information across devices, so you can, for example, enter information on your computer and use it on your mobile device.

## Optimize for the latest autofill

In the screenshot above, most of the fields are filled in neatly. This is a website that incorporates the best practices we'll introduce today. So why don't most websites work this way? There are two possible reasons.

### Standardize your form structure

One of the main reasons is that websites have form structures that differ from what is expected by the standard.

This is understandable. Until now, there has been no standard for this type of structure, and HTML forms are flexible in design, so it has naturally led to different structures being created for each site.

For example, in Japan, postal codes are seven digits long, such as "106-6144," but there is no standardization, with some websites dividing the field into three or four digits, and others using seven digits.

Similarly, credit cards may have a single 16-digit field, or four 4-digit fields.

![](/images/2016/credit-card-multiple.png)

![](/images/2016/credit-card-single.png)

Which one would be the correct one to match?

The correct answer is to create a format that is easy for the browser to save, that is, create a single field for both the postal code and credit card information, following the structure of the address and credit card information we introduced earlier. By doing so, the browser can perfectly fit its own structured autofill information into the form, allowing the user to provide the information without stress.

### Add annotations to prompt autofill

Another reason why websites may not autofill properly is due to annotations.

The browser's autofill function tries to guess (heuristically) what to fill in where based on information it can get from the form (attributes such as `name` and `id`). However, in a browser designed for English, while it can easily guess that a straightforward English entry like `name="address"` represents an address, it is difficult to determine, using heuristics alone, that an annotation like `name="kokyakuJushoBanchi"`, which represents Japanese in Roman letters, is the street address portion of an address.

So, one way developers can improve this is to use a different annotation to the `name` attribute, which specifies what they want to be filled into which field. This is the `autocomplete` attribute.

The `autocomplete` attribute previously only had `on` and `off` defined, but now has [a variety of other values defined](https://html.spec.whatwg.org/multipage/forms.html#autofill).

![](/images/2016/whatwg-autofill.png)

The parameters defined here are not yet available in all browsers, but some are available in Chrome and Safari.

Those with a keen eye may have already noticed that the structured autofill information saved in the browser corresponds to the `autocomplete` parameter defined here.

For addresses:

* Name (`name`)
* Affiliation (`organization`)
* Country (`country`)
* Postal Code (`postal-code`)
* Prefecture (`address-level1`)
* City (`address-level2`)
* Subsequent Address (`street-address`)
* Phone Number (`tel`)
* Email Address (`email`)

For credit cards:

* Card Number (`cc-number`)
* Cardholder Name (`cc-name`)
* Expiration Month (`cc-exp-month`)
* Expiration Year (`cc-exp-year`)

In other words, in the case of the postal code example, the correct way to write it is like this.

```html
<input type="text" name="zip-code" autocomplete="postal-code">
```

(In this case, the `name` attribute can be anything, but since browsers don't support `autocomplete`, it's safer to use English and hope that heuristics will work.)

## summary

Here are some ways to improve your forms on mobile web to increase conversions:

* Adapt the form structure to the standard
* Add the `autocomplete` attribute for proper annotation.

Now you should be able to take full advantage of the browser's autofill feature and have users fill in the required fields with just a few taps.

Finally, here's a code example of a form that summarizes the techniques we've covered today. (There are many other best practices, but we won't cover them here. If you're interested, please refer to [this page](https://developers.google.com/web/fundamentals/design-and-ui/input/forms/).)

[http://jsbin.com/qubixac/edit?html](http://jsbin.com/qubixac/edit?html)

You can try it out here (we've provided a separate link because credit card information cannot be processed unless it's HTTPS):

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

In the next article, we'll cover the Payment Request API and introduce the latest browser features that can further improve conversions.
