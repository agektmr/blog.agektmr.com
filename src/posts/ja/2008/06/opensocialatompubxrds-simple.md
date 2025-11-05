---
title: OpenSocial の AtomPub は XRDS-Simple でディスカバリ
layout: post
lang: ja
date: 2008-06-12
tags:
  - AtomPub
  - OpenSocial
  - Service Document
  - XRDS-Simple
---

[OpenSocial v0.8 の RESTful API 仕
様](http://code.google.com/apis/opensocial/docs/0.8/restfulspec.html)では、オー
トディスカバリに [XRDS-Simple](http://xrds-simple.net/core/1.0/) を利用するよう規
定されています。

他方、OpenSocial v0.8 で利用される RESTful API は
[AtomPub](http://tools.ietf.org/html/rfc5023) 形式となっており、AtomPub では
Service Document を利用するよう規定されています。

これではコンテナサイトがどちらを使うのか、両方使うべきなのか疑問が残ってしまいま
す。この件について、[Google Groups の OpenSocial の仕様を検討するグルー
プ](http://groups.google.com/group/opensocial-and-gadgets-spec)に[質
問](http://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/a447a1f155f4f06b)
を投げてみました。

質問

> コンテナサイトは AtomPub の Service Document と XRDS-Simple、どちらを採用すべ
> きなのでしょうか？両方サポートすべきでしょうか？

David Primmer 氏の回答

> AtomPub の Service Document は URL の一部をテンプレート的に定義して変数を当て
> はめる用途には向いていない。ある程度固定された URL 上で指定することを想定されて
> いるようだ。  
> その点、XRDS-Simple は空白に値を埋める形で URL をディスカバリできる点で優れて
> いる。

この点に関しては、AtomPub の Perl ライブラリを実装された[たけまるさんも指
摘](http://teahut.sakura.ne.jp/b/2008-04-09-1.html)されていて、XRDS-Simple を利用
する方が合理的であるという点では一致しています。

ただ、仕様に適合しないという意味では気持ちの悪いものであることは間違いなく、この
点をどこかで解決できないかと考えています。先ほど紹介した Google Groups で「AtomPub
の仕様作成者に仕様変更の提案を行う予定はあるか」との質問を投げたのですが、その後
応答はありません。

現時点で Rod Yates という方から[こちらの仕様
書](http://tools.ietf.org/html/draft-snell-atompub-feature-12)から適用できるので
はないかとの提案を頂いているので、AtomPub 識者の方と相談して何かしらの働きかけを
行っていこうと思います。
