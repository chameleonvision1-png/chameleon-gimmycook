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

/* ============================================================================
   MATHEMATICALLY EXACT C1-CONTINUOUS INVERTED CONCAVE FILLET SVGs
   Includes 1px solid overlap bleed into adjacent white walls so subpixel seams
   never appear at any browser zoom / DPR (100%, 125%, 150%, 200%).
   ============================================================================ */

/** White on TOP (`y<=0`) and LEFT (`x<=0`); concave curve opens toward bottom-right */
function ConcaveTL({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      overflow="visible"
      className={`fill-white pointer-events-none select-none block ${className}`}
      aria-hidden="true"
    >
      <path d="M -1 -1 L 24 -1 L 24 0 A 24 24 0 0 0 0 24 L -1 24 Z" />
    </svg>
  );
}

/** White on TOP (`y<=0`) and RIGHT (`x>=24`); concave curve opens toward bottom-left */
function ConcaveTR({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      overflow="visible"
      className={`fill-white pointer-events-none select-none block ${className}`}
      aria-hidden="true"
    >
      <path d="M 25 -1 L 0 -1 L 0 0 A 24 24 0 0 1 24 24 L 25 24 Z" />
    </svg>
  );
}

/** White on BOTTOM (`y>=24`) and LEFT (`x<=0`); concave curve opens toward top-right */
function ConcaveBL({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      overflow="visible"
      className={`fill-white pointer-events-none select-none block ${className}`}
      aria-hidden="true"
    >
      <path d="M -1 25 L -1 0 L 0 0 A 24 24 0 0 0 24 24 L 24 25 Z" />
    </svg>
  );
}

