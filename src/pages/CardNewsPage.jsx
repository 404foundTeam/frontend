import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backgroundImg, backgroundImg2, generateText } from "../api/index.js";
import "../styles/cardnews/CardNewsPage.css";
import bannerImg from "../assets/cardnews/banner_img.png";
import SelectHeader from "../components/SelectHeader";
import useUuidStore from "../store/useUuidStore.js";
import useCardStore from "../store/useCardStore.js";
import useTextStore from "../store/useTextStore.js";
import SelectBox from "../components/cardnews/SelectBox.jsx";
import axios from "axios";
// import Loading from "../components/Loading.jsx";

function CardNewsPage() {
  const navigate = useNavigate();

  const storeUuid = useUuidStore((state) => state.storeUuid);
  const storeName = useUuidStore((state) => state.storeName);
  const setText = useTextStore((state) => state.setText);
  const setCard = useCardStore((state) => state.setCard);

  const [cardType, setCardType] = useState("");
  const [menuName, setMenuName] = useState("");
  const [userText, setUserText] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [template, setTemplate] = useState("");
  const [ratio, setRatio] = useState("");
  const [theme, setTheme] = useState("");

  const getGenerateText = async () => {
    console.log("text1");
    try {
      console.log(cardType);
      console.log(userText);
      const getText = await generateText({ type: cardType, userText });
      console.log(getText);
      setGeneratedText(getText.generatedText);
      setText(getText.generatedText);
    } catch (error) {
      console.log("데이터 요청 실패", error);
      alert("텍스트 변환에 실패했습니다.");
    }
  };

  const postCardNews = async () => {
    console.log(1);

    console.log("이미지 POST!");

    const cardData = {
      storeUuid: "e284a976-5b2c-47c7-b115-d350e47539c8",
      storeName: "여수에서온나진국밥 용인기흥구청점",
      cardType: "NOTICE",
      menuName: "돼지국밥",
      generatedText:
        "추석 연휴에도 정상 영업합니다.\n 가족과 함께 특별한 시간을 보내세요!",
      template: "T1_TEXT_ONLY",
      ratio: "SQUARE_1_1",
      theme: "MODERN",
    };

    console.log(2);
    console.log(cardData);
    try {
      console.log("trying...");
      const getCard = await backgroundImg2(cardData);
      console.log(getCard);
      console.log(getCard.url);

      setCard(getCard);

      navigate("/cardnews/result");
    } catch (error) {
      console.log(error);
    }

    console.log("finish");
  };

  return (
    <div className="cardnews-container">
      <div className="cardnews-banner">
        <img src={bannerImg} className="banner-img" />
        <h1 className="banner-title">{storeName}</h1>
        <p className="banner-content">
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
      <div className="cardnews-box-container">
        <div className="cardnews-box cardnews-type">
          <SelectHeader text="어떤 SNS 카드 뉴스를 만들까요?" />
          <div className="select-boxs">
            <SelectBox
              value="notice"
              selected={cardType === "NOTICE"}
              onClick={() => {
                setCardType(cardType === "NOTICE" ? "" : "NOTICE");
              }}
              label="공지"
            />
            <SelectBox
              value="product_promo"
              selected={cardType === "PRODUCT_PROMO"}
              onClick={() => {
                setCardType(
                  cardType === "PRODUCT_PROMO" ? "" : "PRODUCT_PROMO"
                );
              }}
              label="신제품 홍보"
            />
            <SelectBox
              value="store_intro"
              selected={cardType === "STORE_INTRO"}
              onClick={() => {
                setCardType(cardType === "STORE_INTRO" ? "" : "STORE_INTRO");
              }}
              label="매장 소개"
            />
          </div>
        </div>
        {(cardType === "NOTICE" || cardType === "STORE_INTRO") && (
          <div className="cardnews-box cardnews-text-box">
            <SelectHeader text="카드뉴스에 넣고 싶은 메뉴 이름을 입력해주세요." />
            <input
              className={`cardnews-text-input ${menuName ? "select" : ""}`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={menuName}
              onChange={(e) => {
                setMenuName(e.target.value);
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
            <div
              className={`text-result-show ${generatedText ? "select" : ""}`}
            >
              {generatedText && generatedText}
            </div>
            <button
              className={`text-button cardnews-text-result-button ${
                generatedText ? "select" : ""
              }`}
              onClick={getGenerateText}
            >
              재생성하기
            </button>
          </div>
        </div>
        <div className="cardnews-box cardnews-template">
          <SelectHeader text="원하는 템플릿을 선택해주세요." />
          <p>* 회색 배경은 AI가 텍스트로 만든 이미지입니다.</p>
          <div className="template-list">
            <div
              className={`template-box ${
                template === "T1_TEXT_ONLY" ? "select" : ""
              }`}
              onClick={() => {
                setTemplate(template === "T1_TEXT_ONLY" ? "" : "T1_TEXT_ONLY");
              }}
            >
              <div className="store-content">생성된 텍스트</div>
            </div>
            <div className="template-img-box">
              <div
                className={`template-box ${
                  template === "T2_TEXT_BOTTOM" ? "select" : ""
                }`}
                onClick={() => {
                  setTemplate(
                    template === "T2_TEXT_BOTTOM" ? "" : "T2_TEXT_BOTTOM"
                  );
                }}
              >
                <div className="template-text bottom">이미지</div>
                <div className="store-content bottom">생성된 텍스트</div>
              </div>
            </div>
            <div className="template-img-box">
              <div
                className={`template-box ${
                  template === "T3_TEXT_RIGHT" ? "select" : ""
                }`}
                onClick={() => {
                  setTemplate(
                    template === "T3_TEXT_RIGHT" ? "" : "T3_TEXT_RIGHT"
                  );
                }}
              >
                <div className="template-text right">이미지</div>
                <div className="store-content right">생성된 텍스트</div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardnews-box cardnews-ratio">
          <SelectHeader text="원하는 비율을 선택해주세요." />
          <div className="select-boxs">
            <SelectBox
              value="normal"
              selected={ratio === "SQUARE_1_1"}
              onClick={() => {
                setRatio(ratio === "SQUARE_1_1" ? "" : "SQUARE_1_1");
              }}
              label="1:1 비율"
            />
            <SelectBox
              value="hor"
              selected={ratio === "RATIO_2_3"}
              onClick={() => {
                setRatio(ratio === "RATIO_2_3" ? "" : "RATIO_2_3");
              }}
              label="4:5 비율(가로)"
            />
            <SelectBox
              value="ver"
              selected={ratio === "RATIO_3_2"}
              onClick={() => {
                setRatio(ratio === "RATIO_3_2" ? "" : "RATIO_3_2");
              }}
              label="4:5 비율(세로)"
            />
          </div>
        </div>
        <div className="cardnews-box cardnews-theme">
          <SelectHeader text="원하는 테마를 선택해주세요." />
          <div className="theme-list">
            <div
              className={`theme-box ${theme === "WARM" ? "select" : ""}`}
              onClick={() => {
                setTheme(theme === "WARM" ? "" : "WARM");
              }}
            >
              따뜻하고 편안한 분위기
            </div>
            <div
              className={`theme-box ${theme === "MODERN" ? "select" : ""}`}
              onClick={() => {
                setTheme(theme === "MODERN" ? "" : "MODERN");
              }}
            >
              깔끔하고 모던한 분위기
            </div>
            <div
              className={`theme-box ${theme === "BRIGHT" ? "select" : ""}`}
              onClick={() => {
                setTheme(theme === "BRIGHT" ? "" : "BRIGHT");
              }}
            >
              활기차고 밝은 분위기
            </div>
          </div>
        </div>
      </div>
      {/* {cardType && generatedText && template && ratio && theme && ( */}
      <button className="cardnews-button" onClick={postCardNews}>
        완료
      </button>
      {/* )} */}
    </div>
  );
}

export default CardNewsPage;
