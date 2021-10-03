---
title: ガジェットのレンダリング速度を向上するPreload
layout: post
date: 2009-06-17
categories:
  - OpenSocial
---
今回は OpenSocial でネット上にあまり情報のない Preload について、解説してみま
す。

## ガジェットレンダリングの流れ

単純に RSS を表示するガジェットを例に説明します。あるコンテナ SNS 上でこのガ
ジェットを表示する場合、下記のような手順を踏みます。

1.  コンテナ SNS のレンダリング
2.  ガジェットサーバーがガジェットをレンダリング
3.  ブラウザ上でガジェットの JavaScript が初期化
4.  外部サイトの RSS を取得するための Ajax リクエストをガジェットサーバーに送信
5.  ガジェットサーバーが外部サーバーにリクエストを送信(キャッシュがあればスキップ)
6.  ガジェットサーバーはレスポンスをブラウザに戻す
7.  ブラウザ上でガジェットの JavaScript がレスポンス内容を元に記事一覧をレンダリ
    ング

![rendering without
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgoAGA0tPgASBzogcmVuZGVyaW5nIGcAQgUKbm90ZSBvdmVyADUIOiBKUyBpbml0KCkKAEkHLT4AZw06IHJlcXVlc3QgZXh0ZXJuYWwgY29udGVudAphY3RpdmF0ZSAAgRgNAH4QAIFRDQBECgA0EQCBeQ0KAIIHDS0AgQETc3BvbnNlAIEDCWRlADIXAIICGgA7BwCBRhEAQAsAgUsOAIIrEwCCWQk&s=napkin)

ざっとこんな感じになります。

OpenSocial コンテナの動きを理解していない人には若干分かりづらいかもしれません。
[この辺りの記事](http://devlog.agektmr.com/archives/363)を参考にしてください。

さて、この一連の動きを効率化することで、全体の体感レンダリング速度を速くする方法
があります。それが今回ご紹介する Preload です。

## ガジェットのレンダリングを高速化する Preload

Preload は文字通り、レンダリングに先立ってロードしておいてくれる機能です。使い方
は簡単で、/Module/ModulePrefs/Preload@href に呼び出したい URL を記述します。これ
で、先ほどのレンダリングの挙動が下記のように変わります。

1.  コンテナ SNS のレンダリング
2.  ガジェットサーバーが Preload で指定された外部サーバーにリクエストを送信
    (キャッシュがあればスキップ)
3.  ガジェットサーバーがガジェットをレンダリング
4.  ブラウザ上でガジェットが JavaScript を初期化
5.  外部サイトの RSS を取得するための Ajax リクエストをブラウザ上で処理
6.  ブラウザ上でガジェットの JavaScript がレスポンス内容を元に記事一覧をレンダリング

![rendering with
preload](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=cGFydGljaXBhbnQgIlJlbW90ZSBTZXJ2ZXIiCgAPDUdhZGdldAAHFUJyb3dzZXIKCgAXDS0-AEINOiByZXF1ZXN0IGNvbnRlbnQKYWN0aXZhdGUgAGoNCgB4DS0tPgBsDTogcmVzcG9uc2UAPglkZQAyFwCAfw8AgR8HOiByZW5kZXJpbmcgZwCBTwUKbm90ZSBvdmVyAIFCCDogSlMgaW5pdCgpCgCBVgcANQtwcmVsb2FkZWQAJRQAVAkK&s=napkin)

図にしてみると一目瞭然ですが、通信部分のオーバーヘッドを削減できています。こりゃ便利。

仕組みは単純で、ガジェットがプリフェッチした外部コンテンツを埋め込んだソースコー
ドをブラウザに渡し、makeRequest 時にプリフェッチした内容が存在すれば実際の Ajax
リクエストを行わずに応答を返してしまう、というものです。

## Preload 利用時の注意点

Preload はとても便利な反面、扱いにくい性質のものでもあります。以下を理解して、ポ
イントを絞って使う必要があります。

### キャッシュの有効期限をコントロールできない

結構致命的なのがこれです。キャッシュの有効期限をコントロールできないと、デフォル
ト(24 時間が多い)のキャッシュ期限が適用されます。これを回避できるケースとして
は、ユーザーが任意の動作で makeRequest を行うため、その時にキャッシュの有効期限
をクリアできる場合が挙げられます。逆に言うと、RSS を表示するだけでユーザーは任意
に更新できない、でも更新頻度は 1 時間程度、というようなガジェットには向いていま
せん。

### ContentType を指定できない

通常 makeRequest を行う場合、ContentType を DOM, FEED, JSON, TEXT から選択するこ
とが出来ます。特に FEED に関しては、RSS/RDF/Atom を丸めて Json で返してくれるた
め、慣れた人には便利な形式です,

しかしこの挙動は、明示的に ContentType として FEED を指定し、ガジェットサーバー
が外部コンテンツを取得した際に特別な処理を行うことで実現されているため、
ContentType を指定できない Preload では、これを行うことはできません。RSS 等を
Preload したい場合は、DOM を選択してパースするしかありません。

### UserPrefs の内容を反映することが出来る

/Module/ModulePrefs/Preload@href の内容に `__UP_****__` といった形で UserPrefs
の内容を含めることができます。これは残念ながら mixi アプリでは使えない技ですね。

```xml
<Preload href="http://example.com/example.php?id=__UP_userpref__" >
```

### Signed Request が使える

`/Module/ModulePrefs/Preload@authz` に "signed" を指定することで、署名リクエストが
行えます。これの利点は、ガジェット側でビューアーの ID を指定しなくても、サーバー
が署名と一緒に送ってくれるため、上記の UserPrefs のケースのように、URL を工夫す
る必要がない点です。

### コードを変える必要はない

Preload はガジェット XML にメタデータを追加するだけですので、基本的に JavaScript
のコードをいじる必要はありません。もちろん、キャッシュを気にしたりするといじった
方がよい場合もありますけどね。

### Preload はいくつでも指定できる

実は Preload はいくつでも指定できます。これまでに挙げた条件をクリアしているので
あれば、思い切って使ってみましょう。

## まとめ

今回は存在が地味なのであまり注目されていないけど、うまく使えば非常に便利な
Preload 機能を紹介しました。うまいこと使いこなして、一流 OpenSocialer を目指しま
しょう。
