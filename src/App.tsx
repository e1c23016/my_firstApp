import { useEffect, useState, useCallback } from "react";
import styles from "./styles/App.module.css";
import { getPosition } from "./apis/getPositions";
import { searchShops } from "./apis/getShopLists";
import { useSearchForm } from "./hooks/useSearchForm";
import { Pagination } from "./components/Pagination";
import { ShopModal } from "./components/ShopModal";
import { ShopList } from "./components/ShopList";
import { SearchForm } from "./components/SearchForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { Shop } from "./types";
import { usePagination } from "./hooks/usePagination";

function App() {
  const {
    range,
    setRange,
    genre,
    setGenre,
    budget,
    setBudget,
    budgets,
    genres,
  } = useSearchForm();

  const [allShops, setAllShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    page,
    setPage,
    maxPage,
    currentItems: shops,
  } = usePagination(allShops, 10);

  const handleSearch = useCallback(async () => {
    setErrorMsg("");
    setLoading(true);
    setHasSearched(true);
    setPage(1);

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
      setErrorMsg("検索に失敗しました"); // 権限/CORS/proxy/キーを確認
    } finally {
      setLoading(false);
    }
  }, [range, genre, budget]);

  useEffect(() => {
    setPage(1);
    // setHasSearched(false); // 条件変えたら再検索フラグをリセット、あった方が親切なのか疑問なので今はコメントアウトする
  }, [range, genre, budget]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedShop(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/*  入力フォーム  */}
        <SearchForm
          range={range}
          setRange={setRange}
          genre={genre}
          setGenre={setGenre}
          genres={genres}
          budget={budget}
          setBudget={setBudget}
          budgets={budgets}
          loading={loading}
          errorMsg={errorMsg}
          onSearch={handleSearch}
        />

        {/*  一覧表示  */}

        <h2>検索結果</h2>
        {!hasSearched && !loading ? (
          <p>
            まだ検索していません、検索条件を入れて現在地で検索ボタンを押してください
          </p>
        ) : shops.length === 0 && !loading ? (
          <p>お店が見つかりませんでした</p>
        ) : (
          <ShopList shops={shops} onSelect={(shop) => setSelectedShop(shop)} />
        )}

        {/* ページング  */}
        {shops.length > 0 && (
          <Pagination
            page={page}
            maxPage={maxPage}
            loading={loading}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
          />
        )}

        {/* モーダル */}
        {selectedShop && (
          <ShopModal
            shop={selectedShop}
            onClose={() => setSelectedShop(null)}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
