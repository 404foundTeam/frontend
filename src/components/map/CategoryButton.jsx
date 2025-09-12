import styles from "../../styles/map/CategoryButton.module.css";

function CategoryButton({ children, isSelected }) {
  return (
    <button className={`${styles.button} ${isSelected ? styles.select : ""}`}>
      {children}
    </button>
  );
}

export default CategoryButton;
