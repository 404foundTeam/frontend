import img from "../assets/group.png";
import styles from "../styles/MapBanner.module.css";

function CoaBanner() {
  return (
    <>
      <div className={styles.banner}>
        <img src={img} />
        <h1 className={styles.title}>어웨이 커피</h1>
        <p className={styles.content}>
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
    </>
  );
}

export default CoaBanner;
