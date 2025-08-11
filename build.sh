#!/bin/bash

echo "🚀 Starting Vercel build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type check
echo "🔍 Running type check..."
npm run type-check

# Lint check
echo "🧹 Running lint check..."
npm run lint --fix

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build process completed successfully!"
