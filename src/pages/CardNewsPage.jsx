import { useState } from "react";
import "../styles/cardnews/CardNewsPage.css";
import bannerImg from "../assets/cardnews/banner_img.png";
import SelectHeader from "../components/SelectHeader";
import { backgroundImg, generateText } from "../api/index.js";
import useUuidStore from "../store/useUuidStore.js";
import useCardStore from "../store/useCardStore.js";
import useTextStore from "../store/useTextStore.js";

function CardNewsPage() {
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const storeName = useUuidStore((state) => state.storeName);
  const setText = useTextStore((state) => state.setText);
  const setCard = useCardStore((state) => state.setCard);

  const [cardType, setCardType] = useState("");
  const [menuName, setMenuName] = useState("");
  const [userText, setUserText] = useState("");
  const [generatedText, setGeneratedText] =
    useState(`창가 쪽에서 안쪽으로 찍으면 자연광이 인물과 공간을 부드럽게
            비춥니다. 역광보다는 측광·순광이 좋아요. 나무, 초록 식물, 따뜻한
            조명이 있으면 사진 분위기가 한층 좋아질거에요. 가로사진은 3:2 비율,
            세로사진은 4:5 비율이 SNS에서 가장 반응이 좋아요. 오전 10시~오후 3시
            사이가 가장 자연광이 예쁘게 들어오는 시간이기 때문에 이 시간대에
            사진을 촬영하는 것을 추천해요.`);
  const [template, setTemplate] = useState("");
  const [ratio, setRatio] = useState("");
  const [theme, setTheme] = useState("");

  const getGenerateText = async () => {
    try {
      const getText = await generateText({ cardType, userText });
      setGeneratedText(getText.data);
      setText({ generatedText: getText.data });
    } catch (error) {
      console.log("데이터 요청 실패", error);
      alert("텍스트 변환에 실패했습니다.");
    }
  };

  const postCardNews = async () => {
    const cardData = {
      storeUuid,
      storeName,
      cardType,
      menuName,
      generatedText,
      template,
      ratio,
      theme,
    };
    try {
      const getCard = await backgroundImg(cardData);
      setCard(getCard.data);
    } catch (error) {
      console.log(error);
    }
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
            <div
              className="select-box notice"
              onClick={() => {
                setCardType(cardType === "NOTICE" ? "" : "NOTICE");
              }}
            >
              <div
                className={`box ${cardType === "NOTICE" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">공지</p>
            </div>
            <div
              className="select-box product_promo"
              onClick={() => {
                setCardType(
                  cardType === "PRODUCT_PROMO" ? "" : "PRODUCT_PROMO"
                );
              }}
            >
              <div
                className={`box ${
                  cardType === "PRODUCT_PROMO" ? "select" : ""
                }`}
              ></div>
              <p className="select-box-title">신제품 홍보</p>
            </div>
            <div
              className="select-box store_intro"
              onClick={() => {
                setCardType(cardType === "STORE_INTRO" ? "" : "STORE_INTRO");
              }}
            >
              <div
                className={`box ${cardType === "STORE_INTRO" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">매장 소개</p>
            </div>
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
            <div
              className="select-box normal"
              onClick={() => {
                setRatio(ratio === "SQUARE_1_1" ? "" : "SQUARE_1_1");
              }}
            >
              <div
                className={`box ${ratio === "SQUARE_1_1" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">1:1 비율</p>
            </div>
            <div
              className="select-box hor"
              onClick={() => {
                setRatio(ratio === "RATIO_2_3" ? "" : "RATIO_2_3");
              }}
            >
              <div
                className={`box ${ratio === "RATIO_2_3" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">4:5 비율(가로)</p>
            </div>
            <div
              className="select-box ver"
              onClick={() => {
                setRatio(ratio === "RATIO_3_2" ? "" : "RATIO_3_2");
              }}
            >
              <div
                className={`box ${ratio === "RATIO_3_2" ? "select" : ""}`}
              ></div>
              <p className="select-box-title">4:5 비율(세로)</p>
            </div>
          </div>
        </div>
        <div className="cardnews-box cardnews-theme">
          <SelectHeader text="원하는 테마를 선택해주세요." />
          <div className="theme-list">
            <div
              className={`theme-box ${theme === "WARM" ? "select" : ""}`}
              onClick={() => {
                setTheme("WARM");
              }}
            >
              따뜻하고 편안한 분위기
            </div>
            <div
              className={`theme-box ${theme === "MODERN" ? "select" : ""}`}
              onClick={() => {
                setTheme("MODERN");
              }}
            >
              깔끔하고 모던한 분위기
            </div>
            <div
              className={`theme-box ${theme === "BRIGHT" ? "select" : ""}`}
              onClick={() => {
                setTheme("BRIGHT");
              }}
            >
              활기차고 밝은 분위기
            </div>
          </div>
        </div>
      </div>
      {cardType && generatedText && template && ratio && theme && (
        <button className="cardnews-button" onClick={postCardNews}>
          완료
        </button>
      )}
    </div>
  );
}

export default CardNewsPage;
