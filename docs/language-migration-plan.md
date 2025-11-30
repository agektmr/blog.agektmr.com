# Language Migration Plan: English as Default Language

## Overview
This document outlines the steps required to make English the default language for the website. Both languages will use explicit URL prefixes (`/en/` and `/ja/`), with the root path (`/`) redirecting based on user language preference.

## Current State
- **Default Language:** Japanese (served at `/`)
- **Alternate Language:** English (served at `/en/`)
- **Japanese URLs:** Root-level (e.g., `/2024/11/post.html`)
- **English URLs:** Prefixed (e.g., `/en/2024/11/post.html`)
- **Root Homepage:** `/` → Japanese content
- **Root Feed:** `/feed.xml` → Japanese posts

## Target State
- **Both Languages Use Prefixes:** `/en/` and `/ja/`
- **English URLs:** `/en/2024/11/post.html`
- **Japanese URLs:** `/ja/2024/11/post.html`
- **Root Homepage:** `/` → Redirects based on language preference (defaults to `/en/`)
- **Root Feed:** `/feed.xml` → Redirects based on language preference (defaults to `/en/feed.xml`)

## Architecture Benefits

### 1. Symmetric URL Structure
- Both languages have explicit prefixes
- No ambiguity about which language a URL represents
- Future-proof for adding additional languages

### 2. No Breaking Changes
- Old Japanese URLs (`/2024/11/post.html`) → Redirect to `/ja/2024/11/post.html`
- Old English URLs (`/en/2024/11/post.html`) → Already correct, no change needed
- All existing external links continue to work via 301 redirects

### 3. Intelligent Root Path
- `/` detects user language and redirects appropriately
- English users → `/en/`
- Japanese users → `/ja/`
- Defaults to English if no preference detected

### 4. SEO Friendly
- Clear language signals in URLs
- Proper hreflang implementation
- 301 redirects preserve search engine rankings
- No duplicate content issues

---

## Migration Tasks

### Phase 1: Update URL Structure for Both Languages

#### Task 1.1: Update Language Definitions
**File:** `src/_data/languages.js`

**Change to:**
```javascript
module.exports = {
  en: {
    code: 'en',
    locale: 'en-US',
    name: 'English',
    nativeName: 'English',
    path: 'en',
    urlPrefix: '/en'
  },
  ja: {
    code: 'ja',
    locale: 'ja-JP',
    name: 'Japanese',
    nativeName: '日本語',
    path: 'ja',
    urlPrefix: '/ja'
  }
};
```

**Impact:** Both languages now have explicit URL prefixes

---

#### Task 1.2: Update Eleventy i18n Configuration
**File:** `.eleventy.js`

**Line 28 - Change fallback locale:**
```javascript
fallbackLocales: {
  ja: 'en'
}
```

**Line 48 - Change date filter default:**
```javascript
eleventyConfig.addFilter('localeDateString', (dateObj, locale = 'en') => {
```

**Impact:** English becomes fallback language, dates default to English format

---

### Phase 2: Homepage & Index Files

#### Task 2.1: Update Root Homepage to Redirect
**File:** `src/index.njk`

**Replace with redirect template:**
```njk
---
permalink: /index.html
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <script>
    // Client-side redirect as fallback
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    window.location.href = `/${lang}/`;
  </script>
</head>
<body>
  <p>Redirecting...</p>
</body>
</html>
```

**Note:** The actual redirect will be handled by the server (see Phase 7), but this provides a fallback for static file serving.

**Impact:** Root homepage becomes a redirect page

---

#### Task 2.2: Create English Index
**File:** `src/en/index.njk`

