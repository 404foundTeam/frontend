// src/components/TimePattern.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/Dashboard.module.css';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function TimePattern() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const dataVersion = useUuidStore((state) => state.dataVersion); 
  const [chartData, setChartData] = useState(null); 
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
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/visitor-stats`);
        
        const mostVisited = response.data.mostVisitedHours || [];

        if (mostVisited.length > 0) {
          const labels = mostVisited.map(item => `${item.hour}시`);
          const dataPoints = mostVisited.map(item => item.totalCustomers);

          setChartData({
            labels: labels,
            datasets: [{
              label: '방문객 수',
              data: dataPoints,
              backgroundColor: '#6D3737',
              borderRadius: 4,
            }],
          });

          const topHours = mostVisited.slice(0, 2).map(item => `${item.hour}시`).join('와 ');
          const summaryText = `이번주는 손님들이 주로 ${topHours}에 많이 방문했어요. 이 시간대에 특별한 이벤트를 기획해보는 건 어떠세요?`;
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
  }, [storeUuid, dataVersion]);

  // 차트 옵션
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // 세로선 숨기기
        },
      },
      y: {
        beginAtZero: true, // y축 0부터 시작
      },
    },
  };

  // --- 상태에 따른 조건부 렌더링 ---

  if (isLoading) {
    return <div className={styles.card}><p>데이터를 불러오는 중...</p></div>;
  }

  if (error) {
    return <div className={styles.card}><p>{error}</p></div>;
  }

  if (!chartData || chartData.datasets[0].data.length === 0) {
    return <div className={styles.card}><p>분석할 방문객 데이터가 없습니다.</p></div>;
  }

  return (
    <div className={`${styles.card} ${styles.timePatternCard}`}>
      <h3 className={styles.cardTitle}>가장 바쁜 시간대 TOP {chartData.labels.length}</h3>
      <div className={styles.chartContainer}>
        <Bar options={options} data={chartData} />
      </div>
      <p className={styles.cardDescription}>{summary}</p>
    </div>
  );
}

export default TimePattern;