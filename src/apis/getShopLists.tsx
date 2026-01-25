type Range = 1 | 2 | 3 | 4 | 5;

export async function searchShops(paramsIn: {
  lat: number;
  lng: number;
  range: Range;
  genre?: string;
  budget?: string;
  page?: number;
  pageSize?: number;
}) {
  const pageSize = paramsIn.pageSize ?? 10;
  const page = paramsIn.page ?? 1;
  const start = (page - 1) * pageSize + 1;

  const params = new URLSearchParams({
    endpoint: "gourmet",
    format: "json",
    lat: String(paramsIn.lat),
    lng: String(paramsIn.lng),
    range: String(paramsIn.range),
    count: String(pageSize),
    start: String(start),
  });

  if (paramsIn.genre) params.set("genre", paramsIn.genre);
  if (paramsIn.budget) params.set("budget", paramsIn.budget);

  const url = `/api/hotpepper?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  console.log("リクエストURL:", url);

  return res.json();
}
