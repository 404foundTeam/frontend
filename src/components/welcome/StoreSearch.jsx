import styles from "../../styles/welcome/StoreSearch.module.css";

function StoreSearch({ focusRef, placeholder, value, onChange, onKeyDown }) {
  return (
    <div className={styles.container}>
      <input
        ref={focusRef}
        className={styles.search}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default StoreSearch;
