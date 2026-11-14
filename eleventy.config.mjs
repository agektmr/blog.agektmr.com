import { DateTime } from "luxon";
import fs from "node:fs";
import path from "node:path";
import Image from "@11ty/eleventy-img";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginExcerpt from "eleventy-plugin-excerpt";
import pluginI18n from "eleventy-plugin-i18n";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";
import { replaceFaIcons } from "./scripts/fa-icons.mjs";

const readJson = (filePath) => JSON.parse(fs.readFileSync(new URL(filePath, import.meta.url), "utf8"));

/**
 * Read intrinsic width/height from local PNG, GIF, JPEG, or WebP headers.
 * Returns null if the file is missing or format is unrecognized.
 */
function getImageDimensions(src) {
  if (!src || !src.startsWith("/")) return null;
  const localPath = path.join(process.cwd(), "src", src.replace(/^\/+/, ""));
  if (!fs.existsSync(localPath)) return null;

  try {
    const buf = fs.readFileSync(localPath);
    // PNG: 8-byte signature + IHDR chunk (width at 16, height at 20)
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    // GIF: "GIF87a" or "GIF89a"
    if (buf.length >= 10 && buf.toString("ascii", 0, 3) === "GIF") {
      return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
    }
    // WebP: RIFF....WEBP
    if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const chunk = buf.toString("ascii", 12, 16);
      if (chunk === "VP8 " && buf.length >= 30) {
        return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
      }
      if (chunk === "VP8L" && buf.length >= 25) {
        const b1 = buf[21], b2 = buf[22], b3 = buf[23], b4 = buf[24];
        return {
          width: (b1 | ((b2 & 0x3f) << 8)) + 1,
          height: (((b2 & 0xc0) >> 6) | (b3 << 2) | ((b4 & 0x0f) << 10)) + 1
        };
      }
      if (chunk === "VP8X" && buf.length >= 30) {
        return {
          width: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
          height: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1
        };
      }
    }
    // JPEG: scan SOF0..SOF15 markers (excluding DHT/DAC/JPG)
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let offset = 2;
      while (offset + 8 < buf.length) {
        if (buf[offset] !== 0xff) break;
        const marker = buf[offset + 1];
        if (marker === 0xd9 || marker === 0xda) break;
        const isSof = (marker >= 0xc0 && marker <= 0xc3) ||
                      (marker >= 0xc5 && marker <= 0xc7) ||
                      (marker >= 0xc9 && marker <= 0xcb) ||
                      (marker >= 0xcd && marker <= 0xcf);
        if (isSof) {
          return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
        }
        const segLen = buf.readUInt16BE(offset + 2);
        if (segLen < 2) break;
        offset += 2 + segLen;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export default function(eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginExcerpt, {
    excerptSeparator: '<!-- excerpt -->'
  });

  // Add i18n plugin
  eleventyConfig.addPlugin(pluginI18n, {
    translations: {
      ja: readJson('./src/_includes/i18n/ja.json'),
      en: readJson('./src/_includes/i18n/en.json')
    },
    fallbackLocales: {
      ja: 'en'
    }
  });

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias("post", "layouts/post");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    if (dateObj) {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_FULL);
    } else {
      return '';
    }
  });

  // Locale-aware date string filter for i18n
  eleventyConfig.addFilter('localeDateString', (dateObj, locale = 'en') => {
    if (dateObj) {
      return DateTime.fromJSDate(dateObj).setLocale(locale).toLocaleString(DateTime.DATE_FULL);
    } else {
      return '';
    }
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  // function filterTagList(tags) {
  //   return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  // }

  // eleventyConfig.addFilter("filterTagList", filterTagList)

  eleventyConfig.addFilter("buildPermalink", (inputPath) => {
    // Remove language prefix (ja/ or en/) to keep clean URLs
    // For Japanese: /posts/ja/2024/01/post.md -> 2024/01/post.html
    // For English: /posts/en/2024/01/post.md -> 2024/01/post.html (handled by posts.json)
    return inputPath.replace(/.*?\/(?:ja|en)?\/?\/?([0-9]{4})\/([0-9]{2})\/(.*)\.(md|html)$/g, "$1/$2/$3.html");
  });

  // Language-specific collections
  eleventyConfig.addCollection("posts_ja", function(collection) {
    return collection.getFilteredByGlob("src/posts/ja/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("posts_en", function(collection) {
    return collection.getFilteredByGlob("src/posts/en/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // // Create an array of all tags
  // eleventyConfig.addCollection("tagList", function(collection) {
  //   let tagSet = new Set();
  //   collection.getAll().forEach(item => {
  //     (item.data.tags || []).forEach(tag => tagSet.add(tag));
  //   });

  //   return filterTagList([...tagSet]);
  // });

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/manifest.json");

  eleventyConfig.addAsyncShortcode('CoverImage', async (src) => {
    if (!src || !src.startsWith('/')) return '';
    const localPath = path.join(process.cwd(), 'src', src.replace(/^\/+/, ''));
    if (!fs.existsSync(localPath)) return '';

    const metadata = await Image(localPath, {
      widths: [800, 1600],
      formats: ['avif', 'webp', 'jpeg'],
      outputDir: './_site/images/opt/',
      urlPath: '/images/opt/',
      sharpJpegOptions: { quality: 82, progressive: true },
      sharpWebpOptions: { quality: 80 },
      sharpAvifOptions: { quality: 65 }
    });

    const fallback = metadata.jpeg[metadata.jpeg.length - 1];
    const sources = Object.entries(metadata)
      .filter(([fmt]) => fmt !== 'jpeg')
      .map(([fmt, files]) => {
        const srcset = files.map((f) => `${f.url} ${f.width}w`).join(', ');
        return `<source type="image/${fmt}" srcset="${srcset}" sizes="100vw">`;
      })
      .join('\n      ');

    const jpegSrcset = metadata.jpeg.map((f) => `${f.url} ${f.width}w`).join(', ');
    return `<picture class="cover-picture">
      ${sources}
      <img src="${fallback.url}" srcset="${jpegSrcset}" sizes="100vw" alt="" width="${fallback.width}" height="${fallback.height}" fetchpriority="high" decoding="sync" aria-hidden="true" class="cover-img">
    </picture>`;
  });

  eleventyConfig.addShortcode('YouTube', (ytVideoId) => {
    return `<div class="video-wrap">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${ytVideoId}" title="YouTube video player" loading="lazy" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>`;
  });

  eleventyConfig.addAsyncShortcode('ImageFigure', async (src, caption, style) => {
    const localPath = src && src.startsWith('/') ? path.join(process.cwd(), 'src', src.replace(/^\/+/, '')) : null;
    const isAnimatableGif = src && src.toLowerCase().endsWith('.gif');

    if (localPath && fs.existsSync(localPath) && !isAnimatableGif) {
      try {
        const metadata = await Image(localPath, {
          widths: [600, 1200],
          formats: ['avif', 'webp', 'auto'],
          outputDir: './_site/images/opt/',
          urlPath: '/images/opt/',
          sharpJpegOptions: { quality: 82, progressive: true },
          sharpWebpOptions: { quality: 82 },
          sharpAvifOptions: { quality: 65 }
        });

        const html = Image.generateHTML(metadata, {
          alt: caption || '',
          sizes: '(max-width: 768px) 92vw, 720px',
          loading: 'lazy',
          decoding: 'async',
          style: 'width: 100%; height: auto;'
        });
        return `<figure style="${style || ''}">
      ${html}
      <figcaption>${caption || ''}</figcaption>
    </figure>`;
      } catch {
        // Fallback to raw image below if sharp cannot process a specific file
      }
    }

    const dims = getImageDimensions(src);
    const dimAttrs = dims ? ` width="${dims.width}" height="${dims.height}"` : '';
    return `<figure style="${style || ''}">
      <img src="${src}" alt="${caption || ''}"${dimAttrs} loading="lazy" decoding="async" style="width: 100%; height: auto;">
      <figcaption>${caption || ''}</figcaption>
    </figure>`;
  });

  // Replace Font Awesome <i> icons with zero-dependency inline SVGs
  eleventyConfig.addTransform("inline-fa-icons", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      return replaceFaIcons(content);
    }
    return content;
  });

  eleventyConfig.addShortcode('VideoFigure', (src, caption) => {
    return `<figure>
      <video src="${src}" width="300" autoplay muted playsinline preload="metadata"></video>
      <figcaption>${caption || ''}</figcaption>
    </figure>`;
  });

  eleventyConfig.addPairedShortcode('Aside', (content) => {
    return `<div class="aside">
    ${content}
  </div>`;
  });

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: false,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.linkInsideHeader({
      symbol: '#'
    }),
  }).use(markdownItAttrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []  // empty array = all attributes are allowed
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Eleventy 3 uses Eleventy Dev Server (BrowserSync was removed).
  // It serves _site/404.html automatically for missing pages with --serve.

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "liquid",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "liquid",

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: "./src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
