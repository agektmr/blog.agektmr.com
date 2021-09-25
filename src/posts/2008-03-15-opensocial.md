---
title: OpenSocial の疑問がひとつ解決した
layout: post
date: 2008-03-15
tags:
  - Gadget
  - OpenSocial
  - Orkut
  - Widget
---

**前提：Google Gadget で url タイプを指定した場合、iframe 内にはリモートサーバー
の内容がそのまま表示されるため、Ajax で友達情報等を取得しようとすると、ドメイン
超えが必要となり、プロキシ経由でサーバー間通信となり RESTful API がないと役に立
たない**

どうやら Orkut では、`Content Type="url"` を許可していない模様。

[MYSQL database connection using PHP for my gadget ? &#8211; Orkut Developer
Forum | Google グルー
プ](http://groups.google.com/group/opensocial-orkut/browse_thread/thread/f6de89397dc56576/70f57151180b87cb?lnk=gst&q=content+type+url#70f57151180b87cb)

`Content Type="url"` を指定すると 404 が返るらしい。 404 が返ること自体はバグと
のことですが、`Content Type="url"` が動くようになったところで、ドメインを超えて
OpenSocial を利用するにはプロキシを介した RESTful API によるアクセスが必須である
ことは確認できました。これが RESTful API が正式に登場するまでの暫定措置なのかど
うかは未確認ですが、前提は誤っていなかったようです。
