import { DateTime } from "luxon";
import fs from "node:fs";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import pluginExcerpt from "eleventy-plugin-excerpt";
import pluginI18n from "eleventy-plugin-i18n";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItAnchor from "markdown-it-anchor";

const readJson = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url), "utf8"));

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

  eleventyConfig.addShortcode('YouTube', (ytVideoId) => {
    return `<div class="video-wrap">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/${ytVideoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </div>`;
  });

  eleventyConfig.addShortcode('ImageFigure', (src, caption, style) => {
    return `<figure style="${style || ''}">
      <img src="${src}" alt="${caption || ''}" width="100%">
      <figcaption>${caption || ''}</figcaption>
    </figure>`;
  });

  eleventyConfig.addShortcode('VideoFigure', (src, caption) => {
    return `<figure>
      <video src="${src}" width="300" autoplay muted></video>
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
