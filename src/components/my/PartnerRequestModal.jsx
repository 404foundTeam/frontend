// src/components/my/PartnerRequestModal.jsx

import React from "react";
// 이전에 만든 모달 CSS를 재사용
import styles from "../../styles/my/MyPartnerModal.module.css"; 

function PartnerRequestModal({ details, onClose, onAccept, onReject, placeName }) {
  // details가 null이거나 로딩 중이면 렌더링 안 함
  if (!details) return null; 

  // 제휴 기간 포맷팅 (예: 2025.12.01~2025.12.31)
  const period = `${details.startDate.replace(/-/g, ".")}~${details.endDate.replace(/-/g, ".")}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* 모달 닫기 'X' 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>
          <span className={styles.placeName}>{placeName || "사장"}</span>님에게 요청한 제휴 내용
        </h2>

        {/* --- 제휴 내용 --- */}
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>상대 업장</span>
          <span className={styles.detailValue}>{details.partnerPlaceName}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>제휴 기간</span>
          <span className={styles.detailValue}>{period}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>제휴 목적</span>
          <span className={styles.detailValue}>{details.purpose}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>제휴 내용</span>
          <span className={styles.detailValue}>{details.details}</span>
        </div>
        
        {/* --- 하단 버튼 (거절 / 수락) --- */}
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.actionButton} ${styles.declineButton}`} 
            onClick={onReject}
          >
            거절
          </button>
          <button 
            className={`${styles.actionButton} ${styles.confirmButton}`} 
            onClick={onAccept}
          >
            수락
          </button>
        </div>

      </div>
    </div>
  );
}

export default PartnerRequestModal;