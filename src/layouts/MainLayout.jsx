// src/layouts/MainLayout.jsx

import { Outlet, Link } from "react-router-dom";
// import SideBar from "../components/layout/SideBar";
import styles from "../styles/main/MainLayout.module.css";
import cardNewsPreview from "../assets/mainpage/image.png";
import useUuidStore from "../store/useUuidStore";

function MainLayout() {
  const storeName = useUuidStore((state) => state.storeName);

  return (
    <div className={styles.layoutContainer}>
      {/* <SideBar isMain={true} /> */}
      <main className={styles.mainContent}>
        {/* --- 배너 코드 --- */}
        <div className={styles.welcomeBanner}>
          <div className={styles.bannerText}>
            <h1 className={styles.welcomeTitle}>{storeName}님 반가워요!</h1>
            <p className={styles.welcomeSubtitle}>
              이번주 스마트 리포트와 일정을 확인해보세요.
            </p>
          </div>
          {/* 장식용 원들을 위한 컨테이너 */}
          <div className={styles.circleContainer}>
            <div className={`${styles.circle} ${styles.circle1}`}></div>
            <div className={`${styles.circle} ${styles.circle2}`}></div>
            <div className={`${styles.circle} ${styles.circle3}`}></div>
          </div>
        </div>
        <Outlet />
        {/* --- 여기에 새로운 카드뉴스 배너를 추가 --- */}
        <div className={styles.cardNewsBanner}>
          <div className={styles.bannerContent}>
            <div className={styles.cardNewsTitle}>
              스마트 리포트를 참고해서 더 많은 손님을 사로잡을
              <br />
              <h2>카드뉴스를 만들어 보세요.</h2>
            </div>
            {/* Link 컴포넌트를 사용해 /cardnews 경로로 이동하는 버튼을 만듬 */}
            <Link to="/cardnews" className={styles.shortcutButton}>
              바로가기
            </Link>
          </div>
          <div className={styles.bannerImageContainer}>
            <img
              src={cardNewsPreview}
              alt="Card News Preview"
              className={styles.bannerImage}
            />
          </div>
        </div>
        {/* --- 배너 코드 끝 --- */}
      </main>
    </div>
  );
}

export default MainLayout;
