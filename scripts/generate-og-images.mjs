import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");

const CARDS = [
  {
    out: "og-image.jpg",
    photo: "images/hero/hero-pizza-supreme.webp",
    tag: "GOOD FOOD • GOOD MOOD",
    title: "مطعم جيمي كوك — GIMMY COOK",
    sub: "إيطالي وشرقي بمود مختلف • بيتزا • فطير • مكرونة • طواجن • دليفري 24 ساعة",
  },
  {
    out: "og-menu.jpg",
    photo: "images/hero/hero-feteer-oriental.webp",
    tag: "INTERACTIVE MENU • 24/7",
    title: "منيو مطعم جيمي كوك الكامل",
    sub: "٨ أقسام بالأسعار والأحجام • اكسب نقاط GIMMY POINTS مع كل طلب",
  },
  {
    out: "og-offers.jpg",
    photo: "images/products/pizza-chicken-ranch.webp",
    tag: "SPECIAL OFFERS",
    title: "عروض وبوكسات التوفير من جيمي كوك",
    sub: "كومبوهات تجمع الإيطالي والشرقي مع نقاط مكافآت فورية",
  },
  {
    out: "og-occasions.jpg",
    photo: "images/products/grill-mixed-platter.webp",
    tag: "CORPORATE &amp; CATERING",
    title: "طلبات الشركات والعزومات العائلية",
    sub: "القاهرة الجديدة • مدينتي • الشروق • مدينة بدر • العاصمة الإدارية",
  },
  {
    out: "og-branches.jpg",
    photo: "images/hero/bento-italian-oven.webp",
    tag: "24/7 NON-STOP DELIVERY",
    title: "تغطية دليفري جيمي كوك 24 ساعة",
    sub: "القاهرة الجديدة • مدينتي • الشروق • بدر • العاصمة • 01020305074",
  },
  {
    out: "og-about.jpg",
    photo: "images/hero/hero-tagine-oven.webp",
    tag: "OUR STORY",
    title: "قصة مطعم جيمي كوك — GIMMY COOK",
    sub: "بيتزا إيطالية مخبوزة طازة وفطير شرقي مورق في مطبخ واحد",
  },
  {
    out: "og-contact.jpg",
    photo: "images/hero/wide-fusion-banner.webp",
    tag: "ORDER HOTLINES • 24/7",
    title: "تواصل واطلب من جيمي كوك",
    sub: "01020305074 • WhatsApp: 01060449933 • gimmycook.chameleon.vision",
  },
];

async function run() {
  const emblemBuf = await sharp(path.join(PUB, "logo-emblem.png"))
    .resize(132, 132, { fit: "contain" })
    .png()
    .toBuffer();

  for (const c of CARDS) {
    const photoBuf = await sharp(path.join(PUB, c.photo))
      .resize(520, 510, { fit: "cover" })
      .composite([
        {
          input: Buffer.from(
            `<svg width="520" height="510"><rect width="520" height="510" rx="36" ry="36" fill="#fff"/></svg>`
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();

    const svg = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0B2D5C"/>
            <stop offset="60%" stop-color="#071D3B"/>
            <stop offset="100%" stop-color="#041226"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#bg)"/>
        <circle cx="1080" cy="90" r="220" fill="#FF6A00" fill-opacity="0.22"/>
        <circle cx="120" cy="580" r="240" fill="#FFC145" fill-opacity="0.14"/>
        <rect x="36" y="36" width="1128" height="558" rx="44" fill="none" stroke="#FFC145" stroke-opacity="0.32" stroke-width="2"/>

        <rect x="620" y="218" width="290" height="40" rx="20" fill="#FF6A00"/>
        <text x="765" y="244" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">${c.tag}</text>

        <text x="1110" y="318" font-family="Tahoma, Segoe UI, Arial, sans-serif" font-size="40" font-weight="900" fill="#FFFFFF" text-anchor="end" direction="rtl">${c.title}</text>
        <text x="1110" y="376" font-family="Tahoma, Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#FFF5E8" fill-opacity="0.9" text-anchor="end" direction="rtl">${c.sub}</text>

        <rect x="760" y="452" width="350" height="58" rx="29" fill="#FFC145"/>
        <text x="935" y="489" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="900" fill="#071D3B" text-anchor="middle">gimmycook.chameleon.vision</text>
      </svg>
    `);

    await sharp(svg)
      .composite([
        { input: photoBuf, left: 60, top: 60 },
        { input: emblemBuf, left: 978, top: 66 },
      ])
      .jpeg({ quality: 90 })
      .toFile(path.join(PUB, c.out));

    console.log("Generated", c.out);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
