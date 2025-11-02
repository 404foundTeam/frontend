// src/pages/MyPage.jsx

import styles from "../styles/my/MyPage.module.css";
import MyScrap from "../components/my/MyScrap";
import MyCalendar from "../components/my/MyCalendar";
import MySmartReport from "../components/my/MySmartReport";
import useActiveStore from "../store/useActiveStore";

function MyPage() {
  const activeTab = useActiveStore((state) => state.activeTab);
  const setActive = useActiveStore((state) => state.setActive);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "MY" ? styles.active : ""
          }`}
          onClick={() => setActive("MY")}
        >
          카드뉴스
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "CALENDAR" ? styles.active : ""
          }`}
          onClick={() => setActive("CALENDAR")}
        >
          캘린더
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "REPORT" ? styles.active : ""
          }`}
          onClick={() => setActive("REPORT")}
        >
          스마트 리포트
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === "MY" && <MyScrap />}
        {activeTab === "CALENDAR" && <MyCalendar />}
        {activeTab === "REPORT" && <MySmartReport />}
      </div>
    </div>
  );
}

export default MyPage;
