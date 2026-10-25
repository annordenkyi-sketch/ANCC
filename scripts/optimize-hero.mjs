// Generate responsive WebP + JPEG variants of a hero image, plus a tiny
// blurred LQIP (data URL) for use as an inline placeholder.
//
// Usage:
//   node scripts/optimize-hero.mjs <source.jpg> [widths]
// Example:
//   node scripts/optimize-hero.mjs public/home/home-cover.jpg 480,960,1600
//
// Outputs <source>-<width>.webp and <source>-<width>.jpg for each width,
// and prints a base64 LQIP data URL to stdout.
import sharp from 'sharp'
import { stat } from 'node:fs/promises'
import { extname } from 'node:path'

const src = process.argv[2]
if (!src) {
  console.error('Usage: node scripts/optimize-hero.mjs <source.jpg> [widths]')
  process.exit(1)
}
const widths = (process.argv[3] || '480,960,1600').split(',').map((n) => parseInt(n, 10))

const base = src.replace(new RegExp(`${extname(src)}$`, 'i'), '')

let total = 0
for (const w of widths) {
  const jpg = `${base}-${w}.jpg`
  const webp = `${base}-${w}.webp`

  await sharp(src)
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true, progressive: true })
    .toFile(jpg)

  await sharp(src)
    .rotate()
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(webp)

  const [jpgStat, webpStat] = await Promise.all([stat(jpg), stat(webp)])
  total += jpgStat.size + webpStat.size
  console.log(`${w.toString().padStart(5)}w  jpg ${(jpgStat.size / 1024).toFixed(0).padStart(4)} KB  webp ${(webpStat.size / 1024).toFixed(0).padStart(4)} KB`)
}

console.log(`\nTotal variants: ${(total / 1024).toFixed(0)} KB`)

// LQIP — tiny blurred preview, inlineable as a data URL
const lqipBuf = await sharp(src)
  .rotate()
  .resize({ width: 24, withoutEnlargement: true })
  .blur(1.1)
  .jpeg({ quality: 50 })
  .toBuffer()
const dataUrl = `data:image/jpeg;base64,${lqipBuf.toString('base64')}`
console.log(`\nLQIP (${lqipBuf.length} bytes):`)
console.log(dataUrl)
