import type { Shop } from "../types";
import styles from "../styles/ShopModal.module.css";

type Props = {
  shop: Shop | null;
  onClose: () => void;
};

export function ShopModal({ shop, onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="閉じる">
          ×
        </button>
        <div className={styles.header}>
          <h3>{shop?.name}</h3>
        </div>

        <img
          src={
            shop?.photo?.pc?.l || shop?.photo?.pc?.m || shop?.photo?.pc?.s || ""
          }
          alt={shop?.name}
          className={styles.image}
        />

        <div className={styles.body}>
          <div className={styles.row}>
            <span className={styles.key}>住所：</span>
            <span className={styles.value}>{shop?.address || "情報なし"}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.key}>営業時間：</span>
            <span className={styles.value}>{shop?.open || "情報なし"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.key}>アクセス：</span>
            <span className={styles.value}>{shop?.access || "情報なし"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
