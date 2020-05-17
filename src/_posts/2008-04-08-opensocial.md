---
title: OpenSocialとかどうよ？的な勉強会(!?)に参加してきた
author: Eiji
layout: post
SBM_count:
  - '00016<>1271392315<>15<>0<>1<>0<>0'
dsq_thread_id:
  - 2362153
categories:
  - OpenSocial
tags:
  - MySpace
  - OpenSocial
---
百式の中の人がやっているIDEAxIDEAというブログで募集があった「<a href="http://www.ideaxidea.com/archives/2008/04/opensocial.html" target="_blank">OpenSocialとかどうよ？的な勉強会</a>」に行ってきました。場所は汐留の<a href="http://jp.myspace.com/" target="_blank">MySpaceジャパン</a>オフィス。本国からエンジニアが来日しているとのことで、聞きたいことリストを用意しての参加です。

## MDPとOpenSocialの関係

MDPとは<a href="http://developer.myspace.com/community/" target="_blank">MySpace Development Platform</a>の略。MDPはOpenSocialより広い範囲のAPIです。言い換えると、OpenSocialはMDP上に作られている、とのこと。

[][1]

<p style="text-align: center;">
  <img class="size-medium wp-image-38" title="opensocial_components" src="/images/2008/04/opensocial_components-300x270.png" alt="" width="300" height="270" />
</p>

[][1]OpenSocialではJavaScriptが先行して仕様決定されていっていますが、コンテナプロバイダはAjaxを受け付けるREST APIを作らないとRequestに対して応答を返すことが出来ません。そこでMySpaceの開発した仕様がMySpace REST APIでした。(当然、Orkutやhi5にもこれに類するものがありますが、仕様は未公開です。<a href="http://api.hi5.com/" target="_blank">hi5はあったかな？</a>)

MySpaceにはOpenSocialとは別にMyOpenSpaceという拡張があり、opensocialreference.jsとMyOpenSpace.jsとして区別されています。位置付けとしてはMyOpenSpaceがまずあり、それをラッピングする形でOpenSocialが存在する、と言った方が正確でしょう。OpenSocialは様々なSNSの持つAPIの最大公約数を取る形でデザインされているため、独自のAPIをラッピングすれば十分な訳です。確かにこれなら、他社SNSからアプリを持ってきたとしても、OpenSocialに対応したJavaScriptでさえあれば、互換性が保てますね。

また、RESTful APIについてはOpenSocial版が登場したときにどうするつもりか？という質問をしてみたのですが、「APIを増やすだけだよ」という回答。なるほど。そりゃそうだ。現行バージョンでアプリを開発した人向けに、古いバージョン用のAPIも残していくようです。

これで、以前から気になっていた[MySpaceはまだ仕様が固まっていないはずのOpenSocial RESTful APIをどうやって実装したのか？][2]という疑問が解決しました。

## OpenSocialの拡張に当たる部分とは？

*   フォトアルバム
*   ヒーロー
*   好みの映画

等々が既に存在する独自拡張で、最も利用されているのがフォトアルバム。確かにフォトアルバムはSNSによってあったりなかったりしつつも、使われそうな機能ですね。

また、個別送信可能なメッセージ機能は？と聞いたところ、今まさに開発中だそうです。(今見たら、<a href="http://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/ee24d711e51a4084" target="_blank">OpenSocialにもうあるような、、、</a>)他にも、音楽やコメディなど、様々な分野のAPIを作っていきたいとのことでした。

## アプリケーションの登録について

アプリ開発者はSandboxのアカウントを取得すればすぐに開発を始めることが出来ますが、実際にアプリを公開するためには審査を通る必要があります。審査はコードのレビューやリーガルチェック(著作権侵害等)を経て、だいたい24時間〜48時間で公開されますが、権利関係が微妙な場合はもっとかかることもあるとのこと。

聞きそびれてしまいましたが、アプリをXMLでリモートサーバーに置いた場合でも、一度アプリが審査を通過してしまうと、GoogleGadgetのようにそれ以降のサーバー上のXMLの変更は反映されないと思われます。

### メモ

*   Install Callback URL、Uninstall Callback URLはそれぞれ、ユーザーがアプリをインストール、アンインストールした直後にリダイレクトされるページのURLを指定できる。デフォルトはアプリのキャンバスページ。
*   OAuthの認可用にキーとシークレットが発行される。

## マネタイズ

当然メインは広告収入になると思われますが、Facebookのようにある種のレコメンド広告で収益を得る方法もありえます。他にも、アプリ開発者に対して課金することで表示位置を優遇したり、といったことも考えられます。

