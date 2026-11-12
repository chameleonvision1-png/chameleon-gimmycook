import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { readDB } from "./db";

const COOKIE = "gimmycook_admin";
const RAW_SECRET =
  process.env.ADMIN_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "gimmycook-local-dev-secret-only";
const SECRET = crypto
  .createHash("sha256")
  .update(`gimmycook-session-v1:${RAW_SECRET}`)
  .digest("hex");

function sign(value: string) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHmac("sha256", SECRET).update(a).digest();
  const hb = crypto.createHmac("sha256", SECRET).update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

async function creds() {
  const db = await readDB();
  const s = db.settings;
  return {
    username: s.adminUsername || "admin",
    password: process.env.ADMIN_PASSWORD || s.adminPassword,
  };
}

export function makeToken(username: string, password: string) {
  return sign(`gimmycook-admin:${username}:${password}`);
}

export async function currentToken() {
  const c = await creds();
  return makeToken(c.username, c.password);
}

export async function checkCredentials(username: string, password: string) {
  const c = await creds();
  const userMatch = safeEqual(username.trim().toLowerCase(), c.username.toLowerCase());
  const passMatch = safeEqual(password, c.password);
  return userMatch && passMatch;
}

export async function isAdmin() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return false;
  const expected = await currentToken();
  return safeEqual(token, expected);
}

/**
 * CSRF Same-Origin Guard for state-changing admin routes.
 * Ensures cross-site requests cannot mutate admin state even with Lax cookies.
 */
export function verifySameOrigin(req: Request): boolean {
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  if (!host) return true;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host.toLowerCase() === host;
    } catch {
      return false;
    }
  }

  return process.env.NODE_ENV !== "production";
}

/**
 * Recursively strips prototype-pollution keys (`__proto__`, `constructor`, `prototype`)
 * across nested objects and arrays.
 */
export function sanitizeDeep<T>(input: T, depth = 0): T {
  if (depth > 12 || input === null || typeof input !== "object") return input;
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeDeep(item, depth + 1)) as unknown as T;
  }
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (k === "__proto__" || k === "constructor" || k === "prototype") continue;
    clean[k] = sanitizeDeep(v, depth + 1);
  }
  return clean as T;
}

export const ADMIN_COOKIE = COOKIE;
