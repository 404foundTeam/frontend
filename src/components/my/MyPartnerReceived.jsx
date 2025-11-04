import React, { useState, useEffect } from "react";
import { 
  getReceivedRequests, 
  getPartnerDetails, 
  acceptPartnership, 
  rejectPartnership 
} from "../../api/index";
import PartnerRequestModal from "./PartnerRequestModal"; 
import useAuthStore from "../../store/useAuthStore";
import useActiveStore from "../../store/useActiveStore"; 
import styles from "../../styles/my/MyPartnership.module.css"; 


function MyPartnerReceived() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerDetails, setSelectedPartnerDetails] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  
  const placeName = useAuthStore((state) => state.placeName); 
  const setMyActiveTab = useActiveStore((state) => state.setMyActive);

  // 목록을 다시 불러오는 함수 (수락/거절 후 새로고침용)
  const fetchReceivedRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReceivedRequests(); 
      setRequests(data);
    } catch (err) {
      console.error("API Error:", err);
      setError("요청 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReceivedRequests();
  }, []); 

  // "요청 확인하기" 버튼 클릭 (모달 열기) - 실제 API 호출
  const showDetails = async (id) => {
    setIsModalOpen(true); 
    setIsDetailLoading(true); 
    
    try {
      const details = await getPartnerDetails(id); 
      setSelectedPartnerDetails(details);
    } catch(err) {
      console.error("상세 내용 조회 실패:", err);
      alert("상세 내용 조회에 실패했습니다.");
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

  // 모달 "수락" 버튼 클릭 - 실제 API 호출
  const handleAccept = async () => {
    const id = selectedPartnerDetails.partnershipId;
    if (!window.confirm("이 제휴를 수락하시겠습니까?")) return;
    
    try {
      await acceptPartnership(id);
      
      alert("제휴를 수락했습니다.");
      handleCloseModal(); // 모달 닫기
      setMyActiveTab("PARTNERSHIP_LIST"); // "제휴 맺은 업장" 탭으로 이동
    
    } catch (err) {
      console.error("수락 API 실패:", err);
      alert("제휴 수락 처리에 실패했습니다.");
    }
  };

  // 7. 모달 "거절" 버튼 클릭 - 실제 API 호출
  const handleReject = async () => {
    const id = selectedPartnerDetails.partnershipId;
    if (!window.confirm("이 제휴를 거절하시겠습니까?")) return;
    
    try {
      // 실제 API 호출
      await rejectPartnership(id);

      setRequests(requests.filter(p => p.partnershipId !== id)); 
      alert("제휴를 거절했습니다.");
      handleCloseModal(); // 모달 닫기
    
    } catch (err) {
      console.error("거절 API 실패:", err);
      alert("제휴 거절 처리에 실패했습니다.");
    }
  };

  // --- 렌더링 로직 ---
  
  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  return (
    <> 
      <div className={styles.listContainer}>
        <h2 className={styles.mainTitle}>
          <span className={styles.placeName}>{placeName || "사장"}</span>님이 제휴 요청받은 업장
        </h2>
        
        <div className={styles.partnerList}>
          {requests.length === 0 ? (
            <p className={styles.statusMessage}>제휴 요청받은 업장이 없습니다.</p>
          ) : (
            requests.map((req) => (
              <div key={req.partnershipId} className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>{req.partnerPlaceName}</p>
                  <p className={styles.partnerAddress}>{req.partnerStoreAddress}</p>
                </div>
                
                {req.status === "PENDING" && (
                  <div className={styles.partnerActions}>
                    <button 
                      className={styles.actionButtonYellow} 
                      onClick={() => showDetails(req.partnershipId)}
                    >
                      요청 확인하기
                    </button>                    
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 'PartnerRequestModal'을 렌더링 */}
      {isModalOpen && (
        <PartnerRequestModal 
          details={isDetailLoading ? null : selectedPartnerDetails}
          onClose={handleCloseModal}
          onAccept={handleAccept}
          onReject={handleReject}
          placeName={placeName}
        />
      )}
    </>
  );
}

export default MyPartnerReceived;