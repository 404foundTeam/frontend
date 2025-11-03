import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSnsCardBackground, createSnsCardText } from "../../api/index.js";
import styles from "../../styles/cardnews/CardNewsPage.module.css";
import bannerImg from "../../assets/cardnews/banner_img.png";
import useAuthStore from "../../store/useAuthStore.js";
import useCardStore from "../../store/useCardStore.js";
import useTextStore from "../../store/useTextStore.js";
import SelectHeader from "../../components/shared/SelectHeader.jsx";
import SelectBox from "../../components/shared/SelectBox.jsx";
import Loading from "../../components/shared/Loading.jsx";
import Error from "../../components/shared/Error.jsx";
import FinButton from "../../components/shared/FinButton.jsx";
import { toast } from "react-toastify";
import ToastMessage from "../../components/shared/ToastMessage.jsx";

function CardNewsPage() {
  const [userText, setUserText] = useState("");
  const navigate = useNavigate();
  const storeUuid = useAuthStore((state) => state.storeUuid);
  const placeName = useAuthStore((state) => state.placeName);
  const setText = useTextStore((state) => state.setText);
  const setCard = useCardStore((state) => state.setCard);

  const [cardData, setCardData] = useState({
    cardType: "",
    menuName: "",
    generatedText: "",
    template: "",
    ratio: "",
    theme: "",
  });

  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);

  // 상태 업데이트 함수
  const handleSelect = (key, value) => {
    setCardData((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const getGenerateText = async () => {
    // 1. 유효성 검사
    if (!userText) {
      toast.error("텍스트를 입력해주세요.");
      return;
    }

    try {
      const result = await toast.promise(
        createSnsCardText({
          type: cardData.cardType,
          userText: userText,
        }),
        {
          pending: "텍스트 생성 중...",

          success: {
            icon: false,
            render({ data }) {
              setCardData((prev) => ({
                ...prev,
                generatedText: data.generatedText,
              }));
              setText({ generatedText: data.generatedText });
              return <ToastMessage>텍스트 생성이 완료됐습니다.</ToastMessage>;
            },
          },
          error: {
            render() {
              return (
                <ToastMessage isRed={true}>
                  텍스트 생성에 실패했습니다.
                </ToastMessage>
              );
            },
          },
        }
      );

      setCardData((prev) => ({
        ...prev,
        generatedText: result.generatedText,
      }));
      setText({ generatedText: result.generatedText });
    } catch (err) {
      console.error("텍스트 생성 중 치명적인 오류:", err);
    }
  };

  const postCardNews = async () => {
    const payload = {
      storeUuid,
      placeName,
      ...cardData,
    };

    try {
      setLoading(true);
      const getCard = await createSnsCardBackground(payload);
      setCard(getCard);
      navigate("/cardnews/result");
    } catch (error) {
      setFail(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading isCamera={false} />;
  if (fail) return <Error />;

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img src={bannerImg} className={styles.img} />
        <h1 className={styles.title}>{placeName}</h1>
        <p className={styles.content}>
          을 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
      <div className={styles.cardNewsContainer}>
        {/* 카드 타입 선택 */}
        <div className={`${styles.cardNewsBox} ${styles.cardNewsType}`}>
          <SelectHeader text="어떤 SNS 카드 뉴스를 만들까요?" />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="NOTICE"
              selected={cardData.cardType === "NOTICE"}
              onClick={() => handleSelect("cardType", "NOTICE")}
              label="공지"
            />
            <SelectBox
              value="PRODUCT_PROMO"
              selected={cardData.cardType === "PRODUCT_PROMO"}
              onClick={() => handleSelect("cardType", "PRODUCT_PROMO")}
              label="신제품 홍보"
            />
            <SelectBox
              value="STORE_INTRO"
              selected={cardData.cardType === "STORE_INTRO"}
              onClick={() => handleSelect("cardType", "STORE_INTRO")}
              label="매장 소개"
            />
          </div>
        </div>
        {/* 메뉴 이름 입력 */}
        {(cardData.cardType === "NOTICE" ||
          cardData.cardType === "STORE_INTRO") && (
          <div className={`${styles.cardNewsBox} ${styles.cardNewsTextBox}`}>
            <SelectHeader text="카드뉴스에 넣고 싶은 메뉴 이름을 입력해주세요." />
            <input
              className={`${styles.textInput} ${
                cardData.menuName ? styles.select : ""
              }`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={cardData.menuName}
              onChange={(e) =>
                setCardData((prev) => ({ ...prev, menuName: e.target.value }))
              }
            />
          </div>
        )}
        {/* 사용자 텍스트 입력 */}
        <div className={styles.cardNewsBox}>
          <SelectHeader text="SNS 카드 뉴스에 넣고 싶은 텍스트를 입력하세요." />
          <div className={styles.cardNewsTextBox}>
            <input
              className={`${styles.textInput} ${userText ? styles.select : ""}`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
            />
            <button
              className={`${styles.textButton} ${styles.cardnewsTextButton} ${
                userText ? styles.select : ""
              }`}
              onClick={getGenerateText}
            >
              문구 생성
            </button>
          </div>
        </div>
        {/* 변환 결과 */}
        {cardData.generatedText && (
          <div className={styles.cardNewsBox}>
            <SelectHeader text="변환 결과" />
            <div className={styles.textResultBox}>
              <div
                className={`${styles.showResult} ${
                  cardData.generatedText ? styles.select : ""
                }`}
              >
                {cardData.generatedText && cardData.generatedText}
              </div>
              <button
                className={`${styles.textButton} ${
                  styles.cardNewsTextResultButton
                } ${cardData.generatedText ? styles.select : ""}`}
                onClick={getGenerateText}
              >
                재생성하기
              </button>
            </div>
          </div>
        )}
        {/* 템플릿 선택 */}
        <div className={`${styles.cardNewsBox} ${styles.cardNewsTemplate}`}>
          <SelectHeader text="원하는 템플릿을 선택해주세요." />
          <p>* 회색 배경은 AI가 텍스트로 만든 이미지입니다.</p>
          <div className={styles.templateList}>
            <div className={styles.templateBoxs}>
              <div
                className={`${styles.templateBox} ${
                  cardData.template === "T1_TEXT_ONLY" ? styles.select : ""
                }`}
                onClick={() => handleSelect("template", "T1_TEXT_ONLY")}
              >
                <div className={styles.content}>생성된 텍스트</div>
              </div>
            </div>
            <div className={styles.imgBox}>
              <div
                className={`${styles.templateBox} ${
                  cardData.template === "T2_TEXT_BOTTOM" ? styles.select : ""
                }`}
                onClick={() => handleSelect("template", "T2_TEXT_BOTTOM")}
              >
                <div className={`${styles.text} ${styles.bottom}`}>이미지</div>
                <div className={`${styles.content} ${styles.bottom}`}>
                  생성된 텍스트
                </div>
              </div>
            </div>
            <div className={styles.imgBox}>
              <div
                className={`${styles.templateBox} ${
                  cardData.template === "T3_TEXT_RIGHT" ? styles.select : ""
                }`}
                onClick={() => handleSelect("template", "T3_TEXT_RIGHT")}
              >
                <div className={`${styles.text} ${styles.right}`}>이미지</div>
                <div className={`${styles.content} ${styles.right}`}>
                  생성된{"\n"} 텍스트
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 비율 선택 */}
        <div className={styles.cardNewsBox}>
          <SelectHeader text="원하는 비율을 선택해주세요." />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="SQUARE_1_1"
              selected={cardData.ratio === "SQUARE_1_1"}
              onClick={() => handleSelect("ratio", "SQUARE_1_1")}
              label="1:1 비율"
            />
            <SelectBox
              value="RATIO_2_3"
              selected={cardData.ratio === "RATIO_2_3"}
              onClick={() => handleSelect("ratio", "RATIO_2_3")}
              label="4:5 비율(가로)"
            />
            <SelectBox
              value="RATIO_3_2"
              selected={cardData.ratio === "RATIO_3_2"}
              onClick={() => handleSelect("ratio", "RATIO_3_2")}
              label="4:5 비율(세로)"
            />
          </div>
        </div>
        {/* 테마 선택 */}
        <div className={styles.cardNewsBox}>
          <SelectHeader text="원하는 테마를 선택해주세요." />
          <div className={styles.themeList}>
            <div
              className={`${styles.themeBox} ${
                cardData.theme === "WARM" ? styles.select : ""
              }`}
              onClick={() => handleSelect("theme", "WARM")}
            >
              따뜻하고 편안한 분위기
            </div>
            <div
              className={`${styles.themeBox} ${
                cardData.theme === "MODERN" ? styles.select : ""
              }`}
              onClick={() => handleSelect("theme", "MODERN")}
            >
              깔끔하고 모던한 분위기
            </div>
            <div
              className={`${styles.themeBox} ${
                cardData.theme === "BRIGHT" ? styles.select : ""
              }`}
              onClick={() => handleSelect("theme", "BRIGHT")}
            >
              활기차고 밝은 분위기
            </div>
          </div>
        </div>
      </div>
      {cardData.cardType &&
        cardData.generatedText &&
        cardData.template &&
        cardData.ratio &&
        cardData.theme && <FinButton onClick={postCardNews}>완료</FinButton>}
    </div>
  );
}

export default CardNewsPage;
