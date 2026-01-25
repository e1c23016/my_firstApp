export type Budget = {
  code: string;
  name: string;
};

export async function fetchBudgets(): Promise<Budget[]> {
  const params = new URLSearchParams({
    endpoint: "budget",
  });

  const url = `/api/hotpepper?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Budget API エラー: HTTP ${res.status}`);
  }

  const data = await res.json();

  return data.results.budget as Budget[];
}
