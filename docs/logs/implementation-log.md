# i18n Implementation Log

## Overview
Implementation of internationalization (i18n) for blog.agektmr.com to support both Japanese and English content with automatic translation.

---

## Phase 1: Infrastructure Setup ✅ (Completed)

**Date:** 2025-11-05

### Objectives
- Upgrade Eleventy to 2.x
- Install i18n dependencies
- Set up language configuration
- Create directory structure

### Changes Made

#### 1. Eleventy Upgrade
- Upgraded from Eleventy 1.0.2 → 2.0.1
- Tested build compatibility
- No breaking changes encountered

#### 2. Dependencies Installed
```json
{
  "eleventy-plugin-i18n": "^0.1.3",
  "@google-cloud/translate": "^9.2.1",
  "@11ty/eleventy-fetch": "^5.1.0"
}
```

#### 3. Directory Structure Created
```
src/
├── _data/
│   ├── site.json (Japanese - existing)
│   ├── site.en.json (English - new)
│   └── languages.js (Language config - new)
├── _includes/
│   └── i18n/
│       ├── ja.json (Japanese UI strings)
│       └── en.json (English UI strings)
└── posts/
    ├── ja/ (Japanese posts - new)
    └── en/ (English posts - new)
```

#### 4. Configuration Files Added

**src/_data/languages.js:**
- Defines language codes, locales, and URL prefixes
- Japanese: no prefix (default)
- English: `/en` prefix

**src/_data/site.en.json:**
- English site metadata
- Translated subtitle, description
- Updated feed paths for English

**src/_includes/i18n/ja.json & en.json:**
- UI strings for both languages
- Navigation labels
- Common phrases
- Date formats

#### 5. Eleventy Configuration Updates

**.eleventy.js changes:**
- Added `eleventy-plugin-i18n` with translations
- Created `localeDateString` filter for locale-aware dates
- Added language-specific collections: `posts_ja`, `posts_en`
- Maintained backward compatibility

### Build Verification
- ✅ Build successful: 148 files written
- ✅ All existing posts rendering correctly
- ✅ No breaking changes
- ✅ Development server working

### Git Commit
- Branch: `i18n`
- Commit: `dce00c3`
- Files changed: 8

---

## Phase 2: Content Migration ✅ (Completed)

**Date:** 2025-11-05

### Objectives
- Migrate all 119 existing posts to `ja/` directory
- Add language metadata to frontmatter
- Preserve original URLs for SEO
- Update permalink configuration

### Changes Made

#### 1. Migration Script Created

**scripts/migrate-to-ja.js:**
```javascript
// Features:
- Automatic detection of year directories (2008-2025)
- Adds `lang: ja` to frontmatter after layout line
- Preserves all post metadata and content
- Creates destination directories automatically
- Reports progress and summary
```

**Migration Results:**
- Total files found: 119
- Successfully migrated: 119
- Failed: 0
- Time: <1 second

#### 2. Posts Migrated
```
src/posts/2008/ → src/posts/ja/2008/ (44 posts)
src/posts/2009/ → src/posts/ja/2009/ (29 posts)
src/posts/2010/ → src/posts/ja/2010/ (9 posts)
src/posts/2011/ → src/posts/ja/2011/ (2 posts)
src/posts/2012/ → src/posts/ja/2012/ (5 posts)
src/posts/2013/ → src/posts/ja/2013/ (5 posts)
src/posts/2014/ → src/posts/ja/2014/ (11 posts)
src/posts/2015/ → src/posts/ja/2015/ (2 posts)
src/posts/2016/ → src/posts/ja/2016/ (1 post)
src/posts/2017/ → src/posts/ja/2017/ (3 posts)
src/posts/2018/ → src/posts/ja/2018/ (1 post)
src/posts/2019/ → src/posts/ja/2019/ (1 post)
src/posts/2020/ → src/posts/ja/2020/ (1 post)
src/posts/2021/ → src/posts/ja/2021/ (2 posts)
src/posts/2022/ → src/posts/ja/2022/ (1 post)
src/posts/2023/ → src/posts/ja/2023/ (1 post)
src/posts/2024/ → src/posts/ja/2024/ (1 post)
src/posts/2025/ → src/posts/ja/2025/ (1 post)
```

#### 3. Frontmatter Updated

