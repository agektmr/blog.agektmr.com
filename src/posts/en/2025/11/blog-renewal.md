---
layout: post
lang: en
title: Renewed the blog system
description: "This blog is now multilingual (English and Japanese) and served from Cloud Run."
date: 2025-11-30
organic: 50
image:
  feature:
tags:
  - Blog
  - 11ty
  - Cloud Run
translationOf: /2025/11/blog-renewal.html
translated: 2025-11-30
translatedManually: false
---
I have revamped this blog. The appearance is almost the same, but I have introduced an English version with multilingual support (i18n) and changed the infrastructure.

<!-- excerpt -->

## Background of the renewal

Until today, this blog has been serving technical information primarily in Japanese, but I was wanting to provide it in English too, for some time. There were some ideas in my mind on how to do it, but just couldn't find the time. With the recent rise of AI coding agents, I decided to jump on the bandwagon. Also, I haven't had much opportunity to write code for work lately, but I feel urged to understand, even just a little, what it feels like to be an every-day coder, so I decided to give it a try. I often use Gemini at work, so I decided to use Claude Code at this time, which many people around me use.

## Main changes

### 1. Multilingual support (i18n) and URL structure changes

The biggest change in this renewal is multilingual support. Until now, articles were mainly in Japanese, but English versions will also be available.

Japanese articles have been placed directly under the root directory, but they are now separated into directories for each language as shown below.

* Japanese: `/ja/`
* English: `/en/`

This makes it easier to switch between languages. We've also added a new language switch, so you can switch languages if an article exists.

### 2. Automatic translation using Google Cloud Translation API

For translation, I've (asked to) add an automatic translation system using the Google Cloud Translation API, so I can translate using a script and I can make manual corrections as needed (past articles were translated mechanically in bulk, so I plan to correct any strange parts as they are found). This allows me to create a workflow that allows me to write articles in Japanese and then publish them in English with relatively little effort.

### 3. Infrastructure Changes: Migrating to Cloud Run

To support multiple languages, I switched my blog hosting from Jamstack Netlify to dynamic delivery by Google Cloud Run. Since the only server logic I needed was language detection, Firebase Hosting + Cloud Functions would have been fine, but I just wanted to try Cloud Run. I also wanted to get reacquainted with Docker, something I hate to learn and then forget (although I haven't actually reacquainted with it yet, since Claude Code did most of the heavy lifting for me).

### 4. Introducing organicity

As an added bonus, I've introduced "organicity" as an indicator of how much of a blog post is written manually. For example, "organicity: 50%" means that 50% is written manually, meaning the remaining half relies on AI. I think this will become the norm in the future. However, this number is subjective and self-reported, so please take it as a grain of salt.

## Future outlook

With this renewal, I have established the foundation for disseminating information in multiple languages. From now on, I would like to actively disseminate technical information not only in Japanese but also in English. If you find anything strange, please let me know.

I hope you continue to enjoy my new blog.
