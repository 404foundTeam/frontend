// src/layouts/MyLayout.js
import { Outlet } from "react-router-dom";
// import SideBar from "../components/layout/SideBar";
import styles from "../styles/my/MyLayout.module.css";
import useAuthStore from "../store/useAuthStore";

function MyLayout() {
  const placeName = useAuthStore((state) => state.placeName);
  const roadAddress = useAuthStore((state) => state.roadAddress);

  return (
    <>
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
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </>
  );
}

export default MyLayout;
