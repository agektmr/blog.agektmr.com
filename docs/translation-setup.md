# Translation Setup Guide

This guide explains how to set up Google Cloud Translation API for automatic translation of blog posts.

## Prerequisites

- Google Cloud Platform account
- `gcloud` CLI installed
- Node.js 16+ installed

## Setup Steps

### 1. Create a Google Cloud Project

```bash
# Create a new project (or use existing)
gcloud projects create YOUR_PROJECT_ID

# Set as default project
gcloud config set project YOUR_PROJECT_ID
```

### 2. Enable Translation API

```bash
# Enable the Cloud Translation API
gcloud services enable translate.googleapis.com
```

### 3. Create Service Account

```bash
# Create a service account
gcloud iam service-accounts create blog-translator \
  --display-name="Blog Translation Service Account"

# Get the service account email
SA_EMAIL=$(gcloud iam service-accounts list \
  --filter="displayName:Blog Translation Service Account" \
  --format="value(email)")

echo "Service Account: $SA_EMAIL"
```

### 4. Grant Permissions

```bash
# Grant Cloud Translation API User role
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/cloudtranslate.user"
```

### 5. Create and Download Key

```bash
# Create a key file
gcloud iam service-accounts keys create ~/blog-translation-key.json \
  --iam-account=$SA_EMAIL

# Move to a safe location (NOT in the repo!)
mv ~/blog-translation-key.json ~/.config/gcloud/blog-translation-key.json
```

### 6. Set Environment Variable

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/blog-translation-key.json"
```

Reload your shell:
```bash
source ~/.zshrc  # or ~/.bashrc
```

### 7. Verify Setup

```bash
# Test the credentials
node -e "const {v2} = require('@google-cloud/translate'); const translate = new v2.Translate(); translate.translate('Hello', 'ja').then(([text]) => console.log('Translated:', text));"
```

You should see: `Translated: こんにちは`

## Usage

 ### Translate All Posts

 ```bash
 # Default: Translate Japanese to English
 npm run translate
 # OR
 node scripts/translate.js
 ```

 ### Bidirectional Translation

 You can translate in either direction using command line arguments:

 ```bash
 # Translate English to Japanese
 node scripts/translate.js --source en --target ja

 # Translate Japanese to English (explicit)
 node scripts/translate.js --source ja --target en
 ```

 This will:
 - Scan all posts in the source directory (`src/posts/[lang]/`)
 - Check if translation exists in the target directory (`src/posts/[target_lang]/`)
 - Skip already translated posts (unless source was updated)
 - Translate title, description, and content
 - Preserve code blocks, URLs, and technical content
 - Write translated files to the target directory

 ### Translate and Build

 ```bash
 npm run translate:build
 ```

 This runs the default translation (JA -> EN) followed by the build process.

### Manual Translation Override

If you want to manually edit a translated post and prevent auto-retranslation:

1. Edit the post in `src/posts/en/`
2. Set `translatedManually: true` in the frontmatter

Example:
```yaml
---
layout: post
lang: en
title: 'My Manually Edited Title'
description: 'My manually edited description'
date: 2024-01-15
translationOf: /2024/01/article.html
translated: 2024-01-20
translatedManually: true
---
```

## Translation Behavior

### What Gets Translated
- Post title
- Post description
- Markdown content (paragraphs, headings, lists)

### What Gets Preserved
- Code blocks (` ``` `)
- Inline code (`` ` ``)
- URLs
- Image paths
- HTML tags
- Eleventy shortcodes (`{% ... %}`)
- YAML frontmatter structure

### Caching Logic

The script will skip translation if:
1. Translation file exists AND
2. `translated` date >= source `updated` date AND
3. `translatedManually` is not `true`

To force retranslation:
- Delete the translated file, OR
- Update the `updated` date in the source file, OR
- Delete the `translated` field in the target file

## Cost Management

### Pricing
- $20 per 1 million characters
- Characters are counted after preprocessing

### Estimated Costs
- **Initial translation (119 posts):** ~$7
- **Ongoing (4 posts/month):** ~$0.24/month

### Tips to Reduce Costs
1. **Use caching:** Don't delete translated files unnecessarily
2. **Manual edits:** Set `translatedManually: true` for posts you've edited
3. **Test first:** Test on a few posts before running full translation
4. **Check updates:** Only retranslate when source content changes significantly

## Troubleshooting

### Error: "Could not load the default credentials"

Make sure `GOOGLE_APPLICATION_CREDENTIALS` is set:
```bash
echo $GOOGLE_APPLICATION_CREDENTIALS
```

If empty, set it:
```bash
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.config/gcloud/blog-translation-key.json"
```

### Error: "Permission denied"

Check that the service account has the correct role:
```bash
gcloud projects get-iam-policy YOUR_PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:$SA_EMAIL"
```

### Error: "API not enabled"

Enable the Translation API:
```bash
gcloud services enable translate.googleapis.com
```

### Translation Quality Issues

If translations are poor quality:
1. Check if technical terms are being translated incorrectly
2. Add those terms to a preservation list (requires script modification)
3. Consider manual post-editing for critical posts
4. Use `translatedManually: true` after editing

## Security Notes

⚠️ **IMPORTANT:**
- Never commit the service account key file to git
- Add `*.json` keys to `.gitignore`
- Store keys in `~/.config/gcloud/` or use Secret Manager
- Rotate keys periodically
- Limit service account permissions to only Translation API

## Testing Translation

To test on a single post before running full translation:

```bash
# Test on one post (JA -> EN)
node scripts/translate.js --file src/posts/ja/2025/01/everything-about-passkeys.md

# Test on one post (EN -> JA)
node scripts/translate.js --source en --target ja --file src/posts/en/2025/12/passkey-keywords.md
```

## Next Steps

After translation:
1. Review translated posts in `src/posts/en/`
2. Manually edit any posts that need refinement
3. Mark edited posts with `translatedManually: true`
4. Run `npm run build` to generate the site
5. Test the English version locally

## References

- [Google Cloud Translation API Documentation](https://cloud.google.com/translate/docs)
- [Node.js Client Library](https://cloud.google.com/translate/docs/reference/libraries/v2/nodejs)
- [Pricing Calculator](https://cloud.google.com/translate/pricing)
