import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://blog.agektmr.com";

function stripFrontmatter(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}

function formatDate(dateVal) {
  if (!dateVal) return "";
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if (Number.isNaN(d.getTime())) return String(dateVal);
  return d.toISOString().slice(0, 10);
}

function convertShortcodesToMarkdown(body) {
  let out = body;
  out = out.replace(/<!--\s*excerpt\s*-->\r?\n?/g, "");

  // {% YouTube 'id' %} or {% YouTube "id" %}
  out = out.replace(/\{%\s*YouTube\s+['"]([^'"]+)['"]\s*%\}/g, (_, id) => {
    return `[Watch on YouTube](https://www.youtube.com/watch?v=${id})`;
  });

  // {% ImageFigure "src", "caption", "style" %}
  out = out.replace(
    /\{%\s*ImageFigure\s+['"]([^'"]+)['"](?:\s*,\s*['"]([^'"]*)['"])?(?:\s*,\s*['"][^'"]*['"])?\s*%\}/g,
    (_, src, caption = "") => {
      return `![${caption}](${src})`;
    }
  );

  // {% VideoFigure "src", "caption" %}
  out = out.replace(
    /\{%\s*VideoFigure\s+['"]([^'"]+)['"](?:\s*,\s*['"]([^'"]*)['"])?\s*%\}/g,
    (_, src, caption = "Video") => {
      return `[${caption || "Video"}](${src})`;
    }
  );

  // {% Aside %} ... {% endAside %}
  out = out.replace(/\{%\s*Aside\s*%\}([\s\S]*?)\{%\s*endAside\s*%\}/g, (_, inner) => {
    return inner
      .trim()
      .split(/\r?\n/)
      .map((line) => (line.trim() ? `> ${line}` : ">"))
      .join("\n");
  });

  return out.trim();
}

function htmlToSimpleMarkdown(html) {
  let out = convertShortcodesToMarkdown(html);
  out = out.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n");
  out = out.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n");
  out = out.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n");
  out = out.replace(/<a[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  out = out.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  out = out.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n$1\n");
  out = out.replace(/<[^>]+>/g, "");
  out = out.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  out = out.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

function writeFileEnsureDir(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
}

function exportPostMarkdown(post, defaultAuthor) {
  if (!post.inputPath || !post.outputPath) return;
  const raw = fs.readFileSync(post.inputPath, "utf8");
  const body = convertShortcodesToMarkdown(stripFrontmatter(raw));

  const lines = [`# ${post.data.title || "Untitled"}`, ""];
  const dateStr = formatDate(post.date);
  if (dateStr) lines.push(`- **Date**: ${dateStr}`);
  if (post.data.updated) lines.push(`- **Updated**: ${formatDate(post.data.updated)}`);
  lines.push(`- **Author**: ${post.data.author || defaultAuthor}`);
  lines.push(`- **URL**: ${SITE_URL}${post.url}`);
  const tags = (post.data.tags || []).filter((t) => !["post", "posts"].includes(t));
  if (tags.length > 0) lines.push(`- **Tags**: ${tags.join(", ")}`);
  lines.push("");
  if (post.data.description) {
    lines.push(`> ${post.data.description}`, "");
  }
  lines.push(body, "");

  const mdOutputPath = post.outputPath.replace(/\.html$/, ".md");
  writeFileEnsureDir(mdOutputPath, lines.join("\n"));
}

export function exportMarkdownSite({ outputDir, postsEn, postsJa }) {
  for (const post of postsEn) {
    exportPostMarkdown(post, "Eiji Kitamura");
  }
  for (const post of postsJa) {
    exportPostMarkdown(post, "えーじ");
  }

  // /en/index.md
  const recentLines = [
    "# Tender Surrender",
    "",
    "Dreaming about the future of the web — by Eiji Kitamura (Identity Tech Lead & Developer Advocate at Google)",
    "",
    "## Recent Posts",
    "",
  ];
  for (const post of postsEn.slice(0, 20)) {
    const dateStr = formatDate(post.date);
    const desc = post.data.description ? ` — ${post.data.description}` : "";
    recentLines.push(`- [${post.data.title}](${post.url}) (${dateStr})${desc}`);
  }
  recentLines.push(
    "",
    "## Navigation",
    "",
    "- [All Posts](/en/posts/)",
    "- [About](/en/about/)",
    "- [RSS Feed](/en/feed.xml)",
    "- [Sitemap](/sitemap.xml)",
    ""
  );
  writeFileEnsureDir(path.join(outputDir, "en/index.md"), recentLines.join("\n"));

  // /en/posts/index.md
  const allPostsLines = [
    "# All Posts — Tender Surrender",
    "",
    `Total English posts: ${postsEn.length}`,
    "",
  ];
  for (const post of postsEn) {
    allPostsLines.push(`- [${post.data.title}](${post.url}) (${formatDate(post.date)})`);
  }
  allPostsLines.push("");
  writeFileEnsureDir(path.join(outputDir, "en/posts/index.md"), allPostsLines.join("\n"));

  // /en/about/index.md
  const aboutSrc = path.resolve("src/en/about/index.md");
  if (fs.existsSync(aboutSrc)) {
    const rawAbout = fs.readFileSync(aboutSrc, "utf8");
    const aboutMd = htmlToSimpleMarkdown(stripFrontmatter(rawAbout));
    writeFileEnsureDir(path.join(outputDir, "en/about/index.md"), `${aboutMd}\n`);
  }
}
