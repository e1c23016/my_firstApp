import styles from "../styles/Footer.module.css";

type Props = {
  text?: string;
};

export default function Footer({ text = "© 2026 ぱぱっとごはん" }: Props) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        Powered by{" "}
        <a href="http://webservice.recruit.co.jp/">
          ホットペッパーグルメ Webサービス
        </a>
        {text}
      </div>
    </footer>
  );
}
