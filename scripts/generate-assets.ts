import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import stats from "../data/stats.json";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function generateOG() {
  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="50%" style="stop-color:#111111"/>
          <stop offset="100%" style="stop-color:#0a0a0a"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#333333"/>
          <stop offset="100%" style="stop-color:#1a1a1a"/>
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <circle cx="100" cy="100" r="300" fill="#ffffff" opacity="0.02"/>
      <circle cx="1100" cy="530" r="400" fill="#ffffff" opacity="0.015"/>
      
      <rect x="80" y="280" width="60" height="2" fill="#333" rx="1"/>
      
      <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#666" letter-spacing="3">
        OPEN SOURCE LAB
      </text>
      
      <text x="80" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="300" fill="#fafafa" letter-spacing="-2">
        crafter-station
      </text>
      
      <text x="80" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="120" font-weight="200" fill="#fafafa" letter-spacing="-4">
        2025
      </text>
      
      <text x="380" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#666" letter-spacing="2">
        WRAPPED
      </text>
      
      <g transform="translate(80, 500)">
        <text font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#666">
          <tspan x="0" font-weight="500" fill="#888">${stats.totalStars}</tspan>
          <tspan dx="4">stars</tspan>
          <tspan dx="24" font-weight="500" fill="#888">${stats.publicRepos}</tspan>
          <tspan dx="4">repos</tspan>
          <tspan dx="24" font-weight="500" fill="#888">${stats.totalContributors}</tspan>
          <tspan dx="4">contributors</tspan>
          <tspan dx="24" font-weight="500" fill="#888">${stats.totalCommits.toLocaleString()}</tspan>
          <tspan dx="4">commits</tspan>
        </text>
      </g>
      
      <rect x="0" y="0" width="4" height="100%" fill="url(#accent)"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile("public/og.png");

  console.log("Generated: public/og.png");
}

async function generateFavicon() {
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fbg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a"/>
          <stop offset="100%" style="stop-color:#0a0a0a"/>
        </linearGradient>
      </defs>
      
      <rect width="512" height="512" rx="96" fill="url(#fbg)"/>
      
      <text 
        x="256" 
        y="300" 
        font-family="system-ui, -apple-system, sans-serif" 
        font-size="240" 
        font-weight="300" 
        fill="#fafafa" 
        text-anchor="middle"
        letter-spacing="-12"
      >cs</text>
      
      <circle cx="256" cy="460" r="20" fill="#333"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .resize(32, 32)
    .png()
    .toFile("public/favicon-32.png");

  await sharp(Buffer.from(svg))
    .resize(16, 16)
    .png()
    .toFile("public/favicon-16.png");

  await sharp(Buffer.from(svg))
    .resize(180, 180)
    .png()
    .toFile("public/apple-touch-icon.png");

  await sharp(Buffer.from(svg))
    .resize(192, 192)
    .png()
    .toFile("public/icon-192.png");

  await sharp(Buffer.from(svg))
    .resize(512, 512)
    .png()
    .toFile("public/icon-512.png");

  const ico16 = await sharp(Buffer.from(svg)).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(Buffer.from(svg)).resize(48, 48).png().toBuffer();

  await sharp(ico32).toFile("public/favicon.ico");

  console.log("Generated: favicon files");
}

async function main() {
  try {
    await generateOG();
    await generateFavicon();
    console.log("\nAll assets generated successfully!");
  } catch (error) {
    console.error("Error generating assets:", error);
    process.exit(1);
  }
}

main();

