// src/pages/MyPage.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/my/MyPage.module.css";
import MyScrap from "../components/my/MyScrap";
import MyCalendar from "../components/my/MyCalendar";
import MySmartReport from "../components/my/MySmartReport";
import MyPartnerList from "../components/my/MyPartnerList";
import MyPartnerSent from "../components/my/MyPartnerSent";
import MyPartnerReceived from "../components/my/MyPartnerReceived";

function MyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "MY"; // URL에 탭 값이 없으면 'MY'를 기본값으로

  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);
  const isPartnershipActive = activeTab.startsWith("PARTNERSHIP");

  // 탭 클릭 시 URL을 변경하는 핸들러 함수
  const handleTabClick = (tabName) => {
    setSearchParams({ tab: tabName });
    // 제휴 관리 탭이 아닌 다른 탭을 누르면 드롭다운을 닫습니다.
    setIsPartnerDropdownOpen(false);
  };

  // '제휴 관리' 메인 탭 클릭 시 드롭다운 토글
  const togglePartnerDropdown = () => {
    setIsPartnerDropdownOpen((prev) => !prev);
    // 드롭다운을 열 때, 하위 탭이 선택 안되어있으면 제휴 맺은 업장으로 설정
    if (!isPartnershipActive) {
      setSearchParams({ tab: "PARTNERSHIP_LIST" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div className={styles.tabInner}>
          {/* --- 카드뉴스 탭 --- */}
          <button
            className={`${styles.tabButton} ${
              activeTab === "MY" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("MY")} // onClick 수정
          >
            카드뉴스
          </button>

          {/* --- 캘린더 탭 --- */}
          <button
            className={`${styles.tabButton} ${
              activeTab === "CALENDAR" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("CALENDAR")} // onClick 수정
          >
            캘린더
          </button>
          {/* --- 스마트 리포트 탭 --- */}
          <button
            className={`${styles.tabButton} ${
              activeTab === "REPORT" ? styles.active : ""
            }`}
            onClick={() => handleTabClick("REPORT")} // onClick 수정
          >
            스마트 리포트
          </button>

          {/* '제휴 관리' 탭 (드롭다운 컨테이너) */}
          <div className={styles.tabButtonContainer}>
            <button
              className={`${styles.tabButton} ${
                isPartnershipActive ? styles.active : ""
              }`}
              onClick={togglePartnerDropdown} // onClick 수정
            >
              제휴 관리
              <span className={styles.dropdownArrow}>
                {isPartnerDropdownOpen ? "▲" : "▼"}
              </span>
            </button>

            {/* 드롭다운 메뉴 */}
            {isPartnerDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleTabClick("PARTNERSHIP_LIST")} // onClick 수정
                >
                  제휴 맺은 업장
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleTabClick("PARTNERSHIP_SENT")} // onClick 수정
                >
                  제휴 요청한 업장
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={() => handleTabClick("PARTNERSHIP_RECEIVED")} // onClick 수정
                >
                  제휴 요청 받은 업장
                </button>
              </div>
            )}
          </div>
        </div>
        {/* --- 제휴 관리 탭 끝 --- */}
      </div>

      {/* 하단 컨텐츠 렌더링 로직 (URL 기반 activeTab 사용) */}
      <div className={styles.content}>
        {activeTab === "MY" && <MyScrap />}
        {activeTab === "CALENDAR" && <MyCalendar />}
        {activeTab === "REPORT" && <MySmartReport />}

        {/* 제휴 관리 3개 탭 */}
        {activeTab === "PARTNERSHIP_LIST" && <MyPartnerList />}
        {activeTab === "PARTNERSHIP_SENT" && <MyPartnerSent />}
        {activeTab === "PARTNERSHIP_RECEIVED" && <MyPartnerReceived />}
      </div>
    </div>
  );
}

export default MyPage;
