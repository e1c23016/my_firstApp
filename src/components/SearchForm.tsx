import type { Range } from "../types";
import type { Budget } from "../apis/getBudgets";
import type { Genre } from "../apis/getGenres";

type Props = {
  range: Range;
  setRange: (range: Range) => void;

  genre: string;
  setGenre: (genre: string) => void;

  genres: Genre[];

  budget: string;
  setBudget: (budget: string) => void;

  budgets: Budget[];

  loading: boolean;
  errorMsg: string;

  onSearch: () => void;
};

export function SearchForm({
  range,
  setRange,
  genre,
  setGenre,
  genres,
  budget,
  setBudget,
  budgets,
  loading,
  errorMsg,
  onSearch,
}: Props) {
  const RANGE_OPTIONS = [
    { value: 1, label: "300m(徒歩約4分以内の距離)" },
    { value: 2, label: "500m(徒歩約7分以内の距離)" },
    { value: 3, label: "1000m(徒歩約15分以内の距離)" },
    { value: 4, label: "2000m(徒歩約30分以内の距離)" },
    { value: 5, label: "3000m(徒歩約45分以内の距離)" },
  ] as const;

  return (
    <section style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <label>
        検索半径：
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value) as Range)}
        >
          {RANGE_OPTIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        ジャンル：
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">指定なし</option>
          {genres.map((g) => (
            <option key={g.code} value={g.code}>
              {g.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        予算：
        <select value={budget} onChange={(e) => setBudget(e.target.value)}>
          <option value="">指定なし</option>
          {budgets.map((b) => (
            <option key={b.code} value={b.code}>
              {b.name}
            </option>
          ))}
        </select>
      </label>

      <button onClick={onSearch} disabled={loading}>
        {loading ? "検索中..." : "現在地で検索"}
      </button>

      {errorMsg && <p style={{ color: "crimson" }}>{errorMsg}</p>}
    </section>
  );
}
