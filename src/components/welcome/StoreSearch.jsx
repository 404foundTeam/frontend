import styles from "../../styles/welcome/StoreSearch.module.css";
import SearchImg from "../../assets/search.png";

function StoreSearch({
  focusRef,
  placeholder,
  value,
  onChange,
  onClick,
  onKeyDown,
}) {
  return (
    <div className={styles.container}>
      <input
        ref={focusRef}
        className={styles.search}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
      />
      <img src={SearchImg} className={styles.searchIcon} onClick={onClick} />
    </div>
  );
}

export default StoreSearch;
