import styles from "../styles/SideBar.module.css";
import main from "../assets/sidebar/main.png";
import picture from "../assets/sidebar/picture.png";
import carnews from "../assets/sidebar/carnews.png";
import map from "../assets/sidebar/map.png";

function SideBar() {
  const show = true;

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${show ? styles.select : ""}`}>
        <img src={main} className={styles.main} />
        <p className={styles.text}>메인페이지</p>
      </div>
      <div className={`${styles.box} ${show ? styles.select : ""}`}>
        <img src={picture} className={styles.picture} />
        <p className={styles.text}>사진 가이드</p>
      </div>
      <div className={`${styles.box} ${show ? styles.select : ""}`}>
        <img src={carnews} className={styles.cardnews} />
        <p className={styles.text}>카드 뉴스 생성</p>
      </div>
      <div className={`${styles.box} ${show ? styles.select : ""}`}>
        <img src={map} className={styles.map} />
        <p className={styles.text}>지도 이용 제휴</p>
      </div>
    </div>
  );
}

export default SideBar;
