import { useEffect, useState, useCallback } from "react";
import styles from "./styles/App.module.css";
import { Pagination } from "./components/Pagination";
import { ShopModal } from "./components/ShopModal";
import { ShopList } from "./components/ShopList";
import { SearchForm } from "./components/SearchForm";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { Shop } from "./types";
import { useSearchForm } from "./hooks/useSearchForm";
import { usePagination } from "./hooks/usePagination";
import { useShopSearch } from "./hooks/useShopSearch";

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

  const { allShops, loading, errorMsg, hasSearched, search } = useShopSearch();

  const {
    page,
    setPage,
    maxPage,
    currentItems: shops,
  } = usePagination(allShops, 10);

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const handleSearch = useCallback(() => {
    setPage(1);
    search(range, genre, budget);
  }, [range, genre, budget, search, setPage]);

  useEffect(() => {
    setPage(1);
  }, [range, genre, budget, setPage]);

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
