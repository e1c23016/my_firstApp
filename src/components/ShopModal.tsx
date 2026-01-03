import type { Shop } from "../types";

type Props = {
  shop: Shop | null;
  onClose: () => void;
};

export function ShopModal({ shop, onClose }: Props) {
  return (
    <div
      onClick={onClose}
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
          <h3>{shop?.name}</h3>
          <button onClick={onClose}>閉じる</button>
        </div>

        <img
          src={
            shop?.photo?.pc?.l || shop?.photo?.pc?.m || shop?.photo?.pc?.s || ""
          }
          alt={shop?.name}
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
            {shop?.address || "情報なし"}
          </p>
          <p>
            <strong>営業時間：</strong>
            {shop?.open || "情報なし"}
          </p>
          <p>
            <strong>アクセス：</strong>
            {shop?.access}
          </p>
        </div>
      </div>
    </div>
  );
}
