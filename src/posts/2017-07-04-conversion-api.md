---
layout: post
title: 'ウェブでの新しいお金の払い方 - Web Payments と Payment Request API について'
description: 'Payment Request API を使ったウェブでの新しいお金の払い方について紹介しています。'
date: 2017-07-04
tags:
- Payments
- Web Payments
- Payment Request API
---

[前回の記事](/2016/12/conversion-forms.html)では、フォームを最適化することでウェ
ブの決済フローを改善するアイディアについて書きましたが、今回は新しい標準 API を
使ったアプローチについて書きます。

<!-- excerpt -->

見た目にも違いが分かりやすいものですので、まずはこちらをご覧ください。

{% YouTube 'undqD82MBvA' %}

デモは[こちらから](https://polykart-credential-payment.appspot.com/)お試し頂けま
す (実際に商品を購入することはできません。また、クレジットカードなどの情報がサー
バーに渡されることはありません)。

これまで使われていたフォームの代わりに、支払い専用のユーザーインターフェースが使
われていることにお気付きと思います。実はこの UI はウェブサイトが用意したものでは
なく、ブラウザが提供するもので、サイト管理者はこれを呼び出すことにより、従来の
フォームよりも手軽に、正確な支払情報をユーザーから提供してもらうことが可能になり
ます。今回ご紹介するのはこれを実現する [Payment Request
API](https://www.w3.org/TR/payment-request/) についてです。

Payment Request API は、ウェブでの支払いを標準化しようという一連の仕様である Web
Payments を構成する要素のひとつであり、中心を成すものです。Web Payments を構成す
る要素には下記のようなものがあります。

* [Payment Request API](https://www.w3.org/TR/payment-request/)
* [Payment Handler API](https://www.w3.org/TR/payment-handler/)
* [Payment Method Identifiers](https://www.w3.org/TR/payment-method-id/)
* [Basic Card Payment](https://www.w3.org/TR/payment-method-basic-card/)

Payment Request API には [Android 版
Chrome](https://play.google.com/store/apps/details?id=com.android.chrome) がバー
ジョン 53 から対応していますが、他にも [Microsoft
Edge](https://www.microsoft.com/windows/microsoft-edge) や [Samsung Internet
Browser](https://play.google.com/store/apps/details?id=com.sec.android.app.sbrowser)
といったブラウザも対応済みです。Desktop 版 Chrome でもバージョン 61 から対応予定
です。

## Payment Request API とは何か

Payment Request API を使ってできることは、基本的に**フォームの置き換え**になりま
す。**それ自体は支払い処理を行わない**、という点に注意してください。つまり、この
API を使ってできるのは支払情報を取得するところまでであり、その先の支払い処理は別
途開発者が行わなければなりません。

この API を使って収集できる情報は下記の通り：

* 配送先住所
* 配送オプション
* 支払い方法
* 連絡先情報

## Payment Request の流れ

先程の動画を注意深く見てみると、いくつかのステップが見て取れるかと思います。

1. まず、ユーザーが購入する商品を選択します。この部分までは普通にウェブサイト内
   で行われます。
1. 購入する商品が決まったら、購入ボタンをタップします。ここで、Payment Request
   による UI が表示されます。
1. UI には、Chrome の場合上から順に下記のような情報が表示されており、配送先や支
   払い方法などを選択します。
    * サイトの名前、ドメイン
    * 購入商品の詳細
    * 配送先住所
    * 配送オプション
    * 支払い方法
    * 連絡先情報
1. 支払いボタンを押下
1. クレジットカードの CVC 番号を入力
1. 購入完了

ここで注目すべきポイントが 3 つあります。

### 配送先住所・連絡先情報におけるオートフィル機能の活用

配送先住所や連絡先情報は、ブラウザのオートフィルに保存された情報を入力することが
できます。もちろんその場で入力して新しく追加することもできますが、過去に入力され
たものがあれば、タップ一つで選択することができます。(ここで前回の記事でご紹介し
たように、フォームは[正確に構造化できるものに作り変えましょ
う](https://blog.agektmr.com/2016/12/conversion-forms.html)、という話に繋がるの
です。)

<figure class="half">
<img src="/images/2017/edit_address.png" alt="Edit autofill address in Chrome" />
<figcaption>Chrome の住所オートフィル設定</figcaption>
</figure>

### クレジットカード情報におけるオートフィル機能の活用

また住所情報と同様、クレジットカードもカード番号、所有者名、有効期限を構造化され
た形で入力することができます。この場合は、入力される情報に CVC 番号 (カードの裏
に書いてある 3 桁もしくは 4 桁の番号) は含まれませんので、支払いの承認処理とし
て、支払い決定時に都度入力が求められます。

ちなみに Chrome の場合、ブラウザに保存されているクレジットカード情報に加え、
Google アカウントで [Google Payments](https://payments.google.com/) に保存されて
いるクレジットカード情報も利用することができます (Samsung Internet Browser であ
れば [Samsung Pass](http://www.samsung.com/global/galaxy/apps/samsung-pass/)、
Microsoft Edge であれば [Microsoft
Wallet](https://www.microsoft.com/en-us/payments) で同様の連携が行われているよう
です)。

<figure class="half">
<img src="/images/2017/credit_cards_settings.png" alt="Credit Card settings in Chrome" />
<figcaption>Chrome のクレジットカード設定</figcaption>
</figure>

### 配送先住所や配送オプションに応じた変更

Payment Request API は例えば無料の配送や、少額を払ってのエクスプレス配送といった
「配送プション」も柔軟に提示することができます。また、地域による配送料の変更にも
対応可能で、非対応地域の場合は配送できない、といったことも可能です。もちろん、配
送料の変更に応じた総額の変更にも対応できます。

<figure class="half">
<img src="/images/2017/shipping_options.png" alt="Shipping Options in Payment Request" />
<figcaption>配送オプション</figcaption>
</figure>

## 支払い処理の完了

ユーザーが Payment Request の UI 上で入力内容を確認し、「お支払い」ボタンを押す
とクレジットカードの CVC 認証が行われ、そこではじめて情報がウェブサイトに渡され
ます。ここで渡される情報は生のクレジットカード番号や住所を含む JSON 形式のデータ
になります。これをどう使うかは開発者次第ですが、一般的には Payment Gateway や
Payment Processor と呼ばれる仲介業者に渡され、実際の送金処理などが行われることに
なります。

Payment Request API の詳しい実装方法については、[日本語のドキュメントがありま
す](https://developers.google.com/web/fundamentals/discovery-and-monetization/payment-request/?hl=ja)
ので、そちらをご覧下さい。

## Safari は Payment Request API に対応しないの？

**更新 (2017/08/24): [Safari Technology Preview 38 で Payment Request API のフラ
グが実
装](https://webkit.org/blog/7877/release-notes-for-safari-technology-preview-38/)
され、[status](https://webkit.org/status/) も "In Development" に変更されまし
た。やった！！**

iOS ユーザーの多い日本だと最もよく聞かれるであろう質問がこれです。Safari では独
自の [Apple Pay JS](https://developer.apple.com/documentation/applepayjs) という
機能があります。ひとことで言えばウェブ上で Apple Pay を使ってお金を払うことがで
きるというものです。詳しい違いについては別の機会に譲るとして、API の構造は似てい
ます。そこで Apple Pay JS を Payment Request API の一部かのように扱えるライブラ
リ [appr-wrapper](https://github.com/GoogleChrome/appr-wrapper) を公開しました。
[このサイト](https://web-payment-apis.appspot.com/)から実際に試すことができます
ので、Safari と Chrome の両方から試してみて下さい (支払いを完了しても、実際にお
金を取られることはありません)。

## まとめ

今回の記事では、従来のフォームによる支払い情報の取得を Payment Request API で置
き換えることをテーマに書いてみました。ただ、UX の向上だけでは導入する理由として
は弱いと感じた方もいらっしゃったかもしれません。未だに多くのインシデントが報告さ
れる中で、生のクレジットカード情報を取り扱うことのリスクが気になる方もいると思い
ます。

Web Payments ではそういった問題を解決することも視野に仕様の策定が続けられていま
す。次回以降この辺りについても触れていきたいと思います。
