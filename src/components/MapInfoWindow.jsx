import styles from "../styles/MapInfoWindow.module.css";

function MapInfoWindow({ store }) {
  return (
    <div className={styles.customInfoWindow}>
      <div className={styles.storInfo}>
        <div className={styles.infoTitle}>{store.placeName}</div>
        <div className={styles.infoAddress}>{store.roadAddress}</div>
      </div>
    </div>
  );
}

export default MapInfoWindow;
