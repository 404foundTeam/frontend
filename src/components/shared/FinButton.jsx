import styles from "../../styles/shared/FinButton.module.css";

function FinButton({ children, onClick, isActive }) {
  return (
    <button
      className={`${styles.finButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default FinButton;
