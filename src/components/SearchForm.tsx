import type { Range } from "../types";
import type { Budget } from "../apis/getBudgets";
import type { Genre } from "../apis/getGenres";
import styles from "../styles/SearchForm.module.css";

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
    <section className={styles.card}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>検索半径</span>
          <select
            className={styles.select}
            value={range}
            onChange={(e) => setRange(Number(e.target.value) as Range)}
          >
            {RANGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>ジャンル</span>
          <select
            className={styles.select}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">指定なし</option>
            {genres.map((g) => (
              <option key={g.code} value={g.code}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span className={styles.label}>予算</span>
          <select
            className={styles.select}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">指定なし</option>
            {budgets.map((b) => (
              <option key={b.code} value={b.code}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        <button className={styles.button} onClick={onSearch} disabled={loading}>
          {loading ? "検索中..." : "現在地で検索"}
        </button>
      </div>

      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </section>
  );
}
