import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import { setData } from "../../../../lib/storage";

function isObj(v: any){ return v && typeof v === "object" && !Array.isArray(v); }

export async function POST(req: Request) {
  const ok = await isAuthed();
  if (!ok) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const data = body?.data;

  if (!isObj(data) || typeof data.nick !== "string" || !Array.isArray(data.links) || !isObj(data.stats)) {
    return NextResponse.json({ message: "Bad data format" }, { status: 400 });
  }

  await setData(data);
  return NextResponse.json({ ok: true });
}
