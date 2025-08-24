// src/pages/MainPage.jsx

import styles from '../styles/Main.module.css';
import WeeklyScheduleViewer from '../components/main/WeeklyScheduleViewer';
import MarketingTips from '../components/main/MarketingTips';
import ReportSummary from '../components/main/ReportSummary'; // 1. ReportSummary 컴포넌트 import
import DashboardPage from '../components/main/DashboardPage';


function MainPage() {
  return (
    // 전체 메인 페이지를 감싸는 컨테이너
    <div className={styles.mainPageContainer}>
      {/* 상단: 캘린더와 마케팅 팁 섹션 */}
      <div className={styles.dashboardLayout}>
        <WeeklyScheduleViewer />
        <MarketingTips />
      </div>

      {/* 2. 그 아래에 ReportSummary 컴포넌트를 추가합니다. */}
      <ReportSummary />
      <DashboardPage />
    </div>
  );
}

export default MainPage;