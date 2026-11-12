"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "./store";
import { CheckIcon, GiftPointsIcon, PlusIcon, QrCodeIcon, Truck24Icon } from "./icons";

interface HeroSlide {
  id: string;
  tabLabel: string;
  productId: string;
  productName: string;
  sizeLabel: string;
  price: number;
  headlineTop: string;
  headlineBottom: string;
  subtitle: string;
  calloutTitle: string;
  sticker: string;
  image: string;
  secondaryThumb: string;
  secondaryLabel: string;
  secondaryHref: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: "pizza",
    tabLabel: "البيتزا",
    productId: "p1",
    productName: "بيتزا جيمي سوبريم ميكس",
    sizeLabel: "كبير L",
    price: 175,
    headlineTop: "إيطالي وشرقي",
    headlineBottom: "بمود مختلف تماماً",
    subtitle:
      "أكثر من مجرد مطعم — عجينة بيتزا إيطالية مخبوزة طازة، فطير شرقي مورق، وطواجن فرن توصلك سخنة 24 ساعة.",
    calloutTitle: "بيتزا جيمي سوبريم L",
    sticker: "دليفري 24 ساعة",
    image: "/images/hero/hero-pizza-supreme.webp",
    secondaryThumb: "/images/products/feteer-chicken-cheese.webp",
    secondaryLabel: "قسم الفطير الشرقي",
    secondaryHref: "/menu?cat=feteer",
  },
  {
    id: "feteer",
    tabLabel: "الفطير",
    productId: "p9",
    productName: "فطير شرقي فراخ وجبن",
    sizeLabel: "كبير L",
    price: 182,
    headlineTop: "فطير شرقي مورق",
    headlineBottom: "غرقان جبنة ومكونات",
    subtitle:
      "رقائق فطير ذهبية بالسمن البلدي محشوة فراخ متبلة ولحوم شرقية وموتزاريلا سايحة تفتح النفس من أول قطمة.",
    calloutTitle: "فطير فراخ وجبن L",
    sticker: "نجم جيمي كوك",
    image: "/images/hero/hero-feteer-oriental.webp",
    secondaryThumb: "/images/products/pizza-chicken-ranch.webp",
    secondaryLabel: "بيتزا تشيكن رانش",
    secondaryHref: "/menu?cat=pizza",
  },
  {
    id: "tawagen",
    tabLabel: "الطواجن",
    productId: "p20",
    productName: "طاجن مكرونة باللحمة والموتزاريلا",
    sizeLabel: "طاجن كبير",
    price: 155,
    headlineTop: "مكرونة وطواجن فرن",
    headlineBottom: "سخنة لحد باب بيتك",
    subtitle:
      "طواجن فخار طالعة من الفرن بوش موتزاريلا محمر ومكرونات وايت صوص ألفريدو ونجرسكو غنية في كل وقت.",
    calloutTitle: "طاجن لحمة بالموتزاريلا",
    sticker: "GOOD FOOD • GOOD MOOD",
    image: "/images/hero/hero-tagine-oven.webp",
    secondaryThumb: "/images/products/grill-mixed-platter.webp",
    secondaryLabel: "مشويات جيمي عالفحم",
    secondaryHref: "/menu?cat=grills",
  },
];

/* Smooth C1-Continuous Inverted Concave Fillet SVGs (Exact FORME. Bento Architecture) */
function FilletTopLeft({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white pointer-events-none select-none`} aria-hidden>
      <path d="M0 0 L24 0 A24 24 0 0 0 0 24 Z" />
    </svg>
  );
}

function FilletTopRight({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white pointer-events-none select-none`} aria-hidden>
      <path d="M24 0 L0 0 A24 24 0 0 1 24 24 Z" />
    </svg>
  );
}

