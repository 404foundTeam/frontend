import styles from "../styles/MapInfoWindow.module.css";

function MapInfoWindow({ store, isShow = false }) {
  return (
    <div className={styles.customInfoWindow}>
      <div className={styles.storInfo}>
        <div className={styles.infoTitle}>{store.placeName}</div>
        <div className={styles.infoAddress}>{store.roadAddress}</div>
      </div>
      {isShow && <button className={styles.btn}>요청</button>}
    </div>
  );
}

export default MapInfoWindow;