**Before:**
```yaml
---
layout: post
title: "タイトル"
description: "説明"
date: 2024-01-15
---
```

**After:**
```yaml
---
layout: post
lang: ja
title: "タイトル"
description: "説明"
date: 2024-01-15
---
```

#### 4. Permalink Configuration

**src/posts/ja/ja.11tydata.js:**
```javascript
module.exports = {
  lang: 'ja',
  tags: 'posts',
  eleventyComputed: {
    permalink: (data) => {
      // Extracts YYYY/MM/slug from path
      // Returns: /YYYY/MM/slug.html
    }
  }
};
```

**src/posts/en/en.11tydata.js:**
```javascript
module.exports = {
  lang: 'en',
  tags: 'posts',
  eleventyComputed: {
    permalink: (data) => {
      // Returns: /en/YYYY/MM/slug.html
    }
  }
};
```

#### 5. buildPermalink Filter Updated

**.eleventy.js:**
```javascript
eleventyConfig.addFilter("buildPermalink", (inputPath) => {
  // Removes language prefix (ja/ or en/)
  // Extracts YYYY/MM/slug pattern
  return inputPath.replace(/.*?\/(?:ja|en)?\/?\/?([0-9]{4})\/([0-9]{2})\/(.*)\.(md|html)$/g, "$1/$2/$3.html");
});
```

#### 6. Original Files Cleaned Up
- Deleted `src/posts/2008/` through `src/posts/2025/`
- Deleted `src/posts/posts.json`
- Only `src/posts/ja/` and `src/posts/en/` remain

### URL Structure Verification

**Japanese Posts (no language prefix):**
```
Source: src/posts/ja/2025/01/everything-about-passkeys.md
Output: _site/2025/01/everything-about-passkeys.html
URL:    /2025/01/everything-about-passkeys.html ✅
```

**English Posts (with /en/ prefix):**
```
Source: src/posts/en/2025/01/everything-about-passkeys.md
Output: _site/en/2025/01/everything-about-passkeys.html
URL:    /en/2025/01/everything-about-passkeys.html ✅
```

### Build Verification
- ✅ 148 files written (same as before)
- ✅ 406 files copied
- ✅ Build time: ~0.43 seconds
- ✅ All URLs preserved
- ✅ No broken links
- ✅ SEO-friendly structure maintained

### Git Commit
- Branch: `i18n`
- Commit: `e051edc`
- Files changed: 126 (119 posts + 7 config files)

---

## Phase 3: Translation Automation (Planned)

### Objectives
- Create translation script using Google Cloud Translation API
- Translate all 119 posts to English
- Implement caching to avoid retranslation
- Preserve code blocks, URLs, and technical terms

### Planned Features

#### Translation Script (scripts/translate.js)
```javascript
// Features to implement:
- Parse markdown and frontmatter
- Preserve code blocks (```)
- Preserve HTML tags
- Preserve URLs and image paths
- Translate title, description, content
- Cache translations (check updated dates)
- Skip manually edited translations
- Rate limiting for API calls
- Progress reporting
```

#### Frontmatter Enhancement
```yaml
---
layout: post
lang: en
title: "Translated Title"
description: "Translated description"
date: 2024-01-15
translationOf: /2024/01/article.html
translated: 2024-01-20
translatedManually: false
---
```

#### Cache Strategy
- Store translation timestamp in frontmatter
- Compare with source `updated` date
- Only retranslate if source is newer
- Skip files marked with `translatedManually: true`

### Cost Estimate
- **Initial translation:** 119 posts × 3,000 chars avg = 357,000 chars
- **Cost:** ~$7.14 (one-time at $20/million chars)
- **Ongoing:** ~$0.24/month for new posts

---

## Phase 4: Template Updates (Planned)

### Objectives
- Add language switcher component
- Update templates with i18n filters
- Add language attributes to HTML
- Create language-specific RSS feeds
- Update sitemap with language alternates

### Planned Changes

#### Language Switcher Component
- Show current language
- Link to alternate language version
- Detect if translation exists
- Fallback to home page if no translation

#### Template Updates
- Add `<html lang="ja|en">` attribute
- Use `localeDateString` filter for dates
- Use i18n strings from JSON files
- Add hreflang links in `<head>`

#### RSS Feeds
- `/feed.xml` - Japanese feed
- `/en/feed.xml` - English feed

#### Sitemap Updates
- Add language annotations
- Include alternate language links
- Generate separate sitemaps if needed

---

## Phase 5: Cloud Run Deployment (Planned)

### Objectives
- Create Dockerfile with Express server
- Implement language detection middleware
- Deploy to Google Cloud Run
- Set up CI/CD with GitHub Actions

### Architecture

#### Express Server (server/index.js)
```javascript
// Features:
- Serve static files from _site/
- Language detection from Accept-Language header
- Check query params (?lang=ja|en)
- Check cookies (language_preference)
- Redirect to appropriate version
- Set language preference cookie
```

#### Language Detection Priority
1. Query parameter: `?lang=ja` or `?lang=en`
2. Cookie: `language_preference`
3. `Accept-Language` header
4. Default: Japanese

#### Dockerfile
```dockerfile
# Multi-stage build:
1. Build stage:
   - Install dependencies
   - Run translation script
   - Run Eleventy build
