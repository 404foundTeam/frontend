import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../styles/MainLayout.module.css"; // CSS 모듈 import

function MainLayout() {
  return (
    // Flexbox 컨테이너 역할을 할 div
    <div className={styles.layoutContainer}>
      <SideBar isMain={true} />
      {/* Outlet(메인 콘텐츠)을 main 태그로 감싸서 영역을 명확히 함 */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;