"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "@/lib/useLockBodyScroll";
import { useStore } from "./store";
import { formatPrice } from "@/lib/format";
import {
  CartIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  DownloadAppIcon,
  FacebookIcon,
  GiftPointsIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  QrCodeIcon,
  ShareIosIcon,
  TikTokIcon,
  Truck24Icon,
  UtensilsIcon,
  WhatsAppIcon,
} from "./icons";
import MenuQrModal from "./MenuQrModal";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    __pwaInstallPrompt?: BeforeInstallPromptEvent | null;
  }
}

const TOP_NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/menu", label: "المنيو" },
  { href: "/offers", label: "العروض" },
  { href: "/points", label: "نقاط جيمي" },
  { href: "/delivery", label: "التوصيل 24 ساعة" },
  { href: "/contact", label: "تواصل معنا" },
];

const SITE_PAGES = [
  { href: "/", label: "الصفحة الرئيسية" },
  { href: "/offers", label: "العروض والبوكسات" },
  { href: "/points", label: "نقاط GIMMY POINTS" },
  { href: "/delivery", label: "مناطق التوصيل 24 ساعة" },
  { href: "/occasions", label: "العزومات والشركات" },
  { href: "/branches", label: "الفرع والخريطة" },
  { href: "/about", label: "قصة جيمي كوك" },
  { href: "/contact", label: "تواصل معنا" },
];

const QUICK_CATEGORIES = [
  { href: "/menu?cat=pizza", label: "البيتزا الإيطالية" },
  { href: "/menu?cat=feteer", label: "الفطير الشرقي" },
  { href: "/menu?cat=pasta", label: "المكرونة والوايت صوص" },
  { href: "/menu?cat=tawagen", label: "الطواجن الفرن" },
  { href: "/menu?cat=meals", label: "الوجبات والبرجر" },
  { href: "/menu?cat=grills", label: "المشاوي الشرقية" },
  { href: "/menu?cat=sides", label: "الإضافات والمقبلات" },
  { href: "/menu?cat=drinks", label: "المشروبات الباردة" },
];

const ORDER_PHONES = ["01020305074", "01060449933"];

const SOCIAL_ITEMS = [
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/GIMMYCOOK",
    icon: FacebookIcon,
  },
  {
    label: "إنستجرام",
    href: "https://www.instagram.com/gimmy_cook/",
    icon: InstagramIcon,
  },
  {
    label: "تيك توك",
    href: "https://www.tiktok.com/@gimmy.cook",
    icon: TikTokIcon,
  },
  {
    label: "البريد الرسمي",
    href: "mailto:gimmycook@gmail.com",
    icon: MailIcon,
  },
];

