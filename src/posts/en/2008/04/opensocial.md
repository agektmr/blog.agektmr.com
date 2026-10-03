---
title: "I attended a \"So, how about OpenSocial?\" sort of study session (!?)."
layout: post
lang: en
date: 2008-04-08
tags:
  - MySpace
  - OpenSocial
translationOf: /2008/04/opensocial.html
translated: 2026-10-03
translatedManually: false
---
I attended the "What do you think of [OpenSocial](http://www.ideaxidea.com/archives/2008/04/opensocial.html)? Study Session" announced on the IDEAxIDEA blog (run by the person behind 100SHIKI). The venue was the [MySpace Japan](http://jp.myspace.com/) office in Shiodome. Since engineers from the US headquarters were visiting Japan, I joined with a list of questions ready.

## The Relationship Between MDP and OpenSocial

MDP stands for [MySpace](http://developer.myspace.com/community/) Development Platform. MDP is a broader set of APIs than OpenSocial. In other words, OpenSocial is built on top of MDP.

![opensocial_components](/images/2008/04/opensocial_components-300x270.png)

In OpenSocial, JavaScript specifications have been finalized ahead of other parts, but container providers cannot respond to requests without building a REST API that handles Ajax. The specification developed by MySpace for this purpose was the MySpace REST API. (Naturally, Orkut and hi5 have something similar, but their specifications are not public. [Or did hi5 have one?](http://api.hi5.com/))

Apart from OpenSocial, MySpace has an extension called MyOpenSpace, distinguished as `opensocialreference.js` and `MyOpenSpace.js`. It is more accurate to say that MyOpenSpace came first, and OpenSocial exists as a wrapper around it. Since OpenSocial was designed to take the greatest common denominator of APIs across various social networks, wrapping proprietary APIs is all it takes. That certainly ensures compatibility: even if you bring over an app from another social network, it will work as long as it uses OpenSocial-compliant JavaScript.

I also asked what they plan to do regarding RESTful APIs once the OpenSocial version is released, to which they answered, "We'll just add more APIs." I see. That makes total sense. They apparently plan to keep the older APIs around for developers who built apps on the current version.

This resolved the question I had been wondering about for a while: [How did MySpace implement the OpenSocial RESTful API when the spec isn't even finalized yet?](http://devlog.agektmr.com/archives/20)

## What Are the Extensions to OpenSocial?

* Photo albums
* Heroes
* Favorite movies

These are some of the existing proprietary extensions, with photo albums being the most widely used. Indeed, while photo albums may or may not exist depending on the social network, they seem like a feature people would definitely use.

When I asked about a direct messaging feature for individual users, they said it was currently in development. (Looking at it now, [it seems OpenSocial might already have one...](https://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/ee24d711e51a4084)) They also mentioned wanting to build APIs across various fields, such as music and comedy.

## Registering Applications

App developers can start building right away once they obtain a Sandbox account, but they must pass a review before actually publishing an app. The review involves code reviews and legal checks (such as copyright infringement) and usually takes about 24 to 48 hours for publication, though it can take longer if rights-related issues are ambiguous.

I forgot to ask about this, but even if you host your app XML on a remote server, once the app passes review, subsequent changes to the XML on the server probably won't be reflected, just like with Google Gadgets.

### Notes

* Install Callback URL and Uninstall Callback URL allow you to specify the URLs where users are redirected immediately after installing or uninstalling an app, respectively. The default is the app's canvas page.
* A key and secret are issued for OAuth authorization.

## Monetization

Naturally, advertising will be the primary revenue stream, but earning revenue through recommendation-style ads like Facebook is also an option. Another possibility is charging app developers for preferred placement.

Currently, most app developers seem to provide apps with the goal of acquiring users for their own services. However, since the [canvas view](http://developer.myspace.com/community/myspace/anatomyOfAnApp.aspx#app_canvas) allows full-screen usage, they mentioned developers are free to place ads however they like to generate revenue. They are also considering providing ways to handle e-commerce and billing within apps in the future, which opens up a lot of possibilities.

## Application Compatibility

Regarding cross-SNS compatibility of OpenSocial applications, which I had been wondering about for a while: I actually already had my own answer in mind, but asked just to be sure.

First of all, as long as you do not use MySpace-specific extensions, you can naturally run the app on other social networks. That's obvious. However, views and CSS likely need to be switched per site. For example, Orkut only has two views—`canvas` and `profile`—whereas MySpace has four (`home`, `canvas`, `profile.left`, and `profile.right`), and hi5 has three (`homepage`, `canvas`, and `profile`). At this point, well, it gets tricky.

However, they told me that container methods provide an API to retrieve the name of the container where the app is running, so you can branch your behavior based on that. Makes sense.

## Can You Host an App on a Remote Server?

Using the RESTful API naturally lets you use an app on external sites, but the question here is whether you can change [Google Gadgets' Content type='html' to type='url'](http://code.google.com/intl/ja/apis/gadgets/docs/fundamentals.html#Content_Type).

The answer is yes.

Of course, you have to set up a proxy under the same domain and implement a mechanism to call the MySpace API via OAuth, but [server libraries are apparently being provided (or in the works?) as well](http://developer.myspace.com/community/myspace/faq.aspx#jslib).

## Growth After the Launch of the Application Directory

Facebook saw explosive growth after launching its application platform, but what about MySpace? When I asked, they said they haven't seen a noticeable, rapid surge so far. Considering there isn't much promotion on the site yet, it seems they don't consider it ready for that stage. They will probably do more once the APIs become more mature. They also mentioned they have high hopes for word-of-mouth growth through features like messaging.

## Regarding escapeString and unescapeString

When using the Persistence API, data can only be stored as strings, so communication happens in JSON format. That requires escaping strings before sending them and unescaping them upon receipt, but `gadgets.util.escapeString()` and `gadgets.util.unescapeString()`, which worked on Orkut and hi5, didn't work on MySpace, so I asked about it.

The answer was that `escapeString` and `unescapeString` are deprecated and `encodeURIComponent` is now recommended. Looking at the OpenSocial spec right now, `gadgets.util.scapeString()` and `gadgets.util.unescapeString()` still seem to be valid, though...

## Sample App for MySpace

Here is the MySpace version of the friend introduction app I previously built:

```
http://devlab.agektmr.com/OpenSocial/MySpace/FriendIntroducer.xml
```

I'm not sure if other people can add this app to their Sandbox accounts, but I hope it serves as a useful reference. I haven't gone so far as creating two MySpace accounts to test it, so if you're curious, feel free to send a friend request to [my MySpace account](http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=79982011).

## Thoughts

* Many MySpace engineers seem to use Aptana. I generally avoid Java apps because they feel sluggish, but maybe I'll give it another try...
* What surprised me most was that out of 10 attendees, 4 had their laptops out—and every single one of them was a **MacBook Air user**!  
  Everyone is so well-off. 
* Got a photo taken with Ozzie!

Thank you to everyone who participated!

## Update (4/12)

Regarding whether "`escapeString ` and u`nescapeString ` are no longer used" was a misunderstanding: I followed up via email with Terrence, who told me about this during the session.

Apparently, when I said "`escape」`", he mistook it for standard JavaScript's `escape`, and when he said "`escape` is no longer used," he was referring to that. Indeed, `encodeURIComponent` is recommended over `escape` these days.

As for the main topic of `gadgets.util.escpeString` and `gadgets.util.unescapeString`, it turns out they are indeed not implemented in MySpace. Looks like we have to solve this on our own.
