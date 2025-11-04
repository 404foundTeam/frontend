import React, { useState, useEffect } from "react";
// 1. API 함수 import
import { getSentRequests, getPartnerDetails, deletePartnership } from "../../api/index"; 
import PartnerDetailModal from "./PartnerDetailModal"; 
import useAuthStore from "../../store/useAuthStore";
import styles from "../../styles/my/MyPartnerSent.module.css"; 
import useActiveStore from "../../store/useActiveStore";

// 2. 목업 데이터 모두 삭제

function MyPartnerSent() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerDetails, setSelectedPartnerDetails] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  
  const placeName = useAuthStore((state) => state.placeName); 
  const setMyActiveTab = useActiveStore((state) => state.setMyActive);

  useEffect(() => {
    const fetchSentRequests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 3. 실제 API를 호출
        const data = await getSentRequests(); 
        
        // 정렬: 거절됨(REJECTED)이 위로 오도록
        data.sort((a, b) => {
          if (a.status === 'REJECTED' && b.status !== 'REJECTED') return -1;
          if (a.status !== 'REJECTED' && b.status === 'REJECTED') return 1;
          return 0;
        });
        
        setRequests(data);
      } catch (err) {
        console.error("API Error:", err);
        setError("요청 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSentRequests();
  }, []); // 컴포넌트 마운트 시 1회 실행

  // --- 핸들러 함수들 ---

  // 4. 상세 보기 (모달 열기) 함수 - 실제 API 호출
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
      setIsDetailLoading(false); // 로딩 끝
    }
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartnerDetails(null);
  };

  // 5. 목록에서 삭제 (X 버튼) 함수 - 실제 API 호출
  const handleDismiss = async (id) => {
    if (!window.confirm("이 제휴 요청을 삭제하시겠습니까?")) {
      return;
    }

    try {
      // deletePartnership 함수 호출
      await deletePartnership(id); 
      
      // UI에서 즉시 반영
      setRequests(requests.filter(p => p.partnershipId !== id));
      alert("제휴 요청이 삭제되었습니다.");

    } catch (err) {
      console.error("삭제 API 실패:", err);
      alert("요청 삭제에 실패했습니다.");
    }
  };
  
  // '나의 제휴 보러가기' 버튼 클릭
  const handleNavigateToList = () => {
    setMyActiveTab("PARTNERSHIP_LIST"); 
  };


  // --- 렌더링 로직 ---
  
  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  return (
    <> 
      <div className={styles.listContainer}>
        <div className={styles.titleContainer}>
          <h2 className={styles.mainTitle}>
            <span className={styles.placeName}>{placeName || "사장"}</span>님이 제휴 요청한 업장
          </h2>
          <button 
            className={styles.headerButton}
            onClick={handleNavigateToList}
          >
            나의 제휴 보러가기
          </button>
        </div>
        
        <div className={styles.partnerList}>
          {requests.length === 0 ? (
            <p className={styles.statusMessage}>제휴 요청한 업장이 없습니다.</p>
          ) : (
            requests.map((req) => (
              <div key={req.partnershipId} className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>{req.partnerPlaceName}</p>
                  <p className={styles.partnerAddress}>{req.partnerStoreAddress}</p>
                </div>
                
                {/* === REJECTED (거절됨) === */}
                {req.status === "REJECTED" && (
                  <div className={styles.partnerActions}>
                    <span className={`${styles.statusText} ${styles.statusTextReject}`}>
                      {req.displayMessage}
                    </span>
                    <button 
                      className={styles.actionButtonGray}
                      onClick={() => showDetails(req.partnershipId)}
                    >
                      제휴 내용 보기
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDismiss(req.partnershipId)}
                    >
                      &times;
                    </button>
                  </div>
                )}
                
                {/* === PENDING (대기중) === */}
                {req.status === "PENDING" && (
                  <div className={styles.partnerActions}>
                    <span className={`${styles.statusText} ${styles.statusTextPending}`}>
                      {req.displayMessage}
                    </span>
                    <button 
                      className={styles.actionButtonYellow}
                      onClick={() => showDetails(req.partnershipId)}
                    >
                      제휴 내용 보기
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => handleDismiss(req.partnershipId)}
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

      {/* === 모달 렌더링 (재사용) === */}
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

export default MyPartnerSent;