今のところアプリ開発者は、自社サービスの会員獲得を目的としてアプリを提供するケースが多いようですが、<a href="http://developer.myspace.com/community/myspace/anatomyOfAnApp.aspx#app_canvas" target="_blank">キャンバスビュー</a>で全画面を使うことができますので、ここに好きなように広告を入れて収益を上げてよいとのこと。将来的にはアプリを使って物販や課金する方法の提供も検討しているとのことで、夢が広がります。

## アプリケーションの互換性

以前から疑問だったOpenSocialアプリケーションのSNS間の互換性について。実は自分の中では答えが出てたのですが一応聞いてみました。

まず、MySpace独自拡張の部分を利用しなければ、当然他のSNSに持って行っても使うことが出来ます。まあ、そりゃそうですよね。でも、viewやcssはサイトごとに切り替える必要があるはず。例えばOrkutではcanvas、profileという2つのviewしかありませんが、MySpaceにはhome,canvas,profile.left,profile.rightの4つが、hi5にはhomepage,canvas,profileという3つがあります。この時点で、うーん、ですね。

ただ、やり方として、コンテナのメソッドにアプリが動いているコンテナの名前を取得するAPIがあるので、それによって動作を切り替える方法もあるよ、と教えてもらいました。なるほど。

## リモートサーバーにアプリを実装できるか？

RESTful APIを使えば当然外部サイトでもアプリを使えるのですが、ここでは<a href="http://code.google.com/intl/ja/apis/gadgets/docs/fundamentals.html#Content_Type" target="_blank">GoogleGadgetのContent type=&#8217;html&#8217;をtype=&#8217;url&#8217;</a>にできるか？という話です。

答えは、イエス。

当然、同じドメイン配下にプロキシを作って、OAuthでMySpaceのAPIを叩く仕組みを作らなければならない訳ですが、<a href="http://developer.myspace.com/community/myspace/faq.aspx#jslib" target="_blank">サーバー用ライブラリも用意(準備中？)されているそうです</a>。

## アプリケーションディレクトリ公開後の伸び

Facebookはアプリケーション機能公開後に急激な伸びを示した訳ですが、MySpaceについてはどうか？聞いてみたところ、今のところ目立って急激な伸びは見られないとのこと。サイト上にもあまり誘導を貼っていないことから、まだその段階に達していないとの判断と伺えます。今後APIがもっとしっかりしたものになってから、色々やるんでしょうね。メッセージ機能等による口コミにも期待しているそうです。

## escapeStringとunescapeStringについて

パーシステントAPIを使う際、文字列情報しか保存できないため、JSON形式でやりとりされます。その際文字列をエスケープしてから投げたり、受け取った際はアンエスケープする必要があるのですが、Orkutやhi5で使えたgadgets.util.escapeString()とgadgets.util.unescapeString()がMySpaceで使えなかったため質問してみました。

答えはescapeStringとunescapeStringはもう使われていないはずで、今はencodeURIComponentが推奨のはずだよ、とのこと。今OpenSocialの仕様を見てみたところ、まだgadgets.util.scapeString()もgadgets.util.unescapeString()も有効のようですが、、、。

## MySpace用のサンプルアプリ

以前作った友達紹介アプリのMySpaceバージョンを公開します。

<pre>http://devlab.agektmr.com/OpenSocial/MySpace/FriendIntroducer.xml</pre>

別の人がこのアプリを自分のSandboxアカウントに入れることができたか分かりませんが、参考になれば。MySpaceに2つアカウント作って試すところまではまだやっていないため、物好きな方は<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=79982011" target="_blank">MySpaceの僕のアカウント</a>に友達申請してください。

## 感想

*   MySpaceのエンジニアの方はAptanaを使う人が多いみたい。Javaアプリはもっさりしてて嫌いなので基本的に使わないのですが、もう一回チャレンジしてみようかな・・・。
*   何が驚いたって、参加者10人中パソコン出した人が4人。その全員が**MacBook Airユーザーだった**こと！  
    みんなリッチだなあ。 
*   Ozzieと写真撮ってもらった！

<div>
  参加者の皆様、お疲れ様でした。
</div>

## ※追記(4/12)

「escapeStringとunescapeStringがもう使われていない」というのは間違いではないか？の件について、当日教えてくれたTerrenceにメールで確認しました。

どうやら「escape」と言ったのを、一般的なJavaScriptのescapeと勘違いしたらしく、彼が言っていた「escapeはもう使われていない」というのは、そちらを指していたとのこと。確かに、今はescapeよりもencodeURIComponentを使うように推奨されてますね。

で、本題のgadgets.util.escpeStringとgadgets.util.unescapeStringについては、確かに、MySpaceでは実装されていないそうです。自分で解決するしかないみたい。

 [1]: /images/2008/04/opensocial_components.png
 [2]: http://devlog.agektmr.com/archives/20