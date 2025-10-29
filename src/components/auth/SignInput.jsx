import styles from "../../styles/auth/SignInput.module.css";

function SignInput({
  label,
  helper,
  error,
  name,
  isReq = true,
  type,
  width = "480px",
  value,
  hasError = false,
  onChange,
  isStore = false,
}) {
  return (
    <div className={styles.inputBox}>
      <p className={`${styles.helper} ${hasError ? styles.red : ""}`}>
        {hasError ? error : helper}
      </p>
      <div className={styles.inputs}>
        <label className={styles.label}>
          {label}
          {isReq && <span>*</span>}
        </label>
        <input
          name={name}
          type={type}
          className={`${styles.input} ${value ? styles.active : ""} ${
            hasError ? styles.error : ""
          }`}
          style={{ maxWidth: width }}
          value={value}
          onChange={onChange}
        ></input>
        {isStore && (
          <button
            className={`${styles.storeBtn} ${value ? styles.active : ""}`}
          >
            찾기
          </button>
        )}
      </div>
    </div>
  );
}

export default SignInput;
