// src/pages/SmartReportPage.jsx
import styles from "../styles/smartreport/SmartReport.module.css";
import ReportContent from "../components/smartreport/ReportContent";
import MarketingContent from "../components/smartreport/MarketingContent";
import useActiveStroe from "../store/useActiveStore";
import { useEffect } from "react";

function SmartReportPage() {
  const activeTab = useActiveStroe((state) => state.smartActive);
  const setSmartActive = useActiveStroe((state) => state.setSmartActive);

  // 컴포넌트 언마운트시 탭 상태 초기화
  useEffect(() => {
    return () => {
      setSmartActive("report");
    };
  }, [setSmartActive]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.tabNav}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "report" ? styles.active : ""
          }`}
          onClick={() => setSmartActive("report")}
        >
          AI 스마트 리포트
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "marketing" ? styles.active : ""
          }`}
          onClick={() => setSmartActive("marketing")}
        >
          맞춤형 마케팅
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "report" && <ReportContent />}
        {activeTab === "marketing" && <MarketingContent />}
      </div>
    </div>
  );
}

export default SmartReportPage;
