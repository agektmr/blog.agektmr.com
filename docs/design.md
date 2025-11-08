# Product Requirements Document (PRD)
## Internationalization for blog.agektmr.com

### Executive Summary

This PRD outlines the implementation of internationalization (i18n) for blog.agektmr.com, enabling the blog to serve content in both Japanese and English with automatic translation during the build process and intelligent language detection based on browser preferences.

---

## 1. Problem Statement

Currently, blog.agektmr.com is a Japanese-only blog built with Eleventy and hosted on Netlify. To reach a broader international audience while maintaining the existing Japanese readership, the blog needs:

- Support for both Japanese and English content
- Automatic translation of articles during build
- Browser-based language detection and serving
- Migration of all 119 existing articles

---

## 2. Proposed Solution

### 2.1 High-Level Architecture

**Recommended Approach: Eleventy + Cloud Run**

I recommend **staying with Eleventy** but **migrating to Cloud Run** for the following reasons:

1. **Eleventy Benefits:**
   - Proven, working foundation
   - Excellent i18n plugin ecosystem
   - Static generation = fast, SEO-friendly
   - Lower migration risk

2. **Cloud Run Benefits:**
   - Server-side language detection via `Accept-Language` headers
   - Ability to redirect users to appropriate language version
   - Auto-scaling and cost-effective
   - Easy deployment from GitHub Actions
   - Custom domain support
   - Built-in CDN capabilities

**Alternative Options Considered:**
- **Netlify with edge functions**: Could work, but Cloud Run offers better control over routing logic
- **AppEngine**: More expensive and less flexible than Cloud Run
- **Next.js/Astro**: Would require complete rewrite; unnecessary given working Eleventy setup

---

## 3. Technical Design

### 3.1 Content Structure

```
src/
├── _data/
│   ├── site.json           # Default (Japanese)
│   └── site.en.json        # English translations
├── posts/
│   ├── ja/                 # Japanese posts (migrated + new)
│   │   ├── 2008/
│   │   ├── 2009/
│   │   └── ...
│   └── en/                 # English posts (auto-translated)
│       ├── 2008/
│       ├── 2009/
│       └── ...
├── _includes/
│   ├── i18n/
│   │   ├── ja.json        # Japanese UI strings
│   │   └── en.json        # English UI strings
│   └── layouts/
└── ...
```

### 3.2 URL Structure

```
Japanese (default):
/                              # Home page
/2024/01/article-name.html    # Posts without /ja/ prefix
/posts/                        # Archive
/about/                        # About page

English:
/en/                          # Home page
/en/2024/01/article-name.html # Posts with /en/ prefix
/en/posts/                    # Archive
/en/about/                    # About page
```

### 3.3 Technology Stack

#### Build-Time Components
- **Eleventy 2.x** (upgrade from 1.x)
- **eleventy-plugin-i18n** - Language switching, collections
- **Google Cloud Translation API v3** - Automatic translation
- **markdown-it** - Markdown processing (existing)
- **Gray Matter** - Frontmatter parsing (built into Eleventy)

#### Translation Build Process
```bash
npm run translate    # Run translation API calls
npm run build        # Build both languages
```

#### Deployment Stack
- **Cloud Run** - Container hosting with SSR capabilities
- **Dockerfile** - Node.js server for language detection + static serving
- **Express.js** - Lightweight server for routing logic
- **GitHub Actions** - CI/CD pipeline
- **Cloud Build** - Container building
- **Artifact Registry** - Container storage

### 3.4 Language Detection Logic

Server-side (Cloud Run) flow:
```
1. Request arrives at Cloud Run
2. Parse Accept-Language header
3. Check for explicit language cookie/parameter
4. Priority:
   a. ?lang=ja or ?lang=en query parameter
   b. language_preference cookie
   c. Accept-Language header (ja, en, ja-JP, etc.)
   d. Default to Japanese
5. 302 redirect to appropriate language version
6. Set language_preference cookie
```

### 3.5 Translation Strategy

**Automatic Translation Workflow:**

```
1. Build Process:
   ├── Scan src/posts/ja/ for articles
   ├── Check if src/posts/en/ translation exists
   ├── If missing or outdated:
   │   ├── Call Google Cloud Translation API
   │   ├── Translate title, description, content
   │   ├── Preserve code blocks, URLs, frontmatter
   │   ├── Add translation metadata to frontmatter
   │   └── Write to src/posts/en/
   └── Continue Eleventy build

2. Translation Cache:
   ├── Store translation date in frontmatter
   ├── Compare source 'updated' date
   └── Only retranslate if source is newer

3. Manual Override:
   ├── Manually edited translations marked with translatedManually: true
   └── Skip auto-translation for these files
```

