#!/usr/bin/env node

/**
 * Translation script for blog posts
 * Translates Japanese posts to English using Google Cloud Translation API
 */

const fs = require('fs');
const path = require('path');
const { v2 } = require('@google-cloud/translate');

// Initialize Translation API client
const translate = new v2.Translate();

const SOURCE_DIR = path.join(__dirname, '../src/posts/ja');
const TARGET_DIR = path.join(__dirname, '../src/posts/en');
const SOURCE_LANG = 'ja';
const TARGET_LANG = 'en';

// Regex patterns for preserving content
const CODE_BLOCK_REGEX = /```[\s\S]*?```/g;
const INLINE_CODE_REGEX = /`[^`]+`/g;
const URL_REGEX = /https?:\/\/[^\s)]+/g;
const IMAGE_REGEX = /!\[([^\]]*)\]\(([^\)]+)\)/g;
const SHORTCODE_REGEX = /{%[\s\S]*?%}/g;
const HTML_TAG_REGEX = /<[^>]+>/g;

/**
 * Parse frontmatter and content from markdown file
 */
function parseFrontmatter(content) {
  // Trim the content first to handle any leading/trailing whitespace
  const trimmedContent = content.trim();
  const match = trimmedContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: '', content: trimmedContent, raw: content };
  }
  return {
    frontmatter: match[1],
    content: match[2],
    raw: content
  };
}

/**
 * Parse frontmatter into object
 */
function parseFrontmatterToObject(frontmatter) {
  const lines = frontmatter.split('\n');
  const obj = {};
  let currentKey = null;
  let currentValue = [];

  for (const line of lines) {
    const match = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (match) {
      if (currentKey) {
        obj[currentKey] = currentValue.join('\n').trim();
      }
      currentKey = match[1];
      currentValue = [match[2]];
    } else if (currentKey) {
      currentValue.push(line);
    }
  }

  if (currentKey) {
    obj[currentKey] = currentValue.join('\n').trim();
  }

  return obj;
}

/**
 * Preserve special content by replacing with placeholders
 */
function preserveContent(text) {
  const preserved = [];
  let index = 0;

  // Preserve code blocks
  text = text.replace(CODE_BLOCK_REGEX, (match) => {
    const placeholder = `__CODE_BLOCK_${index}__`;
    preserved.push({ placeholder, content: match });
    index++;
    return placeholder;
  });

  // Preserve inline code
  text = text.replace(INLINE_CODE_REGEX, (match) => {
    const placeholder = `__INLINE_CODE_${index}__`;
    preserved.push({ placeholder, content: match });
    index++;
    return placeholder;
  });

  // Preserve shortcodes
  text = text.replace(SHORTCODE_REGEX, (match) => {
    const placeholder = `__SHORTCODE_${index}__`;
    preserved.push({ placeholder, content: match });
    index++;
    return placeholder;
  });

  // Preserve HTML tags
  text = text.replace(HTML_TAG_REGEX, (match) => {
    const placeholder = `__HTML_TAG_${index}__`;
    preserved.push({ placeholder, content: match });
    index++;
    return placeholder;
  });

  // Preserve URLs
  text = text.replace(URL_REGEX, (match) => {
    const placeholder = `__URL_${index}__`;
    preserved.push({ placeholder, content: match });
    index++;
    return placeholder;
  });

  return { text, preserved };
}

/**
 * Restore preserved content
 */
function restoreContent(text, preserved) {
  for (const { placeholder, content } of preserved) {
    text = text.replace(placeholder, content);
  }
  return text;
}

/**
 * Escape YAML string value if needed
 */
function escapeYamlString(str) {
  if (!str) return str;

  // If string contains special characters, wrap in quotes and escape quotes
  if (str.match(/[:#\{\}\[\]|>*&!%@`'"]/)) {
    return `"${str.replace(/"/g, '\\"')}"`;
  }

  return str;
}

