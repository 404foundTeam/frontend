// src/layouts/MarketingLayout.jsx

import { Outlet, Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../styles/MarketingLayout.module.css";

// 1. 배너에 필요한 이미지들을 import 합니다.
// (경로는 실제 프로젝트 파일 위치에 맞게 꼭 수정해주세요!)
import illustration from "../assets/marketingpage/image copy 7.png";
import btnCardNews from "../assets/marketingpage/image copy 3.png";
import btnMap from "../assets/marketingpage/image copy 4.png";
import btnPhoto from "../assets/marketingpage/image copy 5.png";
import btnMain from "../assets/marketingpage/image copy 6.png";
import partnershipIllustration from "../assets/marketingpage/image copy 8.png";

function MarketingLayout() {
  return (
    <div className={styles.layoutContainer}>
      <SideBar />
      {/* Outlet은 항상 main 콘텐츠 영역 안에 위치해야 합니다. */}
      <main className={styles.mainContent}>
        {/* --- 여기에 배너 코드를 추가합니다 --- */}
        <div className={styles.banner}>
          <div className={styles.bannerContentWrapper}>
            {/* 배너 왼쪽 텍스트 및 일러스트 영역 */}
            <div className={styles.bannerInfo}>
              <h1 className={styles.bannerTitle}>
                AI 카드뉴스 제작부터
                <br />
                지도 이용 제휴, 사진 촬영 가이드까지
              </h1>
              <p className={styles.bannerSubtitle}>
                홍보에 필요한 모든 것을 한번에 제공해요.
              </p>
              <img
                src={illustration}
                alt="홍보 일러스트"
                className={styles.illustration}
              />
            </div>

            {/* 배너 오른쪽 이미지 버튼 그리드 영역 */}
            <div className={styles.buttonGrid}>
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
            </div>
          </div>
        </div>
        {/* --- 배너 코드 끝 --- */}

        <Outlet />
        <div className={styles.partnershipBanner}>
          <div className={styles.bannerIllustrationContainer}>
            <img
              src={partnershipIllustration}
              alt="Partnership Illustration"
              className={styles.bannerIllustration}
            />
          </div>

          <div className={styles.bannerListContainer}>
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
