"use client";

import { useState } from "react";
import type { TabProps } from "./AdminDashboard";
import { api, deleteItem, Field, saveItem } from "./ui";

export default function SettingsTab({ data, reload, notify }: TabProps) {
  const [s, setS] = useState(data.settings);
  const [pw, setPw] = useState("");
  const [review, setReview] = useState({ name: "", text: "", rating: 5 });

  const save = async () => {
    try {
      await api("/api/admin/settings", "PUT", {
        ...s,
        newUsername: s.adminUsername,
        newPassword: pw || undefined,
      });
      setPw("");
      notify("تم حفظ إعدادات مطعم جيمي كوك");
      reload();
    } catch (e) {
      notify((e as Error).message);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <div className="card p-5 space-y-3">
        <h3 className="font-black text-[#0B2D5C]">روابط مطعم جيمي كوك الرسمية</h3>
        <Field label="فيسبوك">
          <input
            className="input"
            dir="ltr"
            value={s.facebook}
            onChange={(e) => setS({ ...s, facebook: e.target.value })}
          />
        </Field>
        <Field label="إنستغرام">
          <input
            className="input"
            dir="ltr"
            value={s.instagram}
            onChange={(e) => setS({ ...s, instagram: e.target.value })}
          />
        </Field>
        <Field label="تيك توك">
          <input
            className="input"
            dir="ltr"
            value={s.tiktok}
            onChange={(e) => setS({ ...s, tiktok: e.target.value })}
          />
        </Field>
        <Field label="البريد الإلكتروني الرسمي">
          <input
            className="input"
            dir="ltr"
            value={s.email ?? ""}
            onChange={(e) => setS({ ...s, email: e.target.value })}
          />
        </Field>
        <h3 className="font-black text-[#0B2D5C] pt-3">بيانات دخول لوحة التحكم</h3>
        <Field label="اسم المستخدم">
          <input
            className="input"
            dir="ltr"
            value={s.adminUsername ?? "admin"}
            onChange={(e) => setS({ ...s, adminUsername: e.target.value })}
          />
        </Field>
        <Field label="كلمة مرور جديدة (اتركها فاضية لو مش عايز تغيرها)">
          <input
            type="password"
            className="input"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </Field>
        <button onClick={save} className="btn btn-primary">
          حفظ الإعدادات
        </button>
      </div>

      <div className="card p-5 space-y-3">
        <h3 className="font-black text-[#0B2D5C]">آراء العملاء المعروضة في الرئيسية</h3>
        {data.reviews.map((r) => (
          <div key={r.id} className="flex gap-3 items-start border-b border-[#0B2D5C]/10 pb-2">
            <div className="flex-1 text-sm">
              <b>{r.name}</b> ({r.rating}/5) — {r.text}
            </div>
            <button
              onClick={async () => {
                await deleteItem("reviews", r.id);
                reload();
              }}
              className="text-[#CE2F08] text-sm font-bold cursor-pointer"
            >
              حذف
            </button>
          </div>
        ))}
        <div className="grid grid-cols-[1fr_90px] gap-2">
          <input
            className="input"
            placeholder="اسم العميل والمنطقة"
            value={review.name}
            onChange={(e) => setReview({ ...review, name: e.target.value })}
          />
          <select
            className="input"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            {[5, 4, 3].map((n) => (
              <option key={n} value={n}>
                {n}/5
              </option>
            ))}
          </select>
        </div>
        <textarea
          className="input"
          rows={2}
          placeholder="رأي العميل"
          value={review.text}
          onChange={(e) => setReview({ ...review, text: e.target.value })}
        />
        <button
          onClick={async () => {
            if (!review.name || !review.text) return;
            await saveItem("reviews", review);
            setReview({ name: "", text: "", rating: 5 });
            notify("تمت الإضافة");
            reload();
          }}
          className="btn btn-teal"
        >
          إضافة رأي
        </button>
      </div>
    </div>
  );
}
