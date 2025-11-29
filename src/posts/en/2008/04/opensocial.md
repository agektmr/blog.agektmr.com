---
layout: post
lang: en
title: 'I participated in a study group (!?) about OpenSocial'
description: ''
date: 2008-04-08
tags:
- MySpace
  - OpenSocial
translationOf: /2008/04/opensocial.html
translated: 2025-11-29
translatedManually: false
---

I went to a study group called "What about [OpenSocial](http://www.ideaxidea.com/archives/2008/04/opensocial.html)?" which was advertised on a blog called IDEAxIDEA, run by someone from Hyaku Shiki. The event was held at the [MySpace Japan](http://jp.myspace.com/) office in Shiodome. Apparently, engineers from the company were visiting Japan, so I attended with a list of questions I wanted to ask.

## Relationship between MDP and OpenSocial

MDP stands for MySpace Development Platform. MDP is a broader API than OpenSocial. In other words, OpenSocial is built on MDP.

![opensocial_components](/images/2008/04/opensocial_components-300x270.png)

In OpenSocial, JavaScript specifications are being finalized first, but container providers cannot return responses to requests unless they create a REST API that accepts Ajax. So MySpace developed the MySpace REST API. (Naturally, Orkut and hi5 also have similar APIs, but their specifications are not publicly available. [I wonder if hi5 has one?](http://api.hi5.com/))

MySpace has an extension called MyOpenSpace that is separate from OpenSocial, and is distinguished as opensocialreference.js and MyOpenSpace.js. It would be more accurate to say that MyOpenSpace comes first, and OpenSocial exists as a wrapping for it. OpenSocial was designed to have the greatest common denominator of APIs from various SNSs, so all you need to do is wrap your own API. Indeed, this means that even if you bring an app from another SNS, compatibility can be maintained as long as it uses JavaScript that supports OpenSocial.

I also asked what they plan to do about the RESTful API when the OpenSocial version is released, and they answered, "We'll just increase the number of APIs." I see. That makes sense. It seems they'll keep the API for the older version for people who have developed apps with the current version.

This answers a question that has been bothering me for a while: How did MySpace implement the OpenSocial RESTful API, the specifications of which are not yet finalized? (http://devlog.agektmr.com/archives/20)

## What is an extension of OpenSocial?

* Photo album
* Hero
* Favorite movie

There are already many unique extensions available, but the most popular is the photo album. While the photo album may or may not be available depending on the SNS, it is a feature that is likely to be used.

I also asked about a feature that allows individual messages to be sent, and was told that it is currently under development. (I just looked and it seems that [OpenSocial already has one...](https://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/ee24d711e51a4084)) They also said that they would like to create APIs for various other fields, such as music and comedy.

## About application registration

App developers can start development immediately after obtaining a Sandbox account, but before they can actually publish their app, they must go through a review process that involves a code review and legal check (for copyright infringement, etc.). The app is usually released within 24 to 48 hours, but it may take longer if there are any questionable rights issues.

I forgot to mention that even if you put your app on a remote server in XML, once the app passes the review, any subsequent changes to the XML on the server will not be reflected, as is the case with Google Gadget.

### Notes

* The Install Callback URL and Uninstall Callback URL allow you to specify the URL of the page to which the user will be redirected immediately after installing or uninstalling the app. The default is the app's canvas page.
* A key and secret will be issued for OAuth authorization.

Monetization

Naturally, advertising revenue will likely be the main source of income, but it is also possible to make money through a type of recommendation advertising, like Facebook. Another possibility is to charge app developers for preferential display positions.

For now, app developers are often offering apps with the goal of acquiring members for their own services, but since you can use the entire screen in [Canvas View](http://developer.myspace.com/community/myspace/anatomyOfAnApp.aspx#app_canvas), you can place ads there as you like and generate revenue. In the future, they are also considering offering a way to sell products and charge for them through the app, which is a dream come true.

Application Compatibility

I've always wondered about the compatibility of OpenSocial applications between SNSs. I actually already have the answer in my head, but I wanted to ask anyway.

First of all, if you don't use MySpace's own extensions, you can obviously use it on other SNSs. Well, that makes sense. But you'll need to change the views and CSS for each site. For example, Orkut only has two views: canvas and profile, while MySpace has four: home, canvas, profile.left, and profile.right, and hi5 has three: homepage, canvas, and profile. At this point, you might be wondering, "Hmm..."

However, I was told that there is an API in the container method that can get the name of the container in which the app is running, so there is also a way to switch the behavior depending on that.

## Can I deploy the app on a remote server?

Of course, if you use a RESTful API, you can use the app on external sites, but here we are wondering whether it is possible to change [GoogleGadget's Content type='html' to type='url'](http://code.google.com/intl/ja/apis/gadgets/docs/fundamentals.html#Content_Type).

The answer is yes.

Naturally, you would need to create a proxy under the same domain and create a system to access the MySpace API using OAuth, but it seems that a server library is also available (or in preparation?).

Growth after the release of the application directory

Facebook saw a sudden surge in growth after the release of its application features, but what about MySpace? When I asked, I was told that there hasn't been any noticeable surge in growth so far. Since there aren't many links on the site, it seems they haven't reached that stage yet. They'll probably do more once their API is more robust. They're also hoping for word-of-mouth through messaging features and the like.

## About escapeString and unescapeString

When using the persistent API, only string information can be saved, so data is exchanged in JSON format. The string needs to be escaped before sending and unescaped when receiving it. While `gadgets.util.escapeString()` and `gadgets.util.unescapeString()` worked in Orkut and hi5, they didn't work in MySpace, so I asked this question.

The answer is that `escapeString` and `unescapeString` are no longer in use, and `encodeURIComponent` is now recommended. I just looked at the OpenSocial spec, and it seems that `gadgets.util.scapeString()` and `gadgets.util.unescapeString()` are still valid, though...

## Sample app for MySpace

I'm releasing a MySpace version of a friend introduction app I created previously.

```
http://devlab.agektmr.com/OpenSocial/MySpace/FriendIntroducer.xml
```

I don't know if anyone else has been able to get this app into their Sandbox account, but I hope this helps. I haven't yet gotten around to creating two MySpace accounts to try it out, so if you're interested, please send me a friend request on [my MySpace account](http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=79982011).

## thoughts

* It seems that many MySpace engineers use Aptana. I don't like Java apps because they're slow, so I don't generally use them, but maybe I'll give it another try...
* What surprised me was that out of the 10 participants, only 4 brought out their laptops. And all of them were **MacBook Air users**! 
Everyone's so rich.  
* I got my photo taken with Ozzie!

Thank you to all participants for your hard work.

## ※Addition (4/12)

I emailed Terrence, who had told me about this on the day, to confirm that "`escapeString ` and u`nescapeString ` are no longer in use" was a mistake.

Apparently, he mistook "`escape」`" for the common JavaScript `escape`, and when he said "`escape` is no longer in use," he was referring to that. Indeed, it is now recommended to use `encodeURIComponent` rather than `escape`.

So, as for the main topic, `gadgets.util.escpeString` and `gadgets.util.unescapeString`, it seems that they are indeed not implemented on MySpace. Looks like I'll have to figure it out myself.
