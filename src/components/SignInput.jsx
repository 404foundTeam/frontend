import styles from "../styles/SignInput.module.css";

function SignInput({ label, isReq = true, type }) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.label}>
        {label}
        {isReq && <span>*</span>}
      </label>
      <input type={type} className={styles.input}></input>
    </div>
  );
}

export default SignInput;
