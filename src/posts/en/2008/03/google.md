---
layout: post
lang: en
title: Google Developer Networking Event
description:
date: 2008-03-15
tags:
  - Gadget
  - Google
  - OpenSocial
  - Shindig
  - Widget
translationOf: /2008/03/google.html
translated: 2025-11-30
translatedManually: false
---
I attended the Google Developer Networking Event held at the Diamond Hall in Omotesando. The theme this time was OpenSocial, which was perfect. I was able to answer a lot of my questions.

## Can OpenSocial applications (gadgets) be carried between SNSs?

This is a very basic question, but although it is written so that it can be easily obtained using `OpenSocial は異なる SNS 間で API を共通化することで、アプリケーション開発者の負担を軽くすることが目的のため、互換性は保証されるものと考えていましたが、どうもそういう訳でもないらしい。**なぜなら、OpenSocial はアプリケーションを乗せるもの (Orkut では Google Gadget) について規定していないから。**

OpenSocial の仕様書を見ると、サンプルコードはすべて Google Gadget を想定して書かれていますが、実際の仕様に Google Gadget が要件であるとは書いていません。つまり、別に Opera Widget だろうと Yahoo! Widget だろうと Dashboard Widget だろうと、乗せられるところに乗せてよい訳です。そこでこの辺りをはっきりさせるため、プレゼンをしてくれたクリスさん (ラストネームは忘れた) に聞いてみました。

* ガジェットは Google Gadget のみを想定している訳ではない。
* MySpaceApp や hi5、Orkut は Google Gadget 形式で提供される (未確認)
* アプリケーションは基本的に SNS 間で共有できるが、拡張機能に対応していると、別の SNS では動かない可能性もある。

僕の拙い英語力だと、なんだか釈然としない答えしか得られませんでした。なんだかまだもやもや感が残ってますが、個人的にこう思ってます。

* ガジェットは Google Gadget である必要はない
* アプリケーション開発者は、コア機能は共通かできるが、ガジェット部分については SNS ごとに用意する必要がある。

## OpenSocial は RESTful API の仕様が出るまで役に立たない?

OpenSocial は SNS から友達の情報を取得できることが目玉な訳ですが、当然認証認可が必要になります。JavaScript の API では、単純に `newDateRequest`, the implementation on the container side is not so simple.

Assuming you're using a Google Gadget, there are two options for the content type. One is html mode, which describes HTML in the Gadget XML. The other is url mode, which describes a remote URL in the Gadget XML. html mode runs on the gmodules.com domain managed by Google, but url mode runs on a completely different domain managed by a third party. Those with a keen eye will probably have figured this out at this point.

**The only way to access OpenSocial SNS information from a remote server is to call the SNS's RESTful API via the remote server's proxy**

This is simply because Ajax cannot cross domains, but it's a very important point. Since OpenSocial doesn't yet have an official RESTful API, wouldn't it be useless without it? What's MySpace's RESTful API? Isn't Orkut's iLike app remote? These were the questions that arose. (Wait, can Ajax send a direct request to the domain where the JavaScript itself is located?)

About Shindig

I installed Shindig the other day, but I assumed it only supported Java. But then I found out that it also supports PHP, although its implementation is slower than Java! I went home and looked at the code, and sure enough, it was there. The syntax is Java-like, so it's a bit strange, but as someone who mainly uses PHP, it's a welcome discovery.

## And more

* [OpenSocial-compatible Dokoiku beta service](http://beta.doko.jp/sandbox/) using Shindig, created by Recruit.
* Orkut app version of [Comyusuke](http://commusuke.eisbahn.jp/).
* OpenSocial app coding environment CodeRunner (app on Orkut).
* [OpenSocial Japan community](http://sandbox.orkut.com/Community.aspx?cmm=47213793) on Orkut.

And so on...the kids are making a lot of noise so I'll stop here for today.
