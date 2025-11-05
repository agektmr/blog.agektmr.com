---
title: Snow LeopardにMySQLをインストールする
author: Eiji
layout: post
lang: ja
date: 2009-09-11
categories:
  - Mac
tags:
  - Mac OS X
  - MySQL
  - Partuza!
  - Shindig
  - Snow Leopard
---
Mac OS XをSnow LeopardにしたらPHPが5.3になってて、PartuzaやShindigを使うのにentropyを入れなくても済んで、とても素敵です。

しかし同環境でMySQLを使うのに、ちょっとごにょごにょしなければならなかったのでメモを残しておきます。(2009年9月現在の情報です)

## MySQLをダウンロード

MySQLのバイナリを[こちら](http://dev.mysql.com/downloads/)からダウンロードします。このページの下の方にあるMac OS X(package format)の中から、(Snow Leopardは10.6ですが)Mac OS 10.5(x86_64)を選びます。

## MySQLをインストール

インストールはGUIでできます。環境設定項目とスタートアップアイテムもインストールしちゃいます。パスも切っておきましょう。

`~/.bash_profile`を作るか、既にあれば下記を追記します。

```shell
PATH=$PATH:/usr/local/mysql/bin
export PATH
```

さらに

```shell
> source ~/.bash_profile
```

とかやれば、即時反映できます。

## ごにょごにょする

ここからがポイント。

```shell
>  cd /usr/local/mysql
>  sudo ./script/mysql_install_db
```

そんで

```shell
> sudo cp /etc/php.ini.default /etc/php/ini
>  sudo vim /etc/php.ini
```

とかやって、

```shell
mysqli.default_socket = /var/mysql/mysql.sock
```

の部分を

```shell
mysqli.default_socket = /tmp/mysql.sock
```

に書き換えます。

これで、MySQLを立ち上げ直せば、オッケー。環境設定からMySQLをスタートすれば、PHPでMySQLが使えるようになったはず。

### 追記

ちなみにこの設定はPartuzaの動作を確認したのみですので、他のことをやる場合はもう少しいじる必要があると思います。