export default function Header() {
  const { count, subtotal, bump, hydrated, openPicker } = useStore();
  const pathname = usePathname();
  const isMenuPage = pathname?.startsWith("/menu") ?? false;

  const [drawerOpenPath, setDrawerOpenPath] = useState<string | null>(null);
  const drawerOpen = drawerOpenPath !== null && drawerOpenPath === pathname;
  const openDrawer = () => setDrawerOpenPath(pathname || "/");
  const closeDrawer = () => setDrawerOpenPath(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [openSection, setOpenSection] = useState<"cats" | "pages" | "phones" | null>("cats");

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installedNow, setInstalledNow] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  const isStandalone =
    installedNow ||
    (hydrated &&
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true));

  const isIosDevice =
    hydrated &&
    typeof window !== "undefined" &&
    (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()) ||
      (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1));

  useEffect(() => {
    const openQrListener = () => setQrOpen(true);
    window.addEventListener("open-menu-qr", openQrListener);
    return () => window.removeEventListener("open-menu-qr", openQrListener);
  }, []);

  useLockBodyScroll(drawerOpen || showInstallGuide);

  useEffect(() => {
    if (!drawerOpen && !showInstallGuide) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpenPath(null);
        setShowInstallGuide(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, showInstallGuide]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      window.__pwaInstallPrompt = evt;
      setDeferredPrompt(evt);
    };

    const handleInstalled = () => {
      window.__pwaInstallPrompt = null;
      setDeferredPrompt(null);
      setInstalledNow(true);
      setShowInstallGuide(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    const promptEvent = deferredPrompt || window.__pwaInstallPrompt;
    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          window.__pwaInstallPrompt = null;
          setDeferredPrompt(null);
        }
        return;
      } catch {
        // Fallback to manual install guide
      }
    }
    closeDrawer();
    setShowInstallGuide(true);
  };

  const toggleSection = (sec: "cats" | "pages" | "phones") => {
    setOpenSection((prev) => (prev === sec ? null : sec));
  };

  return (
    <>
      {/* =========================================================================
          TOP STICKY BAR (`dir="ltr"`):
          - Far Left (شمال): Standalone `G` Icon ONLY on all pages; Horizontal Logo ONLY on `/menu`
          - Center (Desktop): Sculpted Navy Capsule Nav (Inspired by FORME. Top Bar)
          - Far Right (يمين): Cart Pill + Menu Burger Button (≡) ALWAYS Far Right
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FFF5E8]/95 backdrop-blur-md border-b border-[#0B2D5C]/10">
        <div
          dir="ltr"
          className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 h-[64px] sm:h-[74px] flex items-center justify-between gap-3"
        >
          {/* LEFT (شمال): Logo ONLY — Zero Text Next To It */}
          <Link
            href="/"
            aria-label="مطعم جيمي كوك | GIMMY COOK — الصفحة الرئيسية"
            className="flex items-center shrink-0 group focus:outline-none"
          >
            {isMenuPage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/logo-horizontal.webp"
                alt="GIMMY COOK — مطعم جيمي كوك"
                className="h-8 sm:h-9 md:h-10 w-auto max-w-[195px] sm:max-w-[240px] object-contain select-none transition-transform duration-200 group-hover:scale-[1.02]"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/logo-mobile.webp"
                alt="GIMMY COOK — مطعم جيمي كوك"
                className="h-10 sm:h-11 w-auto object-contain select-none transition-transform duration-200 group-hover:scale-105"
              />
            )}
          </Link>

          {/* CENTER (Desktop Only): Sculpted Deep Navy Capsule Nav */}
          <nav
            dir="rtl"
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center justify-center gap-1 bg-[#0B2D5C] text-[#FFF5E8] rounded-full px-2 py-1.5 shadow-[0_10px_24px_-10px_rgba(11,45,92,0.45)]"
          >
            {TOP_NAV.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition whitespace-nowrap ${
                    active
                      ? "bg-[#FF6A00] text-white shadow-xs"
                      : "text-[#FFF5E8]/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT (يمين): Cart Pill + Menu Burger Button ALWAYS on Far Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/cart"
              dir="rtl"
              aria-label="سلة الطلبات"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#FFC145]/25 border border-[#0B2D5C]/18 px-4 py-2 text-xs font-extrabold text-[#0B2D5C] transition shadow-2xs"
            >
              <span className="relative">
                <CartIcon className="w-4 h-4 text-[#FF6A00]" />
                {hydrated && count > 0 && (
                  <span
                    key={bump}
                    className="animate-pop absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#FF6A00] text-white text-[10px] font-black grid place-items-center"
                  >
                    {count}
                  </span>
                )}
              </span>
              {hydrated && count > 0 ? (
                <span className="tabular-nums text-[#FF6A00] font-black">
                  {formatPrice(subtotal)}
                </span>
              ) : (
                <span>السلة</span>
              )}
            </Link>

            <button
              type="button"
              onClick={openDrawer}
              aria-label="فتح القائمة الجانبية"
              aria-expanded={drawerOpen}
              className="w-11 h-11 rounded-full bg-[#FF6A00] hover:bg-[#0B2D5C] text-white grid place-items-center shadow-[0_8px_20px_-6px_rgba(255,106,0,0.55)] transition active:scale-95 cursor-pointer"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          SYMMETRICAL SIDEBAR DRAWER (`الشريط الجانبي`)
          Opens from Right (`يمين`), Crisp Vector Icons, Collapsible Dropdowns
         ========================================================================= */}
      {drawerOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex justify-end overscroll-none"
            role="dialog"
            aria-modal="true"
            aria-label="القائمة الجانبية — مطعم جيمي كوك GIMMY COOK"
          >
            <div
              className="absolute inset-0 bg-[#071D3B]/65 backdrop-blur-xs transition-opacity touch-none"
              onClick={closeDrawer}
            />

            <aside
              dir="rtl"
              className="relative z-10 w-[88vw] max-w-[385px] h-full bg-[#FFF5E8] text-[#071D3B] shadow-2xl border-s-2 border-[#0B2D5C]/15 flex flex-col overflow-hidden"
            >
              {/* 1. Drawer Top Brand Header */}
              <div className="shrink-0 bg-gradient-to-l from-[#0B2D5C] to-[#071D3B] text-white px-4 pt-4 pb-4 border-b border-[#FFC145]/25">
                <div dir="ltr" className="grid grid-cols-[42px_1fr_40px] items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-emblem.webp"
                    alt="GIMMY COOK"
                    className="w-10 h-10 rounded-full object-contain drop-shadow-md select-none"
                  />

                  <div dir="rtl" className="text-center min-w-0">
                    <div className="font-black text-sm sm:text-base text-white truncate">
                      مطعم جيمي كوك
                    </div>
                    <div className="font-en text-[10.5px] font-bold text-[#FFC145] tracking-wider truncate">
                      GOOD FOOD • GOOD MOOD
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="إغلاق القائمة"
                    className="w-10 h-10 rounded-full bg-white/12 hover:bg-[#FF6A00] text-white grid place-items-center transition cursor-pointer"
                  >
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Symmetrical 2-Column Primary Action Row */}
                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <Link
                    href="/menu"
                    onClick={closeDrawer}
                    className="rounded-2xl bg-[#FF6A00] hover:bg-[#CE2F08] text-white py-2.5 px-3 text-xs font-black inline-flex items-center justify-center gap-1.5 transition shadow-xs whitespace-nowrap"
                  >
                    <UtensilsIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>تصفح المنيو</span>
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="rounded-2xl bg-white/12 hover:bg-white text-white hover:text-[#0B2D5C] border border-white/20 py-2.5 px-3 text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                  >
                    <CartIcon className="w-3.5 h-3.5 text-[#FFC145] shrink-0" />
                    <span>
                      {hydrated && count > 0 ? `السلة (${count})` : "سلة الطلبات"}
                    </span>
                  </Link>
                </div>
              </div>

              {/* 2. Scrollable Middle Content (`data-modal-scroll`) */}
              <div
                data-modal-scroll
                className="flex-1 overflow-y-auto overscroll-contain touch-pan-y p-3.5 space-y-2.5"
              >
                {/* Symmetrical 3-Pill Utility Strip */}
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      setQrOpen(true);
                    }}
                    className="rounded-2xl bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/15 py-2.5 px-2 text-[11px] font-black flex flex-col items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <QrCodeIcon className="w-4 h-4 text-[#FF6A00]" />
                    <span>باركود QR</span>
                  </button>

                  <Link
                    href="/points"
                    onClick={closeDrawer}
                    className="rounded-2xl bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/15 py-2.5 px-2 text-[11px] font-black flex flex-col items-center justify-center gap-1 transition"
                  >
                    <GiftPointsIcon className="w-4 h-4 text-[#FF6A00]" />
                    <span>نقاط جيمي</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      openPicker();
                    }}
                    className="rounded-2xl bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/15 py-2.5 px-2 text-[11px] font-black flex flex-col items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <Truck24Icon className="w-4 h-4 text-[#FF6A00]" />
                    <span>دليفري 24س</span>
                  </button>
                </div>

                {/* Collapsible Section 1: أقسام المنيو */}
                <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("cats")}
                    aria-expanded={openSection === "cats"}
                    className="w-full px-3.5 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UtensilsIcon className="w-4 h-4 text-[#FF6A00]" />
                      <span>أقسام منيو جيمي كوك (٨)</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0B2D5C] transition-transform duration-200 ${
                        openSection === "cats" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === "cats" && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#0B2D5C]/10 grid grid-cols-2 gap-1.5">
                      {QUICK_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={closeDrawer}
                          className="rounded-xl bg-[#FFF5E8] hover:bg-[#FF6A00] text-[#071D3B] hover:text-white border border-[#0B2D5C]/10 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsible Section 2: صفحات الموقع */}
                <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("pages")}
                    aria-expanded={openSection === "pages"}
                    className="w-full px-3.5 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <PinIcon className="w-4 h-4 text-[#FF6A00]" />
                      <span>صفحات الموقع والخدمات</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0B2D5C] transition-transform duration-200 ${
                        openSection === "pages" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === "pages" && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#0B2D5C]/10 grid grid-cols-2 gap-1.5">
                      {SITE_PAGES.map((pg) => (
                        <Link
                          key={pg.href}
                          href={pg.href}
                          onClick={closeDrawer}
                          className="rounded-xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#071D3B] hover:text-white border border-[#0B2D5C]/10 px-2.5 py-2 text-xs font-extrabold text-center truncate transition"
                        >
                          {pg.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Collapsible Section 3: أرقام الطلبات والواتساب */}
                <div className="rounded-2xl bg-white border border-[#0B2D5C]/14 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("phones")}
                    aria-expanded={openSection === "phones"}
                    className="w-full px-3.5 py-3 flex items-center justify-between text-xs sm:text-sm font-black text-[#0B2D5C] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-[#FF6A00]" />
                      <span>أرقام الطلبات والواتساب 24 ساعة</span>
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-[#0B2D5C] transition-transform duration-200 ${
                        openSection === "phones" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openSection === "phones" && (
                    <div className="px-3 pb-3 pt-1 border-t border-[#0B2D5C]/10 space-y-2">
                      <div className="grid grid-cols-2 gap-1.5" dir="ltr">
                        {ORDER_PHONES.map((ph, i) => (
                          <a
                            key={ph}
                            href={`tel:${ph}`}
                            className={`rounded-xl py-2.5 px-2.5 text-xs font-en font-black inline-flex items-center justify-center gap-1.5 transition ${
                              i === 0
                                ? "bg-[#FF6A00] text-white"
                                : "bg-[#FFF5E8] text-[#0B2D5C] border border-[#0B2D5C]/15"
                            }`}
                          >
                            <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>{ph}</span>
                          </a>
                        ))}
                      </div>
                      <a
                        href="https://wa.me/201060449933"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full rounded-xl bg-[#0B2D5C] hover:bg-[#143A73] text-[#FFC145] py-2.5 px-3 text-xs font-black inline-flex items-center justify-center gap-2 transition"
                      >
                        <WhatsAppIcon className="w-4 h-4 shrink-0" />
                        <span>اطلب مباشرة عبر واتساب</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* PWA App Install Card */}
                {!isStandalone && (
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="w-full rounded-2xl bg-[#FFC145]/30 hover:bg-[#FFC145]/55 border border-[#0B2D5C]/15 p-3 flex items-center justify-between gap-3 transition cursor-pointer text-right"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-xl bg-[#0B2D5C] text-[#FFC145] grid place-items-center shrink-0">
                        <DownloadAppIcon className="w-4 h-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-black text-[#0B2D5C] truncate">
                          تثبيت تطبيق GIMMY COOK
                        </div>
                        <div className="text-[11px] font-bold text-[#071D3B]/70 truncate">
                          اطلب أسرع بضغطة واحدة من شاشتك
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#FF6A00] text-white px-2.5 py-1 text-[10px] font-black">
                      تثبيت
                    </span>
                  </button>
                )}
              </div>

              {/* 3. Drawer Footer: Symmetrical 4 Social Icons */}
              <div className="shrink-0 p-3.5 bg-white border-t border-[#0B2D5C]/12">
                <div className="grid grid-cols-4 gap-2">
                  {SOCIAL_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        aria-label={item.label}
                        title={item.label}
                        className="h-10 rounded-xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/14 grid place-items-center transition"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>,
          document.body,
        )}

      {/* Manual PWA Install Guide Modal (iOS / Desktop Fallback) */}
      {showInstallGuide &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center sm:p-4 overscroll-none"
            role="dialog"
            aria-modal="true"
            aria-label="تثبيت تطبيق جيمي كوك"
          >
            <div
              className="absolute inset-0 bg-[#071D3B]/65 backdrop-blur-xs touch-none"
              onClick={() => setShowInstallGuide(false)}
            />
            <div
              dir="rtl"
              className="relative z-10 w-full sm:max-w-sm rounded-t-[28px] sm:rounded-[28px] bg-[#FFF5E8] border-2 border-[#0B2D5C]/20 p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-[#0B2D5C]">
                  تثبيت تطبيق GIMMY COOK
                </h3>
                <button
                  type="button"
                  onClick={() => setShowInstallGuide(false)}
                  className="w-8 h-8 rounded-full bg-white border border-[#0B2D5C]/15 grid place-items-center cursor-pointer"
                  aria-label="إغلاق"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
              {isIosDevice ? (
                <div className="space-y-2.5 text-xs font-bold text-[#071D3B]/85 leading-relaxed">
                  <p className="flex items-center gap-2">
                    <ShareIosIcon className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>١. اضغط على زر المشاركة (Share) في متصفح Safari بالأسفل.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-[#FF6A00] shrink-0" />
                    <span>٢. اختر «إضافة إلى الشاشة الرئيسية» (Add to Home Screen).</span>
                  </p>
                </div>
              ) : (
                <p className="text-xs font-bold text-[#071D3B]/85 leading-relaxed">
                  من قائمة المتصفح العلوية (⋮)، اختر «تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية» لفتح منيو جيمي كوك بسرعة في أي وقت.
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="btn btn-primary w-full py-2.5 text-xs"
              >
                حسناً، فهمت
              </button>
            </div>
          </div>,
          document.body,
        )}

      <MenuQrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}
