import { execSync } from 'child_process';
import fs from 'fs';

// Define the command to run
const fontsDir = './dist/fonts';
const command = `glyphhanger ./dist/index.html --string --jsdom --cssSelector=".font-display, .font-display *" --subset=${fontsDir}/jomhuria.woff2 --output=${fontsDir}`;
// Run the command
console.log('Running command...');
execSync(command, { stdio: 'inherit' });

// Remove the original files
console.log('Removing original files...');
fs.readdirSync(fontsDir).forEach((filename) => {
  if (filename.endsWith('.woff2') && !filename.includes('subset')) {
    fs.rmSync(`${fontsDir}/${filename}`);
  }
});

// Rename the subset files to the original name
console.log('Renaming subset files...');
fs.readdirSync(fontsDir).forEach((filename) => {
  if (filename.endsWith('-subset.woff2')) {
    const originalFilename = filename.replace('-subset', '');
    fs.renameSync(`${fontsDir}/${filename}`, `${fontsDir}/${originalFilename}`);
  }
  if (filename.endsWith('-subset.zopfli.woff')) {
    const originalFilename = filename.replace('-subset.zopfli', '');
    fs.renameSync(`${fontsDir}/${filename}`, `${fontsDir}/${originalFilename}`);
  }
});

console.log('Done.');
