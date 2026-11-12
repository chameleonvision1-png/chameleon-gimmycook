import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { buildSeed } from "./seed";
import type { DB } from "./types";

const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "gimmycook-data")
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const STORE_ROW_ID = "gimmycook";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

let queue: Promise<unknown> = Promise.resolve();
let memoryCache: { db: DB; ts: number } | null = null;
const CACHE_TTL_MS = 1500;

function ensureLocal() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(buildSeed(), null, 2), "utf8");
  }
}

function readLocalDB(): DB {
  ensureLocal();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
}

function writeLocalDB(db: DB) {
  ensureLocal();
  const tmp = DB_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2), "utf8");
  fs.renameSync(tmp, DB_FILE);
}

async function readSupabaseDB(): Promise<DB | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/alban_store?id=eq.${STORE_ROW_ID}&select=data`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const rows = (await res.json()) as { data?: DB }[];
    if (Array.isArray(rows) && rows.length > 0 && rows[0]?.data) {
      return rows[0].data;
    }
    const seed = readLocalDB();
    await writeSupabaseDB(seed);
    return seed;
  } catch {
    return null;
  }
}

async function writeSupabaseDB(db: DB): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/alban_store?on_conflict=id`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify([
        {
          id: STORE_ROW_ID,
          data: db,
          updated_at: new Date().toISOString(),
        },
      ]),
      cache: "no-store",
    });
  } catch {
    // Fallback silently so local writes still succeed
  }
}

export async function readDB(forceFresh = false): Promise<DB> {
  if (!forceFresh && memoryCache && Date.now() - memoryCache.ts < CACHE_TTL_MS) {
    return structuredClone(memoryCache.db);
  }
  const remote = await readSupabaseDB();
  if (remote) {
    memoryCache = { db: remote, ts: Date.now() };
    return structuredClone(remote);
  }
  const local = readLocalDB();
  memoryCache = { db: local, ts: Date.now() };
  return local;
}

export function updateDB<T>(fn: (db: DB) => T): Promise<T> {
  const run = queue.then(async () => {
    const db = await readDB(true);
    const result = fn(db);
    memoryCache = { db: structuredClone(db), ts: Date.now() };
    try {
      writeLocalDB(db);
    } catch {
      // Ignore local write errors on read-only FS
    }
    await writeSupabaseDB(db);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

/** Cryptographically random unique ID (64-bit hex entropy + timestamp). */
export function uid(prefix = "") {
  return prefix + Date.now().toString(36) + crypto.randomBytes(8).toString("hex");
}

/** Public-safe view (strips admin credentials completely). */
export async function publicDB() {
  const db = await readDB();
  const { adminPassword: _pw, adminUsername: _u, ...settings } = db.settings;
  void _pw;
  void _u;
  const now = Date.now();
  return {
    settings,
    branches: db.branches
      .filter((b) => b.isActive)
      .map((b) => ({
        ...b,
        services: b.services.map((s) =>
          s.includes("POINTS") ? "تغليف حراري يحفظ السخونة" : s,
        ),
      })),
    categories: [...db.categories].sort((a, b) => a.sortOrder - b.sortOrder),
    products: db.products,
    offers: db.offers
      .filter(
        (o) =>
          o.isActive &&
          new Date(o.startsAt).getTime() <= now &&
          new Date(o.endsAt).getTime() >= now,
      )
      .map((o) => ({
        ...o,
        terms: o.terms.includes("POINTS") || o.terms.includes("رصيد مكافآت")
          ? "متاح دليفري 24 ساعة وتيك أواي في جميع مناطق التغطية"
          : o.terms,
      })),
    reviews: db.reviews.map((r) => ({
      ...r,
      text: r.text.includes("POINTS")
        ? "صينية المشويات مع الفطير المشكل شرفونا في عزومة العيلة، والأكل وصل سخن وفي معاده بالثانية."
        : r.text,
    })),
  };
}

export type PublicData = Awaited<ReturnType<typeof publicDB>>;
