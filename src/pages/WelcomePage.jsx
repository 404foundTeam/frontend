import { useEffect, useRef, useState } from "react";
import "../styles/welcome/WelcomePage.css";
import reportImg from "../assets/welcome/report_img.png";
import cardImg01 from "../assets/welcome/card_img01.png";
import cardImg02 from "../assets/welcome/card_img02.png";
import cardImg03 from "../assets/welcome/card_img03.png";
import mapImg from "../assets/welcome/map_img.png";
import TextBox from "../components/welcome/TextBox";
import WelcomeMap from "../components/welcome/WelcomoMap";
import Blur from "../components/welcome/Blur";

function WelcomePage() {
  const [showMap, setShowMap] = useState(false);

  const cardRefs = useRef([]);
  const mapRef = useRef();

  const marketingBoxes = [
    {
      title: "오후 3시 전 음료 사이즈업 무료",
      content:
        "오후 3시에 방문 고객이 적어 방문 고객을 유도하기 위한 사이즈업 이벤트 어떠세요?",
    },
    {
      title: "아메이카노 1+1 이벤트",
      content: "아메리카노 1+1 이벤트 어떠세요?",
    },
    {
      title: "신규 방문객 대상 캠페인",
      content: "신규 방문객 대상 아메리카노 10% 할인 이벤트 어떠세요?",
    },
    {
      title: "축제와 함께 달콤한 디저트 할인",
      content: "축제를 같이 즐길 달콤한 디저트 30% 할인 이벤트 어떠세요?",
    },
  ];

  const clickShowMap = () => {
    setShowMap(true);
  };
  const clickHideMap = () => {
    setShowMap(false);
  };

  // 포커스
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
      {showMap && <Blur />}
      {showMap && <WelcomeMap focusRef={mapRef} onClick={clickHideMap} />}
      <div className="welcome-header-container">
        <div className="welcome-header-box">
          <div className="header-text-box">
            <h1 className="header-title">
              소상공인을 위한
              <br />
              스마트한 마케팅 플랫폼
            </h1>
            <p className="header-text">
              어렵고 복잡한 마케팅과 운영전략을 한번에
            </p>
          </div>
          <div className="header-img bee"></div>
          <div className="header-img bee"></div>
          <div className="header-img hive"></div>
        </div>
        <div className="welcome-header-bottom-box"></div>
      </div>
      <TextBox
        title={"소상공인을 위한 쉽고 빠른 플랫폼, market BEE"}
        content={
          "클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로 관리해보세요."
        }
      />
      <div className="welcome-card-wrapper">
        <div
          className="welcome-card report"
          ref={(el) => (cardRefs.current[0] = el)}
        >
          <div className="line"></div>
          <div className="welcome-text-box report">
            <p className="mini-title">업장 운영 전략</p>
            <h1 className="card-title">스마트 리포트 생성</h1>
            <p className="card-content">
              AI가 리뷰, 방문 데이터를 분석해 매출이 오르는 패턴을 찾아드려요.
              <br />잘 팔리는 메뉴부터 개선 포인트까지 한 눈에 보이는 스마트
              리포트를 받아보세요.
            </p>
          </div>
          <img src={reportImg} className="report-img" />
        </div>
        <div
          className="welcome-card marketing"
          ref={(el) => (cardRefs.current[1] = el)}
        >
          <div className="marketing-boxs left">
            {marketingBoxes.map((item, index) => (
              <div className="marketing-box" key={index}>
                <h1 className="marketing-box-title">{item.title}</h1>
                <p className="marketing-box-content">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="welcome-text-box marketing">
            <p className="mini-title">업장 홍보</p>
            <h1 className="card-title">AI 마케팅</h1>
            <p className="card-content">
              마케팅 방식을 잘 모르는 사람을 위해서
              <br />
              AI가 분석한 데이터를 바탕으로 마케팅 방안을 알려줘요.
            </p>
          </div>
        </div>
        <div
          className="welcome-card sns"
          ref={(el) => (cardRefs.current[2] = el)}
        >
          <div className="welcome-text-box sns">
            <p className="mini-title">업장 홍보</p>
            <h1 className="card-title">SNS 카드 생성</h1>
            <p className="card-content">
              AI가 생성한 문구를 활용하여 카드 뉴스를 생성해보세요.
              <br />
              디자인 전문가 없이 SNS 카드 뉴스를 클릭 몇 번으로 완성할 수
              있어요.
            </p>
          </div>
          <div className="card-img-box">
            <img src={cardImg01} className="card-img" />
            <img src={cardImg02} className="card-img" />
            <img src={cardImg03} className="card-img" />
          </div>
          <div className="line"></div>
        </div>
      </div>
      <TextBox
        title={"가게 운영과 마케팅을 한 번에 잡는 스마트 솔루션"}
        content={"사장님을 위한 새로운 성장과 전략, 지금 시작하세요."}
      />
      <div className="welcome-sign-map">
        <h2 className="welcome-sign-title">업장 등록하기</h2>
        <p className="sign-text">
          업장을 등록해서 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요.
        </p>
        <img src={mapImg} className="welcome-sign-img" />
        <button onClick={clickShowMap} className="welcome-sign-button">
          업장 검색
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
