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
  CloseIcon,
  DownloadAppIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  QrCodeIcon,
  ShareIosIcon,
  TikTokIcon,
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
  { href: "/delivery", label: "التوصيل 24 ساعة" },
  { href: "/occasions", label: "العزومات" },
  { href: "/contact", label: "تواصل معنا" },
];

const DRAWER_NAV = [
  { href: "/", label: "الصفحة الرئيسية", sub: "الإيطالي والشرقي بمود مختلف" },
  { href: "/menu", label: "المنيو التفاعلي", sub: "٨ أقسام • أحجام وإضافات مخصصة" },
  { href: "/offers", label: "العروض والبوكسات", sub: "بوكسات التوفير ولمّة العيلة" },
  { href: "/delivery", label: "التوصيل 24 ساعة", sub: "القاهرة الجديدة، مدينتي، الشروق وبدر" },
  { href: "/occasions", label: "العزومات والشركات", sub: "طلبات التجمعات وتوريد الشركات" },
  { href: "/about", label: "قصة جيمي كوك", sub: "فلسفة المطبخ والجودة" },
  { href: "/contact", label: "تواصل معنا", sub: "أرقام الطلبات والموقع" },
];

const QUICK_CATEGORIES = [
  { href: "/menu?cat=pizza", label: "البيتزا الإيطالية" },
  { href: "/menu?cat=feteer", label: "الفطير الشرقي" },
  { href: "/menu?cat=pasta", label: "المكرونة والباستا" },
  { href: "/menu?cat=tawagen", label: "الطواجن الفرن" },
  { href: "/menu?cat=meals", label: "الوجبات والبرجر" },
  { href: "/menu?cat=grills", label: "المشاوي عالفحم" },
  { href: "/menu?cat=sides", label: "المقبلات والبطاطس" },
  { href: "/menu?cat=drinks", label: "المشروبات" },
];

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
  const { count, subtotal, bump, hydrated } = useStore();
  const pathname = usePathname();
  const isMenuPage = pathname?.startsWith("/menu") ?? false;

  const [drawerOpenPath, setDrawerOpenPath] = useState<string | null>(null);
  const drawerOpen = drawerOpenPath !== null && drawerOpenPath === pathname;
  const openDrawer = () => setDrawerOpenPath(pathname || "/");
  const closeDrawer = () => setDrawerOpenPath(null);

  const [qrOpen, setQrOpen] = useState(false);

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

  return (
    <>
      {/* =========================================================================
          TOP STICKY BAR (`dir="ltr"`):
          - Far Left (شمال): Standalone `G` Icon ONLY on all pages; Horizontal Logo ONLY on `/menu`
          - Center (Desktop): Sculpted Deep-Navy Capsule Nav
          - Far Right (يمين): Cart Pill + Menu Burger Button (≡) ALWAYS Far Right
         ========================================================================= */}
      <header className="sticky top-0 z-50 bg-[#FFF5E8]/95 backdrop-blur-md border-b border-[#0B2D5C]/10">
        <div
          dir="ltr"
          className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 h-[64px] sm:h-[74px] flex items-center justify-between gap-3"
        >
          {/* LEFT (شمال): Logo ONLY */}
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

          {/* CENTER (Desktop Only): Architectural Deep-Navy Capsule Nav */}
          <nav
            dir="rtl"
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center justify-center gap-1 bg-[#071D3B] text-[#FFF5E8] rounded-full p-1.5 border border-[#0B2D5C]/25 shadow-[0_12px_28px_-12px_rgba(7,29,59,0.45)]"
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
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-250 whitespace-nowrap ${
                    active
                      ? "bg-[#FF6A00] text-white shadow-[0_6px_14px_-4px_rgba(255,106,0,0.65)]"
                      : "text-[#FFF5E8]/80 hover:text-white hover:bg-white/[0.08]"
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
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white hover:bg-[#071D3B] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/15 px-4 py-2 text-xs font-extrabold transition-all duration-200 shadow-2xs group"
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
                <span className="tabular-nums text-[#FF6A00] group-hover:text-[#FFC145] font-black">
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
              className="w-11 h-11 rounded-full bg-[#FF6A00] hover:bg-[#071D3B] text-white grid place-items-center shadow-[0_8px_20px_-6px_rgba(255,106,0,0.55)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          ARCHITECTURAL RIGHT-SIDE SLIDE-OVER DRAWER (`الشريط الجانبي`)
          - Outer wrapper uses `dir="ltr"` + `right-0` so it ALWAYS slides from RIGHT (`يمين`)!
          - Kept mounted when `hydrated` so open/close glides smoothly at 60fps.
         ========================================================================= */}
      {hydrated &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            dir="ltr"
            aria-hidden={!drawerOpen}
            className={`fixed inset-0 z-[90] overscroll-none transition-visibility ${
              drawerOpen ? "pointer-events-auto visible" : "pointer-events-none invisible delay-300"
            }`}
          >
            {/* Frosted Dark Backdrop */}
            <div
              onClick={closeDrawer}
              className={`absolute inset-0 bg-[#041024]/65 backdrop-blur-sm transition-opacity duration-300 ease-out touch-none ${
                drawerOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Right-Anchored EditorialMidnight-Navy Panel (`right-0`) */}
            <aside
              dir="rtl"
              role="dialog"
              aria-modal="true"
              aria-label="القائمة الجانبية — مطعم جيمي كوك GIMMY COOK"
              className={`fixed top-0 right-0 bottom-0 z-10 w-[88vw] max-w-[400px] bg-[#071D3B] text-[#FFF5E8] shadow-[-24px_0_64px_rgba(3,12,26,0.65)] border-l border-white/10 flex flex-col overflow-hidden transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                drawerOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Subtle Ambient Brand Glow */}
              <div
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FF6A00]/18 blur-3xl"
                aria-hidden="true"
              />

              {/* 1. Top Bar (`dir="ltr"`): Logo on Left, Close (`✕`) on Far Right matching Header `≡` */}
              <div
                dir="ltr"
                className="relative z-10 shrink-0 h-[64px] sm:h-[74px] px-4 sm:px-5 flex items-center justify-between border-b border-white/10"
              >
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-2.5 min-w-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo-horizontal-light.webp"
                    alt="GIMMY COOK"
                    className="h-7 sm:h-8 w-auto object-contain select-none"
                  />
                </Link>

                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="إغلاق القائمة"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white grid place-items-center transition-colors duration-200 cursor-pointer shrink-0"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>

              {/* 2. Scrollable Editorial Navigation Body */}
              <div
                data-modal-scroll
                className="relative z-10 flex-1 overflow-y-auto overscroll-contain touch-pan-y px-4 sm:px-5 py-4 space-y-5"
              >
                {/* Primary CTA + Live Cart Strip */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/menu"
                    onClick={closeDrawer}
                    className="rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#071D3B] py-2.5 px-3.5 text-xs font-black text-center transition shadow-[0_10px_24px_-8px_rgba(255,106,0,0.55)] whitespace-nowrap"
                  >
                    اطلب من المنيو
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="rounded-full bg-white/[0.07] hover:bg-white text-[#FFF5E8] hover:text-[#071D3B] border border-white/12 py-2.5 px-3.5 text-xs font-black inline-flex items-center justify-center gap-1.5 transition whitespace-nowrap"
                  >
                    <CartIcon className="w-3.5 h-3.5 text-[#FFC145]" />
                    <span>
                      {count > 0 ? `السلة (${count})` : "سلة الطلبات"}
                    </span>
                  </Link>
                </div>

                {/* Main Editorial Navigation Links */}
                <nav aria-label="روابط الموقع" className="space-y-1">
                  {DRAWER_NAV.map((item, i) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeDrawer}
                        className={`group flex items-center justify-between gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-200 ${
                          active
                            ? "bg-[#FF6A00] text-white shadow-[0_10px_24px_-10px_rgba(255,106,0,0.6)]"
                            : "hover:bg-white/[0.06] text-[#FFF5E8]"
                        }`}
                      >
                        <div className="min-w-0 text-right">
                          <div className="text-sm font-black leading-snug truncate">
                            {item.label}
                          </div>
                          <div
                            className={`text-[11px] font-medium truncate mt-0.5 ${
                              active ? "text-white/85" : "text-[#FFF5E8]/50 group-hover:text-[#FFF5E8]/75"
                            }`}
                          >
                            {item.sub}
                          </div>
                        </div>

                        <span
                          dir="ltr"
                          className={`font-en text-[11px] font-bold tracking-wider shrink-0 ${
                            active ? "text-white/90" : "text-[#FFC145]/60 group-hover:text-[#FFC145]"
                          }`}
                        >
                          0{i + 1}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Quick Menu Chapters Grid */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2.5 px-1">
                    <span className="text-[11px] font-extrabold text-[#FFC145] tracking-wide">
                      أقسام المنيو السريعة
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        closeDrawer();
                        setQrOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFF5E8]/70 hover:text-white transition cursor-pointer"
                    >
                      <QrCodeIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
                      <span>باركود QR</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={closeDrawer}
                        className="rounded-xl bg-white/[0.05] hover:bg-[#FF6A00] border border-white/[0.08] hover:border-[#FF6A00] px-3 py-2 text-xs font-bold text-[#FFF5E8]/90 hover:text-white text-right truncate transition-colors duration-200"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Subtle App Install Row (Only when not installed) */}
                {!isStandalone && (
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="w-full rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-3.5 py-2.5 flex items-center justify-between gap-3 transition cursor-pointer text-right"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <DownloadAppIcon className="w-4 h-4 text-[#FFC145] shrink-0" />
                      <span className="text-xs font-bold text-[#FFF5E8]/90 truncate">
                        تثبيت تطبيق جيمي كوك على جهازك
                      </span>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/12 px-2.5 py-0.5 text-[10px] font-extrabold text-[#FFC145]">
                      تثبيت
                    </span>
                  </button>
                )}
              </div>

              {/* 3. Sleek Bottom Concierge & Social Dock */}
              <div className="relative z-10 shrink-0 px-4 sm:px-5 py-3.5 bg-[#05152D] border-t border-white/10 space-y-2.5">
                <div className="grid grid-cols-2 gap-2" dir="ltr">
                  <a
                    href="tel:01020305074"
                    className="rounded-xl bg-white/[0.07] hover:bg-[#FF6A00] text-white border border-white/10 py-2 px-2.5 text-xs font-en font-extrabold inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <PhoneIcon className="w-3.5 h-3.5 text-[#FFC145]" />
                    <span>01020305074</span>
                  </a>
                  <a
                    href="https://wa.me/201060449933"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="rtl"
                    className="rounded-xl bg-[#FF6A00]/18 hover:bg-[#FF6A00] text-[#FFC145] hover:text-white border border-[#FF6A00]/35 py-2 px-2.5 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>واتساب 24س</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <span className="font-en text-[10px] font-bold tracking-widest text-[#FFF5E8]/45">
                    GOOD FOOD • GOOD MOOD
                  </span>
                  <div className="flex items-center gap-1.5">
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
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-[#FF6A00] text-[#FFF5E8]/80 hover:text-white grid place-items-center transition"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </a>
                      );
                    })}
                  </div>
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
              className="absolute inset-0 bg-[#041024]/70 backdrop-blur-sm touch-none"
              onClick={() => setShowInstallGuide(false)}
            />
            <div
              dir="rtl"
              className="relative z-10 w-full sm:max-w-sm rounded-t-[28px] sm:rounded-[28px] bg-[#071D3B] text-[#FFF5E8] border border-white/15 p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-white">
                  تثبيت تطبيق GIMMY COOK
                </h3>
                <button
                  type="button"
                  onClick={() => setShowInstallGuide(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#FF6A00] text-white grid place-items-center cursor-pointer transition"
                  aria-label="إغلاق"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
              {isIosDevice ? (
                <div className="space-y-2.5 text-xs font-bold text-[#FFF5E8]/85 leading-relaxed">
                  <p className="flex items-center gap-2">
                    <ShareIosIcon className="w-4 h-4 text-[#FFC145] shrink-0" />
                    <span>١. اضغط على زر المشاركة (Share) في متصفح Safari بالأسفل.</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-[#FFC145] shrink-0" />
                    <span>٢. اختر «إضافة إلى الشاشة الرئيسية» (Add to Home Screen).</span>
                  </p>
                </div>
              ) : (
                <p className="text-xs font-bold text-[#FFF5E8]/85 leading-relaxed">
                  من قائمة المتصفح العلوية (⋮)، اختر «تثبيت التطبيق» أو «الإضافة إلى الشاشة الرئيسية» لفتح منيو جيمي كوك بسرعة في أي وقت.
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowInstallGuide(false)}
                className="w-full rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#071D3B] py-2.5 text-xs font-black transition cursor-pointer"
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
