import styles from "../../styles/cardnews/ResultButton.module.css";

function ResultButton({ children, type, onClick }) {
  return (
    <button className={`${styles[type]} ${styles.button}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default ResultButton;
