"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Category, Product } from "@/lib/types";
import { ProductCard } from "./Product";
import { useStore } from "./store";
import {
  ChevronIcon,
  GridIcon,
  ListIcon,
  PinIcon,
  SearchIcon,
  XIcon,
} from "./icons";

const filters = [
  { id: "all", label: "كل الأقسام" },
  { id: "best", label: "الأكثر مبيعاً" },
  { id: "italian", label: "البيتزا والباستا" },
  { id: "oriental", label: "الفطير والطواجن" },
  { id: "family", label: "الوجبات والمشاوي" },
];

const categoryDescriptions: Record<string, string> = {
  pizza:
    "بيتزا إيطالية بعجينة طازجة مخبوزة يومياً بأحجام وسط وكبير وعائلي مع أطراف جبنة وصوصات جيمي الخاصة",
  feteer:
    "فطير شرقي مورق بالسمن البلدي غرقان موتزاريلا وحشوات فراخ ولحوم مشكل وفطير حلو بالقشطة والعسل",
  pasta:
    "مكرونة إيطالية بصوصات كريمية غنية — وايت صوص ألفريدو، نجرسكو بالموتزاريلا، أرابياتا، وماك آند تشيز",
  tawagen:
    "طواجن فخار طالعة من الفرن بوش موتزاريلا ذهبي محمر (مكرونة باللحمة، فراخ كرسبي، سجق شرقي، وبشاميل)",
  meals:
    "وجبات فردية وكومبو مشبعة وساندوتشات برجر مشوي وكرسبي زنجر مع البطاطس المقرمشة والصوصات",
  grills:
    "مشويات عالفحم وأطباق شرقية متكاملة مع الأرز البسمتي المبهر والسلطات الطازجة والطحينة",
  sides:
    "بطاطس بالجبنة الشيدر والهالبينو، خبز ثوم بالموتزاريلا، حلقات بصل، وسلطات وصوصات جيمي كوك",
  drinks:
    "مشروبات غازية باردة فردية وعائلية ومياه معدنية تكمل مود الأكلة",
};

