import styles from "../../styles/map/MapSearch.module.css";

function MapSearch({ focusRef, placeholder, value, onChange, onKeyDown }) {
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

export default MapSearch;
