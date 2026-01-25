import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const key = process.env.HOTPEPPER_API_KEY;
  if (!key) {
    return res.status(500).json({ message: "HOTPEPPER_API_KEY missing" });
  }

  const params = new URLSearchParams({
    ...req.query,
    key,
    format: "json",
  } as Record<string, string>);

  const endpoint = req.query.endpoint as string;
  if (!endpoint) {
    return res.status(400).json({ message: "endpoint is required" });
  }

  const url = `https://webservice.recruit.co.jp/hotpepper/${endpoint}/v1/?${params.toString()}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(response.status).json(data);
}
