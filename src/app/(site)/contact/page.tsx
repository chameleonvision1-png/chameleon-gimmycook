import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import OpenQrButton from "@/components/OpenQrButton";
import { ExternalLinkIcon, MailIcon, PhoneIcon, Truck24Icon, WhatsAppIcon } from "@/components/icons";

const contactTitle = "أرقام الطلبات وتواصل معنا | مطعم جيمي كوك GIMMY COOK";
const contactDescription =
  "تواصل مع مطعم جيمي كوك (GIMMY COOK) على مدار 24 ساعة: أرقام الطلبات 01020305074 و 01060449933، واتساب الطلبات، البريد الرسمي gimmycook@gmail.com، وصفحاتنا على فيسبوك وإنستجرام وتيك توك.";

export const metadata: Metadata = {
  title: "أرقام الطلبات وتواصل معنا",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://gimmycook.chameleon.vision/contact",
    siteName: "مطعم جيمي كوك | GIMMY COOK",
    title: contactTitle,
    description: contactDescription,
    images: [
      {
        url: "/og-contact.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "تواصل مع مطعم جيمي كوك GIMMY COOK — 01020305074",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: contactTitle,
    description: contactDescription,
    images: ["/og-contact.jpg?v=1"],
  },
};

const ORDER_PHONES = [
  { number: "01020305074", badge: "الخط الساخن الأساسي (24 ساعة)" },
  { number: "01060449933", badge: "خط الطلبات الثاني وواتساب" },
];

const FAQS = [
  {
    q: "ما مواعيد عمل مطعم جيمي كوك وخدمة الدليفري؟",
    a: "مطبخ جيمي كوك وخدمة التوصيل متاحان 24 ساعة طوال أيام الأسبوع لتغطية القاهرة الجديدة، مدينتي، الشروق، مدينة بدر، العاصمة الإدارية، وصال، والبروج.",
  },
  {
    q: "كيف أطلب من منيو جيمي كوك بأسرع طريقة؟",
    a: "تقدر تختار أصنافك بالأحجام والإضافات من المنيو التفاعلي على الموقع وإرسال الطلب بضغطة واحدة عبر واتساب، أو الاتصال مباشرة على 01020305074.",
  },
  {
    q: "هل يتوفر دفع إلكتروني وتسليم لا تلامسي؟",
    a: "نعم، نوفر الدفع الكاش عند الاستلام، أو عبر InstaPay والمحافظ الإلكترونية، مع إمكانية تفعيل خيار التسليم اللاتلامسي عند الباب من صفحة السلة.",
  },
];

export default async function ContactPage() {
  const { branches, settings } = await publicDB();

  return (
    <div className="pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
        {/* Hero with Circular Emblem (/logo-emblem.webp) */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(11,45,92,0.45)] border border-[#FFC145]/25 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FF6A00]/22 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 text-right">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-emblem.webp"
              alt="شعار مطعم جيمي كوك GIMMY COOK"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0 drop-shadow-lg"
            />
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white text-right">
                أرقام الطلبات والقنوات الرسمية لجيمي كوك
              </h1>
              <p className="text-[#FFF5E8]/85 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
                اطلب مباشرة عبر الهاتف أو واتساب على مدار 24 ساعة، وتابع أحدث عروض ومنتجات GIMMY COOK على منصاتنا الرسمية.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2.5 shrink-0 flex-wrap" dir="ltr">
            <OpenQrButton label="باركود المنيو QR" />
            <a
              href="https://wa.me/201060449933"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-en font-black text-xs sm:text-sm px-6 py-3 shadow-sm transition shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#FFC145]" />
              <span>WhatsApp: 01060449933</span>
            </a>
          </div>
        </div>

        {/* Clickable Order Hotlines + Official Email Hub */}
        <div className="mt-8 rounded-[32px] bg-white border border-[#0B2D5C]/16 p-5 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#0B2D5C]/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0B2D5C]">
                خطوط الدليفري والطلبات السريعة (24 ساعة)
              </h2>
              <p className="text-xs sm:text-sm text-[#071D3B]/70 font-semibold mt-1">
                اضغط على أي وسيلة للتواصل الفوري مع فريق مطعم جيمي كوك:
              </p>
            </div>
            <Link
              href="/delivery"
              className="rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white font-black text-xs px-4 py-2.5 self-start sm:self-auto transition inline-flex items-center gap-1.5"
            >
              <Truck24Icon className="w-4 h-4 text-[#FFC145]" />
              <span>مدن التوصيل 24 ساعة</span>
            </Link>
          </div>

          <div className="mt-5 grid sm:grid-cols-3 gap-3.5">
            {ORDER_PHONES.map((p, idx) => (
              <a
                key={p.number}
                href={`tel:${p.number}`}
                className={`rounded-2xl p-4 border transition flex flex-col justify-between gap-2 ${
                  idx === 0
                    ? "bg-[#0B2D5C] hover:bg-[#071D3B] text-white border-[#0B2D5C]"
                    : "bg-[#FFF5E8] hover:bg-[#FFC145] text-[#0B2D5C] border-[#0B2D5C]/18"
                }`}
              >
                <span
                  className={`text-[11px] font-extrabold ${
                    idx === 0 ? "text-[#FFC145]" : "text-[#FF6A00]"
                  }`}
                >
                  {p.badge}
                </span>
                <div className="flex items-center justify-between gap-2" dir="ltr">
                  <PhoneIcon className="w-4 h-4 shrink-0" />
                  <span className="font-en font-black text-base tracking-wide">
                    {p.number}
                  </span>
                </div>
              </a>
            ))}

            <a
              href={`mailto:${settings.email || "gimmycook@gmail.com"}`}
              className="rounded-2xl p-4 border border-[#0B2D5C]/18 bg-[#FFF5E8] hover:bg-[#FFC145] text-[#0B2D5C] transition flex flex-col justify-between gap-2"
            >
              <span className="text-[11px] font-extrabold text-[#FF6A00]">
                البريد الإلكتروني للإدارة والتعاقدات
              </span>
              <div className="flex items-center justify-between gap-2" dir="ltr">
                <MailIcon className="w-4 h-4 shrink-0" />
                <span className="font-en font-black text-sm truncate">
                  {settings.email || "gimmycook@gmail.com"}
                </span>
              </div>
            </a>
          </div>

          {/* Official Social & Navigation Channels */}
          <div className="mt-6 pt-6 border-t border-[#0B2D5C]/10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <Link
              href="/menu"
              className="rounded-2xl bg-[#FF6A00] hover:bg-[#CE2F08] text-white p-4 font-black text-sm flex items-center justify-between shadow-xs transition"
            >
              <span>المنيو التفاعلي الكامل بالأسعار</span>
              <span>←</span>
            </Link>
            <Link
              href="/occasions"
              className="rounded-2xl bg-[#FFC145] hover:bg-[#0B2D5C] text-[#071D3B] hover:text-white p-4 font-black text-sm flex items-center justify-between shadow-xs transition"
            >
              <span>طلبات العزومات وتوريد الشركات</span>
              <span>←</span>
            </Link>
            <Link
              href="/offers"
              className="rounded-2xl bg-[#0B2D5C] hover:bg-[#FF6A00] text-white p-4 font-black text-sm flex items-center justify-between shadow-xs transition"
            >
              <span>عروض وبوكسات التوفير</span>
              <span>←</span>
            </Link>
            <a
              href={settings.facebook || "https://www.facebook.com/GIMMYCOOK"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/16 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>فيسبوك الرسمي (GIMMY COOK)</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
            <a
              href={settings.instagram || "https://www.instagram.com/gimmy_cook/"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/16 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>إنستجرام الرسمي (@gimmy_cook)</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
            <a
              href={settings.tiktok || "https://www.tiktok.com/@gimmy.cook"}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#FFF5E8] hover:bg-[#0B2D5C] text-[#0B2D5C] hover:text-white border border-[#0B2D5C]/16 p-4 font-black text-sm flex items-center justify-between transition"
            >
              <span>تيك توك الرسمي (@gimmy.cook)</span>
              <ExternalLinkIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Concise FAQ Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="rounded-[26px] bg-white border border-[#0B2D5C]/15 p-5 sm:p-6 shadow-xs"
            >
              <h3 className="font-black text-sm sm:text-base text-[#0B2D5C]">{f.q}</h3>
              <p className="text-xs sm:text-sm text-[#071D3B]/75 font-semibold leading-relaxed mt-2">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Catering & Inquiry Form */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-8">
        <OccasionForm branches={branches} />
      </div>
    </div>
  );
}
