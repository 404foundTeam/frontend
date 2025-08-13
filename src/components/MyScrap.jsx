import { useState } from 'react';
import styles from '../styles/MyScrap.module.css';
import myImg01 from '../assets/mypage/image copy.png';
import myImg02 from '../assets/mypage/image copy 1.png';
import myImg03 from '../assets/mypage/image copy 2.png';
import myImg04 from '../assets/mypage/image copy 3.png';
import myImg05 from '../assets/mypage/image copy 4.png';
import myImg06 from '../assets/mypage/image copy 5.png';
import myImg07 from '../assets/mypage/image copy 4.png';
import myImg08 from '../assets/mypage/image copy 5.png';


// 실제로는 API로 받아올 데이터입니다.
const dummyData = [
  { id: 1, title: '공지', img: myImg01 },
  { id: 2, title: '홍보', img: myImg02 },
  { id: 3, title: '공지', img: myImg03 },
  { id: 4, title: '홍보', img: myImg04 },
  { id: 5, title: '신메뉴소개', img: myImg05 },
  { id: 6, title: '공지', img: myImg06 },
  { id: 7, title: '테스트 추가 데이터', img: myImg07 },
  { id: 8, title: '테스트 추가 데이터', img: myImg08 },
];

function MyScrap() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  return (
    <>
      <div className={styles.cardGrid}>
        {currentItems.map((item) => (
          // 3. 이제 key={item.id}는 항상 고유한 값을 가집니다.
          <div key={item.id}>
            <div className={styles.card}>
              <img src={item.img} alt={item.title} className={styles.cardImage} />
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default MyScrap;