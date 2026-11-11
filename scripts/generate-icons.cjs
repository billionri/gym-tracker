const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Write public/icon.svg
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#c2410c"/>
    </linearGradient>
    <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background rounded rect -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  <rect x="12" y="12" width="488" height="488" rx="100" fill="none" stroke="#fdba74" stroke-width="6" opacity="0.4"/>

  <!-- Center dumbbell icon & flame -->
  <g filter="url(#shadow)" transform="translate(0, 0)">
    <!-- Central bar -->
    <rect x="128" y="240" width="256" height="32" rx="16" fill="url(#metalGrad)" stroke="#7c2d12" stroke-width="4"/>
    
    <!-- Knurling ridges on bar -->
    <line x1="216" y1="244" x2="216" y2="268" stroke="#ea580c" stroke-width="3"/>
    <line x1="236" y1="244" x2="236" y2="268" stroke="#ea580c" stroke-width="3"/>
    <line x1="256" y1="244" x2="256" y2="268" stroke="#ea580c" stroke-width="3"/>
    <line x1="276" y1="244" x2="276" y2="268" stroke="#ea580c" stroke-width="3"/>
    <line x1="296" y1="244" x2="296" y2="268" stroke="#ea580c" stroke-width="3"/>

    <!-- Left inner collar -->
    <rect x="140" y="224" width="20" height="64" rx="8" fill="#ffffff" stroke="#7c2d12" stroke-width="3"/>
    <!-- Left outer plate -->
    <rect x="96" y="176" width="36" height="160" rx="14" fill="#ffffff" stroke="#7c2d12" stroke-width="4"/>
    <rect x="64" y="200" width="28" height="112" rx="10" fill="url(#greenGrad)" stroke="#7c2d12" stroke-width="4"/>

    <!-- Right inner collar -->
    <rect x="352" y="224" width="20" height="64" rx="8" fill="#ffffff" stroke="#7c2d12" stroke-width="3"/>
    <!-- Right outer plate -->
    <rect x="380" y="176" width="36" height="160" rx="14" fill="#ffffff" stroke="#7c2d12" stroke-width="4"/>
    <rect x="420" y="200" width="28" height="112" rx="10" fill="url(#greenGrad)" stroke="#7c2d12" stroke-width="4"/>

    <!-- Floating Iron Flame on top -->
    <path d="M256 100 C272 136 304 168 288 196 C280 210 264 212 256 220 C248 212 232 210 224 196 C208 168 240 136 256 100 Z" fill="#ffffff" opacity="0.95"/>
    <path d="M256 130 C264 152 284 172 274 190 C268 200 258 202 256 206 C254 202 244 200 238 190 C228 172 248 152 256 130 Z" fill="url(#greenGrad)"/>

    <!-- GymForge Text Pill below -->
    <rect x="144" y="360" width="224" height="48" rx="24" fill="#059669" stroke="#ffffff" stroke-width="4"/>
    <text x="256" y="392" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="22" letter-spacing="2">GYMFORGE</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');

// CRC32 implementation for PNG
function crc32(buf) {
  let table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createPng(width, height, getPixel) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdr);

  const rawScanlines = [];
  for (let y = 0; y < height; y++) {
    const scanline = Buffer.alloc(1 + width * 4);
    scanline[0] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const offset = 1 + x * 4;
      scanline[offset] = r;
      scanline[offset + 1] = g;
      scanline[offset + 2] = b;
      scanline[offset + 3] = a;
    }
    rawScanlines.push(scanline);
  }

  const rawData = Buffer.concat(rawScanlines);
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Icon generator logic: Orange background with Green dumbbell silhouette
function renderIcon(size, isMaskable = false) {
  const scale = size / 512;
  const padding = isMaskable ? 0.15 : 0.05; // 15% safe margin for maskable

  return createPng(size, size, (x, y, w, h) => {
    const nx = x / w; // 0 to 1
    const ny = y / h; // 0 to 1

    // Background gradient: Orange (#ea580c to #c2410c)
    let bgR = Math.round(234 + (194 - 234) * ny);
    let bgG = Math.round(88 + (65 - 88) * ny);
    let bgB = Math.round(12 + (12 - 12) * ny);
    let bgA = 255;

    // Corner rounding for standard icons (not maskable)
    if (!isMaskable) {
      const radius = 0.22;
      const cornerX = nx < radius ? radius - nx : nx > (1 - radius) ? nx - (1 - radius) : 0;
      const cornerY = ny < radius ? radius - ny : ny > (1 - radius) ? ny - (1 - radius) : 0;
      if (cornerX > 0 && cornerY > 0 && (cornerX * cornerX + cornerY * cornerY) > (radius * radius)) {
        return [0, 0, 0, 0]; // Transparent outside rounded corner
      }
    }

    // Centered coordinates (-1 to 1) within the inner padded area
    const innerW = 1 - 2 * padding;
    const innerH = 1 - 2 * padding;
    const cx = ((nx - padding) / innerW - 0.5) * 2;
    const cy = ((ny - padding) / innerH - 0.5) * 2;

    // Inside barbell geometry?
    // Central bar: cy between -0.08 and 0.08, cx between -0.6 and 0.6
    const inBar = cy >= -0.07 && cy <= 0.07 && cx >= -0.55 && cx <= 0.55;
    // Outer plates left: cx between -0.85 and -0.7, cy between -0.45 and 0.45
    const inLeftOuter = cx >= -0.85 && cx <= -0.72 && cy >= -0.45 && cy <= 0.45;
    // Inner plates left: cx between -0.70 and -0.55, cy between -0.32 and 0.32
    const inLeftInner = cx >= -0.70 && cx <= -0.57 && cy >= -0.32 && cy <= 0.32;

    // Outer plates right: cx between 0.72 and 0.85, cy between -0.45 and 0.45
    const inRightOuter = cx >= 0.72 && cx <= 0.85 && cy >= -0.45 && cy <= 0.45;
    // Inner plates right: cx between 0.57 and 0.70, cy between -0.32 and 0.32
    const inRightInner = cx >= 0.57 && cx <= 0.70 && cy >= -0.32 && cy <= 0.32;

    // Flame on top of bar: cx between -0.15 and 0.15, cy between -0.55 and -0.12
    const distToFlameCenter = Math.sqrt((cx * cx * 2.5) + Math.pow(cy + 0.32, 2));
    const inFlame = distToFlameCenter < 0.22 && cy <= -0.10;

    // Pill label on bottom: cy between 0.4 and 0.68, cx between -0.6 and 0.6
    const inPill = cy >= 0.42 && cy <= 0.68 && cx >= -0.62 && cx <= 0.62;

    if (inBar) {
      return [255, 255, 255, 255]; // Crisp white bar
    }
    if (inLeftOuter || inRightOuter) {
      return [16, 185, 129, 255]; // Emerald green outer plates
    }
    if (inLeftInner || inRightInner) {
      return [255, 255, 255, 255]; // White inner plates
    }
    if (inFlame) {
      return [16, 185, 129, 255]; // Emerald green flame
    }
    if (inPill) {
      return [5, 150, 105, 255]; // Emerald green bottom pill
    }

    return [bgR, bgG, bgB, bgA];
  });
}

// Write the files
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), renderIcon(192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), renderIcon(512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), renderIcon(512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), renderIcon(180, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), renderIcon(48, false));

console.log('All PWA / Android APK icon assets generated successfully in /public!');
