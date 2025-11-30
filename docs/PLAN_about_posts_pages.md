# Implementation Plan: About and Posts Pages with i18n Support

## Problem Statement

1. **About and Posts pages return 404**: The navigation links point to `/ja/about/` and `/en/about/` (and similar for Posts), but these pages don't exist.
2. **404 page header is empty**: The 404 page doesn't have `lang` property, so `site.title` is undefined.
3. **Current structure issues**:
   - About page exists only at `/src/about/index.md` (no language variants)
   - Posts page exists only at `/src/posts.njk` with permalink `/posts/` (no language variants)
   - Neither page properly supports i18n

## Current State

### About Page
- **Location**: `/src/about/index.md`
- **Current permalink**: `/about/` (implicit from directory)
- **Issue**: Navigation expects `/ja/about/` and `/en/about/`

### Posts Page
- **Location**: `/src/posts.njk`
- **Current permalink**: `/posts/`
- **Issue**: Navigation expects `/ja/posts/` and `/en/posts/`
- **Additional issue**: Lists all posts mixed together, doesn't filter by language

### 404 Page
- **Location**: `/src/404.md`
- **Issue**: No `lang` property, causing `site.title` to be undefined in header

## Solution Architecture

### Approach: Language-Specific Directory Structure

Following the existing pattern used for post indexes (`/src/ja/index.njk` and `/src/en/index.njk`), create language-specific About and Posts pages.

## Implementation Plan

### Task 1: Create Language-Specific About Pages

**Files to create:**
1. `/src/en/about/index.md` - English About page
2. `/src/ja/about/index.md` - Japanese About page

**Frontmatter structure:**
```yaml
---
layout: layouts/page
lang: en  # or ja
title: About Me  # or Japanese translation
permalink: /en/about/  # or /ja/about/
eleventyExcludeFromCollections: true
---
```

**Content source:**
- Copy existing content from `/src/about/index.md` for English
- Translate to Japanese for `/src/ja/about/index.md`

**After creation:**
- Remove or deprecate old `/src/about/index.md`

### Task 2: Create Language-Specific Posts Pages

**Files to create:**
1. `/src/en/posts/index.njk` - English Posts archive
2. `/src/ja/posts/index.njk` - Japanese Posts archive

**Template structure:**
```nunjucks
---
layout: layouts/page
lang: en  # or ja
title: Posts  # or "投稿" for Japanese
permalink: /en/posts/  # or /ja/posts/
eleventyExcludeFromCollections: true
---

<ul class="posts-list">
{% for post in collections.posts_en | reverse %}  {# or posts_ja #}
  <li>
    <strong>
      <a href="{{ post.url }}">{{ post.data.title }}</a>
    </strong>
    <span class="post-date">- {{ post.date | localeDateString(post.data.lang or 'en') }}</span>
  </li>
{% endfor %}
</ul>
```

**After creation:**
- Remove or deprecate old `/src/posts.njk`

### Task 3: Fix 404 Page Header

**Approach**: Add `lang` property to 404 page frontmatter

**File to modify:**
- `/src/404.md`

**Changes:**
```yaml
---
layout: layouts/page
lang: en  # Set default language
title: Not found
permalink: 404.html
eleventyExcludeFromCollections: true
---
```

**Consideration**: Since 404 is a single page, we'll default to English. For proper i18n, we'd need language-specific 404 pages, but that's a future enhancement.

### Task 4: Update Site Data to Match

**Verify navigation URLs in:**
- `/src/_data/site.en.json` - Should have `/en/about/` and `/en/posts/`
- `/src/_data/site.ja.json` - Should have `/ja/about/` and `/ja/posts/`

These are already correct based on earlier investigation.

## Implementation Steps

1. ✅ Research completed - understand current structure
2. Create `/src/en/about/index.md` with English content
3. Create `/src/ja/about/index.md` with Japanese content (translate or use existing if available)
4. Create `/src/en/posts/index.njk` with English posts list
5. Create `/src/ja/posts/index.njk` with Japanese posts list
6. Add `lang: en` to `/src/404.md`
7. Test build and verify all pages work
8. Verify navigation links work correctly
9. Clean up: Remove old `/src/about/index.md` and `/src/posts.njk`

## Success Criteria

- [ ] `/en/about/` returns 200 with English About page
- [ ] `/ja/about/` returns 200 with Japanese About page
- [ ] `/en/posts/` returns 200 with list of English posts only
- [ ] `/ja/posts/` returns 200 with list of Japanese posts only
- [ ] 404 page header shows site title correctly
- [ ] Navigation links on all pages point to correct language-specific URLs
- [ ] No 404 errors when clicking navigation links

## Future Enhancements (Out of Scope)

- Language-specific 404 pages (`/en/404.html` and `/ja/404.html`)
- Auto-redirect to language-specific 404 based on browser language
- Translations using i18n JSON files instead of separate content files