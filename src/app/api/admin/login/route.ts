import { NextResponse } from "next/server";
import { verifyPassword, setAuthCookie } from "../../../../lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = String(body?.password || "");
  const ok = await verifyPassword(password);
  if (!ok) return NextResponse.json({ message: "Неверный пароль." }, { status: 401 });
  await setAuthCookie();
  return NextResponse.json({ ok: true });
}
