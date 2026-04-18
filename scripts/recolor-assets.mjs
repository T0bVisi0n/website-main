import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = resolve(__dirname, '..', 'src', 'assets');

// Recolor a transparent-background PNG to a single brand color while preserving the original alpha mask.
// Approach: build a solid color canvas, composite the original on top with `dest-in` blend so the canvas
// is kept only where the original has alpha. Result: original shape, new color.
async function recolor(inputName, outputName, hex) {
  const inputPath = resolve(assetsDir, inputName);
  const outputPath = resolve(assetsDir, outputName);
  const meta = await sharp(inputPath).metadata();
  const { width, height } = meta;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  await sharp({
    create: { width, height, channels: 4, background: { r, g, b, alpha: 1 } },
  })
    .composite([{ input: inputPath, blend: 'dest-in' }])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`${outputName}: ${width}x${height} → ${hex}`);
}

await recolor('tobvision-logo.png', 'tobvision-logo-light.png', '#f0ede8');
await recolor('tobias-huber-signature.png', 'tobias-huber-signature-gold.png', '#c8963e');
await recolor('tuev-rheinland-testmark.png', 'tuev-rheinland-testmark-light.png', '#f0ede8');
// PR logos: source PNGs are monochrome black-on-transparent → recolor to warm-white
// so they read on the dark background. Press section then drops greyscale+brightness filter.
await recolor('press-t3n.png', 'press-t3n-light.png', '#f0ede8');
await recolor('press-startup-valley.png', 'press-startup-valley-light.png', '#f0ede8');
await recolor('press-lifepr.png', 'press-lifepr-light.png', '#f0ede8');

console.log('Done.');
