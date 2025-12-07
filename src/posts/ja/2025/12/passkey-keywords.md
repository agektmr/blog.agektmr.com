---
layout: post
lang: ja
title: パスキーを理解するための重要な用語
description: 
date: 2025-12-08
organic: 50
image:
  feature:
tags:
  - Passkey
translationOf: /2025/12/passkey-keywords.html
translated: 2025-12-07
translatedManually: false
---
[FIDO 東京セミナー](https://fidoalliance.org/event/fido-tokyo-seminar/)で、パスキーの進化の全体像を把握するのは難しいという話を聞きました。そこで、パスキーの世界を理解し、必要に応じて詳細を調べるために、重要な用語を紹介したいと思います。そこで、ここにその用語をご紹介します。

<!-- excerpt -->

### 認証子 {: #authenticator }

認証デバイスとは、パスキーを保存・管理するデバイスです。ハードウェアセキュリティキー、パスワードマネージャー（パスキープロバイダー）、モバイルデバイスなどが挙げられます。この記事では、認証デバイスの中でも「パスワードマネージャー」が最もよく利用されるため、認証デバイスを総称して「パスワードマネージャー」と呼んでいます。

### 依存パーティ (RP) {: #rp }

証明書利用者とは、ユーザーにパスキーを要求するウェブサイトまたはアプリケーションのことです。証明書利用者は、ユーザーの本人確認とパスキーの保存を担当します。

### RP ID {: #rp-id }

RP ID（Relying Party Identifier）は、パスキーを要求するウェブサイトのドメイン名です。これは認証情報のスコープを定義し、`example.com` 用に作成されたパスキーが `evil.com` では使用できないことを保証します。有効なドメイン文字列と、現在のオリジンのサフィックスでなければなりません。

- [PublicKeyCredentialCreationOptions - Web API | MDN](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions#id_2)

### excludeCredentials {: #exclude-credentials }

`excludeCredentials` は、パスキー作成プロセス中にサーバーがブラウザに送信する認証情報IDのリストを示すパラメータです。このパラメータは、パスワードマネージャーに「これらの認証情報のいずれかを既に保持している場合は、新しい認証情報を作成しない」ように指示します。これにより、同じパスワードマネージャーで同じアカウントに複数のパスキーが作成されるのを防ぎます。

- [パスキーが存在する場合は新しいパスキーを作成しないようにする  |  web.dev](https://web.dev/articles/webauthn-exclude-credentials)

### 検出可能な資格情報 {: #discoverable-credentials }

検出可能な認証情報（旧称「Resident Keys」）は、ユーザーのアカウント情報（ユーザー名や表示名など）と共にパスワードマネージャーに保存されるパスキーです。これにより、「ユーザー名レス」認証フローが可能になります。ユーザーは「サインイン」をクリックし、パスワードマネージャーが提供するリストからアカウントを選択するだけで済みます。

- [検出可能な資格情報の詳細 | web.dev](https://web.dev/articles/webauthn-discoverable-credentials)

### ユーザー認証 {: #user-verification }

ユーザー認証とは、認証する人がパスワードマネージャーの実際の所有者であることを確認するプロセスを指します。通常は生体認証（指紋、顔ID）またはPINを用いて行われます。ユーザー認証はローカルで行われるため、生体認証データやPINなどの情報はサーバーに送信されません。

- [userVerification の詳細 | web.dev](https://web.dev/articles/webauthn-user-verification)

### 証明 {: #証明 }

アテステーションとは、認証情報の作成時に認証器によって提供される暗号的証明です。これにより、RPは認証器のメーカーとモデルを検証できます（例：「これはYubiKey 5 NFCです」）。これは主に、企業や高度なセキュリティが求められる環境で、ポリシー（例：「ハードウェアキーのみを許可する」）を強制するために使用されます。一般的に、パスワードマネージャーのパスキーはアテステーションをサポートしていません。

- [FIDO テクニカルノート: 認証の真実 | FIDO アライアンス](https://fidoalliance.org/fido-technotes-the-truth-about-attestation/)

### AAGUID {: #aaguid }

AAGUID（認証器構成証明グローバル一意識別子）は、認証器の種類（モデル）を示す128ビットの識別子です。これにより、RPは完全な構成証明がなくても、使用されている特定のデバイス（例：Googleパスワードマネージャー、iCloudキーチェーン、Windows Hello、特定のセキュリティキーモデル）を識別できます。[MDS](#mds)を参照することで、パスキーがどのパスワードマネージャーで作成されたかを検出し、プロバイダーのアイコン、名前、その他の情報を表示できますが、パスワードマネージャーのパスキーは構成証明をサポートしていないため、検証はできません。

- [AAGUIDでパスキープロバイダーを特定する | web.dev](https://web.dev/articles/webauthn-aaguid)
- [パスキープロバイダーのAAGUID](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

### MDS {: #mds }

MDS（FIDOメタデータサービス）は、FIDO認証子に関する情報を一元的に管理するリポジトリです。RPはAAGUIDを使用してMDSにクエリを実行し、認証子の認証ステータス、アイコン、サポートされている機能などの詳細を取得できます。

- [FIDOメタデータサービス（MDS）の概要 | FIDOアライアンス](https://fidoalliance.org/metadata/)

### 条件付き調停 {: #conditional-mediation }

「条件付きUI」または「条件付き取得」とも呼ばれるこの機能は、ブラウザの標準ユーザー名入力欄の自動入力候補にパスキーを表示できるようにします。これにより、ユーザーは使い慣れたフォームからパスキーを使って直接サインインできるため、パスワードからパスキーへのシームレスな移行が可能になります。

- [フォームの自動入力でパスキーを使用してサインインする  |  web.dev](https://web.dev/articles/passkey-form-autofill)

### シグナルAPI {: #signal-api }

Signal APIを使用すると、RPは認証情報の状態をパスワードマネージャーに返すことができます。例えば、ユーザーがサーバー上のアカウントまたは公開鍵を削除した場合、RPはこれを通知し、対応するパスワードマネージャーでもパスキーを削除または更新することができます。

- [Signal API を使用して、パスキーとサーバーの認証情報の一貫性を保つ | ID | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-signal-api)

### 関連オリジンリクエスト {: #related-origin-request }

関連オリジンリクエストを使用すると、ウェブサイトは、異なるが関連するオリジン用に作成されたパスキーを受け入れることができます。これは、マルチドメイン展開（例：`example.com` と `shop.example`）や国固有の展開（例：`example.com` と `example.co.jp`）に役立ちます。

- [関連オリジンリクエストでサイト間でパスキーの再利用を許可する | web.dev](https://web.dev/articles/webauthn-related-origin-requests)
- [関連オリジンリクエスト](https://passkeys.dev/docs/advanced/related-origins)

### getClientCapabilities {: #get-client-capabilities }

`getClientCapabilities` を使用すると、RP はブラウザにクエリを送信し、現在のデバイスでサポートされている WebAuthn 機能を確認できます。これは、フォームを設定する前に `conditional` メディエーションがサポートされているかどうかを確認するなど、UX に関する決定を下すのに役立ちます。

- [よりシンプルな WebAuthn 機能の検出 | web.dev](https://web.dev/articles/webauthn-client-capabilities)

### パスキーエンドポイント {: #passkey-endpoints }

パスキーエンドポイントとは、RPがパスワードマネージャー（Google パスワードマネージャーなど）にパスキーをサポートしていることを通知できるメカニズム（多くの場合、`.well-known` ファイルを含む）を指します。これにより、パスワードマネージャーは既存のパスワードアカウントをパスキーにアップグレードすることをプロアクティブに提案できるようになります。

- [Google パスワード マネージャーでのパスキーのアップグレードを促進する | ウェブ ガイド | Google for Developers](https://developers.google.com/identity/passkeys/developer-guides/upgrades)
- [パスキー エンドポイント](https://www.w3.org/TR/passkey-endpoints/)

### 条件付き作成 {: #conditional-creation }

「自動パスキーアップグレード」または「自動パスキー作成」とも呼ばれます。RPがパスワードによるサインインやその他のユーザーアクションにパスキー作成リクエストを付加できる新しい機能です。ユーザーがパスワードでサインインに成功すると、ブラウザは自動的に（または最小限の手間で）将来使用するためのパスキーを作成します。

- [ユーザーがパスキーをよりシームレスに導入できるようにする | ID | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-conditional-create)

### 即時調停 {: #immediate-mediation }

認証情報リクエストがキャンセルまたは失敗した場合に即座にエラーを返す機能の提案。これにより、RPはQRコードやその他の認証方法を表示せずにユーザーエクスペリエンスを向上させ、フォールバック認証方法を制御できるようになります。

- [オリジン トライアル: スムーズなログインを実現する WebAuthn の即時仲介 | ブログ | Chrome for Developers](https://developer.chrome.com/blog/webauthn-immediate-mediation-ot)