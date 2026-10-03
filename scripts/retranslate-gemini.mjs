#!/usr/bin/env node

/**
 * Re-translate blog posts from Japanese to English using Gemini Flash.
 *
 * Targets only posts with `translatedManually: false` in the English directory.
 * Reads the corresponding Japanese source, sends the full markdown body to
 * Gemini 3.8 Flash in a single request for context-aware translation, then
 * overwrites the English file with updated content and frontmatter.
 *
 * Usage:
 *   GEMINI_API_KEY=... node scripts/retranslate-gemini.mjs
 *   GEMINI_API_KEY=... node scripts/retranslate-gemini.mjs --file src/posts/en/2022/12/passkey.md
 *   GEMINI_API_KEY=... node scripts/retranslate-gemini.mjs --dry-run
 */

import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

// ── Config ──────────────────────────────────────────────────────────────────

const MODEL = 'gemini-flash-latest';
const BASE_DIR = path.resolve(new URL('.', import.meta.url).pathname, '../src/posts');
const EN_DIR = path.join(BASE_DIR, 'en');
const JA_DIR = path.join(BASE_DIR, 'ja');
const TODAY = new Date().toISOString().split('T')[0];

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FILE_ARG = (() => {
  const idx = args.indexOf('--file');
  return idx !== -1 ? args[idx + 1] : null;
})();

const client = new GoogleGenAI({});

// ── Helpers ─────────────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const trimmed = content.trim();
  const match = trimmed.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return { raw: trimmed, frontmatter: '', body: trimmed };
  return { raw: content, frontmatter: match[1], body: match[2] };
}

/** Minimal YAML key→value extraction (handles nested + list values). */
function parseFrontmatterToObj(fm) {
  const lines = fm.split('\n');
  const obj = {};
  let currentKey = null;
  let buf = [];

  for (const line of lines) {
    const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (kv) {
      if (currentKey) obj[currentKey] = buf.join('\n').trim();
      currentKey = kv[1];
      buf = [kv[2]];
    } else if (currentKey) {
      buf.push(line);
    }
  }
  if (currentKey) obj[currentKey] = buf.join('\n').trim();
  return obj;
}