const MenuChapters = memo(function MenuChapters({
  visibleCats,
  filtered,
  view,
  setSectionRef,
}: {
  visibleCats: Category[];
  filtered: Product[];
  view: "menu" | "grid";
  setSectionRef: (id: string, el: HTMLElement | null) => void;
}) {
  return (
    <div className="space-y-7 min-w-0 w-full max-w-full">
      {visibleCats.map((c, idx) => {
        const items = filtered.filter((p) => p.categoryId === c.id);
        const desc =
          categoryDescriptions[c.id] ||
          "يُحضّر طازجاً فور الطلب في مطعم جيمي كوك — دليفري 24 ساعة للقاهرة الجديدة والمناطق المجاورة";
        return (
          <section
            key={c.id}
            id={`cat-${c.id}`}
            ref={(el) => setSectionRef(c.id, el)}
            className="scroll-mt-36 sm:scroll-mt-40 w-full max-w-full min-w-0 overflow-hidden bg-white rounded-[28px] sm:rounded-[32px] p-4 sm:p-6 border border-[#0B2D5C]/10 shadow-[0_12px_32px_-18px_rgba(7,29,59,0.12)]"
          >
            {/* Clean Editorial Chapter Header */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-5 pb-4 border-b border-[#0B2D5C]/10 min-w-0">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFF5E8] border border-[#0B2D5C]/10 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.nameAr}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 text-right">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    dir="ltr"
                    className="font-en text-[11px] font-extrabold tracking-wider text-[#FF6A00]"
                  >
                    0{idx + 1}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-black text-[#0B2D5C] leading-[1.3]">
                    {c.nameAr}
                  </h2>
                  <span className="rounded-full bg-[#FFF5E8] border border-[#0B2D5C]/10 px-2.5 py-0.5 text-[11px] font-extrabold text-[#0B2D5C]/75">
                    {items.length} أصناف
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#071D3B]/65 mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>

            {view === "menu" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 min-w-0 w-full">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="menu" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-0 w-full">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="grid" />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
});

export default function MenuClient({
  categories,
  products,
  initialCat,
}: {
  categories: Category[];
  products: Product[];
  initialCat?: string;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"menu" | "grid">("menu");
  const [activeCat, setActiveCat] = useState(initialCat ?? categories[0]?.id);

  const activeCatRef = useRef(activeCat);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const stickyBarRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const isJumpingRef = useRef(false);
  const jumpTargetYRef = useRef<number | null>(null);
  const jumpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pillRafRef = useRef<number>(0);

  // Desktop mouse drag state for smooth horizontal category swiping
  const dragStateRef = useRef<{
    active: boolean;
    moved: boolean;
    startX: number;
    startScrollLeft: number;
  }>({ active: false, moved: false, startX: 0, startScrollLeft: 0 });
  const isUserInteractingStripRef = useRef(false);
  const stripTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { branch, openPicker, hydrated } = useStore();

  useEffect(() => {
    activeCatRef.current = activeCat;
  }, [activeCat]);

  const setSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (
        term &&
        !(
          p.nameAr.toLowerCase().includes(term) ||
          (p.nameEn && p.nameEn.toLowerCase().includes(term)) ||
          p.descriptionAr.toLowerCase().includes(term)
        )
      ) {
        return false;
      }
      switch (filter) {
        case "best":
          return p.isBestSeller;
        case "italian":
          return p.categoryId === "pizza" || p.categoryId === "pasta";
        case "oriental":
          return p.categoryId === "feteer" || p.categoryId === "tawagen";
        case "family":
          return Boolean(
            p.forFamily ||
              p.categoryId === "meals" ||
              p.categoryId === "grills",
          );
        default:
          return true;
      }
    });
  }, [q, filter, products]);

  const visibleCats = useMemo(
    () => categories.filter((c) => filtered.some((p) => p.categoryId === c.id)),
    [categories, filtered],
  );

  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of filtered) {
      map[p.categoryId] = (map[p.categoryId] || 0) + 1;
    }
    return map;
  }, [filtered]);

  /** Smooth 60fps centering of active pill inside horizontal category rail */
  const centerActivePill = useCallback((catId: string, immediate = false) => {
    const box = pillsRef.current;
    const pill = box?.querySelector<HTMLElement>(`[data-cat="${catId}"]`);
    if (!box || !pill) return;

    if (pillRafRef.current) {
      cancelAnimationFrame(pillRafRef.current);
      pillRafRef.current = 0;
    }

    const boxRect = box.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const delta =
      pillRect.left + pillRect.width * 0.5 - (boxRect.left + boxRect.width * 0.5);

    if (Math.abs(delta) < 2) return;

    const startScrollLeft = box.scrollLeft;
    if (immediate) {
      box.scrollLeft = startScrollLeft + delta;
      return;
    }

    const startTime = performance.now();
    const duration = 280;

    const step = (now: number) => {
      if (isUserInteractingStripRef.current) {
        pillRafRef.current = 0;
        return;
      }
      const t = Math.min(1, (now - startTime) / duration);
      // Smooth cubic-out curve
      const eased = 1 - Math.pow(1 - t, 3);
      box.scrollLeft = startScrollLeft + delta * eased;

      if (t < 1) {
        pillRafRef.current = requestAnimationFrame(step);
      } else {
        pillRafRef.current = 0;
      }
    };
    pillRafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!activeCat || isUserInteractingStripRef.current) return;
    centerActivePill(activeCat, false);
  }, [activeCat, visibleCats, centerActivePill]);

  useEffect(() => {
    if (initialCat) {
      const timer = setTimeout(() => {
        const el = sectionRefs.current[initialCat];
        if (!el) return;
        const stickyBottom = stickyBarRef.current?.getBoundingClientRect().bottom ?? 138;
        const top = window.scrollY + el.getBoundingClientRect().top - stickyBottom - 16;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [initialCat]);

  useEffect(() => {
    if (visibleCats.length === 0) return;
    let ticking = false;

    const releaseProgrammaticJump = () => {
      if (!isJumpingRef.current) return;
      isJumpingRef.current = false;
      jumpTargetYRef.current = null;
      if (jumpTimerRef.current) {
        clearTimeout(jumpTimerRef.current);
        jumpTimerRef.current = null;
      }
    };

    const onScroll = () => {
      if (isJumpingRef.current) {
        // Release cleanly once browser reaches target scroll position
        if (
          jumpTargetYRef.current !== null &&
          Math.abs(window.scrollY - jumpTargetYRef.current) < 10
        ) {
          releaseProgrammaticJump();
        }
        return;
      }
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const stickyBottom =
          stickyBarRef.current?.getBoundingClientRect().bottom ?? 138;
        const triggerLine = stickyBottom + 28;
        const hysteresis = 24;
        const prevId = activeCatRef.current;
        let candidateId = visibleCats[0].id;

        const doc = document.documentElement;
        if (window.innerHeight + window.scrollY >= doc.scrollHeight - 28) {
          candidateId = visibleCats[visibleCats.length - 1].id;
        } else {
          for (const c of visibleCats) {
            const el = sectionRefs.current[c.id];
            if (!el) continue;
            if (el.getBoundingClientRect().top <= triggerLine) {
              candidateId = c.id;
            } else {
              break;
            }
          }

          if (candidateId !== prevId) {
            const prevIdx = visibleCats.findIndex((c) => c.id === prevId);
            const candIdx = visibleCats.findIndex((c) => c.id === candidateId);

            if (prevIdx !== -1 && candIdx === prevIdx + 1) {
              const nextEl = sectionRefs.current[candidateId];
              if (
                nextEl &&
                nextEl.getBoundingClientRect().top > triggerLine - hysteresis
              ) {
                candidateId = prevId;
              }
            } else if (prevIdx !== -1 && candIdx === prevIdx - 1) {
              const prevEl = sectionRefs.current[prevId];
              if (
                prevEl &&
                prevEl.getBoundingClientRect().top < triggerLine + hysteresis
              ) {
                candidateId = prevId;
              }
            }
          }
        }

        if (candidateId !== prevId) {
          activeCatRef.current = candidateId;
          setActiveCat(candidateId);
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", releaseProgrammaticJump, { passive: true });
    window.addEventListener("wheel", releaseProgrammaticJump, { passive: true });
    window.addEventListener("touchmove", releaseProgrammaticJump, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", releaseProgrammaticJump);
      window.removeEventListener("wheel", releaseProgrammaticJump);
      window.removeEventListener("touchmove", releaseProgrammaticJump);
      if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);
      if (stripTimerRef.current) clearTimeout(stripTimerRef.current);
      if (pillRafRef.current) cancelAnimationFrame(pillRafRef.current);
    };
  }, [visibleCats]);

  const jump = (id: string) => {
    if (dragStateRef.current.moved) return;
    const el = sectionRefs.current[id];
    if (!el) return;

    isUserInteractingStripRef.current = false;
    isJumpingRef.current = true;
    activeCatRef.current = id;
    setActiveCat(id);
    centerActivePill(id, false);
    if (jumpTimerRef.current) clearTimeout(jumpTimerRef.current);

    const stickyBottom = stickyBarRef.current?.getBoundingClientRect().bottom ?? 138;
    const targetTop = Math.max(
      0,
      window.scrollY + el.getBoundingClientRect().top - stickyBottom - 16,
    );
    jumpTargetYRef.current = targetTop;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });

    // Safety fallback for browsers without `scrollend` over long distances
    jumpTimerRef.current = setTimeout(() => {
      isJumpingRef.current = false;
      jumpTargetYRef.current = null;
    }, 1250);
  };

  /** Smooth horizontal glide via desktop arrow buttons */
  const nudgeStrip = (dir: "right" | "left") => {
    const box = pillsRef.current;
    if (!box) return;
    isUserInteractingStripRef.current = true;
    if (stripTimerRef.current) clearTimeout(stripTimerRef.current);

    const start = box.scrollLeft;
    const delta = dir === "right" ? 240 : -240;
    const startTime = performance.now();
    const duration = 260;

    if (pillRafRef.current) cancelAnimationFrame(pillRafRef.current);
    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      box.scrollLeft = start + delta * eased;
      if (t < 1) {
        pillRafRef.current = requestAnimationFrame(animate);
      } else {
        pillRafRef.current = 0;
      }
    };
    pillRafRef.current = requestAnimationFrame(animate);

    stripTimerRef.current = setTimeout(() => {
      isUserInteractingStripRef.current = false;
    }, 500);
  };

  return (
    <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-5 w-full min-w-0">
      {/* Search + View Switcher + Filter Bar */}
      <div className="bg-white rounded-[26px] p-3.5 sm:p-4 border border-[#0B2D5C]/10 shadow-[0_12px_30px_-16px_rgba(7,29,59,0.12)] space-y-3">
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <SearchIcon className="w-4 h-4 text-[#FF6A00] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث في المنيو (بيتزا رانش، فطير فراخ وجبن، طاجن موتزاريلا، ألفريدو…)"
              className="w-full rounded-full border border-[#0B2D5C]/14 bg-[#FFF5E8]/60 focus:bg-white focus:border-[#FF6A00] focus:outline-none pr-10 pl-9 py-2.5 text-xs sm:text-sm font-bold text-[#071D3B] transition-colors"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="مسح البحث"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0B2D5C]/45 hover:text-[#FF6A00] cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Segmented View Switcher + Branch */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <div className="grid grid-cols-2 flex-1 sm:flex-initial rounded-full bg-[#FFF5E8] border border-[#0B2D5C]/12 p-1">
              <button
                type="button"
                onClick={() => setView("menu")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  view === "menu"
                    ? "bg-[#071D3B] text-white shadow-xs"
                    : "text-[#071D3B]/75 hover:text-[#FF6A00]"
                }`}
              >
                <ListIcon className="w-3.5 h-3.5 shrink-0" />
                <span>قائمة</span>
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-full px-3.5 py-1.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                  view === "grid"
                    ? "bg-[#071D3B] text-white shadow-xs"
                    : "text-[#071D3B]/75 hover:text-[#FF6A00]"
                }`}
              >
                <GridIcon className="w-3.5 h-3.5 shrink-0" />
                <span>بطاقات</span>
              </button>
            </div>

            {hydrated && branch && (
              <button
                type="button"
                onClick={openPicker}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#FFF5E8] hover:bg-[#FFC145] border border-[#0B2D5C]/14 px-3.5 py-2 text-[11px] font-black text-[#0B2D5C] transition cursor-pointer"
              >
                <PinIcon className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                <span>{branch.city}</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-black border transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#FF6A00] text-white border-[#FF6A00] shadow-xs"
                    : "bg-[#FFF5E8]/80 text-[#071D3B]/80 border-[#0B2D5C]/10 hover:border-[#FF6A00]"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          SCULPTED STICKY CATEGORY CAPSULE RAIL (`top-[64px] sm:top-[74px]`)
          Exact alignment below Header + Desktop Drag + Arrow Gliders + 60fps Centering
         ===================================================================== */}
      <div
        ref={stickyBarRef}
        className="sticky top-[64px] sm:top-[74px] z-30 pt-2.5 pb-2"
      >
        <div className="rounded-2xl sm:rounded-full bg-[#071D3B]/95 backdrop-blur-md p-1.5 border border-white/10 shadow-[0_16px_36px_-14px_rgba(7,29,59,0.42)] flex items-center gap-1.5">
          {/* Desktop Scroll-Right Button (RTL Start) */}
          <button
            type="button"
            onClick={() => nudgeStrip("right")}
            aria-label="التمرير لليمين"
            className="hidden md:grid w-8 h-8 rounded-full bg-white/[0.08] hover:bg-[#FF6A00] text-[#FFF5E8] place-items-center shrink-0 transition cursor-pointer"
          >
            <ChevronIcon className="w-4 h-4 rotate-180" />
          </button>

          {/* Draggable & Swipeable Category Track */}
          <div
            ref={pillsRef}
            onTouchStart={() => {
              isUserInteractingStripRef.current = true;
              if (stripTimerRef.current) clearTimeout(stripTimerRef.current);
            }}
            onTouchEnd={() => {
              if (stripTimerRef.current) clearTimeout(stripTimerRef.current);
              stripTimerRef.current = setTimeout(() => {
                isUserInteractingStripRef.current = false;
              }, 450);
            }}
            onMouseDown={(e) => {
              const box = pillsRef.current;
              if (!box) return;
              dragStateRef.current = {
                active: true,
                moved: false,
                startX: e.clientX,
                startScrollLeft: box.scrollLeft,
              };
              isUserInteractingStripRef.current = true;
            }}
            onMouseMove={(e) => {
              const st = dragStateRef.current;
              const box = pillsRef.current;
              if (!st.active || !box) return;
              const dx = e.clientX - st.startX;
              if (Math.abs(dx) > 5) st.moved = true;
              if (st.moved) {
                e.preventDefault();
                box.scrollLeft = st.startScrollLeft - dx;
              }
            }}
            onMouseUp={() => {
              dragStateRef.current.active = false;
              setTimeout(() => {
                dragStateRef.current.moved = false;
                isUserInteractingStripRef.current = false;
              }, 80);
            }}
            onMouseLeave={() => {
              dragStateRef.current.active = false;
              dragStateRef.current.moved = false;
              isUserInteractingStripRef.current = false;
            }}
            onWheel={(e) => {
              const box = pillsRef.current;
              if (!box || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
              if (box.scrollWidth > box.clientWidth) {
                box.scrollLeft -= e.deltaY * 0.7;
              }
            }}
            className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none cursor-grab active:cursor-grabbing px-0.5"
          >
            {visibleCats.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  data-cat={c.id}
                  onClick={() => jump(c.id)}
                  className={`shrink-0 rounded-xl sm:rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] font-extrabold inline-flex items-center gap-2 transition-all duration-250 cursor-pointer ${
                    active
                      ? "bg-[#FF6A00] text-white shadow-[0_6px_16px_-4px_rgba(255,106,0,0.65)]"
                      : "text-[#FFF5E8]/80 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span>{c.nameAr}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-black tabular-nums transition-colors ${
                      active
                        ? "bg-white/22 text-white"
                        : "bg-white/10 text-[#FFC145]"
                    }`}
                  >
                    {catCounts[c.id] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop Scroll-Left Button (RTL End) */}
          <button
            type="button"
            onClick={() => nudgeStrip("left")}
            aria-label="التمرير لليسار"
            className="hidden md:grid w-8 h-8 rounded-full bg-white/[0.08] hover:bg-[#FF6A00] text-[#FFF5E8] place-items-center shrink-0 transition cursor-pointer"
          >
            <ChevronIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-4">
        {visibleCats.length === 0 ? (
          <div className="rounded-[28px] bg-white border border-[#0B2D5C]/12 p-12 text-center">
            <h3 className="text-lg font-black text-[#0B2D5C]">لا توجد أصناف مطابقة لبحثك</h3>
            <p className="text-xs sm:text-sm text-[#071D3B]/65 mt-1 font-semibold">
              جرّب كلمة بحث أخرى أو اعرض كل أقسام منيو جيمي كوك
            </p>
            <button
              type="button"
              onClick={() => {
                setQ("");
                setFilter("all");
              }}
              className="btn btn-primary mt-4 text-xs"
            >
              عرض كل المنيو
            </button>
          </div>
        ) : (
          <MenuChapters
            visibleCats={visibleCats}
            filtered={filtered}
            view={view}
            setSectionRef={setSectionRef}
          />
        )}
      </div>
    </div>
  );
}
