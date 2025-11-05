---
layout: post
lang: ja
title: 'Payment Request API のよくある誤解を解く'
description: 'Web Payments / Payment Request API について、みんなが誤解しているところをはっきりさせます'
date: 2017-12-08
tags:
- Payments
- Web Payments
- Payment Request API
- PCI DSS
---

このポストは [Chromium Browser Advent Calendar 2017](https://qiita.com/advent-calendar/2017/chromium) の 12/8 分です。[先日 Medium に投稿した英語版](https://medium.com/dev-channel/addressing-common-misconceptions-about-the-payment-request-api-4d0db51dae75)を翻訳し、日本向けに若干加筆したものになります。

-----

Payment Request API が登場してからというもの、おかげさまで非常に多くの方に興味を持っていただいています。一方、その複雑さから勘違いや、誤った情報を元に盛り上がってしまっているような状況が起きています。この記事では、みなさんの反応を見ている中でよくある誤解を解き、正確な情報を提供しようと思います。

そもそも Payment Request API が何かご存じないという方は、まず[ここ](/2017/07/conversion-api.html)から読んでいただくと良いと思います。

<!-- excerpt -->

## Web Payment API? Chrome Payment API? Google Payment API?

すべて間違いです。正しくは "Payment Request API" です。そしてこれは Google や Chrome のものではなく、[オープンスタンダードの仕様](https://www.w3.org/TR/payment-request/)として作られており、Chrome 以外のブラウザでもサポートされます。2017 年 11 月現在サポートしているブラウザは：

* Android 版 Chrome
* iOS 版 Chrome
* デスクトップ版 Chrome (Mac, Windows, Linux)
* Microsoft Edge
* Samsung Internet Browser

そして下記のブラウザが実装中です：

* Apple Safari
* Mozilla Firefox

## Payment Request API を使うと、ブラウザが支払い処理も面倒見てくれるんでしょ？

誤りです。Payment Request API を使っても、支払いを処理し、お金の移動を発生させるためには、支払情報をペイメントゲートウェイやペイメントプロセッサーといった **決済代行業者**に送る必要があります。

Payment Request API は、JavaScript を使ったフォームの代替テクノロジーと考えて下さい。ユーザーが "支払う"ボタンを押すと、フォームが POST でサーバーに送信される代わりに、JavaScript がユーザーの支払情報を受け取ります。典型的な実装では、その情報を決済代行業者に送ることで処理してもらいます。

## Chrome の Payment Request API は Google アカウントに紐付けられた支払情報を使うんでしょ？

その通りですが、未来永劫そうとは限りません。今のところ支払い方法には大きく 2 種類あります。ベーシックカードとペイメントアプリです。

![](/images/2017/payment_methods.png)

ベーシックカードの場合、Chrome の Payment Request UI は下記の 2 つを混ぜた支払い方法を表示します：

1. ローカルに保存された支払情報
2. ユーザーの Chrome プロフィールに紐付けられた Google アカウントに保存されている支払情報

Chrome のオートフィル設定 (chrome://settings/autofill) を見ると、Payment Request API とフォームで利用できるカード情報を確認することができます。

![](/images/2017/autofill_cards.png)

"Google Payments" と横に書いてあるものが [Google アカウントに保存されている支払情報](https://payments.google.com/)です(ローカルに保存されたカード情報は Google アカウトに保存されません)。

もうひとつの支払い方法はペイメントアプリで、こちらは柔軟に様々な支払い方法に対応することができます。クレジットカードであったり、電子マネーであったり、仮想通貨であったり、銀行送金の場合もあります(残念ながら 2017 年 11 月現在、クレジットカード以外の支払い方法を実装したペイメントアプリはまだ存在していません。)。ペイメントアプリは Chrome や Google など、ブラウザとは別に提供されます。

同じことは他のブラウザにも言えます。Microsoft Edge では、 Payment Request API は Microsoft Wallet に接続され、Microsoft アカウントに紐付けられた支払情報にアクセスします。Samsung Internet Browser も同様で、こちらは Samsung デバイスの場合のみ、Samsung アカウントに紐付けられた支払情報を利用します。いずれもベーシックカードとしてこれを実現していますが、将来的にペイメントアプリに対応する可能性もあります。

## Payment Request API が扱えるのはクレジットカードだけでしょ？

間違いです。先程述べたように、電子マネーや仮想通貨、銀行送金など、あらゆる支払い方法に対応が可能です。

Payment Request API はいわば、ブラウザと支払い方法の橋渡し役です。ネイティブやウェブで作られたペイメントアプリを柔軟に繋ぎこみ、技術的な点では少なくとも、誰でもユニークな支払い方法を提供できるデザインになっています。(実際には決済代行業者の対応状況がネックになる可能性も考えられる)

![](/images/2017/payment_app.png)

## Payment Request API を使った場合は PCI DSS を気にしなくていいんだよね？

これも間違いです。PCI DSS が必要な国において、Payment Request API はそれを免除するものではありません。

もしあなたのサイトが PCI DSS または [PCI SAQ A-EP](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-A_EP.pdf) に準拠しているなら、セキュアである限り Payment Request API を使って構いません。

もしあなたのサイトが [PCI SAQ A](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-A.pdf) に準拠している場合は、注意して下さい。PCI SAQ A は、生のクレジットカード情報を扱って良いものではありません。これはつまり、Payment Request API を少なくともベーシックカードで使ってはいけないということを意味します。

日本では、決済システムにおけるセキュリティ対策の遅れから、現在経産省を中心に「[クレジットカード取引におけるセキュリティ対策の強化に向けた実行計画 2017](http://www.meti.go.jp/press/2016/03/20170308003/20170308003.html)」を推進しています。これによると、2018 年 3 月までにすべてのクレジットカードを扱うオンライン事業者は、クレジットカードを非保持とするか、PCI DSS に準拠する必要があります。非保持の定義については、PCI SAQ A のようなものでありながらも、そこまで厳密なものではないようですが、Payment Request API に対応するに当たっては、それが何を意味しているかをきちんと把握して実装する必要があります。

いずれにしろ、PCI の話についてはご利用の決済代行業者に相談されることをおすすめします。
