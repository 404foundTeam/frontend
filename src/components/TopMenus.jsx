import styles from '../styles/Dashboard.module.css';

function TopMenus() {
  const menuData = [
    { rank: 1, name: '아이스 아메리카노', percentage: 65 },
    { rank: 2, name: '에그마요 샌드위치', percentage: 20 },
    { rank: 3, name: '요거트 아이스크림', percentage: 10 },
    { rank: 4, name: '기타', percentage: 5 },
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>주문이 많이 된 메뉴</h3>
      <ul className={styles.rankList}>
        {menuData.map(item => (
          <li key={item.rank} className={styles.rankItem}>
            <span className={styles.rankNumber}>{item.rank}위</span>
            <span className={styles.rankName}>{item.name}</span>
            <span className={styles.rankPercentage}>{item.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopMenus;