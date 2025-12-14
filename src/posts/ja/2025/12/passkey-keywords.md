---
layout: post
lang: ja
title: パスキーの全体像を把握するための用語集
description:
date: 2025-12-14
organic: 70
image:
  feature: 2025/passkey-keywords.jpg
tags:
  - Passkey
translationOf: /2025/12/passkey-keywords.html
translated: 2025-12-07
translatedManually: false
---
[FIDO 東京セミナー](https://fidoalliance.org/event/fido-tokyo-seminar/)で、パスキーの最新情報を紹介したのですが、全体像を把握するのが難しいという話を聞きました。インクリメンタルに進化するウェブ技術全般に言えることですが、全体像が分かれば、あとは穴を埋めるだけという意味で役に立つものです。そこで、2025 年末時点でパスキーの全体像を把握するのに欠かせないキーワードをまとめたので紹介したいと思います。

<!-- excerpt -->

## 基本編

### Authenticator {: #authenticator }

「オーセンティケーター」と読み、パスキーを保存・管理するデバイス全般を指します。Authenticator にはハードウェアセキュリティキー、パスワードマネージャー（パスキープロバイダー）、モバイルデバイスなどが含まれます。Authenticator の中でも「パスワードマネージャー」が最もよく利用されるため、この記事では便宜上 Authenticator を総称して「パスワードマネージャー」と呼びます。

### Relying Party (RP) {: #rp }

Relying Party は、「リライングパーティー」と読み、ユーザーにパスキーを要求するウェブサイトまたはアプリケーションを指します。RP は、ユーザーの認証と、公開鍵の保存を担当します。

### RP ID {: #rp-id }

RP ID（Relying Party Identifier）は、パスキーをリクエストするウェブサイトのドメイン名です。これはクレデンシャルのスコープを定義し、`example.com` 用に作成されたパスキーが `evil.com` では使用できないことを保証します。有効なドメイン文字列と、現在のオリジンのサフィックスでなければなりません。

- [PublicKeyCredentialCreationOptions - Web API | MDN](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions#id_2)

### Discoverable Credential {: #discoverable-credentials }

Discoverable Credential（「ディスカバラブル・クレデンシャル」旧称「Resident Keys」）は、ユーザーのアカウント情報（ユーザー名や表示名など）と共にパスワードマネージャーに保存されるパスキー（の一種）です。これにより、Usernameless（ユーザー名レス）フローが可能になります。ユーザーは「サインイン」をクリックし、パスワードマネージャーが提供するリストからアカウントを選択して [User Verification](#user-verification) するだけで認証することができます。

- [Discoverable Credential deep dive | web.dev](https://web.dev/articles/webauthn-discoverable-credentials)

### User Verification {: #user-verification }

User Verification（「ユーザーベリフィケーション」）とは、認証する人がパスワードマネージャーの実際の所有者であることを確認するプロセスを指します。通常は生体認証（指紋、顔認証、TouchID、FaceID、Windows Helloなど）またはPINを用いて行われます。User Verificationはローカルで行われるため、生体認証データやPINなどの情報はサーバーに送信されません。

- [userVerification deep dive | web.dev](https://web.dev/articles/webauthn-user-verification)

### Attestation {: #attestation }

Attestation（「アテステーション」）とは、クレデンシャルの作成時に Authenticator によって提供される暗号的証明です。これにより、RPは Authenticator のメーカーとモデルを検証できます（例：「これはYubiKey 5 NFCです」）。これは主に、企業や高度なセキュリティが求められる環境で、ポリシー（例：「ハードウェアキーのみを許可する」）を強制するために使用されます。一般的に、パスワードマネージャーのパスキーはアテステーションをサポートしていません。

- [FIDO TechNotes: The Truth about Attestation | FIDO Alliance](https://fidoalliance.org/fido-technotes-the-truth-about-attestation/)

### AAGUID {: #aaguid }

AAGUID（「エーグイド」と読む人もいます。Authenticator Attestation Globally Unique Identifier）は、 Authenticator の種類（モデル）を示す128ビットの識別子です。これにより、RPは完全な構成証明がなくても、使用されている特定のデバイス（例：Google パスワードマネージャー、iCloud キーチェーン、Windows Hello、特定のセキュリティキーモデル）を識別することができます。[MDS](#mds) を参照することで、パスキーがどのパスワードマネージャーで作成されたかを検出し、プロバイダーのアイコン、名前、その他の情報を表示できますが、パスワードマネージャーのパスキーは Attestation をサポートしていないため、検証できないことに注意が必要です。

- [Determine the passkey provider with AAGUID | web.dev](https://web.dev/articles/webauthn-aaguid)
- [Passkey Provider AAGUIDs](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

### MDS {: #mds }

MDS（FIDO メタデータサービス）は、FIDO 認証子に関する情報を一元的に管理するリポジトリです。RP は AAGUID を使用して MDS にクエリを実行し、Authenticator の Certificate ステータス、アイコン、サポートされている機能などの詳細を取得できます。

- [FIDO Metadata Service (MDS) Overview | FIDO Alliance](https://fidoalliance.org/metadata/)

## 実装編

### excludeCredentials {: #exclude-credentials }

`excludeCredentials` は、パスキー作成プロセス中にサーバーがブラウザに送信する認証情報IDのリストを示すパラメータです。このパラメータは、パスワードマネージャーに「これらの認証情報のいずれかを既に保持している場合は、新しい認証情報を作成しない」ように指示します。これにより、同じパスワードマネージャーで同じアカウントに複数のパスキーが作成されるのを防ぎます。

- [Prevent creating a new passkey if one exists | web.dev](https://web.dev/articles/webauthn-exclude-credentials)

### Conditional Mediation {: #conditional-mediation }

「コンディショナル・メディエーション」と読みます。"Conditional UI" または "Conditional Get" とも呼ばれるこの機能は、ブラウザに表示されたユーザー名用の input 要素のオートフィル候補にパスキーを表示できるようにします。これにより、ユーザーは使い慣れたフォームからパスキーを使って直接サインインできるため、パスワードからパスキーへのシームレスな移行が可能になります。

- [Sign in with a passkey through form autofill | web.dev](https://web.dev/articles/passkey-form-autofill)

### Signal API {: #signal-api }

Signal APIを使用すると、RPは認証情報の状態をパスワードマネージャーに返すことができます。例えば、ユーザーがサーバー上のアカウントまたは公開鍵を削除した場合、RPはこれを通知し、対応するパスワードマネージャーでもパスキーを削除または更新することができます。

- [Signal API を使用して、パスキーとサーバーの認証情報の一貫性を保つ | ID | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-signal-api)

### Related Origin Request {: #related-origin-request }

Related Origin Request を使用すると、同一の RP ID でも、異なる関連するオリジン用のパスキーを受け入れることができます。これは、マルチドメイン展開（例：`example.com` と `shop.example`）や国固有の展開（例：`example.com` と `example.co.jp`）に役立ちます。

- [Allow passkey reuse across your sites with Related Origin Requests | web.dev](https://web.dev/articles/webauthn-related-origin-requests)
- [Related Origin Requests](https://passkeys.dev/docs/advanced/related-origins)

### getClientCapabilities {: #get-client-capabilities }

`getClientCapabilities` を使用すると、RP はブラウザがサポートしている WebAuthn 機能を確認することができます。これは、フォームを設定する前に [Conditional Mediation](#conditional-mediation) がサポートされているかどうかを確認するなど、UX に関する決定を下すのに役立ちます。

- [Simpler WebAuthn feature detection | web.dev](https://web.dev/articles/webauthn-client-capabilities)

### Client Hints {: #client-hints }

Client Hints は、RP がブラウザに対して、ユーザーがどの種類の Authenticator を使用することが期待されているか（例：`security-key` や `client-device`）のヒントを提供できるようにします。これにより、ブラウザはユーザーにより適切な UI を表示できるようになり、特に特定の Authenticator が必須とされるエンタープライズ環境などでのユーザー体験が向上します。なお、これはあくまでヒントであり、セキュリティポリシーを強制するものではないことに注意してください。

- [Client Hints | passkeys.dev](https://passkeys.dev/docs/advanced/client-hints/)

### Passkey endpoint {: #passkey-endpoints }

Passkey endpoint とは、RP がパスワードマネージャー（Google パスワードマネージャーなど）にパスキーをサポートしていることを通知できるメカニズム（多くの場合、`.well-known` ファイルを含む）を指します。これにより、パスワードマネージャーは既存のパスワードアカウントをパスキーにアップグレードすることを積極的に提案できるようになります。

- [Promote passkey upgrades in Google Password Manager | Web guides | Google for Developers](https://developers.google.com/identity/passkeys/developer-guides/upgrades)
- [Passkey Endpoints](https://www.w3.org/TR/passkey-endpoints/)

### Conditional creation {: #conditional-creation }

"Automatic Passkey Upgrade または Automatic Passkey Creation とも呼ばれます。RP がパスワードによるサインインやその他のユーザーアクションにパスキー作成リクエストを付加できる機能です。ユーザーがパスワードでサインインに成功すると、ブラウザは [User Verification](#user-verification) なしで（または最小限の手間で）パスキーを作成します。

- [Help users adopt passkeys more seamlessly | Identity | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-conditional-create)

### Immediate Mediation {: #immediate-mediation }

「イミディエイト・メディエーション」と読みます。クレデンシャルのリクエストがキャンセルまたは失敗した場合に、即座にエラーを返す機能です。まだ提案段階にあります。QR コードやその他の認証方法を表示せずにクレデンシャルのリクエストを失敗させるため、RP はフォールバックの認証方法を制御できるようになり、ユーザーエクスペリエンスを向上させることができます。

- [Origin trial: WebAuthn immediate mediation for frictionless sign-in | Blog | Chrome for Developers](https://developer.chrome.com/blog/webauthn-immediate-mediation-ot)

## 最後に

何か重要なキーワードの見落としなどありましたら @agektmr までお知らせください。
