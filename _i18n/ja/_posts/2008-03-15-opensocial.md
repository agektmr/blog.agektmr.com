---
title: OpenSocialの疑問がひとつ解決した
author: Eiji
layout: post
SBM_count:
  - '00000<>1271351677<>0<>0<>0<>0<>0'
dsq_thread_id:
  - 2818469
categories:
  - OpenSocial
  - Widget
tags:
  - Gadget
  - OpenSocial
  - Orkut
  - Widget
---
**前提：Google Gadgetでurlタイプを指定した場合、iframe内にはリモートサーバーの内容がそのまま表示されるため、Ajaxで友達情報等を取得しようとすると、ドメイン超えが必要となり、プロキシ経由でサーバー間通信となりRESTful APIがないと役に立たない**

どうやらOrkutでは、Content Type=&#8217;url&#8217;を許可していない模様。

<a href="http://groups.google.com/group/opensocial-orkut/browse_thread/thread/f6de89397dc56576/70f57151180b87cb?lnk=gst&q=content+type+url#70f57151180b87cb" target="_blank">MYSQL database connection using PHP for my gadget ? &#8211; Orkut Developer Forum | Google グループ</a>

Content Type=&#8217;url&#8217;を指定すると404が返るらしい。 404が返ること自体はバグとのことですが、Content Type=&#8217;url&#8217;が動くようになったところで、ドメインを超えてOpenSocialを利用するにはプロキシを介したRESTful APIによるアクセスが必須であることは確認できました。これがRESTful APIが正式に登場するまでの暫定措置なのかどうかは未確認ですが、前提は誤っていなかったようです。