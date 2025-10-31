// src/components/TopMenus.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/main/Dashboard.module.css";

function TopMenus({ year, month }) {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const dataVersion = useAuthStore((state) => state.dataVersion);
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
        let apiUrl;
        if (year && month) {
          // 💡 "월별 리포트"용 API 경로
          apiUrl = `http://13.209.239.240/api/v1/monthly-report/${storeUuid}/${year}/${month}/product-ranking`;
        } else {
          // 💡 "최신 리포트"용 API 경로 (기존 경로)
          apiUrl = `http://13.209.239.240/api/v1/report/${storeUuid}/product-ranking`;
        }

        // 3. 동적으로 생성된 URL로 API 호출
        const response = await axios.get(apiUrl);
        
        const chartData = response.data.salesDistributionChart || [];

        const formattedData = chartData.map((item, index) => ({
          rank: index + 1,
          name: item.itemName,
          percentage: Math.round(item.percentage),
        }));

        setMenuData(formattedData);
      } catch (err) {
        setError(
          <>
            메뉴 순위 정보를 확인하려면
            <br />
            엑셀 파일을 업로드해주세요.
          </>
        );
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopMenus();
  }, [storeUuid, dataVersion, year, month]);

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
    return (
      <div className={styles.card}>
        <p>{error}</p>
      </div>
    );
  }

  // 데이터가 없을 때 메시지를 보여줍니다.
  if (menuData.length === 0) {
    return (
      <div className={styles.card}>
        <p>표시할 메뉴 순위 정보가 없습니다.</p>
      </div>
    );
  }

  // 성공적으로 데이터를 불러왔을 때 실제 순위를 보여줍니다.
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>주문이 많이 된 메뉴</h3>
      <ul className={styles.rankList}>
        {menuData.map((item) => (
          <li key={item.rank} className={styles.rankItem}>
            <span className={styles.rankNumber}>{item.rank}위</span>
            <span className={styles.rankName}>{item.name}</span>
            <span className={styles.rankPercentage}>{item.percentage}%</span>
          </li>
        ))}
      </ul>
      <p className={styles.feedback}>
        가장 많이 판매된 상품은 {menuData[0].name} 입니다.
      </p>
    </div>
  );
}

export default TopMenus;
