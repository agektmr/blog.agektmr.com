---
title: 'オープンソースのShindig対応SNS &#8211; Partuza!'
author: Eiji
layout: post
permalink: /archives/71
SBM_count:
  - '00007<>1271333836<>5<>0<>2<>0<>0'
dsq_thread_id:
  - 2426906
categories:
  - OpenSocial
tags:
  - OpenSocial
  - Partuza!
  - Shindig
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/71" callback="wp_plus_one_handler"></g:plusone>
</div>

OpenSocialのコンテナと言えば<a href="http://devlog.agektmr.com/archives/tag/shindig" target="_blank">Shindig</a>ですが、PHP版は既にOpenSocial v0.7への対応を完了しています。<a href="http://code.google.com/p/partuza/" target="_blank">Partuza!</a>はPHP版Shindigの開発者であるChris Chabot氏がオープンソースで開発したShindig対応SNSです。

Shindigがコンテナなのに、じゃあPartuza!は何をするの？と思われるかもしれません。今回はインストール方法と、Shindigとの関係について解説します。

## Partuza!をインストールする

<a href="http://devlog.agektmr.com/archives/11" target="_blank">Shindigのインストール方法は以前解説しました</a>ので、ここでは割愛します。仮に、Shindigが~/shindig配下にインストールされ、http://localhost:8080/gadgets/&#8230;でアクセスできるものとします。

まず、環境としてApache、PHP5(要mcrypt)、MySQL5が必須となります。

### レポジトリからチェックアウト

Google CodeのレポジトリからSVNでチェックアウトします。

<pre>&gt; svn checkout <strong><em><span style="font-style: normal;"><span style="font-weight: normal;">http</span></span></em></strong>://partuza.googlecode.com/svn/trunk/ ~/partuza</pre>

### データベースを用意

適当なデータベース名、ユーザー名、パスワードで空のDBを作ってください。ひとまずここではそれぞれ、partuza、root、パスワードなしとします。この状態で、~/partuza/partuza.sqlをダンプします。

<pre>&gt; mysql -u root partuza &lt; partuza.sql</pre>

### DocumentRootを設定

Apacheの設定(httpd.conf)でDocumentRootを~/partuza/htmlに設定し、http://localhost/でアクセスできるようにします。もちろん、Shindigとは別ドメインを用意する必要がありますので、バーチャルホストを使う等してください。

### 設定ファイルを修正

~/partuza/html/config.phpを編集します。ここでは先程作成したデータベース関連の情報とガジェットサーバーのルートURL(gadget_server)を設定します。ガジェットサーバーのURLが、ここではShindigのURLとなりますので、http://localhost:8080/になります。

### データベースハンドラをコピー

~/partuza/Shindig/PartuzaDbFetcher.phpと~/partuza/Shindig/PartuzaHandler.phpを~/shindig/php/src/socialにコピーします。

<pre>&gt; cp ~/partuza/Shindig/Partuza* ~/shindig/php/src/social</pre>

### Shindigのデータベース設定を修正

~/shindig/php/src/social/PartuzaDbFetcher.phpにもデータベース関連の情報があるので修正します。加えてShindigがデータベースハンドラを利用するよう、~/shindig/php/config.phpも修正します。ここでは、&#8221;handlers => PartuzaHandler&#8221;としてください。

これで一通りの準備は完了。http://localhost/にアクセスしてウェルカム画面が出れば成功です。このまま登録し、Orkutライクな一般的なSNSとして利用することができます。

[<img class="alignnone size-medium wp-image-72" title="partuza" src="http://devlog.agektmr.com/wp-content/uploads/2008/05/partuza-300x185.jpg" alt="" width="300" height="185" />][1]

## Partuza!とShindigの関係

OpenSocialのガジェットがiframeを介して表示されていることは以前も解説しましたが、簡単に言ってしまえば、iframeの手前がPartuza、後ろがShindigになります。Shindigでは以前から下記のURLにアクセスすることで簡易的なHTMLからOpenSocialぽい表示を行うことはできていましたが、Partuzaを使うことで完全なSNSとなります。

<address>
  http://localhost:8080/gadgets/files/samplecontainer/samplecontainer.html
</address>

とはいえ、PartuzaHandlerを指定したところからも想像できるように、データベースは共有されます。なお、<a href="http://partuza.us.chabotc.com/" target="_blank">Chris Chabot氏のサイト</a>で実際に動いているものを確認することができます。

Partuza!を使うことで、どうすればShindigをSNSに組み込むことができるかの解析をすることができるだけでなく、そのままちょっとしたSNSを開発することもできてしまいます。ぜひお試しください。

 [1]: http://devlog.agektmr.com/wp-content/uploads/2008/05/partuza.jpg