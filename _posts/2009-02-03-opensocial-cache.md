---
title: OpenSocialガジェット開発で注意すべきキャッシュ機能
author: Eiji
layout: post
permalink: /archives/396
disable_wpautop:
  - 1
disable_wptexturize:
  - 1
disable_convert_chars:
  - 1
disable_convert_smilies:
  - 1
SBM_count:
  - '00010<>1271357926<>8<>0<>2<>0<>0'
dsq_thread_id:
  - 10989212
categories:
  - OpenSocial
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/396" callback="wp_plus_one_handler"></g:plusone>
</div>

先日の記事でShindigが持つOpenSocialアーキテクチャの強力なキャッシュ機能について触れました。Shindigには大きく4種類のキャッシュが存在しています。

*   ガジェットXMLのキャッシュ
*   makeRequestでアクセスされる外部APIのキャッシュ
*   featureを固めたJavaScriptのキャッシュ
*   JavaScript、CSS、imgなどHTMLからリンクされたリソースのキャッシュ

## ガジェットXMLのキャッシュ

OpenSocialガジェットを開発し始めて最初につまずくのがこのガジェットXMLのキャッシュでしょう。ガジェットXML上で変更を行っても、それが実際のガジェット表示上に反映されない場合は、まずガジェットXMLがキャッシュされていることを疑いましょう。

ガジェットXML上でJavaScriptコードを修正しつつサンドボックス環境で動作確認しながら開発したい場合は、URLのquery部分にnocache=1を加えることで、キャッシュが無効化されます。これで開発がだいぶ楽になるはずです。(コンテナによってはURLの末尾が途中からhash(#以降)になっている場合があるので、気をつけてください。)

なお、iGoogleのサンドボックスでは<a target="_blank" href="http://www.google.com/ig/directory?hl=en&#038;type=gadgets&#038;url=www.google.com/ig/modules/developer.xml">My Gadgets</a>でキャッシュを無効にできたり、hi5ではサンドボックスなら特に何もしなくてもキャッシュが無効だったりといった特徴もあります。

## makeRequestでアクセスされる外部APIのキャッシュ

makeRequestを使って外部のリソースにGETでアクセスした場合、これもキャッシュされます。例えばRSSを取得するような場合、更新頻度の低いものであれば相手方サーバーの負荷を少しでも軽減することができます。

これを回避したい場合は、makeRequestのopt\_paramsにgadgets.io.ProxyUrlRequestParamters.REFRESH\_INTERVALというパラメータを追加し、0に設定してください。これで、キャッシュされなくなります。

## featureを固めたJavaScriptのキャッシュ

OpenSocialでは、ガジェットXMLにRequire@featureを加えることで、様々な機能が利用できるという仕様があります。このfeatureは、ガジェット内に表示されるHTMLにJavaScriptを追加することで機能を実現していますが、Shindigではここでも軽量化/効率化を図っています。featureのJavaScriptは、レンダリング時に難読化した上で全てをひとつに繋げて、キャッシュされます。

一般ユーザー/ガジェットディベロッパーがこれを意識する必要はほぼありませんが、頭の片隅にいれておきましょう。

## JavaScript、CSS、imgなどHTMLからリンクされたリソースのキャッシュ

コンテナによっては(orkut, iGoogle, hi5等、今のところJava版のShindigを使っているサービス)、ガジェットXML内で指定された外部のJavaScript、CSS、imgが、レンダリング時にキャッシュされます。レンダリングされたガジェットのHTMLを見ると、キャッシュされた外部リソースのURLのpath部分の最後にconcatが付いていることから、キャッシュされていることが分かると思います。

この機能はContent Rewriteと呼ばれるのですが、OpenSocialバージョン0.9からは正式な機能として取り込まれますが、現段階ではShindig Java版独自の機能です。0.9では、ガジェットXMLの設定でどのファイルタイプをリライトするのか、JavaScriptなら圧縮するか、キャッシュする場合の有効期限はどれくらいか、などを指定できるようになります。

さて、このキャッシュは実運用時に各ファイルの置かれているサーバーの負荷を軽くすることが目的ですが、開発時にはコードの修正が即座に反映されず、効率を下げてしまうこともあるでしょう。これを回避するには、下記をXMLに追加します。

<pre class="brush: xml; title: ; notranslate" title="">&lt;optional feature="content-rewrite&gt;
  &lt;param name="include-tabs" /&gt;
&lt;/optional&gt;
</pre>

コンテナによってはサポートしない場合がありますので注意してください。

ところで、PHP版 Shindigの場合はこの機能がありません。つまり、もしガジェットが例えば、あなたのサーバーに用意したファイルを指しているとしたら、ガジェットのレンダリングの度にリクエストが発生するため、開発には便利な反面、本番環境で大量にアクセスが来た場合サーバーに負荷がかかってしまいます。これを回避するため、キャッシュ機能をうまく利用する、というテクニックもあります。

http://opensocial-container/gadgets/proxy?url=http://devlog.agektmr.com/image.gifのように、ドメインに&#8221;/gadgets/proxy?url=&#8221;を付けて、意図的にShindigのプロキシを入れてしまいましょう。(concatと異なり、難読化や圧縮はされません。)

### 追記(2009/2/3)

上記に関して、コメント欄でmainyaさんから、getProxyUrlを使ったやり方を教えていただきました。

<pre class="brush: jscript; title: ; notranslate" title="">var params = {'REFRESH_INTERVAL' : 3600*24*7};
var url = 'http://example.com/img/logo.jpg';
try{
  url = gadgets.io.getProxyUrl(url, params);
}catch(e){}
</pre>

このやり方でURLを取得すれば、コンテナに依存しない方法でキャッシュを意図的に効かせた参照を行うことができるようになります。(MySpaceでは使えないのでtry/catchした方がよいそうです)

 