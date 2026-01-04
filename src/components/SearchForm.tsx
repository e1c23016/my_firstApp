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
  return (
    <section style={{ display: "grid", gap: 12, maxWidth: 520 }}>
      <label>
        検索半径：
        <select
          value={range}
          onChange={(e) => setRange(Number(e.target.value) as Range)}
        >
          <option value={1}>300m</option>
          <option value={2}>500m</option>
          <option value={3}>1000m（初期）</option>
          <option value={4}>2000m</option>
          <option value={5}>3000m</option>
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
