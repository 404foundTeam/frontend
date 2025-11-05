// src/pages/MarketingPage.jsx

import { Link } from "react-router-dom"; // [추가] Link 컴포넌트를 import 합니다.
import styles from "../styles/about/AboutPage.module.css";

// 1. 페이지에 사용할 이미지들을 import 합니다.
import cardNewsImage from "../assets/marketingpage/image copy 10.png";
import aiGuideImage from "../assets/marketingpage/image copy 2.png";
import smartReportImage from "../assets/marketingpage/image copy 11.png";

function MarketingPage() {
  const cardNewsDesc = `AI가 생성한 문구를 활용하여 카드 뉴스를 생성해보세요
  디자인 전문가 없이 SNS 카드 뉴스를 클릭 몇 번으로 완성할 수 있어요`;

  const aiGuideDesc = `매장과 상품을 더욱 매력적으로 촬영하도록 구도, 조명, 연출 팁을 제공해요
   누구나 쉽게 따라 할 수 있는 단계별 가이드로 홍보에 최적화된 사진을 완성하세요`;

  const smartReportDesc = `AI가 데이터를 자동으로 분석하여 매출, 메뉴별 판매 순위, 개선팁 등을 한눈에 보여줘요`;

  return (
    <div className={styles.pageContainer}>
      {/* --- 첫 번째 섹션  --- */}
      <div className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>카드뉴스 제작</h2>
          <p className={styles.sectionDescription}>{cardNewsDesc}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={cardNewsImage}
            alt="AI 카드뉴스 생성 예시"
            className={styles.sectionImage}
          />
        </div>
        <Link to="/cardnews" className={styles.ctaButton}>
          카드뉴스 제작하기
        </Link>
      </div>

      {/* --- 두 번째 섹션 --- */}
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
            alt="사진 촬영 가이드"
            className={styles.sectionImage}
          />
        </div>
      </div>

      {/* --- 세 번째 섹션  --- */}
      <div className={styles.section}>
        <div className={styles.textContainer}>
          <h2 className={styles.sectionTitle}>스마트 리포트</h2>
          <p className={styles.sectionDescription}>{smartReportDesc}</p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={smartReportImage}
            alt="스마트리포트 예시"
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
