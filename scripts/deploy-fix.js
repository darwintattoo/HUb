#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to fix deployment configuration mismatch
 * Copies files from dist/public to dist to match deployment expectations
 */

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  console.log('🔧 Fixing deployment configuration mismatch...');
  
  const sourceDir = path.join(process.cwd(), 'dist', 'public');
  const targetDir = path.join(process.cwd(), 'dist');
  
  // Check if source directory exists
  if (!fs.existsSync(sourceDir)) {
    console.error('❌ dist/public directory not found. Build may not have completed successfully.');
    process.exit(1);
  }
  
  console.log('📁 Found build output in dist/public');
  
  try {
    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copy all files from dist/public to dist
    const items = fs.readdirSync(sourceDir);
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const targetPath = path.join(targetDir, item);
      copyRecursive(sourcePath, targetPath);
    });
    
    console.log('✅ Successfully copied files from dist/public to dist');
    console.log('🚀 Deployment fix complete! You can now deploy your project.');
    
  } catch (error) {
    console.error('❌ Error copying files:', error.message);
    process.exit(1);
  }
}

// Run main function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { copyRecursive, main };