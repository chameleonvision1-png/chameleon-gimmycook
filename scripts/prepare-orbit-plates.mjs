import sharp from "sharp";
import path from "node:path";

const ROOT = "E:/Projects/Chameleon-GimmyCook";
const SIZE = 560;

/**
 * Extracts a circular top-down food crop from `src` centered at normalized `(cxRatio, cyRatio)`
 * with crop radius `rRatio * min(width, height)` and mounts it inside a realistic
 * sculpted stoneware/porcelain circular plate rim with transparent outer alpha.
 */
async function buildCircularPlate({ src, out, cxRatio, cyRatio, rRatio, rimStyle }) {
  const fullPath = path.join(ROOT, "public/images", src);
  const meta = await sharp(fullPath).metadata();
  const w = meta.width ?? 800;
  const h = meta.height ?? 640;

  const cx = Math.round(w * cxRatio);
  const cy = Math.round(h * cyRatio);
  const r = Math.round(Math.min(w, h) * rRatio);

  const left = Math.max(0, Math.min(w - 2 * r, cx - r));
  const top = Math.max(0, Math.min(h - 2 * r, cy - r));
  const side = Math.min(2 * r, w - left, h - top);

  const foodSize = 496; // Leaves a sculpted 32px ceramic plate rim around the food (496 + 64 = 560)
  const foodOffset = Math.round((SIZE - foodSize) / 2);

  // Circular mask for the food interior (feathered 1.5px edge for silky anti-aliasing)
  const foodMaskSvg = Buffer.from(`
    <svg width="${foodSize}" height="${foodSize}" viewBox="0 0 ${foodSize} ${foodSize}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${foodSize / 2}" cy="${foodSize / 2}" r="${foodSize / 2 - 1}" fill="#ffffff" />
    </svg>
  `);

  const croppedFood = await sharp(fullPath)
    .extract({ left, top, width: side, height: side })
    .resize(foodSize, foodSize, { fit: "cover" })
    .modulate({ saturation: 1.08, brightness: 1.02 })
    .ensureAlpha()
    .composite([{ input: foodMaskSvg, blend: "dest-in" }])
    .png()
    .toBuffer();

  // Sculpted 3D top-down ceramic plate base + inner bevel + subtle studio specular highlight
  const isWarmCream = rimStyle === "cream";
  const rimOuter = isWarmCream ? "#FFF5E8" : "#132E57";
  const rimMid = isWarmCream ? "#EADAC7" : "#0B2244";
  const rimLip = isWarmCream ? "#FFFFFF" : "#FFC145";
  const lipOpacity = isWarmCream ? "0.85" : "0.42";

  const plateBaseSvg = Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rimGrad" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stop-color="${rimOuter}" />
          <stop offset="55%" stop-color="${rimMid}" />
          <stop offset="100%" stop-color="${isWarmCream ? "#D8C3AA" : "#06152B"}" />
        </linearGradient>
        <radialGradient id="wellShadow" cx="50%" cy="50%" r="50%">
          <stop offset="84%" stop-color="#000000" stop-opacity="0" />
          <stop offset="96%" stop-color="#000000" stop-opacity="0.28" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.45" />
        </radialGradient>
      </defs>
      <!-- Outer Ceramic Plate Body -->
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 4}" fill="url(#rimGrad)" />
      <!-- Outer Specular Lip Ring -->
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2 - 5.5}" fill="none" stroke="${rimLip}" stroke-opacity="${lipOpacity}" stroke-width="2" />
      <!-- Inner Plate Well Ring -->
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${foodSize / 2 + 3}" fill="none" stroke="#000000" stroke-opacity="0.22" stroke-width="4" />
    </svg>
  `);

  // Subtle inner vignette ring over the food edge so food sits naturally inside the plate well
  const innerShadeSvg = Buffer.from(`
    <svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="edgeVignette" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stop-color="#000000" stop-opacity="0" />
          <stop offset="99%" stop-color="#000000" stop-opacity="0.26" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0" />
        </radialGradient>
      </defs>
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${foodSize / 2}" fill="url(#edgeVignette)" />
      <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${foodSize / 2}" fill="none" stroke="${rimLip}" stroke-opacity="0.22" stroke-width="1.5" />
    </svg>
  `);

  const outPath = path.join(ROOT, "public/images/hero", out);
  await sharp(plateBaseSvg)
    .composite([
      { input: croppedFood, left: foodOffset, top: foodOffset },
      { input: innerShadeSvg, left: 0, top: 0 },
    ])
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile(outPath);

  console.log("Generated:", outPath);
}

await buildCircularPlate({
  src: "hero/hero-feteer-oriental.webp",
  out: "plate-pizza.webp",
  cxRatio: 0.49,
  cyRatio: 0.5,
  rRatio: 0.46,
  rimStyle: "cream",
});

await buildCircularPlate({
  src: "products/feteer-chicken-cheese.webp",
  out: "plate-feteer.webp",
  cxRatio: 0.5,
  cyRatio: 0.5,
  rRatio: 0.48,
  rimStyle: "cream",
});

await buildCircularPlate({
  src: "hero/hero-tagine-oven.webp",
  out: "plate-tagine.webp",
  cxRatio: 0.55,
  cyRatio: 0.52,
  rRatio: 0.44,
  rimStyle: "cream",
});

await buildCircularPlate({
  src: "products/pasta-negresco.webp",
  out: "plate-negresco.webp",
  cxRatio: 0.55,
  cyRatio: 0.5,
  rRatio: 0.46,
  rimStyle: "cream",
});

await buildCircularPlate({
  src: "products/feteer-mixed-meat.webp",
  out: "plate-oriental.webp",
  cxRatio: 0.525,
  cyRatio: 0.525,
  rRatio: 0.365,
  rimStyle: "cream",
});
