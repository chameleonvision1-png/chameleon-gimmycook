import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = "E:/Projects/Chameleon-GimmyCook";
const UPLOADED =
  "C:/Users/antigravityadmin/.gemini/antigravity/brain/50c85537-41cb-40d0-9ea1-8e3212590f31/.user_uploaded";

for (const dir of [
  "public/images/products",
  "public/images/categories",
  "public/images/hero",
  "public/menu",
]) {
  fs.mkdirSync(path.join(ROOT, dir), { recursive: true });
}

/**
 * Creates a crisp dark-surface version of the horizontal GIMMY COOK wordmark
 * by mapping dark navy pixels (`< 90` red & `< 90` green) to Warm Cream (`#FFF5E8`)
 * while preserving vibrant Orange (`COOK`) and exact alpha anti-aliasing.
 */
async function createLightWordmark(inputPath) {
  const { data, info } = await sharp(inputPath)
    .trim()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const a = out[i + 3];
    if (a === 0) continue;
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    // Navy pixels have low red (< 95) and dominant blue; Orange pixels have high red (> 170)
    if (r < 95 && b > g) {
      out[i] = 255;
      out[i + 1] = 245;
      out[i + 2] = 232;
    }
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

console.log("1. Processing official GIMMY COOK transparent PNG logos (lossless WebP)...");

const circleEmblemSrc = path.join(UPLOADED, "media_1794509959615_ae71dc46.png");
const iconMarkSrc = path.join(UPLOADED, "media_1794509964345_53990789.png");
const horizWordmarkSrc = path.join(UPLOADED, "media_1794509964941_60bff1b8.png");
const brandSheetSrc = path.join(UPLOADED, "media_1794509966085_d6d12112.jpg");

// A) Horizontal Wordmark (`GIMMY COOK`) -> `/menu` Header & Footer (`lossless: true`)
await sharp(horizWordmarkSrc)
  .trim()
  .resize({ width: 920, withoutEnlargement: true })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-horizontal.webp"));

const lightHoriz = await createLightWordmark(horizWordmarkSrc);
await lightHoriz
  .resize({ width: 920, withoutEnlargement: true })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-horizontal-light.webp"));

// B) Standalone `G` Fork/Spoon Mark -> Far-Left Header Icon on All Pages (`lossless: true`)
await sharp(iconMarkSrc)
  .trim()
  .resize({ width: 512, withoutEnlargement: true })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-mobile.webp"));

await sharp(iconMarkSrc)
  .trim()
  .resize({ width: 512, withoutEnlargement: true })
  .png()
  .toFile(path.join(ROOT, "public/logo-crest.png"));

// C) Circular Badge Emblem -> `/menu` Top Card, Favicons, Apple Icon, QR Stamp (`lossless: true`)
const emblemTrimmedBuf = await sharp(circleEmblemSrc).trim().png().toBuffer();

await sharp(emblemTrimmedBuf)
  .resize(640, 640, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .webp({ lossless: true })
  .toFile(path.join(ROOT, "public/logo-seal.webp"));

for (const [file, size] of [
  ["public/logo-emblem.png", 512],
  ["public/logo-emblem.webp", 512],
  ["public/icon-512.png", 512],
  ["public/icon-192.png", 192],
  ["src/app/icon.png", 192],
  ["src/app/apple-icon.png", 180],
  ["public/favicon.ico", 64],
]) {
  const target = path.join(ROOT, file);
  const pipeline = sharp(emblemTrimmedBuf).resize(size, size, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (file.endsWith(".webp")) {
    await pipeline.webp({ lossless: true }).toFile(target);
  } else {
    await pipeline.png().toFile(target);
  }
}

// Maskable 512 PWA Icon on Official Deep Navy (`#0B2D5C`) Safe Zone
const innerEmblem = await sharp(emblemTrimmedBuf)
  .resize(404, 404, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#0B2D5C" },
})
  .composite([{ input: innerEmblem, gravity: "center" }])
  .png()
  .toFile(path.join(ROOT, "public/icon-maskable-512.png"));

// Brand Sheet visual for About showcase
if (fs.existsSync(brandSheetSrc)) {
  await sharp(brandSheetSrc)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(path.join(ROOT, "public/images/hero/brand-sheet.webp"));
}

console.log("2. Preparing high-resolution culinary photography for GIMMY COOK...");

const PHOTO_JOBS = [
  // === HERO & BENTO SHOWCASE ===
  {
    out: "hero/hero-pizza-supreme.webp",
    w: 1100,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-supreme.webp",
  },
  {
    out: "hero/hero-feteer-oriental.webp",
    w: 1100,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1200&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-shawarma.webp",
  },
  {
    out: "hero/hero-tagine-oven.webp",
    w: 1100,
    h: 900,
    urls: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=1200&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-mozzarella.webp",
  },
  {
    out: "hero/bento-italian-oven.webp",
    w: 960,
    h: 760,
    urls: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1100&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-margherita.webp",
  },
  {
    out: "hero/bento-oriental-feast.webp",
    w: 960,
    h: 760,
    urls: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1100&q=85",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1100&q=85",
    ],
    fallback: "E:/Projects/Chameleon-Alyasmin/public/images/hero/hero-mixed-grill.webp",
  },
  {
    out: "hero/wide-fusion-banner.webp",
    w: 1440,
    h: 600,
    urls: [
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1440&q=85",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1440&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/hero/wide-saj-banner.webp",
  },
  {
    out: "hero/reviews-backdrop.webp",
    w: 1280,
    h: 720,
    urls: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1280&q=85",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1280&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/reviews-backdrop.webp",
  },

  // === 1. PIZZA (`البيتزا الإيطالية والشرقية`) ===
  {
    out: "products/pizza-supreme.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-supreme.webp",
  },
  {
    out: "products/pizza-margherita.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-margherita.webp",
  },
  {
    out: "products/pizza-chicken-ranch.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-shawarma.webp",
  },
  {
    out: "products/pizza-pepperoni.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-supreme.webp",
  },
  {
    out: "products/pizza-four-cheese.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-margherita.webp",
  },
  {
    out: "products/pizza-meat-lovers.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-shawarma.webp",
  },

  // === 2. FETEER (`الفطير الشرقي والحادق`) ===
  {
    out: "products/feteer-chicken-cheese.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/maria-mozzarella.webp",
  },
  {
    out: "products/feteer-mixed-meat.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-shawarma.webp",
  },
  {
    out: "products/feteer-sausage-kiry.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/pizza-supreme.webp",
  },
  {
    out: "products/feteer-cheese-lovers.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1576458088443-04a19bb13da6?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/maria-mozzarella.webp",
  },
  {
    out: "products/feteer-sweet-cream.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/maria-mozzarella.webp",
  },

  // === 3. PASTA (`المكرونة الإيطالية`) ===
  {
    out: "products/pasta-alfredo.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-chicken.webp",
  },
  {
    out: "products/pasta-negresco.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-mozzarella.webp",
  },
  {
    out: "products/pasta-bolognese.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-beef.webp",
  },
  {
    out: "products/pasta-crispy-cheese.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-mozzarella.webp",
  },

  // === 4. TAWAGEN (`الطواجن الفرن`) ===
  {
    out: "products/tagine-beef-mozza.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-mozzarella.webp",
  },
  {
    out: "products/tagine-chicken-white.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-chicken.webp",
  },
  {
    out: "products/tagine-oriental-meat.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/fatteh-beef.webp",
  },

  // === 5. MEALS & SANDWICHES (`الوجبات والساندوتشات`) ===
  {
    out: "products/meal-crispy-strips.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/products/strips-family-meal-12.webp",
  },
  {
    out: "products/meal-gimmy-burger.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/products/big-burger-storm.webp",
  },
  {
    out: "products/meal-chicken-ranch-sub.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/products/chicken-ranch.webp",
  },
  {
    out: "products/meal-family-feast.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/products/storm-box-12.webp",
  },

  // === 6. ORIENTAL & GRILLS (`المشاوي والأطباق الشرقية`) ===
  {
    out: "products/grill-mixed-platter.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-Alyasmin/public/images/products/mixed-grill-syrian.webp",
  },
  {
    out: "products/grill-charcoal-chicken.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-Alyasmin/public/images/products/charcoal-chicken.webp",
  },
  {
    out: "products/grill-kofta-kabab.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-Alyasmin/public/images/products/kabab-halabi.webp",
  },
  {
    out: "products/grill-shish-tawook.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-Alyasmin/public/images/products/shish-tawook-grill.webp",
  },

  // === 7. SIDES & DRINKS (`الإضافات والمشروبات`) ===
  {
    out: "products/side-cheese-fries.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-BurgerStorm/public/images/products/chicken-cheese-fries.webp",
  },
  {
    out: "products/side-garlic-bread.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/side-fries.webp",
  },
  {
    out: "products/side-fresh-salad.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/side-salad.webp",
  },
  {
    out: "products/side-basmati-rice.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/side-rice.webp",
  },
  {
    out: "products/drink-cans.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/drink-cans.webp",
  },
  {
    out: "products/drink-water.webp",
    w: 800,
    h: 640,
    urls: [
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=85",
    ],
    fallback: "E:/Projects/Chameleon-MaakolatAlsham/public/images/products/drink-water.webp",
  },
];

for (const job of PHOTO_JOBS) {
  const dst = path.join(ROOT, "public/images", job.out);
  let ok = false;
  for (const url of job.urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(12000) });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize(job.w, job.h, { fit: "cover", position: "centre" })
        .modulate({ saturation: 1.05, brightness: 1.02 })
        .webp({ quality: 86 })
        .toFile(dst);
      ok = true;
      break;
    } catch {
      // try next url
    }
  }
  if (!ok && job.fallback && fs.existsSync(job.fallback)) {
    await sharp(job.fallback)
      .resize(job.w, job.h, { fit: "cover" })
      .webp({ quality: 86 })
      .toFile(dst);
  }
}

console.log("All GIMMY COOK brand logos and culinary photography ready!");
