import styles from "../../styles/welcome/SearchList.module.css";

import listIcon from "../../assets/welcomeMap/marker_icon.png";

function SearchList({ store, isSelected, onClick }) {
  if (!store) return null;

  return (
    <div
      className={`${styles.list} ${isSelected ? styles.select : ""}`}
      onClick={onClick}
    >
      <img src={listIcon} className={styles.icon} />
      <div className={styles.store}>
        <h1 className={styles.name}>{store.placeName}</h1>
        <p className={styles.addr}>{store.roadAddress}</p>
      </div>
    </div>
  );
}

export default SearchList;
