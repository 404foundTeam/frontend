import styles from "../../styles/shared/ToastMessage.module.css";
import img from "../../assets/titleImg.png";

function ToastMessage({ children }) {
  return (
    <div className={styles.container}>
      <img src={img} className={styles.img}></img>
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default ToastMessage;
