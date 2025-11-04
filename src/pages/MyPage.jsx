// src/pages/MyPage.jsx
import { useEffect, useState } from "react";
import styles from "../styles/my/MyPage.module.css";

import MyScrap from "../components/my/MyScrap";
import MyCalendar from "../components/my/MyCalendar";
import MySmartReport from "../components/my/MySmartReport";
import MyPartnerList from "../components/my/MyPartnerList";
import MyPartnerSent from "../components/my/MyPartnerSent";
import MyPartnerReceived from "../components/my/MyPartnerReceived";

import useActiveStore from "../store/useActiveStore";

function MyPage() {
  const activeTab = useActiveStore((state) => state.myActive);
  const setMyActive = useActiveStore((state) => state.setMyActive);

  const [isPartnerDropdownOpen, setIsPartnerDropdownOpen] = useState(false);

  const isPartnershipActive = activeTab.startsWith("PARTNERSHIP");

  // 컴포넌트 언마운트 시 탭 상태 초기화
  useEffect(() => {
    return () => {
      setMyActive("MY");
    };
  }, [setMyActive]);

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        {/* --- 카드뉴스 탭 --- */}
        <button
          className={`${styles.tabButton} ${
            activeTab === "MY" ? styles.active : ""
          }`}
          onClick={() => {
            setMyActive("MY");
            setIsPartnerDropdownOpen(false); // 다른 탭 누르면 드롭다운 닫기
          }}
        >
          카드뉴스
        </button>

        {/* --- 캘린더 탭 --- */}
        <button
          className={`${styles.tabButton} ${
            activeTab === "CALENDAR" ? styles.active : ""
          }`}
          onClick={() => {
            setMyActive("CALENDAR");
            setIsPartnerDropdownOpen(false); // 다른 탭 누르면 드롭다운 닫기
          }}
        >
          캘린더
        </button>

        {/* --- 스마트 리포트 탭 --- */}
        <button
          className={`${styles.tabButton} ${
            activeTab === "REPORT" ? styles.active : ""
          }`}
          onClick={() => {
            setMyActive("REPORT");
            setIsPartnerDropdownOpen(false); // 다른 탭 누르면 드롭다운 닫기
          }}
        >
          스마트 리포트
        </button>

        {/* '제휴 관리' 탭 (드롭다운 컨테이너) */}
        <div className={styles.tabButtonContainer}>
          <button
            className={`${styles.tabButton} ${
              isPartnershipActive ? styles.active : "" // 하위 탭이 활성화되면 active
            }`}
            onClick={() => setIsPartnerDropdownOpen((prev) => !prev)} // 클릭 시 토글
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
                onClick={() => {
                  setMyActive("PARTNERSHIP_LIST");
                  setIsPartnerDropdownOpen(false);
                }}
              >
                제휴 맺은 업장
              </button>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setMyActive("PARTNERSHIP_SENT");
                  setIsPartnerDropdownOpen(false);
                }}
              >
                제휴 요청한 업장
              </button>
              <button
                className={styles.dropdownItem}
                onClick={() => {
                  setMyActive("PARTNERSHIP_RECEIVED");
                  setIsPartnerDropdownOpen(false);
                }}
              >
                제휴 요청 받은 업장
              </button>
            </div>
          )}
        </div>
        {/* --- 제휴 관리 탭 끝 --- */}
      </div>

      {/* [수정] 6. 하단 컨텐츠 렌더링 로직 수정 */}
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
