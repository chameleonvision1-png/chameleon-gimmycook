"use client";

import Link from "next/link";
import { useState } from "react";
import type { Branch } from "@/lib/types";
import {
  ChevronDownIcon,
  ClockIcon,
  ExternalLinkIcon,
  PhoneIcon,
  PinIcon,
  Truck24Icon,
  WhatsAppIcon,
} from "./icons";
import { OrderFromBranchButton } from "./BranchButtons";

const DELIVERY_ZONES = [
  "القاهرة الجديدة والتجمع الأول والثالث والخامس",
  "مدينتي (كل المراحل والـ B والـ V)",
  "مدينة الشروق والكمبوندات السكنية",
  "مدينة بدر والحي المتميز",
  "العاصمة الإدارية الجديدة والأحياء السكنية",
  "مدينة وصال وكمبوند البروج (طريق الإسماعيلية)",
];

const DEFAULT_PHONES = ["01020305074", "01060449933"];

export default function BranchesShowcase({ branches }: { branches: Branch[] }) {
  const [phonesOpen, setPhonesOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
      {branches.map((b) => {
        const allPhones = Array.from(
          new Set(
            [b.phone, b.phone2, ...(b.extraPhones ?? []), ...DEFAULT_PHONES].filter(
              (x): x is string => Boolean(x)
            )
          )
        );
        const primaryPhone = allPhones[0] || "01020305074";

        return (
          <div
            key={b.id}
            className="lg:col-span-7 rounded-[28px] sm:rounded-[32px] bg-white p-5 sm:p-7 flex flex-col border border-[#0B2D5C]/15 shadow-[0_14px_34px_-16px_rgba(11,45,92,0.12)] min-w-0"
          >
            {/* Symmetrical Top Row */}
            <div className="flex items-center justify-between gap-2.5 flex-wrap">
              <h3 className="font-black text-lg sm:text-2xl text-[#0B2D5C] leading-snug text-right">
                {b.name}
              </h3>
              <span className="shrink-0 text-xs font-black bg-[#FFC145] text-[#071D3B] px-3 py-1 rounded-full">
                {b.city} • مفتوح 24 ساعة
              </span>
            </div>

            <div className="mt-3 space-y-1.5 text-xs sm:text-sm">
              <p className="text-[#071D3B]/80 flex items-start gap-2 font-bold leading-relaxed text-right">
                <PinIcon className="w-4 h-4 shrink-0 text-[#FF6A00] mt-0.5" />
                <span>{b.address}</span>
              </p>
              <p className="text-[#071D3B]/68 flex items-center gap-2 font-semibold text-right">
                <ClockIcon className="w-4 h-4 shrink-0 text-[#FF6A00]" />
                <span>{b.hours}</span>
              </p>
            </div>

            {/* Collapsible Dropdown for Order Phone Numbers */}
            <div className="mt-4 rounded-2xl bg-[#FFF5E8] border border-[#0B2D5C]/14 overflow-hidden">
              <div className="p-2.5 sm:p-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPhonesOpen((v) => !v)}
                  aria-expanded={phonesOpen}
                  className="flex-1 flex items-center justify-between gap-1.5 text-xs sm:text-sm font-black text-[#0B2D5C] hover:text-[#FF6A00] transition cursor-pointer text-right min-w-0"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <PhoneIcon className="w-3.5 h-3.5 text-[#FF6A00] shrink-0" />
                    <span className="whitespace-nowrap">أرقام الطلبات السريعة ({allPhones.length})</span>
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#FF6A00] shrink-0 transition-transform duration-200 ${
                      phonesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <a
                  href={`tel:${primaryPhone}`}
                  dir="ltr"
                  className="shrink-0 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-3 py-1.5 text-xs font-en font-black inline-flex items-center gap-1 transition"
                >
                  <PhoneIcon className="w-3 h-3 shrink-0" />
                  <span>{primaryPhone}</span>
                </a>
              </div>

              {phonesOpen && (
                <div
                  className="px-3 pb-3 pt-2 border-t border-[#0B2D5C]/12 grid grid-cols-2 gap-2"
                  dir="ltr"
                >
                  {allPhones.map((ph, idx) => (
                    <a
                      key={ph}
                      href={`tel:${ph}`}
                      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-en font-extrabold border transition ${
                        idx === 0
                          ? "bg-[#0B2D5C] text-white border-[#0B2D5C]"
                          : "bg-white hover:bg-[#FFC145] text-[#0B2D5C] border-[#0B2D5C]/20"
                      }`}
                    >
                      <PhoneIcon className="w-3 h-3 shrink-0" />
                      <span>{ph}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Horizontal Swipeable Services Carousel Strip */}
            <div className="mt-3.5 flex overflow-x-auto no-scrollbar items-center gap-2 pb-0.5">
              {b.services.map((s) => (
                <span
                  key={s}
                  className="shrink-0 whitespace-nowrap text-[11px] font-extrabold bg-[#FFF5E8] px-3 py-1.5 rounded-full text-[#071D3B]/85 border border-[#0B2D5C]/12"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Symmetrical Strict-Theme Action Area */}
            <div className="mt-auto pt-4 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-2">
              <OrderFromBranchButton
                branchId={b.id}
                className="btn btn-primary text-xs sm:text-sm py-2.5 px-5 w-full sm:w-auto sm:flex-1 whitespace-nowrap"
              />
              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-[#FFC145] hover:text-white px-4 py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                  title="طلب عبر واتساب"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>واتساب</span>
                </a>
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#FFC145] hover:bg-[#FF6A00] text-[#071D3B] hover:text-white px-4 py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                  title="الموقع على خرائط جوجل"
                >
                  <PinIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>الخريطة</span>
                  <ExternalLinkIcon className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        );
      })}

      {/* 24/7 East Cairo Delivery Zones Card */}
      <div className="lg:col-span-5 rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-lg min-w-0">
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#FF6A00]/25 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="rounded-full bg-[#FF6A00] text-white px-3 py-0.5 text-[11px] font-black inline-flex items-center gap-1">
              <Truck24Icon className="w-3.5 h-3.5" />
              <span>تغطية دليفري 24 ساعة</span>
            </span>
            <span className="text-xs font-bold text-[#FFC145]">
              7 مدن ومناطق رئيسية
            </span>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white text-right leading-snug">
            من مطبخ جيمي كوك لحد باب بيتك في أي ساعة
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF5E8]/85 mt-1.5 leading-relaxed text-right">
            البيتزا الإيطالية، الفطير الشرقي المورق، الباستا والطواجن بتوصلك سخنة مع خيار التسليم اللاتلامسي لكل مناطق شرق القاهرة.
          </p>

          {/* Horizontal Swipeable Carousel Preview */}
          {!zonesOpen && (
            <div className="mt-3.5 flex overflow-x-auto no-scrollbar items-center gap-2 pb-1">
              {DELIVERY_ZONES.map((zone) => (
                <span
                  key={zone}
                  className="shrink-0 whitespace-nowrap rounded-full bg-black/25 border border-white/18 px-3.5 py-1.5 text-xs font-extrabold text-[#FFF5E8]"
                >
                  {zone}
                </span>
              ))}
            </div>
          )}

          {/* Collapsible Dropdown for Full Delivery Zones List */}
          <div className="mt-3 rounded-2xl bg-black/22 border border-white/18 overflow-hidden">
            <button
              type="button"
              onClick={() => setZonesOpen((v) => !v)}
              aria-expanded={zonesOpen}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-black text-[#FFC145] hover:text-white transition cursor-pointer"
            >
              <span>
                {zonesOpen ? "إخفاء قائمة مدن التوصيل" : "عرض كل مدن ومناطق التوصيل"}
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                  zonesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {zonesOpen && (
              <div className="px-3 pb-3 pt-1.5 border-t border-white/12 grid grid-cols-1 gap-1.5">
                {DELIVERY_ZONES.map((zone) => (
                  <div
                    key={zone}
                    className="rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white flex items-center gap-2"
                  >
                    <PinIcon className="w-3.5 h-3.5 text-[#FFC145] shrink-0" />
                    <span>{zone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clean Symmetrical Bottom Strip */}
        <div className="relative z-10 mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between gap-3">
          <Link
            href="/delivery"
            className="text-xs font-extrabold text-[#FFC145] hover:text-white underline underline-offset-4 transition"
          >
            سياسة ورسوم التوصيل
          </Link>
          <a
            href="https://wa.me/201060449933"
            target="_blank"
            rel="noreferrer"
            dir="ltr"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] hover:bg-white text-[#071D3B] px-4 py-1.5 text-xs font-en font-black transition shrink-0"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>01060449933</span>
          </a>
        </div>
      </div>
    </div>
  );
}
