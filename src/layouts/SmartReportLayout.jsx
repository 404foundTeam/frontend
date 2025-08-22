// src/layouts/SmartReportLayout.jsx

import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../styles/SmartReportLayout.module.css"; // 1. 스타일을 적용하기 위해 CSS import는 유지합니다.

function SmartReportLayout() {
  return (
    // 3. SideBar와 Outlet을 하나의 부모 div로 감싸 에러를 해결합니다.
    <div className={styles.layoutContainer}>
      <SideBar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default SmartReportLayout;