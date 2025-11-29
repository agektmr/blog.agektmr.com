/**
 * Express server for Cloud Run deployment
 * Handles language detection and serves static files
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
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
 * Language detection and redirect middleware
 */
app.use((req, res, next) => {
  const path = req.path;

  // Skip for static assets
  if (path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    return next();
  }

  const onEnglishPath = path.startsWith('/en/') || path === '/en';
  const onJapanesePath = path.startsWith('/ja/') || path === '/ja';

  // 1. Redirect root homepage to language-specific version
  if (path === '/' || path === '/index.html') {
    const preferredLang = detectLanguage(req);
    res.cookie('language_preference', preferredLang, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });
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

  // 6. Set language cookie if on a language path but no cookie exists
  if (!req.cookies.language_preference) {
    if (onEnglishPath) {
      res.cookie('language_preference', 'en', {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
      });
    } else if (onJapanesePath) {
      res.cookie('language_preference', 'ja', {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'lax'
      });
    }
  }

  next();
});

// Serve static files
app.use(express.static(SITE_DIR, {
  extensions: ['html'],
  index: 'index.html'
}));

// Handle 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(SITE_DIR, '404.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Serving static files from: ${SITE_DIR}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
