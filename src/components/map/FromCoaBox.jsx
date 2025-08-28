import styles from "../../styles/map/FromCoaBox.module.css";

function FromCoaBox({ key, store }) {
  return (
    <div key={key} className={styles.fromCoaBox}>
      <div className={styles.info}>
        <p className={styles.name}>{store.storeName}</p>
        <p className={styles.add}>{store.storeAddress}</p>
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.acc}>맺기</button>
        <button className={styles.ref}>거절</button>
      </div>
    </div>
  );
}

export default FromCoaBox;
