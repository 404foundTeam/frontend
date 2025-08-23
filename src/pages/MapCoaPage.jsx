import { useState } from "react";
import "../styles/map/MapCoaPage.css";
import SelectHeader from "../components/SelectHeader";
import MapBanner from "../components/map/MapBanner";

function MapCoaPage() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");

  return (
    <>
      <MapBanner />
      <div className="coa-container">
        <div className="goal">
          <SelectHeader text={"제휴맺는 목적이 무엇인가요?"} />
          <div className="select-boxs">
            <div
              className="select-box inter"
              onClick={() => {
                setGoal(goal === "inter" ? "" : "inter");
              }}
            >
              <div className={`box ${goal === "inter" ? "select" : ""}`}></div>
              <p className="select-box-title">매장간 상호 홍보</p>
            </div>
            <div
              className="select-box fest"
              onClick={() => {
                setGoal(goal === "fest" ? "" : "fest");
              }}
            >
              <div className={`box ${goal === "fest" ? "select" : ""}`}></div>
              <p className="select-box-title">지역행사 및 캠페인 협력</p>
            </div>
            <div
              className="select-box part"
              onClick={() => {
                setGoal(goal === "part" ? "" : "part");
              }}
            >
              <div className={`box ${goal === "part" ? "select" : ""}`}></div>
              <p className="select-box-title">공동 프로모션</p>
            </div>
          </div>
        </div>
        <div className="content">
          <SelectHeader text={"제휴 요청 상세 내용을 입력하세요."} />
          <div className="content-text-box">
            <input
              className={`content-text-input ${text ? "select" : ""}`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className={`text-button content-text-button ${
                text ? "select" : ""
              }`}
            >
              완료
            </button>
          </div>
        </div>
        <div className="date">
          <SelectHeader text={"제휴 희망 기간을 선택하세요."} />
          <div className="select-boxs">
            <div
              className="select-box seven"
              onClick={() => {
                setDate(date === "seven" ? "" : "seven");
              }}
            >
              <div className={`box ${date === "seven" ? "select" : ""}`}></div>
              <p className="select-box-title">7일</p>
            </div>
            <div
              className="select-box thrid"
              onClick={() => {
                setDate(date === "third" ? "" : "third");
              }}
            >
              <div className={`box ${date === "third" ? "select" : ""}`}></div>
              <p className="select-box-title">3개월</p>
            </div>
            <div
              className="select-box six"
              onClick={() => {
                setDate(date === "six" ? "" : "six");
              }}
            >
              <div className={`box ${date === "six" ? "select" : ""}`}></div>
              <p className="select-box-title">6개월</p>
            </div>
          </div>
        </div>
        <button className="coa-button">제휴 요청하기</button>
      </div>
    </>
  );
}

export default MapCoaPage;
