"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicData } from "@/lib/db";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  QrCodeIcon,
  TagIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./icons";

const ALL_ORDER_PHONES = ["01020305074", "01060449933"];

const MENU_LINKS = [
  { href: "/menu", label: "المنيو الكامل" },
  { href: "/menu?cat=pizza", label: "البيتزا الإيطالية" },
  { href: "/menu?cat=feteer", label: "الفطير الشرقي" },
  { href: "/menu?cat=pasta", label: "المكرونة والوايت صوص" },
  { href: "/menu?cat=tawagen", label: "الطواجن الفرن" },
  { href: "/menu?cat=grills", label: "المشاوي والوجبات" },
];

const DISCOVER_LINKS = [
  { href: "/", label: "الصفحة الرئيسية" },
  { href: "/offers", label: "العروض الخاصة" },
  { href: "/about", label: "قصة جيمي كوك" },
  { href: "/delivery", label: "مناطق التوصيل 24 ساعة" },
  { href: "/occasions", label: "العزومات والشركات" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Footer({ data }: { data: PublicData }) {
  const { settings, branches } = data;
  const mainBranch = branches[0];
  const phones = settings.orderPhones?.length ? settings.orderPhones : ALL_ORDER_PHONES;

  const [mobileOpen, setMobileOpen] = useState<"menu" | "discover" | "phones" | null>(null);
  const [desktopPhonesOpen, setDesktopPhonesOpen] = useState(false);

  const openQrModal = () => {
    window.dispatchEvent(new CustomEvent("open-menu-qr"));
  };

  const toggleMobile = (key: "menu" | "discover" | "phones") => {
    setMobileOpen((prev) => (prev === key ? null : key));
  };

  const socialItems = [
    {
      label: "فيسبوك",
      href: settings.facebook || "https://www.facebook.com/GIMMYCOOK",
      icon: FacebookIcon,
    },
    {
      label: "إنستجرام",
      href: settings.instagram || "https://www.instagram.com/gimmy_cook/",
      icon: InstagramIcon,
    },
    {
      label: "تيك توك",
      href: settings.tiktok || "https://www.tiktok.com/@gimmy.cook",
      icon: TikTokIcon,
    },
    {
      label: "البريد الإلكتروني",
      href: `mailto:${settings.email || "gimmycook@gmail.com"}`,
      icon: MailIcon,
    },
  ];

  return (
    <footer className="relative mt-12 px-2.5 sm:px-6 lg:px-8 pb-6 select-none overflow-x-clip">
      <div className="mx-auto max-w-7xl">
        {/* =========================================================================
            SYMMETRICAL FRAMED FOOTER:
            Outer Deep Navy (`#0B2D5C` -> `#071D3B`) Frame -> Inner Warm Cream (`#FFF5E8`) Card ->
            Compact Dropdowns + Social Icons -> Unclipped Full Brand Wordmark
           ========================================================================= */}
        <div className="rounded-[30px] sm:rounded-[42px] bg-gradient-to-b from-[#0B2D5C] to-[#071D3B] p-3 sm:p-5 shadow-[0_24px_60px_-20px_rgba(7,29,59,0.6)]">
          <div className="rounded-[24px] sm:rounded-[34px] bg-[#FFF5E8] text-[#071D3B] overflow-hidden border border-[#FFC145]/35">
            {/* 1. Symmetrical Top Brand & Quick Actions Strip */}
            <div className="px-4 sm:px-8 pt-6 pb-5 border-b border-[#0B2D5C]/12 flex flex-col lg:flex-row items-center justify-between gap-4">
              <Link href="/" className="shrink-0" dir="ltr">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-horizontal.webp"
                  alt="مطعم جيمي كوك | GIMMY COOK"
                  className="h-10 sm:h-12 w-auto object-contain mx-auto"
                />
              </Link>

              {/* 3 Equal-Width Symmetrical Action Pills */}
              <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:items-center sm:justify-center">
                <a
                  href={`https://wa.me/${mainBranch?.whatsapp || "201060449933"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-3 sm:px-4 py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition shadow-2xs whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>واتساب</span>
                </a>

                <button
                  type="button"
                  onClick={openQrModal}
                  className="rounded-full bg-[#0B2D5C] hover:bg-[#143A73] text-white px-3 sm:px-4 py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                >
                  <QrCodeIcon className="w-3.5 h-3.5 text-[#FFC145] shrink-0" />
                  <span>باركود QR</span>
                </button>

                <Link
                  href="/offers"
                  className="rounded-full bg-[#FFC145] hover:bg-[#FF6A00] text-[#0B2D5C] hover:text-white px-3 sm:px-4 py-2.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                >
                  <TagIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>العروض</span>
                </Link>
              </div>
            </div>

            {/* 2A. MOBILE & TABLET COMPACT DROPDOWNS (`lg:hidden`) */}
            <div className="lg:hidden px-4 py-5 space-y-2.5">
              {/* Dropdown 1: أقسام المنيو */}
              <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("menu")}
                  aria-expanded={mobileOpen === "menu"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                >
                  <span>أقسام المنيو</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#FF6A00] transition-transform duration-200 ${
                      mobileOpen === "menu" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === "menu" && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#0B2D5C]/10 grid grid-cols-2 gap-1.5">
                    {MENU_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl bg-[#FFF5E8] hover:bg-[#FF6A00] text-[#071D3B] hover:text-white border border-[#0B2D5C]/12 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: صفحات الموقع */}
              <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("discover")}
                  aria-expanded={mobileOpen === "discover"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                >
                  <span>اكتشف جيمي كوك</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#FF6A00] transition-transform duration-200 ${
                      mobileOpen === "discover" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === "discover" && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#0B2D5C]/10 grid grid-cols-2 gap-1.5">
                    {DISCOVER_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#071D3B] hover:text-white border border-[#0B2D5C]/12 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 3: العنوان وأرقام الطلبات 24 ساعة */}
              <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleMobile("phones")}
                  aria-expanded={mobileOpen === "phones"}
                  className="w-full px-4 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                >
                  <span>العنوان وأرقام الطلبات 24 ساعة</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-[#FF6A00] transition-transform duration-200 ${
                      mobileOpen === "phones" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileOpen === "phones" && (
                  <div className="px-3.5 pb-3.5 pt-2 border-t border-[#0B2D5C]/10 space-y-2.5">
                    <p className="text-xs font-bold text-[#071D3B]/80 leading-relaxed flex items-start gap-1.5">
                      <PinIcon className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                      <span>
                        القاهرة الجديدة — توصيل 24 ساعة (التجمع، مدينتي، الشروق، بدر، العاصمة الإدارية، وصال، والبروج)
                      </span>
                    </p>
                    <div className="grid grid-cols-2 gap-1.5" dir="ltr">
                      {phones.map((ph, idx) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className={`rounded-xl py-2 px-2.5 text-xs font-en font-black inline-flex items-center justify-center gap-1.5 transition ${
                            idx === 0
                              ? "bg-[#FF6A00] text-white"
                              : "bg-[#FFF5E8] text-[#0B2D5C] border border-[#0B2D5C]/15"
                          }`}
                        >
                          <PhoneIcon className="w-3 h-3 shrink-0" />
                          <span>{ph}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Symmetrical 4-Icon Social Bar */}
              <div className="pt-1 flex items-center justify-center gap-2.5">
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={item.label}
                      title={item.label}
                      className="w-10 h-10 rounded-full bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/18 grid place-items-center transition shadow-2xs"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* 2B. DESKTOP 12-COL EDITORIAL GRID (`hidden lg:grid`) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 px-8 py-8">
              <div className="col-span-4 space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0B2D5C] text-[#FFC145] px-3.5 py-1 text-xs font-extrabold">
                  <span>إيطالي وشرقي بمود مختلف • دليفري 24 ساعة</span>
                </div>
                <p className="text-sm font-bold text-[#071D3B]/78 leading-relaxed">
                  في <strong className="text-[#0B2D5C]">مطعم جيمي كوك (GIMMY COOK)</strong> بنجمع بين البيتزا والمكرونة الإيطالية والفطير الشرقي والطواجن والمشويات، بتحضير طازج وتوصيل ساخن مستمر 24 ساعة.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <Link
                    href="/delivery"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/18 px-4 py-2 text-xs font-black transition"
                  >
                    <PinIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
                    <span>مناطق التوصيل</span>
                    <ExternalLinkIcon className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="col-span-2">
                <h3 className="text-sm font-black text-[#0B2D5C] mb-3">أقسام المنيو</h3>
                <ul className="space-y-2 text-xs font-extrabold text-[#071D3B]/80">
                  {MENU_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-[#FF6A00] transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2">
                <h3 className="text-sm font-black text-[#0B2D5C] mb-3">روابط سريعة</h3>
                <ul className="space-y-2 text-xs font-extrabold text-[#071D3B]/80">
                  {DISCOVER_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="hover:text-[#FF6A00] transition">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-4 flex flex-col justify-between">
                <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-[#0B2D5C]">
                      الخط الساخن والواتساب (24 ساعة)
                    </span>
                    <button
                      type="button"
                      onClick={() => setDesktopPhonesOpen((v) => !v)}
                      className="text-[11px] font-extrabold text-[#FF6A00] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>كل الأرقام ({phones.length})</span>
                      <ChevronDownIcon
                        className={`w-3.5 h-3.5 transition-transform ${
                          desktopPhonesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2" dir="ltr">
                    <a
                      href={`tel:${phones[0]}`}
                      className="rounded-xl bg-[#FF6A00] hover:bg-[#CE2F08] text-white py-2 px-3 text-xs font-en font-black inline-flex items-center justify-center gap-1.5 transition"
                    >
                      <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>{phones[0]}</span>
                    </a>
                    <a
                      href={`tel:${phones[1] || "01060449933"}`}
                      className="rounded-xl bg-[#0B2D5C] hover:bg-[#143A73] text-white py-2 px-3 text-xs font-en font-black inline-flex items-center justify-center gap-1.5 transition"
                    >
                      <PhoneIcon className="w-3.5 h-3.5 text-[#FFC145] shrink-0" />
                      <span>{phones[1] || "01060449933"}</span>
                    </a>
                  </div>

                  {desktopPhonesOpen && phones.length > 2 && (
                    <div className="mt-2 pt-2 border-t border-[#0B2D5C]/10 grid grid-cols-2 gap-1.5" dir="ltr">
                      {phones.slice(2).map((ph) => (
                        <a
                          key={ph}
                          href={`tel:${ph}`}
                          className="rounded-lg bg-[#FFF5E8] text-[#0B2D5C] py-1.5 px-2 text-xs font-en font-bold text-center"
                        >
                          {ph}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Symmetrical 4-Icon Social Bar */}
                <div className="mt-4 flex items-center justify-center gap-2.5">
                  {socialItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        aria-label={item.label}
                        title={item.label}
                        className="w-10 h-10 rounded-full bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/18 grid place-items-center transition shadow-2xs"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. CENTERED, 100% UNCLIPPED FULL BRAND WORDMARK */}
            <div className="w-full px-4 sm:px-8 pt-4 pb-5 sm:pb-7 border-t border-[#0B2D5C]/10 flex flex-col items-center justify-center text-center">
              <span
                dir="ltr"
                className="font-en inline-block rounded-full bg-[#FFC145] text-[#0B2D5C] px-4 py-0.5 text-[11px] sm:text-xs font-black tracking-wider mb-1.5"
              >
                GOOD FOOD • GOOD MOOD
              </span>
              <div className="w-full font-display text-[8.6vw] sm:text-[7.5vw] lg:text-[84px] font-black leading-[1.32] tracking-normal text-[#0B2D5C] text-center whitespace-nowrap">
                مطعم <span className="text-[#FF6A00]">جيمي كوك</span>
              </div>
            </div>
          </div>

          {/* 4. Symmetrical Outer Bottom Bar (Safe Clearance from Floating Corner Buttons on Mobile) */}
          <div className="px-14 sm:px-6 pt-4 pb-1 flex flex-col lg:flex-row items-center justify-between gap-2.5 text-xs text-white/85 text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
              <span className="font-bold text-white">
                © {new Date().getFullYear()} مطعم جيمي كوك | GIMMY COOK • القاهرة الجديدة
              </span>
              <span className="opacity-45 hidden sm:inline">•</span>
              <Link
                href="/admin"
                className="font-extrabold text-[#FFC145] hover:underline transition-colors"
              >
                لوحة الإدارة
              </Link>
            </div>

            <a
              href="https://chameleon.vision/"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="group inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-black/25 hover:bg-black/45 text-white border border-white/20 hover:border-[#FFC145]/60 transition-all duration-200 whitespace-nowrap"
            >
              <span className="text-[11px] font-semibold tracking-wide text-white/85 group-hover:text-white">
                Powered by
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chameleon-logo.webp"
                alt="Chameleon"
                className="h-4 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-xs font-black tracking-wider text-[#FFC145]">
                Chameleon
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
