import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import styles from '../styles/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

function DayPattern() {
  const data = {
    labels: ['금', '월', '수'],
    datasets: [{
      data: [100, 80, 50],
      backgroundColor: ['#6D3737', '#A06A6A', '#D39C9C'],
      borderRadius: 4,
    }],
  };

  const options = {
    indexAxis: 'y', // 가로 막대그래프
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { display: false }, y: { grid: { display: false } } },
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>요일별 방문 패턴</h3>
      <Bar options={options} data={data} />
      <p className={styles.cardDescription}>이번주 요일별 방문 패턴 1위: 금요일, 2위: 월요일, 3위: 수요일입니다.</p>
    </div>
  );
}

export default DayPattern;