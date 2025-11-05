---
title: 'オープンソースの Shindig 対応 SNS - Partuza!'
layout: post
lang: ja
date: 2008-06-03
tags:
  - OpenSocial
  - Partuza!
  - Shindig
---

OpenSocial のコンテナと言えば
[Shindig](http://devlog.agektmr.com/archives/tag/shindig) ですが、PHP 版は既に
OpenSocial v0.7 への対応を完了しています。
[Partuza!](http://code.google.com/p/partuza/) は PHP 版 Shindig の開発者である
Chris Chabot 氏がオープンソースで開発した Shindig 対応 SNS です。

Shindig がコンテナなのに、じゃあ Partuza!は何をするの？と思われるかもしれませ
ん。今回はインストール方法と、Shindig との関係について解説します。

## Partuza!をインストールする

[Shindig のインストール方法は以前解説しまし
た](http://devlog.agektmr.com/archives/11)ので、ここでは割愛します。仮に、
Shindig が `~/shindig` 配下にインストールされ、`http://localhost:8080/gadgets/…`
でアクセスできるものとします。

まず、環境として Apache、PHP5(要 mcrypt)、MySQL5 が必須となります。

### レポジトリからチェックアウト

Google Code のレポジトリから SVN でチェックアウトします。

```shell
> svn checkout http://partuza.googlecode.com/svn/trunk/ ~/partuza
```

### データベースを用意

適当なデータベース名、ユーザー名、パスワードで空の DB を作ってください。ひとまず
ここではそれぞれ、partuza、root、パスワードなしとします。この状態で、
`~/partuza/partuza.sql` をダンプします。

```shell
> mysql -u root partuza > partuza.sql
```

### DocumentRoot を設定

Apache の設定 (`httpd.conf`) で `DocumentRoot` を `~/partuza/html` に設定し、
`http://localhost/` でアクセスできるようにします。もちろん、Shindig とは別ドメイ
ンを用意する必要がありますので、バーチャルホストを使う等してください。

### 設定ファイルを修正

`~/partuza/html/config.php` を編集します。ここでは先程作成したデータベース関連の
情報とガジェットサーバーのルート URL (`gadget_server`) を設定します。ガジェット
サーバーの URL が、ここでは Shindig の URL となりますので、
`http://localhost:8080/` になります。

### データベースハンドラをコピー

`~/partuza/Shindig/PartuzaDbFetcher.php` と
`~/partuza/Shindig/PartuzaHandler.php` を `~/shindig/php/src/social` にコピーし
ます。

```shell
> cp ~/partuza/Shindig/Partuza* ~/shindig/php/src/social
```

### Shindig のデータベース設定を修正

`~/shindig/php/src/social/PartuzaDbFetcher.php` にもデータベース関連の情報がある
ので修正します。加えて Shindig がデータベースハンドラを利用するよう、
`~/shindig/php/config.php` も修正します。ここでは、"handlers => PartuzaHandler"
としてください。

これで一通りの準備は完了。`http://localhost/` にアクセスしてウェルカム画面が出れ
ば成功です。このまま登録し、Orkut ライクな一般的な SNS として利用することができ
ます。

## Partuza!と Shindig の関係

OpenSocial のガジェットが iframe を介して表示されていることは以前も解説しました
が、簡単に言ってしまえば、iframe の手前が Partuza、後ろが Shindig になります。
Shindig では以前から下記の URL にアクセスすることで簡易的な HTML から OpenSocial
ぽい表示を行うことはできていましたが、Partuza を使うことで完全な SNS となりま
す。

http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html

とはいえ、PartuzaHandler を指定したところからも想像できるように、データベースは
共有されます。なお、[Chris Chabot 氏のサイト](http://partuza.us.chabotc.com/)で実
際に動いているものを確認することができます。

Partuza!を使うことで、どうすれば Shindig を SNS に組み込むことができるかの解析を
することができるだけでなく、そのままちょっとした SNS を開発することもできてしま
います。ぜひお試しください。
