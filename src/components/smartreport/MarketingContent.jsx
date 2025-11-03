// src/components/MarketingContent.jsx

import React, { useState, useEffect } from "react";
import { api } from "../../api/index";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/smartreport/MarketingContent.module.css";

function MarketingContent() {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const dataVersion = useAuthStore((state) => state.dataVersion); // 데이터 업데이트 감지

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- GET 요청으로 마케팅 제안 목록 불러오기 ---
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

        const response = await api.get(
          `/report/${storeUuid}/marketing`
        );

        // API 응답 데이터 형식에 맞게 변환
        const formattedEvents = response.data.marketingSuggestions.map(
          (suggestion) => ({
            id: suggestion.id,
            title: suggestion.title,
            desc: suggestion.description,
          })
        );

        setEvents(formattedEvents);
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

    fetchMarketingSuggestions();
  }, [storeUuid, dataVersion]); // storeUuid나 dataVersion이 바뀌면 데이터를 다시 불러옴

  // --- DELETE 요청으로 특정 제안 삭제하기 ---
  const handleDelete = async (idToDelete) => {
    // 1. window.confirm으로 사용자에게 삭제 여부를 확인받습니다.
    const isConfirmed = window.confirm(
      "이 마케팅 제안을 정말 삭제하시겠습니까?"
    );

    // 2. 사용자가 '확인'을 눌렀을 경우에만 (isConfirmed가 true일 때) 삭제 로직을 실행합니다.
    if (isConfirmed) {
      const originalEvents = [...events];
      const updatedEvents = events.filter((event) => event.id !== idToDelete);
      setEvents(updatedEvents);

      try {
        await api.delete(
          `/report/${storeUuid}/marketing/${idToDelete}`
        );
        // 성공 시 아무것도 안함 (이미 UI에 반영됨)
        console.log(`Suggestion with id ${idToDelete} deleted successfully.`);
      } catch (err) {
        // API 호출 실패 시 UI를 원래 상태로 되돌리고 에러 메시지 표시
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
        setEvents(originalEvents);
        console.error("Delete Error:", err);
      }
    }
    // '취소'를 누르면 아무 작업도 수행하지 않습니다.
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
      <div className={styles.eventList}>{renderContent()}</div>
    </div>
  );
}

export default MarketingContent;
