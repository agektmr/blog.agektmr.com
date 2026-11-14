/**
 * Express server for Cloud Run deployment
 * Handles language detection and serves static files
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 8080;
const SITE_DIR = path.join(__dirname, '../_site');

// Middleware
app.use(cookieParser());
app.use(express.json());

/**
 * Parse Accept-Language header and return preferred language
 * @param {string} acceptLanguageHeader - Accept-Language header value
 * @returns {string} - 'ja' or 'en'
 */
function parseAcceptLanguage(acceptLanguageHeader) {
  if (!acceptLanguageHeader) return 'en';

  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].toLowerCase();
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check if Japanese is preferred over English
  for (const lang of languages) {
    if (lang.code.startsWith('ja')) return 'ja';
    if (lang.code.startsWith('en')) return 'en';
  }

  return 'en'; // Default to English
}

/**
 * Detect user's preferred language
 * Priority: 1. Query param, 2. Cookie, 3. Accept-Language header, 4. Default (en)
 * @param {Request} req - Express request object
 * @returns {string} - 'ja' or 'en'
 */
function detectLanguage(req) {
  // 1. Check query parameter
  if (req.query.lang === 'ja' || req.query.lang === 'en') {
    return req.query.lang;
  }

  // 2. Check cookie
  if (req.cookies.language_preference) {
    const cookieLang = req.cookies.language_preference;
    if (cookieLang === 'ja' || cookieLang === 'en') {
      return cookieLang;
    }
  }

  // 3. Check Accept-Language header
  const headerLang = parseAcceptLanguage(req.headers['accept-language']);
  if (headerLang) {
    return headerLang;
  }

  // 4. Default to English
  return 'en';
}

/**
 * Check if the client explicitly requests Markdown via Accept header
 * @param {Request} req - Express request object
 * @returns {boolean}
 */
function wantsMarkdown(req) {
  const accept = req.headers.accept || '';
  return accept
    .split(',')
    .some((part) => part.trim().split(';')[0].trim().toLowerCase() === 'text/markdown');
}

/**
 * Resolve a request path to a pre-built English Markdown file relative to SITE_DIR
 * (with ja fallback for untranslated posts)
 * @param {string} requestPath
 * @returns {string|null}
 */
function resolveMarkdownPath(requestPath) {
  const normalized = requestPath.replace(/\/+$/, '') || '/';

  if (normalized === '/' || normalized === '/index.html' || normalized === '/en' || normalized === '/en/index.html' || normalized === '/ja' || normalized === '/ja/index.html') {
    const rel = 'en/index.md';
    return fs.existsSync(path.join(SITE_DIR, rel)) ? rel : null;
  }

  if (normalized === '/en/posts' || normalized === '/en/posts/index.html' || normalized === '/ja/posts' || normalized === '/ja/posts/index.html') {
    const rel = 'en/posts/index.md';
    return fs.existsSync(path.join(SITE_DIR, rel)) ? rel : null;
  }

  if (normalized === '/en/about' || normalized === '/en/about/index.html' || normalized === '/ja/about' || normalized === '/ja/about/index.html') {
    const rel = 'en/about/index.md';
    return fs.existsSync(path.join(SITE_DIR, rel)) ? rel : null;
  }

  const postMatch = normalized.match(/^\/(?:en|ja)?\/?(\d{4})\/(\d{2})\/([^\/]+?)(?:\.html)?$/);
  if (postMatch) {
    const relMdPath = `${postMatch[1]}/${postMatch[2]}/${postMatch[3]}.md`;
    const enRel = path.posix.join('en', relMdPath);
    if (fs.existsSync(path.join(SITE_DIR, enRel))) return enRel;
    const jaRel = path.posix.join('ja', relMdPath);
    if (fs.existsSync(path.join(SITE_DIR, jaRel))) return jaRel;
  }

  return null;
}

/**
 * Build Link header for agent discovery (sitemap, Markdown alternate, RSS feed)
 * @param {string} requestPath
 * @returns {string}
 */
