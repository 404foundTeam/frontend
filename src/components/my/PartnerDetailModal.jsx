// src/components/my/PartnerDetailModal.jsx

import React from "react";
import styles from "../../styles/my/MyPartnerModal.module.css"; 

function PartnerDetailModal({ details, onClose, placeName }) {
  if (!details) return null;

  // 제휴 기간 포맷팅 (예: 2025.11.02~2025.12.02)
  const period = `${details.startDate.replace(/-/g, ".")}~${details.endDate.replace(/-/g, ".")}`;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* 모달 닫기 'X' 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        
        <h2 className={styles.modalTitle}>
          <span>{placeName || "사장"}님</span>에게 요청한 제휴 내용
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
        
        {/* --- 하단 버튼 --- */}
        <div className={styles.buttonContainer}>
          <button 
            className={`${styles.actionButton} ${styles.confirmButton}`} 
            onClick={onClose}
          >
            확인
          </button>
        </div>

      </div>
    </div>
  );
}

export default PartnerDetailModal;