import { NextResponse } from "next/server";
import { readDB, uid, updateDB } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { orderWhatsAppText, waLink } from "@/lib/whatsapp";
import type { Order, OrderItem } from "@/lib/types";

interface InLine {
  productId: string;
  sizeLabel?: string;
  addons?: string[];
  note?: string;
  qty: number;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json((await readDB()).orders, {
    headers: { "Cache-Control": "no-store, private" },
  });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`orders:${ip}`, 10, 10 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "تم إرسال طلبات كثيرة في وقت قصير، يرجى الانتظار قليلًا" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }

  const {
    branchId,
    customerName,
    customerPhone,
    orderType,
    address,
    paymentMethod,
    notes,
    items,
  } = body as {
    branchId: string;
    customerName: string;
    customerPhone: string;
    orderType: "delivery" | "pickup";
    address?: string;
    paymentMethod: string;
    notes?: string;
    items: InLine[];
  };

  const db = await readDB();
  const branch = db.branches.find((b) => b.id === branchId && b.isActive) ?? db.branches[0];
  if (!branch) {
    return NextResponse.json({ error: "من فضلك اختار الفرع أو نطاق التوصيل" }, { status: 400 });
  }
  if (!customerName?.trim()) {
    return NextResponse.json({ error: "من فضلك اكتب اسمك" }, { status: 400 });
  }
  const normalizedPhone = String(customerPhone ?? "").replace(/\s/g, "");
  if (!/^01[0125]\d{8}$/.test(normalizedPhone)) {
    return NextResponse.json(
      { error: "رقم الموبايل غير صحيح (مثال: 01020305074)" },
      { status: 400 },
    );
  }
  if (orderType !== "delivery" && orderType !== "pickup") {
    return NextResponse.json({ error: "نوع الطلب غير صالح" }, { status: 400 });
  }
  if (orderType === "delivery" && !address?.trim()) {
    return NextResponse.json({ error: "من فضلك اكتب العنوان بالتفصيل" }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return NextResponse.json({ error: "السلة غير صالحة" }, { status: 400 });
  }

  // Re-price everything strictly on the server
  const now = Date.now();
  const out: OrderItem[] = [];
  for (const it of items) {
    if (!it || typeof it.productId !== "string") {
      return NextResponse.json({ error: "عنصر غير صالح في السلة" }, { status: 400 });
    }
    const qty = Math.max(1, Math.min(99, Math.floor(Number(it.qty) || 1)));
    if (it.productId.startsWith("offer:")) {
      const o = db.offers.find((x) => x.id === it.productId.slice(6));
      if (
        !o ||
        !o.isActive ||
        new Date(o.endsAt).getTime() < now ||
        (o.branchIds.length && !o.branchIds.includes(branch.id))
      ) {
        return NextResponse.json({ error: "عرض في السلة لم يعد متاحًا" }, { status: 400 });
      }
      out.push({
        productId: it.productId,
        name: `عرض: ${o.title}`,
        addons: [],
        unitPrice: o.price,
        qty,
      });
      continue;
    }

    const p = db.products.find((x) => x.id === it.productId);
    if (!p || !p.isAvailable || p.unavailableBranches.includes(branch.id)) {
      return NextResponse.json(
        { error: `صنف غير متاح حاليًا: ${p?.nameAr ?? ""}` },
        { status: 400 },
      );
    }
    const size = p.sizes.find((s) => s.label === it.sizeLabel) ?? p.sizes[0];
    const requestedAddons = Array.isArray(it.addons) ? it.addons : [];
    const addons = p.addons.filter((a) => requestedAddons.includes(a.label));
    out.push({
      productId: p.id,
      name: p.nameAr,
      sizeLabel: size?.label,
      addons: addons.map((a) => a.label),
      note: typeof it.note === "string" ? it.note.slice(0, 200) : undefined,
      unitPrice: (size?.price ?? 0) + addons.reduce((s, a) => s + a.price, 0),
      qty,
    });
  }

  const subtotal = out.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const deliveryFee = orderType === "delivery" ? Math.max(0, Number(branch.deliveryFee) || 0) : 0;

  const order = await updateDB((d) => {
    const seq =
      d.orders.reduce((m, o) => Math.max(m, Number(o.orderNumber.split("-")[1]) || 0), 1000) + 1;
    const o: Order = {
      id: uid("ord_"),
      orderNumber: `GC-${seq}`,
      branchId: branch.id,
      customerName: customerName.trim().slice(0, 80),
      customerPhone: normalizedPhone,
      orderType,
      address: orderType === "delivery" ? address?.trim().slice(0, 300) : undefined,
      paymentMethod: String(paymentMethod || "الدفع عند الاستلام (كاش)").slice(0, 80),
      notes: typeof notes === "string" && notes.trim() ? notes.trim().slice(0, 300) : undefined,
      items: out,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    d.orders.unshift(o);
    return o;
  });

  return NextResponse.json({
    order,
    whatsappUrl: waLink(branch.whatsapp, orderWhatsAppText(order, branch)),
  });
}
