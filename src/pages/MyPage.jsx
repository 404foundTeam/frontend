import styles from "../styles/MyPage.module.css";
import MyScrap from "../components/my/MyScrap";
import MyCalendar from "../components/my/MyCalendar";
import useActiveStroe from "../store/useActiveStore";

function MyPage() {
  const activeTab = useActiveStroe((state) => state.activeTab);
  const setActive = useActiveStroe((state) => state.setActive);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "MY" ? styles.active : ""
          }`}
          onClick={() => setActive("MY")}
        >
          마이페이지
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "CALENDAR" ? styles.active : ""
          }`}
          onClick={() => setActive("CALENDAR")}
        >
          캘린더
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === "MY" && <MyScrap />}
        {activeTab === "CALENDAR" && <MyCalendar />}
      </div>
    </div>
  );
}

export default MyPage;
