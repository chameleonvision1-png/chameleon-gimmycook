import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import MenuClient from "@/components/MenuClient";
import OpenQrButton from "@/components/OpenQrButton";
import { GiftPointsIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "منيو مطعم جيمي كوك — GIMMY COOK | بيتزا وفطير ومكرونة وطواجن",
  description:
    "تصفح المنيو الكامل لمطعم جيمي كوك (GIMMY COOK) بالأسعار والأحجام: البيتزا الإيطالية، الفطير الشرقي والحلو، المكرونة والوايت صوص، الطواجن الفرن، الوجبات، والمشاوي مع دليفري 24 ساعة.",
  openGraph: {
    images: ["/og-menu.jpg?v=1"],
  },
};

export default async function MenuPage(props: PageProps<"/menu">) {
  const { cat } = await props.searchParams;
  const data = await publicDB();

  return (
    <div className="w-full overflow-x-clip">
      {/* Top Navy Card — Circular Emblem Logo ONLY (Horizontal wordmark is already in /menu Header left) */}
      <section className="px-2.5 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <div className="mx-auto max-w-7xl rounded-[30px] sm:rounded-[38px] bg-gradient-to-b from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white px-5 py-6 sm:p-8 lg:px-10 relative overflow-hidden shadow-[0_20px_48px_-18px_rgba(11,45,92,0.5)] border border-[#FFC145]/20">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#FF6A00]/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 text-center lg:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              {/* Circular Emblem Logo ONLY */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-emblem.webp"
                alt="مطعم جيمي كوك GIMMY COOK"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-contain shrink-0 drop-shadow-[0_12px_22px_rgba(0,0,0,0.32)] select-none"
              />

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.35]">
                  منيو مطعم جيمي كوك التفاعلي
                </h1>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#FFF5E8]/88 max-w-xl leading-relaxed">
                  ٨ أقسام تجمع الإيطالي والشرقي — اختار الحجم والإضافات واكسب نقاط مكافآت GIMMY POINTS مع توصيل 24 ساعة.
                </p>
              </div>
            </div>

            {/* Symmetrical Compact 3-Button Action Bar */}
            <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2 w-full sm:w-auto shrink-0">
              <OpenQrButton label="باركود QR" />
              <Link
                href="/points"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white/15 hover:bg-[#FF6A00] text-white border border-white/25 font-black text-xs sm:text-sm px-3.5 py-2.5 sm:px-4 sm:py-3 transition whitespace-nowrap"
              >
                <GiftPointsIcon className="w-4 h-4 shrink-0 text-[#FFC145]" />
                <span>نقاط جيمي</span>
              </Link>
              <a
                href="tel:01020305074"
                dir="ltr"
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-en font-black text-xs sm:text-sm px-3 py-2.5 sm:px-4 sm:py-3 transition whitespace-nowrap shadow-xs"
              >
                <PhoneIcon className="w-3.5 h-3.5 shrink-0" />
                <span>01020305074</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <MenuClient
        categories={data.categories}
        products={data.products}
        initialCat={typeof cat === "string" ? cat : undefined}
      />
    </div>
  );
}
