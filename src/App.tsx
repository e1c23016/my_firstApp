import { useEffect, useState } from "react";
import "./App.css";
import { getPosition } from "./getPositions";
import { searchShops } from "./getShopLists";
import { Pagination } from "./components/Pagination";
import { ShopModal } from "./components/ShopModal";
import { ShopList } from "./components/ShopList";
import type { Shop } from "./types";

type Range = 1 | 2 | 3 | 4 | 5;

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

  const handleSearch = async () => {
    setErrorMsg("");
    setLoading(true);

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

      {/* 2) 入力フォーム */}
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
            <option value="B009">～1000円</option>
            <option value="B010">1001～1500円</option>
            <option value="B011">1501～2000円</option>
            <option value="B001">2001～3000円</option>
          </select>
        </label>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "検索中..." : "現在地で検索"}
        </button>

        {errorMsg && <p style={{ color: "crimson" }}>{errorMsg}</p>}
      </section>

      {/* 3) 一覧表示 */}
      <hr style={{ margin: "24px 0" }} />

      <h2>検索結果</h2>
      {shops.length === 0 && !loading ? (
        <p>まだ検索してないよ</p>
      ) : (
        <ShopList shops={shops} onSelect={(shop) => setSelectedShop(shop)} />
      )}

      {/* 4) ページャー */}
      <Pagination
        page={page}
        maxPage={maxPage}
        loading={loading}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(maxPage, p + 1))}
      />

      {/* 5) モーダル */}
      {selectedShop && (
        <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} />
      )}
    </>
  );
}

export default App;
