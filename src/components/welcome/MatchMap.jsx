import styles from "../../styles/welcome/MatchMap.module.css";
import mapImg from "../../assets/welcome/map_img.png";

function MatchMap({ toggleMap }) {
  return (
    <div className={styles.signMap}>
      <h2 className={styles.signTitle}>업장 등록하기</h2>
      <p className={styles.signText}>
        업장을 등록해서 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
        관리해보세요.
      </p>
      <img src={mapImg} className={styles.signImg} />
      <button onClick={toggleMap} className={styles.welcomeSign}>
        업장 검색
      </button>
    </div>
  );
}

export default MatchMap;
