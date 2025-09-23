import styles from '../../styles/main/Dashboard.module.css';
import TimePattern from './TimePattern';
import DayPattern from './DayPattern';
import TopMenus from './TopMenus';
import TotalVisitors from './TotalVisitors';

function DashboardPage() {

  return (
    <div className={styles.dashboardGrid}>
      <TimePattern />
      <DayPattern />
      <TopMenus />
      <TotalVisitors />
    </div>
  );
}
export default DashboardPage;