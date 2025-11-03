import styles from "../../styles/map/MapBanner.module.css";

import img from "../../assets/group.png";
import useAuthStore from "../../store/useAuthStore";

function MapBanner() {
  const placeName = useAuthStore((state) => state.placeName);

  return (
    <>
      <div className={styles.banner}>
        <img src={img} />
        <h1 className={styles.title}>{placeName}</h1>
        <p className={styles.content}> 와 제휴를 맺을 업장을 찾아보세요.</p>
      </div>
    </>
  );
}

export default MapBanner;
