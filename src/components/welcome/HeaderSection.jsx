import styles from "../../styles/welcome/HeaderSection.module.css";

function HeaderSection({ onClick }) {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBox}>
        <div className={styles.headerTextBox}>
          <h1 className={styles.headerTitle}>
            소상공인을 위한
            <br />
            스마트한 마케팅 플랫폼
          </h1>
          <p className={styles.headerText}>
            AI가 어렵고 복잡한 마케팅과 운영전략을 한번에
          </p>
          <button onClick={onClick} className={styles.signButton}>
            로그인
          </button>
        </div>
        <div className={`${styles.headerImg} ${styles.bee}`}></div>
        <div className={`${styles.headerImg} ${styles.bee}`}></div>
        <div className={`${styles.headerImg} ${styles.hive}`}></div>
      </div>
      {/* <div className={styles.headrBottomBox}></div> */}
    </div>
  );
}

export default HeaderSection;
