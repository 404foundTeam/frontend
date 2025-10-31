// src/components/ImprovementTips.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/smartreport/ImprovementTips.module.css";
import tipIcon from "../../assets/report/tip-icon.png";

function ImprovementTips({ year, month }) {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const dataVersion = useAuthStore((state) => state.dataVersion); // 데이터 새로고침 감지
  
  const [tipsText, setTipsText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchTips = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let apiUrl;
        if (year && month) {
          apiUrl = `http://13.209.239.240/api/v1/monthly-report/${storeUuid}/${year}/${month}/improvement-tip`;
        } else {
          apiUrl = `http://13.209.239.240/api/v1/report/${storeUuid}/improvement-tip`;
        }

        const response = await axios.get(apiUrl);
        
        // API 응답에서 combinedTips 텍스트를 상태에 저장
        setTipsText(response.data.combinedTips || "");
      } catch (err) {
        setError("아직 리뷰나 업로드된 엑셀 파일이 없습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, [storeUuid, dataVersion, year, month]); // storeUuid나 dataVersion이 바뀌면 데이터를 다시 불러옴

  const renderContent = () => {
    if (isLoading) {
      return <p className={styles.tipsText}>개선 Tip을 불러오는 중...</p>;
    }
    if (error) {
      return <p className={styles.tipsText}>{error}</p>;
    }
    if (!tipsText) {
      return (
        <p className={styles.tipsText}>표시할 개선 Tip 정보가 없습니다.</p>
      );
    }
    return <p className={styles.tipsText}>{tipsText}</p>;
  };

  return (
    <div className={styles.tipsContainer}>
      <div className={styles.tipsHeader}>
        <img src={tipIcon} alt="Tip Icon" className={styles.tipIcon} />
        <h2 className={styles.tipsTitle}>개선 Tip</h2>
      </div>
      {renderContent()}
    </div>
  );
}

export default ImprovementTips;
