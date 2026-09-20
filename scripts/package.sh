#!/bin/bash
# Tactical Six | Release Protocol Utility
# This script prepares the static build and packages it into a zip archive for publishing.

echo "--- TACTICAL SIX | RELEASE PROTOCOL ---"

# Step 1: Clean previous build artifacts
echo "[1/3] Purging old build data..."
rm -rf out
rm -f tactical-six-release.zip

# Step 2: Production Build
echo "[2/3] Executing production build (Static Export)..."
# Using npm run build which triggers next build + export
npm run build

# Step 3: Archive the 'out' directory
echo "[3/3] Compressing artifacts for deployment..."
if command -v zip >/dev/null 2>&1; then
    # We enter the out directory to ensure the zip doesn't have a top-level 'out' folder
    # as required by most game portals (Yandex, Poki, etc.)
    cd out
    zip -r ../tactical-six-release.zip . > /dev/null
    cd ..
    echo "--- PROTOCOL COMPLETE ---"
    echo "Release Archive Created: tactical-six-release.zip"
else
    echo "Error: 'zip' utility not found. Please archive the 'out' folder manually."
    exit 1
fi
