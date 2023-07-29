import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

const validImageExtensions = ['.jpg', '.jpeg', '.png'];
const rootDirectory = path.join(process.cwd(), 'src/assets');

async function processImages(directory) {
  const files = await fs.promises.readdir(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      if (file !== 'webp') {
        await processImages(filePath);  // Recursion for directories
      }
    } else {
      const fileExtension = path.extname(filePath).toLowerCase();
      if (!validImageExtensions.includes(fileExtension)) {
        console.log(`El archivo "${file}" no es una imagen válida.`);
        continue;
      }

      const outputPath = path.join(directory, 'webp', file);
      console.log(`Comprimiendo el archivo "${file}"...`);
      const { width } = await sharp(filePath).metadata();

      let imageData;
      if (width > 2080) {
        imageData = await sharp(filePath).resize(1080).toBuffer();
      } else {
        imageData = await sharp(filePath).toBuffer();
      }

      const webpData = await imagemin.buffer(imageData, {
        plugins: [imageminWebp({ quality: 100 })]
      });

      await fs.promises.mkdir(path.join(directory, 'webp'), { recursive: true });
      await fs.promises.writeFile(outputPath + '.webp', webpData);
      console.log('Image processed and saved:', outputPath + '.webp');
    }
  }
}

processImages(rootDirectory).catch(err => {
  console.error('Error processing images:', err);
});