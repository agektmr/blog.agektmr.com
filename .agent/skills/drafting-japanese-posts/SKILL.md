---
name: drafting-japanese-posts
description: Use when drafting or expanding Japanese blog posts in src/posts/ja/ or turning outlines and notes into full articles in the author's voice
---

# Drafting Japanese Posts in the Author's Voice

## Overview

This skill guides the creation and expansion of Japanese blog posts for `blog.agektmr.com`. It captures the author's (@agektmr) distinctive writing style: pragmatic, technically authoritative, empathetic to developer and user struggles, and candid about ecosystem tradeoffs.

## When to Use

- Writing a new draft in `src/posts/ja/YYYY/MM/<slug>.md`
- Expanding a bullet-point outline or notes into a full narrative article
- Refining or polishing a rough Japanese draft to match the author's authentic voice

## Tone & Voice Profile

The author is a Google Developer Advocate specialized in Web standards, WebAuthn, FIDO, passkeys, and modern browser platform capabilities.

### 1. Register & Sentence Structure
- **丁寧語（です・ます調）**: Calm, professional, and accessible. Never overly stiff or corporate.
- **Sentence endings**: Natural variations such as `〜です`、`〜ます`、`〜でしょう`、`〜のではないでしょうか`、`〜と考えられます`、`〜かもしれません`、`〜と思います`、`〜てみてください`.
- **First-Person**: Use **「自分」** (e.g., `自分の観測範囲で見る限り`, `個人的なハイライト`) or **「我々」** when referring to a joint effort. Avoid 「私」 and 「僕」 in technical articles.
- **Direct reader engagement**: Address the reader respectfully as `みなさん` or `読者の方`.

### 2. Candid, Empathetic Perspective
- **Acknowledge real friction**: Don't shy away from user confusion or UX pitfalls (e.g., `「作ったはずのパスキーが見つからない」という声を目にします`, `ユーザーが頭を捻らないと使えないような機能は、普及どころか迷惑をかけてしまうため、望ましくありません`).
- **Fair assessment**: Present pros and cons honestly. Even when excited about a technology, acknowledge that the ecosystem may still be evolving (`まだ発展途上な部分が残っており、使いづらい部分があることも否定できません`).
- **Light touch of personal humor / self-deprecation**: Occasional conversational asides (e.g., `にっくき Docker`, `なんとなく使ってみたかったので`, `気の置けない愉快な仲間たち`).

### 3. Voice Comparison: Author vs Generic AI

| Generic AI Style (❌ AVOID) | Author Style (✅ USE) |
|---|---|
| 本記事では、最新のセキュリティ技術について徹底解説します！ | 最近、〜という声を目にします。そこでこの記事では〜について考えていきたいと思います。 |
| いかがでしたでしょうか？ぜひ活用してみましょう！ | パスキーの実装を検討し始めるなら今です。ぜひ使ってみてください。 |
| 〜は非常に革新的な技術であり、完璧なセキュリティを提供します。 | フィッシング詐欺を防ぐという一点において、他に選択肢がありません。ただし、〜という課題も残っています。 |
| 私たちは日々開発に勤しんでいますが、... | 自分の観測範囲で見る限り、... |
| 以上の点から、本ツールの導入を強く推奨します。 | ちょっとした調査やデバッグする際にお手軽に使えるツールです。ぜひ一度試してみてください。 |

## Article Structure Pattern

Every technical post typically follows this 5-stage progression:

```
1. Frontmatter
2. Lead / Abstract Paragraph (Hook + Goal of post)
   <!-- excerpt -->
3. Background & Problem Definition (Context, user perspective, why it matters)
4. Deep Dive / Structural Breakdown (Numbered points, mechanisms, trade-offs, figures)
5. Summary / Conclusion (Key takeaways, future outlook, call to action)
```

### Stage 1: Frontmatter Setup
Always start with frontmatter following this schema:
```yaml
---
layout: post
lang: ja
title: 記事タイトル
description: 120文字程度のSEO用概要文
date: YYYY-MM-DD
updated: YYYY-MM-DD
organic: 0 # Drafts generated or assisted by AI start at 0 or estimated human percentage
image:
  feature: /YYYY/slug-featured.jpg
tags:
  - WebAuthn
  - Passkey
  - Security
---
```

