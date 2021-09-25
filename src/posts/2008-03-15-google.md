---
title: Google ディベロッパー交流会
layout: post
date: 2008-03-15
tags:
  - Gadget
  - Google
  - OpenSocial
  - Shindig
  - Widget
---

表参道のダイヤモンドホールで行われた Google ディベロッパー交流会に参加してきまし
た。今回は OpenSocial がテーマということで、ドンピシャ。 色々な疑問を解決するこ
とが出来ました。

## OpenSocial アプリケーション(ガジェット)は SNS 間を持ち回れない？

とても基本的な疑問ですが、`OpenSocial は異なる SNS 間で API を共通化することで、
アプリケーション開発者の負担を軽くすることが目的のため、互換性は保証されるものと
考えていましたが、どうもそういう訳でもないらしい。**なぜなら、OpenSocial はアプ
リケーションを乗せるもの (Orkut では Google Gadget) について規定していないから。
**

OpenSocial の仕様書を見ると、サンプルコードはすべて Google Gadget を想定して書か
れていますが、実際の仕様に Google Gadget が要件であるとは書いていません。つま
り、別に Opera Widget だろうと Yahoo! Widget だろうと Dashboard Widget だろう
と、乗せられるところに乗せてよい訳です。そこでこの辺りをはっきりさせるため、プレ
ゼンをしてくれたクリスさん (ラストネームは忘れた) に聞いてみました。

* ガジェットは Google Gadget のみを想定している訳ではない。
* MySpaceApp や hi5、Orkut は Google Gadget 形式で提供される (未確認)
* アプリケーションは基本的に SNS 間で共有できるが、拡張機能に対応していると、別
  の SNS では動かない可能性もある。

僕の拙い英語力だと、なんだか釈然としない答えしか得られませんでした。なんだかまだ
もやもや感が残ってますが、個人的にこう思ってます。

* ガジェットは Google Gadget である必要はない
* アプリケーション開発者は、コア機能は共通かできるが、ガジェット部分については
  SNS ごとに用意する必要がある。

## OpenSocial は RESTful API の仕様が出るまで役に立たない?

OpenSocial は SNS から友達の情報を取得できることが目玉な訳ですが、当然認証認可が
必要になります。JavaScript の API では、単純に `newDateRequest` を使って簡単に取
得できるように書いてはありますが、コンテナ側の実装はそう単純ではありません。

Google Gadget を前提とした場合、コンテンツタイプとして 2 つの選択肢があります。1
つは Gadget XML 中に HTML も記述する html モード。もうひとつは Gadget XML 中にリ
モート URL を記述する url モードです。html モードは Google の管理する
gmodules.com というドメイン上で動作しますが、url モードの場合は、サードパー
ティーの管理する全く別のドメインで動作することになります。察しの良い人はこの時点
で気付くかと思います。

**リモートサーバーから OpenSocial の SNS 情報にアクセスするには、そのリモート
サーバーのプロキシを介して、SNS の RESTful API を叩く以外、方法がない**

これは単純に Ajax がドメイン超えできないということに起因していますが、とても重要
なこと。RESTful API がまだ正式に用意されていない OpenSocial なだけに、これがない
と使い物にならないんじゃないの？　MySpace の RESTful API ってなによ！？　Orkut の
iLike アプリってリモートじゃね！？という疑問が募ってしまったのでした。(あれ？
Ajax って JavaScript 自体の置いてあるドメインだったら直接リクエスト投げられるの
か!?)

## Shindig について

先日インストールした Shindig ですが、まだ Java しか対応していないものだとばかり
思い込んでました。そしたら、Java よりも実装は遅れているけど、PHP もあるという
じゃないですか！！早速帰ってコードを見てみると、、、確かにありました。お作法が
Java っぽいのでアレレな感じですけど、PHP メインの僕にとってはありがたい発見。

## 他にも

* リクルートの方が作ったという Shindig を使った [OpenSocial 対応のドコイク β
  サービス](http://beta.doko.jp/sandbox/)
* [こみゅすけ](http://commusuke.eisbahn.jp/)の Orkut アプリ版
* OpenSocial アプリコーディング環境 CodeRunner (Orkut 上のアプリ)
* Orkut 上に [OpenSocial Japan というコミュニティ](http://sandbox.orkut.com/Community.aspx?cmm=47213793)

などなど、、、子供がうるさいので今日はこの辺で。
