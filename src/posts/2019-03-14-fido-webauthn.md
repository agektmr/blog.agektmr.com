---
layout: post
title: 'パスワードの不要な世界はいかにして実現されるのか - FIDO2 と WebAuthn の基本を知る'
description: ''
date: 2019-03-14
tags:
- WebAuthn
- FIDO
- FIDO2
- 認証
- Authentication
---

不正送金やアカウントの乗っ取りなど、パスワードが原因の事件が後を絶ちません。高齢
者など、IT リテラシの低い人でも簡単かつ安全に自分のオンラインアカウントを管理で
きる世界が理想ですが、まずはパスワードの不要な世界を実現するのが先決であること
は、これまでのインターネットの歴史で証明されたと言えるでしょう。そして、ここに来
てパスワード不要なログインを実現する技術として注目されているのが FIDO (= Fast
IDentity Online, 「ファイド」) です。そしてその FIDO をブラウザから利用できるよ
うにするのが WebAuthn (= Web Authentication、「ウェブオースン」)。報道内容などか
らこれらは指紋認証を実現するもの、と思っている人もいらっしゃるかもしれませんが、
実際にはちょっと違います。

WebAuthn に関しては、すでに[数多くの記
事](https://github.com/herrjemand/awesome-webauthn/blob/master/README.md)が出て
いますので、テクニカルな利用方法についてはそれらに譲るとして、この記事では大局的
な部分、この技術によって未来のアイデンティティがどう変わっていくかなど、大きなビ
ジョンについて解説します。

<!-- excerpt -->

## 認証の基礎

FIDO のコンセプトを理解する上で、認証の基礎を押さえないわけにはいきません。

### 認証の 3 要素

オンライン、オフラインに限らず、本人性を確認をするために検証すべきものとして大き
く 3 つの要素があると言われています。

* **知識**: パスワードや秘密の質問など、本人しか知らないこと。
* **所有**: セキュリティキーなど、本人しか持っていない特定のデバイスなど。
* **生体**: ユーザー自身の指紋や虹彩、静脈や顔など。

<figure>
  <img src="/images/2019/fido-1.png">
</figure>

例えば銀行の ATM では、カードそのものを持っていること（所有）、そして PIN を知って
いること（知識）、という 2 つの要素で本人確認します。セキュティチップの載ったク
レジットカードでも同様に、サインする代わりにカードをターミナルに挿入し、正しい
PIN を入力することで、所有と知識を満たす二要素認証を行っていると言えます。

ただ、これらはオフラインのケースであり、パソコンやスマートフォンを通じたインター
ネット上でのオンラインの認証においては、これまで事情が異なりました。すべてがオン
ラインのシステムでは、何かを持っていることを証明することは困難ですし、生体を読み
取るためのインフラも整っていませんでした。そのため、これまで長い間、パスワードを
代表とした知識認証のみが使われてきました。

しかし、プログラムを使って機械的に無数のログインが試みられたり、罠を仕掛けて匿名
で情報を盗み出されたり、推測されてしまったり、パスワードはオンラインであるがゆえ
に、常にリスクと向き合わざるを得ない存在でした。ユーザー側もサービス側も、正しい
扱い方を知らずに安全に扱うことが難しいものであり続けたと言えます。

### OTP とその弱点

そこで最近人気になっているのが、パスワードに OTP (ワンタイムパスワード) を組み合
わせた認証方法です。パスワードに続けて、SMS で送信された番号や、アプリやデバイス
に表示された番号を入力します。いずれも本人以外に同じ番号が表示されることはないた
め、安全性が増します。

<figure>
  <img src="/images/2019/fido-2.png">
</figure>

しかし OTP には横取りされると第三者でも利用できてしまうという弱点があります。例
えばフィッシングサイト (見た目は本物そっくりだが URL が異なる詐欺サイト) を本物
と信じ込んでパスワードと OTP を入力してしまうと、気付かない間にアカウントが盗ま
れている、という結果になります。

そこで最近エンタープライズを中心に人気が高まってきたのが、セキュリティキーを使っ
た多要素認証です。これはユーザーの持っているセキュリティキーをパスワードと組み合
わせて所有認証として使うことで、二要素認証を実現するものです。

### 公開鍵暗号とセキュリティキー

セキュリティキーを使った所有の証明は、エンジニアであれば ssh などで馴染み深い公
開鍵暗号方式を使って実現されます。

パスワードの場合、ユーザーの頭の中とサーバー上に同じ文字列を何らかの形で保存して
おくため、どちらか一方が漏れてしまった時点で乗っ取られてしまう危険性があります。
しかし公開鍵暗号方式では、ユーザー側に秘密鍵、サーバー側に公開鍵という異なる鍵を
持たせます。

<figure>
  <img src="/images/2019/fido-3.png">
</figure>

面白いのは、秘密鍵が、ペアとなる公開鍵で検証でき、その秘密鍵でしか生成できない
「署名」を発行できる、という特性です。サーバー側がチャレンジと呼ばれるランダムな
文字列を送り、ユーザー側がそれに秘密鍵を使って署名を付けて返せば、対となる公開鍵
を持っているサーバー側は、その署名を検証することで、チャレンジを本人が返送したも
のであることが確認できる、というわけです。

大まかな流れとしてはこんな感じです。

1. **登録 (初回のみ行う)**：ユーザーは公開鍵ペアを作り、秘密鍵を安全なところに保
   管、公開鍵をサーバー側に置く。
2. **ログイン**：ユーザーはサーバーからチャレンジを受け取り、秘密鍵を使ってそれ
   に署名して送り返す。サーバーは公開鍵を使ってその署名とチャレンジを検証し、本
   人性が確認できたらユーザーにアクセスの許可を出す。

公開鍵暗号方式を使うと、公開鍵ペアはそのサービスとユーザーの組み合わせ専用に作ら
れるため、フィッシングなどで第三者が署名を横取りしても、悪用はできません。また、
仮にサーバーがクラックされ、公開鍵が漏れたとしても、ユーザーのアカウントを偽装す
る手段にはなりません。ユーザーは秘密鍵さえ守っていれば、乗っ取られる可能性は限り
なく低いまま、所有を証明 (User Presence = UP) して認証することができる、というわ
けです。

とはいえ、IT リテラシの低いユーザーに秘密鍵を絶対に漏らさないように保管しておい
てもらう、というのは言うほど単純な話ではありません。

そこでこの全体の流れを誰でも簡単に利用できるようにするために発明されたのが、セ
キュリティキーと呼ばれる専用デバイスを使った仕組みになります。もう少し広いくくり
では「認証器」や「オーセンティケーター (Authenticator)」 と呼ばれます。認証器
は、登録時に新しい公開鍵ペアを作り、秘密鍵を安全に保管、公開鍵だけを返してくれる
という機能、そしてログイン時に署名を生成して返してくれる、という認証に特化した機
能を持っています。

## FIDO による標準化

せっかくの認証器ですが、仕組みがパソコンやスマートフォン、OS、プラットフォームご
とに異なるようでは普及は望めません。そこで登場するのが [FIDO
Alliance](https://fidoalliance.org/) という団体による標準化です。FIDO Alliance
によって定義されたのは、デバイスと認証器との通信を行うプロトコルである CTAP
(Client To Authenticator Protocol) や、生体情報を使った本人確認を実現する [UAF
(Universal Authentication
Framework)](https://fidoalliance.org/specs/fido-uaf-v1.1-ps-20170202/fido-uaf-overview-v1.1-ps-20170202.html)
、二要素認証を実現する [U2F (Universal Second
Factor)](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-overview-v1.2-ps-20170411.html)
でした。これらの仕様は複数のプラットフォームで実装され、実際に使用されています。

例えば UAF は [docomo の携帯電話で生体認証を実
現](https://www.nttdocomo.co.jp/info/news_release/2015/05/13_00.html)しました。
デスクトップ版 Google Chrome では、ブラウザの機能としては未実装なものの、USB の
U2F セキュリティキーを [JavaScript の
API](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-javascript-api-v1.2-ps-20170411.html)
を通じて使用することができる[拡張機能](https://github.com/google/u2f-ref-code)
が、表からは見えない形でインストールされています。また、[Google Authenticator と
いうアプ
リ](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)
をインストールすれば、Android 版 Google Chrome でも同様に NFC に対応した U2F セ
キュリティキーを使用することができます。また、Firefox でも[フラグを立てれば U2F
セキュリティキーが使え
る](https://wiki.mozilla.org/Security/CryptoEngineering#Using_U2F_.2F_WebAuthn)
ようです。これらの U2F を使った二要素認証は実際に Google や Dropbox、Facebook な
どのサービスで利用することができます。

## そして FIDO2 へ

その後 FIDO は普及と利便性を追求するため、さらに拡張された新しいバージョンを開発
しました。それが FIDO2 です。FIDO2 では UAF と U2F が統合され、認証器とのやり取
りを行う
[CTAP2](https://fidoalliance.org/specs/fido-v2.0-ps-20190130-pub/fido-client-to-authenticator-protocol-v2.0-ps-20190130.html)
プロトコルと共に、ブラウザから認証器を扱うための [WebAuthn (Web
Authentication、「ウェブオースン」)](https://www.w3.org/TR/webauthn/) と呼ばれる
W3C ベースの JavaScript API が標準化されました。[Google
Chrome](https://developers.google.com/web/updates/2018/05/webauthn)、[Mozilla
Firefox](https://hacks.mozilla.org/2018/01/using-hardware-token-based-2fa-with-the-webauthn-api/)、
[Microsoft
Edge](https://blogs.windows.com/msedgedev/2018/07/30/introducing-web-authentication-microsoft-edge/)
とすでに実装されており、[Apple Safari の実装もかなり進んでい
る](https://bugs.webkit.org/show_bug.cgi?id=181943)ようです。

FIDO2 では仕様が洗練されたこともさることながら、ブラウザやプラットフォームに標準
的に実装されることで、一般の開発者でも利用できる手軽さを得て、今後広く普及してい
くのではないかと期待されています。

### FIDO2 と認証器

FIDO2 を理解する上で見落としがちなものに、認証器の特性があります。FIDO2 や
WebAuthn で指紋認証が使えることは知っていても、それがセキュリティキーとどう関係
してくるのかを説明できない人は多いのではないでしょうか。

認証器には様々な種類があります。U2F に対応したもの、USB-C で接続するもの、BLE で
接続するもの、スマートフォンやパソコンなどのデバイスに組み込まれているもの、指紋
認証できるもの、などなどです。一見複雑ですが、3 つの基準で分類することができま
す。

* **Transport**: 認証器とデバイスの接続方法。USB, BLE, NFC, internal (内部) があ
  る。
* **Attachment**: スマートフォンやパソコンなどのデバイスに直接組み込まれている
  (platform) か、いないか (cross-platform)
* **User Verification (以下 UV)**: 生体認証を含めた本人認証機能があるかどうか

<figure>
<img src="/images/2019/fido-4.png" >
<figcaption>一般的なセキュリティキーのイメージ</figcaption>
</figure>

例えば [YubiKey 5
Nano](https://www.yubico.com/product/yubikey-5-nano/#yubikey-5-nano) は、
Transport に USB、(付けっぱなしを想定してはいますが) デバイスから取り外しできる
ので Attachment は cross-platform、UV は「なし」と分類できます。

[Feitian BioPass FIDO](https://www.ftsafe.com/Products/FIDO2) は Transport に
USB、デバイスから取り外しできるので Attachment は cross-platform、指紋認証が使え
るので UV は「あり」と分類できます。

面白いのは Attachment が platform な認証器です。例えば [Google Pixel
3](https://store.google.com/product/pixel_3) は、デバイスそのものを認証器として
扱うことができます。その場合、Transport は internal、Attachment は platform、指
紋認証が使えるので UV「あり」と分類できます。

現在市場に出回っている多くのセキュリティキー・認証器は、U2F として FIDO で利用す
ることができるものですが、後方互換性があるため FIDO2 でも利用できます。FIDO2 で
特徴的なのは User Verification の部分です。

### User Verification とは何か

User Verification は、認証器の持つ本人確認の機能のことを指します。ここで言う本人
確認とは、指紋認証や顔認証、虹彩認証などの生体認証を使ったものに加え、フォール
バックとして PIN などの生体を使わないものも含みます。PIN の場合、ブラウザなどの
UI を介して、予め設定しておいた短い数字や英数字を入力して本人確認を行います。UV
付きの認証器では、本人確認ができないと署名が発行されません。FIDO2 によってパス
ワードが不要になる、と言われている正体はここにあります。

つまり、指紋認証機能の付いたセキュリティキー、例えば上記の BioPass FIDO や、生体
認証器能の付いた Android、Windows Hello に対応した Windows デバイス、そして将来的
に TouchID や FaceID に対応した iOS/macOS は、公開鍵暗号を使った所有認証 (User
Presence = UP) と生体認証 (User Verification = UV) を組み合わせることで、**単体
で二要素認証を実現**し、完全にパスワードなしでログインできる環境が整うのです。

<figure>
<img src="/images/2019/fido-5.png" >
</figure>

パスワードの危険性を取り除いてくれるだけでなく、触ったり見たりするだけでログイン
できるなんて、素晴らしいと思いませんか？

## FIDO2 が実現する未来

上記の認証器のいずれかを持っている方は、実際にデモを試すことができます。

[https://webauthndemo.appspot.com](https://webauthndemo.appspot.com/)

<figure>
<img src="/images/2019/fido-6.png" >
<figcaption>webauthndemo.appspot.com</figcaption>
</figure>

U2F セキュリティキーを試したいときは "Register New Credential" で登録、
"Authenticate" でログインを試すことができます (Chrome, Firefox, Edge で動作しま
す)。

Android の指紋認証や MacBook Pro の TouchID といったデバイス付属の生体認証を試し
たい時は "Register Platform Authenticator" で登録、"Authenticate" でログインを試
すことができます (2019 年 3 月現在、Chrome のみで動作します)。うまくいけば、ブラ
ウザでダイアログが表示され、指紋認証などが試せます。"ISUVPAA" は "Is User
Verifying Platform Authenticator Available" の略で、生体認証を含む (User
Verification) 認証器が埋め込まれたデバイス (Platform Authenticator) を使っている
かを教えてくれます。

左側のメニューを開くと更に細かいパラメーターを個別にいじることができますが、ここ
では解説は省きます。

### 新しいユーザー体験 - 再認証

FIDO2 を使ったこれまでにない新しいユーザー体験として、再認証 (Re-authentication)
が挙げられます。これは、一度ログインした端末に、以後は指紋認証だけで再度ログイン
できるようにしよう、というものです。この体験はすでに [Yahoo! JAPAN で実
現](https://id.yahoo.co.jp/security/manage_auth_device.html)されており、同じ端末
のブラウザであれば、再ログインは指紋認証だけで済みます。(画像は[プレスリリースか
らの引用](https://about.yahoo.co.jp/pr/release/2018/10/231023/a/))

<figure>
<img src="/images/2019/fido-8.png" >
<figcaption>Yahoo! JAPAN の再認証フロー</figcaption>
</figure>


これが威力を発揮するのは高いセキュリティを求められる銀行やショッピングサイトなど
です。短いセッション時間で戻ってくるたびにログインを求める銀行や、お金を払う場面
になるとパスワードの再入力を求めてくるショッピングサイトは少なくありませんよね。
そんな時に指紋や顔で認証できれば、ユーザー体験を損なうことなく使ってもらうことが
期待できます。

### 認証器はデバイスと紐付く

「一度ログインした端末なら」と言いましたが、なぜ生体認証は同じデバイスに縛られる
のでしょう？別のデバイスに切り替えても、同じ人の同じ指紋ならそのままログインでき
ても構わないと思われるかもしれません。

これはセキュリティ上の理由から、生体認証に使われる生体のデータが、そのデバイスに
のみ保存され、ネットワークや無関係なソフトウェアからはアクセスできないように守ら
れているためです。秘密鍵についても同様なので、所有認証もデバイスを跨いで使うこと
はできません。つまり FIDO2 では、デバイスを変えるたびに、同じアカウントに何らか
の方法でログインし、それに紐づく形で新しく公開鍵ペアを作り、生体情報を登録する必
要がある、ということです。

現状生体認証を行う多くの環境として思い浮かぶのは Android デバイスや MacBook Pro
などの platform な認証器ですが、 BioPass FIDO のように cross-platform な認証器も
存在します。例えばこれを使えば、ログインしたいデバイスに認証器を挿し替えるだけ
で、どこでも同じアカウントに指紋認証でログインすることは可能です。

しかし、大多数のユーザーは cross-platform な認証器を購入しないでしょうから、
FIDO2 を導入したい場合は、そういったユーザーが新しいデバイスに初めてログインする
方法については、現実的な解決方法を考えなければなりません。パスワードを作ってしま
えば、そこがアカウント乗っ取りの糸口になってしまう可能性があるので、セキュリティ
を重視するなら新しいパスワードは作らせず、メールや SMS を使って一時的なコードを
送りログインしてもらう、という方法が現実的な解になっていくのかもしれません。

### caBLE を使ってスマートフォンを認証器に

Google は [caBLE (cloud assisted BLE、「ケーブル」) という FIDO2 の拡張を提
案](https://github.com/w3c/webauthn/pull/909)しています。これはスマートフォンを
BLE の cross-platform な認証器として使えるようにする、というもので、これが実現す
れば、わざわざ専用の認証器を用意しなくても、多くの人がすでに持ち歩いているスマー
トフォンをそのまま認証器として使えるようになり、デバイスを跨いでパスワードなしの
ログインが可能になる、と期待されています。

いずれにしろ、認証器を紛失してしまった場合のことも含め、何もない状態からアカウン
トを復活させるアカウントリカバリーについては、当面考慮に入れてシステムをデザイン
していく必要があるでしょう。

### Resident Key

FIDO2 で提案されている未来には、もうひとつエキサイティングな機能があります。それ
が Resident Key (レジデントキー) です。認証器にはデータの保存領域があり、サービ
スに登録して公開鍵ペアを作るたびに、サービスに関する情報と共に、ユーザーの情報が
保存されます。

Resident Key を使わずにログインする場合、ユーザーはログインに使用したいアカウン
トを自己申告しなければなりません。しかし、Resident Key を使えば、予め認証器に保
存されたアカウントの一覧を示し、ユーザーが選んで生体認証をしてログインする、とい
うユーザー体験を実現することができます。

<figure>
<img src="/images/2019/fido-7.png">
<figcaption>Resident Key のモックアップ</figcaption>
</figure>

この機能は Chrome では未実装ですが、Windows 10 上の Edge (Chromium ではないバー
ジョン) ではすでに実現されており、Resident Key をサポートした cross-platform な
認証器を使えば、この恩恵を受けることができます。Windows は基本的にデスクトップ
OS のため、Windows Hello を platform な認証器として使っている人にとってはメリッ
トは感じにくいかもしれませんが、将来的に Android や iPhone のようなモバイルデバ
イスで実現された caBLE で cross-platform な認証器が可能になれば、自分のアイデン
ティティを常に持ち歩ける世界観が実現できることになります。

スマートフォンが自分のアイデンティティを表すものとなり、ログインの壁を感じること
なくインターネットの世界を渡り歩いていくことができる日が来るかもしれません。

### Attestation とは何か

だいぶ長くなってきてしまいましたが、最後にもうひとつ、重要なお話です。せっかく
FIDO2 では強固なセキュリティを実現できるとしても、偽造された悪意ある認証器を予め
掴まされていたとしたら元も子もありません。そこで FIDO2 には Attestation (アテス
テーション) という仕組みが盛り込まれています。

Attestation とは証明書のようなもので、認証器のモデルごとに (基本的に端末個別では
ない) 異なる証明書が予め埋め込まれています。MDS (Metadata Service) と呼ばれる
ルート認証局のようなものを使えば、この Attestation が正規に製造されたものかを
サーバー側で検証することができるという仕組みです。もちろん、認証器には FIDO
Alliance がお墨付きを与える[認定制度](https://fidoalliance.org/certification/)も
ありますので、認定された認証器を使うのがお薦めです ([Android も先日認定を受けま
し
た](https://fidoalliance.org/android-now-fido2-certified-accelerating-global-migration-beyond-passwords/))。
Attestation については、[この記事 (英
語)](https://fidoalliance.org/fido-technotes-the-truth-about-attestation/) が非
常によくまとまっているので一読をお薦めします。

なお、コンプライアンス上必要 (銀行やエンタープライズ、行政など) とされるような場
合を除き、通常 Attestation を要求する必要はありません。(なお、Google のエンター
プライズ環境において利用される際は [Chromium ウェブサイトの Security Keys のペー
ジ](https://www.chromium.org/security-keys)もぜひご覧下さい。) また、一人のユー
ザーはひとつの認証器を持つだけで済む世界が理想的です。使う場合は MDS をうまく活
用して、特定機種のみ受け付けるようなことのないよう配慮してください。

**更新: 2019/03/18** 当初 Attestation について、「プライバシー的におすすめできな
い」という旨を記載しておりましたが、筆者の誤解の可能性が否定出来ないため一旦取り
下げました。正確な情報を把握次第更新いたします。  
**更新: 2019/03/22** プライバシーに関する懸念はないに等しいと言って差し支えない
との確認が取れましたので、上記文言を修正しました。

## まとめ

ブラウザから WebAuthn の開発を使った FIDO2 の指紋認証の実装を体験してみたいとい
う方は、FIDO のエヴァンジェリストである [Yuriy
Ackermann](https://twitter.com/herrjemand) の作った[コードラ
ボ](https://slides.com/fidoalliance/jan-2018-fido-seminar-webauthn-tutorial)から
始めることをお薦めします。[彼の Medium](https://medium.com/@herrjemand/) では、
ブラウザ側だけでなくサーバーでの署名の検証の仕方や各種 Attestation の検証の仕方
もカバーしていますので、精読をおすすめします。また、日本語のものを含めたドキュメ
ントやライブラリ、デモなど、リソースを一箇所に集めた資料も非常に参考になります。

[WebAuthn
Awesome](https://github.com/herrjemand/awesome-webauthn/blob/master/README.md)

ただし、早速 FIDO2 と WebAuthn をプロダクションに導入しよう！と思った方。少し慎
重になってください。確かに情報も対応環境も出揃ってきましたが、サーバーサイドの話
はまだまだ未成熟な段階と言わざるを得ません。余程暗号を扱ったプロダクトに自信のあ
るチームでない限り、まだむやみに扱うべき段階ではないと考えます。

すでにオープンソースのライブラリを公開している方もいますし (特に日本のコミュニ
ティの活動は世界的に見てもかなり活発です)、Yahoo! JAPAN のようにプロダクション環
境で使う実績も出てきています。そのうち IDaaS プロダクトや、FIDO Certified のライ
ブラリなども出てくるでしょう。LINE は今年中に自前の FIDO Certified なライブラリ
をオープンソースで公開することを宣言しています。

FIDO2/WebAuthn をプロダクション投入するのは、そういった実績やプロダクト、オープ
ンソース・ソリューションが十分出てきてからでも遅くはありません。まずはいろんなド
キュメントを読みながら FIDO2 や WebAuthn で実現できる未来がどんなものか思いを巡
らせるところからスタートして頂ければと思います。

最後に、この記事を執筆するにあたってレビューにご協力頂いた
[@herrjemand](https://twitter.com/herrjemand),
[@super_reader](https://twitter.com/super_reader),
[@watahani](https://twitter.com/watahani),
[@sisidovski](https://twitter.com/sisidovski) に感謝します。
