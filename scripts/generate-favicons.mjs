import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
const sourceLogo = resolve(__dirname, '..', 'src', 'assets', 'tobvision-logo.png');

// Extract only the T-monogram from the top half of the 500x500 TobVision logo
// (wordmark "TobVision" sits in the bottom half, we skip it).
async function extractMonogram() {
  // Step 1: crop the top half (icon area, wordmark lives in bottom half).
  const topHalf = await sharp(sourceLogo)
    .extract({ left: 0, top: 0, width: 500, height: 260 })
    .png()
    .toBuffer();
  // Step 2: auto-trim transparent borders for tight bounding box.
  const trimmed = await sharp(topHalf).trim().png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  return { buffer: trimmed, width: meta.width, height: meta.height };
}

// Recolor the monochrome-navy monogram to warm-white via dest-in alpha composite.
async function recolorToLight({ buffer, width, height }, hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return await sharp({
    create: { width, height, channels: 4, background: { r, g, b, alpha: 1 } },
  })
    .composite([{ input: buffer, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function makeFavicon(size, outputPath, { monogram, padding = 0.18, radius = 0.22, bg = '#141414' }) {
  // Inner canvas size for the monogram.
  const iconMax = Math.round(size * (1 - padding * 2));
  const monoAspect = monogram.width / monogram.height;
  let iconW, iconH;
  if (monoAspect >= 1) {
    iconW = iconMax;
    iconH = Math.round(iconMax / monoAspect);
  } else {
    iconH = iconMax;
    iconW = Math.round(iconMax * monoAspect);
  }

  const scaled = await sharp(monogram.buffer)
    .resize(iconW, iconH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const r = Math.round(size * radius);
  const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/>
  </svg>`;
  const bgBuf = await sharp(Buffer.from(bgSvg)).png().toBuffer();

  const offsetX = Math.round((size - iconW) / 2);
  const offsetY = Math.round((size - iconH) / 2);

  await sharp(bgBuf)
    .composite([{ input: scaled, top: offsetY, left: offsetX }])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`${outputPath.split('/').pop()} ${size}x${size}`);
}

// Generate an inline SVG favicon embedding the cropped monogram as a base64 PNG.
// Keeps the SVG favicon flexible on modern browsers while matching the PNG variants.
async function writeSvgFavicon(monogramLight, outputPath) {
  const size = 64;
  const padding = 8;
  const aspect = monogramLight.width / monogramLight.height;
  let iconW, iconH;
  if (aspect >= 1) {
    iconW = size - padding * 2;
    iconH = Math.round(iconW / aspect);
  } else {
    iconH = size - padding * 2;
    iconW = Math.round(iconH * aspect);
  }
  const scaled = await sharp(monogramLight.buffer)
    .resize(iconW, iconH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const b64 = scaled.toString('base64');
  const ox = (size - iconW) / 2;
  const oy = (size - iconH) / 2;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="14" fill="#141414"/>
  <image x="${ox}" y="${oy}" width="${iconW}" height="${iconH}" href="data:image/png;base64,${b64}"/>
</svg>`;
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outputPath, svg, 'utf8');
  console.log(`${outputPath.split('/').pop()} (SVG ${size}x${size} with embedded monogram)`);
}

const monogram = await extractMonogram();
console.log(`Monogram cropped: ${monogram.width}x${monogram.height}`);

const monoLightBuf = await recolorToLight(monogram, '#f0ede8');
const monoLight = { buffer: monoLightBuf, width: monogram.width, height: monogram.height };

await makeFavicon(180, resolve(publicDir, 'apple-touch-icon.png'), { monogram: monoLight });
await makeFavicon(192, resolve(publicDir, 'favicon-192.png'), { monogram: monoLight });
await makeFavicon(32, resolve(publicDir, 'favicon-32.png'), { monogram: monoLight });
await writeSvgFavicon(monoLight, resolve(publicDir, 'favicon.svg'));
