import styles from "../../styles/auth/CheckBox.module.css";

function CheckBox({ size = "25px", isSelected, onClick }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`${styles.checkBox} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    ></div>
  );
}

export default CheckBox;
