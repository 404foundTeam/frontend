import styles from "../../styles/shared/ToastMessage.module.css";
import img from "../../assets/titleImg.png";

function ToastMessage({ children, isRed = false }) {
  return (
    <div className={styles.container}>
      <img src={img} className={styles.img}></img>
      <div className={`${isRed ? styles.red : styles.text}`}>
        {children}
        {isRed ? "!" : ""}
      </div>
    </div>
  );
}

export default ToastMessage;