export default function GimmyHero() {
  const [idx, setIdx] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const { addToCart } = useStore();

  const slide = SLIDES[idx];

  const handleQuickAdd = (s: HeroSlide) => {
    addToCart({
      productId: s.productId,
      name: s.productName,
      image: s.image,
      sizeLabel: s.sizeLabel,
      addons: [],
      unitPrice: s.price,
      qty: 1,
    });
    setAddedId(s.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  const openQr = () => {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  };

  return (
    <section className="px-2.5 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================================
            OUTER SCULPTED ARCHITECTURAL FRAME (`rounded-[36px] p-3` = 12px moat)
            Concentric Radius Law: R_outer (36px) - moat (12px) = R_inner (24px)
           ===================================================================== */}
        <div className="rounded-[30px] sm:rounded-[36px] bg-white p-2 sm:p-3 border border-[#0B2D5C]/10 shadow-[0_26px_64px_-24px_rgba(7,29,59,0.28)]">
          {/* STAGE CONTAINER: Cutouts sit as unclipped siblings over the Navy Canvas */}
          <div
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) > 42) {
                setIdx((prev) =>
                  dx > 0 ? (prev + 1) % SLIDES.length : (prev - 1 + SLIDES.length) % SLIDES.length,
                );
              }
            }}
            className="relative h-[525px] sm:h-[558px] lg:h-[596px] xl:h-[620px] w-full"
          >
            {/* =================================================================
                INNER NAVY CANVAS (`rounded-[22px] sm:rounded-[24px]`)
               ================================================================= */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] bg-gradient-to-br from-[#0B2D5C] via-[#082246] to-[#05152D] text-[#FFF5E8] overflow-hidden">
              {/* Studio Warm Radial Illumination */}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_44%_54%,rgba(255,106,0,0.26),rgba(20,58,115,0.18)_44%,transparent_72%)]"
                aria-hidden="true"
              />

              {/* DESKTOP CENTER CONTENT (`hidden lg:grid`) — Smooth Crossfade Across Slides */}
              <div
                dir="ltr"
                className="hidden lg:grid h-full w-full grid-cols-12 items-center px-10 xl:px-14 relative z-10"
              >
                {/* Left/Center Dish Showcase + Interactive Callout Pin (Cols 1-6) */}
                <div className="col-span-6 flex flex-col items-center justify-center pt-16 pb-16 relative">
                  <div className="relative w-[312px] xl:w-[352px] h-[260px] xl:h-[290px]">
                    {SLIDES.map((s, i) => {
                      const active = i === idx;
                      return (
                        <div
                          key={s.id}
                          aria-hidden={!active}
                          className={`absolute inset-0 rounded-[30px] p-2 bg-white/[0.08] border border-white/15 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.65)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            active
                              ? "opacity-100 scale-100 translate-y-0 z-10"
                              : "opacity-0 scale-[0.96] translate-y-2 pointer-events-none z-0"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.image}
                            alt={s.productName}
                            className="w-full h-full rounded-[22px] object-cover select-none"
                          />

                          {/* Interactive Callout Pin Anchored to Dish */}
                          <div
                            dir="rtl"
                            className="absolute -bottom-5 right-4 left-4 rounded-2xl bg-[#071D3B]/95 backdrop-blur-md border border-[#FFC145]/35 px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-xl"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00] ring-4 ring-[#FF6A00]/25 shrink-0" />
                              <div className="min-w-0">
                                <div className="text-xs font-black text-white truncate">
                                  {s.calloutTitle}
                                </div>
                                <div className="text-[11px] font-extrabold text-[#FFC145] tabular-nums">
                                  {s.price} ج.م • {s.sizeLabel}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleQuickAdd(s)}
                              className="shrink-0 rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#0B2D5C] px-3.5 py-1.5 text-[11px] font-black inline-flex items-center gap-1 transition cursor-pointer"
                            >
                              {addedId === s.id ? (
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
                      );
                    })}
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

                  {/* Smooth Crossfading Text Stack (Zero Height Shift) */}
                  <div className="relative mt-4 h-[176px] xl:h-[198px]">
                    {SLIDES.map((s, i) => {
                      const active = i === idx;
                      return (
                        <div
                          key={s.id}
                          aria-hidden={!active}
                          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            active
                              ? "opacity-100 translate-y-0 z-10"
                              : "opacity-0 translate-y-2 pointer-events-none z-0"
                          }`}
                        >
                          <p className="text-sm xl:text-base font-bold text-[#FFF5E8]/82 leading-relaxed max-w-lg h-[48px] line-clamp-2">
                            {s.subtitle}
                          </p>
                          <h1 className="mt-3 text-[40px] xl:text-[50px] font-black leading-[1.24] tracking-tight text-white">
                            <span className="block whitespace-nowrap">{s.headlineTop}</span>
                            <span className="block text-[#FF6A00] mt-1.5 whitespace-nowrap">
                              {s.headlineBottom}
                            </span>
                          </h1>
                        </div>
                      );
                    })}
                  </div>

                  {/* Primary & Secondary Action Pills */}
                  <div className="mt-4 flex items-center gap-3">
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
                  <div className="mt-5 flex items-center gap-2">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setIdx(i)}
                        aria-label={`شريحة ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          i === idx ? "w-9 bg-[#FF6A00]" : "w-2.5 bg-white/30 hover:bg-white/55"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ===============================================================
                  MOBILE & TABLET HERO (`lg:hidden`) — Smooth Crossfade + 0px Shift
                 =============================================================== */}
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
                        className={`py-1.5 px-2 rounded-full text-xs font-black transition-all duration-300 cursor-pointer truncate ${
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

                {/* Locked-Height Crossfading Headline & Subtitle */}
                <div className="relative h-[112px] sm:h-[134px] mt-1">
                  {SLIDES.map((s, i) => {
                    const active = i === idx;
                    return (
                      <div
                        key={s.id}
                        aria-hidden={!active}
                        className={`absolute inset-0 text-center transition-all duration-400 ease-out ${
                          active
                            ? "opacity-100 translate-y-0 z-10"
                            : "opacity-0 translate-y-1.5 pointer-events-none z-0"
                        }`}
                      >
                        <h1 className="text-[26px] sm:text-[34px] font-black leading-[1.26] text-white h-[68px] sm:h-[86px] flex flex-col justify-center">
                          <span className="block whitespace-nowrap">{s.headlineTop}</span>
                          <span className="block text-[#FF6A00] whitespace-nowrap">
                            {s.headlineBottom}
                          </span>
                        </h1>
                        <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#FFF5E8]/82 leading-relaxed line-clamp-2 h-[38px] sm:h-[42px] max-w-md mx-auto">
                          {s.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Locked-Height Crossfading Dish Visual + Callout Bar */}
                <div className="relative h-[209px] sm:h-[232px] w-full max-w-[360px] mx-auto">
                  {SLIDES.map((s, i) => {
                    const active = i === idx;
                    return (
                      <div
                        key={s.id}
                        aria-hidden={!active}
                        className={`absolute inset-0 rounded-[22px] overflow-hidden border border-white/15 bg-[#071D3B] shadow-lg transition-all duration-400 ease-out ${
                          active
                            ? "opacity-100 scale-100 z-10"
                            : "opacity-0 scale-[0.97] pointer-events-none z-0"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.image}
                          alt={s.productName}
                          className="w-full h-full object-cover select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/90 via-transparent to-black/20" />

                        <span className="absolute top-2.5 right-2.5 rounded-full bg-[#FFC145] text-[#0B2D5C] px-3 py-0.5 text-[10.5px] font-black shadow-xs">
                          {s.sticker}
                        </span>

                        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between gap-2 rounded-2xl bg-[#0B2D5C]/92 backdrop-blur-xs border border-white/15 px-3 py-2">
                          <div className="min-w-0 text-right">
                            <div className="text-xs font-black text-white truncate">
                              {s.calloutTitle}
                            </div>
                            <div className="text-[11px] font-extrabold text-[#FFC145] tabular-nums">
                              {s.price} ج.م
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleQuickAdd(s)}
                            className="shrink-0 rounded-full bg-[#FF6A00] text-white px-3 py-1.5 text-[11px] font-black inline-flex items-center gap-1 active:scale-95 transition cursor-pointer"
                          >
                            {addedId === s.id ? (
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
                    );
                  })}
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

            {/* =================================================================
                DESKTOP SCULPTED BENTO CUTOUT OVERLAYS (`hidden lg:block`)
                Placed OUTSIDE `overflow-hidden` so outer corners are NEVER clipped!
                Concentric Radii:
                  - Inner Card R = 20px, White Moat = 12px (`p-3`) => Cutout R = 32px
                  - S-Curve Pills: Height 44px + 12px moat = 56px => R_convex 28 + R_concave 28 = 56px!
               ================================================================= */}
            <div dir="ltr" className="hidden lg:block pointer-events-none absolute inset-0 z-20">
              {/* 1. TOP-LEFT STEPPED BENTO CUTOUT: Spotlight Card + 24/7 Pill */}
              <div className="pointer-events-auto absolute top-0 left-0 flex items-start">
                {/* 1A. Spotlight Thumbnail Cutout (`156x136`, R_card=20, Moat=12 => rounded-br-[32px]) */}
                <div className="relative bg-white pr-3 pb-3 rounded-br-[32px]">
                  <Link
                    href={slide.secondaryHref}
                    className="group relative block w-[156px] h-[136px] rounded-[20px] rounded-tl-[24px] overflow-hidden bg-[#071D3B] shadow-sm"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.secondaryThumb}
                      alt={slide.secondaryLabel}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/90 via-transparent to-transparent" />
                    <span
                      dir="rtl"
                      className="absolute inset-x-2 bottom-2 rounded-full bg-[#071D3B]/92 group-hover:bg-[#FF6A00] text-white py-1.5 px-2.5 text-[11px] font-black text-center truncate transition border border-white/12"
                    >
                      {slide.secondaryLabel}
                    </span>
                  </Link>
                  {/* Bottom-left concave fillet where left navy wall meets thumbnail bottom */}
                  <div className="absolute -bottom-6 left-0">
                    <ConcaveTL size={24} />
                  </div>
                </div>

                {/* 1B. Stepped Status Pill (`h-[44px]` + `pb-3` = `56px` => 28px + 28px Exact S-Curve!) */}
                <div className="relative bg-white pr-3 pb-3 rounded-br-[28px]">
                  <Link
                    href="/delivery"
                    dir="rtl"
                    className="h-[44px] px-5 rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-[#FFF5E8] inline-flex items-center gap-2 text-xs font-black transition whitespace-nowrap"
                  >
                    <Truck24Icon className="w-4 h-4 text-[#FFC145]" />
                    <span>{slide.sticker} • القاهرة الجديدة</span>
                  </Link>
                  {/* Top-right 28px concave fillet => Tangent S-curve with rounded-br-[28px] */}
                  <div className="absolute top-0 -right-7">
                    <ConcaveTL size={28} />
                  </div>
                  {/* Inner step concave fillet between Spotlight right wall and Pill bottom */}
                  <div className="absolute -bottom-6 left-0">
                    <ConcaveTL size={24} />
                  </div>
                </div>
              </div>

              {/* 2. TOP-RIGHT CATEGORY SWITCHER (`h-[44px]` + `pb-3` = `56px` => 28px + 28px Exact S-Curve!) */}
              <div className="pointer-events-auto absolute top-0 right-0 bg-white pl-3 pb-3 rounded-bl-[28px]">
                <div dir="rtl" className="grid grid-cols-3 gap-2">
                  {SLIDES.map((s, i) => {
                    const active = i === idx;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setIdx(i)}
                        className={`h-[44px] min-w-[96px] px-4 rounded-full text-xs font-black transition-all duration-300 cursor-pointer whitespace-nowrap ${
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
                {/* Top-left 28px concave fillet => Tangent S-curve with rounded-bl-[28px] */}
                <div className="absolute top-0 -left-7">
                  <ConcaveTR size={28} />
                </div>
                {/* Right-wall 24px concave fillet below switcher */}
                <div className="absolute -bottom-6 right-0">
                  <ConcaveTR size={24} />
                </div>
              </div>

              {/* 3. BOTTOM-LEFT BENTO INSET (`rounded-[20px]` + 12px moat => `rounded-tr-[32px]`) */}
              <div className="pointer-events-auto absolute bottom-0 left-0 bg-white pr-3 pt-3 rounded-tr-[32px]">
                <Link
                  href="/offers"
                  dir="rtl"
                  className="group w-[236px] rounded-[20px] rounded-bl-[24px] bg-[#FFF5E8] hover:bg-[#FFC145] border border-[#0B2D5C]/14 p-3.5 flex items-center justify-between gap-2.5 transition"
                >
                  <div className="min-w-0 text-right">
                    <div className="font-en text-[10.5px] font-black text-[#FF6A00] group-hover:text-[#0B2D5C] tracking-wider">
                      SPECIAL COMBOS
                    </div>
                    <div className="text-xs font-black text-[#0B2D5C] truncate mt-0.5">
                      عروض وبوكسات التوفير
                    </div>
                  </div>
                  <span className="w-9 h-9 rounded-xl bg-[#0B2D5C] text-[#FFC145] grid place-items-center shrink-0">
                    <GiftPointsIcon className="w-4 h-4" />
                  </span>
                </Link>
                {/* Left-wall concave fillet above inset */}
                <div className="absolute -top-6 left-0">
                  <ConcaveBL size={24} />
                </div>
                {/* Bottom-floor concave fillet to the right of inset */}
                <div className="absolute bottom-0 -right-6">
                  <ConcaveBL size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
