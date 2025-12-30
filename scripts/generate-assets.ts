import sharp from "sharp";
import stats from "../data/stats.json";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const LOGO_PATH = "M116.419 16.3268C109.59 11.5679 97.9222 5.96914 90.2388 3.72965C72.8798 -1.58913 59.1794 1.40491 50.114 4.56947C32.4704 10.7281 21.3721 18.8462 11.412 33.6828C-4.23949 56.6375 -1.96292 93.869 17.1035 114.864C21.3721 119.903 23.6487 119.063 40.1539 107.026C40.723 106.466 38.4465 102.827 35.0316 98.6278C27.3481 89.11 22.7949 71.754 25.0715 61.9563C32.4704 31.1634 70.3187 14.6472 94.7919 31.4433C100.199 35.0825 117.273 50.199 132.64 65.0356C155.691 86.8706 162.52 91.9094 168.212 91.3496C173.903 90.7897 175.895 88.8301 176.464 82.6715C177.318 75.9531 174.757 72.034 161.667 60.2767C152.845 52.1585 145.731 44.8802 145.731 43.4805C145.731 42.3608 151.707 37.6019 159.105 33.1229C206.914 3.1698 258.421 62.7961 218.581 101.987C213.459 107.026 204.353 112.345 198.377 114.024C191.547 115.704 159.959 117.104 120.688 117.104C47.2683 117.104 43.2842 117.943 23.9332 135.02C-0.824636 157.134 -6.51609 194.926 10.8429 222.359C33.3241 258.191 81.7016 267.149 115.85 241.675L128.372 232.157L142.885 241.675C166.504 257.351 185.571 260.431 208.621 252.872C254.722 237.476 271.796 179.809 241.916 141.178C238.501 136.979 236.794 136.699 232.241 138.939C218.297 146.777 218.581 146.217 226.834 163.013C233.094 175.89 234.233 180.929 232.81 190.727C228.826 215.361 210.044 231.877 186.14 231.877C167.643 231.877 161.667 228.238 127.518 195.486C109.59 178.689 93.0845 164.693 90.8079 164.693C86.5393 164.693 77.433 173.371 77.433 177.57C77.433 178.689 85.1165 187.647 94.7919 197.165L112.151 214.241L101.906 222.08C65.7655 249.233 14.2578 216.761 26.2098 174.211C29.9093 161.333 42.9996 147.057 55.5209 142.578C60.3586 140.618 90.2388 139.498 130.648 139.498C204.922 139.498 213.744 138.099 230.818 123.542C281.757 80.9919 252.161 0.930299 185.571 1.21023C166.22 1.21023 155.691 5.12933 137.762 18.2863L128.656 25.0048L116.419 16.3268Z";

async function generateOG() {
  const svg = `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="50%" style="stop-color:#111111"/>
          <stop offset="100%" style="stop-color:#0a0a0a"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#F8BC31;stop-opacity:0.15"/>
          <stop offset="100%" style="stop-color:#F8BC31;stop-opacity:0"/>
        </radialGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="40"/>
        </filter>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#bg)"/>
      
      <circle cx="180" cy="315" r="200" fill="url(#glow)" filter="url(#blur)"/>
      
      <circle cx="1100" cy="530" r="300" fill="#ffffff" opacity="0.01"/>
      
      <g transform="translate(80, 215) scale(0.78)">
        <path d="${LOGO_PATH}" fill="#F8BC31"/>
      </g>
      
      <text x="320" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#666" letter-spacing="3">
        OPEN SOURCE LAB
      </text>
      
      <text x="320" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="500" fill="#fafafa" letter-spacing="-1">
        Crafter Station
      </text>
      
      <g transform="translate(320, 380)">
        <text font-family="system-ui, -apple-system, sans-serif" font-size="100" font-weight="200" fill="#fafafa" letter-spacing="-3">
          2025
        </text>
        <text x="290" y="-10" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500" fill="#666" letter-spacing="3">
          WRAPPED
        </text>
      </g>
      
      <line x1="320" y1="420" x2="540" y2="420" stroke="#333" stroke-width="1"/>
      
      <g transform="translate(320, 470)">
        <text font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#888">
          <tspan font-weight="600" fill="#F8BC31">${stats.totalStars}</tspan>
          <tspan fill="#666" dx="6">stars</tspan>
          <tspan dx="30" font-weight="600" fill="#fafafa">${stats.publicRepos}</tspan>
          <tspan fill="#666" dx="6">repos</tspan>
          <tspan dx="30" font-weight="600" fill="#fafafa">${stats.totalContributors}</tspan>
          <tspan fill="#666" dx="6">contributors</tspan>
        </text>
      </g>
      
      <g transform="translate(320, 510)">
        <text font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#888">
          <tspan font-weight="600" fill="#fafafa">${stats.totalCommits.toLocaleString()}</tspan>
          <tspan fill="#666" dx="6">commits</tspan>
          <tspan dx="30" font-weight="600" fill="#fafafa">${Math.round(stats.totalLinesOfCode / 1000)}k</tspan>
          <tspan fill="#666" dx="6">lines of code</tspan>
        </text>
      </g>
      
      <rect x="0" y="0" width="4" height="100%" fill="#F8BC31" opacity="0.8"/>
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
      
      <g transform="translate(76, 76) scale(1.4)">
        <path d="${LOGO_PATH}" fill="#F8BC31"/>
      </g>
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

  await sharp(Buffer.from(svg)).resize(32, 32).toFile("public/favicon.ico");

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
