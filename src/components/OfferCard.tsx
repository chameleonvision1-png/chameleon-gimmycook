"use client";

import { useState } from "react";
import type { Offer } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useStore } from "./store";
import { CheckIcon, ClockIcon, PlusIcon } from "./icons";

export default function OfferCard({ offer }: { offer: Offer }) {
  const { addToCart, branch } = useStore();
  const [added, setAdded] = useState(false);

  const notHere =
    !!branch && offer.branchIds.length > 0 && !offer.branchIds.includes(branch.id);
  const discount =
    offer.oldPrice > offer.price
      ? Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)
      : 0;

  return (
    <article className="rounded-[28px] bg-white overflow-hidden flex flex-col h-full group border border-[#0B2D5C]/12 hover:border-[#FF6A00] shadow-[0_10px_26px_-14px_rgba(11,45,92,0.1)] hover:shadow-[0_18px_38px_-14px_rgba(255,106,0,0.22)] transition-all duration-200">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071D3B]/65 via-transparent to-transparent" />
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 z-10">
          {offer.badge ? (
            <span className="bg-[#FFC145] text-[#071D3B] font-black text-xs px-3 py-1 rounded-full shadow-md">
              {offer.badge}
            </span>
          ) : (
            <span />
          )}
          {discount > 0 && (
            <span className="bg-[#FF6A00] text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
              وفّر {discount}%
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-black text-base sm:text-lg text-[#0B2D5C] group-hover:text-[#FF6A00] transition-colors leading-snug text-right">
          {offer.title}
        </h3>
        <p className="text-[#071D3B]/68 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed flex-1 font-medium text-right">
          {offer.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF5E8] border border-[#0B2D5C]/15 text-[#0B2D5C] px-2.5 py-0.5 text-[11px] font-extrabold">
            <ClockIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>متاح 24 ساعة في جيمي كوك</span>
          </span>
          {offer.terms && (
            <span className="text-[11px] text-[#071D3B]/60 line-clamp-1 font-semibold">
              {offer.terms}
            </span>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#0B2D5C]/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#FFC145] text-[#071D3B] px-3.5 py-1 text-sm sm:text-base font-black whitespace-nowrap">
              {formatPrice(offer.price)}
            </span>
            {offer.oldPrice > offer.price && (
              <span className="text-xs sm:text-sm font-bold text-[#071D3B]/40 line-through whitespace-nowrap">
                {formatPrice(offer.oldPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={notHere}
            onClick={() => {
              addToCart({
                productId: `offer:${offer.id}`,
                name: `عرض: ${offer.title}`,
                image: offer.image,
                addons: [],
                unitPrice: offer.price,
                qty: 1,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`rounded-full px-4 py-2 text-xs font-black flex items-center gap-1.5 transition cursor-pointer ${
              added
                ? "bg-[#0B2D5C] text-[#FFC145]"
                : "bg-[#FF6A00] hover:bg-[#CE2F08] text-white"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>أُضيف</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-4 h-4" />
                <span>أضف العرض</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
