---
layout: post
title: 'パスキーとは何か、そしてその課題'
description: 'パスキーの基本的な特徴と、2022 年時点で考えられる課題について解説します。'
date: 2022-12-13
image:
  feature: /2022/keys.jpg
tags:
- Passkey
- WebAuthn
- FIDO
- FIDO2
- 認証
- Authentication
---

パスキーはフィッシングに強く、テクノロジーに詳しくないユーザーでも使いやすい新しい認証方式で、いずれパスワードを置き換えると言われています。この記事では、パスキーの基本と、これからのウェブにとってパスキーがどういう意味を持つのかについてまとめてみます。

<!-- excerpt -->

## パスキーとは何か

12 月 9 日に Google が [Android 版 Chrome でパスキーがサポートされたとのアナウンスが出ました](https://blog.chromium.org/2022/12/introducing-passkeys-in-chrome.html)。Apple もすでに[最新版の macOS Ventura、iOS / iPadOS 16 で Safari がパスキーに対応](https://developer.apple.com/videos/play/wwdc2022/10092/)しています。

パスキーは Apple、Google、Microsoft が協調して使う [FIDO クレデンシャル](/2019/03/fido-webauthn.html)の名前です。エンドユーザーのみなさんがパスワードの代わりとして認識し、直感的にログインできるよう「パスキー」というブランドとアイコンが決まりました。ウェブ開発者的には [FIDO Alliance](https://fidoalliance.org/) と W3C の定める [WebAuthn (Web Authentication)](https://w3c.github.io/webauthn) の延長線上にあると考えて差し支えありません。この記事で言う「パスキー」は「FIDO クレデンシャル」と置き換えられます。[FIDO と WebAuthn に関しては以前書いた記事](/2019/03/fido-webauthn.html)がありますので、まだの方はぜひお読み頂ければと思います。

パスキーは、パッと見の体験としては生体認証を使ったログインですが、技術者ならこの裏で何が起きているかを知っておく価値はあると思います。

### ユーザー体験 {#user-experience}

ユーザーがパスキーでログインするには、サイトごとにパスキーを作成しておく必要があります。

パスキーを作成・登録しようとすると、生体認証ダイアログがポップアップし[ローカル認証](#luv)を行います。認証が完了すると、新しくパスキーが作成されます。

{% YouTube 'lZXGXxZIMTU' %}

ログイン時はアカウントセレクターが表示されるため、使いたいアカウントを選んでをタップするとローカル認証が行われ、ログインが完了します。

{% YouTube '6GMDhF1eQOQ' %}

パスキーは同期されるため、別の端末でも利用することができます。パスキーが同期できない環境同士の場合は、端末を跨いでログインさせることができます。

ログインの際、ブラウザが「他の端末でログイン」のようなメニューを表示するので、これをタップすると QR コードを表示します。それをスマホでスキャンすると、ローカル認証が行われ、完了すると自動的にデスクトップ側のログインも完了します。

{% YouTube '8D84Yosw-Ws' %}

Chrome では端末を覚えておいてくれるので、二度目以降は QR コードをスキャンしなくとも、端末名をタップして指定することができます。もちろん、その後デスクトップで新しくパスキーを作れば、スマホがなくてもログインできるようになります。

[こちらのデモ](https://passkey-form-demo.glitch.me)で実際に試して頂くことができます。

## パスキーの何がパスワードよりも優れているのか

### パスキーはフィッシングに強い {:#phishing}

パスキーはクレデンシャルと共に、作られたサイトのドメインがメタデータとして保存されます。そのため、認証の際は、ドメインが一致しないと認証できません。これは実質的にフィッシングを不可能にするのと同時に、ユーザーが URL を気にしなくて良くなるというメリットもあります。

### パスキーはローカルで認証する {#luv}

パスキーのローカル認証はリモート攻撃に耐性があります。

パスキーを作ったり、パスキーでログインする際、デバイスのスクリーンロックを使い、解除するのと同じ方法で認証を行います。Android であれば指紋認証、顔認証、もしくは PIN やパターン。iOS / iPadOS であれば Touch ID、Face ID、もしくは パスコード。macOS であれば Touch ID もしくはパスワードで、Windows であれば Windows Hello もしくは PIN です。これはネットワークに直接クレデンシャルを送らず、ユーザーの使っているデバイス上で行われる認証で、「ローカル認証」と呼ばれます。

パスキー作成時は、ローカル認証をトリガーに新しい公開鍵ペアが作られ、秘密鍵はデバイスに、公開鍵はサーバーに送られ保存されます。パスキーとは、実質的にこの秘密鍵とそのメタデータを指しています。その後パスキーは同期され、他の端末からでも利用できるという仕組みです。

パスワードであればユーザーの入力した文字列をサーバーに送ることでリモート認証を行うところですが、パスキーのログインではローカル認証をトリガーに署名を生成し、それをサーバーに送ることで行われます。サーバーはそのパスキーを作った時に保存していた公開鍵を使って署名を検証し、認証します。

ローカル認証とサーバーでの署名検証で、合計二回認証していることにお気付きでしょうか？つまり、パスキーは単体で生体認証 (もしくは知識認証) と所有認証の二要素認証を行っているのです。パスキーはパスワードと違い、単体でも強度があり、漏れにくく、再利用もできない認証なのでです。

### パスキーはデバイス間で同期が可能 {#synchronization}

パスキーの最も大きな特徴が、デバイス間で同期できる点です。

従来の FIDO では、あるデバイスで作られたクレデンシャルは、同じデバイスでしか使えませんでした。リモート攻撃ができないという意味で、攻撃者は物理的にターゲットのデバイスにアクセスしない限り、手も足も出せないことになります。しかしこれでは新しいデバイスに移行する際、[使い勝手の面でも、セキュリティ面でも](#security)問題がありました。パスキーの同期は、そういった問題点をまるっと解決します。

ただし、パスキーの同期は同じエコシステム内に限られます。「同じエコシステム」とは、Google、Apple、Microsoft を代表とするそれぞれのプラットフォームが持つパスワードマネージャーなどの仕組みを指します。例えば Apple であれば iCloud Keychain を、Google であれば Google Password Manager を介してパスキーが同期されます (Microsoft は 2022 年 12 月現在パスキーの対応を正式に表明していないため不明)。

Apple は垂直統合しているので Apple デバイス以外で Safari は動かず、基本的にはすべて Apple ID を軸に iCloud Keychain で同期されることになります。Google Chrome は Android デバイス間で Google アカウントを軸に Google Password Manager を使って同期しますが、他の OS 上ではパスキーの同期は行われません。なお、Google は Apple や Microsoft が同期用の API を利用可能にした時点で、そのエコシステム上を使ってパスキーを同期する予定であることを[表明しています](https://developers.google.com/identity/passkeys/supported-environments#chromes_passkey_support_on_different_operating_systems)。

{% Aside %}

Android は将来的にサードパーティのパスワードマネージャーがパスキーを同期することをサポートするとも表明していますので、1Password などのパスキー対応を表明しているパスワードマネージャーが Android 上で使えるようになる可能性があります。

{% endAside %}

### アカウントセレクターが使える {#account-selector}

厳密には Safari や デスクトップ Chrome では以前から使えていた機能ではありますが、Android が対応したことで、アカウントセレクターの機能がパスキーの使い方の代表的なものとして数えられるようになりました。これは WebAuthn では Discoverable Credentials (旧 [Resident Key](/2019/03/fido-webauthn.html#resident-key)) と呼ばれるもので、パスキーにメタデータとしてユーザー情報を保存することにより、アカウントセレクターの UI を利用可能にします。ユーザーは自分でユーザー名をタイプすることなく、アカウントを選択するタップとローカル認証だけでログインが可能になります。パスワードどころかユーザー名も忘れてしまうユーザーにとっては、これでユーザビリティは大きく向上します。

### スマホでログインできる {#sign-in-with-a-phone}

ユーザー体験のところで説明したスマホでログインできる機能です。

Google アカウントでは以前から[スマートフォンをセキュリティキーとして登録し、二要素認証する](https://support.google.com/accounts/answer/9289445?hl=ja)機能がありました。この機能は FIDO 準拠の仕組みで、Google アカウント以外でも利用できるよう拡張されました。それが、QR コードを介して別のブラウザからログインできる機能の正体です。以前 [caBLE](/2019/03/fido-webauthn.html#cable) と呼ばれていましたが、現在は hybrid に名前が変わっています。

Hybrid は元々標準化を前提に作られていたため、同様の機能はパスキーと同時に Safari に実装されました。これにより、macOS 上の Safari に Android を使ってログインすることも、Windows 上の Chrome に iPhone を使ってログインすることも可能になりました。

{% Aside %}

Google の二段階認証には[プッシュ通知を送ってログインを許可する](https://support.google.com/accounts/answer/6361026?hl=ja)似た機能がありますが、これは独自の仕組みです。

{% endAside %}

## パスキーに関する考察

### プライバシー {#privacy}

ウェブサイトでいきなり生体認証が求められた時、この指紋なり顔なりの情報がどこに行くのか、疑問に思うエンドユーザーは少なくないと思います。特にパスキーが普及し始め、ユーザーが慣れないうちは、指紋の情報や顔の情報をが集められ監視されるかもしれないとか、サービスがハックされて漏れたら悪人の手に渡ってしまう、といった恐怖を感じるのはごく自然なことだと思います。

FIDO では、生体情報は認証器となるデバイスに保存し、サーバーなどに送信してはならないという[きまり](https://fidoalliance.org/wp-content/uploads/FIDO_Authentication_and_GDPR_White_Paper_May2018-1.pdf)がありますので、少なくとも FIDO Certified な認証器を使う限り ([Android はこれに含まれます](https://prtimes.jp/main/html/rd/p/000000008.000037279.html)。iPhone もおそらく含まれますが、ソースを見つけられませんでした。)、これは守られる原則ですので安心してください。

また、パスキーを作成してサービスに渡される情報は、公開鍵とクレデンシャル ID というどちらもサイトごとに払い出される、それ自体意味を持たないバイト列です。クレデンシャル ID は認証する際に使える認証器を制限したり、サーバーが認証した署名と一致する公開鍵を探す際に使用します。公開鍵は認証時に送られてくる署名を検証するために使われます。ですので、ユーザーのメールアドレスや名前などの個人情報と組み合わせて登録しない限り、パスキーでサイトを跨いでユーザーをトラッキングするようなことはできません。

パスキーは、特に初期はエンドユーザーにとって心理的ハードルが高い認証方法かもしれないので、サービス提供側はそれに寄り添った安心材料をしっかり用意してあげる必要があるのではないかと思います。

### パスキーの同期は正しいことなのか {#security}

FIDO は公開鍵暗号方式を使った所有認証が基本です。認証器に物理的にアクセスできない限り、認証を突破するのは難しいというのがポイントでした。ところが、パスキーはこれを同期可能にし、複数端末で利用可能にしました。この点について、[NIST SP800-63B で定義されている AAL3 (Authenticator Assurance Level 3)](https://pages.nist.gov/800-63-3-Implementation-Resources/63B/AAL/) から外れてしまうという懸念が挙げられます。

とはいえ、じゃあデバイスと固く紐付いたクレデンシャル以外を認めないと、新しいデバイスに移行する際:

* クレデンシャルを作ったすべてのアカウントを移行しなければならない
* FIDO 以外のフィッシングに弱い方法で新しい端末にログインしなければならない

といった問題があります。

パスワードを使い続けるのは論外として、利便性も悪くフィッシングに弱い認証方法を残さざるをえない従来の FIDO クレデンシャルと、利便性は高いがリスクが若干増してしまうパスキーと、どちらを選ぶべきかという話になります。ここはニーズで使い分けるのがベストではないかと思います。

例えばソーシャルメディアやニュースアプリのような、コンシューマ向けのサービスであれば、アカウントが乗っ取られたとしても経済的被害はそれほど甚大ではないため、パスキーの利便性を取る方が懸命でしょう。

逆に機密情報を扱うエンタープライズや、お金を扱う銀行やウォレットアプリなどでは、大きな経済的被害が出る可能性があるため、多少利便性が低くてもデバイスと紐付けておきたいでしょう。

Chrome では、Discoverable Credentials を有効にしてパスキーを作れば同期され、無効にして作れば従来の FIDO クレデンシャルとして同期されない、という使い分けが可能です。Safari ではすべてのクレデンシャルがパスキーとなり同期されるため、エンタープライズなどでは使いづらいかもしれません (二要素認証にしてセキュリティキーを使えばいい、という割り切りなのかもしれません)。

### Device Public Key {#dpk}

もう一つのオプションとして、パスキーとデバイスに紐付いた FIDO クレデンシャルのいいとこ取りをするための、[Device Public Key という Extension](https://w3c.github.io/webauthn/#sctn-device-publickey-extension) が提案されています。これはパスキーと一緒にデバイス特有のもうひとつの公開鍵ペアを作ることで、パスキーがすでに登録されているデバイスかをサーバー上で検知できるようにする仕組みです。これを使えば、パスキーの使い勝手とデバイスに紐付いた FIDO クレデンシャル両方のいいとこ取りができるかもしれないと期待されています。

ただし、現時点で Device Public Key は Android に実装が予定されているものの、Apple デバイスで使えるようになるかはまだアナウンスされていません。Microsoft の動向も含めて、今後に注目です。

## まとめ

FIDO はパスキーの登場でいよいよ実用段階に入ってきました。上記のような問題に加え、[Firefox が未サポート](https://bugzilla.mozilla.org/show_bug.cgi?id=1530370)なことや、同期環境にまだ改善の余地があることなど、まだ課題も残ってはいますが、時間が解決していくものと思われます。すでに [PayPal](https://newsroom.paypal-corp.com/2022-10-24-PayPal-Introduces-More-Secure-Payments-with-Passkeys) や [Yahoo! JAPAN](https://support.yahoo-net.jp/SccLogin/s/article/H000004626) など、実戦に投入しているサービスもあります。

いくつか資料を挙げておきます:

* Google 公式ドキュメント: [Passwordless login with passkeys](https://goo.gle/passkeys)
* Apple 公式ドキュメント: [Authenticating a User Through a Web Service](https://developer.apple.com/documentation/authenticationservices/authenticating_a_user_through_a_web_service)
* [Create a passkey for passwordless logins](https://web.dev/passkey-registration/)
* [Sign in with a passkey through form autofill](https://web.dev/passkey-form-autofill/)

2023 年はますますパスキーの実装が加速していくことを期待しています。

## DevFest & Android Dev Summit Japan 2022 が開催されます

最後に宣伝です。今週金曜日 12 月 16 日に Google オフィスにて、[DevFest & Android Dev Summit Japan 2022](https://developersonair.withgoogle.com/events/adsjapan_2022) が開催されます。ウェブに加えて Flutter、Firebase、Android についてもたくさんのセッションが行われます。

ウェブだけでも Google Developers Expert の[よしこさん](https://twitter.com/yoshiko_pg)、[矢倉さん](https://twitter.com/myakura)、Chrome チームの PM [Kenji Baheux](https://twitter.com/KenjiBaheux)、Chrome Developer Relations チームリードの [Paul Kinlan](https://twitter.com/Paul_Kinlan) (video) の他、チームメイトの 
[Milica Mihajlija](https://twitter.com/bibydigital)、[Adriana Jara](https://twitter.com/tropicadri)、[Jhey Tompkins](https://twitter.com/jh3yy) という豪華なラインナップでのセッションが予定されています。僕もこの記事のテーマであるパスキーについてお話する予定です。

それぞれのセッションに関する込み入った質問があるという方はぜひ、会場で直接お話しましょう。ハイブリッドなので[こちらから申し込めばライブ配信もご覧いただけます](https://gdg-tokyo.connpass.com/event/266648/)。みなさんの参加をお待ちしています！

Photo by <a href="https://unsplash.com/@fess0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Filip Szalbot</a> on <a href="https://unsplash.com/s/photos/keys?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
