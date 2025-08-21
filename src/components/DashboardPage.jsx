import styles from '../styles/Dashboard.module.css';
import TimePattern from './TimePattern';
import DayPattern from './DayPattern';
import TopMenus from './TopMenus';
import TotalVisitors from './TotalVisitors';

function DashboardPage() {
  // useEffect를 사용해 백엔드에서 모든 데이터를 한번에 받아온 뒤,
  // 각 컴포넌트에 props로 전달해주는 것이 좋습니다.

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