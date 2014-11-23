---
title: OpenSocialアプリケーションを作る(1)
author: Eiji
layout: post
permalink: /archives/22
SBM_count:
  - '00002<>1271319925<>1<>0<>1<>0<>0'
dsq_thread_id:
  - 2634404
categories:
  - OpenSocial
  - Widget
tags:
  - Gadget
  - OpenSocial
  - Orkut
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; "><g:plusone href="http://devlog.agektmr.com/archives/22" callback="wp_plus_one_handler"></g:plusone></div><p>OrkutとMySpaceで自作アプリを動かしてみたので、そのレポートです。</p>
<p>まだ仕様が固まっていないのでグレーな部分も多いのですが、OpenSocialはGoogleGadgetと相性が良いらしく、OrkutもMySpaceも、hi5もGoogleGadget前提となっています。というわけで、今回はGoogleGadgetの基本的な作り方とOrkutへのアプリケーション追加方法の解説です。</p>
<h2>ガジェットとは何か</h2>
<p>GoogleGadgetは<a href="http://www.google.com/ig?hl=ja" target="_blank">iGoogle</a>で動くJavaScriptとHTMLで記述された簡単なアプリケーションです。JavaScriptとHTMLはXML上に埋め込み、設定内容もXMLに記述します。</p>
<pre class="brush: jscript; title: ; notranslate" title="">&lt; ?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot; ?&gt;
&lt;module&gt;
 &lt;moduleprefs title=&quot;Blah Blah Gadget&quot;
  description=&quot;Gadget Example&quot;
  author_email=&quot;***@***.com&quot;
 &gt;
 &lt;/moduleprefs&gt;
 &lt;content type=&quot;html&quot;&gt;
.....
 &lt;/content&gt;
&lt;/module&gt;</pre>
<p>XMLはこんな感じ。Contentの中にJavaScriptとHTMLを記述することで、その内容がiGoogle上やMySpace等のOpenSocialアプリケーションとして表示されます。</p>
<p>ガジェットはJavaScriptを許可していることから、XSSなどの脆弱性を回避するため、iframeを使って別ドメインで動作するようになっています(iGoogleの場合、gmodules.com)。Contentの属性であるtypeを&#8221;html&#8221;から&#8221;url&#8221;に変更し、hrefでURL指定すると、iframe内に自分の管理するサーバーを表示することも可能です。</p>
<p>GoogleGadget自体の仕様は掘り下げるとキリがないのでこの辺りで。詳細は<a href="http://code.google.com/intl/ja/apis/gadgets/docs/reference.html" target="_blank">リファレンス</a>をご覧ください。</p>
<h2>OrkutのSandboxアカウントを取得する</h2>
<p>OrkutはGoogle直結ということもあり、OpenSocialの仕様が最も早く反映されるようです。そのOrkutのOpenSocial実験環境は<a href="http://sandbox.orkut.com/" target="_blank">Sandbox</a>と呼ばれ、通常のOrkutアカウントを拡張したSandboxアカウントを取得することで、利用可能となります。</p>
<p>アカウントを取得するには<a href="http://code.google.com/support/opensocialsignup/">コチラ</a>から申請を行ってください。申請が受理されるまでには数日を要するようです。</p>
<h2>OrkutにOpenSocialアプリを追加する</h2>
<p>無事アカウントの取得ができたら、実際にアプリケーションを試すことができるようになります。ちなみに、どこかのサーバーにGoogleGadgetのXMLファイルを置いておく必要がありますので、Geocitiesでも何でもいいはずですので、ファイルをアップできるところを用意しておきましょう。</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut1.jpg" title="Orkut1"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut1.jpg" alt="Orkut1" /></a><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut1.jpg" title="Orkut1"> </a></p>
<p>Sandboxにログインするとこんな感じ。一見通常のログイン画面と変わりませが、一点だけ：</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut2.jpg" title="Orkut2"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut2.jpg" alt="Orkut2" /></a></p>
<p>画面左にアプリケーションを追加するリンクがあります。クリックすると・・・</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut3.jpg" title="Orkut3"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut3.jpg" alt="Orkut3" /></a></p>
<p>URLでXMLファイルを指定してアプリケーションを追加することが出来ます。(ちなみにアプリケーションディレクトリはいつもほとんどアプリがありません)</p>
<p>ここでは、僕の作ったアプリケーションで試してみましょう。URLに下記を入力します：</p>
<pre>http://devlab.agektmr.com/OpenSocial/FriendIntroducer.xml</pre>
<p>「アプリケーションを追加」ボタンを押すと、次の画面に遷移します。</p>
<h2><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut4.jpg" title="Orkut4"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut4.jpg" alt="Orkut4" /></a></h2>
<p>ここでも「アプリケーションを追加」ボタンを押すことで、アプリケーションの追加が完了します。</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut5.jpg" title="Orkut5"><img src="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut5.jpg" alt="Orkut5" /></a></p>
<p>こんな感じの画面が表示されたら成功。Orkut上に友達がいない方は、<a href="http://sandbox.orkut.com:80/Profile.aspx?uid=2129608995524995619" target="_blank">僕のアカウント</a>に友達申請してくれてもOKです。</p>
<p>ひとまず、第一回はここまで。</p>
<p><a href="http://devlog.agektmr.com/wp-content/uploads/2008/03/orkut4.jpg" title="Orkut4"> </a></p>