/**
 * Translate text using Google Cloud Translation API
 */
async function translateText(text, sourceLang, targetLang) {
  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    const [translation] = await translate.translate(text, {
      from: sourceLang,
      to: targetLang,
      format: 'text'
    });
    return translation;
  } catch (error) {
    console.error('Translation error:', error.message);
    return text;
  }
}

/**
 * Translate markdown content
 */
async function translateMarkdown(content) {
  // Preserve special content
  const { text, preserved } = preserveContent(content);

  // Split by paragraphs for better translation
  const paragraphs = text.split(/\n\n+/);
  const translatedParagraphs = [];

  for (const paragraph of paragraphs) {
    if (paragraph.trim().length === 0) {
      translatedParagraphs.push(paragraph);
      continue;
    }

    // Check if paragraph starts with # (heading)
    if (paragraph.trim().startsWith('#')) {
      const translated = await translateText(paragraph, SOURCE_LANG, TARGET_LANG);
      translatedParagraphs.push(translated);
    } else {
      const translated = await translateText(paragraph, SOURCE_LANG, TARGET_LANG);
      translatedParagraphs.push(translated);
    }

    // Rate limiting: small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  let translatedText = translatedParagraphs.join('\n\n');

  // Restore preserved content
  translatedText = restoreContent(translatedText, preserved);

  return translatedText;
}

/**
 * Check if translation is needed
 */
function needsTranslation(sourcePath, targetPath, sourceMeta) {
  if (!fs.existsSync(targetPath)) {
    return true;
  }

  // Read target file
  const targetContent = fs.readFileSync(targetPath, 'utf8');
  const targetParsed = parseFrontmatter(targetContent);
  const targetMeta = parseFrontmatterToObject(targetParsed.frontmatter);

  // Check if manually translated
  if (targetMeta.translatedManually === 'true') {
    return false;
  }

  // Check if source has been updated after translation
  const sourceUpdated = sourceMeta.updated || sourceMeta.date;
  const translated = targetMeta.translated;

  if (translated && sourceUpdated) {
    const sourceDate = new Date(sourceUpdated);
    const translatedDate = new Date(translated);
    if (translatedDate >= sourceDate) {
      return false;
    }
  }

  return true;
}

/**
 * Translate a single post
 */
async function translatePost(sourcePath, targetPath) {
  console.log(`\n📄 Processing: ${path.relative(SOURCE_DIR, sourcePath)}`);

  // Read source file
  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  const parsed = parseFrontmatter(sourceContent);
  const sourceMeta = parseFrontmatterToObject(parsed.frontmatter);

  // Check if translation is needed
  if (!needsTranslation(sourcePath, targetPath, sourceMeta)) {
    console.log('  ⏭️  Skipping (already translated or manually edited)');
    return { skipped: true };
  }

  // Translate title
  console.log('  📝 Translating title...');
  const translatedTitle = sourceMeta.title
    ? await translateText(
        sourceMeta.title.replace(/^['"]|['"]$/g, ''),
        SOURCE_LANG,
        TARGET_LANG
      )
    : '';

  // Translate description
  console.log('  📝 Translating description...');
  const translatedDescription = sourceMeta.description
    ? await translateText(
        sourceMeta.description.replace(/^['"]|['"]$/g, ''),
        SOURCE_LANG,
        TARGET_LANG
      )
    : '';

  // Translate content
  console.log('  📝 Translating content...');
  const translatedContent = await translateMarkdown(parsed.content);

  // Build new frontmatter
  const sourceUrl = sourcePath
    .replace(SOURCE_DIR, '')
    .replace(/\.md$/, '.html')
    .replace(/\/ja\//, '/');

  // Start with all source frontmatter properties
  const newFrontmatter = { ...sourceMeta };

  // Override/add translation-specific properties
  newFrontmatter.lang = 'en';
  newFrontmatter.title = escapeYamlString(translatedTitle);
  newFrontmatter.description = escapeYamlString(translatedDescription);
  newFrontmatter.translationOf = sourceUrl;
  newFrontmatter.translated = new Date().toISOString().split('T')[0];
  newFrontmatter.translatedManually = false;

  // Build new file content
  const frontmatterLines = [];
  for (const [key, value] of Object.entries(newFrontmatter)) {
    if (key === 'tags' && typeof value === 'string') {
      // Tags list items should be indented with 2 spaces
      frontmatterLines.push(`${key}:`);
      value.split('\n').forEach(tag => {
        const trimmed = tag.trim();
        if (trimmed) {
          // Ensure proper indentation (2 spaces) for list items
          if (tag.startsWith('  ') || tag.startsWith('\t')) {
            frontmatterLines.push(tag);
          } else if (trimmed.startsWith('-')) {
            frontmatterLines.push(`  ${trimmed}`);
          } else {
            frontmatterLines.push(tag);
          }
        }
      });
    } else if (key === 'image' && typeof value === 'string') {
      // Image structure uses nested key-value pairs (needs indentation)
      frontmatterLines.push(`${key}:`);
      value.split('\n').forEach(img => {
        if (img.trim()) {
          // Ensure proper indentation (2 spaces) if not already present
          if (img.startsWith('  ') || img.startsWith('\t')) {
            frontmatterLines.push(img);
          } else {
            frontmatterLines.push(`  ${img}`);
          }
        }
      });
    } else {
      frontmatterLines.push(`${key}: ${value}`);
    }
  }

  const newContent = `---\n${frontmatterLines.join('\n')}\n---\n${translatedContent}`;

  // Ensure target directory exists
  const targetDir = path.dirname(targetPath);
  fs.mkdirSync(targetDir, { recursive: true });

  // Write translated file
  fs.writeFileSync(targetPath, newContent, 'utf8');
  console.log('  ✅ Translation complete');

  return { skipped: false };
}

/**
 * Get all markdown files recursively
 */
function getMarkdownFiles(dir) {
  const files = [];

  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);
      if (item.isDirectory()) {
        traverse(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Main translation function
 */
async function main() {
  console.log('🌐 Starting translation process...\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${TARGET_DIR}`);
  console.log(`Language: ${SOURCE_LANG} → ${TARGET_LANG}\n`);

  // Check if a specific file was provided with --file argument
  const fileArgIndex = process.argv.indexOf('--file');
  let sourceFiles;

  if (fileArgIndex !== -1 && process.argv[fileArgIndex + 1]) {
    const specificFile = process.argv[fileArgIndex + 1];

    // Convert relative path to absolute if needed
    const absolutePath = path.isAbsolute(specificFile)
      ? specificFile
      : path.join(process.cwd(), specificFile);

    if (!fs.existsSync(absolutePath)) {
      console.error(`❌ File not found: ${specificFile}`);
      process.exit(1);
    }

    sourceFiles = [absolutePath];
    console.log(`Processing specific file: ${specificFile}\n`);
  } else {
    // Get all source files
    sourceFiles = getMarkdownFiles(SOURCE_DIR);
    console.log(`Found ${sourceFiles.length} posts to process\n`);
  }

  let translated = 0;
  let skipped = 0;
  let errors = 0;

  for (const sourcePath of sourceFiles) {
    const relativePath = path.relative(SOURCE_DIR, sourcePath);
    const targetPath = path.join(TARGET_DIR, relativePath);

    try {
      const result = await translatePost(sourcePath, targetPath);
      if (result.skipped) {
        skipped++;
      } else {
        translated++;
      }
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Translation Summary:');
  console.log(`   Total posts: ${sourceFiles.length}`);
  console.log(`   Newly translated: ${translated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log('='.repeat(60));

  if (translated > 0) {
    console.log('\n✅ Translation complete! Run `npm run build` to generate the site.');
  }
}

// Run main function
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
