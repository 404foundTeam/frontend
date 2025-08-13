import styles from "../styles/CardNewsHeader.module.css";
import categoryImg from "../assets/cardnews/category.png";

function CardNewsHeader({ text }) {
  return (
    <>
      <div className={styles.container}>
        <img src={categoryImg} className={styles.ico} />
        <div className={styles.title}>{text}</div>
      </div>
    </>
  );
}

export default CardNewsHeader;