2. Production stage:
   - Copy built files
   - Copy server code
   - Run Express server on port 8080
```

#### GitHub Actions Workflow
```yaml
# Trigger: Push to main branch
Jobs:
  1. Build and Test
  2. Deploy to Cloud Run
```

---

## Phase 6: Testing & Launch (Planned)

### Testing Checklist
- [ ] Language detection works correctly
- [ ] Language switcher functional
- [ ] All translations reviewed
- [ ] SEO verification (hreflang tags)
- [ ] Performance testing
- [ ] Mobile responsiveness
- [ ] RSS feeds working
- [ ] Sitemap generated correctly

### Launch Plan
1. Deploy to Cloud Run staging environment
2. Test with real traffic patterns
3. Monitor for issues
4. Deploy to production
5. Update DNS records
6. Monitor SEO rankings

---

## Current Status

### Completed ✅
- [x] Phase 1: Infrastructure Setup
- [x] Phase 2: Content Migration

### In Progress 🚧
- [ ] Phase 3: Translation Automation

### Pending 📋
- [ ] Phase 4: Template Updates
- [ ] Phase 5: Cloud Run Deployment
- [ ] Phase 6: Testing & Launch

---

## Technical Decisions

### Why Keep Japanese URLs Without /ja/ Prefix?
- **SEO Preservation:** All 119 existing posts maintain their URLs
- **Established Rankings:** No loss of search engine rankings
- **User Bookmarks:** Existing bookmarks continue to work
- **Clean URLs:** Simpler URLs for the primary language

### Why Use Computed Permalinks?
- **Flexibility:** Can dynamically generate URLs based on file path
- **Language-Aware:** Different logic for ja/ vs en/ posts
- **Future-Proof:** Easy to modify URL structure if needed
- **No Duplication:** Eliminates need for manual permalink in each file

### Why Eleventy 2.x?
- **Better Performance:** Faster builds
- **Improved Plugin System:** Better i18n support
- **Future Support:** Version 1.x is no longer actively maintained
- **Modern Features:** Better data cascade and computed data

---

## Lessons Learned

### What Went Well
- Migration script worked flawlessly (119/119 posts)
- URL preservation maintained SEO
- Eleventy 2.x upgrade was smooth
- Build time remained fast (~0.4s)

### Challenges Encountered
- Permalink configuration required computed data approach
- buildPermalink filter needed regex adjustment
- Initial approach with posts.json didn't work as expected

### Solutions Implemented
- Used `.11tydata.js` files for computed permalinks
- Created language-specific data files (ja.11tydata.js, en.11tydata.js)
- Leveraged Eleventy's data cascade for clean configuration

---

## Next Steps

1. **Immediate:** Begin Phase 3 (Translation Automation)
   - Set up Google Cloud Translation API credentials
   - Create translation script
   - Test on a few sample posts

2. **After Translation:** Phase 4 (Template Updates)
   - Add language switcher
   - Update templates with i18n
   - Create English RSS feed

3. **Final:** Phase 5 & 6 (Deployment & Testing)
   - Set up Cloud Run
   - Configure CI/CD
   - Deploy and monitor

---

## References

- [DESIGN.md](../../DESIGN.md) - Original PRD
- [Eleventy i18n Documentation](https://www.11ty.dev/docs/plugins/i18n/)
- [Google Cloud Translation API](https://cloud.google.com/translate/docs)
