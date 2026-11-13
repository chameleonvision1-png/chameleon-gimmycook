"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useStore } from "./store";
import { CheckIcon, PlusIcon, QrCodeIcon, TagIcon, Truck24Icon } from "./icons";

export interface HeroOrbitDish {
  id: string;
  tabLabel: string;
  shortLabel: string;
  productId: string;
  productName: string;
  kitchen: string;
  sizeLabel: string;
  price: number;
  rating: number;
  eyebrow: string;
  headlineTop: string;
  headlineBottom: string;
  headlineAccent: string;
  description: string;
  ingredients: string[];
  sticker: string;
  plateImage: string;
  cartImage: string;
  accent: string;
  badgeInk: string;
}

const DISHES: HeroOrbitDish[] = [
  {
    id: "pizza",
    tabLabel: "البيتزا",
    shortLabel: "جيمي سوبريم",
    productId: "p1",
    productName: "بيتزا جيمي سوبريم ميكس",
    kitchen: "فرن البيتزا الإيطالي",
    sizeLabel: "كبير L",
    price: 175,
    rating: 4.9,
    eyebrow: "GIMMY COOK • #1 الأكثر طلباً",
    headlineTop: "إيطالي وشرقي",
    headlineBottom: "بمود مختلف تماماً",
    headlineAccent: "#FF6A00",
    description:
      "عجينة إيطالية مخبوزة طازة بصلصة الطماطم الأصلية، بيبروني بقري، قطع فراخ متبلة، وموتزاريلا غنية.",
    ingredients: [
      "عجينة إيطالية طازجة",
      "بيبروني بقري",
      "صدور فراخ متبلة",
      "جبنة موتزاريلا",
      "فلفل ألوان وزيتون",
    ],
    sticker: "دليفري 24 ساعة",
    plateImage: "/images/hero/plate-pizza.webp",
    cartImage: "/images/products/pizza-supreme.webp",
    accent: "#FF6A00",
    badgeInk: "#FFFFFF",
  },
  {
    id: "feteer",
    tabLabel: "الفطير",
    shortLabel: "فطير فراخ وجبن",
    productId: "p9",
    productName: "فطير شرقي فراخ وجبن",
    kitchen: "مخبز الفطير الشرقي",
    sizeLabel: "كبير L",
    price: 182,
    rating: 4.9,
    eyebrow: "GIMMY COOK • نجم الفطير الشرقي",
    headlineTop: "فطير شرقي مورق",
    headlineBottom: "غرقان جبنة ومكونات",
    headlineAccent: "#FFC145",
    description:
      "رقائق فطير ذهبية بالسمن البلدي محشوة شرائح فراخ متبلة وميكس جبن موتزاريلا ورومي وشيدر سايحة.",
    ingredients: [
      "رقائق بالسمن البلدي",
      "شرائح فراخ متبلة",
      "موتزاريلا وشيدر",
      "جبنة رومي معتقة",
      "فلفل ألوان وزيتون",
    ],
    sticker: "نجم جيمي كوك",
    plateImage: "/images/hero/plate-feteer.webp",
    cartImage: "/images/products/feteer-chicken-cheese.webp",
    accent: "#FFC145",
    badgeInk: "#071D3B",
  },
  {
    id: "tawagen",
    tabLabel: "الطواجن",
    shortLabel: "طاجن لحمة فرن",
    productId: "p20",
    productName: "طاجن مكرونة باللحمة والموتزاريلا",
    kitchen: "طواجن الفخار بالفرن",
    sizeLabel: "طاجن كبير",
    price: 155,
    rating: 4.8,
    eyebrow: "GIMMY COOK • سخن من الفرن",
    headlineTop: "طواجن فخار بالفرن",
    headlineBottom: "سخنة لحد باب بيتك",
    headlineAccent: "#FF6A00",
    description:
      "طاجن فخار طالع من الفرن بمكرونة القلم واللحم البلدي المعصج والصلصة المتبلة ووش موتزاريلا محمر.",
    ingredients: [
      "لحم بلدي معصج",
      "مكرونة قلم فرن",
      "وش موتزاريلا محمر",
      "صلصة طاجن شرقية",
      "بهارات جيمي الخاصة",
    ],
    sticker: "توصيل حراري 24س",
    plateImage: "/images/hero/plate-tagine.webp",
    cartImage: "/images/products/tagine-beef-mozza.webp",
    accent: "#CE2F08",
    badgeInk: "#FFFFFF",
  },
  {
    id: "pasta",
    tabLabel: "الباستا",
    shortLabel: "نجرسكو فراخ",
    productId: "p16",
    productName: "مكرونة نجرسكو فراخ بالموتزاريلا",
    kitchen: "ركن الباستا والوايت صوص",
    sizeLabel: "حجم لارج L",
    price: 170,
    rating: 4.9,
    eyebrow: "GIMMY COOK • وايت صوص كريمي",
    headlineTop: "باستا ووايت صوص",
    headlineBottom: "بطبقة جبنة ذهبية",
    headlineAccent: "#FFC145",
    description:
      "مكرونة بالبشاميل الكريمي الخفيف وقطع الفراخ المشوية والمشروم الفريش مخبوزة بوش موتزاريلا ذهبي.",
    ingredients: [
      "وايت صوص كريمي",
      "قطع فراخ مشوية",
      "مشروم فريش",
      "جبنة موتزاريلا",
      "زيتون مخلي",
    ],
    sticker: "الأكثر طلباً",
    plateImage: "/images/hero/plate-negresco.webp",
    cartImage: "/images/products/pasta-negresco.webp",
    accent: "#F3E3D1",
    badgeInk: "#0B2D5C",
  },
  {
    id: "oriental",
    tabLabel: "مشكل شرقي",
    shortLabel: "فطير مشكل لحوم",
    productId: "p10",
    productName: "فطير مشكل لحوم شرقي",
    kitchen: "مخبز الفطير الشرقي",
    sizeLabel: "كبير L",
    price: 195,
    rating: 4.9,
    eyebrow: "GIMMY COOK • وليمة شرقية",
    headlineTop: "مشكل لحوم وسجق",
    headlineBottom: "طعم شرقي أصيل",
    headlineAccent: "#FF6A00",
    description:
      "فطيرة شرقية مورقة محشوة لحم معصج وسجق بلدي وبسطرمة فاخرة مع الجبنة الموتزاريلا والفلفل والزيتون.",
    ingredients: [
      "سجق بلدي متبل",
      "بسطرمة بلدي",
      "لحم مفروم معصج",
      "جبنة موتزاريلا",
      "رقائق فطير ذهبية",
    ],
    sticker: "GOOD FOOD • GOOD MOOD",
    plateImage: "/images/hero/plate-oriental.webp",
    cartImage: "/images/products/feteer-mixed-meat.webp",
    accent: "#FF6A00",
    badgeInk: "#FFFFFF",
  },
];

