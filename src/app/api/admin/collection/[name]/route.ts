import { NextResponse } from "next/server";
import { isAdmin, sanitizeDeep, verifySameOrigin } from "@/lib/auth";
import { uid, updateDB } from "@/lib/db";
import type { DB } from "@/lib/types";

const allowed = [
  "products",
  "categories",
  "offers",
  "branches",
  "reviews",
  "orders",
  "occasions",
] as const;
type Coll = (typeof allowed)[number];

async function guard(req: Request, name: string) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json({ error: "forbidden origin" }, { status: 403 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!allowed.includes(name as Coll)) {
    return NextResponse.json({ error: "unknown collection" }, { status: 404 });
  }
  return null;
}

/** Upsert an item (full object or partial with id). */
export async function PUT(
  req: Request,
  ctx: RouteContext<"/api/admin/collection/[name]">,
) {
  const { name } = await ctx.params;
  const bad = await guard(req, name);
  if (bad) return bad;

  const raw = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const item = sanitizeDeep(raw as Record<string, unknown>) as { id?: string };
  const saved = await updateDB((db) => {
    const list = db[name as Coll] as unknown as { id: string }[];
    if (!item.id || typeof item.id !== "string" || item.id.length > 80) {
      item.id = uid(name.slice(0, 2) + "_");
    }
    const idx = list.findIndex((x) => x.id === item.id);
    if (idx >= 0) list[idx] = { ...list[idx], ...item } as { id: string };
    else list.unshift(item as { id: string });
    return idx >= 0 ? list[idx] : item;
  });
  return NextResponse.json(saved);
}

export async function DELETE(
  req: Request,
  ctx: RouteContext<"/api/admin/collection/[name]">,
) {
  const { name } = await ctx.params;
  const bad = await guard(req, name);
  if (bad) return bad;

  const id = new URL(req.url).searchParams.get("id");
  if (!id || id.length > 80) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  await updateDB((db: DB) => {
    (db as unknown as Record<string, { id: string }[]>)[name] = (
      db[name as Coll] as unknown as { id: string }[]
    ).filter((x) => x.id !== id);
  });
  return NextResponse.json({ ok: true });
}
