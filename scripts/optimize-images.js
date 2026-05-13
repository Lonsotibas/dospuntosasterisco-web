import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, basename } from "path";
import { fileURLToPath } from "url";

const GALLERY_DIR = join(
  fileURLToPath(new URL(".", import.meta.url)),
  "../public/images/residencias"
);
const MAX_DIM = 1200;
const QUALITY = 80;

async function findSourceImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const images = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      images.push(...(await findSourceImages(fullPath)));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
      images.push(fullPath);
    }
  }
  return images;
}

async function convert(inputPath) {
  const webpPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  const [{ width = 0, height = 0 }, { size: origSize }] = await Promise.all([
    sharp(inputPath).metadata(),
    stat(inputPath),
  ]);

  let pipeline = sharp(inputPath);
  if (width > MAX_DIM || height > MAX_DIM) {
    pipeline = pipeline.resize(MAX_DIM, MAX_DIM, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const { size: newSize } = await pipeline
    .webp({ quality: QUALITY })
    .toFile(webpPath);

  const saved = Math.round((1 - newSize / origSize) * 100);
  console.log(
    `  ${basename(webpPath).padEnd(12)} ${Math.round(origSize / 1024)}KB → ${Math.round(newSize / 1024)}KB  (${saved}% saved)`
  );
}

const images = await findSourceImages(GALLERY_DIR);
console.log(`Optimizing ${images.length} images (max ${MAX_DIM}px, webp q${QUALITY})...\n`);
await Promise.all(images.map(convert));
console.log("\nDone.");
