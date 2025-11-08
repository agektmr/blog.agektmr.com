# Next Steps - Bilingual Blog Implementation

This document outlines the remaining steps to complete the bilingual blog deployment.

## Current Status ✅

**All infrastructure phases (1-5) are complete!**

- ✅ Phase 1: Eleventy 2.x upgrade, i18n plugin, language configuration
- ✅ Phase 2: All 119 posts migrated to `src/posts/ja/` with preserved URLs
- ✅ Phase 3: Translation automation script ready
- ✅ Phase 4: Bilingual templates, language switcher, hreflang tags, RSS feeds
- ✅ Phase 5: Express server, Docker, GitHub Actions CI/CD

## What You Need to Do Next

### Option A: Quick Start (Translation + Deployment)

If you want to get the bilingual blog live quickly:

#### 1. Set Up Google Cloud Translation API

**Follow the guide:** [docs/translation-setup.md](docs/translation-setup.md)

Quick steps:
```bash
# 1. Create Google Cloud project at console.cloud.google.com
# 2. Enable Cloud Translation API
# 3. Create service account with "Cloud Translation API User" role
# 4. Download service account key JSON file
# 5. Set environment variable:
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-key.json"
```

**Cost:** ~$7 for initial translation of 119 posts, ~$0.24/month for 4 new posts/month

#### 2. Generate English Translations

```bash
# Translate all Japanese posts to English
npm run translate

# Or translate and build in one command
npm run translate:build
```

This will:
- Create English versions of all 119 posts in `src/posts/en/`
- Add translation metadata (translationOf, translated date)
- Preserve code blocks, URLs, and technical content
- Build the site with both languages

**Verify translations:**
```bash
# Check a few translated files
ls -la src/posts/en/2025/01/
cat src/posts/en/2025/01/everything-about-passkeys.md
```

#### 3. Test Locally

```bash
# Build the site
npm run build

# Start the Express server
npm run start:server

# Open http://localhost:8080 in your browser
# Test language switching
```

**Test language detection:**
```bash
# Default (Japanese)
curl -I http://localhost:8080/

# English preference via header
curl -I -H "Accept-Language: en-US,en;q=0.9" http://localhost:8080/

# Manual language switch
curl -I http://localhost:8080/?lang=en
```

#### 4. Set Up Google Cloud Run

**Follow the guide:** [docs/cloud-run-setup.md](docs/cloud-run-setup.md)

Quick steps:
```bash
# 1. Create Google Cloud project (can use same as translation)
export PROJECT_ID="your-project-id"

# 2. Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# 3. Create service account for GitHub Actions
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Service Account"

# 4. Grant permissions
gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# 5. Create and download service account key
gcloud iam service-accounts keys create ~/gcp-github-key.json \
  --iam-account=github-actions@$PROJECT_ID.iam.gserviceaccount.com
```

#### 5. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- **GCP_PROJECT_ID**: Your Google Cloud project ID
- **GCP_SA_KEY**: Contents of `~/gcp-github-key.json` file

#### 6. Deploy to Cloud Run

**Option 1: Automatic via GitHub Actions**
```bash
# Merge i18n branch to main
git checkout main
git merge i18n
git push origin main

# GitHub Actions will automatically:
# - Build Docker image
# - Push to Google Container Registry
# - Deploy to Cloud Run
# - Output service URL in Actions logs
```

**Option 2: Manual deployment**
```bash
# Build and push Docker image
docker build -t gcr.io/$PROJECT_ID/blog-agektmr-com:latest .
gcloud auth configure-docker
docker push gcr.io/$PROJECT_ID/blog-agektmr-com:latest

# Deploy to Cloud Run
gcloud run deploy blog-agektmr-com \
  --image gcr.io/$PROJECT_ID/blog-agektmr-com:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1

# Get the service URL
gcloud run services describe blog-agektmr-com \
  --region us-central1 \
  --format 'value(status.url)'
```

#### 7. Configure Custom Domain (Optional)

```bash
# Verify domain ownership
gcloud domains verify blog.agektmr.com

# Map domain to Cloud Run service
gcloud run domain-mappings create \
  --service blog-agektmr-com \
  --domain blog.agektmr.com \
  --region us-central1

# Update DNS records with provided values
# Wait 15-60 minutes for SSL certificate provisioning
```

---

### Option B: Gradual Approach

If you want to test thoroughly before deploying:

#### Step 1: Test Translation Script (Local Only)

```bash
# Set up translation API credentials
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"

# Translate just one test post
# Edit scripts/translate.js temporarily to limit to 1 file
npm run translate

# Review the output
cat src/posts/en/2025/01/everything-about-passkeys.md

# If satisfied, translate all posts
npm run translate
```

#### Step 2: Test Locally

```bash
npm run build
npm run start:server
# Test at http://localhost:8080
```

#### Step 3: Test Docker Build

```bash
docker build -t blog-test .
docker run -p 8080:8080 blog-test
# Test at http://localhost:8080
```

#### Step 4: Deploy to Cloud Run (when ready)

Follow steps 4-7 from Option A above.

---

## Verifying Everything Works

### 1. Language Detection

Test that the server correctly detects and redirects:

**English browser (first visit):**
- Should redirect to `/en/`
- Cookie `language_preference=en` should be set

**Japanese browser (first visit):**
- Should stay on `/`
- Cookie `language_preference=ja` should be set

**Manual switching:**
- Click language switcher in navigation (JA/EN button)
- Should switch languages and set cookie

