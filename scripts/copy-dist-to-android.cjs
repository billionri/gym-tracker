const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../dist');
const destDir = path.resolve(__dirname, '../android/app/src/main/assets/www');

if (!fs.existsSync(srcDir)) {
  console.error('Error: dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Ensure destination exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Recursive copy
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursiveSync(srcDir, destDir);
console.log('Successfully copied Vite dist web assets into android/app/src/main/assets/www for offline APK bundling!');
