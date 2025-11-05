#!/usr/bin/env node

/**
 * Migration script to move all existing posts to src/posts/ja/
 * and add lang: ja to frontmatter
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../src/posts');
const JA_DIR = path.join(POSTS_DIR, 'ja');

// Get all year directories (excluding ja and en)
function getYearDirectories() {
  const items = fs.readdirSync(POSTS_DIR, { withFileTypes: true });
  return items
    .filter(item => item.isDirectory() && /^\d{4}$/.test(item.name))
    .map(item => item.name)
    .sort();
}

// Add lang: ja to frontmatter if not present
function addLangToFrontmatter(content, filePath) {
  // Check if file has frontmatter
  if (!content.startsWith('---')) {
    console.log(`  ⚠️  No frontmatter in ${filePath}, skipping`);
    return content;
  }

  // Split frontmatter and content
  const parts = content.split('---');
  if (parts.length < 3) {
    console.log(`  ⚠️  Invalid frontmatter in ${filePath}, skipping`);
    return content;
  }

  const frontmatter = parts[1];
  const bodyContent = parts.slice(2).join('---');

  // Check if lang already exists
  if (frontmatter.includes('lang:')) {
    console.log(`  ℹ️  lang already set in ${filePath}`);
    return content;
  }

  // Add lang: ja after the layout line, or at the beginning
  const lines = frontmatter.split('\n');
  const newLines = [];
  let langAdded = false;

  for (const line of lines) {
    newLines.push(line);
    if (!langAdded && line.trim().startsWith('layout:')) {
      newLines.push('lang: ja');
      langAdded = true;
    }
  }

  // If lang wasn't added (no layout line), add it at the start
  if (!langAdded && newLines.length > 0) {
    newLines.splice(1, 0, 'lang: ja');
  }

  return '---' + newLines.join('\n') + '---' + bodyContent;
}

// Process a single markdown file
function processMarkdownFile(sourcePath, destPath) {
  try {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const updatedContent = addLangToFrontmatter(content, sourcePath);

    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    fs.mkdirSync(destDir, { recursive: true });

    // Write to new location
    fs.writeFileSync(destPath, updatedContent, 'utf8');

    return true;
  } catch (error) {
    console.error(`  ❌ Error processing ${sourcePath}:`, error.message);
    return false;
  }
}

// Main migration function
function migrate() {
  console.log('🚀 Starting migration to ja/ directory...\n');

  const years = getYearDirectories();
  console.log(`Found ${years.length} year directories: ${years.join(', ')}\n`);

  let totalFiles = 0;
  let successCount = 0;
  let skipCount = 0;

  for (const year of years) {
    const yearDir = path.join(POSTS_DIR, year);
    const jaYearDir = path.join(JA_DIR, year);

    console.log(`📁 Processing ${year}/...`);

    // Get all month directories
    const months = fs.readdirSync(yearDir, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name)
      .sort();

    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      const jaMonthDir = path.join(jaYearDir, month);

      // Get all markdown files
      const files = fs.readdirSync(monthDir)
        .filter(file => file.endsWith('.md'));

      for (const file of files) {
        totalFiles++;
        const sourcePath = path.join(monthDir, file);
        const destPath = path.join(jaMonthDir, file);

        // Check if destination already exists
        if (fs.existsSync(destPath)) {
          console.log(`  ⏭️  Skipping ${year}/${month}/${file} (already exists)`);
          skipCount++;
          continue;
        }

        const success = processMarkdownFile(sourcePath, destPath);
        if (success) {
          console.log(`  ✅ Migrated ${year}/${month}/${file}`);
          successCount++;
        }
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log(`   Total files found: ${totalFiles}`);
  console.log(`   Successfully migrated: ${successCount}`);
  console.log(`   Skipped (already exist): ${skipCount}`);
  console.log(`   Failed: ${totalFiles - successCount - skipCount}`);
  console.log('='.repeat(60));

  if (successCount > 0) {
    console.log('\n⚠️  Note: Original files are still in src/posts/YYYY/');
    console.log('   After verifying the migration, you can delete them manually.');
  }
}

// Run migration
migrate();
