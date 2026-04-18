import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-image.png');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="80%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#c8963e" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="#141e49" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#141414" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="headline" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="#f0ede8"/>
      <stop offset="100%" stop-color="#d4cfc7"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#141414"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g transform="translate(80, 80)">
    <g font-family="Work Sans, system-ui, sans-serif" font-weight="700" font-size="32" fill="#c8963e" letter-spacing="4">
      <text x="0" y="0">TOBVISION</text>
    </g>
  </g>

  <g transform="translate(80, 230)">
    <rect x="0" y="-6" width="60" height="3" fill="#c8963e"/>
  </g>

  <g transform="translate(80, 290)" font-family="Work Sans, system-ui, sans-serif" font-weight="700" fill="url(#headline)" letter-spacing="-1">
    <text x="0" y="0" font-size="68">Conversion-Copy für</text>
    <text x="0" y="82" font-size="68">DACH-Performance-</text>
    <text x="0" y="164" font-size="68" fill="#c8963e">Agenturen</text>
  </g>

  <g transform="translate(80, 540)" font-family="DM Sans, system-ui, sans-serif" font-weight="400" font-size="22" fill="#c9c5bf">
    <text x="0" y="0">Erst diagnostizieren. Dann schreiben. 10 Arbeitstage.</text>
  </g>
</svg>
`;

await mkdir(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).png({ quality: 95, compressionLevel: 9 }).toFile(out);

console.log(`OG image written to ${out}`);
