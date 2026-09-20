#!/bin/bash
# Tactical Six | Release Protocol Utility
# This script prepares the static build and packages it into a versioned zip archive for publishing.

set -e # Exit immediately if a command exits with a non-zero status.

# Extract version from package.json
VERSION=$(grep '"version":' package.json | cut -d'"' -f4)
ZIP_NAME="tactical-six-v$VERSION.zip"

echo "--- TACTICAL SIX | RELEASE PROTOCOL v$VERSION ---"

# Step 1: Clean previous build artifacts
echo "[1/3] Purging old build data..."
rm -rf out
rm -f tactical-six-v*.zip

# Step 2: Production Build
echo "[2/3] Executing production build (Static Export)..."
# Using npm run build which triggers next build + export
npm run build

# Step 2.5: Post-build cleanup for specific platform requirements
if [ -d "out/404" ]; then
  echo "📦 Removing auto-generated 404 directory..."
  rm -rf out/404
fi

if [ -f "out/404.html" ]; then
  echo "📦 Removing auto-generated 404.html..."
  rm -f out/404.html
fi

# Step 3: Archive the 'out' directory
echo "[3/3] Compressing artifacts into $ZIP_NAME..."
if command -v zip >/dev/null 2>&1; then
    # We enter the out directory to ensure the zip doesn't have a top-level 'out' folder
    cd out
    zip -r ../$ZIP_NAME . > /dev/null
    cd ..
    echo "--- PROTOCOL COMPLETE ---"
    echo "Release Archive Created: $ZIP_NAME"
else
    echo "Error: 'zip' utility not found. Please archive the 'out' folder manually."
    exit 1
fi
