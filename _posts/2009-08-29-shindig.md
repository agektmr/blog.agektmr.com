---
title: Shindigのコミッターになりました
author: Eiji
layout: post
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00010<>1271391073<>7<>0<>2<>1<>0'
dsq_thread_id:
  - 
categories:
  - OpenSocial
  - SocialWeb
tags:
  - Shindig
---
「ウェブはソーシャルであるべきだ」。これは今の会社に  
入社した2005年くらいからずっと訴えてきたことです。ソーシャルグラフをプラットフォーム化することで実現できることがたくさんあります。まずはポータルサイト全体をソーシャル化することを目標にし、作り上げたのが<a href="http://home.goo.ne.jp/" target="_blank">gooホーム</a>でした。

将来の構想はその時点で既にあって、いずれはポータル外のサイトとも接続して、インターネット全体がソーシャルグラフで繋がることをイメージしていました。そんな時に登場したのが<a href="http://www.facebook.com/" target="_blank">Facebook</a>です。

Facebookがやろうとしていたことは、SNSの中にサービスを取り込むという、僕の考えとは真逆でしたが、結果的にやろうとしていたことは似たようなもので、先に実現されたことにくやしい思いをました。そして<a href="http://www.opensocial.org/" target="_blank">OpenSocial</a>が登場します。

OpenSocialは仕様を民主的に決めて行くオープンなスタイルでした。オープン性のメリットは計り知れません。2つ以上のシステムを繋ぐのに、仕様から作るよりも、既に決まり事があれば話が早いのは火を見るよりも明らかです。技術的工夫もさることながら、コミュニケーションコストは大幅に削減できます。

さらに、オープンな仕様であればそれを使ったプロダクトが生まれやすくもなります。OpenSocial周りでも既に、よういちろうさんの<a href="http://code.google.com/p/opensocial-development-environment/" target="_blank">OpenSocial Development Environment</a>や<a href="http://groups.google.com/group/opensocial-client-libraries" target="_blank">OpenSocial Client Library</a>、OAuth関連ライブラリ、そして僕の作った<a href="http://code.google.com/p/opensocial-signed-request-php-library/" target="_blank">OpenSocial Signed Request Library</a>など、様々なオープンソースプロダクトが生まれ、後発の生産性を上げています。

そんなOpenSocial関連プロダクトの中心となるのが、OpenSocialコンテナのリファレンス実装である<a href="http://incubator.apache.org/shindig/" target="_blank">Shindig</a>です。

僕がOpenSocialの既存仕様を学ぶ上で紐解いたのものこのShindigでした。当時はまだ日本でほとんど手をつけている人がいなかったため、API Expertとして声をかけて頂いたのも、Shindigに関する情報をこのブログで公開していたためです。

その後実際にgooホームでディプロイするに辺り、様々なパッチを書き、Shindigの開発チーム提供してきました。(もちろん、OpenSocialの仕様自体にも口を出してきましたが。)そうこうしているうちに、1年半ほどが経過し・・・

**このたび、Shindigの<a href="http://ja.wikipedia.org/wiki/コミッター" target="_blank">コミッター</a>になりました。**

PHP版ShindigのメインコミッターであるChris Chabot氏とは、PHP版の最初のコミット前から連絡を取り、昨年のGoogle IOでも直接お会いし、その後もメッセンジャーで話したりしてきましたが、そのChrisにShindigのコミッターに推薦して頂いたのです。

Apache Software Foundationでコミッターになるには、既存コミッターの投票が必要らしいのですが、これまでの貢献を認めてもらい、承認して頂きました。

PHP版Shindigは今や、全世界述べ5億人(!)が26以上のSNSで使っているといいます。にも関わらずフィードバックされていたパッチはそれほど多くなく、自分がやってきたことは貴重だったようです。

本来僕にとってOpenSocialというのは理想のSocialWebを実現するための道具に過ぎないのですが、少なくとも日本では実質的なデファクトであり、mixiやgooホームで使われているShindigというプロダクトは、その根幹を支えるものです。

今後はShindigのコミッターとしても、日本のSocialWebを作り上げ、支えて行ければと思います。