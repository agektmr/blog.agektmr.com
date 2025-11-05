---
title: OpenSocial(Shindig)のサーバーアーキテクチャ
author: Eiji
layout: post
lang: ja
date: 2009-01-12
categories:
  - OpenSocial
tags:
  - Shindig
---
OpenSocialと関わるには

*   コンテナになる
*   ガジェットを開発する
*   RESTを使ったクライアントサービスを作る

といった選択肢が考えられますが、そのいずれを選択するにしても、アーキテクチャについて知っておくことはとても重要です。特にガジェットを開発するに当たっては、アーキテクチャを知っていることでより開発しやすい場面が多々あります。

そこで今回は、OpenSocialに対応するコンテナのほとんどで利用されているオープンソースのリファレンス実装、<a href="http://incubator.apache.org/shindig/" target="_blank">Shindig</a>のアーキテクチャについて解説したいと思います。

## ガジェットとSNSの関係

iGoogle(既にShindigが利用されている)ではどうやって第三者の作ったガジェットを表示しているかご存知でしたか？実は、別ドメイン(iGoogleならgmodules.com)上にレンダリングしたガジェットを、iframe内に表示しているのです。

理由は、同ドメイン上に第三者の書いたJavaScriptを置くことは、セキュリティ上危険だからです。詳しくは以前[Cajaについて解説した記事][1]がありますので、そちらをご覧ください。

![OpenSocial Gadget Rendering][2]

## APIはどこにあるか

OpenSocialにはPeople, Group, Activity, Persistentの4つのソーシャルなAPIが用意されていますが、それぞれRESTfulによるJSON, XML, AtomPub形式と、RPCによるJSON形式が用意されています。ShindigのJavaScript APIでは、この中でもRPCによるJSON形式が使用されています。

先ほど2つのドメインについて説明しましたが、JavaScriptのAPIということはAjaxなので、当然同じドメインということで、エンドポイントはShindigのドメイン上に存在します。

![OpenSocial Server Architecture][3]

## ガジェット表示の流れ

基本的な構造が分かったところで、実際にガジェットを表示するまでの流れを見てみましょう。

### どのガジェットを表示するのか

ガジェットを表示するためには、まずガジェットを表示したいというユーザーの意思が必要です。これはiGoogleであれば、ガジェットディレクトリから好きなガジェットを選び、自分のページを表示する、というサービス側での作業によって行われます。表示したいガジェットが分かったところで、サービス側もガジェットを表示するためのiframeを表示する必要があるため、ガジェットに関する情報を収集します。これはShindigのmetadata APIを使って行われます。

### metadataの取得

metadata APIのリクエストを取得したShindigは、キャッシュを参照します。キャッシュにガジェットの情報が残っていない場合は、サービスからのリクエストに基づいてガジェットXMLを取得し、解析します。

### iframeのレンダリング

ガジェットに関する情報を取得したサービスは、ガジェットを表示するためiframeをレンダリングします。これにより、iframe内にガジェットを表示するためのリクエストがブラウザからShindigに投げられます。

基本的にガジェットXMLに記述されたContentsの内容はそのまま表示されますが：

*   指定されたガジェットのfeature(tabやminimessageなど、ガジェットが持つ機能セット)のJavaScriptがHTMLに追記される。
*   設定によってはJavaScript、CSS、画像などのあらゆる外部コンテンツがShindig上にキャッシュして呼び出される。

という点は覚えておいて損はないでしょう。

これでガジェットの表示は完了です。Firebugなどを使ってAPIを試してみれば、Shindigにリクエストが飛んでいることが分かると思います。

## 外部サーバーを使うAPI

外部サーバーを使う際、JavaScript APIとしてgadgets.io.makeRequestが使用されます。コンテンツタイプとしてFEEDを選択すると、RSSやRDF、Atomを共通のフォーマットで返してくれたり、JSONを選択すると、データが返ってきた時点ですぐにJSONオブジェクトとして扱えるようになっています。

また、セキュリティ面でもいくつかの選択肢が用意されています。

*   通常のリクエスト
*   Signed Request
*   OAuth

通常のリクエストは、特に認証等のかかっていないAPIに対して行われるものです。Signed Requestとは、<a target="_blank" href="http://oauth.googlecode.com/svn/spec/ext/consumer_request/1.0/drafts/1/spec.htm">OAuth Consumer Request</a>を指しており、これを利用することで、外部サーバーはガジェットからのリクエストのみを扱うことができるようになります。OAuthは<a target="_blank" href="http://oauth.net/core/1.0/">OAuth Core</a>を指しており、外部サーバーはガジェットからのリクエストであることだけでなく、誰からのリクエストなのかをセキュアなクレデンシャルで認証した上で扱うことができるようになります。

OAuthについては[この辺り][4]か[この辺り][5]を参考にしてください。

ここで注意しなければならないのが、すべてShindigのproxyを介して行われるということです。先ほど書いた通り、ここでもGETリクエストには強力なキャッシュ機能が利用されるため、若干注意が必要な場合があります。キャッシュについては次回以降まとめて記事にしたいと思います。

 [1]: /2008/04/caja.html
 [2]: /images/2009/01/e38394e382afe38381e383a3-6.png
 [3]: /images/2009/01/e38394e382afe38381e383a3-7.png
 [4]: http://devlog.agektmr.com/archives/79
 [5]: http://devlog.agektmr.com/archives/174