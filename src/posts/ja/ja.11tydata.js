module.exports = {
  lang: 'ja',
  tags: 'posts',
  eleventyComputed: {
    permalink: (data) => {
      // Extract YYYY/MM/slug from the file path
      // Path format: src/posts/ja/YYYY/MM/slug.md
      const match = data.page.inputPath.match(/\/(\d{4})\/(\d{2})\/([^/]+)\.md$/);
      if (match) {
        const [, year, month, slug] = match;
        return `/ja/${year}/${month}/${slug}.html`;
      }
      return false;
    }
  }
};
