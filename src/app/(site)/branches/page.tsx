import type { Metadata } from "next";
import Link from "next/link";
import { publicDB } from "@/lib/db";
import BranchesShowcase from "@/components/BranchesShowcase";
import OpenQrButton from "@/components/OpenQrButton";
import { ExternalLinkIcon, PhoneIcon, PinIcon, Truck24Icon, WhatsAppIcon } from "@/components/icons";

const branchesTitle = "موقعنا ونطاق التوصيل 24 ساعة | مطعم جيمي كوك GIMMY COOK";
const branchesDescription =
  "مطبخ وفرع مطعم جيمي كوك (GIMMY COOK) في القاهرة الجديدة مع خدمة دليفري 24 ساعة تغطي التجمع، مدينتي، الشروق، مدينة بدر، العاصمة الإدارية، وصال، والبروج (01020305074 • 01060449933).";

export const metadata: Metadata = {
  title: "الفروع ونطاق التوصيل 24 ساعة",
  description: branchesDescription,
  alternates: {
    canonical: "/branches",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://gimmycook.chameleon.vision/branches",
    siteName: "مطعم جيمي كوك | GIMMY COOK",
    title: branchesTitle,
    description: branchesDescription,
    images: [
      {
        url: "/og-branches.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "مطعم جيمي كوك — القاهرة الجديدة ودليفري 24 ساعة",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: branchesTitle,
    description: branchesDescription,
    images: ["/og-branches.jpg?v=1"],
  },
};

export default async function BranchesPage() {
  const { branches } = await publicDB();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-14">
      {/* Navy Hero Banner */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 shadow-[0_18px_40px_-16px_rgba(11,45,92,0.45)] border border-[#FFC145]/25 flex flex-col md:flex-row md:items-end justify-between gap-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FF6A00]/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative z-10 text-right">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC145] text-[#071D3B] px-3.5 py-1 text-xs font-black mb-3">
            <Truck24Icon className="w-3.5 h-3.5" />
            <span>القاهرة الجديدة • دليفري 24 ساعة</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white text-right">
            مطبخ جيمي كوك ونطاق التوصيل المستمر
          </h1>
          <p className="text-[#FFF5E8]/85 mt-2 text-xs sm:text-base max-w-2xl font-semibold text-right leading-relaxed">
            نعمل على مدار 24 ساعة لخدمة القاهرة الجديدة ومدينتي والشروق ومدينة بدر والعاصمة الإدارية ووصال والبروج — مع خيارات الدليفري السريع والتسليم اللاتلامسي والتيك أواي.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2.5 shrink-0 flex-wrap" dir="ltr">
          <OpenQrButton label="باركود المنيو QR" />
          <a
            href="tel:01020305074"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white font-en font-black text-xs sm:text-sm px-5 py-3 transition shadow-sm"
          >
            <PhoneIcon className="w-4 h-4 text-[#FFC145]" />
            <span>01020305074</span>
          </a>
          <a
            href="tel:01060449933"
            className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white hover:text-[#0B2D5C] text-white border border-white/25 font-en font-black text-xs sm:text-sm px-5 py-3 transition"
          >
            <PhoneIcon className="w-4 h-4" />
            <span>01060449933</span>
          </a>
        </div>
      </div>

      {/* Interactive Branch & Delivery Zones Showcase */}
      <div className="mt-8">
        <BranchesShowcase branches={branches} />
      </div>

      {/* Embedded Map & Direct WhatsApp */}
      <div className="mt-8 grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 rounded-[32px] bg-white border border-[#0B2D5C]/18 p-4 sm:p-6 shadow-xs flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-black text-lg sm:text-xl text-[#0B2D5C]">
                نطاق الخدمة الرئيسي في القاهرة الجديدة وشرق القاهرة
              </h2>
              <p className="text-xs sm:text-sm text-[#071D3B]/70 font-semibold mt-0.5">
                القاهرة الجديدة — التجمع — مدينتي — الشروق — مدينة بدر — العاصمة الإدارية
              </p>
            </div>
            <PinIcon className="w-6 h-6 text-[#FF6A00] shrink-0" />
          </div>

          <div className="rounded-[24px] overflow-hidden border border-[#0B2D5C]/14 bg-[#FFF5E8] aspect-[16/10]">
            <iframe
              title="نطاق تغطية مطعم جيمي كوك — القاهرة الجديدة"
              src="https://maps.google.com/maps?q=30.0254,31.4906&hl=ar&z=12&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            <Link
              href="/delivery"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0B2D5C] hover:bg-[#FF6A00] text-white px-4 py-2.5 text-xs font-black transition"
            >
              <Truck24Icon className="w-3.5 h-3.5 text-[#FFC145]" />
              <span>جدول أوقات وتفاصيل التوصيل لكل مدينة</span>
            </Link>
            <a
              href="https://www.google.com/maps/search/?api=1&query=New+Cairo+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5E8] hover:bg-[#FFC145] text-[#0B2D5C] border border-[#0B2D5C]/18 px-4 py-2.5 text-xs font-black transition"
            >
              <PinIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span>فتح خرائط جوجل</span>
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Direct WhatsApp + Loyalty Info */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="rounded-[32px] bg-[#071D3B] text-white p-6 sm:p-8 flex-1 flex flex-col justify-between border border-[#FFC145]/20">
            <div>
              <span className="inline-block rounded-full bg-[#FFC145] text-[#071D3B] px-3 py-1 text-[11px] font-black mb-3">
                طلب سريع عبر واتساب
              </span>
              <h2 className="font-black text-xl sm:text-2xl text-white">
                اطلب من الموقع وتابع أوردرك مباشرة مع كاشير جيمي كوك
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-2.5 leading-relaxed font-semibold">
                اختار وجباتك من المنيو التفاعلي بالأحجام والإضافات اللي تحبها، وهتوصلك فاتورة طلبك شاملة نقاط GIMMY POINTS جاهزة على واتساب فوراً.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#FFC145]">
                واتساب الطلبات السريع
              </span>
              <a
                href="https://wa.me/201060449933"
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="inline-flex items-center gap-2 rounded-full bg-[#FF6A00] hover:bg-[#FFC145] text-white hover:text-[#071D3B] font-en font-black text-xs sm:text-sm px-5 py-2.5 shadow-sm transition"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp: 01060449933</span>
              </a>
            </div>
          </div>

          <div className="rounded-[28px] bg-white border border-[#0B2D5C]/18 p-6">
            <h3 className="font-black text-base sm:text-lg text-[#0B2D5C]">
              خدمة التوصيل اللاتلامسي (Contactless Delivery)
            </h3>
            <p className="text-xs sm:text-sm text-[#071D3B]/75 mt-2 leading-relaxed font-semibold">
              نوفر إمكانية الدفع عبر <b className="text-[#0B2D5C]">InstaPay</b> أو المحافظ الإلكترونية واستلام الطلب عند باب الشقة بدون تلامس لمزيد من الراحة والأمان في أي وقت من اليوم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
