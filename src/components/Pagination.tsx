type Props = {
  page: number;
  maxPage: number;
  loading: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ page, maxPage, loading, onPrev, onNext }: Props) {
  return (
    <div>
      <button disabled={loading || page <= 1} onClick={onPrev}>
        前へ
      </button>

      <span>
        {page} / {maxPage}
      </span>

      <button disabled={loading || page >= maxPage} onClick={onNext}>
        次へ
      </button>
    </div>
  );
}
