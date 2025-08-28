import { useState } from "react";
import styles from "../styles/map/MapCoaPage.module.css";
import SelectHeader from "../components/SelectHeader";
import MapBanner from "../components/map/MapBanner";
import SelectBox from "../components/SelectBox";

function MapCoaPage() {
  // 리퀘스트 바디 데이터
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <MapBanner />
      <div className={styles.container}>
        <div className="goal">
          <SelectHeader text={"제휴맺는 목적이 무엇인가요?"} />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="inter"
              selected={goal === "inter"}
              onClick={() => {
                setGoal(goal === "inter" ? "" : "inter");
              }}
              label="매장간 상호 홍보"
            />
            <SelectBox
              value="fest"
              selected={goal === "fest"}
              onClick={() => {
                setGoal(goal === "fest" ? "" : "fest");
              }}
              label="지역행사 및 캠페인 협력"
            />
            <SelectBox
              value="part"
              selected={goal === "part"}
              onClick={() => {
                setGoal(goal === "part" ? "" : "part");
              }}
              label="공동 프로모션"
            />
          </div>
        </div>
        <div className={styles.content}>
          <SelectHeader text={"제휴 요청 상세 내용을 입력하세요."} />
          <div className={styles.contentTextBox}>
            <input
              className={`${styles.contentTextInput} ${
                text ? styles.select : ""
              }`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className={`${styles.textButton} ${styles.contentTextButton} ${
                text ? styles.select : ""
              }`}
            >
              완료
            </button>
          </div>
        </div>
        <div className={styles.date}>
          <SelectHeader text={"제휴 희망 기간을 선택하세요."} />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="seven"
              selected={date === "seven"}
              onClick={() => {
                setDate(date === "seven" ? "" : "seven");
              }}
              label="7일"
            />
            <SelectBox
              value="thrid"
              selected={date === "thrid"}
              onClick={() => {
                setDate(date === "thrid" ? "" : "thrid");
              }}
              label="3개월"
            />
            <SelectBox
              value="six"
              selected={date === "six"}
              onClick={() => {
                setDate(date === "six" ? "" : "six");
              }}
              label="6개월"
            />
          </div>
        </div>
        <button className={styles.goCoaButton}>제휴 요청하기</button>
      </div>
    </>
  );
}

export default MapCoaPage;
