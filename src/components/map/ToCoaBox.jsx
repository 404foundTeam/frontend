import styles from "../../styles/map/ToCoaBox.module.css";

function ToCoaBox({ key, store }) {
  return (
    <div className={styles.toCoaBox}>
      <div className={styles.info}>
        <p className={styles.name}>{store.placeName}</p>
        <p className={styles.add}>{store.storeAddress}</p>
      </div>
      <button>맺기 대기중</button>
    </div>
  );
}

export default ToCoaBox;
