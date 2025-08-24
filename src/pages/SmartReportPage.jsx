// src/pages/SmartReportPage.jsx

import { useState } from 'react';
import styles from '../styles/SmartReport.module.css';
import ReportContent from '../components/smartreport/ReportContent';
import MarketingContent from '../components/smartreport/MarketingContent';

function SmartReportPage() {
  // 'report' 또는 'marketing' 탭 상태를 관리
  const [activeTab, setActiveTab] = useState('report');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${activeTab === 'report' ? styles.active : ''}`}
          onClick={() => setActiveTab('report')}
        >
          AI 스마트 리포트
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'marketing' ? styles.active : ''}`}
          onClick={() => setActiveTab('marketing')}
        >
          맞춤형 마케팅
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'report' && <ReportContent />}
        {activeTab === 'marketing' && <MarketingContent />}
      </div>
    </div>
  );
}

export default SmartReportPage;