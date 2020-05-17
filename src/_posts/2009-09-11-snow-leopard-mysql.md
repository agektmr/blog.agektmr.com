---
title: Snow LeopardにMySQLをインストールする
author: Eiji
layout: post
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00008<>1271372327<>8<>0<>0<>0<>0'
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

MySQLのバイナリを<a href="http://dev.mysql.com/downloads/" target="_blank">こちら</a>からダウンロードします。このページの下の方にあるMac OS X(package format)の中から、(Snow Leopardは10.6ですが)Mac OS 10.5(x86_64)を選びます。

## MySQLをインストール

インストールはGUIでできます。環境設定項目とスタートアップアイテムもインストールしちゃいます。パスも切っておきましょう。

~/.bash_profileを作るか、既にあれば下記を追記します。

<pre>PATH=$PATH:/usr/local/mysql/bin
export PATH</pre>

さらに

<pre>&gt; source ~/.bash_profile</pre>

とかやれば、即時反映できます。

## ごにょごにょする

ここからがポイント。

<pre>&gt;  cd /usr/local/mysql
&gt;  sudo ./script/mysql_install_db</pre>

そんで

<pre>&gt;  sudo cp /etc/php.ini.default /etc/php/ini
&gt;  sudo vim /etc/php.ini</pre>

とかやって、

<pre>mysqli.default_socket = /var/mysql/mysql.sock</pre>

の部分を

<pre>mysqli.default_socket = /tmp/mysql.sock</pre>

に書き換えます。

これで、MySQLを立ち上げ直せば、オッケー。環境設定からMySQLをスタートすれば、PHPでMySQLが使えるようになったはず。

### 追記

ちなみにこの設定はPartuzaの動作を確認したのみですので、他のことをやる場合はもう少しいじる必要があると思います。