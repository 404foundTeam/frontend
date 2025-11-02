import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/main/Dashboard.module.css";

function TimePattern({ year, month }) {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const dataVersion = useAuthStore((state) => state.dataVersion);
  
  const [visitData, setVisitData] = useState([]); 
  const [summary, setSummary] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchTimePattern = async () => {
      try {
        setIsLoading(true);
        let apiUrl;
        if (year && month) {
          apiUrl = `http://13.209.239.240/api/v1/monthly-report/${storeUuid}/${year}/${month}/visitor-stats`;
        } else {
          apiUrl = `http://13.209.239.240/api/v1/report/${storeUuid}/visitor-stats`;
        }
        
        const response = await axios.get(apiUrl);
        
        const mostVisited = response.data.mostVisitedHours || [];
        const leastVisited = response.data.leastVisitedHours || [];

        const taggedMost = mostVisited.map(item => ({ ...item, type: 'most' }));
        const taggedLeast = leastVisited.map(item => ({ ...item, type: 'least' }));
        
        const allVisitData = [...taggedMost, ...taggedLeast];

        if (allVisitData.length > 0) {
          setVisitData(allVisitData); 

          let summaryText = "";
          if (mostVisited.length > 0 && leastVisited.length > 0) {
            const mostHour = mostVisited[0].hour;
            const leastHour = leastVisited[0].hour; 
            summaryText = `이번달은 ${mostHour}시에 사람들이 많이 방문하고 ${leastHour}시에 적게 방문했어요.`;
          } else if (mostVisited.length > 0) {
            summaryText = `이번달은 ${mostVisited[0].hour}시에 사람들이 가장 많이 방문했어요.`;
          } else if (leastVisited.length > 0) {
            summaryText = `이번달은 ${leastVisited[0].hour}시에 사람들이 가장 적게 방문했어요.`;
          }
          
          setSummary(summaryText);
        }
      } catch (err) {
        setError(
          <>
            시간대별 방문 패턴을 확인하려면
            <br />
            엑셀 파일을 업로드해주세요.
          </>
        );
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTimePattern();
  }, [storeUuid, dataVersion, year, month]);


  if (isLoading) {
    return (
      <div className={styles.card}>
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.card}>
        <p>{error}</p>
      </div>
    );
  }

  if (visitData.length === 0) {
    return (
      <div className={styles.card}>
        <p>분석할 방문객 데이터가 없습니다.</p>
      </div>
    );
  }

  // 방문객 수(totalCustomers)의 최대값을 찾습니다 (버블 크기 비율 계산용)
  const maxCustomers = Math.max(...visitData.map(item => item.totalCustomers));
  const MIN_BUBBLE_SIZE = 35; // 최소 버블 크기 (px)
  const MAX_BUBBLE_SIZE = 110; // 최대 버블 크기 (px)

  return (
    <div className={`${styles.card} ${styles.timePatternCard}`}>
      <h3 className={styles.cardTitle}>
        시간대별 방문 패턴
      </h3>

      <div className={styles.bubbleChartContainer}>
        {visitData.slice(0, 4).map((item) => { 
          
          // 방문객 수에 따라 버블 크기 계산
          const scale = (Math.max(item.totalCustomers, 0.1) / maxCustomers);
          const bubbleSize = (scale * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE)) + MIN_BUBBLE_SIZE;
          
          // 폰트 크기도 버블 크기에 비례하여 조절
          const fontSize = Math.max(bubbleSize / 7, 14); // 최소 14px

          // [수정] 'index < 2' 대신 item.type으로 상위/하위 구분
          const isTopTier = item.type === 'most'; 

          return (
            <div 
              key={`${item.hour}-${item.type}`} 
              className={`${styles.bubble} ${isTopTier ? styles.topBubble : styles.otherBubble}`}
              style={{ 
                width: `${bubbleSize}px`,
                height: `${bubbleSize}px`,
                fontSize: `${fontSize}px`
              }}
            >
              {item.hour}시
            </div>
          );
        })}
      </div>

      <p className={styles.cardDescription}>{summary}</p>
    </div>
  );
}

export default TimePattern;