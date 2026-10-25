// One-shot script: resize + compress all images in a public subfolder.
// Usage: node scripts/optimize-gallery.mjs <relative/folder> [maxWidth] [quality]
// Defaults: maxWidth=1600px, quality=78
import sharp from 'sharp'
import { readdir, stat, rename, unlink } from 'node:fs/promises'
import { join, extname } from 'node:path'

const folder = process.argv[2] || 'public/children/gallery'
const maxWidth = Number(process.argv[3] || 1600)
const quality = Number(process.argv[4] || 78)

const root = process.cwd()
const dir = join(root, folder)

const entries = await readdir(dir)
const jpegs = entries.filter((f) =>
  ['.jpg', '.jpeg'].includes(extname(f).toLowerCase())
)

let beforeTotal = 0
let afterTotal = 0

for (const file of jpegs) {
  const src = join(dir, file)
  const tmp = `${src}.tmp`
  const beforeStat = await stat(src)
  beforeTotal += beforeStat.size

  await sharp(src)
    .rotate() // honour EXIF orientation
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true, progressive: true })
    .toFile(tmp)

  await unlink(src)
  await rename(tmp, src)

  const afterStat = await stat(src)
  afterTotal += afterStat.size
  const beforeKb = (beforeStat.size / 1024).toFixed(0)
  const afterKb = (afterStat.size / 1024).toFixed(0)
  console.log(`${file.padEnd(14)}  ${beforeKb.padStart(6)} KB → ${afterKb.padStart(5)} KB`)
}

console.log(
  `\nTotal: ${(beforeTotal / 1024 / 1024).toFixed(1)} MB → ${(afterTotal / 1024 / 1024).toFixed(1)} MB`
)
