import styles from "../styles/StoreSearch.module.css";

function StoreSearch({ focusRef, placeholder, value, onChange }) {
  return (
    <div className={styles.container}>
      <input
        ref={focusRef}
        className={styles.search}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default StoreSearch;
