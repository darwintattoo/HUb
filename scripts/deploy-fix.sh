#!/bin/bash

# Script to fix deployment configuration mismatch
# This script moves the build output from dist/public to dist to match deployment expectations

echo "Fixing deployment configuration mismatch..."

# Check if dist/public exists
if [ -d "dist/public" ]; then
    echo "Found build output in dist/public"
    
    # Create dist directory if it doesn't exist
    mkdir -p dist
    
    # Copy all files from dist/public to dist
    cp -r dist/public/* dist/
    
    echo "Successfully copied files from dist/public to dist"
    echo "Deployment fix complete!"
else
    echo "dist/public directory not found. Build may not have completed successfully."
    exit 1
fi