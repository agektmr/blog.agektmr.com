---
title: オープンなコンタクトリスト仕様、Portable Contacts
author: Eiji
layout: post
SBM_count:
  - '00003<>1271388872<>3<>0<>0<>0<>0'
dsq_thread_id:
  - 4708803
categories:
  - DataPortability
  - OpenSocial
  - SocialWeb
tags:
  - PortableContacts
---
Plaxoの<a href="http://www.josephsmarr.com/" target="_blank">Joseph Smarr</a>氏が使う言葉に&#8221;Open Building Blocks for the Social Web&#8221;というものがあります。これはウェブをよりソーシャルにし、サービス相互の連携を深めていくために必要な&#8221;要素&#8221;を表しています。

この&#8221;要素&#8221;には<a href="http://openid.net/" target="_blank">OpenID</a>, <a href="http://oauth.net/" target="_blank">OAuth</a>, <a href="http://microformats.org/" target="_blank">microformats</a>, <a href="http://www.opensocial.org/" target="_blank">OpenSocial</a>と、いずれもこのブログで取り上げてきたこれからのソーシャルウェブを占う重要な規格が挙げられていますが、そんな重要なピースのひとつに、<a href="http://portablecontacts.net/" target="_blank">Portable Contacts</a>が加えられました。

Joseph Smarr氏の在籍する<a href="http://www.plaxo.com" target="_blank">Plaxo</a>にて、既に<a href="http://www.plaxo.com/api/portablecontacts" target="_blank">利用可能なAPIが公開</a>されています。

## Portable Contactsとは

> Portable Contacts, is an easy-to-implement &#8220;people data&#8221; API that provides secure access to both traditional address book data and to modern social application data (profiles and friends lists).

> PortableContactsとは、従来のアドレス帳データと最近のソーシャルアプリケーションデータ(プロフィールと友達リスト)のいずれにも、セキュアなアクセスを提供する、簡単に実装可能な&#8221;Peopleデータ&#8221;のAPIです。

<a href="http://portablecontacts.net/draft-spec.html" target="_blank">現時点の仕様</a>の中身を見てみると：

*   ディスカバリの方法(XRDS-Simple)
*   認証/認可の方法(OAuth, Basic認証)
*   クエリパラメータ(ソート、フィルタ等)
*   応答フォーマット(JSON, XML)
*   エラーコード
*   Contactのスキーマ

といった内容になっています。vCardやOpenSocial等、既存の仕様から大きく外れないよう意識して設計されているとのこと。

## Portable Contactsの使いどころ

Portable Contactsはアドレス帳や友達リストを表すものですので、様々な分野で応用できることが予想されます。

### ソーシャルネットワークサービス間の友達リスト交換

既に<a href="http://jp.techcrunch.com/archives/20080508myspace-embraces-data-portability-partners-with-yahoo-ebay-and-twitter/" target="_blank">MySpaceのDataAvailabilityでサービスイメージが示されています</a>が、MySpaceの友達リストをTwitterにインポートする、なんてことが可能になります。

### デスクトップアプリとのアドレス帳交換

例えばMac OS Xのアドレス帳アプリとMicrosoft Outlookのアドレス帳を、ウェブサービスを通じて同期するなんて事も、これまで以上に統一した規格の上で行う事ができるようになります。

### 携帯電話とSNSのアドレス帳を同期

自分が利用しているSNSの友達リストをそのまま携帯電話に乗せたり、その逆を行う事ができるようになります。ここで<a href="http://www.ripplex.com/" target="_blank">Ripplex</a>のようなサービスが間に入ると、さらに面白いことができるようになるでしょう。

## OpenSocialとの関係

あれ、じゃあOpenSocialとPortable Contactsて同じじゃないの？と思った方もいるのではないでしょうか。そう、基本的にOpenSocialのPeople APIとPortable Contactsの役割は同じです。似た仕様が複数存在する事はあまり好ましくないため、個人的にも疑問に思っていました。

実はJoseph Smarr氏の働きかけにより、Portable Contactsは**OpenSocial v0.8.1仕様で統合**されました。言い換えると、OpenSocialのPeople APIの仕様とPortable Contactsの仕様は**同じ**です。

OpenSocial v0.8.1の仕様はまもなく公開されると思いますが、内容はPortable Contactsに沿ったものになっていることが確認できます。

## まとめ

ソーシャルウェブエコシステム構築の動きは、Portable Contactsのようなピースが揃う事でさらに加速してきています。今後もソーシャルウェブのメインプレイヤーたちの動向から目が離せません。