function FilletBottomLeft({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white pointer-events-none select-none`} aria-hidden>
      <path d="M0 24 L0 0 A24 24 0 0 0 24 24 Z" />
    </svg>
  );
}

export default function GimmyHero() {
  const [idx, setIdx] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const { addToCart } = useStore();

  const slide = SLIDES[idx];

  const handleQuickAdd = () => {
    addToCart({
      productId: slide.productId,
      name: slide.productName,
      image: slide.image,
      sizeLabel: slide.sizeLabel,
      addons: [],
      unitPrice: slide.price,
      qty: 1,
    });
    setAddedId(slide.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  const openQr = () => {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  };

  return (
    <section className="px-2.5 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================================
            OUTER SCULPTED ARCHITECTURAL FRAME (`bg-white`)
            Inspired directly by the FORME. Bento-Cutout UI Reference
           ===================================================================== */}
        <div className="rounded-[32px] sm:rounded-[42px] bg-white p-2 sm:p-3 lg:p-3.5 border border-[#0B2D5C]/12 shadow-[0_28px_68px_-24px_rgba(11,45,92,0.34)]">
          <div
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) > 44) {
                setIdx((prev) =>
                  dx > 0 ? (prev + 1) % SLIDES.length : (prev - 1 + SLIDES.length) % SLIDES.length,
                );
              }
            }}
            className="relative rounded-[26px] sm:rounded-[34px] bg-gradient-to-br from-[#0B2D5C] via-[#082246] to-[#05152D] text-[#FFF5E8] overflow-hidden h-[525px] sm:h-[560px] lg:h-[595px] xl:h-[620px]"
          >
            {/* Studio Warm Orange & Cheese-Gold Radial Illumination */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_46%_54%,rgba(255,106,0,0.28),rgba(20,58,115,0.18)_42%,transparent_70%)]"
              aria-hidden="true"
            />

            {/* =================================================================
                DESKTOP BENTO-CUTOUT ARCHITECTURE (`hidden lg:block h-full`)
                Exact FORME. Curved Corner Notches + Center Callout Pin + Bold Statement
               ================================================================= */}
            <div dir="ltr" className="hidden lg:block h-full w-full relative z-10">
              {/* 1. TOP-LEFT STEPPED BENTO CUTOUT: Spotlight Card + 24/7 Pill */}
              <div className="absolute top-0 left-0 z-20 flex items-start">
                {/* Spotlight Thumbnail Cutout Box */}
                <div className="relative bg-white rounded-br-[28px] pr-3 pb-3">
                  <Link
                    href={slide.secondaryHref}
                    className="group relative block w-[154px] h-[132px] rounded-[22px] overflow-hidden bg-[#071D3B] shadow-md"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.secondaryThumb}
                      alt={slide.secondaryLabel}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/85 via-transparent to-transparent" />
                    <span
                      dir="rtl"
                      className="absolute inset-x-2 bottom-2 rounded-full bg-[#0B2D5C]/90 group-hover:bg-[#FF6A00] text-white py-1.5 px-2.5 text-[11px] font-black text-center truncate transition"
                    >
                      {slide.secondaryLabel}
                    </span>
                  </Link>
                  {/* Bottom-left concave bridge under thumbnail */}
                  <div className="absolute -bottom-6 left-0">
                    <FilletTopLeft />
                  </div>
                </div>

                {/* Adjacent Stepped Status Pill Cutout (`• 24/7 DELIVERY`) */}
                <div className="relative bg-white rounded-br-[26px] pr-3 pb-3">
                  <Link
                    href="/delivery"
                    dir="rtl"
                    className="h-[52px] px-5 rounded-[20px] bg-[#0B2D5C] hover:bg-[#FF6A00] text-[#FFF5E8] inline-flex items-center gap-2 text-xs font-black transition shadow-xs whitespace-nowrap"
                  >
                    <Truck24Icon className="w-4 h-4 text-[#FFC145]" />
                    <span>{slide.sticker} • القاهرة الجديدة</span>
                  </Link>
                  {/* Concave bridge to top bar */}
                  <div className="absolute top-0 -right-6">
                    <FilletTopLeft />
                  </div>
                  {/* Concave bridge between tall thumbnail and shorter pill */}
                  <div className="absolute -bottom-6 left-0">
                    <FilletTopLeft />
                  </div>
                </div>
              </div>

              {/* 2. TOP-RIGHT BENTO CUTOUT: 3 Symmetrical Category Switcher Pills */}
              <div className="absolute top-0 right-0 z-20 bg-white rounded-bl-[28px] pl-3 pb-3">
                <div dir="rtl" className="grid grid-cols-3 gap-2">
                  {SLIDES.map((s, i) => {
                    const active = i === idx;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setIdx(i)}
                        className={`h-[48px] min-w-[96px] px-4 rounded-full text-xs font-black transition cursor-pointer whitespace-nowrap ${
                          active
                            ? "bg-[#FF6A00] text-white shadow-[0_8px_18px_-6px_rgba(255,106,0,0.65)]"
                            : "bg-[#0B2D5C] hover:bg-[#143A73] text-[#FFF5E8]"
                        }`}
                      >
                        {s.tabLabel}
                      </button>
                    );
                  })}
                </div>
                {/* Concave bridges */}
                <div className="absolute top-0 -left-6">
                  <FilletTopRight />
                </div>
                <div className="absolute -bottom-6 right-0">
                  <FilletTopRight />
                </div>
              </div>

              {/* 3. CENTER HERO DISH + INTERACTIVE CALLOUT PIN (`●────── Dish • Price`) */}
              <div className="h-full grid grid-cols-12 items-center px-10 xl:px-14">
                {/* Left/Center Visual & Callout Pin (Cols 1-6) */}
                <div className="col-span-6 flex flex-col items-center justify-center pt-16 pb-20 relative">
                  <div className="relative w-[305px] xl:w-[345px] h-[255px] xl:h-[285px] rounded-[32px] p-2 bg-white/8 border border-white/15 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.productName}
                      className="w-full h-full rounded-[24px] object-cover select-none"
                    />

                    {/* Interactive FORME.-Style Callout Pin Anchored to Dish */}
                    <div
                      dir="rtl"
                      className="absolute -bottom-5 right-4 left-4 rounded-2xl bg-[#071D3B]/92 backdrop-blur-md border border-[#FFC145]/35 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-xl"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] ring-4 ring-[#FF6A00]/25 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs font-black text-white truncate">
                            {slide.calloutTitle}
                          </div>
                          <div className="text-[11px] font-extrabold text-[#FFC145] tabular-nums">
                            {slide.price} ج.م • {slide.sizeLabel}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleQuickAdd}
                        className="shrink-0 rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#0B2D5C] px-3.5 py-1.5 text-[11px] font-black inline-flex items-center gap-1 transition cursor-pointer"
                      >
                        {addedId === slide.id ? (
                          <>
                            <CheckIcon className="w-3.5 h-3.5" />
                            <span>تمت الإضافة</span>
                          </>
                        ) : (
                          <>
                            <PlusIcon className="w-3.5 h-3.5" />
                            <span>أضف للسلة</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Bold Editorial Statement Column (Cols 7-12, RTL) */}
                <div
                  dir="rtl"
                  className="col-span-6 text-right flex flex-col justify-center pt-14 pr-2 xl:pr-6"
                >
                  <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 border border-[#FFC145]/35 px-3.5 py-1 text-xs font-extrabold text-[#FFC145]">
                    <span className="font-en tracking-wider">GIMMY COOK</span>
                    <span>•</span>
                    <span>مطعم جيمي كوك</span>
                  </div>

                  {/* Editorial Micro-Description (Locked 48px Height) */}
                  <p className="mt-4 text-sm xl:text-base font-bold text-[#FFF5E8]/82 leading-relaxed max-w-lg h-[48px] line-clamp-2">
                    {slide.subtitle}
                  </p>

                  {/* Massive Statement Display Headline (Locked 2-Line Block) */}
                  <h1 className="mt-3 text-[40px] xl:text-[50px] font-black leading-[1.24] tracking-tight text-white">
                    <span className="block whitespace-nowrap">{slide.headlineTop}</span>
                    <span className="block text-[#FF6A00] mt-1.5 whitespace-nowrap">
                      {slide.headlineBottom}
                    </span>
                  </h1>

                  {/* Primary & Secondary Action Pills */}
                  <div className="mt-5 flex items-center gap-3">
                    <Link
                      href="/menu"
                      className="rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#0B2D5C] px-7 py-3.5 text-sm font-black transition shadow-[0_14px_30px_-8px_rgba(255,106,0,0.6)] whitespace-nowrap"
                    >
                      اطلب الآن من المنيو
                    </Link>

                    <button
                      type="button"
                      onClick={openQr}
                      className="rounded-full bg-white/10 hover:bg-white text-[#FFF5E8] hover:text-[#0B2D5C] border border-[#FFF5E8]/25 px-5 py-3.5 text-xs font-black inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
                    >
                      <QrCodeIcon className="w-4 h-4 text-[#FFC145]" />
                      <span>باركود المنيو QR</span>
                    </button>
                  </div>

                  {/* Slide Progress Indicators */}
                  <div className="mt-6 flex items-center gap-2">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-label={`شريحة ${i + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          i === idx ? "w-9 bg-[#FF6A00]" : "w-2.5 bg-white/30 hover:bg-white/55"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. BOTTOM-LEFT BENTO CUTOUT: GIMMY POINTS Loyalty Card (Echoes Explore AR Inset) */}
              <div className="absolute bottom-0 left-0 z-20 bg-white rounded-tr-[28px] pr-3 pt-3">
                <Link
                  href="/points"
                  dir="rtl"
                  className="group w-[230px] rounded-[22px] bg-[#FFF5E8] hover:bg-[#FFC145] border border-[#0B2D5C]/15 p-3.5 flex items-center justify-between gap-2.5 transition shadow-sm"
                >
                  <div className="min-w-0 text-right">
                    <div className="font-en text-[11px] font-black text-[#FF6A00] group-hover:text-[#0B2D5C] tracking-wider">
                      GIMMY POINTS
                    </div>
                    <div className="text-xs font-black text-[#0B2D5C] truncate mt-0.5">
                      كل 100 ج = 5 نقاط مكافأة
                    </div>
                  </div>
                  <span className="w-9 h-9 rounded-xl bg-[#0B2D5C] text-[#FFC145] grid place-items-center shrink-0">
                    <GiftPointsIcon className="w-4 h-4" />
                  </span>
                </Link>
                {/* Concave bridges */}
                <div className="absolute -top-6 left-0">
                  <FilletBottomLeft />
                </div>
                <div className="absolute bottom-0 -right-6">
                  <FilletBottomLeft />
                </div>
              </div>
            </div>

            {/* =================================================================
                MOBILE & TABLET SCULPTED BENTO HERO (`lg:hidden`)
                Strictly Locked Height (`0px Layout Shift`), Symmetrical Grids
               ================================================================= */}
            <div
              dir="rtl"
              className="lg:hidden h-full flex flex-col justify-between p-4 sm:p-6 relative z-10"
            >
              {/* Top Symmetrical 3-Column Category Switcher */}
              <div className="grid grid-cols-3 gap-1.5 bg-white/10 p-1 rounded-full border border-white/12">
                {SLIDES.map((s, i) => {
                  const active = i === idx;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={`py-1.5 px-2 rounded-full text-xs font-black transition cursor-pointer truncate ${
                        active
                          ? "bg-[#FF6A00] text-white shadow-xs"
                          : "text-[#FFF5E8]/85 hover:text-white"
                      }`}
                    >
                      {s.tabLabel}
                    </button>
                  );
                })}
              </div>

              {/* Locked-Height Headline & Subtitle */}
              <div className="text-center mt-1">
                <h1 className="text-[26px] sm:text-[34px] font-black leading-[1.26] text-white h-[68px] sm:h-[86px] flex flex-col justify-center">
                  <span className="block whitespace-nowrap">{slide.headlineTop}</span>
                  <span className="block text-[#FF6A00] whitespace-nowrap">
                    {slide.headlineBottom}
                  </span>
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#FFF5E8]/82 leading-relaxed line-clamp-2 h-[38px] sm:h-[42px] max-w-md mx-auto">
                  {slide.subtitle}
                </p>
              </div>

              {/* Locked-Height Dish Visual + Callout Bar */}
              <div className="relative h-[209px] sm:h-[232px] w-full max-w-[360px] mx-auto rounded-[24px] overflow-hidden border border-white/15 bg-[#071D3B] shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.productName}
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/90 via-transparent to-black/20" />

                <span className="absolute top-2.5 right-2.5 rounded-full bg-[#FFC145] text-[#0B2D5C] px-3 py-0.5 text-[10.5px] font-black shadow-xs">
                  {slide.sticker}
                </span>

                <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-2xl bg-[#0B2D5C]/92 backdrop-blur-xs border border-white/15 px-3 py-2">
                  <div className="min-w-0 text-right">
                    <div className="text-xs font-black text-white truncate">
                      {slide.calloutTitle}
                    </div>
                    <div className="text-[11px] font-extrabold text-[#FFC145] tabular-nums">
                      {slide.price} ج.م
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickAdd}
                    className="shrink-0 rounded-full bg-[#FF6A00] text-white px-3 py-1.5 text-[11px] font-black inline-flex items-center gap-1 active:scale-95 transition cursor-pointer"
                  >
                    {addedId === slide.id ? (
                      <>
                        <CheckIcon className="w-3.5 h-3.5" />
                        <span>أُضيف</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon className="w-3.5 h-3.5" />
                        <span>أضف</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Symmetrical 2-Column Mobile CTA Row */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/menu"
                  className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white py-3 px-3 text-xs sm:text-sm font-black text-center shadow-md transition whitespace-nowrap"
                >
                  اطلب من المنيو
                </Link>
                <button
                  type="button"
                  onClick={openQr}
                  className="rounded-full bg-[#FFF5E8] text-[#0B2D5C] py-3 px-3 text-xs sm:text-sm font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                >
                  <QrCodeIcon className="w-4 h-4 text-[#FF6A00] shrink-0" />
                  <span>باركود QR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
