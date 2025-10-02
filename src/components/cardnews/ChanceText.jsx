import styles from "../../styles/cardnews/ChanceText.module.css";

function ChanceText({ chance }) {
  return (
    <p className={styles.chance}>
      이번 달 무료 횟수 <span className={styles.point}>{chance}회</span>{" "}
      남았어요.
    </p>
  );
}

export default ChanceText;
