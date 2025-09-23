// src/components/DayPattern.jsx

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/main/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function DayPattern() {
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

    const fetchDayPattern = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/visitor-stats`);
        
        const rankData = response.data.dailyVisitorRank || [];

        if (rankData.length > 0) {
          const top3Data = rankData.slice(0, 3); // 상위 3개 요일만 사용
          const labels = top3Data.map(item => item.dayOfWeek);
          const dataPoints = top3Data.map(item => item.totalCustomers);
          
          setChartData({
            labels: labels,
            datasets: [{
              data: dataPoints,
              backgroundColor: ['#6D3737', '#A06A6A', '#D39C9C'],
              borderRadius: 4,
            }],
          });

          const summaryText = "이번주 요일별 방문 패턴 " + 
            top3Data.map((item, index) => `${index + 1}위: ${item.dayOfWeek}요일`).join(', ') + 
            "입니다.";
          setSummary(summaryText);
        }

      } catch (err) {
        setError(
        <>
        요일별 방문 패턴을 확인하려면
        <br />
        엑셀 파일을 업로드해주세요.
        </>
        );
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDayPattern();
  }, [storeUuid, dataVersion]);

  // 차트 옵션 
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { grid: { display: false } } },
  };


  if (isLoading) {
    return <div className={styles.card}><p>데이터를 불러오는 중...</p></div>;
  }

  if (error) {
    return <div className={styles.card}><p>{error}</p></div>;
  }

  if (!chartData || chartData.datasets[0].data.length === 0) {
    return <div className={styles.card}><p>표시할 요일별 방문 정보가 없습니다.</p></div>;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>요일별 방문 패턴</h3>
      <Bar options={options} data={chartData} />
      <p className={styles.cardDescription}>{summary}</p>
    </div>
  );
}

export default DayPattern;