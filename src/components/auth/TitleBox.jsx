import { Link } from "react-router-dom";
import styles from "../../styles/auth/TitleBox.module.css";
import titleImg from "../../assets/titleImg.png";

function TitleBox({ isShow = false }) {
  return (
    <div className={styles.titleBox}>
      <div className={styles.titleNav}>
        <Link to="/">market BEE 홈</Link> |<Link to="/login">로그인</Link>
      </div>
      <div className={styles.titleHeader}>
        <img src={titleImg} className={styles.titleImg} />
        <span className={styles.titleText}>market BEE</span>
      </div>
      {isShow && (
        <p className={styles.content}>
          클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요.
        </p>
      )}
    </div>
  );
}

export default TitleBox;
