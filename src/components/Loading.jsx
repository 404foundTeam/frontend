import loadingImg from "../assets/loading_img.png";
import SideBar from "./SideBar";
import styles from "../styles/Loading.module.css";

function CardNewsLoadingPage() {
  return (
    <div className={styles.container}>
      <SideBar isCard={true} />
      <div className={styles.box}></div>
      <div className={styles.loadingBox}>
        <img src={loadingImg} className={styles.loadingImg} />
        <div className={styles.textBox}>
          <p className={styles.wait}>잠시만 기다려주세요...</p>
          <p className={styles.content}>
            <span className={styles.store}>어웨이 커피</span>를 홍보할 SNS 카드
            뉴스가 만들어지고 있어요!
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardNewsLoadingPage;
