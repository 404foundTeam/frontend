import { useState } from "react";
import "../styles/CardNewsPage.css";
import bannerImg from "../assets/cardnews/banner_img.png";
import SelectHeader from "../components/SelectHeader";
import { generateText } from "../api/api";

function CardNewsPage() {
  // generatedText 임시 데이터
  const textInv = `창가 쪽에서 안쪽으로 찍으면 자연광이 인물과 공간을 부드럽게
            비춥니다. 역광보다는 측광·순광이 좋아요. 나무, 초록 식물, 따뜻한
            조명이 있으면 사진 분위기가 한층 좋아질거에요. 가로사진은 3:2 비율,
            세로사진은 4:5 비율이 SNS에서 가장 반응이 좋아요. 오전 10시~오후 3시
            사이가 가장 자연광이 예쁘게 들어오는 시간이기 때문에 이 시간대에
            사진을 촬영하는 것을 추천해요.`;

  const [type, setType] = useState("");
  const [menu, setMenu] = useState("");
  const [userText, setUserText] = useState("");
  // const [generatedText, setGeneratedText] = useState(null); // textInv를 대체

  const [templete, setTemplete] = useState("");
  const [ratio, setRatio] = useState("");
  const [them, setThem] = useState("");
  // const [cardData, setCardDate] = useState(null);

  const getGenerateText = async () => {
    try {
      const getText = await generateText({ type, userText });
      setGeneratedText(getText);
    } catch (error) {
      console.log("데이터 요청 실패", error);
      alert("텍스트 변환에 실패했습니다.");
    }
  };

  return (
    <div className="cardnews-container">
      <div className="cardnews-banner">
        <img src={bannerImg} className="banner-img" />
        <h1 className="banner-title">어웨이 커피</h1>
        <p className="banner-content">
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
      <div className="cardnews-box-container">
        <div className="cardnews-box cardnews-type">
          <SelectHeader text="어떤 SNS 카드 뉴스를 만들까요?" />
          <div className="select-boxs">
            <div
              className="select-box notice"
              onClick={() => {
                setType(type === "notice" ? "" : "notice");
              }}
            >
              <div className={`box ${type === "notice" ? "select" : ""}`}></div>
              <p className="select-box-title">공지</p>
            </div>
            <div
              className="select-box product_promo"
              onClick={() => {
                setType(type === "product_promo" ? "" : "product_promo");
              }}
            >
              <div
                className={`box ${type === "product_promo" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">신제품 홍보</p>
            </div>
            <div
              className="select-box store_intro"
              onClick={() => {
                setType(type === "store_intro" ? "" : "store_intro");
              }}
            >
              <div
                className={`box ${type === "store_intro" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">매장 소개</p>
            </div>
          </div>
        </div>
        {(type === "notice" || type === "store_intro") && (
          <div className="cardnews-box cardnews-text-box">
            <SelectHeader text="카드뉴스에 넣고 싶은 메뉴 이름을 입력해주세요." />
            <input
              className={`cardnews-text-input ${menu ? "select" : ""}`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={menu}
              onChange={(e) => {
                setMenu(e.target.value);
              }}
            />
          </div>
        )}
        <div className="cardnews-box cardnews-text">
          <SelectHeader text="SNS 카드 뉴스에 넣고 싶은 텍스트를 입력하세요." />
          <div className="cardnews-text-box">
            <input
              className={`cardnews-text-input ${userText ? "select" : ""}`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={userText}
              onChange={(e) => {
                setUserText(e.target.value);
              }}
            />
            <button
              className={`text-button cardnews-text-button ${
                userText ? "select" : ""
              }`}
              onClick={getGenerateText}
            >
              문구 생성
            </button>
          </div>
        </div>
        <div className="cardnews-box cardnews-text-reulst">
          <SelectHeader text="변환 결과" />
          <div className="cardnews-text-result-box">
            <div className={`text-result-show ${textInv ? "select" : ""}`}>
              {textInv}
            </div>
            <button
              className={`text-button cardnews-text-result-button ${
                textInv ? "select" : ""
              }`}
            >
              재생성하기
            </button>
          </div>
        </div>
        <div className="cardnews-box cardnews-templete">
          <SelectHeader text="원하는 템플릿을 선택해주세요." />
          <div className="templete-list">
            <div
              className={`templete-box ${templete === "box1" ? "select" : ""}`}
              onClick={() => {
                setTemplete(templete === "box1" ? "" : "box1");
              }}
            >
              <div className="store-name">업장 이름</div>
              <div className="store-content">본문</div>
            </div>
            <div className="templete-img-box">
              <div
                className={`templete-box ${
                  templete === "box2" ? "select" : ""
                }`}
                onClick={() => {
                  setTemplete(templete === "box2" ? "" : "box2");
                }}
              >
                <div className="templete-text bottom">이미지</div>
                <div className="store-name bottom">업장 이름</div>
                <div className="store-content bottom">본문</div>
              </div>
            </div>
            <div className="templete-img-box">
              <div
                className={`templete-box ${
                  templete === "box3" ? "select" : ""
                }`}
                onClick={() => {
                  setTemplete(templete === "box3" ? "" : "box3");
                }}
              >
                <div className="templete-text right">이미지</div>
                <div className="store-name right">업장 이름</div>
                <div className="store-content right">본문</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardnews-box cardnews-ratio">
          <SelectHeader text="원하는 비율을 선택해주세요." />
          <div className="select-boxs">
            <div
              className="select-box normal"
              onClick={() => {
                setRatio(ratio === "nor" ? "" : "nor");
              }}
            >
              <div className={`box ${ratio === "nor" ? "select" : ""}`}></div>
              <p className="select-box-title">1:1 비율</p>
            </div>
            <div
              className="select-box hor"
              onClick={() => {
                setRatio(ratio === "hor" ? "" : "hor");
              }}
            >
              <div className={`box ${ratio === "hor" ? "select" : ""}`}></div>
              <p className="select-box-title">4:5 비율(가로)</p>
            </div>
            <div
              className="select-box ver"
              onClick={() => {
                setRatio(ratio === "ver" ? "" : "ver");
              }}
            >
              <div className={`box ${ratio === "ver" ? "select" : ""}`}></div>
              <p className="select-box-title">4:5 비율(세로)</p>
            </div>
          </div>
        </div>
        <div className="cardnews-box cardnews-them">
          <SelectHeader text="원하는 테마를 선택해주세요." />
          <div className="them-list">
            <div className="them-box">
              <div>따뜻하고 편안한 분위기</div>
            </div>
            <div className="them-box">
              <div>깔끔하고 모던한 분위기</div>
            </div>
            <div className="them-box">
              <div>활기차고 밝은 분위기</div>
            </div>
          </div>
        </div>
      </div>
      {type && textInv && templete && ratio && them && (
        <button className="cardnews-button">완료</button>
      )}
    </div>
  );
}

export default CardNewsPage;
