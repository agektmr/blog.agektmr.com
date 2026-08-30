# AGENTS.md

This document provides instructions and guidelines for AI agents working in this repository.

## Project Overview

This is a bilingual personal blog (Japanese primary, English secondary) by Eiji Kitamura ([@agektmr](https://github.com/agektmr)), built with Eleventy 2.0 and deployed to Google Cloud Run. The blog covers web authentication (passkeys, WebAuthn, FIDO), web platform APIs, browser features, and developer tools.

- **Static Site Generator**: Eleventy (11ty) 2.0.1
- **Asset Bundler**: Rollup (JS) + Dart Sass (SCSS)
- **Runtime / Server**: Node.js >= 22 with Express (for language negotiation and routing in production)
- **Package Manager**: `pnpm` (enforced via `preinstall: only-allow pnpm`)
- **Deployment**: Multi-stage Docker container deployed to Google Cloud Run via GitHub Actions

## Common Commands

Always use `pnpm` to run scripts and install dependencies:

```bash
# Install dependencies
pnpm install

# Start local development server with hot-reloading (http://localhost:8080)
pnpm start

# Build for production (Eleventy + Sass + Rollup)
pnpm run build

# Translate Japanese posts to English (uses Google Cloud Translation API)
pnpm run translate

# Translate and build together
pnpm run translate:build

# Run production Express server locally (after pnpm run build)
pnpm run start:server

# Debug Eleventy build
pnpm run debug
```

## Directory Structure & Routing

- `src/posts/ja/YYYY/MM/<slug>.md`: Japanese posts (primary source)
- `src/posts/en/YYYY/MM/<slug>.md`: English posts (translated)
- `src/images/YYYY/`: Post images organized by year (copied to `_site/images/` at build)
- `src/_includes/layouts/`: Nunjucks layouts (`base.njk`, `post.njk`, `page.njk`)
- `src/_includes/i18n/`: UI translation dictionaries (`ja.json`, `en.json`)
- `src/_data/`: Site configuration & metadata (`site.ja.json`, `site.en.json`, `languages.js`)
- `scripts/`: Utility scripts (e.g., `translate.js`, `migrate-to-ja.js`)
- `server/index.js`: Production Express server handling language detection and redirects

### URL Mapping
- Japanese posts: `/ja/YYYY/MM/<slug>.html` (canonical permalink; root `/` redirects based on language negotiation)
- English posts: `/en/YYYY/MM/<slug>.html`
- RSS feeds: `/ja/feed.xml` (or `/feed.xml`) and `/en/feed.xml`

## Post Format & Frontmatter

Every article must start with YAML frontmatter and follow this schema:

```yaml
---
layout: post
lang: ja # 'ja' or 'en'
title: '記事タイトル / Article Title'
description: 'SEO用記事概要 / SEO meta description'
date: YYYY-MM-DD
updated: YYYY-MM-DD
organic: 100 # Percentage of human-written content (0-100)
image:
  feature: /YYYY/image-name.jpg # Note: starts with /YYYY/ (relative to /images)
tags:
  - WebAuthn
  - Security
---
```

### Translated Post Frontmatter Additions
When creating or updating a translated post, add these fields to the frontmatter:

```yaml
translationOf: /YYYY/MM/<slug>.html
translated: YYYY-MM-DD
translatedManually: true
```

### Excerpt Separator
Always insert `<!-- excerpt -->` immediately after the first paragraph (the abstract):

```markdown
パスキーの実装やデバッグに関する概要説明文がここに入ります。

<!-- excerpt -->

## 最初の見出し
```

## Custom Nunjucks Shortcodes

Use these custom shortcodes in markdown files instead of raw HTML:

- **YouTube**: Embed a YouTube video responsive wrapper
  ```liquid
  {% YouTube "videoId" %}
  ```
- **ImageFigure**: Image with caption and optional styling
  ```liquid
  {% ImageFigure "/images/YYYY/image.jpg", "Caption text", "max-width: 600px; margin: 0 auto 30px;" %}
  ```
- **VideoFigure**: Video with caption
  ```liquid
  {% VideoFigure "/assets/video.mp4", "Caption text" %}
  ```
- **Aside**: Aside / callout container
  ```liquid
  {% Aside %}
  補足情報や注意事項をここに記載します。
  {% endAside %}
  ```

## Writing & Typography Conventions

- **Japanese Spacing**: In Japanese text, append a half-width space before and after alphanumeric / English words, except when adjacent to punctuation or symbols (conforming to `.textlintrc` / `preset-ja-spacing`).
  - Example: `Chrome DevTools の WebAuthn タブ` (Correct) vs `Chrome DevToolsのWebAuthnタブ` (Incorrect)
- **Style Guide**: Follow Google Developer Documentation Style Guide principles where applicable.

## Image Guidelines

- **Aspect Ratio**: Featured images must have a **16:9** aspect ratio.
- **Resolution**: Featured images must be at least **1080p** (1920x1080).
- **Location**: Place images under `/src/images/<YYYY>/` and name them descriptively based on the post slug (e.g., `/src/images/2026/my-post-featured.jpg`).
- **Frontmatter Reference**: In frontmatter `image.feature`, use the path starting from the year `/<YYYY>/<image-name>.jpg` (because the template prefixes `site.imagepath` which is `/images`). In markdown shortcodes (`ImageFigure`), use `/images/<YYYY>/<image-name>.jpg`.

## Translation Guidelines

- **Language Direction**: Translate Japanese articles to English, and English articles to Japanese when requested.
- **Destination Path**: Place translated articles in `src/posts/<target-lang>/<YYYY>/<MM>/<slug>.md` with the exact same filename and month structure as the source.
- **Update Existing**: Before creating a translated article, check if the file already exists at the destination. If it exists, update the translation rather than creating a duplicate.
- **Link Titles**: Do not translate external link titles or official English resource titles.
- **Metadata**: Set `translationOf: /<YYYY>/<MM>/<slug>.html`, `translated: <YYYY-MM-DD>`, and `translatedManually: true` in the frontmatter.
