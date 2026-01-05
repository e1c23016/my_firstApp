import type { Shop } from "../types";
import styles from "../styles/ShopList.module.css";

type Props = {
  shops: Shop[];
  onSelect: (shop: Shop) => void;
};

export function ShopList({ shops, onSelect }: Props) {
  return (
    <ul className={styles.list}>
      {shops.map((shop) => (
        <li key={shop.id}>
          <button className={styles.card} onClick={() => onSelect(shop)}>
            <img
              className={styles.thumb}
              src={shop.photo?.pc?.l || ""}
              alt={shop.name}
            />
            <div className={styles.content}>
              <div className={styles.name}>{shop.name}</div>
              <div className={styles.access}>{shop.access}</div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
