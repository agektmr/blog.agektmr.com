---
trigger: always_on
---

# New Article Rules

When creating a new article, follow these rules:

1.  **File Location**: Create the file under `src/posts/<language>/<year>/<month>/`.
2.  **Frontmatter**: Include frontmatter with the following properties:
    ```yaml
    ---
    layout: post
    lang: <Language>
    title: <Title>
    description: <Description>
    date: <YYYY-MM-DD>
    updated: <YYYY-MM-DD>
    organic: 0
    image:
      feature: <year>/<image-name>.jpg
    tags:
      - <Tag1>
    ---
    ```
3.  **Excerpt**: Insert `<!-- excerpt -->` after the abstract (first paragraph).
