---           
layout: post
title: ウェブはどこまで楽器と融合できるか？ 〜 Web Music ハッカソンを開催しました
date: 2013-10-23
updated: 2013-10-23
tags:
  - Hackathon
  - Web Audio API
  - Web MIDI API
---

<script src="https://apis.google.com/js/plusone.js" type="text/javascript"></script>

去る 2013 年 10 月 19 日、Web Music ハッカソンというイベントを Google Japan オ
フィスで開催しました。これは [@ryoyakawai](https://twitter.com/ryoyakawai) こと
ヤマハの[河合さん](https://plus.google.com/107183997283505818880) (ややこしい)
を中心とした Web Music Developers JP という開発者コミュニティ主催のイベントで、
初の試みです。

ブラウザは近年目覚ましい発展を遂げています。HTML5 というバズワードが非常に分かり
やすくはありますが、現在は Chrome、Safari、Firefox といったブラウザで、オーディ
オを波形レベルから弄れる Web Audio API が利用可能になっています。

[![](https://3.bp.blogspot.com/-lVPh4mHvLNc/UmY8AzAOgRI/AAAAAAAAjlo/cszKvWhPf6E/s640/Screen+Shot+2013-10-22+at+17.29.08.png)](https://aikelab.net/websynth/)

こちらは[藍圭介さん](https://plus.google.com/110961519327088737405)
([@aike1000](https://twitter.com/aike1000)) が作られたデモですが、各ツマミは実際
に動かすことができ、本格的なアナログシンセサイザーとして音を鳴らすことができま
す。公開されてから 2 年以上経過していますが、まだ新鮮さは衰えません。

確かにすごい！・・・とはいえ、これだけだと何か足りないと思いませんか？そう、どう
せシンセ弄るなら、マウスやトラックパッドじゃなくて、フィジカルコントローラーだろ
うと。みんな考えることは同じだと思います。

そこで登場したのが、Web MIDI API というブラウザから直接 MIDI メッセージを送受信
することができる API です。まだ標準化されていませんが、既に Chrome では flag 付
きで実装されており、利用することができます。つまり、外部 MIDI 機器から Chrome 上
のバーチャルシンセサイザーを実際に鳴らすことができるようになったのです。

## ハッカソン開催

ここまで来れば、あとは盛り上げるだけ。まずはハッカソンだろうということで、今回は
日本の MIDI 業界団体である AMEI に協力を仰ぎ、ヤマハ、KORG、クリムゾンテクノロ
ジーの各社から楽器やスピーカーなどをご提供頂き、30 名程度の参加者のみなさんと共
に集まりました。

イベントの様子は主催の[河合さんのブロ
グ](https://miscfeeling.blogspot.jp/2013/10/web-music-1.html)に譲るとして、このイ
ベントがいかに熱いものだったか、写真と動画を交えて紹介していきます。

[![](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s320/IMG_7468.JPG)](https://4.bp.blogspot.com/-ZZ9DHwrs46w/UmIKlOjku2I/AAAAAAAAjZQ/RlO-U0FUg1I/s1600/IMG_7468.JPG)

[![](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s320/IMG_7469.JPG)](https://4.bp.blogspot.com/-zz4be8pUZgA/UmIKfv2682I/AAAAAAAAjYI/2euO3vIHQsk/s1600/IMG_7469.JPG)

このイベントのために用意された楽器の数々

[![](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s320/IMG_7452.JPG)](https://2.bp.blogspot.com/-cpHdKOHiNCs/UmIKaOc3DiI/AAAAAAAAjXM/UJewM9ftnSQ/s1600/IMG_7452.JPG)

[![](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s320/IMG_7453.JPG)](https://2.bp.blogspot.com/-OxRB3ggNv-Y/UmIKcHh5SEI/AAAAAAAAjXc/E8EXNaXJsps/s1600/IMG_7453.JPG)

[![](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s320/IMG_7454.JPG)](https://4.bp.blogspot.com/-ygtnSgqsBFs/UmIKYe7Z-sI/AAAAAAAAjW4/zlXrDkZHxQI/s1600/IMG_7454.JPG)

[![](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s320/IMG_7451.JPG)](https://2.bp.blogspot.com/-A6v73gdnfgQ/UmIKd1rbmpI/AAAAAAAAjXw/-zA6stiuL0o/s1600/IMG_7451.JPG)

[![](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s400/IMG_7450.JPG)](https://3.bp.blogspot.com/-3uRb6wb8zvI/UmIKW-aALgI/AAAAAAAAjWk/m27JBX6bBa4/s1600/IMG_7450.JPG)

製品化叶わず開発から 25 年の時を経て日の目を見た Dontata くん。MIDI メッセージに応じてドラムを叩きます。

[![](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s320/IMG_7475.JPG)](https://1.bp.blogspot.com/-QmqsiLDmnFs/UmIKtUkqrLI/AAAAAAAAjZs/Gd_iNZIIVNU/s1600/IMG_7475.JPG)

マイオシロスコープを持ってきた方も。

[![](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s320/IMG_7474.JPG)](https://2.bp.blogspot.com/-Y52EwKJe20o/UmIKhH0lRpI/AAAAAAAAjYY/vOwz2gmOyQM/s1600/IMG_7474.JPG)

[![](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s320/IMG_7477.JPG)](https://1.bp.blogspot.com/-fcPJAKGYSl0/UmIKi6tVDWI/AAAAAAAAjYw/fy_BM3YAdIg/s1600/IMG_7477.JPG)

勢い余って持ち込まれた半田ゴテ。

## デモ

特に心に残った作品に絞っていくつか紹介。(画像をクリックでビデオの開始位置から見
ることができます)

優勝はテノリオンと VJ を融合した作品。

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=1h1m28s" target="_blank"><img border="0" height="360" src="https://3.bp.blogspot.com/-dtGFvJbPXnM/UmZK77rSxAI/AAAAAAAAjmM/uiugZJXK2nk/s640/Screen+Shot+2013-10-22+at+18.52.30.png" width="640" /></a></div>

こちらはちょっと意表をついた作品。マウスオーバーで効果音が鳴るブックマークレットです。

<div class="separator" style="clear: both; text-align: center;"><a href="https://youtu.be/MocPwUT4UTk?t=25m19s" target="_blank"><img border="0" height="360" src="https://4.bp.blogspot.com/-fQt22DDJqJg/UmZJOBOm1iI/AAAAAAAAjmE/30Htzu2hJFc/s640/Screen+Shot+2013-10-22+at+18.44.44.png" width="640" /></a></div>

Dontata くんの勇姿。

[![](https://3.bp.blogspot.com/-lS38RE94QL4/UmM9DrNvYpI/AAAAAAAAjho/mO_lLtCnK_U/s320/IMG_7481.MOV)](https://plus.google.com/events/c0l8pcb5n0321sno0p503tsacn4/107085977904914121234/5936655867153703570)


他にもエレキ木魚ありーのテルミンありーの盛り沢山です。2 時間とちょっと長いですが、時間のあるときに飛ばし飛ばし見てみて下さい。

{% YouTube 'MocPwUT4UTk' %}

最後にチューターお二方のすごい作品。

@komasshu 先生はカメラに向かって口を開けるとスネアを鳴らしてくれます。


<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/UnjRGX4y4aL"></div>

大御所 g200kg さんはホワイトボードにマグネットを置いて、自由にリズムシーケンスが
組めるという作品。

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/etXgHpup7Bc"></div>

今回のイベントは初回ということで、課題がたくさん残るだろうと予想していたのです
が、正直楽し過ぎてびっくりしました。来年早々にも第二回を開催したいなんて話をして
いますので、興味持たれた方はぜひ [Web Music Developers
JP](https://groups.google.com/forum/#!forum/web-music-developers-jp) に参加して
下さい。忘年会とかもやるかも。

イベントの模様は [Google+ イベントペー
ジ](https://plus.google.com/events/activity/c0l8pcb5n0321sno0p503tsacn4)にまと
まっています。見れないビデオなどあったらこちらでどうぞ。

<div class="g-post" data-href="https://plus.google.com/107085977904914121234/posts/C6AeeHfvhb7"></div>
