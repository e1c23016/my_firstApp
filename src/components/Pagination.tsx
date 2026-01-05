import styles from "../styles/Pagination.module.css";

type Props = {
  page: number;
  maxPage: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, maxPage, loading, onPrev, onNext }: Props) {
  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        disabled={loading || page <= 1}
        onClick={onPrev}
      >
        前へ
      </button>

      <span className={styles.page}>
        {page}/{maxPage}
      </span>

      <button
        className={styles.button}
        disabled={loading || page >= maxPage}
        onClick={onNext}
      >
        次へ
      </button>
    </div>
  );
}
