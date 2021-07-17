---
title: OpenSocialのAtomPubはXRDS-Simpleでディスカバリ
author: Eiji
layout: post
SBM_count:
  - '00001<>1271392252<>1<>0<>0<>0<>0'
dsq_thread_id:
  - 2338885
categories:
  - AtomPub
tags:
  - AtomPub
  - OpenSocial
  - Service Document
  - XRDS-Simple
---
<a href="http://code.google.com/apis/opensocial/docs/0.8/restfulspec.html " target="_blank">OpenSocial v0.8のRESTful API仕様</a>では、オートディスカバリに<a href="http://xrds-simple.net/core/1.0/" target="_blank">XRDS-Simple</a>を利用するよう規定されています。

他方、OpenSocial v0.8で利用されるRESTful APIは<a href="http://tools.ietf.org/html/rfc5023" target="_blank">AtomPub</a>形式となっており、AtomPubではService Documentを利用するよう規定されています。

これではコンテナサイトがどちらを使うのか、両方使うべきなのか疑問が残ってしまいます。この件について、<a href="http://groups.google.com/group/opensocial-and-gadgets-spec" target="_blank">Google GroupsのOpenSocialの仕様を検討するグループ</a>に<a href="http://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/a447a1f155f4f06b" target="_blank">質問</a>を投げてみました。

質問

> コンテナサイトはAtomPubのService DocumentとXRDS-Simple、どちらを採用すべきなのでしょうか？両方サポートすべきでしょうか？

David Primmer氏の回答

> AtomPubのService DocumentはURLの一部をテンプレート的に定義して変数を当てはめる用途には向いていない。ある程度固定されたURL上で指定することを想定されているようだ。  
> その点、XRDS-Simpleは空白に値を埋める形でURLをディスカバリできる点で優れている。

この点に関しては、AtomPubのPerlライブラリを実装された<a href="http://teahut.sakura.ne.jp/b/2008-04-09-1.html" target="_blank">たけまるさんも指摘</a>されていて、XRDS-Simpleを利用する方が合理的であるという点では一致しています。

ただ、仕様に適合しないという意味では気持ちの悪いものであることは間違いなく、この点をどこかで解決できないかと考えています。先ほど紹介したGoogle Groupsで「AtomPubの仕様作成者に仕様変更の提案を行う予定はあるか」との質問を投げたのですが、その後応答はありません。

現時点でRod Yatesという方から<a href="http://tools.ietf.org/html/draft-snell-atompub-feature-12" target="_blank">こちらの仕様書</a>から適用できるのではないかとの提案を頂いているので、AtomPub識者の方と相談して何かしらの働きかけを行っていこうと思います。