function escapeYaml(str) {
  if (!str) return str;
  if (/[:#{}[\]|>&!%@`'"\\]/.test(str)) {
    return `"${str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return str;
}

// ── Gemini translation ──────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are a professional translator specialising in web technology blog posts.
Translate the given Japanese Markdown content into natural, fluent English.

Rules:
- Preserve ALL Markdown formatting exactly: headings, lists, links, images, code blocks, inline code, HTML tags, Nunjucks shortcodes ({% … %}, {% end… %}).
- Do NOT translate content inside code blocks, inline code, URLs, HTML attributes, or Nunjucks shortcodes.
- Do NOT translate external link titles or official English resource names that appear in the source.
- Keep the <!-- excerpt --> marker in exactly the same relative position.
- Use technical terminology accurately (e.g. WebAuthn, passkeys, FIDO, SharedArrayBuffer, Service Worker, etc.).
- Produce only the translated Markdown body. Do NOT wrap it in a code fence or add any preamble/postamble.
- The author is a Google employee writing about web platform features; maintain a professional yet accessible tone.`;

async function translateWithGemini(jaBody) {
  const interaction = await client.interactions.create({
    model: MODEL,
    system_instruction: SYSTEM_INSTRUCTION,
    input: jaBody,
    store: false,
  });
  return interaction.output_text?.trim() ?? '';
}

async function translateShortText(text) {
  if (!text || !text.trim()) return text;
  const interaction = await client.interactions.create({
    model: MODEL,
    system_instruction:
      'Translate the following Japanese text to natural English. Output ONLY the translation, nothing else.',
    input: text,
    store: false,
  });
  return interaction.output_text?.trim() ?? text;
}

// ── File discovery ──────────────────────────────────────────────────────────

function walk(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🌐 Re-translating with Gemini Flash …\n');
  console.log(`   Model : ${MODEL}`);
  console.log(`   Dry run: ${DRY_RUN}\n`);

  // Collect target English files
  let enFiles;
  if (FILE_ARG) {
    const abs = path.isAbsolute(FILE_ARG)
      ? FILE_ARG
      : path.resolve(process.cwd(), FILE_ARG);
    if (!fs.existsSync(abs)) { console.error(`❌ Not found: ${FILE_ARG}`); process.exit(1); }
    enFiles = [abs];
  } else {
    enFiles = walk(EN_DIR);
  }

  // Filter to translatedManually: false
  const targets = [];
  for (const enPath of enFiles) {
    const content = fs.readFileSync(enPath, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    const meta = parseFrontmatterToObj(frontmatter);
    if (meta.translatedManually === 'true') continue;
    if (!meta.translationOf) continue;

    // Resolve Japanese source path
    const relPath = path.relative(EN_DIR, enPath);
    const jaPath = path.join(JA_DIR, relPath);
    if (!fs.existsSync(jaPath)) {
      console.warn(`⚠️  Japanese source not found for ${relPath}, skipping`);
      continue;
    }
    targets.push({ enPath, jaPath, relPath });
  }

  console.log(`Found ${targets.length} posts to re-translate\n`);
  if (targets.length === 0) return;

  let done = 0, errors = 0;

  for (const { enPath, jaPath, relPath } of targets) {
    console.log(`\n📄 [${done + errors + 1}/${targets.length}] ${relPath}`);

    try {
      // Read Japanese source
      const jaContent = fs.readFileSync(jaPath, 'utf8');
      const jaParsed = parseFrontmatter(jaContent);
      const jaMeta = parseFrontmatterToObj(jaParsed.frontmatter);

      // Translate title & description
      const titleRaw = (jaMeta.title || '').replace(/^['"]|['"]$/g, '');
      const descRaw = (jaMeta.description || '').replace(/^['"]|['"]$/g, '');

      console.log('   ➜ Translating title …');
      const enTitle = await translateShortText(titleRaw);

      console.log('   ➜ Translating description …');
      const enDesc = await translateShortText(descRaw);

      // Translate body
      console.log('   ➜ Translating body …');
      const enBody = await translateWithGemini(jaParsed.body);

      // Build frontmatter from Japanese source (preserves all fields)
      const sourceUrl = jaPath
        .replace(JA_DIR, '')
        .replace(/\.md$/, '.html');

      // Rebuild frontmatter: take original JA frontmatter lines,
      // override lang/title/description/translation fields
      const fmLines = [];
      const jaLines = jaParsed.frontmatter.split('\n');
      const handled = new Set();

      for (const line of jaLines) {
        const kv = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
        if (kv) {
          const key = kv[1];
          if (key === 'lang') {
            fmLines.push('lang: en');
            handled.add('lang');
          } else if (key === 'title') {
            fmLines.push(`title: ${escapeYaml(enTitle)}`);
            handled.add('title');
          } else if (key === 'description') {
            fmLines.push(`description: ${escapeYaml(enDesc)}`);
            handled.add('description');
          } else if (['translationOf', 'translated', 'translatedManually'].includes(key)) {
            handled.add(key);
            // will append at end
          } else {
            fmLines.push(line);
          }
        } else {
          // continuation line (tag list items, image sub-fields, etc.)
          fmLines.push(line);
        }
      }

      // Append translation metadata
      fmLines.push(`translationOf: ${sourceUrl}`);
      fmLines.push(`translated: ${TODAY}`);
      fmLines.push('translatedManually: false');

      const output = `---\n${fmLines.join('\n')}\n---\n${enBody}\n`;

      if (DRY_RUN) {
        console.log('   [dry-run] Would write', enPath);
      } else {
        fs.mkdirSync(path.dirname(enPath), { recursive: true });
        fs.writeFileSync(enPath, output, 'utf8');
        console.log('   ✅ Written');
      }
      done++;

      // Rate limiting between posts
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`   ❌ Error: ${err.message}`);
      errors++;
      // Back off on error
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log(`   Total    : ${targets.length}`);
  console.log(`   Done     : ${done}`);
  console.log(`   Errors   : ${errors}`);
  console.log('='.repeat(60));
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