/* ============================================================================
   ORBIT GEOMETRY & PURE HELPERS (Adapted from `DishOrbitCarousel`)
   ============================================================================ */

function wrapIndex(i: number, n: number): number {
  if (n <= 0) return 0;
  return ((Math.round(i) % n) + n) % n;
}

function stepDirection(from: number, to: number, n: number): 1 | -1 {
  if (n <= 0) return 1;
  const fwd = (((to - from) % n) + n) % n;
  return fwd <= n - fwd ? 1 : -1;
}

function stripStart(index: number, n: number, visible: number): number {
  if (n <= visible) return 0;
  return Math.max(0, Math.min(index - 1, n - visible));
}

/**
 * Tapered curved ribbon along the plates' overhead orbit circle.
 * Angles in degrees, screen space (0 = right, 90 = straight down).
 */
function arcPath(
  a0: number,
  a1: number,
  cx: number,
  cy: number,
  r: number,
  w: number,
  steps = 48,
): string {
  const outer: string[] = [];
  const inner: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = ((a0 + (a1 - a0) * t) * Math.PI) / 180;
    const h = (w / 2) * Math.pow(Math.sin(Math.PI * t), 0.45);
    const c = Math.cos(a);
    const s = Math.sin(a);
    outer.push(`${(cx + c * (r + h)).toFixed(1)} ${(cy + s * (r + h)).toFixed(1)}`);
    inner.push(`${(cx + c * (r - h)).toFixed(1)} ${(cy + s * (r - h)).toFixed(1)}`);
  }
  return `M${outer.join("L")}L${inner.reverse().join("L")}Z`;
}

const ARC_REST: [number, number][] = [
  [52, 108],
  [46, 124],
  [58, 126],
  [42, 108],
  [48, 118],
];

function arcRest(index: number): [number, number] {
  return ARC_REST[((index % ARC_REST.length) + ARC_REST.length) % ARC_REST.length];
}

const ARC_SWEEP: [number, number] = [36, 146];

// Desktop orbit geometry coupled to `.orbit-plate-desk` (264x264 at left=68, top=140)
const DESK_ORBIT_X = 247.5;
const DESK_ORBIT_Y = -382;
const DESK_ORBIT_R = 654;
const DESK_BAND_W = 114;

// Mobile orbit geometry coupled to `.orbit-plate-mob` (164x164 centered in 320x172 stage)
const MOB_ORBIT_X = 160;
const MOB_ORBIT_Y = -236;
const MOB_ORBIT_R = 322;
const MOB_BAND_W = 68;

const SWING_DEG = 48;
const STRIP_ITEM_W = 92;
const STRIP_VISIBLE = 4;

const HIDE_1 = "inset(0% 0% 0% 100%)";
const HIDE_2 = "inset(0% 100% 0% 0%)";
const SHOW_CLIP = "inset(0% 0% 0% 0%)";

const INITIAL_DESK_ARC = arcPath(
  ARC_REST[0][0],
  ARC_REST[0][1],
  DESK_ORBIT_X,
  DESK_ORBIT_Y,
  DESK_ORBIT_R,
  DESK_BAND_W,
);

const INITIAL_MOB_ARC = arcPath(
  ARC_REST[0][0],
  ARC_REST[0][1],
  MOB_ORBIT_X,
  MOB_ORBIT_Y,
  MOB_ORBIT_R,
  MOB_BAND_W,
);