**Frontmatter Enhancement:**
```yaml
---
layout: post
title: "元のタイトル"
description: "元の説明"
date: 2024-01-15
updated: 2024-01-20
lang: ja                           # NEW
translationOf: /2024/01/article.html  # NEW (for English version)
translated: 2024-01-20             # NEW (translation timestamp)
translatedManually: false          # NEW (manual override flag)
---
```

---

## 4. Implementation Plan

### Phase 1: Infrastructure Setup (Week 1)
- [ ] Upgrade to Eleventy 2.x
- [ ] Install and configure i18n plugins
- [ ] Set up Google Cloud Translation API
- [ ] Create directory structure for ja/en content
- [ ] Configure language-specific data files

### Phase 2: Content Migration (Week 2)
- [ ] Move all existing posts to `src/posts/ja/`
- [ ] Add `lang: ja` to all existing frontmatter
- [ ] Update Eleventy collections configuration
- [ ] Test builds with new structure

### Phase 3: Translation Automation (Week 2-3)
- [ ] Build translation script
  - [ ] Markdown parsing (preserve code blocks)
  - [ ] API integration with Cloud Translation
  - [ ] Caching logic (check updated dates)
  - [ ] Error handling and retry logic
- [ ] Translate site.json and UI strings
- [ ] Run initial translation for all 119 posts
- [ ] Manual review of critical translations

### Phase 4: Template Updates (Week 3)
- [ ] Add language switcher component
- [ ] Update templates with i18n filters
- [ ] Add `<html lang="ja|en">` attributes
- [ ] Update RSS feeds for both languages
- [ ] Update sitemap with language alternates
- [ ] Add `<link rel="alternate" hreflang>` tags

### Phase 5: Cloud Run Deployment (Week 4)
- [ ] Create Dockerfile with Express server
- [ ] Implement language detection middleware
- [ ] Set up Cloud Run service
- [ ] Configure custom domain
- [ ] Set up Cloud Build triggers
- [ ] Create GitHub Actions workflow

### Phase 6: Testing & Launch (Week 5)
- [ ] Test language detection logic
- [ ] Test language switching
- [ ] Verify all translated content
- [ ] SEO verification (hreflang, sitemaps)
- [ ] Performance testing
- [ ] Deploy to production

---

## 5. Detailed Component Specifications

### 5.1 Translation Script (`scripts/translate.js`)

```javascript
// Key features:
- Read all .md files from src/posts/ja/
- Parse frontmatter and content
- Preserve:
  - Code blocks (```...```)
  - HTML tags
  - URLs
  - Image paths
  - YAML frontmatter structure
- Translate:
  - Title
  - Description
  - Markdown content
- Cache logic:
  - Skip if translated date >= updated date
  - Skip if translatedManually: true
- Write to src/posts/en/ with same path structure
- Rate limiting for API calls
- Progress reporting
```

### 5.2 Cloud Run Server (`server/index.js`)

```javascript
// Express server features:
- Serve static files from /dist/ja and /dist/en
- Language detection middleware:
  - Parse Accept-Language
  - Check query params (?lang=)
  - Check cookies
- Redirect logic:
  - / → /ja/ or /en/ based on detection
  - /some-path → /ja/some-path or /en/some-path
- Cookie setting for language preference
- Health check endpoint for Cloud Run
- 404 handling
```

### 5.3 Dockerfile

```dockerfile
# Multi-stage build:
1. Build stage:
   - Node 20
   - Install dependencies
   - Run translation script
   - Run Eleventy build

2. Production stage:
   - Node 20 slim
   - Copy built files
   - Copy server code
   - Expose port 8080
   - Run Express server
```

### 5.4 GitHub Actions Workflow

```yaml
# CI/CD pipeline:
Trigger: Push to main branch

Jobs:
1. Build and Test
   - Checkout code
   - Set up Node.js
   - Install dependencies
   - Run translation script
   - Run Eleventy build
   - Run tests (if any)

2. Deploy to Cloud Run
   - Authenticate with Google Cloud
   - Build Docker image
   - Push to Artifact Registry
   - Deploy to Cloud Run
   - Update traffic to new revision
```

---

## 6. Migration Strategy for Existing Content

### 6.1 Automated Migration Script

Create `scripts/migrate.js`:

```javascript
// Tasks:
1. Move all files from src/posts/YYYY/ to src/posts/ja/YYYY/
2. Add lang: ja to all frontmatter
3. Keep existing URLs (no /ja/ prefix for Japanese)
4. Update any internal links if necessary
5. Create backup before migration
```

### 6.2 Manual Review Process

After automated translation:
1. **High-priority posts** (top 10 most visited): Manual review and editing
2. **Technical posts**: Verify code snippets and technical terms
3. **Posts with images**: Ensure alt text is translated
4. **Posts with embedded content**: Verify YouTube embeds, etc.

---

## 7. SEO Considerations

