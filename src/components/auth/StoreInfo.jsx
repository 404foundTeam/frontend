import styles from "../../styles/auth/StoreInfo.module.css";

function StoreInfo({
  label,
  value,
  width = "480px",
  isName,
  isFilled = false,
  onClick,
}) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        className={`${styles.box} ${value ? styles.active : ""} ${
          isFilled ? styles.storeName : ""
        }`}
        style={{ maxWidth: width }}
      >
        {value}
      </div>
      {isName && (
        <button
          type="button"
          className={`${styles.btn} ${value ? styles.active : ""}`}
          onClick={onClick}
        >
          찾기
        </button>
      )}
    </div>
  );
}

export default StoreInfo;
