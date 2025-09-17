const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

const gzip = promisify(zlib.gzip);
const brotli = promisify(zlib.brotliCompress);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function compressFiles() {
  const distPath = 'dist/tomatenstaude';

  if (!fs.existsSync(distPath)) {
    console.log('❌ Build directory not found. Run npm run build first.');
    process.exit(1);
  }

  console.log('🗜️  Starting post-build compression...\n');

  const compressibleExtensions = ['.js', '.css', '.html', '.json', '.txt', '.xml', '.svg'];
  const compressionResults = [];

  async function processDirectory(dir) {
    const items = await readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        await processDirectory(fullPath);
      } else if (stats.isFile()) {
        const ext = path.extname(item).toLowerCase();

        if (compressibleExtensions.includes(ext) && stats.size > 1024) {
          // Only compress files > 1KB
          await compressFile(fullPath, stats.size);
        }
      }
    }
  }

  async function compressFile(filePath, originalSize) {
    try {
      const content = await readFile(filePath);
      const relativePath = path.relative(distPath, filePath);

      // Gzip compression
      const gzipContent = await gzip(content, { level: 9 });
      const gzipPath = filePath + '.gz';
      await writeFile(gzipPath, gzipContent);

      // Brotli compression
      const brotliContent = await brotli(content, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length,
        },
      });
      const brotliPath = filePath + '.br';
      await writeFile(brotliPath, brotliContent);

      const gzipSavings = ((originalSize - gzipContent.length) / originalSize) * 100;
      const brotliSavings = ((originalSize - brotliContent.length) / originalSize) * 100;

      console.log(`📦 ${relativePath}`);
      console.log(`   Original: ${formatBytes(originalSize)}`);
      console.log(
        `   Gzip: ${formatBytes(gzipContent.length)} (${gzipSavings.toFixed(1)}% savings)`,
      );
      console.log(
        `   Brotli: ${formatBytes(brotliContent.length)} (${brotliSavings.toFixed(1)}% savings)\n`,
      );

      compressionResults.push({
        file: relativePath,
        original: originalSize,
        gzip: gzipContent.length,
        brotli: brotliContent.length,
      });
    } catch (error) {
      console.error(`❌ Error compressing ${filePath}:`, error.message);
    }
  }

  await processDirectory(distPath);

  // Summary
  const totalOriginal = compressionResults.reduce((sum, file) => sum + file.original, 0);
  const totalGzip = compressionResults.reduce((sum, file) => sum + file.gzip, 0);
  const totalBrotli = compressionResults.reduce((sum, file) => sum + file.brotli, 0);

  const gzipSavingsTotal = ((totalOriginal - totalGzip) / totalOriginal) * 100;
  const brotliSavingsTotal = ((totalOriginal - totalBrotli) / totalOriginal) * 100;

  console.log('✅ Compression complete!\n');
  console.log('📊 COMPRESSION SUMMARY:');
  console.log(`   Files processed: ${compressionResults.length}`);
  console.log(`   Original total: ${formatBytes(totalOriginal)}`);
  console.log(`   Gzip total: ${formatBytes(totalGzip)} (${gzipSavingsTotal.toFixed(1)}% savings)`);
  console.log(
    `   Brotli total: ${formatBytes(totalBrotli)} (${brotliSavingsTotal.toFixed(1)}% savings)`,
  );
  console.log(
    `   Best compression: Brotli saves ${formatBytes(totalOriginal - totalBrotli)} additional bytes\n`,
  );

  console.log('🚀 SERVER CONFIGURATION:');
  console.log(
    '   http-server with compression: npx http-server dist/tomatenstaude -p 4201 --gzip --brotli',
  );
  console.log('   Brotli takes precedence over Gzip when both are available');
  console.log('   Modern browsers will automatically request .br files');
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

compressFiles().catch((error) => {
  console.error('❌ Compression failed:', error);
  process.exit(1);
});
