---
title: Shindig を読み解く
layout: post
date: 2008-05-04
tags:
  - OpenSocial
  - Shindig
---

以前インストール方法をご紹介した ([Java
版](http://devlog.agektmr.com/archives/6)、[PHP
版](http://devlog.agektmr.com/archives/11)) Shindig ですが、ようやく PHP 版も使
えるレベルになってきましたので、ソースを読み解いてみました。なお、Java 版の方が
実装は進んでいますが、今回は PHP 版に限った話ですのでご注意ください。

## Shindig とは何なのか

そもそも、の話です。

Shindig はひとことで言うと「**OpenSocial コンテナのサンプル実装**」です。これを
ダウンロードして動かすだけで、iGoogle ガジェットと OpenSocial ガジェットの動作テ
ストを行うことができます。実際は OpenSocial を広く普及させるよう、数多ある SNS が
Shindig を参考に、もしくは流用して OpenSocial に対応することを目的にしています。

* [Shindig - an Apache incubator project for OpenSocial and
  gadgets](http://incubator.apache.org/shindig/)
* [メーリングリスト](http://mail-archives.apache.org/mod_mbox/incubator-shindig-dev/)
* [レポジトリ](http://svn.apache.org/repos/asf/incubator/shindig/trunk/)

## 主なディレクトリ構成

* config: コンテナ設定
* features: 各種機能セット(JavaScript コード)
* java: Java ソースコード
* javascript: HTML, JavaScript コード
* php: PHP ソースコード

## ディレクトリ解説

### config

`container.js` というファイルがコンテナのデフォルト設定となり、プロキシや
OpenSocial API のパス等の設定を行います。設定を変更したい場合はこのディレクトリ
にファイルを追加して、必要な部分のみを JSON 形式で追記すれば、デフォルト設定が引
き継がれます。なお、JSON 形式なのは、PHP や Java だけでなく、他の言語からも読み
込むことを想定しているためと思われます。(Perl 版や Ruby 版の Shindig も開発され
る予定だそうです。)

### features

ガジェット XML に `<Require features=";">` という形式で記述される機能 (features)
をセットとして読み込みます。features ディレクトリ内は機能セットごとにさらにディ
レクトリに分けられていて、各ディレクトリにある features.xml ファイルで必要な
JavaScript ライブラリセットが指定されています。

### php

PHP のソースコードは Java 版を参考にしているためか、あまり PHP らしくない実装に
なっています。

まず MVC 形式を取っていません。オブジェクトの分け方は色々な方法がありますが、
ウェブアプリケーション的なものと言うよりは、Java 的な方法で(?)機能や設定ごとに、
非常に細かく分けられています。メンバ変数にいちいち get〜や set〜メソッドを用意し
ているのも Java っぽい。

PHP へのリクエストはリライトされ(.htaccess ファイルで指定)、すべて index.php に
読み込まれます。index.php はリクエストのパラメータに応じて処理を 6 種類のサーブ
レットに振り分けます。

* 静的ファイル (/gadgets/files)
* JavaScript (/gadgets/js)
* プロキシ (/gadgets/proxy)
* ガジェット (/gadgets/ifr)
* メタデータ (/gadgets/metadata)
* OpenSocial API (/social/data)

クラスのインクルードは__autoload が使用されているため、ほとんど書かれていませ
ん。

`config.php` には各種ファイルへのパスなど、設定が記述されています。
(`config/container.js` とは別物です)

なお、Shindig はデータベースを使っていないので、キャッシュは/tmp ディレクトリ、
設定は cookie、友達リストは静的 XML ファイルでそれぞれ管理されます。

## まとめ

ソースコードは一見シンプルですが、かなり複雑です。Java 的な実装方法に加え、他言
語版 Shindig との設定等の共有を想定した汎用化など、オプティマイズする余地はかな
りありそう。PHP 版 Shindig を既存フレームワークに取り込むのは難しくはありません
が、あくまでも参考にする程度にした方がいいと思われます。

なお、今のところ OpenSocial バージョン 0.7 対応ですが、まだまだバグも存在してい
ます。バージョン 0.8 の機能仕様が出揃ってきたところですが、Shindig での対応は時
間差が出そう。

OpenSocial API は実装されていますが、Shindig で OpenSocial 機能が使えるように
なったというには、まだまだ足りない感じ。あとは OAuth とか、RESTful API と
か、、、。
