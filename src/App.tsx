import { useEffect, useState } from "react";
import "./App.css";
import { getPosition } from "./getPositions";
import { searchShops } from "./getShopLists";

type Range = 1 | 2 | 3 | 4 | 5;

type Shop = {
  id: string;
  name: string;
  access: string;
  address?: string;
  open?: string;
  photo?: {
    pc?: {
      s?: string;
      m?: string;
      l?: string;
    };
  };
};

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
      setErrorMsg("検索に失敗、権限/CORS/proxy/キーを確認");
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
            <option value="G004">和食</option>
            <option value="G005">洋食</option>
            <option value="G006">イタリアン・フレンチ</option>
            <option value="G013">ラーメン</option>
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
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
          {shops.map((shop) => (
            <li
              key={shop.id}
              onClick={() => setSelectedShop(shop)}
              style={{
                display: "grid",
                gridTemplateColumns: "96px 1fr",
                gap: 12,
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 12,
                alignItems: "center",
              }}
            >
              <img
                src={shop.photo?.pc?.s || ""}
                alt={shop.name}
                width={96}
                height={96}
                style={{
                  objectFit: "cover",
                  borderRadius: 10,
                  background: "#f2f2f2",
                }}
                onError={(e) => {
                  // 画像が無い/壊れてる場合の保険
                  (e.currentTarget as HTMLImageElement).src = "";
                }}
              />
              <div>
                <div style={{ fontWeight: 700 }}>{shop.name}</div>
                <div style={{ opacity: 0.8 }}>{shop.access}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <button
          disabled={loading || page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          前へ
        </button>

        <span>
          {page} / {maxPage}
        </span>

        <button
          disabled={loading || page >= maxPage}
          onClick={() => setPage((p) => p + 1)}
        >
          次へ
        </button>
      </div>
      {selectedShop && (
        <div
          onClick={() => setSelectedShop(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(720px, 100%)",
              background: "#fff",
              borderRadius: 16,
              padding: 16,
              display: "grid",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{selectedShop.name}</h3>
              <button onClick={() => setSelectedShop(null)}>閉じる</button>
            </div>

            <img
              src={
                selectedShop.photo?.pc?.l ||
                selectedShop.photo?.pc?.m ||
                selectedShop.photo?.pc?.s ||
                ""
              }
              alt={selectedShop.name}
              style={{
                width: "100%",
                maxHeight: 360,
                objectFit: "cover",
                borderRadius: 12,
                background: "#f2f2f2",
              }}
            />

            <div>
              <p>
                <strong>住所：</strong>
                {selectedShop.address || "情報なし"}
              </p>
              <p>
                <strong>営業時間：</strong>
                {selectedShop.open || "情報なし"}
              </p>
              <p>
                <strong>アクセス：</strong>
                {selectedShop.access}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
