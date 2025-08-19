// src/pages/MainPage.jsx

import styles from '../styles/Main.module.css'; // MainPage의 CSS 모듈
import WeeklyScheduleViewer from '../components/WeeklyScheduleViewer';
import MarketingTips from '../components/MarketingTips';

function MainPage() {
  return (
    // 1. 두 컴포넌트를 감싸는 부모 div를 만듭니다.
    <div className={styles.dashboardLayout}>
      <WeeklyScheduleViewer />
      <MarketingTips />
    </div>
  );
}

export default MainPage;