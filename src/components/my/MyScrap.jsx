import { useState, useEffect } from "react";
import { api, deleteCard } from "../../api/index";
import styles from "../../styles/my/MyScrap.module.css";
import useAuthStore from "../../store/useAuthStore";
import { toast } from "react-toastify";

function MyScrap() {
  const [cards, setCards] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const storeUuid = useAuthStore((state) => state.storeUuid);

  const fetchCards = async (page) => {
    if (!storeUuid) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get("/sns-cards/final", {
        params: {
          storeUuid: storeUuid,
          page: page - 1,
          size: itemsPerPage,
        },
      });

      setCards(response.data.items);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("API Error:", err);
      setError("카드 목록을 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect는 currentPage나 storeUuid가 바뀔 때 fetchCards를 호출
  useEffect(() => {
    fetchCards(currentPage);
  }, [currentPage, storeUuid]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleDelete = async (id) => {
    if (!window.confirm("이 카드뉴스를 정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      // API 호출
      await deleteCard(id);

      toast(<ToastMessage>카드뉴스가 삭제되었습니다.</ToastMessage>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      // 만약 마지막 페이지의 마지막 항목을 삭제했다면, 이전 페이지로 이동
      if (cards.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // 현재 페이지 목록을 다시 불러옴
        fetchCards(currentPage);
      }
    } catch (err) {
      console.error("Delete API Error:", err);
      toast.error("카드 삭제에 실패했습니다.");
    }
  };

  // --- 렌더링 로직 ---

  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  return (
    <div className={styles.ScrapContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>나의 카드뉴스</h1>
        <p className={styles.subtitle}>
          내가 만든 카드뉴스를 한 눈에 관리해보세요
        </p>
      </div>

      <div className={styles.cardGrid}>
        {cards.length > 0 ? (
          cards.map((item) => (
            <div key={item.id}>
              <div className={styles.card}>
                <img
                  src={item.imageUrl}
                  alt={`Card ${item.id}`}
                  className={styles.cardImage}
                />

                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.id)}
                  title="삭제하기"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>작성한 카드 뉴스가 없습니다.</p>
        )}
      </div>

      {totalItems > 0 && (
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

export default MyScrap;
