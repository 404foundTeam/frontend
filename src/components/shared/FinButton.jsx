import styles from "../../styles/shared/FinButton.module.css";

function FinButton({ children, onClick }) {
  return (
    <button className={styles.finButton} onClick={onClick}>
      {children}
    </button>
  );
}

export default FinButton;
