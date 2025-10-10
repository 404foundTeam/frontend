import styles from "../../styles/layout/SideBar.module.css";
import main from "../../assets/sidebar/main.png";
import mainSelect from "../../assets/sidebar/main_select.png";
import camera from "../../assets/sidebar/camera.png";
import cameraSelect from "../../assets/sidebar/camera_select.png";
import cardnews from "../../assets/sidebar/cardnews.png";
import cardnewsSelect from "../../assets/sidebar/cardnews_select.png";
import map from "../../assets/sidebar/map.png";
import mapSelect from "../../assets/sidebar/map_select.png";
import { NavLink } from "react-router-dom";

function SideBar({
  isMain = false,
  isCamera = false,
  isCard = false,
  isMap = false,
  // isShow = true,
}) {
  return (
    <div
      className={styles.container}
      // style={{ display: isShow ? "flex" : "none" }}
    >
      <NavLink to="/main">
        <div className={`${styles.box} ${isMain ? styles.select : ""}`}>
          <img src={isMain ? mainSelect : main} className={styles.main} />
          <p className={styles.text}>메인페이지</p>
        </div>
      </NavLink>
      <NavLink to="/camera">
        <div className={`${styles.box} ${isCamera ? styles.select : ""}`}>
          <img
            src={isCamera ? cameraSelect : camera}
            className={styles.camera}
          />
          <p className={styles.text}>사진 가이드</p>
        </div>
      </NavLink>
      <NavLink to="/cardnews">
        <div className={`${styles.box} ${isCard ? styles.select : ""}`}>
          <img
            src={isCard ? cardnewsSelect : cardnews}
            className={styles.cardnews}
          />
          <p className={styles.text}>카드 뉴스 생성</p>
        </div>
      </NavLink>
      <NavLink to="/map">
        <div className={`${styles.box} ${isMap ? styles.select : ""}`}>
          <img src={isMap ? mapSelect : map} className={styles.map} />
          <p className={styles.text}>지도 이용 제휴</p>
        </div>
      </NavLink>
    </div>
  );
}

export default SideBar;
