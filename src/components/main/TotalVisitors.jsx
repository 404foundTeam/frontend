// src/components/TotalVisitors.jsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

// 요일을 정렬하기 위한 순서 객체
const dayOrder = { "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6, "일": 7 };

function TotalVisitors() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const dataVersion = useUuidStore((state) => state.dataVersion);
  const [chartData, setChartData] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchVisitorStats = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/visitor-stats`);
        
        const rankData = response.data.dailyVisitorRank || [];

        if (rankData.length > 0) {
          // 1. 요일 순서대로 데이터 정렬 (월, 화, 수...)
          const sortedData = [...rankData].sort((a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]);

          // 2. 차트 라이브러리 형식에 맞게 데이터 가공
          const labels = sortedData.map(item => item.dayOfWeek);
          const dataPoints = sortedData.map(item => item.totalCustomers);
          
          setChartData({
            labels: labels,
            datasets: [{
              data: dataPoints,
              borderColor: '#6D3737',
              backgroundColor: 'rgba(109, 55, 55, 0.2)',
              fill: true,
              tension: 0.4,
            }],
          });

          // 3. 총 방문객 수 계산
          const total = dataPoints.reduce((sum, current) => sum + current, 0);
          setTotalCount(total);
        }

      } catch (err) {
        setError("총 방문객 정보를 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitorStats();
  }, [storeUuid, dataVersion]);

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { display: false } },
  };

  // --- 상태에 따른 조건부 렌더링 ---

  if (isLoading) {
    return <div className={styles.card}><p>데이터를 불러오는 중...</p></div>;
  }

  if (error) {
    return <div className={styles.card}><p>{error}</p></div>;
  }

  if (!chartData || chartData.datasets[0].data.length === 0) {
    return <div className={styles.card}><p>표시할 방문객 정보가 없습니다.</p></div>;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>총 방문객</h3>
      <Line options={options} data={chartData} />
      <p className={styles.cardDescription}>이번달 총 방문객 수는 {totalCount}명이에요.</p>
    </div>
  );
}

export default TotalVisitors;