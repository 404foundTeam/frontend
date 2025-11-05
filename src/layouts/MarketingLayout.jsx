import { Outlet, Link } from "react-router-dom";
// import SideBar from "../components/layout/SideBar";
import styles from "../styles/marketing/MarketingLayout.module.css";

// 배너에 필요한 이미지들 import.
import illustration from "../assets/marketingpage/image copy 9.png";
// import btnCardNews from "../assets/marketingpage/image copy 3.png";
// import btnMap from "../assets/marketingpage/image copy 4.png";
// import btnPhoto from "../assets/marketingpage/image copy 5.png";
// import btnMain from "../assets/marketingpage/image copy 6.png";
import partnershipIllustration from "../assets/marketingpage/image copy 8.png";

function MarketingLayout() {
  return (
    <div className={styles.layoutContainer}>
      {/* <SideBar /> */}
      <main className={styles.mainContent}>
        {/* --- 여기에 배너 코드를 추가합니다 --- */}
        <div className={styles.banner}>
          <div className={styles.bannerContentWrapper}>
            {/* 배너 왼쪽 텍스트 영역 */}
            <div className={styles.bannerInfo}>
              <h1 className={styles.bannerTitle}>
                AI 카드 뉴스 제작부터
                <br />
                사진 촬영 가이드, 스마트 리포트까지
              </h1>
              <p className={styles.bannerSubtitle}>
                홍보와 관리에 필요한 모든 것을 한번에 제공해요.
              </p>
            </div>

            {/* 배너 오른쪽 일러스트 영역 */}
            <img
              src={illustration}
              alt="홍보 일러스트"
              className={styles.illustration}
            />

            {/* 배너 오른쪽 이미지 버튼 그리드 영역 */}
            {/* <div className={styles.buttonGrid}>
              <Link to="/cardnews">
                <img
                  src={btnCardNews}
                  alt="카드뉴스 생성"
                  className={styles.imageButton}
                />
              </Link>
              <Link to="/map">
                <img
                  src={btnMap}
                  alt="지도 이용 제휴"
                  className={styles.imageButton}
                />
              </Link>
              <Link to="/camera">
                <img
                  src={btnPhoto}
                  alt="사진 가이드"
                  className={styles.imageButton}
                />
              </Link>
              <Link to="/main">
                <img
                  src={btnMain}
                  alt="메인 페이지"
                  className={styles.imageButton}
                />
              </Link>
            </div> */}
          </div>
        </div>
        {/* --- 배너 코드 끝 --- */}

        <Outlet />

        {/* --- 제휴 배너 코드  --- */}
        <div className={styles.partnershipBanner}>
          <div className={styles.bannerIllustrationContainer}>
            <img
              src={partnershipIllustration}
              alt="Partnership Illustration"
              className={styles.bannerIllustration}
            />
          </div>
          <div className={styles.bannerListContainer}>
            {/* ... (이하 내용은 동일) ... */}
            <h2 className={styles.listTitle}>제휴를 원하는 상대 업체</h2>
            <div className={styles.partnerList}>
              {/* 파트너 카드 1 */}
              <div className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>아침애 샌드위치</p>
                  <p className={styles.partnerAddress}>구갈로 55 1층 105호</p>
                </div>
                <div className={styles.partnerButtons}>
                  <button
                    className={`${styles.partnerButton} ${styles.acceptButton}`}
                  >
                    맺기
                  </button>
                  <button
                    className={`${styles.partnerButton} ${styles.declineButton}`}
                  >
                    거절
                  </button>
                </div>
              </div>
              {/* 파트너 카드 2 */}
              <div className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>에덴 꽃나라</p>
                  <p className={styles.partnerAddress}>
                    구갈로60번길 19 금강프라자 102호
                  </p>
                </div>
                <div className={styles.partnerButtons}>
                  <button
                    className={`${styles.partnerButton} ${styles.acceptButton}`}
                  >
                    맺기
                  </button>
                  <button
                    className={`${styles.partnerButton} ${styles.declineButton}`}
                  >
                    거절
                  </button>
                </div>
              </div>
              {/* 파트너 카드 3 */}
              <div className={styles.partnerCard}>
                <div className={styles.partnerInfo}>
                  <p className={styles.partnerName}>모퉁이꽃집</p>
                  <p className={styles.partnerAddress}>
                    경기도 용인시 기흥구 기흥역로58번길 78 기흥역더샵오피스텔
                    201동 112호
                  </p>
                </div>
                <div className={styles.partnerButtons}>
                  <button
                    className={`${styles.partnerButton} ${styles.acceptButton}`}
                  >
                    맺기
                  </button>
                  <button
                    className={`${styles.partnerButton} ${styles.declineButton}`}
                  >
                    거절
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --- 배너 코드 끝 --- */}
      </main>
    </div>
  );
}

export default MarketingLayout;
