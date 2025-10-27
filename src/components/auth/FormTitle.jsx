import styles from "../../styles/auth/FormTitle.module.css";
import img from "../../assets/authImg.png";

function FormTitle({ label, isShow = false }) {
  return (
    <div className={styles.formTitle}>
      <div className={styles.titleText}>{label}</div>
      {isShow && <img src={img} className={styles.titleImg} />}
    </div>
  );
}

export default FormTitle;
