import styles from "../../styles/welcome/SearchList.module.css";
import listIcon from "../../assets/welcomeMap/marker_icon.png";
import React, { forwardRef } from "react";

const SearchList = forwardRef(({ store, isSelected, onClick }, ref) => {
  if (!store) return null;
  return (
    <div
      ref={ref}
      className={`${styles.list} ${isSelected ? styles.select : ""}`}
      onClick={onClick}
      tabIndex={0}
    >
      <img src={listIcon} className={styles.icon} />
      <div className={styles.store}>
        {/* store or place */}
        <h1 className={styles.name}>{store.storeName}</h1>
        <p className={styles.addr}>{store.roadAddress}</p>
      </div>
    </div>
  );
});

export default SearchList;
