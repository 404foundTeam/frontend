import { useEffect, useState } from "react";
import styles from "../styles/AuthInput.module.css";

function AuthInput({ type, value, onChange }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    value ? setIsActive(true) : setIsActive(false);
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        type={type}
        className={styles.input}
        placeholder="아이디를 입력해주세요."
        value={value}
        onChange={onChange}
      ></input>
      {isActive && <div className={styles.inputImg}></div>}
    </div>
  );
}

export default AuthInput;
