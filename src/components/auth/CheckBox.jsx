import styles from "../../styles/auth/CheckBox.module.css";

function CheckBox({ isSelected, onClick }) {
  return (
    <div
      className={`${styles.checkBox} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    ></div>
  );
}

export default CheckBox;
