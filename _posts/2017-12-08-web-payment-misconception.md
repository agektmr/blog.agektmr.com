---
layout: post
title: 'Web Payments / Payment Request API によくある誤解を解く'
description: 'Web Payments / Payment Request API について、みんながあやふやに理解している部分をはっきりさせます'
date: "2017-12-08"
tags:
- Payments
- Web Payments
- Payment Request API
---
Payment Request API が登場してからというもの、おかげさまで非常に多くの興味を持っていただいています。一方、その複雑さから勘違いや、よく分からないまま盛り上がってしまっているような状況が起きています。この記事では、みなさんの反応を見ている中でよくある誤解を解き、正確な情報を提供しようと思います。

そもそも Payment Request API が何かご存じないという方は、まず[ここ](/2017/07/conversion-api.html)から読んでいただくと良いと思います。
<!-- excerpt -->

## Web Payment API? Chrome Payemnt API? Google Payment API?
すべて間違いです。正しくは "Payment Request API" です。そしてこれは Google や Chrome のものではなく、オープンスタンダードの仕様として作られており、Chrome 以外のブラウザでもサポートされます。現在サポートしているブラウザは：

* Android 版 Chrome
* iOS 版 Chrome
* デスクトップ版 Chrome (Mac, Windows, Linux)
* Microsoft Edge
* Samsung Internet Browser

そして下記のブラウザが実装中です：

* Apple Safari
* Mozilla Firefox

## Payment Request API を使うと、ブラウザが支払い処理も面倒見てくれるから、開発者は何もしなくていいんでしょ？
Payment Request API を使っても、支払いを処理し、お金の移動を発生させるためには、支払情報をペイメントゲートウェイやペイメントプロセッサーといった決済代行業者に送る必要があります。

Payment Request API は、JavaScript を使ったフォームの代替テクノロジーと考えて下さい。ユーザーが "支払う" ボタンを押すと、フォームが POST でサーバーに送信される代わりに、JavaScript がユーザーの支払情報を受け取り、自由に取り扱うことができます。典型的な実装では、その情報を決済代行業者に送ることで処理してもらいます。

## Chrome の Payment Request API は Google アカウントに紐付けられた支払情報を使うんでしょ？
その通りですが、必ずしもそうとは限りません。支払い方法には大きく 2 種類があります。ベーシックカードとペイメントアプリです。

![](/images/2017/payment_methods.png)

ベーシックカードの場合、Chrome の Payment Request UI は下記の 2 つを混ぜた支払い方法を表示します：

1. ローカルに保存された支払情報
2. ユーザーの Chrome プロフィールに紐付けられた Google アカウントに保存されている支払情報

Chrome のオートフィル設定 (chrome://settings/autofill) を見ると、Payment Request API とフォームで利用できるカード情報を確認することができます。

![](/images/2017/autofill_cards.png)

"Google Payments" と横に書いてあるものが [Google アカウントに保存されている支払情報](https://payments.google.com/)です(ローカルに保存されたカード情報は Google アカウトに保存されません)。

もうひとつの支払い方法はペイメントアプリで、こちらは必ずしもクレジットカードではありません。電子マネーであったり、仮想通貨であったり、銀行送金の場合もあります (残念ながら 2017 年 11 月現在、これらの支払い方法を実装したペイメントアプリはまだ存在していません。)。ペイメントアプリは Chrome や Google など、ブラウザとは別に提供されます。

同じことはブラウザにも言えます。Microsoft Edge では、 Payment Request API は Microsoft Wallet に接続され、Microsoft アカウントに紐付けられた支払情報にアクセスします。Samsung Internet Browser も同様で、こちらは Samsung デバイスの場合のみ、Samsung アカウントに紐付けられた支払情報を利用します。

## Payment Request API が扱えるのはクレジットカードだけでしょ？
これも間違いです。先程述べたように、電子マネーや仮想通貨、銀行送金など、あらゆる支払い方法に対応が可能です。

Payment Request API はいわば、ブラウザと支払い方法の橋渡し役なのです。ネイティブやウェブで作られたペイメントアプリを柔軟に繋ぎこみ、技術的な点では少なくとも、誰でもユニークな支払い方法を提供できるデザインになっています。

![](/images/2017/payment_app.png)

## Payment Request API を使った場合は PCI DSS を気にしなくていいんだよね？
これも間違いです。PCI が必要な国において、Payment Request API はそれを免除するものではありません。

もしあなたのサイトが PCI DSS または [PCI SAQ A-EP](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-A_EP.pdf) に準拠しているなら、セキュアである限り Payment Request API を使って構いません。

もしあなたのサイトが [PCI SAQ A](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-A.pdf) に準拠している場合は、注意して下さい。PCI SAQ A は、生のクレジットカード情報を扱って良いものではありません。これはつまり、Payment Request API を少なくともベーシックカードで使ってはいけないということを意味します。

日本は PCI DSS の対応が遅れたことから、現在経産省を中心に「[クレジットカード取引におけるセキュリティ対策の強化に向けた実行計画2017](http://www.meti.go.jp/press/2016/03/20170308003/20170308003.html)」を推進しています。趣旨としては、2018 年 3 月までにすべてのクレジットカードを扱うオンライン事業者は、クレジットカードを非保持とするか、PCI DSS に準拠する、というものです。非保持の定義については、PCI SAQ A のようなものでありながらも、そこまで厳密なものではないようです。

いずれにしろ、PCI の話についてはご利用の決済代行業者に相談されることをおすすめします。