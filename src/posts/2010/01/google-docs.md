---
title: Google Docs のストレージ化が持つ意味
layout: post
date: 2010-01-14
tags:
  - GDrive
  - Google Docs
  - SocialWeb
---

<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/692" callback="wp_plus_one_handler"></g:plusone>
</div>

日本時間で 13 日未明、Spreadsheet や Docs、Presentation などのこれまでのフォーマットに加え、あらゆる形式のファイルが無料で 1GB まで、1GB/$0.25/年で足せる、実質的なストレージ機能が Google Docs に追加されることが[発表](http://googledocs.blogspot.com/2010/01/upload-and-store-your-files-in-cloud.html)されました。

今回はクライアントソフトこそ発表されませんでしたが、既に [API は公開](http://code.google.com/intl/ja/apis/documents/docs/3.0/developers_guide_protocol.html)されていますので、Google 謹製であれ、他社製であれ、いずれは [Dropbox](http://dropbox.com/) ライクの強力なクライアントソフトが各種プラットフォームに登場することは間違いないと思います。楽しみですね。

ところでこの GDrive とも言うべき Google Docs ストレージ、ソーシャルウェブにとってものすごく重要な意味がありそうです。

## ソーシャルウェブとアクセスコントロール

僕は以前からウェブは [OS の役割を果す](http://japan.cnet.com/special/story/0,2000056049,20406495,00.htm)ようになり、ソーシャルウェブはその一躍を担うと主張してきました。ソーシャルウェブに関する持論はいくつかあります。

* ソーシャルウェブはいずれ、意識する必要がないほど当たり前の存在になる
* あらゆるサービスで利用できるアイデンティティが必要となる
* ソーシャルグラフはアイデンティティと紐付けて持ちまわることができるようになる
* ソーシャルグラフは携帯電話やテレビ、家電製品でも利用可能になる
* ソーシャルグラフは共有や招待に加え、アクセス管理にも用いられるようになる
* いずれはファイルシステムもソーシャルグラフを用いた ACL 機能を持つ

このうち、最後の ACL については、OS レベルの話なのでまだまだ先だとばかり思っていたのですが、、、

## Google Docs の持つ ACL 機能

実は今回の Google Docs ストレージには、このソーシャルグラフを用いた強力な ACL 機能が備わっているようです。Google Docs を使っている方はよくご存知と思いますが、それはもともと Google Docs 自体がアクセス管理機能を持っていたからに他なりません。

![Google Docs ACL2](/images/2010/01/Google-Docs-ACL2.png)

Google Docs では、ファイルを作成すると、基本はプライベート、そこから操作で一般公開、グループへの公開、メールアドレスを指定して共有、などをすることができます。メールアドレスで指定する際はもちろん、Google が誇る Gmail のコンタクトリストというソーシャルグラフからオートコンプリートすることができます。各共有相手ごとに、閲覧・編集のアクセス権を分けることもできます。

この強力なアクセス管理機能が、Google Docs ストレージに保存された画像や音楽、映像など、他の種類のファイルにも適用され、自分のローカルフォルダで管理できるとしたらどうでしょう？ファイルは常にクラウドと同期し、アクセス権は世界中のアイデンティティを相手に管理できる世界・・・便利だとは思いませんか？

これぞまさに、ウェブ OS の世界だと思うのです。

## まとめ

よく Google は SNS を持っていないから、、というような論調を見かけますが、それはあくまでアプリケーションプラットフォームとしての話でしかありません。今回の Google Docs ストレージを例にとっても、Google はそれを上回るウェブ OS プラットフォームを着々と築き上げつつあるようです。

今後これらのサービスに Chrome OS が加わり、Google のウェブ OS はさらに強力なものになっていくでしょう。いずれ Facebook や Twitter も、所詮は Google の手のひらの上、という状況になってしまう日が来るかもしれません。
