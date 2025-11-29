# Cloud Run Deployment Setup

This document explains how to deploy the blog to Google Cloud Run with automatic language detection.

## Overview

The blog is deployed as a containerized Express server that:
- Serves static files from the `_site` directory
- Detects user's preferred language from Accept-Language headers
- Stores language preference in cookies
- Redirects users to appropriate language version on first visit
- Supports manual language switching via query parameters

## Prerequisites

1. **Google Cloud Project**
   - Create a project at https://console.cloud.google.com
   - Note your project ID

2. **Enable Required APIs**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. **Install Google Cloud SDK**
   - Download from https://cloud.google.com/sdk/docs/install
   - Initialize: `gcloud init`
   - Authenticate: `gcloud auth login`

4. **Create Service Account for GitHub Actions**
   ```bash
   # Create service account
   gcloud iam service-accounts create github-actions \
     --display-name="GitHub Actions Service Account"

   # Grant necessary permissions
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/run.admin"

   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/storage.admin"

   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"

   # Create and download key
   gcloud iam service-accounts keys create ~/gcp-key.json \
     --iam-account=github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

## GitHub Secrets Setup

Add the following secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **GCP_PROJECT_ID**: Your Google Cloud project ID
2. **GCP_SA_KEY**: Contents of the service account key file (`~/gcp-key.json`)

## Local Testing

### Test Express Server Locally

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm run start:server
   ```

3. **Test language detection:**
   ```bash
   # Default (should use Japanese)
   curl -I http://localhost:8080/

   # Request English
   curl -I -H "Accept-Language: en-US" http://localhost:8080/

   # Force language via query param
   curl -I http://localhost:8080/?lang=en
   ```

### Test Docker Build Locally

1. **Build the image:**
   ```bash
   docker build -t blog-agektmr-com:local .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8080:8080 blog-agektmr-com:local
   ```

3. **Access the site:**
   Open http://localhost:8080 in your browser

## Manual Deployment

If you want to deploy manually instead of using GitHub Actions:

1. **Build and push to GCR:**
   ```bash
   # Set project
   export PROJECT_ID=your-project-id

   # Build image
   docker build -t gcr.io/$PROJECT_ID/blog-agektmr-com:latest .

   # Configure Docker for GCR
   gcloud auth configure-docker

   # Push image
   docker push gcr.io/$PROJECT_ID/blog-agektmr-com:latest
   ```

2. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy blog-agektmr-com \
     --image gcr.io/$PROJECT_ID/blog-agektmr-com:latest \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --memory 512Mi \
     --cpu 1 \
     --min-instances 0 \
     --max-instances 10 \
     --timeout 60 \
     --set-env-vars NODE_ENV=production
   ```

3. **Get the service URL:**
   ```bash
   gcloud run services describe blog-agektmr-com \
     --platform managed \
     --region us-central1 \
     --format 'value(status.url)'
   ```

## Automatic Deployment (GitHub Actions)

Once GitHub secrets are configured, every push to the `main` branch will automatically:
1. Build the Docker image
2. Push to Google Container Registry
3. Deploy to Cloud Run
4. Output the service URL

## Language Detection Logic

The server uses the following priority for language detection:

1. **Query Parameter** (`?lang=ja` or `?lang=en`)
   - Highest priority
   - Sets a cookie and redirects

2. **Cookie** (`language_preference`)
   - Stored for 1 year
   - Set on first visit or manual language switch

3. **Accept-Language Header**
   - Parsed from browser preferences
   - Uses quality values for prioritization

4. **Default** (Japanese)
   - Fallback if no preference detected

## Custom Domain Setup

To use a custom domain with Cloud Run:

1. **Verify domain ownership:**
   ```bash
   gcloud domains verify blog.agektmr.com
   ```

2. **Map domain to service:**
   ```bash
   gcloud run domain-mappings create \
     --service blog-agektmr-com \
     --domain blog.agektmr.com \
     --region us-central1
   ```

3. **Update DNS records:**
   - Add the DNS records provided by Cloud Run
   - Typically CNAME or A records

4. **Wait for SSL certificate provisioning** (automatic, takes 15-60 minutes)

## Monitoring and Logs

**View logs:**
```bash
gcloud run logs read blog-agektmr-com \
  --region us-central1 \
  --limit 50
```

**View metrics:**
- Go to https://console.cloud.google.com/run
- Select your service
- Click on "Metrics" tab

## Cost Estimation

Cloud Run pricing (as of 2024):
- **Free tier:** 2 million requests/month
- **CPU:** $0.00002400 per vCPU-second
- **Memory:** $0.00000250 per GiB-second
- **Requests:** $0.40 per million requests

**Estimated monthly cost for a small blog:**
- 100,000 page views/month
- Average 500ms response time
- 512Mi memory, 1 vCPU
- **~$5-10/month** (well within free tier for most blogs)

## Troubleshooting

### Build fails in GitHub Actions
- Check that all secrets are properly set
- Verify service account has necessary permissions
- Review logs in GitHub Actions tab

### Service returns 500 errors
- Check Cloud Run logs: `gcloud run logs read blog-agektmr-com`
- Verify `_site` directory exists in container
- Check that Express server is listening on port 8080

### Language detection not working
- Verify cookies are enabled in browser
- Check Accept-Language header in browser settings
- Test with `?lang=en` or `?lang=ja` query parameter

### Container won't start
- Test Docker image locally first
- Check health check configuration
- Verify environment variables are set correctly

## Security Considerations

- Service account key should never be committed to repository
- Use least-privilege IAM roles
- Enable Cloud Run security features:
  - Container scanning
  - Binary authorization (optional)
  - VPC Service Controls (for enterprise)

## References

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Container Registry Documentation](https://cloud.google.com/container-registry/docs)
- [GitHub Actions for GCP](https://github.com/google-github-actions)


## Personal Memo

I was following the instructions at [[./next-steps.md^#### 6. Deploy to Cloud Run]] Option 2: Manual deployment, however, I got the following error:

```sh
ERROR: (gcloud.run.deploy) Revision 'blog-agektmr-com-00003-5d4' is not ready and cannot serve traffic. Cloud Run does not support image 'gcr.io/tender-surrender/blog-agektmr-com:latest': Container manifest type 'application/vnd.oci.image.index.v1+json' must support amd64/linux.
```

Gemini gave me the following commands that worked successfully:

```sh
docker buildx build --platform=linux/amd64 -t gcr.io/tender-surrender/blog-agektmr-com:latest --push .
```

```sh
gcloud run deploy blog-agektmr-com --image gcr.io/tender-surrender/blog-agektmr-com:latest --region us-central1 --project tender-surrender
```


