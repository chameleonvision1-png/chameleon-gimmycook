import { NextResponse } from "next/server";
import { ADMIN_COOKIE, currentToken, isAdmin, sanitizeDeep, verifySameOrigin } from "@/lib/auth";
import { updateDB } from "@/lib/db";
import type { Settings } from "@/lib/types";

const ALLOWED_KEYS: (keyof Omit<Settings, "adminPassword" | "adminUsername">)[] = [
  "brandName",
  "email",
  "facebook",
  "instagram",
  "tiktok",
  "linktree",
  "talabat",
  "menuPdfUrl",
  "orderPhones",
  "complaintsWhatsapp",
  "taxId",
];

export async function PUT(req: Request) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json({ error: "forbidden origin" }, { status: 403 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const raw = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }

  const body = sanitizeDeep(raw) as Partial<Settings> & {
    newPassword?: string;
    newUsername?: string;
  };
  const { newPassword, newUsername } = body;

  if (newPassword && newPassword.length < 8) {
    return NextResponse.json(
      { error: "كلمة المرور لازم تكون 8 حروف أو أرقام على الأقل" },
      { status: 400 },
    );
  }
  if (newUsername !== undefined && newUsername.trim().length > 0 && newUsername.trim().length < 3) {
    return NextResponse.json(
      { error: "اسم المستخدم لازم يكون 3 حروف على الأقل" },
      { status: 400 },
    );
  }

  const safeUpdates: Record<string, unknown> = {};
  for (const key of ALLOWED_KEYS) {
    if (key in body && body[key] !== undefined) {
      safeUpdates[key] = body[key];
    }
  }

  await updateDB((db) => {
    db.settings = { ...db.settings, ...(safeUpdates as Partial<Settings>) };
    if (newPassword) db.settings.adminPassword = newPassword;
    if (newUsername?.trim()) db.settings.adminUsername = newUsername.trim();
  });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, await currentToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
