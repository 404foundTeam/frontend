import styles from "../styles/SideBar.module.css";
import main from "../assets/sidebar/main.ico";
import camera from "../assets/sidebar/camera.ico";
import carnews from "../assets/sidebar/cardnews.ico";
import map from "../assets/sidebar/map.ico";

// svg는 나중에 하는 걸로...
// import { ReactComponent as MainIcon } from "../assets/sidebar/main.svg";

function SideBar({
  isMain = false,
  isCamera = false,
  isCard = false,
  isMap = false,
}) {
  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${isMain ? styles.select : ""}`}>
        <img src={main} className={styles.main} />
        <p className={styles.text}>메인페이지</p>
      </div>
      <div className={`${styles.box} ${isCamera ? styles.select : ""}`}>
        <img src={camera} className={styles.camera} />
        <p className={styles.text}>사진 가이드</p>
      </div>
      <div className={`${styles.box} ${isCard ? styles.select : ""}`}>
        <img src={carnews} className={styles.cardnews} />
        <p className={styles.text}>카드 뉴스 생성</p>
      </div>
      <div className={`${styles.box} ${isMap ? styles.select : ""}`}>
        <img src={map} className={styles.map} />
        <p className={styles.text}>지도 이용 제휴</p>
      </div>
    </div>
  );
}

export default SideBar;
