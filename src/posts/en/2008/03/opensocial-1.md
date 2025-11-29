---
layout: post
lang: en
title: 'Building an OpenSocial Application (1)'
description: ''
date: 2008-03-30
tags:
- Widget
  - Gadget
  - OpenSocial
  - Orkut
translationOf: /2008/03/opensocial-1.html
translated: 2025-11-29
translatedManually: false
---

I tried running my own app on Orkut and MySpace, so here's a report on it.

The specifications have not yet been finalized, so there are many gray areas, but OpenSocial seems to work well with GoogleGadget, and Orkut, MySpace, and hi5 all require GoogleGadget. So, this article explains the basic steps for creating a GoogleGadget and how to add an application to Orkut.

## What is a gadget?

GoogleGadget is a simple application written in JavaScript and HTML that runs on [iGoogle](http://www.google.com/ig?hl=ja). The JavaScript and HTML are embedded in XML, and the configuration is also written in XML.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<module>
 <moduleprefs title="Blah Blah Gadget"
  description="Gadget Example"
  author_email="***@***.com"
 >
 </moduleprefs>
 <content type="html">
.....
 </content>
</module>
```

The XML looks like this: By writing JavaScript and HTML in the Content, the content will be displayed as an OpenSocial application on iGoogle, MySpace, etc.

Because gadgets allow JavaScript, they run on a different domain using an iframe to avoid vulnerabilities such as XSS (in the case of iGoogle, it is gmodules.com). If you change the Content attribute type from &#8221;html&#8221; to &#8221;url&#8221; and specify a URL with href, you can display a server you manage within the iframe.

It would be endless to delve into the specifications of GoogleGadget itself, so I'll stop here. For more details, please see [Reference](http://code.google.com/intl/ja/apis/gadgets/docs/reference.html).

# Get an Orkut Sandbox account

Since Orkut is directly connected to Google, it seems to be the first platform to incorporate OpenSocial specifications. Orkut's OpenSocial experimental environment is called [Sandbox](http://sandbox.orkut.com/), and can be used by obtaining a Sandbox account, which is an extension of a regular Orkut account.

To get an account, please apply [here](http://code.google.com/support/opensocialsignup/). It will take a few days for your application to be processed.

## Adding an OpenSocial app to Orkut

Once you have successfully created an account, you will be able to try out the application. By the way, you will need to store the GoogleGadget XML file on a server somewhere, so make sure you have a place to upload the file, such as Geocities or something else.

[![Orkut1](/images/2008/03/orkut1.jpg)](/images/2008/03/orkut1.jpg)

This is what it looks like when you log in to Sandbox. At first glance, it looks the same as the normal login screen, but there's one thing:

[![Orkut2](/images/2008/03/orkut2.jpg)](/images/2008/03/orkut2.jpg)

There is a link to add an application on the left side of the screen. Click it to...

[![Orkut3](/images/2008/03/orkut3.jpg)](/images/2008/03/orkut3.jpg)

You can add applications by specifying an XML file with a URL (the application directory is usually empty).

Let's try it out with my application. Enter the following in the URL:

```
http://devlab.agektmr.com/OpenSocial/FriendIntroducer.xml
```

Clicking the "Add Application" button will take you to the next screen.

[![Orkut4](/images/2008/03/orkut4.jpg)](/images/2008/03/orkut4.jpg)

Here too, you can complete adding the application by pressing the "Add Application" button.

[![Orkut5](/images/2008/03/orkut5.jpg)](/images/2008/03/orkut5.jpg)

If you see a screen like this, you've succeeded. If you don't have any friends on Orkut, you can send a friend request to [my account](http://sandbox.orkut.com:80/Profile.aspx?uid=2129608995524995619).

That's all for Part 1 for now.
