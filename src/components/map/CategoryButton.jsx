import styles from "../../styles/map/CategoryButton.module.css";

function CategoryButton({ children, isSelected, onClick }) {
  return (
    <button
      className={`${styles.button} ${isSelected ? styles.select : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CategoryButton;
