// src/components/SalesSummary.jsx

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import styles from '../styles/SalesSummary.module.css';
import swapIcon from '../assets/report/swap-icon.png'; // 교환 아이콘 이미지 경로

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

function SalesSummary() {
  // 임시 데이터
  const salesData = {
    monthlySales: "520만원",
    todayPayments: 240,
    vsLastMonth: "+15%, -15%"
  };
  const bestMenus = ["1. 아이스 아메리카노", "2. 에그마요 샌드위치", "3. 요거트 아이스크림"];
  const worstMenus = ["1. 매실 에이드", "2. 초콜릿 칩 쿠키", "3. 유자차"];
  const keywords = ["가성비좋은", "맛있는", "밝은"];

  // 차트 데이터 및 옵션
  const chartData = {
    labels: ['2월', '3월', '4월', '5월', '6월', '7월', '8월'],
    datasets: [{
      data: [3.8, 4.2, 4.5, 4.2, 4.0, 4.3, 4.1],
      borderColor: '#FDBA74',
      backgroundColor: 'rgba(253, 186, 116, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  };
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { 
      x: { 
      grid: { display: false },
      ticks: {
        color: '#6D3737', 
        
        font: {
          size: 16,      // 글자 크기를 14px로 설정
          weight: 'bold' // 글자를 bold체로 설정
        }
      }
    }, 
    y: { 
      min: 0, 
      max: 5, 
      ticks: { stepSize: 5 } 
    } 
  },
  };

  return (
    <div className={styles.summaryContainer}>
    <div className={styles.contentWrapper}>
      {/* --- 왼쪽 컬럼 --- */}
      <div className={styles.leftColumn}>
        <h2 className={styles.title}>어웨이 커피님의 매출</h2>
        <ul className={styles.salesInfo}>
          <li>이번달 매출 현황: <strong>{salesData.monthlySales}</strong></li>
          <li>금일 결제건: <strong>{salesData.todayPayments}건</strong></li>
          <li>전월 대비: <strong>{salesData.vsLastMonth}</strong></li>
        </ul>
        <div className={styles.menuLists}>
          <div className={styles.menuList}>
            <h3>주간 베스트 메뉴</h3>
            <ul>{bestMenus.map(menu => <li key={menu}>{menu}</li>)}</ul>
          </div>
          <img src={swapIcon} alt="Swap" className={styles.swapIcon} />
          <div className={styles.menuList}>
            <h3>주간 워스트 메뉴</h3>
            <ul>{worstMenus.map(menu => <li key={menu}>{menu}</li>)}</ul>
          </div>
        </div>
      </div>

      {/* --- 오른쪽 컬럼 --- */}
      <div className={styles.rightColumn}>
        <div className={styles.ratingCard}>
          <div className={styles.ratingHeader}>
            <p>어웨이 커피 월별 평균 평점</p>
            <span>4.7</span>
          </div>
          <div className={styles.chartContainer}>
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>
        <div className={styles.keywordSection}>
          <h3>Review Keyword</h3>
          <div className={styles.keywordPills}>
            {keywords.map(kw => <span key={kw} className={styles.pill}>{kw}</span>)}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SalesSummary;