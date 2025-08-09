import { useEffect, useRef } from "react";
import img01 from "../assets/welcome_img01.png";
import img05 from "../assets/welcome_img05.png";
import "../styles/WelcomePage.css";

function WelcomePage() {
  const cardRefs = useRef([]);

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
    <div className="container">
      <div className="header-container">
        <div className="header-box">
          <div>
            <h2 className="header-title">소상공인 마케팅</h2>
            <div className="text">어렵고 복잡한 마케팅과 운영전략을 한번에</div>
          </div>
          <img src={img01} className="header-img" />
        </div>
        <div className="bottom"></div>
      </div>
      <div className="text-container">
        <h2>소상공인을 위한 쉽고 빠른 플랫폼, market BEE</h2>
        <p>
          클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요
        </p>
      </div>
      <div className="card-wrapper">
        <div className="card report" ref={(el) => (cardRefs.current[0] = el)}>
          <div className="right text-box">
            <p className="mini">업장 자동 운영</p>
            <h1 className="card-title">스마트 리포트 생성</h1>
            <p>어렵고 복잡한 마케팅과 운영전략을 한번에</p>
          </div>
          <div className="right-box img-box"></div>
        </div>
        <div
          className="card marketing"
          ref={(el) => (cardRefs.current[1] = el)}
        >
          <div className="left-box img-box"></div>
          <div className="left text-box">
            <h1 className="card-title">AI 마케팅</h1>
            <p>어렵고 복잡한 마케팅과 운영전략을 한번에</p>
          </div>
        </div>
        <div className="card sns" ref={(el) => (cardRefs.current[2] = el)}>
          <div className="right text-box">
            <h1 className="card-title">SNS 카드 생성</h1>
            <p>어렵고 복잡한 마케팅과 운영전략을 한번에</p>
          </div>
          <div className="right-box img-box"></div>
        </div>
      </div>
      <div className="text-container">
        <h2>소상공인을 위한 쉽고 빠른 플랫폼, market BEE</h2>
        <p>
          클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요
        </p>
      </div>
      <div className="sign-map">
        <h2 className="sign-title">업장 등록하기</h2>
        <p className="sign-content">
          클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로
          관리해보세요
        </p>
        <img src={img05} />
        <button>업장 검색</button>
      </div>
    </div>
  );
}

export default WelcomePage;
