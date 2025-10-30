// src/components/ReportContent.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/smartreport/ReportContent.module.css";
import useAuthStore from "../../store/useAuthStore";
import TimePattern from "../main/TimePattern";
import DayPattern from "../main/DayPattern";
import TopMenus from "../main/TopMenus";
import TotalVisitors from "../main/TotalVisitors";
import illustration from "../../assets/report/image.png";
import SalesSummary from "./SalesSummary";
import ImprovementTips from "./ImprovementTips";
import FileUploadModal from "./FileUploadModal";
import Blur from "../welcome/Blur";

// 사용자 알림 (Toast) 컴포넌트
function Toast({ message }) {
  if (!message) return null;
  return <div className={styles.toast}>{message}</div>;
}

function ReportContent() {
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const storeName = useAuthStore((state) => state.storeName);
  const incrementDataVersion = useAuthStore(
    (state) => state.incrementDataVersion
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [toastMessage, setToastMessage] = useState('');

  // --- API 호출 로직 ---
  useEffect(() => {
    // 가게 정보가 없으면 API를 호출하지 않음
    if (!storeUuid || !storeName) {
      return;
    }

    const triggerCrawl = () => {
      // 사용자에게 백그라운드 작업 시작을 알림
      // setToastMessage('최신 리포트를 확인하고 있습니다...');

      axios
        .post("http://13.209.239.240/api/v1/report", {
          storeUuid: storeUuid,
          storeName: storeName,
        })
        .then((response) => {
          const { status, message } = response.data;

          if (status === "SUCCESS") {
            console.log("리포트 업데이트 완료");
            // setToastMessage('리포트 업데이트가 완료되었습니다!'); //
            incrementDataVersion();
          } else if (status === "SKIPPED") {
            console.log("리포트가 이미 최신 버전입니다.");
            // setToastMessage('리포트가 이미 최신 버전입니다.'); //
          } else {
            // FAILED
            console.error(`리포트 업데이트 실패: ${message || "서버 오류"}`);
            // setToastMessage(`리포트 업데이트 실패: ${message || '서버 오류'}`); //
          }
        })
        .catch((error) => {
          console.error("Crawl trigger error:", error);
          // setToastMessage('리포트 업데이트 요청에 실패했습니다.');
        });
    };

    triggerCrawl();
  }, [storeUuid, storeName, incrementDataVersion]); // 의존성 배열에 함수도 포함

  return (
    <>
      {isModalOpen && <Blur />}
      {isModalOpen && <FileUploadModal onClose={() => setIsModalOpen(false)} />}
      {/* <Toast message={toastMessage} /> */}

      <div className={styles.backgroundWrapper}>
        <div className={styles.reportContainer}>
          <div className={styles.pageLayout}>
            {/* 왼쪽 컬럼: 헤더 */}
            <div className={styles.leftColumn}>
              <div className={styles.reportHeader}>
                <div className={styles.headerText}>
                  <h2>
                    <span className={styles.storeName}>
                      {storeName || "가게"}
                    </span>
                    님의 스마트 리포트
                  </h2>
                  <p>이번달 스마트 리포트를 확인해보세요!</p>
                </div>
                <img
                  src={illustration}
                  alt="리포트 일러스트"
                  className={styles.headerIllustration}
                />
              </div>
            </div>

            {/* 오른쪽 컬럼: 카드 그리드와 버튼 */}
            <div className={styles.rightColumn}>
              <div className={styles.dashboardGrid}>
                <TopMenus />
                <TimePattern />
                <DayPattern />
                <TotalVisitors />
              </div>
              <div className={styles.actionButtons}>
                <button
                  className={styles.updateButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  데이터 업데이트
                </button>
                <button className={styles.posButton}>포스 연동</button>
              </div>
            </div>
          </div>

          <div className={styles.summarySection}>
            <SalesSummary />
          </div>
          <div className={styles.tipsSection}>
            <ImprovementTips />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportContent;
