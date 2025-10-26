import styles from "../styles/TitleBox.module.css";
import titleImg from "../assets/titleImg.png";

function TitleBox() {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <img src={titleImg} className={styles.titleImg} />
        <span className={styles.titleText}>market BEE</span>
      </div>
      <p className={styles.text}>
        클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
        관리해보세요.
      </p>
    </div>
  );
}

export default TitleBox;
