import { useState, useCallback } from "react";
import { getPosition } from "../apis/getPositions";
import { searchShops } from "../apis/getShopLists";
import type { Range, Shop } from "../types";

export function useShopSearch() {
  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const search = useCallback(
    async (range: Range, genre: string, budget: string) => {
      setErrorMsg("");
      setLoading(true);
      setHasSearched(true);

      try {
        const { lat, lng } = await getPosition();
        console.log({ lat, lng });

        const data = await searchShops({
          lat,
          lng,
          range,
          genre: genre || undefined,
          budget: budget || undefined,
          page: 1,
          pageSize: 100,
        });

        setAllShops(data.results.shop as Shop[]);
        console.log(data);
        console.log(data.results.shop);
      } catch (e: unknown) {
        console.error(e);
        setErrorMsg("検索に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    allShops,
    loading,
    errorMsg,
    hasSearched,
    search,
  };
}
