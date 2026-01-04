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
  const hotpepperApiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;
  if (!hotpepperApiKey) throw new Error("VITE_HOTPEPPER_API_KEY が未設定です");

  const pageSize = paramsIn.pageSize ?? 10;
  const page = paramsIn.page ?? 1;
  const start = (page - 1) * pageSize + 1;

  const params = new URLSearchParams({
    key: String(hotpepperApiKey),
    format: "json",
    lat: String(paramsIn.lat),
    lng: String(paramsIn.lng),
    range: String(paramsIn.range),
    count: String(pageSize),
    start: String(start),
  });

  if (paramsIn.genre) params.set("genre", paramsIn.genre);
  if (paramsIn.budget) params.set("budget", paramsIn.budget);

  // proxy経由でアクセスする
  const url = `/hotpepper/hotpepper/gourmet/v1/?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  console.log("リクエストURL:", url);

  return res.json();
}
