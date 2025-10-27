import { useEffect, useState } from "react";
import styles from "../styles/AuthInput.module.css";

function AuthInput({ type, placeholder, value, onChange, onClick }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    value ? setIsActive(true) : setIsActive(false);
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
      {isActive && <div className={styles.inputImg} onClick={onClick}></div>}
    </div>
  );
}

export default AuthInput;
