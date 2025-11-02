import styles from "../../styles/map/MapSearch.module.css";

function MapSearch({
  focusRef,
  value,
  placeholder,
  onClick,
  onChange,
  onKeyDown,
}) {
  return (
    <div className={styles.container}>
      <input
        ref={focusRef}
        className={styles.search}
        type="text"
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default MapSearch;
