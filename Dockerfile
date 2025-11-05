# Multi-stage build for blog.agektmr.com
# Stage 1: Build the site
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source files
COPY . .

# Build the site (includes Eleventy and Rollup)
RUN npm run build

# Stage 2: Production server
FROM node:22-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Add express and cookie-parser for server
RUN npm install express cookie-parser

# Copy built site from builder
COPY --from=builder /app/_site ./_site

# Copy server code
COPY server ./server

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "server/index.js"]
