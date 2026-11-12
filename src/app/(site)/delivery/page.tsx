import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import { CheckIcon, ClockIcon, PhoneIcon, PinIcon, Truck24Icon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "مناطق التوصيل 24 ساعة | مطعم جيمي كوك GIMMY COOK",
  description:
    "تعرّف على نطاق ومناطق التوصيل على مدار 24 ساعة من مطعم جيمي كوك (GIMMY COOK): القاهرة الجديدة، مدينتي، الشروق، مدينة بدر، العاصمة الإدارية، مدينة وصال، وكمبوند البروج.",
  alternates: {
    canonical: "/delivery",
  },
};

const ZONES_DETAIL = [
  {
    name: "القاهرة الجديدة والتجمع",
    areas: "التجمع الخامس، التجمع الأول، التجمع الثالث، الرحاب، النرجس، الياسمين، البنفسج، واللوتس",
    eta: "30 – 45 دقيقة",
    badge: "تغطية فورية 24 ساعة",
  },
  {
    name: "مدينتي",
    areas: "جميع مراحل العمارات (B) والفيلات (V) والمناطق الخدمية في مدينتي",
    eta: "35 – 50 دقيقة",
    badge: "دليفري 24 ساعة",
  },
  {
    name: "مدينة الشروق",
    areas: "جميع الأحياء والمناطق والكمبوندات السكنية والجامعات بمدينة الشروق",
    eta: "35 – 50 دقيقة",
    badge: "دليفري 24 ساعة",
  },
  {
    name: "مدينة بدر",
    areas: "الأحياء السكنية، الحي المتميز، دار مصر، سكن مصر، وزهرة العاصمة",
    eta: "40 – 55 دقيقة",
    badge: "دليفري 24 ساعة",
  },
  {
    name: "العاصمة الإدارية الجديدة",
    areas: "الأحياء السكنية R3 و R5 و R7، حي المال والأعمال، والحي الحكومي",
    eta: "45 – 60 دقيقة",
    badge: "توريد وتوصيل",
  },
  {
    name: "مدينة وصال وكمبوند البروج",
    areas: "مدينة وصال السكنية وكمبوند البروج على طريق الإسماعيلية الصحراوي",
    eta: "40 – 55 دقيقة",
    badge: "دليفري مستمر",
  },
];

export default async function DeliveryPage() {
  const { branches } = await publicDB();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Hero Banner */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 shadow-xl border border-[#FFC145]/25 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FF6A00]/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6A00] text-white px-3.5 py-1 text-xs font-black mb-3">
              <Truck24Icon className="w-4 h-4" />
              <span>24/7 NON-STOP DELIVERY</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-[1.35]">
              توصيل جيمي كوك شغال 24 ساعة — الأكل يوصلك سخن في أي وقت
            </h1>
            <p className="mt-2.5 text-xs sm:text-base text-[#FFF5E8]/88 font-semibold leading-relaxed">
              سواء غدا العيلة، عشا متأخر، أو سهرة فجر مع الأصحاب — أسطول توصيل مطعم جيمي كوك بيغطي القاهرة الجديدة والمدن المحيطة بتغليف حراري يحافظ على قرمشة الفطير وسخونة البيتزا والطواجن.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0" dir="ltr">
            <a
              href="tel:01020305074"
              className="rounded-full bg-[#FFC145] hover:bg-white text-[#071D3B] font-en font-black text-xs sm:text-sm px-5 py-3 inline-flex items-center gap-2 transition shadow-sm"
            >
              <PhoneIcon className="w-4 h-4 text-[#FF6A00]" />
              <span>01020305074</span>
            </a>
            <a
              href="https://wa.me/201060449933"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-en font-black text-xs sm:text-sm px-5 py-3 inline-flex items-center gap-2 transition shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>WhatsApp 01060449933</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Service Guarantees */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 shadow-xs">
          <ClockIcon className="w-6 h-6 text-[#FF6A00] mb-2" />
          <h2 className="font-black text-base sm:text-lg text-[#0B2D5C]">خدمة مستمرة 24 ساعة</h2>
          <p className="text-xs sm:text-sm font-semibold text-[#071D3B]/70 mt-1 leading-relaxed">
            مطبخنا وخدمة الدليفري متاحان طوال اليوم وطوال أيام الأسبوع بدون توقف.
          </p>
        </div>
        <div className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 shadow-xs">
          <CheckIcon className="w-6 h-6 text-[#FF6A00] mb-2" />
          <h2 className="font-black text-base sm:text-lg text-[#0B2D5C]">تسليم لا تلامسي (Contactless)</h2>
          <p className="text-xs sm:text-sm font-semibold text-[#071D3B]/70 mt-1 leading-relaxed">
            تقدر تختار التسليم اللاتلامسي عند الباب من صفحة السلة مع الدفع الإلكتروني عبر InstaPay أو المحفظة.
          </p>
        </div>
        <div className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 shadow-xs">
          <PinIcon className="w-6 h-6 text-[#FF6A00] mb-2" />
          <h2 className="font-black text-base sm:text-lg text-[#0B2D5C]">تغليف حراري محكم</h2>
          <p className="text-xs sm:text-sm font-semibold text-[#071D3B]/70 mt-1 leading-relaxed">
            علب مخصصة للبيتزا والفطير وطواجن الفخار تحفظ الحرارة والقوام حتى المسافات الأبعد.
          </p>
        </div>
      </div>

      {/* Detailed Zones Grid */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="text-xl sm:text-3xl font-black text-[#0B2D5C]">
            مدن ومناطق التغطية التفصيلية
          </h2>
          <span className="text-xs font-bold text-[#071D3B]/65">
            * قد تختلف رسوم ووقت التوصيل حسب بُعد المنطقة عن مطبخ القاهرة الجديدة
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ZONES_DETAIL.map((z) => (
            <div
              key={z.name}
              className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-black text-base sm:text-lg text-[#0B2D5C]">{z.name}</h3>
                  <span className="shrink-0 rounded-full bg-[#FFF5E8] text-[#FF6A00] border border-[#FF6A00]/25 px-2.5 py-0.5 text-[10px] font-black">
                    {z.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#071D3B]/72 leading-relaxed">
                  {z.areas}
                </p>
              </div>
              <div className="pt-2.5 border-t border-[#0B2D5C]/10 flex items-center justify-between text-xs font-extrabold text-[#0B2D5C]">
                <span>متوسط وقت الوصول:</span>
                <span className="text-[#FF6A00]">{z.eta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Branch Showcase + Order CTA */}
      <BranchesShowcase branches={branches} />

      <div className="rounded-[28px] bg-[#FFC145] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-right">
          <h3 className="text-lg sm:text-2xl font-black text-[#071D3B]">
            جاهز تطلب؟ المنيو كله قدامك بضغطة واحدة
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#071D3B]/80 mt-1">
            اختار أصنافك المفضلة وأرسل الطلب مباشرة عبر واتساب لتأكيد منطقتك وموعد الوصول.
          </p>
        </div>
        <Link
          href="/menu"
          className="rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white font-black text-xs sm:text-sm px-7 py-3.5 shrink-0 transition shadow-md"
        >
          اطلب الآن من المنيو
        </Link>
      </div>
    </div>
  );
}