function buildLinkHeader(requestPath) {
  const normalized = requestPath.replace(/\/+$/, '') || '/';
  let mdAlt = '/en/index.md';

  if (normalized.includes('/posts')) {
    mdAlt = '/en/posts/index.md';
  } else if (normalized.includes('/about')) {
    mdAlt = '/en/about/index.md';
  } else {
    const postMatch = normalized.match(/^\/(?:en|ja)?\/?(\d{4})\/(\d{2})\/([^\/]+?)(?:\.html)?$/);
    if (postMatch) {
      mdAlt = `/en/${postMatch[1]}/${postMatch[2]}/${postMatch[3]}.md`;
    }
  }

  return [
    '</sitemap.xml>; rel="sitemap"; type="application/xml"',
    `<${mdAlt}>; rel="alternate"; type="text/markdown"`,
    '</en/feed.xml>; rel="alternate"; type="application/rss+xml"'
  ].join(', ');
}

/**
 * Language detection, Markdown content negotiation, and redirect middleware
 */
app.use((req, res, next) => {
  const requestPath = req.path;

  // Skip for static assets
  if (requestPath.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|xml|txt|json|md)$/)) {
    return next();
  }

  res.vary('Accept');
  const linkHeader = buildLinkHeader(requestPath);
  res.set('Link', linkHeader);

  if (wantsMarkdown(req)) {
    const mdRelPath = resolveMarkdownPath(requestPath);
    if (mdRelPath) {
      res.set('Content-Type', 'text/markdown; charset=utf-8');
      return res.sendFile(mdRelPath, { root: SITE_DIR });
    }
    return next();
  }

  const onEnglishPath = requestPath.startsWith('/en/') || requestPath === '/en';
  const onJapanesePath = requestPath.startsWith('/ja/') || requestPath === '/ja';

  // 1. Redirect root homepage to language-specific version
  if (requestPath === '/' || requestPath === '/index.html') {
    const preferredLang = detectLanguage(req);
    res.cookie('language_preference', preferredLang, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });
    return res.redirect(302, `/${preferredLang}/`);
  }

  // 2. Redirect root feed to language-specific feed
  if (requestPath === '/feed.xml') {
    const preferredLang = detectLanguage(req);
    return res.redirect(302, `/${preferredLang}/feed.xml`);
  }

  // 3. Redirect root-level posts (/YYYY/MM/slug or /YYYY/MM/slug.html) based on preferred language
  const rootPostPattern = /^\/(\d{4})\/(\d{2})\/([^\/]+?)(?:\.html)?$/;
  const postMatch = requestPath.match(rootPostPattern);
  if (postMatch) {
    const postHtmlPath = `/${postMatch[1]}/${postMatch[2]}/${postMatch[3]}.html`;
    const preferredLang = detectLanguage(req);
    const preferredFilePath = path.join(SITE_DIR, preferredLang, postHtmlPath);
    const targetLang = fs.existsSync(preferredFilePath) ? preferredLang : 'ja';

    res.set('Vary', 'Accept-Language, Cookie');
    return res.redirect(302, `/${targetLang}${postHtmlPath}`);
  }

  // 4. Redirect old paginated index pages based on preferred language
  // Pattern: /page/N/index.html
  const oldPaginationPattern = /^\/page\/(\d+)\/index\.html$/;
  if (oldPaginationPattern.test(requestPath)) {
    const preferredLang = detectLanguage(req);
    res.set('Vary', 'Accept-Language, Cookie');
    return res.redirect(302, `/${preferredLang}${requestPath}`);
  }

  // 5. Handle explicit language switching via query param
  if (req.query.lang) {
    const newLang = req.query.lang;
    if (newLang === 'ja' || newLang === 'en') {
      res.cookie('language_preference', newLang, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
      });
      return res.redirect(302, `/${newLang}/`);
    }
  }

  next();
});

// Serve static files with explicit Cache-Control headers for CDN and browser caching
app.use(express.static(SITE_DIR, {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');
    } else if (/\.(css|js|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|eot)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    }
  }
}));

// Handle 404
app.use((req, res) => {
  res.vary('Accept');
  if (wantsMarkdown(req)) {
    return res
      .status(404)
      .set('Content-Type', 'text/markdown; charset=utf-8')
      .send(
        '# 404 Not Found\n\n' +
        'The requested page could not be found on **Tender Surrender**.\n\n' +
        '## Useful Links\n\n' +
        '- [Home](/en/)\n' +
        '- [All Posts](/en/posts/)\n' +
        '- [About](/en/about/)\n' +
        '- [Sitemap](/sitemap.xml)\n'
      );
  }
  res.status(404).sendFile('404.html', { root: SITE_DIR });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Serving static files from: ${SITE_DIR}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
