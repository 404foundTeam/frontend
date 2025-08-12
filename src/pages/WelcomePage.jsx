import { useEffect, useRef, useState } from "react";
import img01 from "../assets/welcome_img01.png";
import img05 from "../assets/welcome_img05.png";
import TextBox from "../components/TextBox";
import WelcomeMap from "../components/WelcomoMap";
import "../styles/WelcomePage.css";
import Blur from "../components/Blur";

function WelcomePage() {
  const cardRefs = useRef([]);
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);

  const clickShowMap = () => {
    setShowMap(true);
  };
  const clickHideMap = () => {
    setShowMap(false);
  };

  useEffect(() => {
    mapRef.current?.focus();
  }, [showMap]);

  useEffect(() => {
    // 새로고침 시 최상단 이동
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 관찰되면 클래스 추가
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } // 카드의 20%가 보이면 실행
    );
    // div 태그 DOM 엘리먼트들을 ref로 cardRefs 배열에 저장
    // 해당 문을 통해 cardRefs 순회하며 각 요소 개별 관찰
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect(); // 모두 멈춤
  }, []);

  return (
    <div className="welcome-container">
      {/* <WelcomeMap onClick={clickHideMap} /> */}
      {showMap && <Blur />}
      {showMap && <WelcomeMap focusRef={mapRef} onClick={clickHideMap} />}
      <div className="welcome-header-container">
        <div className="welcome-header-box">
          <div>
            <h1 className="header-title">소상공인 마케팅</h1>
            <p className="text header">
              어렵고 복잡한 마케팅과 운영전략을 한번에
            </p>
          </div>
          <img src={img01} className="welcome-header-img" />
        </div>
        <div className="welcome-header-bottom-box"></div>
      </div>
      <div className="welcome-content-container">
        <TextBox />
        <div className="welcome-card-wrapper">
          <div
            className="welcome-card report"
            ref={(el) => (cardRefs.current[0] = el)}
          >
            <div className="welcome-text-box right">
              <p className="mini-title">업장 자동 운영</p>
              <h1 className="card-title">스마트 리포트 생성</h1>
              <p className="text card">
                어렵고 복잡한 마케팅과 운영전략을 한번에
              </p>
            </div>
            <div className="img-box right"></div>
          </div>
          <div
            className="welcome-card marketing"
            ref={(el) => (cardRefs.current[1] = el)}
          >
            <div className="img-box left"></div>
            <div className="welcome-text-box left">
              <p className="mini-title">업장 자동 운영</p>
              <h1 className="card-title">AI 마케팅</h1>
              <p className="text card">
                어렵고 복잡한 마케팅과 운영전략을 한번에
              </p>
            </div>
          </div>
          <div
            className="welcome-card sns"
            ref={(el) => (cardRefs.current[2] = el)}
          >
            <div className="welcome-text-box right">
              <p className="mini-title">업장 자동 운영</p>
              <h1 className="card-title">SNS 카드 생성</h1>
              <p className="text card">
                어렵고 복잡한 마케팅과 운영전략을 한번에
              </p>
            </div>
            <div className="img-box right"></div>
          </div>
        </div>
        <TextBox />
      </div>
      <div className="welcome-sign-map">
        <h2 className="welcome-sign-title">업장 등록하기</h2>
        <p className="text sign">
          클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요
        </p>
        <img src={img05} className="welcome-sign-img" />
        <button onClick={clickShowMap} className="welcome-sign-button">
          업장 검색
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
