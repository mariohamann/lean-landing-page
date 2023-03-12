import { gzipSize, gzipSizeFromFileSync } from 'gzip-size';
import { readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url).split('/').slice(0, -1).join('/'));
const distFolder = path.resolve(__dirname, 'dist');

let totalOriginalSize = 0;
let totalGzipSize = 0;

function formatSize(size) {
  const KB = size / 1024;
  return `${KB.toFixed(2)} KB`;
}

function traverseFolder(folderPath) {
  const files = readdirSync(folderPath, { withFileTypes: true });

  files.forEach((file) => {
    if (file.name.endsWith('.br') || file.name.endsWith('.gz') || file.name.endsWith('.woff') || file.name.endsWith('.DS_Store') || file.name.endsWith('opengraph.jpg')) return; // Skip brotli and gzip files (if any

    // check if jpg exists as webp in same folder
    if (file.name.endsWith('.jpg') && files.find((f) => f.name === `${file.name.split('.jpg')[0]}.webp`)) return; // Skip jpg if webp exists

    const filePath = path.join(folderPath, file.name);
    const stats = statSync(filePath);

    if (file.isDirectory()) {
      traverseFolder(filePath);
    } else if (file.isFile()) {
      const originalSize = stats.size;
      const gzipSizeResult = gzipSizeFromFileSync(filePath);
      totalOriginalSize += originalSize;
      totalGzipSize += gzipSizeResult;

      const sizeDiff = ((originalSize - gzipSizeResult) / originalSize) * 100;

      const formattedOriginalSize = formatSize(originalSize);
      const formattedGzipSize = formatSize(gzipSizeResult);

      console.log(`${chalk.cyan(file.name.padEnd(30))}${chalk.yellow(formattedOriginalSize.padEnd(15))}${chalk.green(formattedGzipSize.padEnd(15))}${sizeDiff.toFixed(0).toString().padStart(3)}%`);
    }
  });
}

traverseFolder(distFolder);

const formattedTotalOriginalSize = formatSize(totalOriginalSize);
const formattedTotalGzipSize = formatSize(totalGzipSize);
const totalSizeDiff = ((totalOriginalSize - totalGzipSize) / totalOriginalSize) * 100;
const formattedTotalSizeDiff = totalSizeDiff.toFixed(0).toString().padStart(3);
console.log('-'.repeat(64));
console.log(`${chalk.cyan.bold('Total'.padEnd(30))}${chalk.yellow.bold(formattedTotalOriginalSize.padEnd(15))}${chalk.bold.green(formattedTotalGzipSize.padEnd(15))}${chalk.bold(formattedTotalSizeDiff)}%`);
