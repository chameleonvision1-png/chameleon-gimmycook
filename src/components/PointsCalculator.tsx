"use client";

import Link from "next/link";
import { useState } from "react";
import { calcGimmyPoints, formatPrice } from "@/lib/format";
import { GiftPointsIcon, UtensilsIcon } from "./icons";

const PRESETS = [200, 350, 500, 800, 1200];

export default function PointsCalculator() {
  const [spend, setSpend] = useState(400);
  const points = calcGimmyPoints(spend);
  const credit = points; // 5 points = 5 EGP => 1 point = 1 EGP reward value

  return (
    <div className="rounded-[32px] bg-white border-2 border-[#0B2D5C]/16 p-5 sm:p-8 shadow-[0_18px_42px_-18px_rgba(11,45,92,0.16)] space-y-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] text-[#071D3B] px-3 py-1 text-xs font-black">
            <GiftPointsIcon className="w-3.5 h-3.5" />
            <span>حاسبة مكافآت جيمي التفاعلية</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#0B2D5C] mt-2">
            احسب نقاطك ورصيدك الفوري
          </h2>
        </div>
        <div className="text-left" dir="ltr">
          <span className="font-en font-black text-xs text-[#FF6A00] bg-[#FFF5E8] border border-[#FF6A00]/25 px-3 py-1 rounded-full">
            100 EGP = 5 PTS = 5 EGP
          </span>
        </div>
      </div>

      {/* Quick Preset Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {PRESETS.map((val) => {
          const active = spend === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => setSpend(val)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-black border transition cursor-pointer ${
                active
                  ? "bg-[#0B2D5C] text-[#FFC145] border-[#0B2D5C]"
                  : "bg-[#FFF5E8] text-[#0B2D5C] border-[#0B2D5C]/14 hover:border-[#FF6A00]"
              }`}
            >
              طلب بقيمة {val} ج.م
            </button>
          );
        })}
      </div>

      {/* Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-black text-[#071D3B]">
          <span>قيمة الطلب التقريبية:</span>
          <span className="text-base sm:text-lg text-[#FF6A00] tabular-nums">{formatPrice(spend)}</span>
        </div>
        <input
          type="range"
          min={100}
          max={2000}
          step={50}
          value={spend}
          onChange={(e) => setSpend(Number(e.target.value))}
          aria-label="قيمة الطلب بالجنيه"
          className="w-full accent-[#FF6A00] cursor-pointer h-2 rounded-lg bg-[#FFF5E8]"
        />
        <div className="flex justify-between text-[11px] font-bold text-[#071D3B]/55 tabular-nums">
          <span>100 ج.م</span>
          <span>1,000 ج.م</span>
          <span>2,000 ج.م</span>
        </div>
      </div>

      {/* Output Summary Boxes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#0B2D5C] text-white p-4 text-center">
          <div className="text-xs font-bold text-white/80">النقاط المكتسبة</div>
          <div className="text-2xl sm:text-3xl font-black text-[#FFC145] mt-1 tabular-nums">
            {points} نقطة
          </div>
          <div className="text-[11px] text-white/70 mt-0.5 font-en">GIMMY POINTS</div>
        </div>

        <div className="rounded-2xl bg-[#FFF5E8] border border-[#FF6A00]/30 p-4 text-center">
          <div className="text-xs font-bold text-[#071D3B]/75">رصيد الخصم المكافئ</div>
          <div className="text-2xl sm:text-3xl font-black text-[#FF6A00] mt-1 tabular-nums">
            {formatPrice(credit)}
          </div>
          <div className="text-[11px] text-[#0B2D5C] font-extrabold mt-0.5">
            يُخصم من طلبك القادم
          </div>
        </div>
      </div>

      <Link
        href="/menu"
        className="w-full h-12 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-black text-sm flex items-center justify-center gap-2 transition shadow-md"
      >
        <UtensilsIcon className="w-4 h-4 text-[#FFC145]" />
        <span>ابدأ طلبك الآن وجمّع نقاطك</span>
      </Link>
    </div>
  );
}
