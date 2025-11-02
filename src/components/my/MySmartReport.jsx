// src/components/my/MySmartReport.jsx

import React, { useState, useEffect, useMemo } from "react";
import { api } from "../../api/index";
import { useNavigate } from "react-router-dom"; 
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/my/MySmartReport.module.css"; 
import reportIconImage from "../../assets/mypage/bee.png";

const ITEMS_PER_PAGE = 6; 

function MySmartReport() {
  const navigate = useNavigate();
  const storeUuid = useAuthStore((state) => state.storeUuid);

  const [reportsData, setReportsData] = useState([]); // 전체 API 응답
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(
          `/monthly-report/${storeUuid}` 
        );
        
        // API 응답 데이터를 'year' 기준으로 내림차순(최신순) 정렬합니다.
        //    (원본 배열을 수정하지 않기 위해 [...response.data] 사용)
        const sortedData = [...response.data].sort((a, b) => b.year - a.year);
        
        // "정렬된 데이터"로 state를 설정합니다.
        setReportsData(sortedData);
        
        // 데이터가 있을 경우, 정렬된 배열의 첫 번째 값(가장 최신 연도)을 기본 선택합니다.
        if (sortedData.length > 0) {
          setSelectedYear(sortedData[0].year);
        }

      } catch (err) {
        console.error("API Error:", err);
        setError("스마트 리포트 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [storeUuid]);

  // --- 선택 가능한 연도 목록 (API 응답 기반) ---
  const availableYears = useMemo(() => 
    reportsData.map(item => item.year), // (이제 reportsData가 이미 정렬되어 있으므로 이 코드는 수정할 필요 없음)
    [reportsData]
  );

  // --- 선택된 연도의 월별 리포트 데이터 (최신순 정렬) ---
  const monthsForSelectedYear = useMemo(() => {
    const yearData = reportsData.find(item => item.year === selectedYear);
    if (!yearData) return [];
    // 월(month) 기준으로 내림차순 정렬 (9월, 8월, 7월...)
    return [...yearData.months].sort((a, b) => b.month - a.month);
  }, [reportsData, selectedYear]);

  // --- 현재 페이지에 보여줄 월별 데이터 ---
  const paginatedMonths = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return monthsForSelectedYear.slice(startIndex, endIndex);
  }, [monthsForSelectedYear, currentPage]);

  // --- 총 페이지 수 ---
  const totalPages = Math.ceil(monthsForSelectedYear.length / ITEMS_PER_PAGE);

  // --- "보러 가기" 버튼 핸들러 ---
  const handleViewReport = (month) => {
    navigate(`/mysmartreport/${selectedYear}/${month.month}`);
  };

  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  const formatPeriod = (period) => {
    const yearPrefix = String(selectedYear % 100);
    return period
      .replace(/(\d{2}-\d{2})/g, `${yearPrefix}.$1`)
      .replace(/-/g, ".");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>나의 스마트 리포트</h1>
        {availableYears.length > 0 && (
          <select 
            className={styles.yearSelector}
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(Number(e.target.value));
              setCurrentPage(1); 
            }}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}년</option>
            ))}
          </select>
        )}
      </div>

      <div className={styles.reportList}>
        {paginatedMonths.length > 0 ? (
          paginatedMonths.map(month => (
            <div key={month.month} className={styles.reportItem}>
              <div className={styles.reportInfo}>
                <div className={styles.reportIcon}>
                  <img 
                    src={reportIconImage} 
                    alt="리포트 아이콘" 
                    className={styles.reportIconImage} 
                  />
                </div>
                <div className={styles.reportText}>
                  <h3 className={styles.reportTitle}>{month.month}월 스마트 리포트</h3>
                  <p className={styles.reportPeriod}>기간: {formatPeriod(month.period)}</p>
                </div>
              </div>
              <button
                className={styles.viewButton}
                onClick={() => handleViewReport(month)}
              >
                보러 가기
              </button>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>해당 연도의 리포트가 없습니다.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.active : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySmartReport;