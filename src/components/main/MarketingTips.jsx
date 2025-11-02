// src/components/MarketingTips.jsx

import React, { useState, useEffect } from "react";
import { api } from "../../api/index";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/main/MarketingTips.module.css";

function MarketingTips() {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const dataVersion = useAuthStore((state) => state.dataVersion);

  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchMarketingTips = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(
          `/report/${storeUuid}/marketing`
        );

        setTips(response.data.marketingSuggestions || []);
      } catch (err) {
        setError(
          <div className={styles.error}>
            데이터를 분석하여 맞춤 마케팅 Tip을 생성합니다.
            <br />
            <br />
            스마트 리포트에 분석할 엑셀 파일을 등록해주세요.
          </div>
        );
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingTips();
  }, [storeUuid, dataVersion]);

  const renderContent = () => {
    if (isLoading) {
      return <p>마케팅 Tip을 불러오는 중...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (tips.length === 0) {
      return <p>표시할 마케팅 Tip 정보가 없습니다.</p>;
    }
    return tips.map((tip) => (
      <div key={tip.id} className={styles.tipItem}>
        <div className={styles.bullet}></div>
        <div className={styles.tipDetails}>
          <h3 className={styles.tipTitle}>
            <span className={styles.tipLabel}>{tip.title}</span>
          </h3>
          <div className={styles.tipDescription}>
            <p>{tip.description}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleHeader}>맞춤형 마케팅</div>

      <div className={styles.content}>
        <p className={styles.summary}>
          AI가 제안하는 맞춤형 마케팅으로 가게 매출을 늘려보세요!
        </p>

        <div className={styles.tipsList}>{renderContent()}</div>
      </div>
    </div>
  );
}

export default MarketingTips;
