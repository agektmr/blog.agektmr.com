---
title: OpenSocialアプリケーションを作る(1)
layout: post
date: 2008-03-30
tags:
  - Widget
  - Gadget
  - OpenSocial
  - Orkut
---

OrkutとMySpaceで自作アプリを動かしてみたので、そのレポートです。

まだ仕様が固まっていないのでグレーな部分も多いのですが、OpenSocial は
GoogleGadget と相性が良いらしく、Orkut も MySpace も、hi5 も GoogleGadget 前提と
なっています。というわけで、今回は GoogleGadget の基本的な作り方と Orkut へのア
プリケーション追加方法の解説です。

## ガジェットとは何か

GoogleGadget は [iGoogle](http://www.google.com/ig?hl=ja) で動く JavaScript と
HTML で記述された簡単なアプリケーションです。JavaScript と HTML は XML 上に埋め
込み、設定内容も XML に記述します。

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

XML はこんな感じ。Content の中に JavaScript と HTML を記述することで、その内容が
iGoogle 上や MySpace 等の OpenSocial アプリケーションとして表示されます。

ガジェットは JavaScript を許可していることから、XSS などの脆弱性を回避するため、
iframe を使って別ドメインで動作するようになっています (iGoogle の場合、
gmodules.com)。Content の属性である type を&#8221;html&#8221;から
&#8221;url&#8221;に変更し、href で URL 指定すると、iframe 内に自分の管理するサー
バーを表示することも可能です。

GoogleGadget 自体の仕様は掘り下げるとキリがないのでこの辺りで。詳細は[リファレン
ス](http://code.google.com/intl/ja/apis/gadgets/docs/reference.html)をご覧くださ
い。

# Orkut の Sandbox アカウントを取得する

Orkut は Google 直結ということもあり、OpenSocial の仕様がもっとも早く反映される
ようです。その Orkut の OpenSocial 実験環境は
[Sandbox](http://sandbox.orkut.com/)と呼ばれ、通常の Orkut アカウントを拡張した
Sandbox アカウントを取得することで、利用可能となります。

アカウントを取得するには[コチ
ラ](http://code.google.com/support/opensocialsignup/)から申請を行ってください。
申請が受理されるまでには数日を要するようです。

## OrkutにOpenSocialアプリを追加する

無事アカウントの取得ができたら、実際にアプリケーションを試すことができるようにな
ります。ちなみに、どこかのサーバーに GoogleGadget の XML ファイルを置いておく必
要がありますので、Geocities でも何でもいいはずですので、ファイルをアップできると
ころを用意しておきましょう。

[![Orkut1](/images/2008/03/orkut1.jpg)](/images/2008/03/orkut1.jpg)

Sandboxにログインするとこんな感じ。一見通常のログイン画面と変わりませが、一点だけ：

[![Orkut2](/images/2008/03/orkut2.jpg)](/images/2008/03/orkut2.jpg)

画面左にアプリケーションを追加するリンクがあります。クリックすると・・・

[![Orkut3](/images/2008/03/orkut3.jpg)](/images/2008/03/orkut3.jpg)

URL で XML ファイルを指定してアプリケーションを追加できます。(ちなみにアプリケー
ションディレクトリはいつもほとんどアプリがありません)

ここでは、僕の作ったアプリケーションで試してみましょう。URLに下記を入力します：

```
http://devlab.agektmr.com/OpenSocial/FriendIntroducer.xml
```

「アプリケーションを追加」ボタンを押すと、次の画面に遷移します。

[![Orkut4](/images/2008/03/orkut4.jpg)](/images/2008/03/orkut4.jpg)

ここでも「アプリケーションを追加」ボタンを押すことで、アプリケーションの追加が完了します。

[![Orkut5](/images/2008/03/orkut5.jpg)](/images/2008/03/orkut5.jpg)

こんな感じの画面が表示されたら成功。Orkut 上に友達がいない方は、[僕のアカウン
ト](http://sandbox.orkut.com:80/Profile.aspx?uid=2129608995524995619)に友達申請
してくれてもOKです。

ひとまず、第 1 回はここまで。
