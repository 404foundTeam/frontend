import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/my/MyScrap.module.css";
import useAuthStore from "../../store/useAuthStore";

function MyScrap() {
  const [cards, setCards] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const storeUuid = useAuthStore((state) => state.storeUuid);

  useEffect(() => {
    if (!storeUuid) {
      return;
    }

    const fetchCards = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://13.209.239.240/api/v1/sns-cards/final",
          {
            params: {
              storeUuid: storeUuid,
              page: currentPage - 1,
              size: itemsPerPage,
            },
          }
        );

        setCards(response.data.items);
        setTotalItems(response.data.total);
      } catch (err) {
        console.error("API Error:", err);
        setError("카드 목록을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCards();
  }, [currentPage, storeUuid]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 로딩 중이거나 에러가 발생했을 때의 UI는 그대로 유지.
  if (isLoading) return <div className={styles.statusMessage}>로딩 중...</div>;
  if (error) return <div className={styles.statusMessage}>{error}</div>;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>나의 컨텐츠</h1>
        <p className={styles.subtitle}>
          내가 만든 카드뉴스를 한 눈에 관리해보세요
        </p>
      </div>

      <div className={styles.cardGrid}>
        {cards.length > 0 ? (
          // cards 배열에 아이템이 있으면 기존처럼 목록을 렌더링
          cards.map((item) => (
            <div key={item.id}>
              <div className={styles.card}>
                <img
                  src={item.imageUrl}
                  alt={`Card ${item.id}`}
                  className={styles.cardImage}
                />
              </div>
            </div>
          ))
        ) : (
          // cards 배열이 비어있으면 "작성한 카드 뉴스가 없습니다." 메시지를 표시
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
    </>
  );
}

export default MyScrap;
