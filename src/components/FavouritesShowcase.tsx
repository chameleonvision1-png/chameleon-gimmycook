"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./Product";

const TABS = [
  { id: "all", label: "الأكثر مبيعاً" },
  { id: "pizza", label: "البيتزا الإيطالي" },
  { id: "feteer", label: "الفطير الشرقي" },
  { id: "pasta", label: "المكرونة والوايت صوص" },
  { id: "tawagen", label: "الطواجن الفرن" },
  { id: "meals", label: "الوجبات والبرجر" },
  { id: "grills", label: "المشاوي الشرقية" },
  { id: "sides", label: "المقبلات والصوصات" },
];

export default function FavouritesShowcase({ products }: { products: Product[] }) {
  const [tab, setTab] = useState("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (tab === "all") {
      const best = products.filter((p) => p.isBestSeller);
      return best.length >= 6 ? best : products.slice(0, 14);
    }
    return products.filter((p) => p.categoryId === tab);
  }, [products, tab]);

  const scrollTrack = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(320, el.clientWidth * 0.85);
    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-x-clip">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-[#0B2D5C] text-[#FFC145] px-3.5 py-1 text-xs font-black font-en mb-2.5">
          GOOD FOOD • GOOD MOOD
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-[#0B2D5C] tracking-tight">
          نجوم منيو جيمي كوك
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-bold text-[#071D3B]/68">
          أشهر أصناف البيتزا، الفطير الشرقي، الباستا والطواجن — اختار الحجم وأضف لطلبك فوراً
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        ref={tabsRef}
        className="mt-5 -mx-4 px-4 sm:mx-0 sm:px-0 flex items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2"
      >
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={(e) => {
                setTab(t.id);
                const btn = e.currentTarget;
                const box = tabsRef.current;
                if (box && btn) {
                  const boxRect = box.getBoundingClientRect();
                  const btnRect = btn.getBoundingClientRect();
                  const delta =
                    btnRect.left + btnRect.width * 0.5 - (boxRect.left + boxRect.width * 0.5);
                  box.scrollBy({ left: delta, behavior: "smooth" });
                }
                if (trackRef.current) {
                  trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-black border transition-all duration-200 cursor-pointer ${
                active
                  ? "bg-[#FF6A00] text-white border-[#FF6A00] shadow-[0_4px_12px_-2px_rgba(255,106,0,0.34)]"
                  : "bg-white text-[#0B2D5C]/85 border-[#0B2D5C]/12 hover:border-[#FF6A00] hover:text-[#FF6A00]"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Horizontal Swipeable Snap Carousel */}
      <div
        ref={trackRef}
        className="mt-6 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar"
      >
        {filtered.map((product) => (
          <div
            key={product.id}
            className="w-[78vw] max-w-[285px] sm:w-[275px] lg:w-[295px] shrink-0 snap-center"
          >
            <ProductCard product={product} variant="grid" />
          </div>
        ))}
      </div>

      {/* Circular `<` `>` Controls + Full Menu Link */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {filtered.length > 1 && (
          <div dir="ltr" className="flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollTrack("left")}
              aria-label="السابق"
              className="w-10 h-10 rounded-full bg-[#F3E3D1] hover:bg-[#FFC145] text-[#0B2D5C] grid place-items-center font-black text-base transition cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollTrack("right")}
              aria-label="التالي"
              className="w-10 h-10 rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white grid place-items-center font-black text-base transition cursor-pointer shadow-sm"
            >
              ›
            </button>
          </div>
        )}

        <Link
          href="/menu"
          className="rounded-full bg-white hover:bg-[#FFC145] border border-[#0B2D5C]/20 text-[#0B2D5C] px-5 py-2 text-xs font-black transition"
        >
          تصفح كل الأصناف (٨ أقسام كاملة)
        </Link>
      </div>
    </section>
  );
}
