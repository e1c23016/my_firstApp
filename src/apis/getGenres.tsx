export type Genre = {
  code: string;
  name: string;
};

export async function fetchGenres(): Promise<Genre[]> {
  const params = new URLSearchParams({
    endpoint: "genre",
  });

  const url = `/api/hotpepper?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Genre API エラー: HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.results.genre as Genre[];
}
