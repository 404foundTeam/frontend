// src/layouts/MyLayout.js

// --- 1. 필요한 모듈과 컴포넌트를 import 합니다 ---
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import WelcomeMap from "../components/WelcomoMap"; // 오타 주의
import Blur from "../components/Blur";
import styles from "../styles/MyLayout.module.css";

function MyLayout() {
  // --- 2. 팝업(WelcomeMap)을 관리할 state와 핸들러 함수를 추가합니다 ---
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  return (
    <>
      {/* --- 3. 팝업 관련 JSX를 최상단에 추가합니다 --- */}
      {/* 이 부분은 전체 화면을 덮어야 하므로 layoutContainer 바깥에 둡니다. */}
      {showMap && <Blur />}
      {showMap && <WelcomeMap onClick={handleHideMap} />}

      <div className={styles.layoutContainer}>
        <SideBar />
        <main className={styles.mainContent}>
          {/* --- 4. 메인 콘텐츠(<main>) 최상단에 배너 JSX를 추가합니다 --- */}
          <div className={styles.bannerWrapper}>
            <div className={styles.banner}>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>어웨이 커피님</h2>
                <p className={styles.userAddress}>
                  경기 용인시 기흥구 기흥역로 9 108호 어웨이커피
                </p>
              </div>
              <button
                className={styles.reregisterButton}
                onClick={handleShowMap}
              >
                재등록하기
              </button>
            </div>
          </div>

          {/* Outlet은 배너 아래에 위치하여 페이지별 콘텐츠가 표시됩니다. */}
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MyLayout;