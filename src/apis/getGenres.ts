export type Genre = {
  code: string;
  name: string;
};

export async function fetchGenres(): Promise<Genre[]> {
  const hotpepperApiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;
  if (!hotpepperApiKey) throw new Error("VITE_HOTPEPPER_API_KEY が未設定です");

  const params = new URLSearchParams({
    key: String(hotpepperApiKey),
    format: "json",
  });

  const url = `/hotpepper/hotpepper/genre/v1/?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Genre API エラー: HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.results.genre as Genre[];
}
