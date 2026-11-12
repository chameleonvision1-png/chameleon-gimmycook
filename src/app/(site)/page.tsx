import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import GimmyHero from "@/components/GimmyHero";
import FavouritesShowcase from "@/components/FavouritesShowcase";
import ReviewsBannerCarousel from "@/components/ReviewsBannerCarousel";
import OfferCard from "@/components/OfferCard";
import BranchesShowcase from "@/components/BranchesShowcase";
import { GiftPointsIcon, Truck24Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "مطعم جيمي كوك — GIMMY COOK | إيطالي وشرقي بمود مختلف • دليفري 24 ساعة",
  description:
    "الموقع والمنيو الرسمي لمطعم جيمي كوك (GIMMY COOK) في القاهرة الجديدة: بيتزا إيطالية، فطير شرقي مورق، مكرونة، طواجن فرن، وجبات ومشاوي مع دليفري 24 ساعة وبرنامج نقاط GIMMY POINTS.",
  openGraph: {
    images: ["/og-image.jpg?v=1"],
  },
};

export default async function HomePage() {
  const data = await publicDB();
  const activeOffers = data.offers.filter((o) => o.isActive).slice(0, 4);

  return (
    <div className="w-full overflow-x-clip">
      {/* 1. SCULPTED BENTO-CUTOUT HERO (`FORME.` Architecture + GIMMY COOK Identity) */}
      <GimmyHero />

      {/* 2. EDITORIAL MANIFESTO STRIP ON WARM CREAM (`#FFF5E8`) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-11 sm:py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-[#0B2D5C]/10 text-[#0B2D5C] px-4 py-1 text-xs font-black font-en mb-3">
            ITALIAN & ORIENTAL FUSION • 24/7 DELIVERY
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B2D5C] leading-[1.32] tracking-tight">
            إيطالي وشرقي في مطبخ واحد. بمود يفتح النفس.
          </h2>
          <p className="mt-3.5 text-sm sm:text-base font-bold text-[#071D3B]/72 leading-relaxed">
            في <strong className="text-[#FF6A00]">مطعم جيمي كوك (GIMMY COOK)</strong> جمعنالك أحلى ما في المطبخين بدون حيرة: عجينة بيتزا إيطالية مخبوزة طازة وباستا وايت صوص كريمي، جنب الفطير الشرقي المورق بالسمن البلدي وطواجن الفرن والمشويات — مع توصيل شغال 24 ساعة لحد باب بيتك.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-6 py-2.5 text-xs sm:text-sm font-black transition shadow-sm"
            >
              تصفح المنيو الكامل
            </Link>
            <Link
              href="/points"
              className="rounded-full bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/20 px-6 py-2.5 text-xs sm:text-sm font-black transition"
            >
              اكسب نقاط GIMMY POINTS
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SPLIT 2-COLUMN SYMMETRICAL BENTO (`grid-cols-2` on Mobile & Desktop) */}
      <section className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5">
          {/* Right Card (RTL First): Deep Navy Oven Pizza Card */}
          <Link
            href="/menu?cat=pizza"
            className="group relative rounded-[24px] sm:rounded-[34px] overflow-hidden min-h-[195px] sm:min-h-[340px] lg:min-h-[390px] bg-[#071D3B] flex flex-col justify-between p-3.5 sm:p-7 shadow-[0_18px_40px_-18px_rgba(7,29,59,0.45)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/bento-italian-oven.webp"
              alt="فرن البيتزا الإيطالية في جيمي كوك"
              className="absolute inset-0 w-full h-full object-cover object-center transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#071D3B]/80 via-[#071D3B]/25 to-[#071D3B]/75" />

            <div className="relative z-10 text-right">
              <span className="inline-block rounded-full bg-[#FF6A00] text-white px-2.5 py-0.5 text-[10px] font-black mb-1.5">
                المطبخ الإيطالي
              </span>
              <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-[#FFF5E8] drop-shadow-sm">
                فرن البيتزا والباستا
              </h3>
              <p className="hidden sm:block mt-1 text-xs sm:text-sm font-bold text-[#FFF5E8]/85">
                سوبريم، تشيكن رانش، مارجريتا، ومكرونات ألفريدو ونجرسكو غرقانة جبنة
              </p>
            </div>

            <div className="relative z-10 self-start">
              <span className="inline-flex items-center rounded-full bg-[#FFF5E8]/95 group-hover:bg-[#FFC145] text-[#0B2D5C] px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-black transition">
                قسم البيتزا ←
              </span>
            </div>
          </Link>

          {/* Left Card (RTL Second): Warm Orange/Cheese Feteer & Tawagen Card */}
          <div className="rounded-[24px] sm:rounded-[34px] bg-gradient-to-br from-[#FFC145] via-[#FFB328] to-[#FF981A] text-[#071D3B] p-3.5 sm:p-7 flex flex-col items-center justify-between text-center min-h-[195px] sm:min-h-[340px] lg:min-h-[390px] shadow-[0_18px_40px_-18px_rgba(255,106,0,0.35)] overflow-hidden">
            <div>
              <span className="inline-block rounded-full bg-[#0B2D5C] text-[#FFC145] px-2.5 py-0.5 text-[10px] font-black mb-1">
                الأصالة الشرقية
              </span>
              <h3 className="text-lg sm:text-3xl lg:text-4xl font-black text-[#071D3B] leading-[1.32]">
                الفطير الشرقي والطواجن
              </h3>
              <p className="mt-1 text-[10px] sm:text-sm font-extrabold text-[#071D3B]/80">
                فطير فراخ وجبن ومشكل لحوم مورق وطواجن فخار بوش موتزاريلا
              </p>
            </div>

            <Link
              href="/menu?cat=feteer"
              className="my-1.5 sm:my-3 w-full max-w-[360px] flex items-center justify-center group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/products/feteer-chicken-cheese.webp"
                alt="فطير شرقي فراخ وجبن جيمي كوك"
                className="w-full h-22 sm:h-40 lg:h-48 object-cover rounded-2xl border-2 border-white/60 shadow-md transition duration-500 group-hover:scale-104"
              />
            </Link>

            <Link
              href="/menu?cat=feteer"
              className="rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white px-4 sm:px-7 py-1.5 sm:py-2.5 text-[11px] sm:text-sm font-black shadow-md transition whitespace-nowrap"
            >
              استكشف الفطير الشرقي
            </Link>
          </div>
        </div>
      </section>

      {/* 4. GIMMY POINTS + 24/7 DELIVERY BANNER STRIP */}
      <section className="mx-auto max-w-7xl px-2.5 sm:px-6 lg:px-8 pt-3 sm:pt-5">
        <div className="relative rounded-[26px] sm:rounded-[36px] overflow-hidden bg-gradient-to-l from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-5 sm:p-8 lg:p-10 shadow-[0_18px_44px_-20px_rgba(11,45,92,0.55)] border border-[#FFC145]/25">
          <div
            className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FF6A00]/25 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 text-right max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] text-[#071D3B] px-3 py-1 text-xs font-black">
                  <GiftPointsIcon className="w-3.5 h-3.5" />
                  <span>برنامج ولاء GIMMY POINTS</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/12 text-[#FFF5E8] px-3 py-1 text-xs font-extrabold border border-white/15">
                  <Truck24Icon className="w-3.5 h-3.5 text-[#FF6A00]" />
                  <span>دليفري 24 ساعة</span>
                </span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white leading-snug">
                كل 100 جنيه بتطلبها = 5 نقاط مكافآت فورية في رصيدك
              </h3>
              <p className="text-xs sm:text-sm text-[#FFF5E8]/85 font-semibold leading-relaxed">
                جمّع نقاطك مع كل أوردر من جيمي كوك واستبدل كل 5 نقاط بـ 5 جنيه خصم مباشر على طلباتك الجاية — متاح للتوصيل طوال 24 ساعة في القاهرة الجديدة ومدينتي والشروق وبدر والعاصمة.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/points"
                className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-5 py-3 text-xs sm:text-sm font-black transition shadow-md whitespace-nowrap"
              >
                احسب نقاطك الآن
              </Link>
              <Link
                href="/delivery"
                className="rounded-full bg-white/12 hover:bg-white text-white hover:text-[#0B2D5C] border border-white/25 px-5 py-3 text-xs sm:text-sm font-black transition whitespace-nowrap"
              >
                مناطق التوصيل 24 ساعة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS CAROUSEL (`نجوم منيو جيمي كوك`) */}
      <FavouritesShowcase products={data.products} />

      {/* 6. CUSTOMER TESTIMONIALS (`آراء عشاق جيمي كوك`) */}
      <ReviewsBannerCarousel reviews={data.reviews} />

      {/* 7. FAMILY & FUSION OFFERS PREVIEW */}
      {activeOffers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div className="text-right">
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B2D5C]">
                عروض وبوكسات جيمي كوك
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#071D3B]/65 mt-1">
                كومبوهات تجمع الإيطالي والشرقي بسعر توفير ونقاط إضافية
              </p>
            </div>
            <Link
              href="/offers"
              className="self-start sm:self-auto rounded-full bg-white hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/20 px-5 py-2 text-xs font-black transition"
            >
              كل العروض ←
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0">
            {activeOffers.map((o) => (
              <div
                key={o.id}
                className="w-[80vw] max-w-[305px] sm:w-[295px] lg:w-auto shrink-0 snap-start"
              >
                <OfferCard offer={o} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. NEW CAIRO KITCHEN & 24/7 DELIVERY COVERAGE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0B2D5C]">
            مطبخ جيمي كوك ونطاق التوصيل 24 ساعة
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#071D3B]/65">
            القاهرة الجديدة • مدينتي • الشروق • مدينة بدر • العاصمة الإدارية • وصال والبروج
          </p>
        </div>
        <BranchesShowcase branches={data.branches} />
      </section>
    </div>
  );
}
