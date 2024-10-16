import { kv } from "@vercel/kv";
import { NextApiRequest, NextApiResponse } from "next";
import { HANDBOOK_DATA_KEY } from "@/handbook/scrape";
import { Handbook } from "@/handbook/types";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const handbook = await kv.get<Handbook>(HANDBOOK_DATA_KEY);
  if (!handbook) {
    throw new Error("unable to get handbook data");
  }
  res.status(200).json(handbook);
}
