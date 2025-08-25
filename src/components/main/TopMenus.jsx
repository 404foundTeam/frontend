// src/components/TopMenus.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUuidStore from '../../store/useUuidStore';
import styles from '../../styles/Dashboard.module.css'; 

function TopMenus() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const dataVersion = useUuidStore((state) => state.dataVersion); 
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchTopMenus = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://13.209.239.240/api/v1/report/${storeUuid}/product-ranking`);
        
        const chartData = response.data.salesDistributionChart || [];

        const formattedData = chartData.map((item, index) => ({
          rank: index + 1,
          name: item.itemName,
          percentage: Math.round(item.percentage),
        }));

        setMenuData(formattedData);
      } catch (err) {
        setError("메뉴 순위 정보를 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopMenus();
  }, [storeUuid, dataVersion]);

  // --- 상태에 따른 조건부 렌더링 ---

  if (isLoading) {
    return (
      <div className={styles.card}>
        <p>데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 에러가 발생했을 때 에러 메시지를 보여줍니다.
  if (error) {
    return <div className={styles.card}><p>{error}</p></div>;
  }

  // 데이터가 없을 때 메시지를 보여줍니다.
  if (menuData.length === 0) {
    return <div className={styles.card}><p>표시할 메뉴 순위 정보가 없습니다.</p></div>;
  }

  // 성공적으로 데이터를 불러왔을 때 실제 순위를 보여줍니다.
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