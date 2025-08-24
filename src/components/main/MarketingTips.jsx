// src/components/MarketingTips.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/MarketingTips.module.css';

function MarketingTips() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const dataVersion = useUuidStore((state) => state.dataVersion); // 데이터 업데이트 감지

  // --- 1. API 데이터를 위한 상태 관리 ---
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. API 호출 로직 ---
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
        
        // TODO: 실제 백엔드 서버 주소로 변경해주세요.
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/marketing`);
        
        // API 응답 데이터(marketingSuggestions)를 상태에 저장
        setTips(response.data.marketingSuggestions || []);
        
      } catch (err) {
        setError("마케팅 Tip 정보를 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingTips();
  }, [storeUuid, dataVersion]); // storeUuid나 dataVersion이 바뀌면 데이터를 다시 불러옴

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
      <div className={styles.titleHeader}>
        맞춤형 마케팅
      </div>

      <div className={styles.content}>
        {/* 상단 요약 텍스트는 현재 API 응답에 없으므로 임시로 유지하거나 수정/제거할 수 있습니다. */}
        <p className={styles.summary}>
          AI가 제안하는 맞춤형 마케팅으로 가게 매출을 늘려보세요!
        </p>

        <div className={styles.tipsList}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default MarketingTips;