**Create new file (if it doesn't exist, or update existing):**
```yaml
---
layout: layouts/base
lang: en
eleventyNavigation:
  key: Home
  order: 1
pagination:
  data: collections.posts_en
  size: 5
  reverse: false
  alias: posts
permalink: "/en/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1}}/{% endif %}index.html"
---
<div class="home">

<div class="site-header-container {% if site.cover %}has-cover{% endif %}" {% if site.cover %}style="background-image: url({{ site.cover }});"{% endif %}>
  <div class="scrim {% if site.cover %}has-cover{% endif %}">
    <header class="site-header">
      <h1 class="title">{{ site.title }}</h1>
      {% if site.subtitle %}<p class="subtitle">{{ site.subtitle }}</p>{% endif %}
    </header>
  </div>
</div>

<div class="wrapper">
<ul class="post-list">
  {% for post in posts %}
  <li>
    <h2>
      <a class="post-link" href="{{ post.url }}">{{ post.data.title }}</a>
    </h2>
    <section class="post-excerpt" itemprop="description">
      <p>{% excerpt post %}</p>
      <a href="{{ post.url }}" class="readmore">Read more...</a>
    </section>
    <section class="post-meta">
      <div class="post-date">Posted: {{ post.date | htmlDateString("%B %-d, %Y") }}</div>
    </section>
  </li>
  {% if loop.last == false %}<hr>{% endif %}
  {% endfor %}
</ul>

<nav class="pagination" role="navigation">
	<p>
    {% if pagination.page.previous %}
			{% if pagination.pageNumber == 2 %}
			<a class="newer-posts" href="{{ pagination.href.first }}">
        <span class="fa-stack fa-lg">
          <i class="fa fa-square fa-stack-2x"></i>
          <i class="fa fa-angle-double-left fa-stack-1x fa-inverse"></i>
        </span>
      </a>
			{% else %}
			<a class="newer-posts" href="{{ pagination.href.previous }}">
				<span class="fa-stack fa-lg">
					<i class="fa fa-square fa-stack-2x"></i>
					<i class="fa fa-angle-double-left fa-stack-1x fa-inverse"></i>
				</span>
			</a>
			{% endif %}
		{% else %}
		<span class="fa-stack fa-lg">
      <i class="fa fa-square fa-stack-2x"></i>
      <i class="fa fa-angle-double-left fa-stack-1x fa-inverse"></i>
    </span>
		{% endif %}
		<span class="page-number">Page {{ pagination.pageNumber + 1 }} of {{ pagination.pages.length }}</span>
		{% if pagination.page.next %}
		<a class="newer-posts" href="{{ pagination.href.next }}">
      <span class="fa-stack fa-lg">
        <i class="fa fa-square fa-stack-2x"></i>
        <i class="fa fa-angle-double-right fa-stack-1x fa-inverse"></i>
      </span>
    </a>
		{% else %}
		<span class="fa-stack fa-lg">
      <i class="fa fa-square fa-stack-2x"></i>
      <i class="fa fa-angle-double-right fa-stack-1x fa-inverse"></i>
    </span>
		{% endif %}
	</p>
</nav>

</div>
</div>
```

**Impact:** English homepage accessible at `/en/`

---

#### Task 2.3: Create Japanese Index
**File:** `src/ja/index.njk`

**Create new file (copy from Task 2.2, change lang and collection):**
```yaml
---
layout: layouts/base
lang: ja
eleventyNavigation:
  key: Home
  order: 1
pagination:
  data: collections.posts_ja
  size: 5
  reverse: false
  alias: posts
permalink: "/ja/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1}}/{% endif %}index.html"
---
[Same HTML content as English version]
```

**Impact:** Japanese homepage accessible at `/ja/`

---

### Phase 3: Posts Directory Configuration

#### Task 3.1: Update English Posts Configuration
**File:** `src/posts/en/en.11tydata.js`

**Update to use `/en/` prefix:**
```javascript
module.exports = {
  lang: 'en',
  tags: 'posts',
  eleventyComputed: {
    permalink: (data) => {
      const match = data.page.inputPath.match(/\/(\d{4})\/(\d{2})\/([^/]+)\.md$/);
      if (match) {
        const [, year, month, slug] = match;
        return `/en/${year}/${month}/${slug}.html`;
      }
      return false;
    }
  }
};
```

**File:** `src/posts/en/posts.json`

**Ensure permalink includes prefix:**
```json
{
  "tags": "posts",
  "lang": "en",
  "permalink": "/en/{{ page.inputPath | buildPermalink }}"
}
```

**Impact:** English posts use `/en/` prefix

---

#### Task 3.2: Update Japanese Posts Configuration
**File:** `src/posts/ja/ja.11tydata.js`

**Update to use `/ja/` prefix:**
```javascript
module.exports = {
  lang: 'ja',
  tags: 'posts',
  eleventyComputed: {
    permalink: (data) => {
      const match = data.page.inputPath.match(/\/(\d{4})\/(\d{2})\/([^/]+)\.md$/);
      if (match) {
        const [, year, month, slug] = match;
        return `/ja/${year}/${month}/${slug}.html`;
      }
      return false;
    }
  }
};
```

**File:** `src/posts/ja/posts.json`

**Add permalink with prefix:**
```json
{
  "tags": "posts",
  "lang": "ja",
  "permalink": "/ja/{{ page.inputPath | buildPermalink }}"
}
```

**Impact:** Japanese posts now use `/ja/` prefix

---

### Phase 4: Site Data & Configuration

#### Task 4.1: Update Site Configuration Files

**File:** `src/_data/site.json` (English default)
```json
{
  "title": "Tender Surrender",
  "subtitle": "A blog dreaming of the future of the web",
  "description": "A blog dreaming of the future of the web",
  "feed": {
    "subtitle": "A blog dreaming of the future of the web",
    "path": "/en/feed.xml",
    "url": "https://blog.agektmr.com/en/feed.xml"
  },
  "pages": [{
    "title": "About",
    "url": "/en/about/",
    "main_nav": true
  }, {
    "title": "Posts",
    "url": "/en/posts/",
    "main_nav": true
  }]
}
```

**File:** `src/_data/site.ja.json` (Japanese)
```json
{
  "title": "Tender Surrender",
  "subtitle": "ウェブの未来を夢見るブログ",
  "description": "ウェブの未来を夢見るブログ",
  "feed": {
    "subtitle": "ウェブの未来を夢見るブログ",
    "path": "/ja/feed.xml",
    "url": "https://blog.agektmr.com/ja/feed.xml"
  },
  "pages": [{
    "title": "About",
    "url": "/ja/about/",
    "main_nav": true
  }, {
    "title": "Posts",
    "url": "/ja/posts/",
    "main_nav": true
  }]
}
```

**Impact:** Both language configs use proper prefixes

---

### Phase 5: RSS Feeds

#### Task 5.1: Update English Feed
**File:** `src/feed/feed.njk` → Rename to `src/feed/feed.en.njk`

**Update configuration:**
```yaml
---
lang: en
permalink: "/en/feed.xml"
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.feed.subtitle }}</subtitle>
  <link href="{{ site.feed.url }}" rel="self"/>
  <link href="{{ site.url }}/en/"/>
  <updated>{{ collections.posts_en | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/en/</id>
  <author>
    <name>{{ site.author.name }}</name>
    <email>{{ site.author.email }}</email>
  </author>
  {%- for post in collections.posts_en | reverse %}
  {% set absolutePostUrl = post.url | absoluteUrl(site.url) %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content xml:lang="en" type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
  {%- endfor %}
</feed>
```

**Impact:** English feed at `/en/feed.xml`

---

#### Task 5.2: Update Japanese Feed
**File:** `src/feed/feed.ja.njk` (or rename from `feed.en.njk` if needed)

**Update configuration:**
```yaml
---
lang: ja
permalink: "/ja/feed.xml"
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ja">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.feed.subtitle }}</subtitle>
  <link href="{{ site.feed.url }}" rel="self"/>
  <link href="{{ site.url }}/ja/"/>
  <updated>{{ collections.posts_ja | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/ja/</id>
  <author>
    <name>{{ site.author.name }}</name>
    <email>{{ site.author.email }}</email>
  </author>
  {%- for post in collections.posts_ja | reverse %}
  {% set absolutePostUrl = post.url | absoluteUrl(site.url) %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ absolutePostUrl }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ absolutePostUrl }}</id>
    <content xml:lang="ja" type="html">{{ post.templateContent | htmlToAbsoluteUrls(absolutePostUrl) }}</content>
  </entry>
  {%- endfor %}
</feed>
```

**Impact:** Japanese feed at `/ja/feed.xml`

---

#### Task 5.3: Create Root Feed Redirect
**File:** `src/feed/feed.njk` (new redirect template)

**Create redirect template:**
```njk
---
permalink: /feed.xml
---
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <script>
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    window.location.href = `/${lang}/feed.xml`;
  </script>
</head>
<body>
  <p>Redirecting to feed...</p>
</body>
</html>
```

**Note:** Server will handle this redirect (see Phase 7), but this provides fallback.

**Impact:** `/feed.xml` redirects based on language preference

---

### Phase 6: Templates & Layouts

#### Task 6.1: Update Base Layout Default
**File:** `src/_includes/layouts/base.njk`

**Line 2 - Change default language:**
```html
<html lang="{{ lang or 'en' }}">
```

**Impact:** HTML lang attribute defaults to English

---

#### Task 6.2: Update Head Template Default
**File:** `src/_includes/head.njk`

**Line 53 - Change default language:**
```liquid
{% set currentLang = lang or 'en' %}
```

**Impact:** Meta tags and hreflang default to English

---

#### Task 6.3: Update Language Switcher
**File:** `src/_includes/language-switcher.njk`

**Update for new URL structure:**
```liquid
{% set currentLang = lang or 'en' %}
{% set alternateLang = 'ja' if currentLang == 'en' else 'en' %}

{# Get current path without language prefix #}
{% set currentPath = page.url %}
{% set basePath = currentPath | replace('/en/', '/') | replace('/ja/', '/') %}

{# Build alternate URL #}
{% set alternateUrl = '/' + alternateLang + basePath %}

<a href="{{ alternateUrl }}" class="language-switcher">
  {{ alternateLang | upper }}
</a>
```

**Impact:** Language switcher works with new URL structure

---

### Phase 7: Server-Side Configuration & Redirects

#### Task 7.1: Update Server Language Detection
**File:** `server/index.js`

**Update default language to English:**
```javascript
function parseAcceptLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return 'en';
  // ... rest of function
  return 'en'; // Default to English (line 42)
}

/**
 * Detect user's preferred language
 * Priority: 1. Query param, 2. Cookie, 3. Accept-Language header, 4. Default (en)
 */
function detectLanguage(req) {
  // ... existing logic
  return 'en'; // Default to English (line 72)
}
```

---

#### Task 7.2: Add Redirect Logic for Root Paths
**File:** `server/index.js`

**Add before static file serving:**
```javascript
// Language detection and redirects
app.use((req, res, next) => {
  const path = req.path;

  // 1. Redirect root homepage to language-specific version
  if (path === '/' || path === '/index.html') {
    const preferredLang = detectLanguage(req);
    return res.redirect(302, `/${preferredLang}/`);
  }

  // 2. Redirect root feed to language-specific feed
  if (path === '/feed.xml') {
    const preferredLang = detectLanguage(req);
    return res.redirect(302, `/${preferredLang}/feed.xml`);
  }

  // 3. Redirect old Japanese posts (root level) to /ja/ prefix
  // Pattern: /YYYY/MM/slug.html
  const oldJapanesePostPattern = /^\/(\d{4})\/(\d{2})\/(.+\.html)$/;
  if (oldJapanesePostPattern.test(path)) {
    return res.redirect(301, `/ja${path}`);
  }

  // 4. Redirect old paginated index pages to /ja/
  // Pattern: /page/N/index.html
  const oldPaginationPattern = /^\/page\/(\d+)\/index\.html$/;
  if (oldPaginationPattern.test(path)) {
    return res.redirect(301, `/ja${path}`);
  }

  next();
});
```

**Impact:**
- `/` → Redirects to `/en/` or `/ja/` based on preference
- `/feed.xml` → Redirects to `/en/feed.xml` or `/ja/feed.xml`
- Old Japanese URLs → Permanent redirect to `/ja/` versions
- All existing links continue to work

---

#### Task 7.3: Update Language Switch Endpoint
**File:** `server/index.js`

**Update language switch logic:**
```javascript
// Language switcher endpoint
app.get('/', (req, res, next) => {
  const lang = req.query.lang;

  if (lang === 'en' || lang === 'ja') {
    res.cookie('language_preference', lang, { maxAge: 365 * 24 * 60 * 60 * 1000 });
    return res.redirect(302, `/${lang}/`);
  }

  next();
});
```

**Impact:** Language switcher sets cookie and redirects properly

---

### Phase 8: Other Static Pages

#### Task 8.1: About Pages
If there are separate about pages:
- Move `src/about/` to `src/ja/about/`
- Move `src/en/about/` to `src/en/about/` (keep as is)
- Update permalinks to use `/ja/about/` and `/en/about/`

#### Task 8.2: Posts Archive Pages
Similar treatment for any archive/category pages:
- Update language-specific paths
- Ensure all use `/en/` or `/ja/` prefixes

---

## SEO & Redirects Summary

### URL Migration Map

| Old URL | New URL | Redirect Type |
|---------|---------|---------------|
| `/` | `/en/` or `/ja/` (based on preference) | 302 (Temporary) |
| `/feed.xml` | `/en/feed.xml` or `/ja/feed.xml` | 302 (Temporary) |
| `/2024/11/post.html` | `/ja/2024/11/post.html` | 301 (Permanent) |
| `/en/2024/11/post.html` | No change | N/A |
| `/page/2/index.html` | `/ja/page/2/index.html` | 301 (Permanent) |

### Why These Redirect Types?

**302 (Temporary) for `/` and `/feed.xml`:**
- These paths are dynamic based on user preference
- Search engines should not index them as canonical URLs
- Allows server to continue detecting language preferences

**301 (Permanent) for old posts:**
- Old Japanese posts have moved permanently to `/ja/`
- Preserves SEO rankings (301s pass ~90-99% of link equity)
- Search engines will update their indexes to new URLs
- Bookmarks and external links continue to work

---

## Testing Checklist

After migration, verify:

### Core Functionality
- [ ] `/` redirects to `/en/` for English browsers
- [ ] `/` redirects to `/ja/` for Japanese browsers
- [ ] `/en/` displays English posts
- [ ] `/ja/` displays Japanese posts
- [ ] Language switcher works correctly
- [ ] Navigation menus use correct URLs

### Old URL Redirects
- [ ] Old Japanese post URLs redirect to `/ja/` versions (301)
- [ ] Old English post URLs still work (no change needed)
- [ ] Old pagination URLs redirect to `/ja/` versions
- [ ] `/feed.xml` redirects based on language preference

### Posts
- [ ] English posts accessible at `/en/{year}/{month}/{slug}.html`
- [ ] Japanese posts accessible at `/ja/{year}/{month}/{slug}.html`
- [ ] All post metadata displays correctly
- [ ] Images and assets load properly

### Feeds
- [ ] `/en/feed.xml` contains English posts
- [ ] `/ja/feed.xml` contains Japanese posts
- [ ] `/feed.xml` redirects to appropriate language feed
- [ ] Feed readers can parse both feeds

### SEO
- [ ] `<html lang="">` attribute correct on all pages
- [ ] hreflang tags point to correct alternate language versions
- [ ] Meta descriptions in correct language
- [ ] Sitemap updated (if exists)

### Server
- [ ] Accept-Language header detection works
- [ ] Cookie-based language preference works
- [ ] Query parameter language switching works (`?lang=en`, `?lang=ja`)
- [ ] Default language is English
- [ ] Redirects work correctly

### Cross-Browser
- [ ] Test in Chrome, Firefox, Safari
- [ ] Mobile browsers
- [ ] Different language settings
- [ ] Test with cookies disabled (should use Accept-Language header)

---

## Rollback Plan

If issues arise, rollback by:

1. Restore modified files from git:
   ```bash
   git checkout HEAD -- src/_data/languages.js
   git checkout HEAD -- .eleventy.js
   git checkout HEAD -- server/index.js
   git checkout HEAD -- src/index.njk
   git checkout HEAD -- src/posts/en/en.11tydata.js
   git checkout HEAD -- src/posts/ja/ja.11tydata.js
   # ... restore other modified files
   ```

2. Rebuild and restart:
   ```bash
   npm run build
   npm run start:server
   ```

3. Keep a backup before starting:
   ```bash
   git checkout -b backup-before-language-migration
   git commit -am "Backup before language migration"
   ```

---

## Estimated Impact

### Files to Modify: ~20 files
### Time Estimate: 2-3 hours
### Risk Level: Low (old URLs redirect automatically)
### Testing Required: Comprehensive
### User Impact: Minimal (redirects preserve all old links)

---

## Advantages of This Approach

1. **No Breaking Changes:** All existing URLs redirect automatically
2. **Clean Architecture:** Both languages use explicit prefixes
3. **SEO Preserved:** 301 redirects maintain search rankings
4. **User Experience:** Language detection provides seamless experience
5. **Future-Proof:** Easy to add new languages
6. **Clear URLs:** Anyone can tell language from URL
7. **Industry Standard:** Follows best practices (Wikipedia, Google, etc.)

---

## Next Steps

1. ✅ Review this plan
2. Create a backup branch
3. Execute migration in phases:
   - Phase 1-2: URL structure and homepages
   - Phase 3-5: Posts and feeds
   - Phase 6: Templates
   - Phase 7: Server redirects (critical!)
   - Phase 8: Other pages
4. Test thoroughly on local/staging environment
5. Deploy to production
6. Monitor for issues using analytics and server logs
7. Update external documentation and links

---

## Success Criteria

Migration is successful when:
- [ ] All old Japanese URLs redirect to `/ja/` versions
- [ ] All old English URLs continue to work
- [ ] New visitors see appropriate language based on preference
- [ ] Language switcher works bidirectionally
- [ ] No 404 errors from old links
- [ ] Search engine rankings are maintained
- [ ] RSS feed readers continue to work
