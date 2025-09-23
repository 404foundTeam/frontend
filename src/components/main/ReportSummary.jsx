// src/components/ReportSummary.jsx

import styles from '../../styles/main/ReportSummary.module.css';

function ReportSummary() {
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.title}>스마트 리포트 요약</h2>
      <p className={styles.description}>
        이번주 스마트 리포트가 완성되었어요.
        <br />
        AI 스마트 리포트를 참고해서 이번주도 힘차게 가게를 운영해보세요.
      </p>
    </div>
  );
}

export default ReportSummary;