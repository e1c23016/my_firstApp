import { useEffect, useState } from "react";
import "./App.css";
import { getPosition } from "./api/getPositions";
import { searchShops } from "./api/getShopLists";
import { Pagination } from "./components/Pagination";
import { ShopModal } from "./components/ShopModal";
import { ShopList } from "./components/ShopList";
import { SearchForm } from "./components/SearchForm";
import type { Range, Shop } from "./types";

function App() {
  const [range, setRange] = useState<Range>(3);
  const [genre, setGenre] = useState<string>(""); // 未選択は ""
  const [budget, setBudget] = useState<string>(""); // 未選択は ""

  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [resultsAvailable, setResultsAvailable] = useState(0);
  const maxPage = Math.max(1, Math.ceil(resultsAvailable / pageSize));
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setErrorMsg("");
    setLoading(true);
    setHasSearched(true);

    try {
      const { lat, lng } = await getPosition();

      const data = await searchShops({
        lat,
        lng,
        range,
        genre: genre || undefined,
        budget: budget || undefined,
        page,
        pageSize,
      });

      setShops(data.results.shop as Shop[]);
      setResultsAvailable(Number(data.results.results_available ?? 0));
    } catch (e: unknown) {
      console.error(e);
      setErrorMsg("検索に失敗しました"); // 権限/CORS/proxy/キーを確認
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    // setHasSearched(false); // 条件変えたら再検索フラグをリセット、あった方が親切なのか疑問なので今はコメントアウトする
  }, [range, genre, budget]);

  useEffect(() => {
    // まだ検索してない状態(shops空)で page だけ変わっても打たないようにする
    if (shops.length === 0) return;
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedShop(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <h1>ぱぱっとごはん</h1>

      {/*  入力フォーム  */}
      <SearchForm
        range={range}
        setRange={setRange}
        genre={genre}
        setGenre={setGenre}
        budget={budget}
        setBudget={setBudget}
        loading={loading}
        errorMsg={errorMsg}
        onSearch={handleSearch}
      />

      {/*  一覧表示  */}
      <hr style={{ margin: "24px 0" }} />

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
        <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
    </>
  );
}

export default App;
