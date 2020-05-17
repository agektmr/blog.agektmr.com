---
title: iGoogleの進化に見るGoogleのソーシャル化
author: Eiji
layout: post
SBM_count:
  - '00002<>1271371530<>1<>0<>1<>0<>0'
dsq_thread_id:
  - 8321176
categories:
  - Google
  - SocialWeb
tags:
  - iGoogle
---
iGoogleはこれまで複数のガジェットを1ページに表示するスタイルでしたが、最近「canvasビュー」が追加され、1つのガジェットを画面いっぱいに表示して利用できるようになったことは記憶に新しいと思います。canvasビューを使うことで、特にGmailやGoogle Readerのガジェットでは、単体サービスのかなりの機能がガジェット上でそのまま利用できるようになり、大幅に利便性が向上しました。

[<img class="alignnone size-medium wp-image-208" title="igoogle1" src="/images/2008/11/igoogle1-300x150.png" alt="" width="300" height="150" />][1]

[<img class="alignnone size-medium wp-image-209" title="igoogle2" src="/images/2008/11/igoogle2-300x152.png" alt="" width="300" height="152" />][2]

このiGoogleの変化は、既に明言されてはいますが、iGoogleのOpenSocial対応を予感させ、将来的にGoogle全体がソーシャルネットワークになっていくことを示唆しています。実は既にGoogleがそれ自体をソーシャルネットワーク化していく方向性は随所に見られます。

## Googleのソーシャル化

### Gmail連絡先(コンタクトリスト)

ソーシャルネットワークを形作る上で最も重要になるソーシャルグラフを、GoogleはGmail/Google Talkに持ってきました。当然と言えば当然。この連絡先(コンタクトリスト)はAndroidケータイ上にもインポートされ、電話帳としても利用されており、いやでもリアルなソーシャルグラフになる点が特徴と言えます。

### Google Mapsプロフィール

最近プライバシー問題で話題のGoogle Mapsには実はプロフィール機能がついており、画面上部の「プロフィール」リンクをクリックすると、自分のプロフィールを作成/表示することができます。これは後述のGoogleプロフィールと連携しています。

### Google Readerの共有機能

Google ReaderはRSSリーダーですが、気になった記事をボタン一つで友達に共有できる機能があります。その際利用されるのがGmailの持つ連絡先のソーシャルグラフで、ここでも活用されています。

### Googleプロフィール

いつのまにか、ひっそりと作られた感のあるのが<a href="http://www.google.com/s2/profiles/me?hl=ja" target="_blank">Googleプロフィール</a>。**これが今後どう充実して行くかは要注目**です。

[<img class="alignnone size-medium wp-image-211" title="googleprofile" src="/images/2008/11/googleprofile-300x165.png" alt="" width="300" height="165" />][3]

画面左上にユーザーの写真とニックネーム、住所が表示され、その下にはプロフィールの詳細情報が表示されます。今のところ住所や過去に住んだことのある場所、通った学校、勤めた会社、略歴に加え、Googleを使っても見つけられないもの、超能力(?)など一風変わった項目もあり、この画面から編集を行うことができます。

[<img class="alignnone size-medium wp-image-212" title="googleprofilelink" src="/images/2008/11/googleprofilelink-300x167.png" alt="" width="300" height="167" />][4]

そして「リンク」。今のところ本当にただのリンクですが、利用している外部サービスを登録することができます。面白いのは、例えばFriendFeedを登録すると、自動的に他のサービスも登録候補にずらずらっと表示されるところ。なるほど、ここでGoogle Social Graph APIを活用しているようです。確かに、FriendFeedにはrel=&#8221;me&#8221;といったmicroformatが埋め込まれています。

### メッセージ機能

<a href="http://japan.cnet.com/news/media/story/0,2000056023,20383508,00.htm" target="_blank">Googleプロフィールに最近メッセージ機能が追加</a>されました。英語版でしか存在を確認することはできませんが、プロフィールページからメッセージを送ることができるようです。これもOpenSocial対応を意識したものでしょう。

## Googleは今後どう変わって行くのか

Googleがソーシャル化していく上で、今後どのような部分に変化が見られるのか予想してみました。

### Googleプロフィールにガジェット

まず間違いなく、Googleプロフィールにもガジェットが追加できるようになるでしょう。

OpenSocialにはhomeビュー、canvasビュー、profileビュー、previewビューの4つがあらかじめ定義されていますが、ガジェット追加確認用のpreviewビューを除けば、一般的なSNSにおけるマイページ(homeビュー)、ガジェットのみを表示するcanvasビューが既にiGoogleで用意されているので、残りはプロフィールページ(profileビュー)となるのは自然な流れと言えます。

### GoogleプロフィールのiGoogle統合

GoogleプロフィールとiGoogleの統合はあり得ない話ではありません。今もiGoogleのSandbox環境では自分のGoogleプロフィールの内容を確認することができますが、例えば簡単に画面遷移ができたりすることで、他者との距離を近づけ、iGoogleがソーシャルなものであることを意識できるようになるかもしれません。

### アクティビティストリーム

iGoogleのSandboxでは既に片鱗が見えますが、OpenSocialのアクティビティストリームという機能がもう少し明確に、姿を現すはずです。アクティビティストリームとは、ユーザーの行動履歴のようなもので、mixiで言えば友達の日記やコミュニティの最新情報に当たります。

OpenSocialではガジェットからアクティビティを登録する機能が規定されていますが、iGoogleではこれに加えてリンクしたサービスのフィードも自動的に混ざる、FriendFeedライクな機能を追加してくるのではないでしょうか。<a href="http://jp.techcrunch.com/archives/20081112sweeping-changes-at-livecom-its-a-social-network/" target="_blank">MicrosoftがWindows Live Homeで追加した機能</a>にも同様のものがあります。

## まとめ

Googleプロフィールをネタに記事を書き始めたのですが、なんだかんだ話が広がり、結構大きい話になってしまいました。しかしGmailを中心として着実に、潜在的にソーシャルグラフを広げているGoogleが、完全なソーシャルネットワークの形態をとった時にどれほどの影響力を持ったものになるのか、正直想像もつきません。果たしてGmailを作った時点でここまで考えていたのか？今後の動向から目が離せません。

 [1]: /images/2008/11/igoogle1.png
 [2]: /images/2008/11/igoogle2.png
 [3]: /images/2008/11/googleprofile.png
 [4]: /images/2008/11/googleprofilelink.png