const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  return {
    dir: {
      input: "./src",      // Equivalent to Jekyll's source property
      includes: "_incldues",
      layouts: "_layouts",
      data: "_data",
      output: "./_site" // Equivalent to Jekyll's destination property
    }
  };
};
