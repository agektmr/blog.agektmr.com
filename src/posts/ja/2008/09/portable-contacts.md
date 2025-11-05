---
title: オープンなコンタクトリスト仕様、Portable Contacts
layout: post
lang: ja
date: 2008-09-18
tags:
  - PortableContacts
  - DataPortability
  - OpenSocial
  - SocialWeb
---

Plaxo の [Joseph Smarr](http://www.josephsmarr.com/) 氏が使う言葉に "Open
Building Blocks for the Social Web" というものがあります。これはウェブをよりソー
シャルにし、サービス相互の連携を深めていくために必要な"要素"を表しています。

この"要素"には [OpenID](http://openid.net/), [OAuth](http://oauth.net/),
[microformats](http://microformats.org/),
[OpenSocial](http://www.opensocial.org/) と、いずれもこのブログで取り上げてきた
これからのソーシャルウェブを占う重要な規格が挙げられていますが、そんな重要なピー
スのひとつに、[Portable Contacts](http://portablecontacts.net/) が加えられまし
た。

Joseph Smarr 氏の在籍する [Plaxo](http://www.plaxo.com) にて、既に[利用可能なAPI
が公開](http://www.plaxo.com/api/portablecontacts)されています。

## Portable Contacts とは

> Portable Contacts, is an easy-to-implement "people data" API that provides
> secure access to both traditional address book data and to modern social
> application data (profiles and friends lists).

> PortableContacts とは、従来のアドレス帳データと最近のソーシャルアプリケーショ
> ンデータ (プロフィールと友達リスト) のいずれにも、セキュアなアクセスを提供す
> る、簡単に実装可能な "People データ" の API です。

[現時点の仕様](http://portablecontacts.net/draft-spec.html)の中身を見てみると：

* ディスカバリの方法 (XRDS-Simple)
* 認証 / 認可の方法 (OAuth, Basic 認証)
* クエリパラメータ (ソート、フィルタ等)
* 応答フォーマット (JSON, XML)
* エラーコード
* Contact のスキーマ

といった内容になっています。vCard や OpenSocial 等、既存の仕様から大きく外れない
よう意識して設計されているとのこと。

## Portable Contactsの使いどころ

Portable Contacts はアドレス帳や友達リストを表すものですので、様々な分野で応用で
きることが予想されます。

### ソーシャルネットワークサービス間の友達リスト交換

既に [MySpace の DataAvailability でサービスイメージが示されていま
す](http://jp.techcrunch.com/archives/20080508myspace-embraces-data-portability-partners-with-yahoo-ebay-and-twitter/)
が、MySpace の友達リストを Twitter にインポートする、なんてことが可能になりま
す。

### デスクトップアプリとのアドレス帳交換

例えば Mac OS X のアドレス帳アプリと Microsoft Outlook のアドレス帳を、ウェブ
サービスを通じて同期するなんて事も、これまで以上に統一した規格の上で行う事ができ
るようになります。

### 携帯電話とSNSのアドレス帳を同期

自分が利用している SNS の友達リストをそのまま携帯電話に乗せたり、その逆を行う事
ができるようになります。ここで [Ripplex](http://www.ripplex.com/) のようなサービ
スが間に入ると、さらに面白いことができるようになるでしょう。

## OpenSocialとの関係

あれ、じゃあ OpenSocial と Portable Contacts て同じじゃないの？と思った方もいる
のではないでしょうか。そう、基本的に OpenSocial の People API と Portable
Contacts の役割は同じです。似た仕様が複数存在する事はあまり好ましくないため、個
人的にも疑問に思っていました。

実は Joseph Smarr 氏の働きかけにより、Portable Contacts は **OpenSocial v0.8.1
仕様で統合**されました。言い換えると、OpenSocial の People API の仕様と Portable
Contacts の仕様は**同じ**です。

OpenSocial v0.8.1 の仕様はまもなく公開されると思いますが、内容は Portable
Contacts に沿ったものになっていることが確認できます。

## まとめ

ソーシャルウェブエコシステム構築の動きは、Portable Contacts のようなピースが揃う
事でさらに加速してきています。今後もソーシャルウェブのメインプレイヤーたちの動向
から目が離せません。
