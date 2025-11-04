import styles from "../../styles/map/MapBanner.module.css";
import img from "../../assets/group.png";

function MapBanner({ label }) {
  return (
    <>
      <div className={styles.banner}>
        <img src={img} />
        <h1 className={styles.title}>{label}</h1>
        <p className={styles.content}>에게 제휴를 요청 해보세요.</p>
      </div>
    </>
  );
}

export default MapBanner;
