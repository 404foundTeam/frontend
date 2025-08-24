import styles from "../styles/cardnews/SelectHeader.module.css";
import categoryImg from "../assets/cardnews/category.png";

function SelectHeader({ text }) {
  return (
    <>
      <div className={styles.container}>
        <img src={categoryImg} className={styles.ico} />
        <div className={styles.title}>{text}</div>
      </div>
    </>
  );
}

export default SelectHeader;
