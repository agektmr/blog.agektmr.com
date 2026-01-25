---
layout: post
lang: ja
title: WebAuthn DevTools のご紹介
description: Chrome DevTools に新しく追加された WebAuthn タブについて解説します。仮想認証器を作成して、WebAuthn のデバッグを効率化する方法を学びましょう。
date: 2026-01-25
updated: 2026-01-25
organic: 90
image:
  feature: /2026/webauthn-devtools-featured.jpg
tags:
  - Chrome
  - DevTools
  - Chrome Extension
  - WebAuthn
  - Security
---

自分でパスキーを実装する際や、他のウェブサイトでパスキーがどのように動作しているか調査したい際、デバッガーをセットしてリクエストやレスポンスをキャプチャーしたり、バイナリを解析して中身を読み取るのは簡単ではありません。WebAuthn DevTools という Chrome Extension を使えば、それを簡単に実現できます。

<!-- excerpt -->

## WebAuthn DevTools とは

[WebAuthn DevTools](https://chromewebstore.google.com/detail/webauthn-devtools/ogpaejcbmlcjnkcbnfmdfheifgodnnec) は、Chrome Extension で、WebAuthn のデバッグを効率化するツールです。

{% ImageFigure '/images/2026/webauthn-devtools-chromewebstore.jpg', 'WebAuthn DevTools は Chrome Web Store からインストール可能', 'max-width: 600px; margin: 0 auto 30px;' %}

WebAuthn が使われているページ上で Chrome DevTools を立ち上げて、"WebAuthn" タブを選択するだけですぐに使えるようになります。

左側のパネルには実行された WebAuthn の命令が表示され、右側にはそのリクエストとレスポンスが詳細に表示されます。

{% ImageFigure '/images/2026/webauthn-devtools.jpg', 'WebAuthn Devtools の画面', 'max-width: 600px; margin: 0 auto 30px;' %}

特に `navigator.credentials.get()` や `navigator.credentials.create()` のレスポンスは、バイナリを含むため、デコードして中身を読み取るのが面倒なのですが、WebAuthn DevTools はその場で解析済みの情報を表示してくれます。[AAGUID であれば対応するパスワードマネージャーの名前も表示してくれます。](https://web.dev/articles/webauthn-aaguid)

{% ImageFigure '/images/2026/webauthn-devtools-response-details.jpg', 'WebAuthn DevTools のレスポンス詳細', 'max-width: 600px; margin: 0 auto 30px;' %}

また、一部のパラメーターには簡単な説明と、より詳細な内容を学べるリンクが表示されます。

{% ImageFigure '/images/2026/webauthn-devtools-infolink.jpg', 'WebAuthn DevTools に表示される解説', 'max-width: 400px; margin: 0 auto 30px;' %}

## まとめ

[ソースコードは GitHub に公開しています](https://github.com/agektmr/webauthn-devtools)。今後 Safari 版および Firefox 版も検討しています。パスキーや WebAuthn に興味ある方が、ちょっとした調査やデバッグする際にお手軽に使えるツールです。ぜひ使ってみてください。
