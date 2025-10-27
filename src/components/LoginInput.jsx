import styles from "../styles/LoginInput.module.css";

function LoginInput({ label, type, placeholder, value, onChange, onRest }) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        className={`${styles.input} ${value ? styles.active : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      {value && <div className={styles.inputImg} onClick={onRest}></div>}
    </div>
  );
}

export default LoginInput;