### 2. Content Verification

**Check both language versions exist:**
```bash
# Japanese version
curl -s https://your-site.com/2025/01/everything-about-passkeys.html | grep '<html lang='

# English version
curl -s https://your-site.com/en/2025/01/everything-about-passkeys.html | grep '<html lang='
```

**Check hreflang tags are present:**
```bash
curl -s https://your-site.com/2025/01/everything-about-passkeys.html | grep 'hreflang'
```

**Check RSS feeds:**
- Japanese: https://your-site.com/feed.xml
- English: https://your-site.com/en/feed.xml

### 3. SEO Verification

Use Google's Rich Results Test:
- https://search.google.com/test/rich-results
- Enter your URLs to verify hreflang tags are correct

### 4. Performance Testing

```bash
# Check response time
curl -w "@-" -o /dev/null -s https://your-site.com/ <<< \
  'time_total: %{time_total}s\n'

# Should be < 1s for first request
# Should be < 200ms for cached requests
```

---

## Ongoing Maintenance

### Adding New Posts

**1. Write in Japanese:**
```bash
# Create new post
cat > src/posts/ja/2025/11/new-post.md << EOF
---
layout: post
lang: ja
title: "新しい記事"
description: "説明"
date: 2025-11-05
---

記事の内容...
EOF
```

**2. Translate:**
```bash
# Translation script will detect new/updated posts
npm run translate
```

**3. Deploy:**
```bash
# Commit and push to main
git add .
git commit -m "Add new post: New Post Title"
git push origin main

# GitHub Actions will automatically deploy
```

### Manual Translations

If you want to manually refine a translation:

1. Edit the translated file in `src/posts/en/`
2. Add `translatedManually: true` to frontmatter
3. The translation script will skip this file in future runs

### Monitoring

**View Cloud Run logs:**
```bash
gcloud run logs read blog-agektmr-com --region us-central1 --limit 50
```

**View metrics:**
- Go to https://console.cloud.google.com/run
- Select your service
- Click "Metrics" tab

---

## Troubleshooting

### Translation Issues

**Problem:** Translation script fails
```bash
# Check credentials
echo $GOOGLE_APPLICATION_CREDENTIALS
cat $GOOGLE_APPLICATION_CREDENTIALS

# Verify API is enabled
gcloud services list --enabled | grep translate

# Check for errors
npm run translate 2>&1 | tee translation.log
```

**Problem:** Code blocks are translated
- This shouldn't happen, but if it does, check the preservation regex in `scripts/translate.js`
- You can manually fix and set `translatedManually: true`

### Deployment Issues

**Problem:** Docker build fails
```bash
# Test locally
docker build -t blog-test . 2>&1 | tee build.log

# Check for node_modules issues
rm -rf node_modules
npm install
```

**Problem:** Cloud Run deploy fails
```bash
# Check service account permissions
gcloud projects get-iam-policy $PROJECT_ID \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:github-actions@"

# Check logs
gcloud run logs read blog-agektmr-com --region us-central1
```

**Problem:** Language detection not working
- Clear browser cookies
- Test with curl using Accept-Language header
- Check Express server logs for debugging output

---

## Cost Estimates

### Google Cloud Translation API
- Initial translation (119 posts): ~$7 USD one-time
- Ongoing (4 posts/month): ~$0.24/month

### Cloud Run
- Estimated for small blog (100k views/month):
- **$5-10 USD/month** (mostly within free tier)
- Free tier includes:
  - 2 million requests/month
  - 360,000 GB-seconds memory
  - 180,000 vCPU-seconds

### Total Estimated Cost
- First month: ~$12-17 USD (includes initial translation)
- Ongoing: ~$5-10 USD/month

---

## Getting Help

**Documentation:**
- [DESIGN.md](DESIGN.md) - Original PRD and architecture
- [docs/translation-setup.md](docs/translation-setup.md) - Translation API setup
- [docs/cloud-run-setup.md](docs/cloud-run-setup.md) - Cloud Run deployment
- [docs/logs/implementation-log.md](docs/logs/implementation-log.md) - Complete implementation history

**Testing Commands:**
```bash
# Build site
npm run build

# Start dev server (Eleventy)
npm start

# Start production server (Express)
npm run start:server

# Translate posts
npm run translate

# Translate and build
npm run translate:build
```

**Useful Cloud Commands:**
```bash
# View service details
gcloud run services describe blog-agektmr-com --region us-central1

# View logs
gcloud run logs read blog-agektmr-com --region us-central1

# Update service
gcloud run services update blog-agektmr-com --region us-central1

# Delete service
gcloud run services delete blog-agektmr-com --region us-central1
```

---

## Summary

You have a complete bilingual blog system ready to deploy! The infrastructure supports:

✅ **Automatic language detection** based on browser preferences
✅ **119 posts ready for translation** with automated script
✅ **SEO-optimized** with hreflang tags and proper URLs
✅ **Scalable deployment** on Google Cloud Run
✅ **CI/CD pipeline** for automatic deployments
✅ **Low cost** (~$5-10/month after initial translation)

**Recommended Path:**
1. Set up Translation API credentials (15 minutes)
2. Run translation script (5-10 minutes)
3. Test locally (5 minutes)
4. Set up Cloud Run project (20 minutes)
5. Deploy (5 minutes via GitHub Actions)

**Total time to launch: ~1 hour**

Good luck with your bilingual blog! 🚀
