---           
layout: post
title: HTML を Markdown としてペーストできる MarkdownPastr
date: 2014-02-21
updated: 2014-02-21
tags:
- Chrome Extension
- Markdown
- MarkdownPastr
---

Test を書く練習ついでにバージョンアップしたのでご紹介。クリップボードにコピーし
たリッチテキストを Markdown としてペーストできる Chrome
Extension: [MarkdownPastr](https://chrome.google.com/webstore/detail/markdown-pastr/pjeclabeidkcjhopjbgpiimlaccpdkgk)
の新バージョンを公開しました。   

<!-- excerpt -->
  
開発者の方ならご存知とは思いますが、
[Markdown](http://ja.wikipedia.org/wiki/Markdown) は最近人気のある Wiki 的記法で
す。[GitHub](https://github.com/) での採用で、爆発的に人気が出ました。プレインテ
キストとして見てもそれなりに把握しやすいということも、普及の理由のひとつと思われ
ます。最近では [Jekyll](http://jekyllrb.com/) などを使ってブログを Markdown で書
く人も出てきました。   
  
そんな Markdown ですが、個人的に Google Docs で書いたテーブルを含む文章を
Markdown 化したいケースが結構あり、そんな時に不便な思いをしていました。そこで
作ったのが MarkdownPastr です。使い方は単純で、Markdown 化したい HTML をウェブ
ページ上でコピー、`textarea` にペーストで貼り付けるだけ。  

これが   

[![](http://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)](http://2.bp.blogspot.com/-TDy5N6O4yqI/UwdpgWIeIJI/AAAAAAAAoTI/vKeRUpKXlWM/s1600/copy.png)

こうなります。   

[![](http://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)](http://4.bp.blogspot.com/-TeRARHGfTqY/UwdpgU21WII/AAAAAAAAoTU/QJQ2CZ3JKZk/s1600/paste.png)

Google Docs の場合、Courier New フォントで記述した部分が `code` として認識されま
す。また、行が丸々 Courier New フォントの場合はコードブロックとして認識されま
す。   

Markdown ではなくシンプルテキストでペーストしたい場合は、`Shift` キーを押しなが
らペーストすれば OK。ウェブページ上で `textarea` にペーストをしない限りプロセス
は止まってますので、余計なリソースを食わないところもポイントです (新しい Chrome
Extension ではこれが推奨される動作です)。   

ちなみに、個人的におすすめの Markdown 記述環境は   

* [wri.pe](https://wri.pe/) (by [@masuidrive](https://twitter.com/masuidrive))
* [Gists](https://gist.github.com/)
* [Online Markdown Editor](http://www.ctrlshift.net/project/markdowneditor/)
* [Gitter](http://gitter.im/)

辺りです。   

コードは [GitHub で公開](https://github.com/agektmr/MarkdownPastr)しています。一
般的なフィードバックは[こち
ら](https://chrome.google.com/webstore/support/pjeclabeidkcjhopjbgpiimlaccpdkgk)
へどうぞ。  

ぜひお試し下さい。
