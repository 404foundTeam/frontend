// src/components/SalesSummary.jsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import axios from 'axios';
import useUuidStore from "../../store/useUuidStore";
import styles from '../../styles/SalesSummary.module.css';
import swapIcon from '../../assets/report/swap-icon.png';

// Chart.js에 필요한 요소들을 등록합니다.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

// --- 헬퍼 함수들 ---
const formatToManwon = (sales) => {
  if (typeof sales !== 'number') return '0만원';
  return `${(sales / 10000).toLocaleString()}만원`;
};

const formatGrowthPercentage = (percentage) => {
  if (typeof percentage !== 'number') return '-%';
  const sign = percentage > 0 ? '+' : '';
  return `${sign}${percentage.toFixed(1)}%`;
};

// --- 메인 컴포넌트 ---
function SalesSummary() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const storeName = useUuidStore((state) => state.storeName);
  const dataVersion = useUuidStore((state) => state.dataVersion);

  // --- 1. API 데이터를 위한 상태 관리 ---
  const [salesApiData, setSalesApiData] = useState({ monthlySales: "0만원", vsLastMonth: "-%" });
  const [receiptCount, setReceiptCount] = useState(0);
  const [bestMenus, setBestMenus] = useState([]);
  const [worstMenus, setWorstMenus] = useState([]);
  const [ratingData, setRatingData] = useState({ average: 0, chartData: null });
  const [keywords, setKeywords] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 2. API 호출 로직 ---
  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchAllSalesData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 여러 API를 동시에 호출합니다.
        const [
          salesRes,
          receiptRes,
          rankingRes,
          ratingRes,
          keywordsRes
        ] = await Promise.allSettled([
          axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/monthly-sales`),
          axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/receipt-count`),
          axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/product-ranking`),
          axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/rating`),
          axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/keywords`),
        ]);

        // 각 API 응답을 성공/실패에 따라 처리합니다.
        if (salesRes.status === 'fulfilled') {
          const { currentMonthSales, growthPercentage } = salesRes.value.data;
          setSalesApiData({
            monthlySales: formatToManwon(currentMonthSales),
            vsLastMonth: formatGrowthPercentage(growthPercentage),
          });
        } else {
          console.error('매출 API 호출 실패:', salesRes.reason);
        }

        if (receiptRes.status === 'fulfilled') {
          setReceiptCount(receiptRes.value.data.totalReceipts);
        } else {
          console.error('영수증 API 호출 실패:', receiptRes.reason);
        }

        if (rankingRes.status === 'fulfilled') {
          const { top3, bottom3 } = rankingRes.value.data;
          setBestMenus(top3.map((item, index) => `${index + 1}. ${item.productName}`));
          setWorstMenus(bottom3.map((item, index) => `${index + 1}. ${item.productName}`));
        } else {
          console.error('랭킹 API 호출 실패:', rankingRes.reason);
        }

        if (ratingRes.status === 'fulfilled') {
          const rawRatingData = ratingRes.value.data || [];
          if (rawRatingData.length > 0) {
            const totalRating = rawRatingData.reduce((sum, item) => sum + item.averageRating, 0);
            const average = (totalRating / rawRatingData.length).toFixed(1);
            
            const chartLabels = rawRatingData.map(item => `${parseInt(item.month.split('-')[1])}월`);
            const chartPoints = rawRatingData.map(item => item.averageRating);

            setRatingData({
              average: average,
              chartData: {
                labels: chartLabels,
                datasets: [{
                  data: chartPoints,
                  borderColor: '#FDBA74',
                  backgroundColor: 'rgba(253, 186, 116, 0.2)',
                  fill: true,
                  tension: 0.4,
                }],
              }
            });
          }
        } else {
          console.error('평점 API 호출 실패:', ratingRes.reason);
        }

        if (keywordsRes.status === 'fulfilled') {
          setKeywords(keywordsRes.value.data.keywords || []);
        } else {
          console.error('키워드 API 호출 실패:', keywordsRes.reason);
        }

      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSalesData();
  }, [storeUuid, dataVersion]); // storeUuid 또는 dataVersion이 변경될 때마다 다시 호출

  // --- 차트 옵션 ---
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { 
      x: { 
        grid: { display: false },
        ticks: { color: '#6D3737', font: { size: 16, weight: 'bold' } }
      }, 
      y: { min: 0, max: 5, ticks: { stepSize: 1 } } 
    },
  };

  // --- 렌더링 ---
  if (isLoading) {
    return <div className={styles.summaryContainer}><p>매출 요약 정보를 불러오는 중입니다...</p></div>;
  }

  if (error) {
    return <div className={styles.summaryContainer}><p>{error}</p></div>;
  }

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.contentWrapper}>
        {/* --- 왼쪽 컬럼 --- */}
        <div className={styles.leftColumn}>
          <h2 className={styles.title}>{storeName || '가게'}님의 매출</h2>
          <ul className={styles.salesInfo}>
            <li>이번달 매출 현황: <strong>{salesApiData.monthlySales}</strong></li>
            <li>이번달 결제건: <strong>{receiptCount}건</strong></li>
            <li>전월 대비: <strong>{salesApiData.vsLastMonth}</strong></li>
          </ul>
          <div className={styles.menuLists}>
            <div className={styles.menuList}>
              <h3>주간 베스트 메뉴</h3>
              <ul>{bestMenus.length > 0 ? bestMenus.map(menu => <li key={menu}>{menu}</li>) : <li>데이터 없음</li>}</ul>
            </div>
            <img src={swapIcon} alt="Swap" className={styles.swapIcon} />
            <div className={styles.menuList}>
              <h3>주간 워스트 메뉴</h3>
              <ul>{worstMenus.length > 0 ? worstMenus.map(menu => <li key={menu}>{menu}</li>) : <li>데이터 없음</li>}</ul>
            </div>
          </div>
        </div>

        {/* --- 오른쪽 컬럼 --- */}
        <div className={styles.rightColumn}>
          <div className={styles.ratingCard}>
            <div className={styles.ratingHeader}>
              <p>{storeName || '가게'} 월별 평균 평점</p>
              <span>{ratingData.average}</span>
            </div>
            <div className={styles.chartContainer}>
              {ratingData.chartData ? (
                <Line options={chartOptions} data={ratingData.chartData} />
              ) : (
                <p>평점 데이터가 없습니다.</p>
              )}
            </div>
          </div>
          <div className={styles.keywordSection}>
            <h3>Review Keyword</h3>
            <div className={styles.keywordPills}>
              {keywords.length > 0 ? (
                keywords.map(kw => <span key={kw} className={styles.pill}>{kw}</span>)
              ) : (
                <p>아직 손님들의 리뷰가 많지 않아요. 조금 더 모이면 키워드를 알려드릴게요!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesSummary;