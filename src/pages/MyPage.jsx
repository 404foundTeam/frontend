import { useState } from 'react';
import styles from '../styles/MyPage.module.css';
import MyScrap from '../components/MyScrap';
import MyCalendar from '../components/MyCalendar';


function MyPage() {
  const [activeTab, setActiveTab] = useState('MY');

  return (
    // 배너가 사라졌으므로, 전체를 감싸는 div는 MyPage의 컨테이너가 됩니다.
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'MY' ? styles.active : ''}`}
          onClick={() => setActiveTab('MY')}
        >
          MY
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'CALENDAR' ? styles.active : ''}`}
          onClick={() => setActiveTab('CALENDAR')}
        >
          캘린더
        </button>
      </div>
      <div className={styles.content}>
        {activeTab === 'MY' && <MyScrap />}
        {activeTab === 'CALENDAR' && <MyCalendar />}
      </div>
    </div>
  );
}

export default MyPage;