### 7.1 URL Strategy

**Japanese URLs (existing):** Keep unchanged
```
https://blog.agektmr.com/2024/01/article-name.html
```

**English URLs (new):** Add /en/ prefix
```
https://blog.agektmr.com/en/2024/01/article-name.html
```

### 7.2 Hreflang Implementation

Add to `<head>` of every page:
```html
<link rel="alternate" hreflang="ja" href="https://blog.agektmr.com/2024/01/article.html" />
<link rel="alternate" hreflang="en" href="https://blog.agektmr.com/en/2024/01/article.html" />
<link rel="alternate" hreflang="x-default" href="https://blog.agektmr.com/2024/01/article.html" />
```

### 7.3 Sitemap Updates

Generate two sitemaps:
- `/sitemap.xml` - All pages with language annotations
- `/sitemap-ja.xml` - Japanese pages only
- `/sitemap-en.xml` - English pages only

---

## 8. Cost Estimation

### 8.1 Google Cloud Translation API

**Pricing:** $20 per 1 million characters

**Initial Translation:**
- Average post: ~3,000 characters
- 119 posts × 3,000 chars = 357,000 characters
- Cost: ~$7.14 (one-time)

**Ongoing Translation:**
- Assume 4 posts/month × 3,000 chars = 12,000 chars/month
- Cost: ~$0.24/month

### 8.2 Cloud Run

**Pricing:**
- CPU: $0.00002400/vCPU-second
- Memory: $0.00000250/GiB-second
- Requests: $0.40 per 1 million requests
- Free tier: 2 million requests/month

**Estimated Cost:**
- Low traffic (~10k page views/month): **$0-5/month**
- Medium traffic (~100k page views/month): **$5-15/month**

**Total Estimated Costs:**
- Setup: ~$7
- Monthly: ~$1-15 (depending on traffic)

---

## 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auto-translation quality issues | Medium | Manual review for high-traffic posts; allow manual override flag |
| SEO ranking drop during migration | High | Keep Japanese URLs unchanged; implement proper hreflang tags |
| Translation API rate limits | Medium | Implement caching and incremental translation |
| Cloud Run cold starts | Low | Keep minimum instances at 1 or use Cloud CDN |
| Build time increases significantly | Medium | Implement smart caching; only translate new/updated posts |

---

## 10. Success Metrics

**Immediate (1 month):**
- [ ] All 119 posts successfully translated
- [ ] Zero broken links or images
- [ ] Language detection accuracy >95%
- [ ] Build time <5 minutes

**Short-term (3 months):**
- [ ] 20%+ traffic from English-speaking countries
- [ ] <5% bounce rate on language-switched pages
- [ ] No SEO ranking drop for Japanese keywords

**Long-term (6 months):**
- [ ] 2x increase in international traffic
- [ ] Maintain or improve Core Web Vitals scores
- [ ] <3 translation-related issues reported

---

## 11. Alternative Approaches Considered

### Option A: Client-Side Translation (Google Translate Widget)
**❌ Rejected:**
- Poor SEO (not indexed by search engines)
- Inconsistent quality
- Not cached/permanent
- Bad UX (page flicker)

### Option B: Separate Subdomains (ja.blog.agektmr.com, en.blog.agektmr.com)
**❌ Rejected:**
- Splits domain authority
- Complicates deployment
- Harder for users to switch languages

### Option C: Framework Migration to Next.js
**❌ Rejected:**
- High migration cost (weeks of work)
- Unnecessary complexity
- Risk of introducing bugs
- Eleventy + plugins sufficient for static content

### Option D: Stay on Netlify with Edge Functions
**⚠️ Possible but not recommended:**
- Limited execution time for edge functions
- Less control over routing logic
- Netlify pricing can be higher for traffic spikes
- Cloud Run offers better value and flexibility

---

## 12. Open Questions

1. **Manual translation budget:** Do you want to manually review/edit any translations, or is auto-translation acceptable for all content?

2. **Future content workflow:** Will you write new posts in Japanese first and auto-translate, or write both versions?

3. **Language switcher placement:** Where should the language switcher be placed (header, footer, both)?

4. **Default language for ambiguous cases:** If browser sends no language preference, default to Japanese?

5. **Existing URLs:** Confirm that keeping Japanese URLs without `/ja/` prefix is acceptable (recommended for SEO)?

6. **Translation of code comments:** Should code comments in posts be translated, or left as-is?

---

## 13. Next Steps

If you approve this proposal, the implementation will proceed as follows:

1. **Immediate:** Upgrade Eleventy and set up i18n infrastructure
2. **Week 1:** Create translation automation script
3. **Week 2:** Migrate existing content and run initial translations
4. **Week 3:** Update templates and test builds
5. **Week 4:** Set up Cloud Run deployment
6. **Week 5:** Deploy to production