### Stage 2: Lead & Excerpt Marker
- Write 1–2 paragraphs setting the context: what the topic is, why the author is writing about it now (recent observation, event feedback, community discussion), and what this post covers.
- Insert `<!-- excerpt -->` immediately after the first paragraph.

### Stage 3: Background & Problem Definition
- Level-set expectations and define terms early.
- If introducing an English concept or acronym, include the pronunciation or reading on first mention:
  - Example: `Relying Party は、「リライングパーティー」と読み、ユーザーにパスキーを要求するウェブサイトまたはアプリケーションを指します。`
- Frame the problem from the perspective of real users and developers facing confusion or tradeoffs.

### Stage 4: Deconstruction & Numbered Breakdown
- Group thoughts into structured subsections using `##` and `###`.
- When multiple points or failure modes exist, enumerate them clearly:
  ```markdown
  このような状況が発生するのは、下記のような理由が考えられます：
  1. パスキーを保存したパスキープロバイダに、新しい環境からアクセスできない
  2. パスキープロバイダは使えるが、アカウントが異なっている
  ```
- Illustrate with code snippets, architecture flows, or screenshots using `{% ImageFigure %}`.

### Stage 5: Summary & Forward Outlook
- End with a `## まとめ` or `## 最後に` section.
- Provide a balanced summary, encouragement to test or implement, and links to specifications, GitHub repos, or related articles.

## Typography & Formatting Rules

- **Half-width spacing (半角スペース)**:
  - Always insert a half-width space before and after alphanumeric and English words:
    - ✅ `Chrome DevTools の WebAuthn タブ`
    - ❌ `Chrome DevToolsのWebAuthnタブ`
  - Do NOT insert spaces when adjacent to full-width punctuation or brackets:
    - ✅ `「パスキーのすべて」`
    - ✅ `（i18n）`
  - Numbers and dates also take half-width spaces:
    - ✅ `1 月 28 日`, `10 年以上`
- **Shortcodes**:
  - Images: `{% ImageFigure '/images/YYYY/filename.jpg', 'キャプション', 'max-width: 600px; margin: 0 auto 30px;' %}`
  - Callouts: `{% Aside %}補足や注意点{% endAside %}`
  - YouTube: `{% YouTube "videoId" %}`

## Example: Converting Outline Notes into Author's Voice

### Input (Raw Outline)
```markdown
## パスキーにアクセスできない時はどうする！？
問題はパスキーにアクセスできなくなった状況でどうするか
パスキーが最強の認証方法だとしたら、他にどんな選択肢があるのか？
利便性を犠牲にしてセキュリティを取る
他の認証方法に頼る
```

### Output (Author's Voice)
```markdown
## パスキーにアクセスできない時はどうする！？

ここで問題になるのが、「パスキーにアクセスできなくなった状況でどうするか」という点です。

パスキーがフィッシング耐性を持つ最強の認証方法だとしたら、万が一デバイスの紛失や同期トラブルでそれが使えなくなったとき、一体どんな選択肢が残されているのでしょうか。利便性を犠牲にしてでもセキュリティを最優先するのか、あるいはフォールバックとして別の認証方法に頼るのか。認証体験を設計する上で、ここは避けて通れない最大の難所と言えます。
```

## Red Flags - STOP and Revise

If you spot any of the following, rewrite the section immediately:

- ❌ "本記事では〜をご紹介します！" (Overly enthusiastic standard web-marketing tone)
- ❌ "〜について徹底解説していきます" (Generic SEO blog style)
- ❌ "いかがでしたでしょうか？" (Typical automated template ending)
- ❌ Using "私" or "僕" instead of "自分" or passive/objective phrasing
- ❌ Hiding or glossing over technical limitations, bugs, or UX friction points
- ❌ Missing half-width spaces around English words and numbers
- ❌ Missing `<!-- excerpt -->` after the lead paragraph
