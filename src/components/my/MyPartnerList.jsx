import React, { useState, useEffect } from "react";
import { getPartnerList, getPartnerDetails, hidePartnership } from "../../api/index";
import PartnerDetailModal from "./PartnerDetailModal"; 
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/my/MyPartnership.module.css"; 


function MyPartnerList() {
  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerDetails, setSelectedPartnerDetails] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false); // 모달 내용 로딩
  
  const placeName = useAuthStore((state) => state.placeName); 

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPartnerList(); 
        
        
        // 정렬: 만료됨(COMPLETED)이 위로 오도록
        data.sort((a, b) => {
          if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return -1;
          if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return 1;
          return 0;
        });
        
        setPartners(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("제휴 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []); 

  // 상세 보기 (모달 열기) 함수 - 실제 API 호출
  const showDetails = async (id) => {
    setIsModalOpen(true); 
    setIsDetailLoading(true); 

    try {
      // 실제 상세 보기 API 호출
      const details = await getPartnerDetails(id); 
      setSelectedPartnerDetails(details);
    } catch (err) {
      console.error("상세 내용 조회 실패:", err);
      alert("제휴 상세 내용을 불러오는 데 실패했습니다.");
      setIsModalOpen(false); // 에러 시 모달 닫기
    } finally {
      setIsDetailLoading(false); // 모달 내용 로딩 끝
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartnerDetails(null);
  };

  // "만료됨" 버튼 클릭
  const handleExpire = (id) => {
    showDetails(id); // 상세 보기 실행
  };

  // "제휴 내용 보기" 버튼 클릭
  const handleViewDetails = (id) => {
    showDetails(id); // 상세 보기 실행
  };

  // 목록에서 숨기기 (X 버튼) 함수 - 실제 API 호출
  const handleDismiss = async (id) => {
    if (!window.confirm("이 제휴를 목록에서 숨기시겠습니까?")) {
      return;
    }
        
    try {
      // 실제 숨기기 API 호출
      await hidePartnership(id);
      
      setPartners(partners.filter(p => p.partnershipId !== id));
      alert("제휴가 목록에서 숨김 처리되었습니다.");

    } catch (err) {
      console.error("숨기기 API 실패:", err);
      alert("제휴 숨기기에 실패했습니다.");
    }
  };


  // --- 렌더링 로직  ---
  
  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  return (
    <> 
      <div className={styles.listContainer}>
        <h2 className={styles.mainTitle}>
          <span className={styles.placeName}>{placeName || "사장"}</span>님과 제휴 맺은 업장
        </h2>
        
        <div className={styles.partnerList}>
          {partners.length === 0 ? (
            <p className={styles.statusMessage}>제휴 맺은 업장이 없습니다.</p>
          ) : (
            partners.map((partner) => (
              <div key={partner.partnershipId} className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>{partner.partnerPlaceName}</p>
                  <p className={styles.partnerAddress}>{partner.partnerStoreAddress}</p>
                </div>
                
                {/* === ACTIVE 카드 (활성 제휴) === */}
                {partner.status === "ACTIVE" && (
                  <div className={styles.partnerActions}>
                    <span className={styles.dateDisplay}>{partner.displayMessage}</span>
                    <button 
                      className={styles.actionButtonYellow}
                      onClick={() => handleViewDetails(partner.partnershipId)}
                    >
                      제휴 내용 보기
                    </button>
                  </div>
                )}
                
                {/* === COMPLETED 카드 (만료된 제휴) === */}
                {partner.status === "COMPLETED" && (
                  <div className={styles.partnerActions}>
                    <button 
                      className={styles.actionButtonGray} 
                      onClick={() => handleExpire(partner.partnershipId)}
                    >
                      만료됨
                    </button>
                    <button 
                      className={styles.deleteButton} // 'x' 버튼
                      onClick={() => handleDismiss(partner.partnershipId)}
                    >
                      &times;
                    </button>
                  </div>
                )}

              </div>
            ))
          )}
        </div>
      </div>

      {/* === 모달 렌더링 === */}
      {isModalOpen && (
        <PartnerDetailModal 
          details={isDetailLoading ? null : selectedPartnerDetails}
          onClose={handleCloseModal}
          placeName={placeName}
        />
      )}
    </>
  );
}

export default MyPartnerList;