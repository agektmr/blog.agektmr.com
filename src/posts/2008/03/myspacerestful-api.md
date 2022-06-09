---
title: MySpace の RESTful API は独自仕様
layout: post
date: 2008-03-23
tags:
  - OpenSocial
  - RESTful API
---

去る 3 月 13 日、MySpace で OpenSocial アプリがβ版として一般公開されました。OpenSocial 対応 SNS としては、一般公開は一番乗りです。まだ OpenSocial の仕様も完全に固まっていない状況で、なぜ？どうやって？

[OpenSocial Container standard fragmentation &#8211; Implementing OpenSocial Containers | Google グループ](https://groups.google.com/group/opensocial-container/browse_thread/thread/96761d3ebd53e32c/646c972cddae2d35)

内容を要約すると

> MySpace の OpenSocial API は、JavaScript の拡張も RESTful API も独自仕様のようで
> す。このままでは、標準仕様よりも、世界最大の SNS が作った仕様に合わせざるを得
> なくなるのではないでしょうか？

という投げかけに対し、これは Office の XML 標準仕様問題だとか、ブラウザの標準仕様問題だとかって議論になってますが、21 日の時点で、hi5 の開発者の方から下記の通り返信が。

> 我々はこの問題について認識しており、解決したいと思っています。来週話し合いが持
> たれることになりましたが、この話し合いは MySpace から提案されたものであり、 彼
> らもこの問題は認識しているはずです。我々もテンプレートシステムやプレゼンス等の
> 提案を用意しています。

とのこと。

OpenSocial の仕様を固める主体は、どうやら Google だけではなく、hi5 や MySpace, Ning 等、Facebook 以外の米国の主要 SNS の開発者が集まり、提案を出し合って決めている模様。

> バージョン 0.7 で (少なくとも JavaScript API は) ある程度落ち着いたという認識
> でいましたが、まだまだ変化がありそう。

(自分も含めて) 日本の開発者からも提案していった方がよいかもしれませんね。
