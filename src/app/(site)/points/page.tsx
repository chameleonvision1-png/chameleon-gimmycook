import type { Metadata } from "next";
import Link from "next/link";
import PointsCalculator from "@/components/PointsCalculator";
import { CheckIcon, GiftPointsIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "برنامج نقاط الولاء GIMMY POINTS | مطعم جيمي كوك",
  description:
    "تعرّف على برنامج المكافآت GIMMY POINTS من مطعم جيمي كوك: كل 100 جنيه = 5 نقاط، وكل 5 نقاط = 5 جنيه رصيد مكافآت للخصم المباشر على طلباتك القادمة.",
  alternates: {
    canonical: "/points",
  },
};

const STEPS = [
  {
    code: "/01",
    title: "اطلب من المنيو التفاعلي أو واتساب",
    desc: "اختار وجباتك المفضلة من البيتزا، الفطير الشرقي، الباستا، الطواجن، أو المشويات وسجّل رقم موبايلك عند الطلب.",
  },
  {
    code: "/02",
    title: "اكسب 5 نقاط عن كل 100 جنيه تلقائياً",
    desc: "يُحتسب رصيد نقاطك تلقائياً على إجمالي الأصناف في كل فاتورة ويظهر في رسالة تأكيد طلبك ورقم تليفونك لدى الكاشير.",
  },
  {
    code: "/03",
    title: "استبدل نقاطك بخصم نقدي فوري",
    desc: "كل 5 نقاط تساوي 5 جنيه رصيد مكافآت حقيقي تقدر تخصمه مباشرة على أي أوردر جاي بدون تعقيد.",
  },
];

const TIERS = [
  { spend: "200 ج.م", pts: "10 نقاط", reward: "10 ج.م رصيد خصم", example: "مثال: طلب فطيرة فراخ وجبن أو بيتزا سوبريم كبيرة" },
  { spend: "400 ج.م", pts: "20 نقطة", reward: "20 ج.م رصيد خصم", example: "مثال: عرض ميكس المود للعيلة والأصحاب" },
  { spend: "800 ج.م", pts: "40 نقطة", reward: "40 ج.م رصيد خصم", example: "مثال: لمة عيلة بيتزا وفطير وطواجن" },
  { spend: "1,500 ج.م", pts: "75 نقطة", reward: "75 ج.م رصيد خصم", example: "مثال: عزومة مشويات أو طلب شركة" },
];

export default function PointsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Hero Header */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 shadow-xl border border-[#FFC145]/25 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FF6A00]/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] text-[#071D3B] px-3.5 py-1 text-xs font-black mb-3">
              <GiftPointsIcon className="w-4 h-4" />
              <span>GIMMY POINTS LOYALTY</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black leading-[1.35]">
              برنامج نقاط ومكافآت جيمي كوك — طلبك بيرجعلك رصيد
            </h1>
            <p className="mt-2.5 text-xs sm:text-base text-[#FFF5E8]/88 font-semibold leading-relaxed">
              لأن عشاق جيمي كوك يستاهلوا أكتر، صممنا نظام ولاء بسيط وواضح: كل 100 جنيه بتدفعها في طلبك بتكسبك 5 نقاط، وكل 5 نقاط قيمتها 5 جنيه رصيد مكافآت جاهز للاستخدام.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0" dir="ltr">
            <a
              href="https://wa.me/201060449933?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20GIMMY%20COOK%D8%8C%20%D8%B9%D8%A7%D9%8A%D8%B2%20%D8%A3%D8%B3%D8%AA%D8%B9%D9%84%D9%85%20%D8%B9%D9%86%20%D8%B1%D8%B5%D9%8A%D8%AF%20%D9%86%D9%82%D8%A7%D8%B7%D9%8A%20%D9%81%D9%8A%20GIMMY%20POINTS"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-5 py-3 text-xs sm:text-sm font-black inline-flex items-center gap-2 transition shadow-md"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#FFC145]" />
              <span>استعلم عن رصيدك عبر واتساب</span>
            </a>
            <a
              href="tel:01020305074"
              className="rounded-full bg-white/15 hover:bg-white text-white hover:text-[#0B2D5C] border border-white/25 font-en font-black text-xs sm:text-sm px-5 py-3 inline-flex items-center gap-2 transition"
            >
              <PhoneIcon className="w-4 h-4" />
              <span>01020305074</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Grid: Calculator + 3 Steps */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <PointsCalculator />
        </div>

        <div className="lg:col-span-6 space-y-4">
          {STEPS.map((s) => (
            <div
              key={s.code}
              className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 sm:p-6 flex items-start gap-4 shadow-xs"
            >
              <span
                dir="ltr"
                className="w-11 h-11 rounded-2xl bg-[#0B2D5C] text-[#FFC145] font-en font-black text-xs grid place-items-center shrink-0"
              >
                {s.code}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#0B2D5C]">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[#071D3B]/72 font-semibold mt-1 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Tiers Table */}
      <div className="rounded-[30px] bg-white border border-[#0B2D5C]/15 p-5 sm:p-8 shadow-xs">
        <h2 className="text-xl sm:text-2xl font-black text-[#0B2D5C] mb-4">
          جدول أمثلة النقاط والمكافآت
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {TIERS.map((t) => (
            <div
              key={t.spend}
              className="rounded-2xl bg-[#FFF5E8] border border-[#0B2D5C]/12 p-4 flex flex-col justify-between gap-2"
            >
              <div>
                <span className="text-xs font-extrabold text-[#071D3B]/65">عند الطلب بقيمة</span>
                <div className="text-xl font-black text-[#0B2D5C] mt-0.5">{t.spend}</div>
              </div>
              <div className="py-2 border-y border-[#0B2D5C]/10 flex items-center justify-between text-xs font-black">
                <span className="text-[#FF6A00]">{t.pts}</span>
                <span className="bg-[#FFC145] text-[#071D3B] px-2.5 py-0.5 rounded-full">
                  {t.reward}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#071D3B]/70 leading-relaxed">
                {t.example}
              </p>
            </div>
          ))}
        </div>

        {/* Terms Note */}
        <div className="mt-5 pt-4 border-t border-[#0B2D5C]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-[#071D3B]/70">
          <div className="flex items-start gap-2">
            <CheckIcon className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
            <span>
              تُسجّل النقاط برقم الموبايل على إجمالي قيمة الوجبات والأصناف (باستثناء رسوم التوصيل)، وتخضع لشروط برنامج الولاء السارية لدى إدارة مطعم جيمي كوك.
            </span>
          </div>
          <Link
            href="/menu"
            className="shrink-0 rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white px-5 py-2 text-xs font-black transition text-center"
          >
            تصفح المنيو الآن
          </Link>
        </div>
      </div>
    </div>
  );
}
