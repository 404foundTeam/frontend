import styles from "../../styles/auth/SignInput.module.css";

function SignInput({
  label,
  name,
  isReq = true,
  type,
  width = "480px",
  value,
  onChange,
  isId = false,
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
        className={`${styles.input} ${value ? styles.active : ""}`}
        style={{ maxWidth: width }}
        value={value}
        onChange={onChange}
      ></input>
      {isId && <button className={styles.checkBtn}>중복 확인</button>}
    </div>
  );
}

export default SignInput;
