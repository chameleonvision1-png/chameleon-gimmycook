import type { Metadata } from "next";
import { publicDB } from "@/lib/db";
import OccasionForm from "@/components/OccasionForm";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "طلبات الشركات والعزومات | مطعم جيمي كوك GIMMY COOK",
  description:
    "تجهيز العزومات العائلية وطلبات الشركات والمكاتب والجامعات في القاهرة الجديدة ومدينتي والشروق وبدر والعاصمة الإدارية من مطعم جيمي كوك (GIMMY COOK).",
  openGraph: {
    images: ["/og-occasions.jpg?v=1"],
  },
};

const CATERING_PACKAGES = [
  {
    title: "بوكسات البيتزا الإيطالية والفطير الشرقي للتجمعات",
    desc: "تشكيلة متنوعة من البيتزا حجم عائلي XL والفطير الشرقي بالحشوات المختلفة تتقدم سخنة وجاهزة للمشاركة في الحفلات والمكاتب.",
  },
  {
    title: "صواني المشويات الشرقية والطواجن الفرن",
    desc: "مشويات كباب وكفتة وشيش طاووق وفراخ مشوية عالفحم مع صواني الأرز البسمتي وطواجن المكرونة بالموتزاريلا.",
  },
  {
    title: "توريد وجبات الشركات والجامعات بالقاهرة الجديدة والمدن المحيطة",
    desc: "وجبات فردية وكومبو متكاملة بتغليف حراري أنيق وأسعار خاصة للكميات والتعاقدات الدورية على مدار 24 ساعة.",
  },
];

export default async function OccasionsPage() {
  const data = await publicDB();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[32px] bg-gradient-to-br from-[#0B2D5C] via-[#143A73] to-[#071D3B] text-white p-6 sm:p-10 shadow-lg border border-[#FFC145]/25">
            <span className="inline-block rounded-full bg-[#FFC145] text-[#071D3B] px-3.5 py-1 text-xs font-black mb-3">
              عزومات وتوريد شركات • GIMMY COOK
            </span>
            <h1 className="text-2xl sm:text-4xl font-black leading-[1.35]">
              لمّة العيلة أو غدا الشركة بمود مختلف يشرفك
            </h1>
            <p className="mt-3 text-xs sm:text-base text-[#FFF5E8]/90 font-semibold leading-relaxed">
              لأن أذواق الضيوف والفريق دايماً مختلفة، مطبخ جيمي كوك بيجمعلك الإيطالي والشرقي في أوردر واحد متكامل يصل في ميعاده بالضبط في القاهرة الجديدة، مدينتي، الشروق، مدينة بدر، والعاصمة الإدارية.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5" dir="ltr">
              <a
                href="https://wa.me/201060449933"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#FF6A00] hover:bg-[#CE2F08] text-white px-4 py-2 text-xs font-en font-black inline-flex items-center gap-1.5 transition shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#FFC145]" />
                <span>WhatsApp 01060449933</span>
              </a>
              <a
                href="tel:01020305074"
                className="rounded-full bg-[#FFC145] text-[#071D3B] px-4 py-2 text-xs font-en font-black inline-flex items-center gap-1.5"
              >
                <PhoneIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>01020305074</span>
              </a>
            </div>
          </div>

          <div className="space-y-3.5">
            {CATERING_PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className="rounded-[24px] bg-white border border-[#0B2D5C]/15 p-5 flex items-start gap-3.5 shadow-2xs"
              >
                <span className="w-8 h-8 rounded-full bg-[#FFC145] text-[#071D3B] grid place-items-center shrink-0 mt-0.5">
                  <CheckIcon className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#0B2D5C]">{pkg.title}</h3>
                  <p className="text-xs sm:text-sm text-[#071D3B]/70 font-semibold mt-1 leading-relaxed">
                    {pkg.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <OccasionForm branches={data.branches} />
        </div>
      </div>
    </div>
  );
}
