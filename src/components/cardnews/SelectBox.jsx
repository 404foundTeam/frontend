import styles from "../../styles/cardnews/SelectBox.module.css";

function SelectBox({ value, selected, onClick, label }) {
  return (
    <>
      <div
        className={`${styles.container} ${styles[value] || ""}`}
        onClick={onClick}
      >
        <div className={`${styles.box} ${selected ? styles.select : ""}`}></div>
        <p className={styles.title}>{label}</p>
      </div>
    </>
  );
}

export default SelectBox;
