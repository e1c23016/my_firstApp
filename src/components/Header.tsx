import styles from "../styles/Header.module.css";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function Header({
  title = "ぱぱっとごはん",
  subtitle = "現在地から近くのお店を探せる",
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <img src="../../logo-background.svg" alt="ロゴ" />

        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </header>
  );
}
