import styles from "../../styles/map/MapBanner.module.css";
import img from "../../assets/group.png";

function MapBanner() {
  return (
    <>
      <div className={styles.banner}>
        <img src={img} />
        <h1 className={styles.title}>어웨이 커피</h1>
        <p className={styles.content}>와 제휴를 맺을 업장을 찾아보세요.</p>
      </div>
    </>
  );
}

export default MapBanner;
