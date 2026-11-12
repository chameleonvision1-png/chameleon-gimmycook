"use client";

import type { AdminData } from "./ui";
import { formatPrice, statusLabels } from "@/lib/format";

export default function Overview({ data, goto }: { data: AdminData; goto: (t: string) => void }) {
  const today = new Date().toDateString();
  const todays = data.orders.filter((o) => new Date(o.createdAt).toDateString() === today && o.status !== "cancelled");
  const revenue = todays.reduce((s, o) => s + o.total, 0);
  const counts = new Map<string, number>();
  data.orders.filter((o) => o.status !== "cancelled").forEach((o) => o.items.forEach((i) => counts.set(i.name, (counts.get(i.name) ?? 0) + i.qty)));
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const byBranch = data.branches.map((b) => ({ b, n: todays.filter((o) => o.branchId === b.id).length }));

  const stats = [
    { label: "طلبات النهارده", value: todays.length, color: "bg-[#0B2D5C] text-white" },
    { label: "مبيعات النهارده", value: formatPrice(revenue), color: "bg-[#FF6A00] text-white" },
    { label: "طلبات جديدة لم تُعالج", value: data.orders.filter((o) => o.status === "new").length, color: "bg-[#FFC145] text-[#071D3B]" },
    { label: "أصناف غير متاحة", value: data.products.filter((p) => !p.isAvailable).length, color: "bg-[#071D3B] text-white" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-5 shadow-xs`}>
            <div className="text-sm opacity-85 font-bold">{s.label}</div>
            <div className="text-2xl font-black mt-2">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-5 lg:col-span-2">
          <div className="flex justify-between mb-3">
            <h3 className="font-black text-[#0B2D5C]">آخر الطلبات</h3>
            <button onClick={() => goto("orders")} className="text-[#FF6A00] text-sm font-bold cursor-pointer">
              الكل
            </button>
          </div>
          {data.orders.length === 0 ? (
            <p className="text-[#071D3B]/55 text-sm">لسه مفيش طلبات مسجلة.</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {data.orders.slice(0, 8).map((o) => (
                  <tr key={o.id} className="border-t border-[#0B2D5C]/10">
                    <td className="py-2 font-bold font-en text-[#0B2D5C]">{o.orderNumber}</td>
                    <td>{o.customerName}</td>
                    <td className="hidden sm:table-cell text-[#071D3B]/60">
                      {data.branches.find((b) => b.id === o.branchId)?.name}
                    </td>
                    <td className="font-bold">{formatPrice(o.total)}</td>
                    <td>
                      <span className="text-xs bg-[#FFF5E8] border border-[#0B2D5C]/15 px-2.5 py-0.5 rounded-full font-bold text-[#0B2D5C]">
                        {statusLabels[o.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-black text-[#0B2D5C] mb-3">طلبات النهارده حسب الفرع</h3>
            {byBranch.map(({ b, n }) => (
              <div key={b.id} className="flex justify-between text-sm py-1">
                <span>{b.name}</span>
                <b>{n}</b>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <h3 className="font-black text-[#0B2D5C] mb-3">الأصناف الأكثر طلباً</h3>
            {top.length === 0 ? (
              <p className="text-sm text-[#071D3B]/55">هتظهر هنا بعد أول طلبات.</p>
            ) : (
              top.map(([n, q]) => (
                <div key={n} className="flex justify-between text-sm py-1">
                  <span>{n}</span>
                  <b>{q}</b>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
