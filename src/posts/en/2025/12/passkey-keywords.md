---
layout: post
lang: en
title: Key terminologies to get a grasp of passkeys
description:
date: 2025-12-14
organic: 50
image:
  feature: 2025/passkey-keywords.jpg
tags:
  - Passkey
---

At the [FIDO Tokyo Seminar](https://fidoalliance.org/event/fido-tokyo-seminar/), I was told it's hard to track the high-level picture of how passkeys are evolving, and I thought it would be helpful to introduce key terminologies so you can get a grasp of the passkey world and look into more details when necessary. So here it is.

<!-- excerpt -->

## Basics

### Authenticator {: #authenticator }

An authenticator is a device that stores and manages passkeys. It can be a hardware security key, a password manager (passkey provider), or a mobile device. In this article, a "password manager" represents authenticators (because it's the most frequently used authenticator).

### Relying Party (RP) {: #rp }

A relying party is a website or application that requests passkeys from the user. It is responsible for verifying the user's identity and storing the public keys.

### RP ID {: #rp-id }

RP ID (Relying Party Identifier) is the domain name of the website requesting the passkey. It defines the scope of the credential, ensuring that a passkey created for `example.com` cannot be used on `evil.com`. It must be a valid domain string and a suffix of the current origin.

- [PublicKeyCredentialCreationOptions - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions#id_2)

### Discoverable Credentials {: #discoverable-credentials }

Discoverable credentials (formerly known as "Resident Keys") are passkeys that are stored on the password manager along with the user's account information (like username and display name). They enable "username-less" authentication flows, where the user just clicks "Sign in" and selects their account from a list provided by the password manager.

- [Discoverable credentials deep dive | web.dev](https://web.dev/articles/webauthn-discoverable-credentials)

### User Verification {: #user-verification }

User verification refers to the process of verifying that the person authenticating is the actual owner of the password manager, typically via a biometric check (fingerprint, face ID) or a PIN. A user verification happens locally, so information such as biometric data or PIN is not sent to the server.

- [userVerification deep dive | web.dev](https://web.dev/articles/webauthn-user-verification)

### Attestation {: #attestation }

Attestation is a cryptographic proof provided by the authenticator during credential creation. It allows the RP to verify the make and model of the authenticator (e.g., "This is a YubiKey 5 NFC"). This is primarily used in enterprise or high-security contexts to enforce policies (e.g., "only allow hardware keys"). In general, passkeys on password managers don't support attestations.

- [FIDO TechNotes: The Truth about Attestation | FIDO Alliance](https://fidoalliance.org/fido-technotes-the-truth-about-attestation/)

### AAGUID {: #aaguid }

The AAGUID (Authenticator Attestation Globally Unique Identifier) is a 128-bit identifier indicating the type (model) of the authenticator. It allows RPs to identify the specific device being used (e.g., Google Password Manager, iCloud Keychain, Windows Hello, or a specific security key model) even without full attestation. It can be used to detect which password manager the passkey is created on to display the provider's icon, name, and other information by referencing [MDS](#mds), but verification is not possible, since passkeys on password managers don't support attestations.

- [Determine the passkey provider with AAGUID | web.dev](https://web.dev/articles/webauthn-aaguid)
- [Passkey Provider AAGUIDs](https://github.com/passkeydeveloper/passkey-authenticator-aaguids)

### MDS {: #mds }

The MDS (FIDO Metadata Service) is a centralized repository of information about FIDO authenticators. RPs can query the MDS using an AAGUID to retrieve details like the authenticator's certification status, icon, and supported features.

- [FIDO Metadata Service (MDS) Overview | FIDO Alliance](https://fidoalliance.org/metadata/)

## Implementation

### excludeCredentials {: #exclude-credentials }

`excludeCredentials` is a parameter that indicates a list of credential IDs that the server sends to the browser during the passkey creation process. It tells the password manager "if you already hold one of these credentials, don't create a new one." This prevents creating multiple passkeys for the same account on the same password manager.

- [Prevent creating a new passkey if one exists | web.dev](https://web.dev/articles/webauthn-exclude-credentials)

### Conditional mediation {: #conditional-mediation }

Also known as "Conditional UI" or "Conditional Get", this feature allows passkeys to be offered in the browser's autofill suggestions on standard username input fields. It enables a seamless transition from passwords to passkeys by letting users sign in with a passkey directly from the form they are used to.

- [Sign in with a passkey through form autofill | web.dev](https://web.dev/articles/passkey-form-autofill)

### Signal API {: #signal-api }

The Signal API allows RPs to communicate the state of a credential back to the password manager. For example, if a user deletes their account or a public key on the server, the RP can signal this so the passkey can be removed or updated on the supporting password manager as well.

- [Keep passkeys consistent with credentials on your server with the Signal API | Identity | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-signal-api)

### Related Origin Request {: #related-origin-request }

Related Origin Request allows a website to accept passkeys that were created for a different, but related, origin. This is useful for multi-domain deployments (e.g., `example.com` and `shop.example`) or country-specific deployments (e.g., `example.com` and `example.co.jp`).

- [Allow passkey reuse across your sites with Related Origin Requests | web.dev](https://web.dev/articles/webauthn-related-origin-requests)
- [Related Origin Requests](https://passkeys.dev/docs/advanced/related-origins)

### getClientCapabilities {: #get-client-capabilities }

`getClientCapabilities` allows RPs to query the browser to see which WebAuthn features are supported on the current device. It helps in making decisions about the UX, such as checking if `conditional` mediation is supported before setting up the form.

- [Simpler WebAuthn feature detection | web.dev](https://web.dev/articles/webauthn-client-capabilities)

### Client Hints {: #client-hints }

Client Hints allows RPs to provide a hint to the browser about which type of authenticator the user is expected to use (e.g., `security-key` or `client-device`). This helps the browser to show a more relevant UI to the user, improving the user experience especially in enterprise environments where specific authenticators are required. Note that this is only a hint and does not enforce security policies.

- [Client Hints | passkeys.dev](https://passkeys.dev/docs/advanced/client-hints/)

### Passkey endpoint {: #passkey-endpoints }

Passkey endpoint refers to a mechanism (often involving a `.well-known` file) that allows RPs to signal to password managers (like Google Password Manager) that they support passkeys. This enables the password manager to proactively suggest upgrading an existing password account to a passkey.

- [Promote passkey upgrades in Google Password Manager | Web guides | Google for Developers](https://developers.google.com/identity/passkeys/developer-guides/upgrades)
- [Passkey Endpoints](https://www.w3.org/TR/passkey-endpoints/)

### Conditional creation {: #conditional-creation }

Also known as "Automatic passkey upgrade" or "Automatic passkey creation". An emerging feature that allows RPs to piggyback the passkey creation request onto a password sign-in or other user action. If the user successfully signs in with a password, the browser can automatically (or with minimal friction) create a passkey for future use.

- [Help users adopt passkeys more seamlessly | Identity | Chrome for Developers](https://developer.chrome.com/docs/identity/webauthn-conditional-create)

### Immediate mediation {: #immediate-mediation }

A proposed feature that immediately returns an error when a credential request is canceled or failed. This allows the RP to improve the user experience by not showing a QR code or other authentication methods and control the fallback authentication method.

- [Origin trial: WebAuthn immediate mediation for frictionless sign-in | Blog | Chrome for Developers](https://developer.chrome.com/blog/webauthn-immediate-mediation-ot)

## Finally

If you think this article is missing any important keywords, please let me know via @agektmr.
