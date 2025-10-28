import styles from "../../styles/auth/SignInput.module.css";

function SignInput({
  label,
  name,
  isReq = true,
  type,
  width = "480px",
  value,
  isCorrect = false,
  onChange,
  isStore = false,
}) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>
        {label}
        {isReq && <span>*</span>}
      </label>
      <input
        name={name}
        type={type}
        className={`${styles.input} ${value ? styles.active : ""} ${
          isCorrect ? styles.error : ""
        }`}
        style={{ maxWidth: width }}
        value={value}
        onChange={onChange}
      ></input>
      {isStore && (
        <button className={`${styles.storeBtn} ${value ? styles.active : ""}`}>
          찾기
        </button>
      )}
    </div>
  );
}

export default SignInput;
