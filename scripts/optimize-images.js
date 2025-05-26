const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.resolve(__dirname, '../src/assets/Artur_profile_photo.png');
const outputPath = path.resolve(__dirname, '../public/assets');

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .resize(600) // Resize to a reasonable width for a profile photo
      .webp({ quality: 90 }) // Convert to WebP with 90% quality
      .toFile(path.join(outputPath, 'Artur_profile_photo.webp'));

    console.log('Artur_profile_photo.png optimized and converted to WebP!');
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

optimizeImage();
