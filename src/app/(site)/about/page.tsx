import type { Metadata } from "next";
import Link from "next/link";
import OpenQrButton from "@/components/OpenQrButton";
import { PhoneIcon } from "@/components/icons";

const aboutTitle = "عن مطعم جيمي كوك — GIMMY COOK | إيطالي وشرقي بمود مختلف";
const aboutDescription =
  "تعرف على قصة وهوية مطعم جيمي كوك (GIMMY COOK) في القاهرة الجديدة: كيف جمعنا البيتزا الإيطالية والباستا مع الفطير الشرقي المورق والطواجن والمشويات بخدمة دليفري 24 ساعة.";

export const metadata: Metadata = {
  title: "قصتنا | عن مطعم جيمي كوك GIMMY COOK",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://gimmycook.chameleon.vision/about",
    siteName: "مطعم جيمي كوك | GIMMY COOK",
    title: aboutTitle,
    description: aboutDescription,
    images: [
      {
        url: "/og-about.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "عن مطعم جيمي كوك GIMMY COOK",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutTitle,
    description: aboutDescription,
    images: ["/og-about.jpg?v=1"],
  },
};

const pillars = [
  {
    code: "/01",
    en: "ARTISAN ITALIAN PIZZA & CREAMY PASTA",
    title: "بيتزا إيطالية مخبوزة طازة ومكرونات غرقانة صوص",
    text: "في جيمي كوك بنعجن عجينة البيتزا يومياً عشان تطلع خفيفة ومقرمشة من الأطراف وغنية بالموتزاريلا الطبيعية وصوص الرانش والباربكيو، جنب أطباق الباستا ألفريدو والنجرسكو المحضرة فور طلبك.",
    img: "/images/hero/hero-pizza-supreme.webp",
  },
  {
    code: "/02",
    en: "LAYERED ORIENTAL FETEER & CLAY TAWAGEN",
    title: "فطير شرقي مورق بالسمن البلدي وطواجن فخار من الفرن",
    text: "لأن مفيش غنى عن الأصالة الشرقية، فرن جيمي كوك بيقدملك فطير شرقي مورق محشو فراخ وجبن ولحوم وسجق شرقي، وطواجن مكرونة فخار بوش موتزاريلا ذهبي محمر تفتح النفس من أول لحظة.",
    img: "/images/hero/hero-feteer-oriental.webp",
  },
  {
    code: "/03",
    en: "24/7 NON-STOP THERMAL DELIVERY",
    title: "دليفري 24 ساعة وتغليف حراري يحفظ السخونة والقوام",
    text: "الجوع ملوش مواعيد! عشان كده مطبخنا وخدمة التوصيل شغالين 24 ساعة في القاهرة الجديدة ومدينتي والشروق وبدر والعاصمة، بتغليف حراري محكم يوصلّك البيتزا والفطير والطواجن كأنها طالعة من الفرن حالاً.",
    img: "/images/hero/hero-tagine-oven.webp",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        {/* Hero Card Featuring the Circular Emblem (/logo-emblem.webp) */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-12 flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_44px_-16px_rgba(11,45,92,0.48)] border border-[#FFC145]/25 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#FF6A00]/22 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/10 p-2 ring-2 ring-[#FFC145]/60 shrink-0 shadow-2xl grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-emblem.webp"
              alt="شعار مطعم جيمي كوك GIMMY COOK"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <div className="relative z-10 flex-1 w-full text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFC145] text-[#071D3B] px-4 py-1 text-xs font-black font-en mb-3">
              <span>GOOD FOOD • GOOD MOOD</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.35] text-right">
              مطعم جيمي كوك — إيطالي وشرقي بمود مختلف
            </h1>
            <p className="text-[#FFF5E8]/90 mt-3 text-sm sm:text-lg max-w-3xl leading-relaxed font-semibold text-right">
              بدأت فكرة <b className="text-[#FFC145]">GIMMY COOK</b> من سؤال بسيط في كل لمة عيلة أو سهرة أصحاب: نطلب بيتزا وباستا إيطالي ولا فطير شرقي وطواجن ومشاوي؟ فقررنا نبني مطبخ يجمع الاتنين بأعلى جودة، عجينة طازجة، حشوات سخية، وتوصيل لا يتوقف 24 ساعة.
            </p>
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <Link
                href="/menu"
                className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-black text-xs sm:text-sm px-6 py-3 transition shadow-sm"
              >
                تصفح منيو جيمي كوك
              </Link>
              <a
                href="tel:01020305074"
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white hover:text-[#0B2D5C] text-white border border-white/25 font-en font-black text-xs sm:text-sm px-5 py-3 transition"
              >
                <PhoneIcon className="w-4 h-4" />
                <span>01020305074</span>
              </a>
              <OpenQrButton label="باركود المنيو QR" />
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[
            { num: "24/7", label: "مطبخ ودليفري مستمر طوال اليوم" },
            { num: "8 أقسام", label: "بيتزا، فطير، باستا، طواجن، وجبات ومشاوي" },
            { num: "+35 صنف", label: "تُحضّر طازجة فور الطلب بأعلى جودة" },
            { num: "7 مدن", label: "تغطية شرق القاهرة والمدن الجديدة" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 text-center shadow-xs"
            >
              <div className="text-2xl sm:text-3xl font-black text-[#FF6A00]">{item.num}</div>
              <div className="text-xs sm:text-sm font-extrabold text-[#0B2D5C] mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Editorial Story Pillars */}
        <div className="mt-8 space-y-6">
          {pillars.map((b, i) => (
            <div
              key={b.code}
              className={`rounded-[32px] bg-white border border-[#0B2D5C]/15 p-6 sm:p-10 grid md:grid-cols-2 gap-8 items-center shadow-xs ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="rounded-[26px] bg-[#FFF5E8] border border-[#0B2D5C]/12 aspect-[16/10] overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.img}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF6A00] mb-2">
                  <span dir="ltr" className="font-en tracking-widest">
                    {b.code} • {b.en}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-[#0B2D5C] text-right leading-snug">
                  {b.title}
                </h2>
                <p className="text-[#071D3B]/75 leading-8 mt-3 text-sm sm:text-base font-semibold text-right">
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-10 rounded-[32px] bg-[#FFC145] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-right">
            <h3 className="text-xl sm:text-2xl font-black text-[#071D3B]">
              جاهز تجرب مود جيمي كوك؟
            </h3>
            <p className="text-xs sm:text-sm font-bold text-[#071D3B]/80 mt-1">
              اختار من المنيو التفاعلي الآن واطلب دليفري سريع لأي مكان في القاهرة الجديدة والمدن المجاورة.
            </p>
          </div>
          <Link
            href="/menu"
            className="rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white font-black text-sm sm:text-base px-8 py-3.5 shrink-0 transition shadow-md"
          >
            اطلب الآن من المنيو
          </Link>
        </div>
      </div>
    </div>
  );
}
