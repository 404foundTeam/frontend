// src/components/MarketingContent.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/MarketingContent.module.css';

function MarketingContent() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const dataVersion = useUuidStore((state) => state.dataVersion); // 데이터 업데이트 감지
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. GET 요청으로 마케팅 제안 목록 불러오기 ---
  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchMarketingSuggestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/marketing`);
        
        // API 응답 데이터 형식에 맞게 변환
        const formattedEvents = response.data.marketingSuggestions.map(suggestion => ({
          id: suggestion.id,
          title: suggestion.title,
          desc: suggestion.description,
        }));
        
        setEvents(formattedEvents);
      } catch (err) {
        setError("마케팅 제안을 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingSuggestions();
  }, [storeUuid, dataVersion]); // storeUuid나 dataVersion이 바뀌면 데이터를 다시 불러옴

  // --- 2. DELETE 요청으로 특정 제안 삭제하기 ---
  const handleDelete = async (idToDelete) => {
    // 낙관적 업데이트: UI를 먼저 변경하여 사용자 경험 향상
    const originalEvents = [...events];
    const updatedEvents = events.filter(event => event.id !== idToDelete);
    setEvents(updatedEvents);

    try {
      await axios.delete(`http://13.209.239.240/api/v1/report/${storeUuid}/marketing/${idToDelete}`);
      // 성공 시 아무것도 안함 (이미 UI에 반영됨)
      console.log(`Suggestion with id ${idToDelete} deleted successfully.`);
    } catch (err) {
      // API 호출 실패 시, UI를 원래 상태로 되돌리고 에러 메시지 표시
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
      setEvents(originalEvents);
      console.error("Delete Error:", err);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>마케팅 제안을 불러오는 중...</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    if (events.length === 0) {
      return <p>표시할 마케팅 제안이 없습니다.</p>;
    }
    return events.map((event) => (
      <div key={event.id} className={styles.eventCard}>
        <div className={styles.eventText}>
          <h3 className={styles.eventTitle}>{event.title}</h3>
          <p className={styles.eventDesc}>{event.desc}</p>
        </div>
        <button 
          className={styles.deleteButton}
          onClick={() => handleDelete(event.id)}
        >
          삭제
        </button>
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <p className={styles.pageSubtitle}>
        AI가 분석한 데이터를 바탕으로 맞춤형 마케팅 이벤트를 제시합니다.
      </p>
      <div className={styles.eventList}>
        {renderContent()}
      </div>
    </div>
  );
}

export default MarketingContent;