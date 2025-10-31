import styles from "../../styles/auth/FormTitle.module.css";
import img from "../../assets/authImg.png";
import img2 from "../../assets/authImg2.png";

function FormTitle({ label, isShow = false, isStore = false }) {
  return (
    <div className={styles.formTitle}>
      <div className={styles.titleText}>{label}</div>
      {isShow && <img src={isStore ? img2 : img} className={styles.titleImg} />}
    </div>
  );
}

export default FormTitle;
