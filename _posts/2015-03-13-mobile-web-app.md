---
layout: post
title: 'ウェブのプッシュ通知、何がそんなにすごいのか？'
description: 'Chrome Beta 42 から利用可能になったプッシュ通知機能の熱さについて語ります'
date: "2015-03-13"
tags:
- Service Worker
- Push Notification
---

3 月 13 日、[Chrome Beta のブログポスト](http://googledevjp.blogspot.jp/2015/03/chrome-42-es6-class.html)が出ました。Android 版 Chrome でプッシュ通知が使えるようになったのが個人的なハイライトです。

「確かにプッシュ通知は便利かもね〜」と思ったあなた、驚きが足りません。のけぞるべきです。小躍りするべきです。  
理由を説明します。

<!-- excerpt -->

## ユーザーエンゲージメントが変わる

あなたのウェブサイトのビジネスモデルが広告モデルにしろ課金モデルにしろ、ユーザーが繰り返し訪れてくれることは大前提です。通常のウェブサイトやサービスは、そのための策を練ります。そのきっかけをサービス側から能動的に与えることで、ユーザーが戻ってきて、ビジネスは回ります。しかし、そのきっかけを与える方法は、非常に限定されていると言わざるを得ません。  

インターネットが普及し始めた当初から伝統的に利用されているのがメール、数年前から利用されているのがソーシャルメディア、最近ではネイティブアプリの通知 (この場合はアプリ自体が戻ってきてほしい場所) 辺りが代表的です。そしてこれらいずれの方法も、スタートラインに立つことすら難しいのが現状です。

### メールアドレス
例えばダイレクトメールといった形でユーザーに最新情報を届けることで興味を持ち、戻ってきてもらうにしても、そもそもそのメールアドレスの獲得自体が簡単ではありません。ユーザーのプライベートな情報であるメールアドレスは、大抵の場合、会員登録という形で他のプライバシー情報と合わせて収集されます。そのためサイトは、少なからぬ信頼を短時間の間にユーザーから得られる必要があります。メジャーなサイトですら、多少姑息な方法を使ってでもメールを送り続ける理由を保つ策が練られていたりするくらい、メールアドレスの獲得はウェブサービスにとって生命線です。

### ソーシャルメディア
近年流行ってる、いわゆるソーシャルメディアマーケティングは、Facebook で「いいね」や Twitter で「フォロー」してもらうことで、ユーザーのタイムラインに任意の情報を流せるというものです。メールアドレスの獲得に比べれば、ユーザーのボタンクリックひとつで実現できる上、ユーザーが普段見ているであろう「場」に情報を流せるとあり、今まさにメインストリームと言ってもよいマーケティング方法です。

とはいえ、これはあくまでユーザーがその「場」を普段から見ているという前提があって成り立つものであり、必ずしもすべてのユーザーがそういう行動を取るわけでもなければ、そもそもサイトを訪れたユーザーが Facebook や Twitter を使っているという保証はどこにもありません。

### ネイティブアプリ
サービス提供者がウェブよりもネイティブアプリを選ぶ理由は、パフォーマンスだけではありません。

<blockquote class="twitter-tweet" lang="ja"><p>A year ago, I asked what features made you turn to native. #1 response: push notifications. Today, they&#39;re available: <a href="http://t.co/wDOKa5qVbf">http://t.co/wDOKa5qVbf</a></p>&mdash; Paul Irish (@paul_irish) <a href="https://twitter.com/paul_irish/status/576089864514326528">2015, 3月 12</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

> 1 年前のアンケートで (ウェブ開発者が) ネイティブに移行した理由 No.1 は通知機能だった

これは Paul Irish の行ったアンケートの結果ですが、僕の周辺でもたまに「ユーザーに通知を出したいがためにウェブではなくネイティブというプラットフォームを選んだ」という話を聞きます。

EC のアプリであれば新製品やキャンペーンの紹介、ゲームなら新しいステージの追加、SNS なら友達からの返信、メールアプリなら新着メールのお知らせなど、様々な通知を送ってきます。スマートフォンの場合、大抵常に電源が入っているし、肌身離さず持っているので、ユーザーに見てもらえる確率は、他の手段と比べても格段に高いでしょう。  
しかしこれもあくまで「アプリをインストールしてもらえれば」の話です。そもそもアプリをインストールしてもらうのが難しい、という方が普通のはずです。

## ウェブ版プッシュ通知のインパクト

今回 Chrome Beta で利用可能になったウェブ版のプッシュ通知は、様々な点で上記いずれをも凌駕します。まずは体験してみてください。

![](/images/2015-03-13/push-message.gif)

[Simple Push Demo](https://simple-push-demo.appspot.com/)

1. [Android 版 Chrome Beta](https://play.google.com/store/apps/details?id=com.chrome.beta) で上記サイトにアクセス
2. "Enable Push Notifications" をタップ
3. 通知の許可が求められたら「許可」をタップ
4. "SEND A PUSH TO GCM VIA XHR" をタップ、もしくはその下にある curl コマンドをコピペして Terminal から GCM に直接コマンドを送信

通知は出ましたか？

デモなので、4 のステップでユーザーが自分で通知をトリガーしないといけない部分はちょっとマヌケなのですが、実際のサービスでは、サービス提供者側が任意のタイミングでこれを出せることになります。

ここで重要なのは **通知を受け取るためにユーザーに必要なアクションが「許可」するだけ** という点です。

- ユーザーはインストールというステップがなく、ウェブサイトにアクセスするだけでよい
- メールアドレスなどの個人情報を入力して会員登録しなくてよい
- Android OS の持つ通知機能が「場」なので、ほぼ確実にユーザーに届けられる
- 通知を受け取る際、サイトが開かれている必要がない
- ウェブ標準を前提に作られているので、将来的にどのブラウザでも同様のことが実現できる可能性がある

インターネットの歴史上、ここまで簡単かつ高い確率で行えるユーザーエンゲージメントがあったでしょうか？

## 想定されるユースケース

- EC サイトで新商品発売の通知
- SNS でコメントの通知
- ブログで新記事追加の通知
- ウェブメールで新着メールの通知
- メッセンジャーアプリで mentions の通知
- カレンダーアプリで予定の通知

etc...

## プッシュ通知の技術

細かい実装方法はここでは解説しません。すでに[素晴らしい記事](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web)が上がっているので、そちらをお読み下さい。英語が苦手？きっと誰かが日本語に翻訳してくれることでしょう :)

いくつか要点だけまとめておきます。Chrome のプッシュ通知機能は：

- [Service Worker](http://www.html5rocks.com/ja/tutorials/service-worker/introduction/) を利用する
- Chrome では今のところ [Google Cloud Messaging](https://developer.android.com/google/gcm/index.html) を使ってプッシュする
- HTTPS が前提

といった感じです。

## まとめ

[こちらの記事の FAQs](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web) を見ていただくと分かる通り、Chrome の実装では、GCM のデータに情報を載せられないなど、まだまだ制約は少なくありません。当然のことながら他のブラウザでの実装も揃ってからの方がより威力を発揮するでしょう。  

そういったこともあり、ウェブでのプッシュ通知はまだ少し未来のテクノロジーかもしれません。しかし検証を始めるなら今です。  
魅力的なテクノロジーはずる賢い使われ方をするのが世の常ですので、この機能が蹂躙されることも想定して、今からどういったアプローチでユーザーの信頼を得ていくか、戦略を立てていくことが重要だと思います。

メールマーケティング、ソーシャルメディアマーケティングと同様に、プッシュ通知マーケティングなんて言葉がそのうち出てくるのかもしれません。

いや、マジメに。