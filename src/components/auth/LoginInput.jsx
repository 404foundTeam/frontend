import styles from "../../styles/auth/LoginInput.module.css";

function LoginInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onRest,
}) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>{label}</label>
      <input
        name={name}
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
