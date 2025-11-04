import styles from "../../styles/map/MapSearch.module.css";
import img from "../../assets/search.png";

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
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <img src={img} className={styles.icon} onClick={onClick} />
    </div>
  );
}

export default MapSearch;
