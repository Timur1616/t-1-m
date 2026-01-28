import { kv } from "@vercel/kv";
import { DEFAULT_DATA } from "./defaultData";
import type { LinkBioData } from "./types";

const KEY = "linkbio:data";

export async function getData(): Promise<LinkBioData> {
  const existing = await kv.get<LinkBioData>(KEY);
  if (existing && typeof existing === "object") return existing;
  await kv.set(KEY, DEFAULT_DATA);
  return DEFAULT_DATA;
}

export async function setData(data: LinkBioData): Promise<void> {
  await kv.set(KEY, data);
}
