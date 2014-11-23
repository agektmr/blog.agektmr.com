---
title: Google Docsのストレージ化が持つ意味
author: Eiji
layout: post
permalink: /archives/692
SBM_count:
  - '00006<>1271382253<>6<>0<>0<>0<>0'
dsq_thread_id:
  - 58258973
categories:
  - Google
  - SocialWeb
tags:
  - GDrive
  - Google Docs
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/692" callback="wp_plus_one_handler"></g:plusone>
</div>

日本時間で13日未明、SpreadsheetやDocs、Presentationなどのこれまでのフォーマットに加え、あらゆる形式のファイルが無料で1GBまで、1GB/$0.25/年で足せる、実質的なストレージ機能がGoogle Docsに追加されることが<a href="http://googledocs.blogspot.com/2010/01/upload-and-store-your-files-in-cloud.html" target="_blank">発表</a>されました。

今回はクライアントソフトこそ発表されませんでしたが、既に<a href="http://code.google.com/intl/ja/apis/documents/docs/3.0/developers_guide_protocol.html" target="_blank">APIは公開</a>されていますので、Google謹製であれ、他社製であれ、いずれは<a href="http://dropbox.com/" target="_blank">Dropbox</a>ライクの強力なクライアントソフトが各種プラットフォームに登場することは間違いないと思います。楽しみですね。

ところでこのGDriveとも言うべきGoogle Docsストレージ、ソーシャルウェブにとってものすごく重要な意味がありそうです。

## ソーシャルウェブとアクセスコントロール

僕は以前からウェブは<a href="http://japan.cnet.com/special/story/0,2000056049,20406495,00.htm" target="_blank">OSの役割を果す</a>ようになり、ソーシャルウェブはその一躍を担うと主張してきました。ソーシャルウェブに関する持論はいくつかあります。

*   ソーシャルウェブはいずれ、意識する必要がないほど当たり前の存在になる
*   あらゆるサービスで利用できるアイデンティティが必要となる
*   ソーシャルグラフはアイデンティティと紐付けて持ちまわることができるようになる
*   ソーシャルグラフは携帯電話やテレビ、家電製品でも利用可能になる
*   ソーシャルグラフは共有や招待に加え、アクセス管理にも用いられるようになる
*   いずれはファイルシステムもソーシャルグラフを用いたACL機能を持つ

このうち、最後のACLについては、OSレベルの話なのでまだまだ先だとばかり思っていたのですが、、、

## Google Docsの持つACL機能

実は今回のGoogle Docsストレージには、このソーシャルグラフを用いた強力なACL機能が備わっているようです。Google Docsを使っている方はよくご存知と思いますが、それはもともとGoogle Docs自体がアクセス管理機能を持っていたからに他なりません。

[<img title="Google Docs ACL2" src="http://devlog.agektmr.com/wp-content/uploads/2010/01/Google-Docs-ACL2-300x204.png" alt="" width="300" height="204" />][1]

[][1] [][1]Google Docsでは、ファイルを作成すると、基本はプライベート、そこから操作で一般公開、グループへの公開、メールアドレスを指定して共有、などをすることができます。メールアドレスで指定する際はもちろん、Googleが誇るGmailのコンタクトリストというソーシャルグラフからオートコンプリートすることができます。各共有相手ごとに、閲覧・編集のアクセス権を分けることもできます。

この強力なアクセス管理機能が、Google Docsストレージに保存された画像や音楽、映像など、他の種類のファイルにも適用され、自分のローカルフォルダで管理できるとしたらどうでしょう？ファイルは常にクラウドと同期し、アクセス権は世界中のアイデンティティを相手に管理できる世界・・・便利だとは思いませんか？

これぞまさに、ウェブOSの世界だと思うのです。

## まとめ

よくGoogleはSNSを持っていないから、、というような論調を見かけますが、それはあくまでアプリケーションプラットフォームとしての話でしかありません。今回のGoogle Docsストレージを例にとっても、Googleはそれを上回るウェブOSプラットフォームを着々と築き上げつつあるようです。

今後これらのサービスにChrome OSが加わり、GoogleのウェブOSはさらに強力なものになっていくでしょう。いずれFacebookやTwitterも、所詮はGoogleの手のひらの上、という状況になってしまう日が来るかもしれません。

 [1]: http://devlog.agektmr.com/wp-content/uploads/2010/01/Google-Docs-ACL2.png