import styles from "../styles/SearchListBox.module.css";
// import "../styles/SearchListBox.css";
import listIcon from "../assets/welcomeMap/marker_icon.png";

function SearchListBox({ store, isSelected, onClick }) {
  if (!store) return null;

  return (
    <div
      className={`${styles.list} ${isSelected ? styles.select : ""}`}
      onClick={onClick}
    >
      <img src={listIcon} className={styles.icon} />
      <div className={styles.store}>
        <h1 className={styles.name}>{store.name}</h1>
        <p className={styles.addr}>{store.roadAddress}</p>
      </div>
    </div>
  );
}

export default SearchListBox;
