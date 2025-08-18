import { useState } from 'react';
import styles from '../styles/MyPage.module.css';
import MyScrap from '../components/MyScrap';
import MyCalendar from '../components/MyCalendar';

function MyPage() {
  const [activeTab, setActiveTab] = useState('MY');

  return (
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