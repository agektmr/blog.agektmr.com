---
layout: post
lang: en
title: "I've revamped my blog."
description: "I've redesigned my blog. In this post, I'll share the details of the update, including multilingual support and design changes."
date: 2025-11-30
organic: 50
image:
  feature:
tags:
  - Blog
  - 11ty
  - Cloud Run
translationOf: /2025/11/blog-renewal.html
translated: 2026-10-03
translatedManually: false
---
I have revamped my blog. While the visual design remains largely the same, I added an English version through multilingual support (i18n) and updated the underlying infrastructure.

<!-- excerpt -->

## Background of the Revamp

Until now, this blog has mainly shared technical information in Japanese, but I have long wanted to publish in English as well. While I had some ideas on how to implement it, I never quite found the time. With the recent rise of AI coding agents, I decided to jump on the trend. These days, I don't get many opportunities to write code for work, so I also wanted to try them out to better understand the mindset of people who code every day. Since I mostly use Gemini at work, I decided to go with Claude Code, which many people around me have been using.

## Key Changes

### 1. Multilingual Support (i18n) and URL Structure Changes

The biggest change in this revamp is multilingual support. Previously, the blog primarily featured Japanese articles, but going forward, I can publish English articles alongside them.

Japanese articles were previously placed directly under the root, but they are now separated into directories by language:

* Japanese: `/ja/`
* English: `/en/`

This makes switching between languages much smoother. I have also added a language switcher, allowing you to easily toggle languages whenever an article is available in both.

### 2. Automated Translation with Google Cloud Translation API

For translations, I introduced an automated translation workflow powered by the Google Cloud Translation API. To allow for manual adjustments when needed, the translation can be run via scripts (past articles were batch-translated mechanically, so I plan to fix any awkward phrasing over time). With this setup, writing an article in Japanese now makes publishing an English version relatively effortless.

### 3. Infrastructure Changes: Migration to Cloud Run

To support the multilingual setup, I migrated the blog's hosting from a Jamstack architecture on Netlify to dynamic serving via Google Cloud Run. Since the server logic is essentially just language detection, Firebase Hosting + Cloud Functions might have been sufficient, but I just felt like trying Cloud Run. Plus, I wanted to revisit Docker, that formidable tool I keep learning and forgetting (though Claude Code ended up doing most of the heavy lifting, so I didn't actually relearn much).

### 4. Introducing the "Organic Score"

As a small bonus, I introduced an "Organic Score" metric to show how much of a blog post was written manually. For example, "Organic: 50%" means that 50% was written by hand, while the remaining half relied on AI. I figured this kind of transparency might become commonplace in the future. That said, this number is purely subjective and self-reported, so take it with a grain of salt.

## Looking Ahead

With this revamp, the foundation for sharing technical content across multiple languages is now in place. Moving forward, I hope to actively share technical information in both Japanese and English. If you spot anything that looks off, please feel free to let me know.

I hope you enjoy the newly updated blog!
