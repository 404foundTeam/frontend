// src/pages/MainPage.jsx

import styles from '../styles/main/Main.module.css';
import WeeklyScheduleViewer from '../components/main/WeeklyScheduleViewer';
import MarketingTips from '../components/main/MarketingTips';
import ReportSummary from '../components/main/ReportSummary'; 
import DashboardPage from '../components/main/DashboardPage';

function MainPage() {
  return (
    <div className={styles.mainPageContainer}>
      
      <div className={styles.dashboardLayout}>
        
        <div className={styles.flexChild}>
          <WeeklyScheduleViewer />
        </div>
        
        <div className={styles.flexChild}>
          <MarketingTips />
        </div>
      </div>
      <ReportSummary />
      <DashboardPage />
    </div>
  );
}

export default MainPage;