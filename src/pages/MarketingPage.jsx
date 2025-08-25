// src/pages/MarketingPage.jsx

import styles from "../styles/MarketingPage.module.css";

// 1. 페이지에 사용할 이미지들을 import 합니다.
import cardNewsImage from '../assets/marketingpage/image.png';
import templateImage from '../assets/marketingpage/image copy.png';
import aiGuideImage from '../assets/marketingpage/image copy 2.png';

function MarketingPage() {
  const cardNewsDesc = `AI가 생성한 문구를 활용하여 카드 뉴스를 생성해보세요.
  디자인 전문가 없이 SNS 카드 뉴스를 클릭 몇 번으로 완성할 수 있어요.`;

  const templateDesc = `템플릿과 테마를 골라서 원하는 느낌으로 카드뉴스를 제작할 수 있어요.`;
  const aiGuideDesc = `매장과 상품을 더욱 매력적으로 촬영하도록 구독, 조명, 연출 팁을 제공해요.
누구나 쉽게 따라 할 수 있는 단계별 가이드로,
홍보에 최적화된 사진을 완성하세요.`;

  return (
    <div className={styles.pageContainer}>
      {/* --- 첫 번째 섹션 (텍스트 좌, 이미지 우) --- */}
      <div className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>
            다양한 테마와 판플렛으로 <br />
            AI 카드뉴스를 생성해보세요
          </h2>
          <p className={styles.sectionDescription}>{cardNewsDesc}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={cardNewsImage}
            alt="AI 카드뉴스 생성 예시"
            className={styles.sectionImage}
          />
        </div>
      </div>

      {/* --- 두 번째 섹션 (텍스트 우, 이미지 좌) --- */}
      <div className={`${styles.section} ${styles.layoutRight}`}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>
            원하는 템플릿과 분위기를 <br />
            선택할 수 있어요
          </h2>
          <p className={styles.sectionDescription}>{templateDesc}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={templateImage}
            alt="템플릿 선택 예시"
            className={styles.sectionImage}
          />
        </div>
      </div>

      {/* --- 세 번째 섹션 (텍스트 좌, 이미지 우) --- */}
      <div className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>
            AI 사진 촬영 가이드로 <br />
            가게 홍보 이미지를 전문가스럽게
          </h2>
          <p className={styles.sectionDescription}>{aiGuideDesc}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={aiGuideImage}
            alt="AI 사진 촬영 가이드 예시"
            className={styles.sectionImage}
          />
        </div>
      </div>

      {/* --- 마지막 섹션 (텍스트 중앙 정렬) --- */}
      <div className={styles.centeredSection}>
        <h2 className={styles.sectionTitle}>지도 이용 제휴</h2>
        <p className={styles.sectionDescription}>
          제휴 지도를 통해 간편하게 상대 업체 끼리 제휴 맺기를 요청해보세요.
        </p>
      </div>
    </div>
  );
}

export default MarketingPage;
