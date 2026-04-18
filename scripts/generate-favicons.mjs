import sharp from 'sharp';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

// Branded favicon SVG (same as /favicon.svg, repeated here so this script is self-contained).
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#141414"/>
  <path d="M16 20h32v6h-13v24h-6V26H16z" fill="#C8963E"/>
</svg>`;

// 180x180 Apple touch icon
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(resolve(publicDir, 'apple-touch-icon.png'));
console.log('apple-touch-icon.png 180x180');

// 32x32 PNG fallback (for browsers/feeds that prefer PNG over SVG)
await sharp(Buffer.from(svg))
  .resize(32, 32)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(resolve(publicDir, 'favicon-32.png'));
console.log('favicon-32.png 32x32');

// 192x192 PWA-style icon
await sharp(Buffer.from(svg))
  .resize(192, 192)
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(resolve(publicDir, 'favicon-192.png'));
console.log('favicon-192.png 192x192');
