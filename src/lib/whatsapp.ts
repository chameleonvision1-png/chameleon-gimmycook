import type { Branch, OccasionRequest, Order } from "./types";

export function orderWhatsAppText(order: Order, branch: Branch) {
  const lines: string[] = [];
  lines.push(`*طلب جديد — مطعم جيمي كوك | GIMMY COOK*`);
  lines.push(`رقم الطلب: *${order.orderNumber}*`);
  lines.push(`الفرع / النطاق: ${branch.name} (${branch.city})`);
  lines.push("");
  lines.push(`الاسم: ${order.customerName}`);
  lines.push(`الموبايل: ${order.customerPhone}`);
  lines.push(
    `نوع الطلب: ${
      order.orderType === "delivery"
        ? "توصيل منزلي 24 ساعة (Contactless متاح)"
        : "استلام من الفرع (Takeaway)"
    }`,
  );
  if (order.orderType === "delivery" && order.address) {
    lines.push(`العنوان: ${order.address}`);
  }
  lines.push(`طريقة الدفع: ${order.paymentMethod}`);
  lines.push("");
  lines.push(`*الأصناف المطلوبة:*`);
  order.items.forEach((it, i) => {
    let l = `${i + 1}. ${it.name}`;
    if (it.sizeLabel) l += ` (${it.sizeLabel})`;
    l += ` × ${it.qty} = ${it.unitPrice * it.qty} ج.م`;
    lines.push(l);
    if (it.addons.length) lines.push(`   + إضافات: ${it.addons.join("، ")}`);
    if (it.note) lines.push(`   ملاحظة: ${it.note}`);
  });
  lines.push("");
  if (order.deliveryFee > 0) {
    lines.push(`المجموع الفرعي: ${order.subtotal} ج.م`);
    lines.push(`خدمة التوصيل: ${order.deliveryFee} ج.م`);
  }
  lines.push(`*إجمالي الطلب: ${order.total} ج.م*`);
  if (order.notes) {
    lines.push("");
    lines.push(`ملاحظات إضافية: ${order.notes}`);
  }
  return lines.join("\n");
}

export function occasionWhatsAppText(r: OccasionRequest, branch?: Branch) {
  return [
    `*طلب عزومة / تجمع جماعي — مطعم جيمي كوك | GIMMY COOK*`,
    `الاسم: ${r.name}`,
    `الموبايل: ${r.phone}`,
    `نوع المناسبة / الطلب: ${r.type}`,
    `العدد / الكمية: ${r.quantity}`,
    `التاريخ والموعد المطلوب: ${r.date}`,
    `النطاق / الفرع: ${branch?.name ?? "مطعم جيمي كوك — القاهرة الجديدة"}`,
    r.details ? `التفاصيل: ${r.details}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export const waLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
