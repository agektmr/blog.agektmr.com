---
title: iPhoneでモバイルウェブアプリ
author: Eiji
layout: post
date: 2010-08-11
categories:
  - HTML5
  - WebApp
tags:
  - iPhone
  - OpenAppMkt
---
お久しぶりです。すっかりウェブアプリな毎日を過ごしているえーじです。今回はモバイルウェブアプリでこれは！というネタを拾ったのでご紹介。

## OpenAppMkt

<a href="http://openappmkt.com/" target="_blank">http://openappmkt.com/</a>

iPhone向けのサービスです。登録なしで利用できるので、iPhoneをお持ちの方は、取り敢えず試してみてください。

[<img class="alignnone size-full wp-image-711" title="openappmkt_bookmark" src="/images/2010/08/10-23-57-28.jpg" alt="" width="320" height="480" />][1]

iPhoneでアクセスするといきなり「ホーム画面にブックマーク」しろと出て来るので、やってみます。すると当然ながらホーム画面にアイコンが出現します。問題はここから。

[<img class="alignnone size-full wp-image-710" title="openappmkt_top" src="/images/2010/08/10-23-57-15.jpg" alt="" width="320" height="480" />][2]

アイコンをクリックして起動してみると、ブラウザではなく、ネイティブアプリらしきものが起動します(!)。これはアプリをインストールするためのアプリなので、試しにFacebookをインストールして、起動してみます。こちらのインストール手順も同じくホーム画面にブックマーク。

[<img title="openappmkt_facebook" src="/images/2010/08/11-0-10-35.jpg" alt="" width="320" height="480" />][3]

Facebookアプリを起動するとこれまた不思議とネイティブアプリらしきものが起動。しかし内容はどう見てもスマートフォン版Facebook・・・。

実はこれ、ウェブアプリなんです。ナビゲーションやメニューを表示していないだけで、Safariが起動している様子。iPhoneでこんな事できたんですね。

## モバイルウェブアプリケーション

実際に使ってみると、これだけでユーザーエクスペリエンス(主に気分)が大分違うことに気付くと思います。なぜ今までほとんどのiPhoneウェブアプリがこの方法をとってこなかったのか不思議なくらい。Safariで見るとただのウェブサイトでも、こうしてナビゲーションなしで画面が見えると、普通のアプリとして扱うことにためらいを感じません。

レスポンスもしっかりしているので、動作の軽いアプリであれば、ウェブアプリであることを意識しないで利用できるし、何よりもウェブを作る感覚でiPhone用アプリが作れるのは、ウェブディベロッパーにとって大変ありがたいお話です。これまでの資産を活かすこともできるという意味でも、単純なことながら見逃せないテクニックと言えます。

ここまで来ると、後の問題はディストリビューション。どうやって作ったウェブアプリを配布するか。そこを担うのがOpenAppMktの役割、という訳ですね。ひとことで言えば「iTunes Storeのウェブアプリ版」。あ、<a href="http://www.apple.com/webapps/" target="_blank">これ</a>も忘れちゃイヤですけどね。詳細は見ていませんが、課金もできるようです。

## HTML5と組み合わせて、究極のウェブアプリを

上記のように、Safariのメニューやステータスバーを消すには、HTMLにapple-mobile-web-app-capableというメタタグを入れるだけで、非常に簡単に実現できるようです。詳細は<a href="http://developer.apple.com/safari/library/documentation/appleapplications/reference/safarihtmlref/articles/metatags.html" target="_blank">こちら</a>を御覧ください。

実はこの機能、OS2.1からできていたらしく、僕も小耳に挟んだ記憶はあったのですが、実際に動いているウェブアプリを目にしたのは初めてでした。ある意味この機能が日の目を見るのに、iPhoneはHTML5の登場を待っていた、という部分もあるかもしれません。

例えば、これとApplicationCacheやWeb SQL Databaseを組み合わせたところを想像してみてください。基本的なリソースはAppCacheですべてローカルにキャッシュ。動的なデータは、オフライン時はWeb SQL Databaseに保存、オンラインになったことを検知してクラウドに同期、といった形にすれば、完全にオフラインで動作可能なウェブアプリができあがります。

色々夢が広がってしまって困りますね・・・

 [1]: /images/2010/08/10-23-57-28.jpg
 [2]: /images/2010/08/10-23-57-15.jpg
 [3]: /images/2010/08/11-0-10-35.jpg