/* ============================================================================
   MATHEMATICALLY EXACT C1-CONTINUOUS INVERTED CONCAVE FILLET SVGs
   ============================================================================ */

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

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function GimmyHero() {
  const n = DISHES.length;
  const [idx, setIdx] = useState(0);
  const [tab, setTab] = useState<"overview" | "ingredients">("overview");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useStore();

  // Refs for Desktop & Mobile synchronized GSAP orbital choreography
  const deskOrbitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const deskHeadsRef = useRef<(HTMLDivElement | null)[]>([]);
  const deskBodiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const deskArcRef = useRef<SVGPathElement | null>(null);

  const mobOrbitsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobHeadsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobBodiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobArcRef = useRef<SVGPathElement | null>(null);

  const arcStateRef = useRef({ a0: ARC_REST[0][0], a1: ARC_REST[0][1] });
  const shownRef = useRef(-1);
  const dirRef = useRef<1 | -1>(1);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const wheelLockedRef = useRef(false);

  const dish = DISHES[idx];
  const thumbStart = stripStart(idx, n, STRIP_VISIBLE);

  // GSAP Dish Orbit Swap Timeline (Plates swing overhead + Opposing Clip-Path Title Wipe + Card Stagger + Sweeping Arc Band)
  useIsoLayoutEffect(() => {
    const from = shownRef.current;
    const to = idx;

    const getParts = (i: number) => {
      const dHead = deskHeadsRef.current[i];
      const mHead = mobHeadsRef.current[i];
      return {
        orbits: [deskOrbitsRef.current[i], mobOrbitsRef.current[i]].filter(Boolean),
        heads: [dHead, mHead].filter(Boolean),
        eyes: [
          dHead?.querySelector("[data-eye]"),
          mHead?.querySelector("[data-eye]"),
        ].filter(Boolean),
        t1s: [
          dHead?.querySelector("[data-t1]"),
          mHead?.querySelector("[data-t1]"),
        ].filter(Boolean),
        t2s: [
          dHead?.querySelector("[data-t2]"),
          mHead?.querySelector("[data-t2]"),
        ].filter(Boolean),
        bodies: [deskBodiesRef.current[i], mobBodiesRef.current[i]].filter(Boolean),
      };
    };

    const drawArcs = () => {
      const { a0, a1 } = arcStateRef.current;
      deskArcRef.current?.setAttribute(
        "d",
        arcPath(a0, a1, DESK_ORBIT_X, DESK_ORBIT_Y, DESK_ORBIT_R, DESK_BAND_W),
      );
      mobArcRef.current?.setAttribute(
        "d",
        arcPath(a0, a1, MOB_ORBIT_X, MOB_ORBIT_Y, MOB_ORBIT_R, MOB_BAND_W),
      );
    };

    const rest = arcRest(to);
    const tint = DISHES[to]?.accent ?? "#FF6A00";

    if (tlRef.current) {
      tlRef.current.progress(1).kill();
      tlRef.current = null;
    }

    const incoming = getParts(to);

    if (from === -1 || from === to) {
      for (let i = 0; i < n; i++) {
        if (i !== to) {
          const p = getParts(i);
          gsap.set([...p.orbits, ...p.heads, ...p.bodies], { autoAlpha: 0 });
        }
      }
      gsap.set(
        [...incoming.orbits, ...incoming.heads, ...incoming.bodies, ...incoming.eyes],
        { autoAlpha: 1, rotation: 0, y: 0 },
      );
      gsap.set([...incoming.t1s, ...incoming.t2s], { clipPath: SHOW_CLIP });
      arcStateRef.current.a0 = rest[0];
      arcStateRef.current.a1 = rest[1];
      drawArcs();
      const arcs = [deskArcRef.current, mobArcRef.current].filter(Boolean);
      if (arcs.length) gsap.set(arcs, { fill: tint });
      shownRef.current = to;
      return;
    }

    const outgoing = getParts(from);
    const d = dirRef.current;
    const tl = gsap.timeline({
      onComplete: () => {
        tlRef.current = null;
      },
    });
    tlRef.current = tl;

    // 1. Overhead orbital plate swing: outgoing arcs up & out, incoming swings down into place
    tl.to(
      outgoing.orbits,
      { rotation: SWING_DEG * d, duration: 0.56, ease: "power2.in" },
      0,
    )
      .set(outgoing.orbits, { autoAlpha: 0, rotation: 0 }, 0.56)
      .fromTo(
        incoming.orbits,
        { autoAlpha: 1, rotation: -SWING_DEG * d },
        { rotation: 0, duration: 0.88, ease: "power3.out" },
        0.24,
      );

    // 2. Opposing two-line horizontal clip-path wipe + eyebrow rise
    tl.to(outgoing.t1s, { clipPath: HIDE_1, duration: 0.36, ease: "power2.in" }, 0)
      .to(outgoing.t2s, { clipPath: HIDE_2, duration: 0.36, ease: "power2.in" }, 0.05)
      .to(outgoing.eyes, { autoAlpha: 0, duration: 0.22 }, 0)
      .set(outgoing.heads, { autoAlpha: 0 }, 0.42)
      .set(incoming.heads, { autoAlpha: 1 }, 0.42)
      .fromTo(
        incoming.eyes,
        { autoAlpha: 0, y: 6 },
        { autoAlpha: 1, y: 0, duration: 0.36, ease: "power2.out" },
        0.46,
      )
      .fromTo(
        incoming.t1s,
        { clipPath: HIDE_1 },
        { clipPath: SHOW_CLIP, duration: 0.62, ease: "power3.out" },
        0.46,
      )
      .fromTo(
        incoming.t2s,
        { clipPath: HIDE_2 },
        { clipPath: SHOW_CLIP, duration: 0.62, ease: "power3.out" },
        0.52,
      );

    // 3. Smart-kitchen glass card cross-fade & staggered rise
    tl.to(
      outgoing.bodies,
      { autoAlpha: 0, y: -6, duration: 0.26, ease: "power1.in" },
      0.04,
    ).set(incoming.bodies, { autoAlpha: 1, y: 0 }, 0.34);

    for (const bodyEl of incoming.bodies) {
      if (bodyEl && bodyEl.children.length > 0) {
        tl.fromTo(
          bodyEl.children,
          { autoAlpha: 0, y: 9 },
          { autoAlpha: 1, y: 0, duration: 0.44, stagger: 0.05, ease: "power2.out" },
          0.34,
        );
      }
    }

    // 4. Sweeping orbital ribbon stretches between plates then settles & morphs brand colour
    tl.to(
      arcStateRef.current,
      {
        a0: ARC_SWEEP[0],
        a1: ARC_SWEEP[1],
        duration: 0.52,
        ease: "power2.inOut",
        onUpdate: drawArcs,
      },
      0,
    ).to(
      arcStateRef.current,
      {
        a0: rest[0],
        a1: rest[1],
        duration: 0.78,
        ease: "power3.out",
        onUpdate: drawArcs,
      },
      0.52,
    );

    const arcs = [deskArcRef.current, mobArcRef.current].filter(Boolean);
    if (arcs.length) {
      tl.to(arcs, { fill: tint, duration: 0.95, ease: "power1.inOut" }, 0.08);
    }

    shownRef.current = to;
  }, [idx, n]);

  useEffect(() => {
    return () => {
      tlRef.current?.kill();
    };
  }, []);

  const go = (target: number, explicitDir?: 1 | -1) => {
    const next = wrapIndex(target, n);
    if (next === idx) return;
    dirRef.current = explicitDir ?? stepDirection(idx, next, n);
    setIdx(next);
  };

  const step = (d: 1 | -1) => go(idx + d, d);

  const handleQuickAdd = (s: HeroOrbitDish) => {
    addToCart({
      productId: s.productId,
      name: s.productName,
      image: s.cartImage,
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

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const start = pointerStartRef.current;
    pointerStartRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const onHorizontalWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 28 && Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4) {
      if (wheelLockedRef.current) return;
      wheelLockedRef.current = true;
      window.setTimeout(() => {
        wheelLockedRef.current = false;
      }, 550);
      step(e.deltaX > 0 ? 1 : -1);
    }
  };

  return (
    <section className="px-2.5 sm:px-6 lg:px-8 pt-2.5 sm:pt-4 overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================================
            OUTER SCULPTED ARCHITECTURAL FRAME (`rounded-[36px] p-3` = 12px moat)
            Preserves GIMMY COOK's signature Bento-Cutout shell while hosting
            the GSAP Dish Orbit Carousel inside!
           ===================================================================== */}
        <div className="rounded-[30px] sm:rounded-[36px] bg-white p-2 sm:p-3 border border-[#0B2D5C]/10 shadow-[0_26px_64px_-24px_rgba(7,29,59,0.28)]">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="أشهر أطباق مطعم جيمي كوك"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onWheel={onHorizontalWheel}
            className="relative h-[584px] sm:h-[608px] lg:h-[620px] xl:h-[636px] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00] rounded-[22px] sm:rounded-[24px]"
          >
            {/* =================================================================
                INNER DEEP NAVY STAGE (`rounded-[22px] sm:rounded-[24px]`)
               ================================================================= */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] bg-gradient-to-br from-[#0B2D5C] via-[#082246] to-[#05152D] text-[#FFF5E8] overflow-hidden">
              {/* Studio Warm Radial Illumination */}
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_48%,rgba(255,106,0,0.22),rgba(20,58,115,0.2)_42%,transparent_72%)]"
                aria-hidden="true"
              />

              {/* ===============================================================
                  DESKTOP DISH ORBIT STAGE (`hidden lg:flex`, 0px Height Shift)
                  [Left: Pager + Sweeping SVG Arc + Overhead Orbiting Plate]
                  [Center: Frosted Overview/Ingredients + Rating + Quick-Add Card]
                  [Right (RTL): Two-Weight Wipe Headline + CTAs + Mini-Plate Strip]
                 =============================================================== */}
              <div
                dir="ltr"
                className="hidden lg:flex h-full w-full items-center justify-between gap-5 xl:gap-8 px-6 xl:px-10 pt-14 pb-6 relative z-10"
              >
                {/* Sweeping Tapered SVG Orbit Band (Behind Left Plate) */}
                <svg
                  viewBox="0 0 1192 620"
                  preserveAspectRatio="xMinYMid slice"
                  className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
                  aria-hidden="true"
                >
                  <path
                    ref={deskArcRef}
                    d={INITIAL_DESK_ARC}
                    fill={DISHES[0].accent}
                    style={{ opacity: 0.34 }}
                  />
                </svg>

                {/* 1. LEFT ZONE: Side Vertical Pager + Overhead Orbiting Plate */}
                <div className="relative shrink-0 w-[304px] xl:w-[332px] h-full flex items-center">
                  {/* Side Vertical Pager (`dsh-pager`) */}
                  <div
                    role="tablist"
                    aria-label="اختر الطبق"
                    className="relative z-20 flex flex-col items-center gap-2 mr-3 xl:mr-4"
                  >
                    {DISHES.map((d, i) => {
                      const active = i === idx;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={d.productName}
                          onClick={() => go(i)}
                          className="w-4 flex items-center justify-center py-0.5 cursor-pointer group"
                        >
                          <span
                            className={`block w-[3.5px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.3,0.7,0.2,1)] ${
                              active
                                ? "h-6 bg-[#FF6A00] shadow-[0_0_12px_rgba(255,106,0,0.75)]"
                                : "h-1.5 bg-white/40 group-hover:bg-white/75"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Circular Top-Down Plates on Wide Overhead Orbit (`dsh-plates`) */}
                  <div
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => {
                      pointerStartRef.current = null;
                    }}
                    className="relative w-[246px] h-[246px] xl:w-[272px] xl:h-[272px] touch-pan-y select-none cursor-grab active:cursor-grabbing z-10"
                  >
                    {DISHES.map((d, i) => (
                      <div
                        key={d.id}
                        ref={(el) => {
                          deskOrbitsRef.current[i] = el;
                        }}
                        aria-hidden={i !== idx}
                        style={
                          i === 0
                            ? { transformOrigin: "68% -195%" }
                            : {
                                transformOrigin: "68% -195%",
                                visibility: "hidden",
                                opacity: 0,
                              }
                        }
                        className="absolute inset-0 will-change-transform"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={d.plateImage}
                          alt={d.productName}
                          width={272}
                          height={272}
                          draggable={false}
                          className="w-full h-full object-contain select-none drop-shadow-[0_24px_30px_rgba(0,0,0,0.52)]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. CENTER ZONE: Smart-Kitchen Frosted Dish Card (`dsh-card`) */}
                <div
                  dir="rtl"
                  className="relative z-20 shrink-0 w-[258px] xl:w-[286px] rounded-[24px] bg-[#071D3B]/76 backdrop-blur-md border border-white/14 p-4 xl:p-5 shadow-[0_24px_50px_-22px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]"
                >
                  {/* Overview / Ingredients Switcher (`dsh-tabs`) */}
                  <div
                    role="tablist"
                    aria-label="تفاصيل الطبق"
                    className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5 text-xs"
                  >
                    {(
                      [
                        ["overview", "نظرة عامة"],
                        ["ingredients", "المكونات"],
                      ] as const
                    ).map(([key, label]) => {
                      const selected = tab === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setTab(key)}
                          className={`relative px-2 py-0.5 font-extrabold transition-colors cursor-pointer ${
                            selected
                              ? "text-[#FFC145]"
                              : "text-[#FFF5E8]/55 hover:text-[#FFF5E8]/90"
                          }`}
                        >
                          {label}
                          {selected && (
                            <span className="absolute inset-x-1 -bottom-[11px] h-[2px] rounded-full bg-[#FFC145]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Stacked Dish Bodies (`grid-area: 1/1` => 0px Shift) */}
                  <div className="grid">
                    {DISHES.map((d, i) => (
                      <div
                        key={d.id}
                        ref={(el) => {
                          deskBodiesRef.current[i] = el;
                        }}
                        aria-hidden={i !== idx}
                        style={
                          i === 0 ? undefined : { visibility: "hidden", opacity: 0 }
                        }
                        className="col-start-1 row-start-1"
                      >
                        {/* Coloured Vertical Rating Badge + Dish Title */}
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            style={{ backgroundColor: d.accent, color: d.badgeInk }}
                            className="w-12 h-[60px] rounded-xl flex flex-col items-center justify-between py-1.5 shrink-0 shadow-sm transition-colors duration-500"
                          >
                            <span className="font-en text-lg font-black leading-none tracking-tight tabular-nums">
                              {d.rating.toFixed(1)}
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3.5 h-3.5 fill-current opacity-90"
                              aria-hidden="true"
                            >
                              <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                            </svg>
                          </div>

                          <div className="min-w-0 text-right">
                            <h3 className="text-sm xl:text-[15px] font-black text-white leading-snug line-clamp-2">
                              {d.productName}
                            </h3>
                            <p className="text-[11px] font-bold text-[#FFC145]/90 mt-0.5 truncate">
                              {d.kitchen} • {d.sizeLabel}
                            </p>
                          </div>
                        </div>

                        {/* Locked-Height Overview / Ingredients Slot (`h-[86px]`) */}
                        <div className="h-[86px] overflow-hidden">
                          {tab === "overview" ? (
                            <p className="text-xs font-semibold text-[#FFF5E8]/82 leading-relaxed line-clamp-3">
                              {d.description}
                            </p>
                          ) : (
                            <ul className="flex flex-wrap gap-1.5">
                              {d.ingredients.map((ing) => (
                                <li
                                  key={ing}
                                  className="rounded-full bg-white/10 border border-white/12 px-2.5 py-0.5 text-[10.5px] font-bold text-[#FFF5E8] leading-snug"
                                >
                                  {ing}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* Price + Instant Quick-Add Row */}
                        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <div className="text-right">
                            <span className="block text-[10px] font-bold text-[#FFF5E8]/60">
                              السعر ({d.sizeLabel})
                            </span>
                            <span className="text-base font-black text-[#FFC145] tabular-nums">
                              {d.price} ج.م
                            </span>
                          </div>

                          <button
                            type="button"
                            tabIndex={i === idx ? 0 : -1}
                            onClick={() => handleQuickAdd(d)}
                            className="rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#0B2D5C] px-4 py-2 text-xs font-black inline-flex items-center gap-1.5 transition cursor-pointer shadow-[0_10px_20px_-8px_rgba(255,106,0,0.65)]"
                          >
                            {addedId === d.id ? (
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
                    ))}
                  </div>
                </div>

                {/* 3. RIGHT ZONE (RTL): Two-Weight Wipe Headline + CTAs + Thumbnail Strip */}
                <div
                  dir="rtl"
                  className="relative z-20 flex-1 min-w-0 text-right flex flex-col justify-center pr-1 xl:pr-3"
                >
                  {/* Opposing Clip-Path Wipe Headlines (`dsh-head`) */}
                  <div className="relative h-[168px] xl:h-[184px]" aria-live="polite">
                    {DISHES.map((d, i) => (
                      <div
                        key={d.id}
                        ref={(el) => {
                          deskHeadsRef.current[i] = el;
                        }}
                        aria-hidden={i !== idx}
                        style={
                          i === 0 ? undefined : { visibility: "hidden", opacity: 0 }
                        }
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <div
                          data-eye
                          className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 border border-[#FFC145]/35 px-3.5 py-1 text-[11px] font-extrabold text-[#FFC145] mb-2.5"
                        >
                          <span>{d.eyebrow}</span>
                        </div>

                        <h1 className="text-[34px] xl:text-[44px] leading-[1.36] tracking-normal">
                          <span
                            data-t1
                            className="block font-bold text-white/95 py-0.5 whitespace-nowrap"
                          >
                            {d.headlineTop}
                          </span>
                          <span
                            data-t2
                            style={{ color: d.headlineAccent }}
                            className="block font-black mt-1 py-0.5 whitespace-nowrap"
                          >
                            {d.headlineBottom}
                          </span>
                        </h1>
                      </div>
                    ))}
                  </div>

                  {/* Primary & Secondary Action Pills (`dsh-acts`) */}
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <Link
                      href="/menu"
                      className="rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#0B2D5C] px-6 xl:px-7 py-3 text-xs xl:text-sm font-black transition shadow-[0_14px_30px_-8px_rgba(255,106,0,0.6)] whitespace-nowrap"
                    >
                      اطلب الآن من المنيو
                    </Link>

                    <button
                      type="button"
                      onClick={openQr}
                      className="rounded-full bg-white/10 hover:bg-white text-[#FFF5E8] hover:text-[#0B2D5C] border border-[#FFF5E8]/25 px-4 xl:px-5 py-3 text-xs font-black inline-flex items-center gap-2 transition cursor-pointer whitespace-nowrap"
                    >
                      <QrCodeIcon className="w-4 h-4 text-[#FFC145]" />
                      <span>باركود المنيو QR</span>
                    </button>
                  </div>

                  {/* Bottom Orbit Dish Thumbnail Strip (`dsh-strip`, LTR track math) */}
                  <div dir="ltr" className="mt-5 flex items-center gap-1.5 self-end">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="الطبق السابق"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white grid place-items-center transition cursor-pointer shrink-0"
                    >
                      <svg viewBox="0 0 12 16" className="w-2.5 h-3 fill-current" aria-hidden="true">
                        <path d="M11 0v16L0 8z" />
                      </svg>
                    </button>

                    <div
                      style={{ width: `${STRIP_ITEM_W * STRIP_VISIBLE}px` }}
                      className="relative h-[92px] overflow-hidden shrink-0"
                    >
                      <div
                        style={{
                          transform: `translateX(${-thumbStart * STRIP_ITEM_W}px)`,
                        }}
                        className="absolute left-0 top-0 flex transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      >
                        {DISHES.map((d, i) => {
                          const active = i === idx;
                          return (
                            <div
                              key={d.id}
                              style={{ width: `${STRIP_ITEM_W}px` }}
                              className="h-[92px] flex justify-center items-center px-1"
                            >
                              <button
                                type="button"
                                aria-current={active ? "true" : undefined}
                                onClick={() => go(i)}
                                className={`w-full h-[86px] rounded-2xl flex flex-col items-center justify-center gap-1.5 px-1 transition-all duration-300 cursor-pointer ${
                                  active
                                    ? "bg-white/16 border border-[#FFC145]/50 shadow-[0_10px_24px_-12px_rgba(0,0,0,0.5)]"
                                    : "bg-white/[0.04] hover:bg-white/10 border border-transparent"
                                }`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={d.plateImage}
                                  alt=""
                                  width={44}
                                  height={44}
                                  draggable={false}
                                  className={`w-11 h-11 object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
                                    active ? "scale-110" : "scale-95 opacity-85"
                                  }`}
                                />
                                <span
                                  dir="rtl"
                                  className={`text-[10px] font-extrabold leading-tight truncate max-w-[78px] ${
                                    active ? "text-[#FFC145]" : "text-[#FFF5E8]/80"
                                  }`}
                                >
                                  {d.shortLabel}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="الطبق التالي"
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white grid place-items-center transition cursor-pointer shrink-0"
                    >
                      <svg viewBox="0 0 12 16" className="w-2.5 h-3 fill-current" aria-hidden="true">
                        <path d="M1 0v16l11-8z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* ===============================================================
                  MOBILE & TABLET DISH ORBIT STAGE (`lg:hidden` — 0px Shift)
                  Includes: Category Pills + Overhead Orbiting Plate & Sweeping Arc
                  + Opposing Wipe Headline + Compact Overview/Ingredients Card + CTAs
                 =============================================================== */}
              <div
                dir="rtl"
                className="lg:hidden h-full flex flex-col justify-between p-3.5 sm:p-5 relative z-10"
              >
                {/* 1. Top Category Switcher Pills (First 4 Core Categories + Swipe for All 5) */}
                <div className="grid grid-cols-4 gap-1 bg-white/10 p-1 rounded-full border border-white/12">
                  {DISHES.slice(0, 4).map((d, i) => {
                    const active = idx === i || (i === 1 && idx === 4);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => go(i)}
                        className={`py-1.5 px-1.5 rounded-full text-[11px] sm:text-xs font-black transition-all duration-300 cursor-pointer truncate ${
                          active
                            ? "bg-[#FF6A00] text-white shadow-xs"
                            : "text-[#FFF5E8]/85 hover:text-white"
                        }`}
                      >
                        {d.tabLabel}
                      </button>
                    );
                  })}
                </div>

                {/* 2. Mobile Overhead Orbit Stage + Sweeping SVG Arc + Side Arrows */}
                <div
                  dir="ltr"
                  onPointerDown={onPointerDown}
                  onPointerUp={onPointerUp}
                  onPointerCancel={() => {
                    pointerStartRef.current = null;
                  }}
                  className="relative h-[164px] sm:h-[178px] w-full max-w-[340px] mx-auto flex items-center justify-between touch-pan-y select-none"
                >
                  <svg
                    viewBox="0 0 320 172"
                    className="pointer-events-none absolute inset-0 w-full h-full overflow-visible z-0"
                    aria-hidden="true"
                  >
                    <path
                      ref={mobArcRef}
                      d={INITIAL_MOB_ARC}
                      fill={DISHES[0].accent}
                      style={{ opacity: 0.34 }}
                    />
                  </svg>

                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="الطبق السابق"
                    className="relative z-20 w-8 h-8 rounded-full bg-white/12 active:bg-[#FF6A00] text-white grid place-items-center border border-white/15 cursor-pointer shrink-0"
                  >
                    <svg viewBox="0 0 12 16" className="w-2.5 h-3 fill-current" aria-hidden="true">
                      <path d="M11 0v16L0 8z" />
                    </svg>
                  </button>

                  <div className="relative w-[154px] h-[154px] sm:w-[168px] sm:h-[168px] z-10">
                    {DISHES.map((d, i) => (
                      <div
                        key={d.id}
                        ref={(el) => {
                          mobOrbitsRef.current[i] = el;
                        }}
                        aria-hidden={i !== idx}
                        style={
                          i === 0
                            ? { transformOrigin: "50% -148%" }
                            : {
                                transformOrigin: "50% -148%",
                                visibility: "hidden",
                                opacity: 0,
                              }
                        }
                        className="absolute inset-0 will-change-transform"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={d.plateImage}
                          alt={d.productName}
                          width={168}
                          height={168}
                          draggable={false}
                          className="w-full h-full object-contain select-none drop-shadow-[0_16px_22px_rgba(0,0,0,0.48)]"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="الطبق التالي"
                    className="relative z-20 w-8 h-8 rounded-full bg-white/12 active:bg-[#FF6A00] text-white grid place-items-center border border-white/15 cursor-pointer shrink-0"
                  >
                    <svg viewBox="0 0 12 16" className="w-2.5 h-3 fill-current" aria-hidden="true">
                      <path d="M1 0v16l11-8z" />
                    </svg>
                  </button>
                </div>

                {/* 3. Mobile Two-Weight Opposing Clip-Path Wipe Headline (`0px` Shift) */}
                <div className="relative h-[86px] sm:h-[94px]">
                  {DISHES.map((d, i) => (
                    <div
                      key={d.id}
                      ref={(el) => {
                        mobHeadsRef.current[i] = el;
                      }}
                      aria-hidden={i !== idx}
                      style={i === 0 ? undefined : { visibility: "hidden", opacity: 0 }}
                      className="absolute inset-0 text-center flex flex-col items-center justify-center"
                    >
                      <span
                        data-eye
                        className="text-[10.5px] font-extrabold text-[#FFC145] tracking-wide"
                      >
                        {d.eyebrow}
                      </span>
                      <h2 className="text-[22px] sm:text-[27px] leading-[1.36] mt-0.5">
                        <span
                          data-t1
                          className="block font-bold text-white whitespace-nowrap py-0.5"
                        >
                          {d.headlineTop}
                        </span>
                        <span
                          data-t2
                          style={{ color: d.headlineAccent }}
                          className="block font-black whitespace-nowrap py-0.5"
                        >
                          {d.headlineBottom}
                        </span>
                      </h2>
                    </div>
                  ))}
                </div>

                {/* 4. Mobile Smart-Kitchen Frosted Dish Card (`Overview / Ingredients` + Quick-Add) */}
                <div className="rounded-[20px] bg-[#071D3B]/82 backdrop-blur-md border border-white/14 p-3 shadow-lg max-w-[420px] w-full mx-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-[11px]">
                    <div className="flex items-center gap-3" role="tablist" aria-label="تفاصيل الطبق">
                      {(
                        [
                          ["overview", "نظرة عامة"],
                          ["ingredients", "المكونات"],
                        ] as const
                      ).map(([key, label]) => {
                        const selected = tab === key;
                        return (
                          <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setTab(key)}
                            className={`font-extrabold transition-colors cursor-pointer ${
                              selected ? "text-[#FFC145]" : "text-[#FFF5E8]/55"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Mini Pager Dots */}
                    <div dir="ltr" className="flex items-center gap-1">
                      {DISHES.map((d, i) => (
                        <button
                          key={d.id}
                          type="button"
                          aria-label={d.shortLabel}
                          onClick={() => go(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            i === idx ? "w-4 bg-[#FF6A00]" : "w-1.5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid">
                    {DISHES.map((d, i) => (
                      <div
                        key={d.id}
                        ref={(el) => {
                          mobBodiesRef.current[i] = el;
                        }}
                        aria-hidden={i !== idx}
                        style={
                          i === 0 ? undefined : { visibility: "hidden", opacity: 0 }
                        }
                        className="col-start-1 row-start-1"
                      >
                        {/* Locked-Height Info + Ingredients Body (`h-[60px]`) */}
                        <div className="flex items-start gap-2.5 h-[60px] overflow-hidden">
                          <div
                            style={{ backgroundColor: d.accent, color: d.badgeInk }}
                            className="w-10 h-[52px] rounded-xl flex flex-col items-center justify-between py-1 shrink-0"
                          >
                            <span className="font-en text-sm font-black leading-none tabular-nums">
                              {d.rating.toFixed(1)}
                            </span>
                            <svg
                              viewBox="0 0 24 24"
                              className="w-3 h-3 fill-current opacity-90"
                              aria-hidden="true"
                            >
                              <path d="m12 2.5 2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.2l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                            </svg>
                          </div>

                          <div className="min-w-0 flex-1 text-right">
                            <div className="text-xs font-black text-white truncate">
                              {d.productName}
                            </div>
                            {tab === "overview" ? (
                              <p className="text-[11px] font-semibold text-[#FFF5E8]/80 leading-snug line-clamp-2 mt-0.5">
                                {d.description}
                              </p>
                            ) : (
                              <ul className="flex flex-wrap gap-1 mt-1 max-h-[38px] overflow-hidden">
                                {d.ingredients.slice(0, 4).map((ing) => (
                                  <li
                                    key={ing}
                                    className="rounded-full bg-white/10 px-2 py-0.5 text-[9.5px] font-bold text-[#FFF5E8]"
                                  >
                                    {ing}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-[#FFC145] tabular-nums">
                            {d.price} ج.م • {d.sizeLabel}
                          </span>
                          <button
                            type="button"
                            tabIndex={i === idx ? 0 : -1}
                            onClick={() => handleQuickAdd(d)}
                            className="shrink-0 rounded-full bg-[#FF6A00] text-white px-3.5 py-1.5 text-[11px] font-black inline-flex items-center gap-1 active:scale-95 transition cursor-pointer"
                          >
                            {addedId === d.id ? (
                              <>
                                <CheckIcon className="w-3.5 h-3.5" />
                                <span>أُضيف</span>
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
                    ))}
                  </div>
                </div>

                {/* 5. Symmetrical 2-Column Mobile CTA Row */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/menu"
                    className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white py-2.5 px-3 text-xs sm:text-sm font-black text-center shadow-md transition whitespace-nowrap"
                  >
                    اطلب من المنيو
                  </Link>
                  <button
                    type="button"
                    onClick={openQr}
                    className="rounded-full bg-[#FFF5E8] text-[#0B2D5C] py-2.5 px-3 text-xs sm:text-sm font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                  >
                    <QrCodeIcon className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>باركود QR</span>
                  </button>
                </div>
              </div>
            </div>

            {/* =================================================================
                DESKTOP SCULPTED BENTO CUTOUT OVERLAYS (`hidden lg:block`)
                Symmetrical Top Shoulders + Bottom-Left Combos Inset
               ================================================================= */}
            <div dir="ltr" className="hidden lg:block pointer-events-none absolute inset-0 z-30">
              {/* 1. TOP-LEFT SCULPTED BENTO CUTOUT: 24/7 Hot Delivery Pill */}
              <div className="pointer-events-auto absolute top-0 left-0 bg-white pr-3 pb-3 rounded-br-[28px]">
                <Link
                  href="/delivery"
                  dir="rtl"
                  className="h-[44px] px-5 rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-[#FFF5E8] inline-flex items-center gap-2 text-xs font-black transition whitespace-nowrap"
                >
                  <Truck24Icon className="w-4 h-4 text-[#FFC145]" />
                  <span>{dish.sticker} • القاهرة الجديدة</span>
                </Link>
                <div className="absolute top-0 -right-7">
                  <ConcaveTL size={28} />
                </div>
                <div className="absolute -bottom-6 left-0">
                  <ConcaveTL size={24} />
                </div>
              </div>

              {/* 2. TOP-RIGHT SCULPTED BENTO CUTOUT: Orbit Category Switcher */}
              <div className="pointer-events-auto absolute top-0 right-0 bg-white pl-3 pb-3 rounded-bl-[28px]">
                <div dir="rtl" className="flex items-center gap-1.5">
                  {DISHES.map((d, i) => {
                    const active = i === idx;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => go(i)}
                        className={`h-[44px] px-4 rounded-full text-xs font-black transition-all duration-300 cursor-pointer whitespace-nowrap ${
                          active
                            ? "bg-[#FF6A00] text-white shadow-[0_8px_18px_-6px_rgba(255,106,0,0.65)]"
                            : "bg-[#0B2D5C] hover:bg-[#143A73] text-[#FFF5E8]"
                        }`}
                      >
                        {d.tabLabel}
                      </button>
                    );
                  })}
                </div>
                <div className="absolute top-0 -left-7">
                  <ConcaveTR size={28} />
                </div>
                <div className="absolute -bottom-6 right-0">
                  <ConcaveTR size={24} />
                </div>
              </div>

              {/* 3. BOTTOM-LEFT BENTO INSET: Special Combos */}
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
                    <TagIcon className="w-4 h-4" />
                  </span>
                </Link>
                <div className="absolute -top-6 left-0">
                  <ConcaveBL size={24} />
                </div>
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
