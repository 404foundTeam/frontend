import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import styles from '../styles/Dashboard.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

function TotalVisitors() {
  const data = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: '#6D3737',
      backgroundColor: 'rgba(109, 55, 55, 0.2)',
      fill: true,
      tension: 0.4,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false } }, y: { display: false } },
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>총 방문객</h3>
      <Line options={options} data={data} />
      <p className={styles.cardDescription}>이번달 총 방문객 수는 540명이에요.</p>
    </div>
  );
}

export default TotalVisitors;