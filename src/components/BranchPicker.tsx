"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import { useStore } from "./store";
import {
  ChevronDownIcon,
  ClockIcon,
  ExternalLinkIcon,
  PhoneIcon,
  PinIcon,
  Truck24Icon,
  UtensilsIcon,
  WhatsAppIcon,
  XIcon,
} from "./icons";

const FALLBACK_PHONES = ["01020305074", "01060449933"];

export default function BranchPicker() {
  const { branches, setBranchId, pickerOpen, closePicker } = useStore();
  const [zonesOpen, setZonesOpen] = useState(false);

  useLockBodyScroll(pickerOpen);

  useEffect(() => {
    if (!pickerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePicker();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pickerOpen, closePicker]);

  if (!pickerOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[92] flex items-end sm:items-center justify-center sm:p-4 overscroll-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-picker-title"
    >
      {/* Touch-isolated Backdrop */}
      <div
        className="absolute inset-0 bg-[#071D3B]/70 backdrop-blur-xs touch-none"
        onClick={closePicker}
      />

      {/* Modal Sheet */}
      <div
        dir="rtl"
        className="relative z-10 w-full sm:max-w-md bg-[#FFF5E8] rounded-t-[28px] sm:rounded-[28px] shadow-2xl border-2 border-[#0B2D5C]/25 overflow-hidden flex flex-col max-h-[88dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Symmetrical 3-Column Header */}
        <div className="shrink-0 bg-gradient-to-l from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white px-4 pt-3.5 pb-3.5 border-b border-[#FFC145]/25">
          <div className="w-11 h-1 rounded-full bg-white/30 mx-auto mb-2.5 sm:hidden" />

          <div dir="ltr" className="grid grid-cols-[40px_1fr_40px] items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-emblem.webp"
              alt="جيمي كوك"
              className="w-10 h-10 rounded-full object-contain drop-shadow-md select-none"
            />

            <div dir="rtl" className="text-center min-w-0">
              <h2
                id="branch-picker-title"
                className="text-sm sm:text-base font-black text-white leading-tight truncate"
              >
                مطعم جيمي كوك — GIMMY COOK
              </h2>
              <p className="text-[11px] text-[#FFC145] font-bold mt-0.5 truncate">
                القاهرة الجديدة • دليفري 24 ساعة
              </p>
            </div>

            <button
              type="button"
              onClick={closePicker}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-[#FF6A00] text-white grid place-items-center transition cursor-pointer"
              aria-label="إغلاق"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll-Isolated Body (`data-modal-scroll`) */}
        <div
          data-modal-scroll
          className="flex-1 overflow-y-auto overscroll-contain touch-pan-y bg-[#FFF5E8] p-4 space-y-3"
        >
          {branches.map((b) => {
            const phones = Array.from(
              new Set(
                [b.phone, b.phone2, ...(b.extraPhones ?? []), ...FALLBACK_PHONES].filter(
                  (x): x is string => Boolean(x)
                )
              )
            );
            const primaryPhone = phones[0] || "01020305074";
            const secondPhone = phones[1] || "01060449933";
            const zones =
              b.deliveryAreas && b.deliveryAreas.length > 0
                ? b.deliveryAreas
                : [
                    "القاهرة الجديدة والتجمع",
                    "مدينتي",
                    "مدينة الشروق",
                    "مدينة بدر",
                    "العاصمة الإدارية الجديدة",
                    "مدينة وصال والبروج",
                  ];

            return (
              <div
                key={b.id}
                onClick={() => setBranchId(b.id)}
                className="w-full rounded-2xl border border-[#0B2D5C]/18 bg-white p-4 shadow-xs space-y-3"
              >
                {/* Branch Title + Status Pill */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#0B2D5C]/10">
                  <span className="font-black text-sm sm:text-base text-[#0B2D5C] truncate">
                    {b.name}
                  </span>
                  <span className="shrink-0 text-[11px] font-black bg-[#FFC145] text-[#071D3B] px-3 py-0.5 rounded-full">
                    مفتوح 24 ساعة
                  </span>
                </div>

                {/* Address & Hours Box */}
                <div className="rounded-2xl bg-[#FFF5E8] border border-[#0B2D5C]/12 p-3 space-y-1.5">
                  <div className="text-xs text-[#071D3B]/85 flex items-start gap-2 font-bold leading-relaxed">
                    <PinIcon className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </div>
                  <div className="text-xs text-[#071D3B]/68 flex items-center gap-2 font-semibold">
                    <ClockIcon className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>{b.hours}</span>
                  </div>
                </div>

                {/* Primary Contact Row — Strict 2 Equal Columns */}
                <div
                  className="grid grid-cols-2 gap-2"
                  dir="ltr"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={`tel:${primaryPhone}`}
                    className="h-11 rounded-2xl bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-3 flex items-center justify-center gap-1.5 text-xs font-en font-black transition shadow-2xs"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{primaryPhone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${b.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    dir="rtl"
                    className="h-11 rounded-2xl bg-[#0B2D5C] hover:bg-[#071D3B] text-[#FFC145] px-3 flex items-center justify-center gap-1.5 text-xs font-black transition shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>طلب واتساب</span>
                  </a>
                </div>

                {/* Secondary Action Row — Second Phone + Map Link */}
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${secondPhone}`}
                      dir="ltr"
                      className="h-10 rounded-2xl bg-[#FFF5E8] hover:bg-[#FFC145] border border-[#0B2D5C]/16 px-3 flex items-center justify-center gap-1.5 text-xs font-en font-black text-[#0B2D5C] transition"
                    >
                      <PhoneIcon className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                      <span>{secondPhone}</span>
                    </a>

                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-10 rounded-2xl bg-[#FFC145] hover:bg-[#FF6A00] text-[#071D3B] hover:text-white px-3 flex items-center justify-center gap-1.5 text-xs font-black transition"
                    >
                      <PinIcon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">الموقع على الخريطة</span>
                      <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZonesOpen((v) => !v)}
                    aria-expanded={zonesOpen}
                    className="w-full h-10 rounded-2xl bg-[#FFF5E8] hover:bg-[#F3E3D1] border border-[#0B2D5C]/14 px-3.5 flex items-center justify-between text-xs font-black text-[#0B2D5C] transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Truck24Icon className="w-4 h-4 text-[#FF6A00]" />
                      <span>مناطق التوصيل 24 ساعة ({zones.length})</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#FF6A00] transition-transform duration-200 ${
                        zonesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {zonesOpen && (
                    <div className="rounded-2xl bg-[#FFF5E8] border border-[#0B2D5C]/14 p-2.5 grid grid-cols-2 gap-1.5">
                      {zones.map((z) => (
                        <div
                          key={z}
                          className="rounded-xl bg-white border border-[#0B2D5C]/10 px-2.5 py-1.5 text-[11px] font-extrabold text-[#071D3B] truncate text-center"
                        >
                          {z}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Branch Services — Symmetrical 2x2 Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {b.services.map((s) => (
                    <div
                      key={s}
                      className="rounded-xl bg-[#FFF5E8] border border-[#0B2D5C]/12 py-2 px-2.5 text-center text-[11px] font-extrabold text-[#071D3B]/85 truncate"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pinned Symmetrical Footer CTA */}
        <div className="shrink-0 p-3.5 bg-white border-t border-[#0B2D5C]/12 grid grid-cols-2 gap-2">
          <Link
            href="/menu"
            onClick={closePicker}
            className="h-11 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <UtensilsIcon className="w-4 h-4 text-[#FFC145]" />
            <span>افتح المنيو الآن</span>
          </Link>
          <Link
            href="/delivery"
            onClick={closePicker}
            className="h-11 rounded-full bg-[#0B2D5C] hover:bg-[#071D3B] text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Truck24Icon className="w-4 h-4 text-[#FFC145]" />
            <span>تفاصيل التوصيل</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
