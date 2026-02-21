import { useState } from "react";

// comment:T使うとどんな方にも対応できるようになるらしい
export function usePagination<T>(items: T[], pageSize: number = 10) {
  const [page, setPage] = useState(1);

  const resultsAvailable = items.length;
  const maxPage = Math.max(1, Math.ceil(resultsAvailable / pageSize));

  const currentItems = items.slice((page - 1) * pageSize, page * pageSize);

  return {
    page,
    setPage,
    maxPage,
    currentItems,
  };
}
