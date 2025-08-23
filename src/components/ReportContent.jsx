// src/components/ReportContent.jsx

import styles from '../styles/ReportContent.module.css';
import TimePattern from './TimePattern';
import DayPattern from './DayPattern';
import TopMenus from './TopMenus';
import TotalVisitors from './TotalVisitors';
import illustration from '../assets/report/image.png';
import SalesSummary from './SalesSummary'; 
import ImprovementTips from './ImprovementTips'; 
import { useState } from 'react'; // useState import
import FileUploadModal from './FileUploadModal'; // 1. 모달 컴포넌트 import
import Blur from './welcome/Blur'; // 블러 효과 컴포넌트 import
import useUuidStore from "../store/useUuidStore";


function ReportContent() {
  const storeName = useUuidStore((state) => state.storeName);
      const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {/* 3. isModalOpen이 true일 때 모달과 블러를 표시 */}
      {isModalOpen && <Blur />}
      {isModalOpen && <FileUploadModal onClose={() => setIsModalOpen(false)} />}
    <div className={styles.pageWrapper}>
    <div className={styles.pageLayout}>
      
      {/* --- 왼쪽 컬럼: 헤더 --- */}
      <div className={styles.leftColumn}>
        <div className={styles.reportHeader}>
          <div className={styles.headerText}>
            <h2><span className={styles.storeName}>{storeName}</span>님의 스마트 리포트</h2>
            <p>이번달 스마트 리포트를 확인해보세요!</p>
          </div>
          <img src={illustration} alt="리포트 일러스트" className={styles.headerIllustration} />
        </div>
      </div>

      {/* --- 오른쪽 컬럼: 카드 그리드와 버튼 --- */}
      <div className={styles.rightColumn}>
        <div className={styles.dashboardGrid}>
          <TopMenus />
          <TimePattern />
          <DayPattern />
          <TotalVisitors />
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.updateButton} onClick={() => setIsModalOpen(true)}>
                데이터 업데이트
              </button>
          <button className={styles.posButton}>포스 연동</button>
        </div>
      </div>
      </div>
      <div>
        <SalesSummary />
      </div>
      <div>
        <ImprovementTips />
      </div>
    </div>
     </>
  );
}

export default ReportContent;