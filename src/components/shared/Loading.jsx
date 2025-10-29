import styles from "../../styles/shared/Loading.module.css";
import useAuthStore from "../../store/useAuthStore";
import loadingImg from "../../assets/loading_img.png";

function CardNewsLoadingPage({ isCamera = false }) {
  const storeName = useAuthStore((state) => state.storeName);
  return (
    <div className={styles.container}>
      <div className={styles.box}></div>
      <div className={styles.textBox}>
        <p className={styles.wait}>잠시만 기다려주세요...</p>
        <p className={styles.content}>
          {!isCamera && (
            <>
              <span className={styles.store}>{storeName}</span>을 홍보할 SNS
              카드뉴스가 만들어지고 있어요!
            </>
          )}
          {isCamera && (
            <>
              <span className={styles.store}>{storeName}</span>을 위한 사진 분석
              및 촬영 가이드가 만들어지고 있어요!
            </>
          )}
        </p>
      </div>
      <div
        className={`${styles.loadingBox} ${!isCamera ? styles.cardnews : ""}`}
      >
        <img src={loadingImg} className={styles.loadingImg} />
      </div>
    </div>
  );
}

export default CardNewsLoadingPage;
