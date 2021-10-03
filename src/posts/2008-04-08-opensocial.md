---
title: OpenSocial とかどうよ？的な勉強会(!?)に参加してきた
layout: post
date: 2008-04-08
tags:
  - MySpace
  - OpenSocial
---

百式の中の人がやっている IDEAxIDEA というブログで募集があった
「[OpenSocial](http://www.ideaxidea.com/archives/2008/04/opensocial.html) とかど
うよ？的な勉強会」に行ってきました。場所は汐留の [MySpace ジャパ
ン](http://jp.myspace.com/)オフィス。本国からエンジニアが来日しているとのこと
で、聞きたいことリストを用意しての参加です。

## MDP と OpenSocial の関係

MDP とは [MySpace](http://developer.myspace.com/community/) Development Platform
の略。MDP は OpenSocial より広い範囲の API です。言い換えると、OpenSocial は MDP
上に作られている、とのこと。

![opensocial_components](/images/2008/04/opensocial_components-300x270.png)

OpenSocial では JavaScript が先行して仕様決定されていっていますが、コンテナプロ
バイダは Ajax を受け付ける REST API を作らないと Request に対して応答を返すこと
が出来ません。そこで MySpace の開発した仕様が MySpace REST API でした。(当然、
Orkut や hi5 にもこれに類するものがありますが、仕様は未公開です。[hi5 はあったか
な？](http://api.hi5.com/))

MySpace には OpenSocial とは別に MyOpenSpace という拡張があり、
opensocialreference.js と MyOpenSpace.js として区別されています。位置付けとしては
MyOpenSpace がまずあり、それをラッピングする形で OpenSocial が存在する、と言った
方が正確でしょう。OpenSocial は様々な SNS の持つ API の最大公約数を取る形でデザ
インされているため、独自の API をラッピングすれば十分な訳です。確かにこれなら、
他社 SNS からアプリを持ってきたとしても、OpenSocial に対応した JavaScript でさえ
あれば、互換性が保てますね。

また、RESTful API については OpenSocial 版が登場したときにどうするつもりか？とい
う質問をしてみたのですが、「API を増やすだけだよ」という回答。なるほど。そりゃそ
うだ。現行バージョンでアプリを開発した人向けに、古いバージョン用の API も残して
いくようです。

これで、以前から気になっていた[MySpace はまだ仕様が固まっていないはずの OpenSocial
RESTful API をどうやって実装したのか？](http://devlog.agektmr.com/archives/20)と
いう疑問が解決しました。

## OpenSocial の拡張に当たる部分とは？

* フォトアルバム
* ヒーロー
* 好みの映画

等々が既に存在する独自拡張で、最も利用されているのがフォトアルバム。確かにフォト
アルバムは SNS によってあったりなかったりしつつも、使われそうな機能ですね。

また、個別送信可能なメッセージ機能は？と聞いたところ、今まさに開発中だそうです。
(今見たら、[OpenSocial にもうあるよう
な、、、](https://groups.google.com/group/opensocial-and-gadgets-spec/browse_thread/thread/ee24d711e51a4084))
他にも、音楽やコメディなど、様々な分野の API を作っていきたいとのことでした。

## アプリケーションの登録について

アプリ開発者は Sandbox のアカウントを取得すればすぐに開発を始めることが出来ます
が、実際にアプリを公開するためには審査を通る必要があります。審査はコードのレ
ビューやリーガルチェック (著作権侵害等) を経て、だいたい 24 時間〜48 時間で公開
されますが、権利関係が微妙な場合はもっとかかることもあるとのこと。

聞きそびれてしまいましたが、アプリを XML でリモートサーバーに置いた場合でも、一
度アプリが審査を通過してしまうと、GoogleGadget のようにそれ以降のサーバー上の
XML の変更は反映されないと思われます。

### メモ

* Install Callback URL、Uninstall Callback URL はそれぞれ、ユーザーがアプリをイ
  ンストール、アンインストールした直後にリダイレクトされるページの URL を指定で
  きる。デフォルトはアプリのキャンバスページ。
* OAuth の認可用にキーとシークレットが発行される。

## マネタイズ

当然メインは広告収入になると思われますが、Facebook のようにある種のレコメンド広
告で収益を得る方法もありえます。他にも、アプリ開発者に対して課金することで表示位
置を優遇したり、といったことも考えられます。

今のところアプリ開発者は、自社サービスの会員獲得を目的としてアプリを提供するケー
スが多いようですが、[キャンバス
ビュー](http://developer.myspace.com/community/myspace/anatomyOfAnApp.aspx#app_canvas)
で全画面を使うことができますので、ここに好きなように広告を入れて収益を上げてよい
とのこと。将来的にはアプリを使って物販や課金する方法の提供も検討しているとのこと
で、夢が広がります。

## アプリケーションの互換性

以前から疑問だった OpenSocial アプリケーションの SNS 間の互換性について。実は自分の
中では答えが出てたのですが一応聞いてみました。

まず、MySpace 独自拡張の部分を利用しなければ、当然他の SNS に持って行っても使う
ことが出来ます。まあ、そりゃそうですよね。でも、view や css はサイトごとに切り替
える必要があるはず。例えば Orkut では canvas、profile という 2 つの view しかあ
りませんが、MySpace には home,canvas,profile.left,profile.right の 4 つが、hi5 に
は homepage,canvas,profile という 3 つがあります。この時点で、うーん、ですね。

ただ、やり方として、コンテナのメソッドにアプリが動いているコンテナの名前を取得す
る API があるので、それによって動作を切り替える方法もあるよ、と教えてもらいまし
た。なるほど。

## リモートサーバーにアプリを実装できるか？

RESTful API を使えば当然外部サイトでもアプリを使えるのですが、ここでは
[GoogleGadget の Content type='html'を
type='url'](http://code.google.com/intl/ja/apis/gadgets/docs/fundamentals.html#Content_Type)
にできるか？という話です。

答えは、イエス。

当然、同じドメイン配下にプロキシを作って、OAuth で MySpace の API を叩く仕組みを
作らなければならない訳ですが、[サーバー用ライブラリも用意(準備中？)されているそ
うです](http://developer.myspace.com/community/myspace/faq.aspx#jslib)。

## アプリケーションディレクトリ公開後の伸び

Facebook はアプリケーション機能公開後に急激な伸びを示した訳ですが、MySpace につい
てはどうか？聞いてみたところ、今のところ目立って急激な伸びは見られないとのこと。
サイト上にもあまり誘導を貼っていないことから、まだその段階に達していないとの判断
と伺えます。今後 API がもっとしっかりしたものになってから、色々やるんでしょうね。
メッセージ機能等による口コミにも期待しているそうです。

## escapeString と unescapeString について

パーシステント API を使う際、文字列情報しか保存できないため、JSON 形式でやりとり
されます。その際文字列をエスケープしてから投げたり、受け取った際はアンエスケープ
する必要があるのですが、Orkut や hi5 で使えた `gadgets.util.escapeString()` と
`gadgets.util.unescapeString()` が MySpace で使えなかったため質問してみました。

答えは `escapeString` と `unescapeString` はもう使われていないはずで、今は
`encodeURIComponent` が推奨のはずだよ、とのこと。今 OpenSocial の仕様を見てみた
ところ、まだ `gadgets.util.scapeString()` も `gadgets.util.unescapeString()` も
有効のようですが、、、。

## MySpace 用のサンプルアプリ

以前作った友達紹介アプリの MySpace バージョンを公開します。

```
http://devlab.agektmr.com/OpenSocial/MySpace/FriendIntroducer.xml
```

別の人がこのアプリを自分の Sandbox アカウントに入れることができたか分かりません
が、参考になれば。MySpace に 2 つアカウント作って試すところまではまだやっていな
いため、物好きな方は [MySpace の僕のアカウン
ト](http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=79982011)
に友達申請してください。

## 感想

* MySpace のエンジニアの方は Aptana を使う人が多いみたい。Java アプリはもっさりして
  て嫌いなので基本的に使わないのですが、もう一回チャレンジしてみようかな・・・。
* 何が驚いたって、参加者 10 人中パソコン出した人が 4 人。その全員が**MacBook Air ユー
  ザーだった**こと！  
  みんなリッチだなあ。 
* Ozzie と写真撮ってもらった！

参加者の皆様、お疲れ様でした。

## ※追記 (4/12)

「`escapeString `と u`nescapeString `がもう使われていない」というのは間違いでは
ないか？の件について、当日教えてくれた Terrence にメールで確認しました。

どうやら「`escape」`と言ったのを、一般的な JavaScript の `escape` と勘違いしたら
しく、彼が言っていた「`escape` はもう使われていない」というのは、そちらを指して
いたとのこと。確かに、今は `escape` よりも `encodeURIComponent` を使うように推奨
されてますね。

で、本題の `gadgets.util.escpeString` と `gadgets.util.unescapeString` について
は、確かに、MySpace では実装されていないそうです。自分で解決するしかないみたい。
