import styles from '../styles/Dashboard.module.css';

function TimePattern() {
  // 백엔드에서 받아올 데이터 예시
  const timeData = {
    morning: 60,
    afternoon: 25,
    evening: 40,
    summary: "이번주는 오전과 저녁시간에 손님이 많이 방문했어요! 그 중에서도 오전 9시와 저녁 7시에 가장 많이 방문했어요. 이를 토대로 새로운 이벤트를 만들어보는 건 어떠세요?"
  };

  return (
    <div className={`${styles.card} ${styles.timePatternCard}`}>
      <h3 className={styles.cardTitle}>시간대별 방문 패턴</h3>
      <div className={styles.bubbleContainer}>
        <div className={styles.bubble} style={{ width: `${timeData.evening * 1.5}px`, height: `${timeData.evening * 1.5}px` }}>저녁</div>
        <div className={styles.bubbleLarge} style={{ width: `${timeData.morning * 2}px`, height: `${timeData.morning * 2}px` }}>오전</div>
        <div className={styles.bubbleSmall} style={{ width: `${timeData.afternoon * 1.5}px`, height: `${timeData.afternoon * 1.5}px` }}>15시</div>
      </div>
      <p className={styles.cardDescription}>{timeData.summary}</p>
    </div>
  );
}

export default TimePattern;