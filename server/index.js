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
  if (!acceptLanguageHeader) return 'ja';

  const languages = acceptLanguageHeader
    .split(',')
    .map(lang => {
      const parts = lang.trim().split(';');
      const code = parts[0].toLowerCase();
      const quality = parts[1] ? parseFloat(parts[1].split('=')[1]) : 1.0;
      return { code, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Check if English is preferred over Japanese
  for (const lang of languages) {
    if (lang.code.startsWith('en')) return 'en';
    if (lang.code.startsWith('ja')) return 'ja';
  }

  return 'ja'; // Default to Japanese
}

/**
 * Detect user's preferred language
 * Priority: 1. Query param, 2. Cookie, 3. Accept-Language header, 4. Default (ja)
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

  // 4. Default to Japanese
  return 'ja';
}

/**
 * Language detection middleware
 * Redirects users to appropriate language version on first visit
 */
app.use((req, res, next) => {
  // Skip for static assets
  if (req.path.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    return next();
  }

  // Skip if already on a language-specific path or if cookie exists
  const onEnglishPath = req.path.startsWith('/en/') || req.path === '/en';
  const hasLanguageCookie = req.cookies.language_preference;

  // If no cookie, detect language and set cookie
  if (!hasLanguageCookie && !req.query.lang) {
    const preferredLang = detectLanguage(req);

    // Set cookie for future visits (1 year)
    res.cookie('language_preference', preferredLang, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });

    // Redirect to English version if preferred
    if (preferredLang === 'en' && !onEnglishPath && req.path === '/') {
      return res.redirect(302, '/en/');
    }
  }

  // Handle explicit language switching via query param
  if (req.query.lang) {
    const newLang = req.query.lang;
    res.cookie('language_preference', newLang, {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax'
    });

    // Redirect to appropriate version without query param
    const cleanPath = req.path;
    if (newLang === 'en' && !onEnglishPath) {
      return res.redirect(302, '/en' + cleanPath);
    } else if (newLang === 'ja' && onEnglishPath) {
      return res.redirect(302, cleanPath.replace(/^\/en/, '') || '/');
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
