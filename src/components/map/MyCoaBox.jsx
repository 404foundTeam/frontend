import styles from "../../styles/map/MyCoaBox.module.css";

function MyCoaBox({ key, store }) {
  return (
    <div key={key} className={styles.myCoaBox}>
      <div className={styles.text}>
        <div className={styles.info}>
          <p className={styles.name}>{store.storeName}</p>
          <p className={styles.add}>{store.storeAddress}</p>
        </div>
        <div className={styles.date}>{store.date}</div>
      </div>
      {store.isPartner ? (
        <button className={styles.discon}>제휴 끊기</button>
      ) : (
        <button className={styles.con}>제휴 다시 맺기</button>
      )}
    </div>
  );
}

export default MyCoaBox;
