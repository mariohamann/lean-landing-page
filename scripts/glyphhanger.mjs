import { execSync } from 'child_process';
import fs from 'fs';

// Define the command to run
const fontsDir = './dist/fonts';
const command = (fontName, selector) => `glyphhanger ./dist/index.html --string --jsdom --cssSelector="${selector}" --subset=${fontsDir}/${fontName}.woff2 --output=${fontsDir}`;
// Run the command
console.log('Running command...');

execSync(command('jomhuria', '.font-display, .font-display *'), { stdio: 'inherit' });
execSync(command('nunito-400', '*'), { stdio: 'inherit' });
execSync(command('nunito-700', '.font-bold, .font-bold *'), { stdio: 'inherit' });

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
