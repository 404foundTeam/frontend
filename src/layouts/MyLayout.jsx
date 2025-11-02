// src/layouts/MyLayout.js
import { useState } from "react";
import { Outlet } from "react-router-dom";
// import SideBar from "../components/layout/SideBar";
import WelcomeMap from "../components/welcome/WelcomeMap";
import Blur from "../components/welcome/Blur";
import styles from "../styles/my/MyLayout.module.css";
import useAuthStore from "../store/useAuthStore";

function MyLayout() {
  const placeName = useAuthStore((state) => state.placeName);
  const roadAddress = useAuthStore((state) => state.roadAddress);

  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleHideMap = () => {
    setShowMap(false);
  };

  return (
    <>
      {showMap && <Blur />}
      {showMap && <WelcomeMap onClick={handleHideMap} />}

      <div className={styles.layoutContainer}>
        {/* <SideBar /> */}
        <main className={styles.mainContent}>
          <div className={styles.bannerWrapper}>
            <div className={styles.banner}>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{placeName}님</h2>
                <p className={styles.userAddress}>
                  {roadAddress || "등록된 주소가 없습니다."}
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

          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MyLayout;
