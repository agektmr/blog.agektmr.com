---
title: MySpaceのRESTful APIは独自仕様
author: Eiji
layout: post
SBM_count:
  - '00002<>1271373376<>2<>0<>0<>0<>0'
dsq_thread_id:
  - 2435288
categories:
  - OpenSocial
tags:
  - OpenSocial
  - RESTful API
---
去る3月13日、MySpaceでOpenSocialアプリがβ版として一般公開されました。OpenSocial対応SNSとしては、一般公開は一番乗りです。まだOpenSocialの仕様も完全に固まっていない状況で、なぜ？どうやって？

<a href="http://groups.google.com/group/opensocial-container/browse_thread/thread/96761d3ebd53e32c/646c972cddae2d35" target="_blank">OpenSocial Container standard fragmentation &#8211; Implementing OpenSocial Containers | Google グループ</a>

内容を要約すると

> MySpaceのOpenSocial APIは、JavaScriptの拡張もRESTful APIも独自仕様のようです。このままでは、標準仕様よりも、世界最大のSNSが作った仕様に合わせざるを得なくなるのではないでしょうか？

という投げかけに対し、これはOfficeのXML標準仕様問題だとか、ブラウザの標準仕様問題だとかって議論になってますが、21日の時点で、hi5の開発者の方から下記の通り返信が。

> 我々はこの問題について認識しており、解決したいと思っています。来週話し合いが持たれることになりましたが、この話し合いはMySpaceから提案されたものであり、 彼らもこの問題は認識しているはずです。我々もテンプレートシステムやプレゼンス等の提案を用意しています。

とのこと。

OpenSocialの仕様を固める主体は、どうやらGoogleだけではなく、hi5やMySpace, Ning等、Facebook以外の米国の主要SNSの開発者が集まり、提案を出し合って決めている模様。

> 
バージョン0.7で(少なくともJavaScript APIは)ある程度落ち着いたという認識でいましたが、まだまだ変化がありそう。

(自分も含めて) 日本の開発者からも提案していった方がよいかもしれませんね。