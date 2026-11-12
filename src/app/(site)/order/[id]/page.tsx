import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";
import { formatPrice } from "@/lib/format";
import { orderWhatsAppText, waLink } from "@/lib/whatsapp";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "تم تسجيل طلبك | مطعم جيمي كوك GIMMY COOK",
  robots: { index: false, follow: false },
};

export default async function OrderPage(props: PageProps<"/order/[id]">) {
  const { id } = await props.params;
  const db = await readDB();
  const order = db.orders.find((o) => o.id === id);
  if (!order) notFound();
  const branch = db.branches.find((b) => b.id === order.branchId) ?? db.branches[0];
  const url = waLink(branch.whatsapp, orderWhatsAppText(order, branch));

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="rounded-[32px] bg-white border border-[#0B2D5C]/20 p-6 sm:p-8 text-center shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FF6A00] text-white grid place-items-center shadow-md">
          <CheckIcon className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0B2D5C] mt-4">
          تم تسجيل طلبك في جيمي كوك
        </h1>
        <p className="text-[#071D3B]/70 mt-1 font-semibold">
          رقم الطلب: <b className="text-[#FF6A00] font-en">{order.orderNumber}</b> • {branch.name}
        </p>
        <p className="text-xs sm:text-sm text-[#071D3B]/72 mt-3 font-medium leading-relaxed">
          إذا لم يُفتح تطبيق واتساب تلقائياً، اضغط على الزر بالأسفل لإرسال تفاصيل طلبك مباشرة إلى كاشير{" "}
          <b>مطعم جيمي كوك ({branch.city})</b> لتأكيد التحضير والتوصيل فوراً.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-whatsapp w-full mt-5 text-base sm:text-lg"
        >
          <WhatsAppIcon /> إرسال الطلب عبر واتساب جيمي كوك
        </a>

        {/* Direct Call Option */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#071D3B]/70 flex-wrap">
          <span>أو اتصل مباشرة (24 ساعة):</span>
          <a
            href={`tel:${branch.phone}`}
            dir="ltr"
            className="inline-flex items-center gap-1 text-[#0B2D5C] font-en font-black hover:underline"
          >
            <PhoneIcon className="w-3.5 h-3.5 text-[#FF6A00]" />
            <span>{branch.phone}</span>
          </a>
          {branch.phone2 && (
            <a
              href={`tel:${branch.phone2}`}
              dir="ltr"
              className="inline-flex items-center gap-1 text-[#0B2D5C] font-en font-black hover:underline"
            >
              <span>• {branch.phone2}</span>
            </a>
          )}
        </div>

        <div className="text-start mt-6 border-t border-dashed border-[#0B2D5C]/20 pt-4 space-y-2 text-sm">
          {order.items.map((it, i) => (
            <div key={i} className="flex justify-between gap-3">
              <span className="font-bold text-[#071D3B]">
                {it.name}
                {it.sizeLabel ? ` (${it.sizeLabel})` : ""} × {it.qty}
              </span>
              <span className="font-black text-[#0B2D5C] shrink-0 tabular-nums">
                {formatPrice(it.unitPrice * it.qty)}
              </span>
            </div>
          ))}
          {order.deliveryFee > 0 && (
            <div className="flex justify-between text-xs font-bold text-[#071D3B]/65 pt-1">
              <span>رسوم التوصيل المبدئية</span>
              <span className="tabular-nums">{formatPrice(order.deliveryFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-black text-[#FF6A00] text-lg pt-2 border-t border-[#0B2D5C]/15">
            <span className="text-[#0B2D5C]">إجمالي الطلب</span>
            <span className="tabular-nums">{formatPrice(order.total)}</span>
          </div>
        </div>
        <p className="text-xs text-[#071D3B]/60 mt-4 font-semibold">
          مطعم جيمي كوك — القاهرة الجديدة • دليفري 24 ساعة
        </p>
        <Link href="/" className="btn btn-outline w-full mt-4">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
