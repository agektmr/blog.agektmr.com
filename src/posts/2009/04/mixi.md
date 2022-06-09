---
title: mixiアプリが公開 / はてぶチェッカーをリリース
author: Eiji
layout: post
date: 2009-04-10
categories:
  - OpenSocial
tags:
  - mixi
  - mixiアプリ
---
 ついに、ようやく、mixiによるOpenSocial実装、mixiアプリが一般ディベロッパーにも公開されました。

<a target="_blank" href="http://mixi.co.jp/press_09/0408_1.html">個人の皆さまでもソーシャルアプリケーションの開発が可能に。「mixiアプリ」オープンβ版公開！</a>

なんといっても1500万を超えるユーザーを抱えるmixiというプラットフォームに、誰でもガジェットを提供して一般ユーザーに使ってもらえるというのは魅力だと思います。OpenSocialを支持する者としては、ついにその時が来たか、という印象です。同時に、各所での盛り上がりを見るにつけ、羨ましい限り。

てことで、<a target="_blank" href="http://www.eisbahn.jp/yoichiro/">よういちろう氏</a>と一緒にgihyo.jpで連載しているこちらの記事

<a target="_blank" href="http://gihyo.jp/dev/serial/01/opensocial/">http://gihyo.jp/dev/serial/01/opensocial/</a>

でサンプルとして使っているはてブチェッカーガジェットを早速公開しました。

<a target="_blank" href="http://platform001.mixi.jp/view_appli.pl?id=682">http://platform001.mixi.jp/view_appli.pl?id=682</a>

 

 

<a target="_blank" href="http://sandbox.home.goo.ne.jp/">gooホーム</a>で作ったガジェットですが、これをmixiアプリに対応させる上で気づいた点がいくつか・・・。

*   現在の利用規約、ディベロッパー登録の方法だけでガジェットが原因で発生する法的問題をカバーする方法はちゃんと考えられているのか？
*   ガジェットを経由して個人情報を外部に流すことは理論的に可能だが、今の利用規約で一般ユーザーはそれを許容しているのか？
*   APIの不具合が散見、というかかなり見られる。
*   OpenSocialの拡張仕様がOpenSocialのスタイルを無視している。(opensocial.PersonFieldとか)

仕様周りは、よういちろう氏もmixiに移籍したことだし、今後改善していってもらいますか・・・。