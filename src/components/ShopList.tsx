import type { Shop } from "../types";

type Props = {
  shops: Shop[];
  onSelect: (shop: Shop) => void;
};

export function ShopList({ shops, onSelect }: Props) {
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
      {shops.map((shop) => (
        <li key={shop.id} onClick={() => onSelect(shop)}>
          <img
            src={shop.photo?.pc?.s || ""}
            alt={shop.name}
            width={96}
            height={96}
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
  );
}
