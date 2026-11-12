import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OfferCard from "@/components/OfferCard";
import { GiftPointsIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "عروض وبوكسات التوفير | مطعم جيمي كوك GIMMY COOK",
  description:
    "أقوى عروض وبوكسات التوفير من مطعم جيمي كوك (GIMMY COOK): ميكس المود بيتزا وفطير شرقي، ثنائي الفطير الحادق والحلو، سهرة الباستا والطواجن، ووليمة المشويات والبيتزا العائلية.",
  openGraph: {
    images: ["/og-offers.jpg?v=1"],
  },
};

export default async function OffersPage() {
  const data = await publicDB();
  const offers = data.offers.filter((o) => o.isActive);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-[32px] bg-gradient-to-l from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-lg border border-[#FFC145]/25">
        <div className="text-right">
          <span className="inline-block rounded-full bg-[#FFC145] text-[#071D3B] px-3.5 py-1 text-xs font-black mb-2.5">
            عروض التوفير • GIMMY COOK
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            عروض وبوكسات المود من جيمي كوك
          </h1>
          <p className="mt-2 text-xs sm:text-base text-[#FFF5E8]/88 font-semibold max-w-2xl leading-relaxed">
            اختار الكومبو المناسب ليك ولأصحابك وعيلتك من البيتزا الإيطالية، الفطير الشرقي، الباستا والطواجن، والمشويات — متاحة 24 ساعة وتكسبك نقاط GIMMY POINTS.
          </p>
        </div>

        <Link
          href="/menu"
          className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-black text-xs sm:text-sm px-6 py-3 transition shrink-0 shadow-md"
        >
          تصفح المنيو الكامل ←
        </Link>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {offers.map((o) => (
          <OfferCard key={o.id} offer={o} />
        ))}
      </div>

      {/* Loyalty + Catering Dual Callout */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-[28px] bg-[#0B2D5C] text-white p-6 sm:p-7 flex flex-col justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] text-[#071D3B] px-3 py-0.5 text-xs font-black mb-2">
              <GiftPointsIcon className="w-3.5 h-3.5" />
              <span>GIMMY POINTS</span>
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              كل العروض بتكسبك نقاط مكافآت فورية
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-white/80 mt-1 leading-relaxed">
              كل 100 جنيه = 5 نقاط، وكل 5 نقاط = 5 جنيه رصيد مكافآت تقدر تخصمه على طلباتك الجاية.
            </p>
          </div>
          <Link
            href="/points"
            className="self-start rounded-full bg-[#FFC145] hover:bg-white text-[#071D3B] font-black text-xs sm:text-sm px-5 py-2.5 transition"
          >
            اعرف تفاصيل النقاط
          </Link>
        </div>

        <div className="rounded-[28px] bg-white border border-[#0B2D5C]/16 p-6 sm:p-7 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-[#0B2D5C]">
              عندك تجمع عائلي أو طلب شركة بالقاهرة الجديدة؟
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#071D3B]/70 mt-1 leading-relaxed">
              نجهز طلبات البيتزا والفطير والطواجن والمشويات للتجمعات والمكاتب والجامعات في الموعد المحدد بالضبط.
            </p>
          </div>
          <Link href="/occasions" className="btn btn-primary text-xs sm:text-sm self-start">
            احجز طلب عزومة أو شركة
          </Link>
        </div>
      </div>
    </div>
  );
}
