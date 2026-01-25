# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual personal blog (Japanese primary, English secondary) built with Eleventy 2.0.1 and deployed to Google Cloud Run. The blog covers topics like web authentication (passkeys, WebAuthn, FIDO), web platform APIs, and developer tools.

## Common Commands

```bash
# Install dependencies (requires pnpm)
pnpm install

# Development server with hot reload
pnpm start              # http://localhost:8080

# Build for production
pnpm run build          # Runs eleventy + rollup

# Translate Japanese posts to English
pnpm run translate      # Uses Google Cloud Translation API

# Translate and build
pnpm run translate:build

# Test production server locally
pnpm run start:server   # After build, runs Express server

# Debug mode
pnpm run debug
```

## Architecture

### Build Pipeline
1. **Eleventy** processes markdown/njk templates from `src/` → `_site/`
2. **Rollup** bundles JavaScript (`src/scripts/`) and compiles SCSS (`src/styles/`) → `_site/`

### Directory Structure
- `src/posts/ja/YYYY/MM/` - Japanese posts (primary)
- `src/posts/en/YYYY/MM/` - English posts (translated)
- `src/_includes/layouts/` - Nunjucks layouts (base.njk, post.njk, page.njk)
- `src/_includes/i18n/` - UI translation strings (ja.json, en.json)
- `src/_data/` - Site metadata (site.ja.json, site.en.json, languages.js)
- `src/images/YYYY/` - Post images by year
- `server/index.js` - Express server for language detection in production

### URL Structure
- Japanese: `/ja/YYYY/MM/slug.html` (no prefix in production root)
- English: `/en/YYYY/MM/slug.html`
- RSS feeds: `/feed.xml` (Japanese), `/en/feed.xml` (English)

### Language-specific Collections
- `posts_ja` - Japanese posts collection
- `posts_en` - English posts collection

## Post Frontmatter Format

```yaml
---
layout: post
lang: ja  # or 'en'
title: 'Post Title'
description: 'Post description for SEO'
date: YYYY-MM-DD
image:
  feature: /YYYY/image-name.jpg  # Relative to /src/images
tags:
  - Tag1
  - Tag2
---
```

## Shortcodes (use in markdown)

- `{% YouTube "videoId" %}` - Embed YouTube video
- `{% ImageFigure "src", "caption", "style" %}` - Image with caption
- `{% VideoFigure "src", "caption" %}` - Video with caption
- `{% Aside %}content{% endAside %}` - Aside block

## Content Guidelines

From AGENTS.md:
- In Japanese articles, add space before/after English words (except when adjacent to symbols)
- Featured images: 16:9 aspect ratio, minimum 1080p
- Featured images path in frontmatter: `/YYYY/image.jpg` (not full `/src/images/YYYY/`)
- Place featured images in `/src/images/YYYY/`

## Translation

- The `scripts/translate.js` script handles automated translation via Google Cloud Translation API
- To prevent re-translation, add `translatedManually: true` to frontmatter
- Translated posts include `translationOf` linking to the original
- Code blocks, URLs, and technical terms are preserved during translation

## Deployment

Docker multi-stage build deploys to Google Cloud Run. GitHub Actions CI/CD triggers on push to main.

## Style Guide

Follow Google's style guides.
