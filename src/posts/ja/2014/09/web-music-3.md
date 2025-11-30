---
layout: post
lang: ja
title: 'ブラウザで音を楽しむイベント：Web Music ハッカソン #3 レポート'
date: 2014-09-17
updated: 2014-09-17
tags:
  - Hackathon
  - Web MIDI API
  - Web Audio API
image:
  feature: /event-report-web-music-hackathon-3/guitar.jpg
---

ブラウザで利用可能な Web Audio API や Web MIDI API などを使って音を楽しもうとい
うこのハッカソンも、早いものでもう 3 回目となりました。今回も実に濃い内容で、素
晴らしい作品が目白押しだったのですが、このポストではできるだけさらっと、その内容
をお伝えしたいと思います。

<!-- excerpt -->

[![](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)](https://4.bp.blogspot.com/-8g7hYALwOoY/VBlDLB3sAHI/AAAAAAAAt5I/bNyfMu6UDak/s1600/IMG_20140913_113024.jpg)

実は今回のハッカソン、前日にベルリンで [Web Audio
Hackday](https://www.eventbrite.co.uk/e/web-audio-hack-day-tickets-12451959145)
というイベントが開催されており、せっかく日程が近いのだから[何かコラボレートした
い](https://twitter.com/thedeftone/status/510666227401121793)よね、ということで
連絡を取り合い、ひとまず報告ブログという形で成果を見せ合うという試みをしていま
す。この後で英語版の記事をポストする予定。ベルリンからの報告も、公開され次第リン
クします。

## オープニング

まずは挨拶の後、Google エンジニアで [Web MIDI
API](http://www.w3.org/TR/webmidi/) の実装を担当している
 [@toyoshim](http://twitter.com/toyoshim) から、Web MIDI API の仕様に関するアッ
プデートでスタート。資料はこちら：

<div style="text-align: center;">
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39034752" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/toyoshim/web-midi-api-update">Web MIDI API update</a></strong> from <strong><a href="http://www.slideshare.net/toyoshim">Takashi Toyoshima</a></strong>
  </div>
</div>

そして今回もチューターとして参加された、日本の Web Music の世界ではすでに有名人
の (実は世界的にも知る人ぞ知る) [@g200kg](https://twitter.com/g200kg) さん、
[@aike1000](https://twitter.com/aike1000) さん、
[@sascacci](https://twitter.com/sascacci) さんそれぞれから、Web Audio / MIDI を
使ったアプリケーションのデモが行われました。あまりのレベルの高さにハッカソンの
ハードルがグググッと上がります。

@sascacci さんは電子ドラムを使ったビジュアルエフェクト

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/HmEfgCHhMFS"></div></div>

@aike1000 さんからは各種テンプレートの紹介とデモ。[サンプルコード
集](https://github.com/aike/webaudiodemo) は Web Audio API を使ってサイン波を出
すところから、サンプル音の再生、ディレイやピッチチェンジャー、ディストーションの
使い方などかなり便利なスニペットが書かれているので、ウェブ上のオーディオプログラ
ミングに興味ある人は必ずチェックしましょう。 他にも[シンセのテンプレ
集](http://d.hatena.ne.jp/aike/20140909)、[VJ フレームワー
ク](http://d.hatena.ne.jp/aike/20140913)も。

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UY4FimuRHUe"></div></div>

@g200kg さんからは LiveBeats のデモ

<div style="text-align: center;"><div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/VWuysJxCfh7"></div></div>

また、ヤマハの多田氏から DAW (Digital Audio Workstation)、つまりいわゆるプロ向け
音楽制作環境とブラウザを接続するための Web Music DAW Connector が発表されまし
た。これがあれば、プロの音楽制作に JavaScript で作ったプラグインを持ち込むことが
できるようになります。
Web Music の世界が着実に前進していることを感じますね。

<div style="text-align: center;">
  <div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/L5unwFUp2Xa"></div>
  <iframe allowfullscreen="" frameborder="0" height="356" marginheight="0" marginwidth="0" scrolling="no" src="//www.slideshare.net/slideshow/embed_code/39002835" style="border-width: 1px; border: 1px solid #CCC; margin-bottom: 5px; max-width: 100%;" width="427"> </iframe>
  <div>
    <strong><a href="https://www.slideshare.net/yukiotada/140913-web-musichackathonwmdc-39002835">140913_WebMusicHackathon_WMDC</a></strong> from <strong><a href="http://www.slideshare.net/yukiotada">Yukio Tada</a></strong>
  </div>
</div>

そして今回はなんと、JSPA (日本シンセサイザープログラマー協会) の方がこのイベント
のために曲を作って披露してくれました。音源に[ポケミ
ク](http://otonanokagaku.net/nsx39/)を使っているので、伴奏はもちろん、初音ミクの
歌が付いています。映像も制作してくれました。

{% YouTube 'MYnUvkDKT34' %}

このイベントは元々、ウェブプラットフォーム上で「音楽」と呼べるレベルのことができ
るようになることを目標にしていたので、良い刺激をもらいました。現段階では「音」レ
ベルの原始的なところに留まっていると言わざるをえませんが、さらにプラットフォーム
を積み上げて、より音楽的なことができるようにしていくのが醍醐味とも言えます。

## ハッキング

会場には参加者 40 名超に加え、W3C、ヤマハ、ローランド、コルグ、クリムゾンテクノロ
ジーの各楽器メーカー、[JSPA (日本シンセサイザープログラマー協
会)](http://www.jspa.gr.jp/) 、[AMEI (音楽電子事業協
会)](http://www.amei.or.jp/) 関連の方など、多数ご来場頂きました。ウェブ業界より
も楽器業界からの注目度の高さの方が目立つくらいです。

今回も各楽器メーカーから楽器を貸し出して頂いたのですが、自前の楽器を持参された方
がかなり多かったのが印象的です。その他ハッキング中の熱気は写真でご覧頂きましょ
う。

[![](https://4.bp.blogspot.com/-bM8bMaRi49M/VBlAYoU4grI/AAAAAAAAt4s/N0J-psHopX0/s1600/Screen%2BShot%2B2014-09-17%2Bat%2B17.03.15.png)](https://plus.google.com/events/gallery/cqvnr68c6r4b43dikum0kaljme4)

## デモタイム

11 時半に始まったハッキングタイムも 16 時半で終了。たったの 5 時間という短い時間でし
たが、チューターのものも含めて、ユニークな作品が合計で 26 個制作されました。すべて
紹介するわけにはいかないので、一部だけピックアップして紹介します。

これまでの反省を踏まえ、今回のデモのライブストリームでは、音声をラインで取って配
信したため、非常にクオリティの高い動画を残すことができました。Roland さん、機材
をご提供頂きありがとうございました。2 時間半ありますが、ご興味ある方はぜひ[ライブ
ストリーム全体のアーカイブ](https://www.youtube.com/watch?v=z_TGofN7wv8)もお楽し
み下さい。

※ 各画像は YouTube の該当箇所にリンクしています。

### 村井教授

[![](https://2.bp.blogspot.com/-LTLovd4pJZk/VBk7p6nAkfI/AAAAAAAAt2k/AvegmkSuuP0/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.58.11.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=5)

デモタイム最初にスペシャルゲストとして登場したのは日本のインターネットの父こと、
慶応大学の村井純教授。ご挨拶を頂きました。スペシャルゲストの登場に、俄然盛り上が
ります。

### D.F.Mac

3 回目の登場で皆勤賞となる [D.F.Mac](https://twitter.com/tadfmac) さんですが、今
回も個性的な作品で会場を困惑させてくれました。野菜や空き缶をトリガーにブラウザと
連携した DAW から音が鳴るという作品。詳しい解説は[こち
ら](http://qiita.com/tadfmac/items/f2172cdacbdd5600256e)。

[![](https://3.bp.blogspot.com/-LNhujEptdg4/VBk7xiEDhKI/AAAAAAAAt2s/PC-kzjtCHR4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.48.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=420)

### ヨコボリマサユキ

電車で Go! のコントローラーを MIDI で繋いでそれっぽい音が出せるという作品。

[![](https://3.bp.blogspot.com/-9NoGJKF0l-4/VBk7xtw9RmI/AAAAAAAAt20/EGc7lONVWmk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.49.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=672)

### 廣野大地
ScoreSketch は簡易型シーケンサー。前回優勝者の作品らしく、非常に完成度が高いです。

[![](https://2.bp.blogspot.com/-ogx25A4rL98/VBk7xlrR_RI/AAAAAAAAt2w/IfePipKuXME/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.50.25.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1037)

### kirinsan.org

オタマトーンの音を解析して？MIDI 信号に変換し、シンセサイザーを鳴らすという作品。

[![](https://2.bp.blogspot.com/-lqGIZDtaxOY/VBk7yQ7DvII/AAAAAAAAt24/qbWMI8JToBA/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.51.14.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=1654)

### 高木崇(@okame_okame)

エレキ木魚 ([ソースコード](https://github.com/okame/MOKUGYO2))
毎回木魚芸^H アートを披露してくれる高木さんの新作。

[![](https://2.bp.blogspot.com/-KCxTMKZDn3Q/VBk7y3Pz4ZI/AAAAAAAAt28/4eqH3CZonzo/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.52.08.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2095)

### @watilde

[abeck.js](http://watilde.github.io/abeck/) ([ソースコード](http://github.com/watilde/abeck))
[ABC 記譜法](http://abcnotation.com/)でシーケンスを登録すると、音楽の再生と譜面の生成ができるという作品。

[![](https://2.bp.blogspot.com/-IynrkpwvCKM/VBk7zOEumGI/AAAAAAAAt3A/-WIoFx66GkQ/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.13.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=2727)

### @mohayonao, @nanonum

[自動作曲](http://mohayonao.github.io/web-music-hack0913/) ([ソースコー
ド](http://github.com/mohayonao/web-music-hack0913/))
入賞こそ逃しましたが、音楽的にもかっこよく、ビジュアライゼーションまで付いている
贅沢な作品。

[![](https://2.bp.blogspot.com/-b800JQGz7qQ/VBk7zhsXE9I/AAAAAAAAt3Y/rXNB3As33cY/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.53.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=3958)

### CookPitch

ハミングでページ送りなどができるレシピサービス。手を使わずに済むので、料理をしな
がら PC が見れます！

[![](https://1.bp.blogspot.com/-oTBC9lnkkuE/VBk7z1L-R5I/AAAAAAAAt3Q/eFEWVemjccw/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.55.23.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6054)

### Himakan

[Face Tracking Effector](http://himakan.github.io/facetracking-effector/) ([ソー
スコード](https://github.com/himakan/facetracking-effector/))
今回の優勝作品です。アイディア的に似たようなものはいくつか見てきましたが、この作
品は圧倒的にかっこよいです。

[![](https://3.bp.blogspot.com/-X0rcTvPXlPo/VBk7znQLwdI/AAAAAAAAt3U/I0pJ7LZ0yLE/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.54.53.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=4404)

### @aike1000

未来のエフェクター

オープニングのデモで披露してくれたギターエフェクトに、それっぽい見た目 (どこかで
見たような・・・？) を加えて、曲として演奏してくださいました。

[![](https://2.bp.blogspot.com/-hENzeiN9T68/VBk70h-nbBI/AAAAAAAAt3g/HDgbM_I2yk4/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.04.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=6994)

### @sascacci

奇跡のコラボ

V ドラムと Dontata くんの奇跡のコラボです。V ドラムに合わせて Dontata くんがドラ
ムを叩いてくれます。そして JSPA 提供の楽曲に合わせてセッション！

[![](https://2.bp.blogspot.com/-a5G6Tx7JZZk/VBk702v7-5I/AAAAAAAAt38/cJyd6zY_OTU/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.56.56.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7328)

### @g200kg

Livebeats の改良版を披露してくださいました。

[![](https://2.bp.blogspot.com/-3TewUNce3T8/VBk71kAV0uI/AAAAAAAAt3w/R2no9-0-Evk/s1600/Screen%2BShot%2B2014-09-16%2Bat%2B17.57.43.png)](https://www.youtube.com/watch?v=z_TGofN7wv8#t=7598)

## まとめ

[![](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)](https://3.bp.blogspot.com/-O0Ifg41NfZs/VBQirtSg8pI/AAAAAAAAjPM/miMpRiRxDEE/w1714-h1286-no/P9136069.JPG)

今回も大いに盛り上がった Web Music ハッカソンでした。みなさん使い慣れたプラット
フォームなどができてきて、徐々に音楽的になってきていることを感じます。まだしばら
く時間はかかりそうですが、個人的にはミュージシャンが参加しても楽しめるようなイベ
ントになるといいな、と感じています。

次回もお楽しみに！

[![](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)](https://1.bp.blogspot.com/-cCy5DA1m05I/VBQirsT1V-I/AAAAAAAAjSI/ST5uZNXQuCM/w1922-h1442-no/P9136029.JPG)

P.S. 主催の[河合さん](https://twitter.com/ryoyakawai)、お疲れ様でした！
