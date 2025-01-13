const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginExcerpt = require('eleventy-plugin-excerpt');
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginExcerpt, {
    excerptSeparator: '<!-- excerpt -->'
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
    // return inputPath.replace(/.*?\/([0-9]{4})-([0-9]{2})-[0-9]{2}-(.*)\.(md|html)$/g, "/$1/$2/$3.html");
    return inputPath.replace(/.*?\/([0-9]{4})\/([0-9]{2})\/(.*)\.(md|html)$/g, "/$1/$2/$3.html");
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

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, {"Content-Type": "text/html; charset=UTF-8"});
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

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
