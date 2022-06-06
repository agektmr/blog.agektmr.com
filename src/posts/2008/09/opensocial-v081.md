---
title: OpenSocial v0.8.1 が公開
layout: post
date: 2008-09-28
tags:
- OpenSocial
---
OpenSocial v0.8.1 仕様が公開されました。

* [OpenSocial Specification – Implementation Version 0.8.1](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081)([翻訳](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FOpenSocial%20API仕様%20%28v0.8.1%29))
* [OpenSocial RESTful Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/restful-protocol)([翻訳](http://devlog.agektmr.com/wiki/index.php?cmd=read&page=OpenSocial%2FResultful%20Protocol))
* [OpenSocial RPC Protocol](http://www.opensocial.org/Technical-Resources/opensocial-spec-v081/rpc-protocol)(未翻訳)

※ 翻訳については一部ベータ版からの修正内容が反映されていない箇所があります。誤り
を見つけた際はご指摘ください。

[リリースノート](http://www.opensocial.org/Technical-Resources/opensocial-release-notes)は下記の通り:

### OpenSocial リリースノート

**OpenSocial の仕様変更点**

* **サーバーサイド API の変更** サーバー間通信機能に、よりシンプルなバッチ処理を可
  能とする JSON RPC プロトコルが追加されました。名前の一貫性を保つため、RESTful
  API は今後 RESTful プロトコルと呼ばれます。
* **OpenSocial ID で許可する文字に `-`, `_`, `.` を追加** OpenSocial ID は従来の
  英数字に加え、`-`, `_`, および`.`を含むことができます。
* **Portable Contacts 仕様にアライン**

**互換性のない変更点**

* **RESTful プロトコルの非互換性** RESTful プロトコルから多くのクエリやレスポン
  スフィールドが名称変更/削除されました。RESTful プロトコルの変更点全てを下記に
  示します。

**RESTful プロトコルの変更点**

* **PortableContacts との互換性** RESTful プロトコルを実装することで、コンテナは
  [PortableContacts 仕様](http://portablecontacts.net/)と技術的互換性を持つこと
  になります。下記の変更点はこの互換性実現のために実装されました。
* **新しいレスポンス型 `format=xml`** リクエストが `format=xml` パラメータをサ
  ポートするようになりました。People のリクエストは `format=xml` か`format=json`
  で行われなければなりません。
* **コンテナはランダムアクセスなページングを実装しなければならない** コンテナは
  `startIndex` と `itemsPerPage` パラメータを使ったページングの実装が必須となり
  ました。
* **コレクションのフィールドから `rel=next` リンクが廃止** このパラメータは JSON コ
  レクションレスポンスから削除されました
* **コレクションのフィールドから author が廃止** このパラメータは JSON コレクショ
  ンレスポンスから削除されました
* **コンテナは全てのコンタクトを一度に返せなければならない** コンテナは一度のリ
  クエストで全てのコンタクトを返すことができなければなりませんが、パフォーマンス
  上の理由から返すコンタクトの数に上限を設けることができます。
* **`itemsPerPage` のデフォルト値** `itemsPerPage` パラメータがリクエストで指定
  されていない場合のデフォルト値はコンテナに依存します。
* **ソートパラメータの変更点** `orderBy` パラメータは sortBy に名称変更されまし
  た。また、`sortOrder` パラメータが追加され、`ascending` (昇順) と `descending`
  (降順) を与えることができます。デフォルトは `ascending` です。
* **`updatedSince` パラメータの追加** クエリで、指定された期間内に更新されたエン
  トリのみを返すよう指定することができます。
* **ソートおよびフィルタリングが行われたかをレスポンスに表示** ソートやフィルタ
  リングはコンテナにとってコストが高いため、実際にリクエストと同じ内容のフィルタ
  リングが行われたかを示す、トップレベルのレスポンスフィールド `filtered`,
  `sorted`, `updatedSince` がレスポンスに含まれるようになりました
* **削除された `Person` オブジェクトのリクエストが可能に** 新しく追加された
  `@deleted` セレクタと `updatedSince` パラメータを利用することで、指定された日
  時以降に削除されたコンタクトの取得が可能になりました。
* **`Person` レスポンスは最低でも `id` と `name` フィールドを含まなければならな
  い** コンテナは `name` および `id` フィールドを  `Person`  データに含まなけれ
  ばなりません。
* **`profileUrl` は URL でもなければならない**  `Person`  の `profileUrl` フィー
  ルドで返される値は `type` が `profile` のエントリの `urls` フィールドでも返さ
  れなければなりません。
* **`Person` に `photos` フィールド追加**  `Person`  に `url`, `type`, `primary`
  サブフィールドを持ったエントリのリストを含む、`photos` フィールドが追加されま
  した。 `Person`  オブジェクトで `thumbnailUrl` フィールドが返された場合、この
  `url` は `type` が `thumbnail` であるエントリの `photos` フィールドにも存在し
  なければなりません。
* **`Person` に `ims` フィールド追加** `Person` に `value`, `type`, `primary` の
  サブフィールドを持った `ims` フィールドが追加されました。`type` 値としてよく使
  用される`aim`, `gtalk`, `icq`, `xmpp`, `msn`, `skype`, `qq`, `yahoo`が定義され
  ていますが、新しい `type` を定義することもできます。
* **`Person` に `accounts` フィールド追加** `Person` にその人がアカウントを所有
  する他のサービスを表す  `accounts` フィールドが追加されました。このフィールド
  は`domain`, `userid`, `username`, `primary` サブフィールドを持ったエントリのリ
  ストを含みます。
* **`Person` の複数フィールドに `primary` サブフィールド追加**  `Person`  の
  `emails`, `urls`, `ims`, `phoneNumbers`, `addresses`, `organizations`,
  `photos` フィールドに、リスト中どのフィールドが主たるものか (存在する場合のみ)
  を示す `primary` サブフィールドが追加されました。
* **`jobs` および `schools` の複数フィールドを `organizations` に統合** `jobs`お
  よび `schools` のエントリは `organizations` という名前の `Organization` 構造の
  配列にまとめられました。`Organization` 構造は`job`、`school`を正規値とする
  `type`サブフィールドで拡張されます。
* **`Person` の複数フィールドを `value` フィールドに標準化**  `Person`  の複数
  フィールドで主となるテキスト値は `value` というサブフィールドに保存されるべき
  です。これは `emails.address`, `phoneNumbers.number`, `urls.address` およびす
  べての `{Enum}.key` フィールドのインスタンスを `{Enum}.value` に名称変更するこ
  とが必要となります。`addresses`, `accounts`, `organizations` フィールドは複雑
  なため、`value` フィールドのコンセプトが存在しません。ソートやフィルタリングを
  行うため、これらのフィールドの "主たる" サブフィールドに該当する部分は、
  `addresses.formatted`, `accounts.domain`, `organizations.name` となります。
* **`Person` `gender` フィールドは文字列に**  `Person`  では `gender` を文字列
  フィールドとして扱い、`male`および`female`を正規値とします。
* **`Addresses` から `extendedAddress` または `poBox` サブフィールドが廃止**
  `streetAddress` サブフィールドに完全な (複数行の場合もある) 住所を保存すること
  ができるようになったため、`Address` サブフィールドの `extendedAddress` および
  `poBox` が廃止されました。
* **`unstructuredAddress` を `formatted` に変更** `Address` の
  `unstructuredAddress` サブフィールドは `formatted` に名称変更されました。
* **`dateOfBirth` を `birthday` に変更**  `Person`  の `dateOfBirth` フィールド
  は`birthday` に名称変更されました。
* **timeZone を utcOffset に変更**  `Person`  の `timeZone` フィールドは
  `utcOffset` に名称変更されました。
* **`nickname` の定義**  `Person`  の `nickname` フィールドは "現実世界でこの人
  物を指すくだけた方法" と定義されました。
* ** `Person` フィールドのデフォルトセット**  `Person`  リクエストでクエリパラ
  メータ `fields` がない場合、JS API のデフォルトと一致させるため、最小限必要と
  されるデフォルトセットとして `id`, `name`, `thumbnailUrl` が定義されました。
* **supportedFields のクエリ** RESTful プロトコルにコンテナがサポートする
  `Person`  および `Activity` フィールドをリストで返す `/people/@supportedFields
  および/activities/@supportedFields` というエンドポイントが定義されました。
* **`indexBy` の廃止** `indexBy` クエリパラメータは廃止されました。
* **`Activity.title` フィールドは HTML 文字列に **`Activity` タイトルフィールド
  は複雑なデータオブジェクトではなく、HTML マークアップを含む文字列として扱われ
  るようになります。
* **`unstructured` を `formatted` に変更** 名前フィールドの `unstructured` は
  `formatted` に変更されました。 
* **`displayName` フィールドを追加**  `Person`  フィールドのトップレベルフールド
  として `displayName` が追加されました。

**RPC プロトコルの変更点**

* **RPC プロトコルが登場** バッチ処理や複雑なサーバー間処理を簡易化するためのオ
  プションとして、新しく RPC プロトコルが登場しました。

**`opensocial.*` JavaScript の変更点**

* **新しい `opensocial.IdSpec.GroupId` enum** `IdSpec` オブジェクトを構成するた
  め、`opensocial.IdSpec.GroupId.FRIENDS` または
  `opensocial.IdSpec.GroupId.SELF` を使用することができます。
* **`supportsField` のレスポンスを定義**
  `opensocial.Environment.supportsField()` の戻り値として、コンテナがフィールド
  をサポートする場合は `true`、そうでない場合は `false` を返すことが定義されまし
  た。

**`gadgets.*` JavaScript の変更点**

* `gadgets.*` JavaScript API に変更点はありません。

**Gadgets XML の変更点**

* **`<Preload>`要素で OAuth をサポート** `<Preload>` 要素の `authz `属性で `oauth`
  値がサポートされるようになりました。` authz` が `oauth` の場合、
  `oauth_service_name`, `oauth_token_name`, `oauth_request_token`,
  `oauth_request_token_secret` 属性が取得されます。これらの属性は
  `gadgets.io.makeRequest` パラメータに一致するものと同様の意味とデフォルト値を
  持ちます。
