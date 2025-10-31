import styles from "../../styles/auth/StoreInfo.module.css";

function StoreInfo({
  label,
  flex = "20%",
  value,
  width = "300px",
  isBlur,
  isName,
  isReq = false,
  isFilled = false,
  onClick,
}) {
  let displayValue = value;

  // 사업자등록번호 하이픈 추가
  if (label === "사업자등록번호" && value) {
    displayValue = `${value.substring(0, 3)}-${value.substring(
      3,
      5
    )}-${value.substring(5, 10)}`;
  }

  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${isBlur ? styles.blur : ""}`}
        style={{ width: flex }}
      >
        {label}
        {isReq ? <span>*</span> : ""}
      </label>
      <div
        className={`${styles.box} ${value ? styles.active : ""} ${
          isFilled ? styles.storeName : ""
        } ${isBlur ? styles.blur : ""}`}
        style={{ maxWidth: width }}
      >
        {displayValue}
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
