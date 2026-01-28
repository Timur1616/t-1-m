import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "kirka_admin";
const TTL_SECONDS = 60 * 60 * 24 * 7;

function secretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET || "";
  if (!s || s.length < 16) throw new Error("AUTH_SECRET is missing/too short.");
  return new TextEncoder().encode(s);
}

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export async function setAuthCookie(): Promise<void> {
  const jwt = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + TTL_SECONDS)
    .sign(secretKey());

  cookies().set(COOKIE_NAME, jwt, { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: TTL_SECONDS });
}

export function clearAuthCookie(): void {
  cookies().set(COOKIE_NAME, "", { httpOnly: true, sameSite: "lax", secure: true, path: "/", maxAge: 0 });
}

export async function isAuthed(): Promise<boolean> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  try { await jwtVerify(token, secretKey()); return true; } catch { return false; }
}
