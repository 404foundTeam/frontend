import SideBar from "./SideBar";
import "../styles/CardNewsResult.css";

import img from "../assets/show.png";

function CardNewsResult() {
  return (
    <div className="result-container">
      <SideBar isCard={true} />
      <div className="top-box"></div>
      <div className="result-box">
        <img src={img} className="result-img" />
        <div className="button-container">
          <button className="save">저장하기</button>
          <button className="back">홍보페이지로 돌아가기</button>
          <button className="new">새로 만들기</button>
        </div>
        <p>
          이번 달 무료 횟수 <span>1회</span> 남았어요.
        </p>
      </div>
    </div>
  );
}

export default CardNewsResult;
