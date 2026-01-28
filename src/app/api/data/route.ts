import { NextResponse } from "next/server";
import { getData } from "../../../lib/storage";

export async function GET() {
  return NextResponse.json(await getData());
}
