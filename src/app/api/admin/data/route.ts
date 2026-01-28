import { NextResponse } from "next/server";
import { isAuthed } from "../../../../lib/auth";
import { getData } from "../../../../lib/storage";

export async function GET() {
  const ok = await isAuthed();
  if (!ok) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getData());
}
