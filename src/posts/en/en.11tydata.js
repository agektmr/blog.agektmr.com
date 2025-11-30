module.exports = {
  lang: 'en',
  tags: 'posts',
  site: require('../../_data/site.en.json'),
  eleventyComputed: {
    permalink: (data) => {
      // Extract YYYY/MM/slug from the file path
      // Path format: src/posts/en/YYYY/MM/slug.md
      const match = data.page.inputPath.match(/\/(\d{4})\/(\d{2})\/([^/]+)\.md$/);
      if (match) {
        const [, year, month, slug] = match;
        return `/en/${year}/${month}/${slug}.html`;
      }
      return false;
    }
  }
};
