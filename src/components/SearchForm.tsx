import type { Range } from "../types";
import type { Budget } from "../api/getBudgets";

type Props = {
  range: Range;
  setRange: (range: Range) => void;

  genre: string;
  setGenre: (genre: string) => void;

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
          <option value="G001">居酒屋</option>
          <option value="G002">ダイニングバー</option>
          <option value="G003">オリジナル料理</option>
          <option value="G004">和食</option>
          <option value="G005">洋食</option>
          <option value="G006">イタリアン・フレンチ</option>
          <option value="G007">中華</option>
          <option value="G008">焼肉</option>
          <option value="G009">韓国料理</option>
          <option value="G010">アジア・エスニック料理</option>
          <option value="G011">各国料理</option>
          <option value="G012">カラオケ・パーティ</option>
          <option value="G013">ラーメン</option>
          <option value="G014">カフェ</option>
          {/* その他の項目はなしにした */}
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
