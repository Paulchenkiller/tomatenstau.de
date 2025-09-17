const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function optimizeImages() {
  const inputPath = 'src/assets/images';
  const outputPath = 'src/assets/images/optimized';

  // Ensure output directory exists
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  console.log('🖼️  Starting image optimization with Sharp...\n');

  try {
    const files = await readdir(inputPath);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('❌ No image files found to optimize');
      return;
    }

    console.log(`📊 Found ${imageFiles.length} image files to process\n`);

    let originalTotalSize = 0;
    let optimizedTotalSize = 0;
    let webpTotalSize = 0;
    const processedFiles = [];

    for (const file of imageFiles) {
      const inputFile = path.join(inputPath, file);
      const originalStats = await stat(inputFile);
      originalTotalSize += originalStats.size;

      const filename = path.parse(file).name;
      const ext = path.parse(file).ext.toLowerCase();

      console.log(`🔄 Processing: ${file} (${formatBytes(originalStats.size)})`);

      // Optimize original format
      const optimizedPath = path.join(outputPath, file);
      let sharpInstance = sharp(inputFile);

      if (ext === '.jpg' || ext === '.jpeg') {
        await sharpInstance
          .jpeg({ quality: 85, progressive: true })
          .toFile(optimizedPath);
      } else if (ext === '.png') {
        await sharpInstance
          .png({ quality: 85, compressionLevel: 8 })
          .toFile(optimizedPath);
      }

      const optimizedStats = await stat(optimizedPath);
      optimizedTotalSize += optimizedStats.size;

      // Create WebP version
      const webpPath = path.join(outputPath, `${filename}.webp`);
      await sharp(inputFile)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);

      const webpStats = await stat(webpPath);
      webpTotalSize += webpStats.size;

      const originalSaving = ((originalStats.size - optimizedStats.size) / originalStats.size * 100);
      const webpSaving = ((originalStats.size - webpStats.size) / originalStats.size * 100);

      console.log(`  📦 ${file}: ${formatBytes(optimizedStats.size)} (${originalSaving.toFixed(1)}% savings)`);
      console.log(`  🌐 ${filename}.webp: ${formatBytes(webpStats.size)} (${webpSaving.toFixed(1)}% savings)`);

      processedFiles.push({
        original: file,
        originalSize: originalStats.size,
        optimizedSize: optimizedStats.size,
        webpSize: webpStats.size
      });

      console.log('');
    }

    // Summary
    console.log('\n✅ Optimization complete!\n');
    console.log('📊 SUMMARY:');
    console.log(`   Original files: ${formatBytes(originalTotalSize)}`);
    console.log(`   Optimized files: ${formatBytes(optimizedTotalSize)} (${((originalTotalSize - optimizedTotalSize) / originalTotalSize * 100).toFixed(1)}% savings)`);
    console.log(`   WebP files: ${formatBytes(webpTotalSize)} (${((originalTotalSize - webpTotalSize) / originalTotalSize * 100).toFixed(1)}% savings)`);
    console.log(`   Best savings: WebP format with ${((originalTotalSize - webpTotalSize) / originalTotalSize * 100).toFixed(1)}% reduction\n`);

    // Generate implementation guide
    generateImplementationGuide(processedFiles);

  } catch (error) {
    console.error('❌ Error during optimization:', error);
  }
}

function generateImplementationGuide(processedFiles) {
  console.log('📋 IMPLEMENTATION GUIDE:\n');

  console.log('1. 🔧 UPDATE HTML TEMPLATES:');
  console.log('   Replace simple <img> tags with responsive <picture> elements:\n');

  for (const file of processedFiles.slice(0, 2)) { // Show examples for first 2 files
    const filename = path.parse(file.original).name;
    const ext = path.parse(file.original).ext;

    console.log(`   <!-- ${file.original} -->`);
    console.log('   <picture>');
    console.log(`     <source srcset="assets/images/optimized/${filename}.webp" type="image/webp">`);
    console.log(`     <img src="assets/images/optimized/${file.original}" `);
    console.log('          alt="[Add meaningful alt text]" ');
    console.log('          loading="lazy"');
    console.log('          width="[original-width]" height="[original-height]">');
    console.log('   </picture>\n');
  }

  console.log('2. 📱 CSS BACKGROUND IMAGES:');
  console.log('   Update CSS to use optimized images:');
  console.log('   .logo { background-image: url("assets/images/optimized/tomatenstau_logo.webp"); }');
  console.log('   @supports not (background-image: url("image.webp")) {');
  console.log('     .logo { background-image: url("assets/images/optimized/tomatenstau_logo.png"); }');
  console.log('   }\n');

  console.log('3. ⚡ PERFORMANCE BENEFITS:');
  console.log('   - Faster page load times');
  console.log('   - Reduced bandwidth usage');
  console.log('   - Better Core Web Vitals (LCP)');
  console.log('   - Improved mobile experience\n');

  console.log('4. 🚀 NEXT STEPS:');
  console.log('   a. Update src/app/index/index.component.html for profilbild.jpg');
  console.log('   b. Update src/app/header/header.component.scss for tomatenstau_logo.png');
  console.log('   c. Test both WebP and fallback images work correctly');
  console.log('   d. Run npm run lighthouse:prod to measure improvements');
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

optimizeImages().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});