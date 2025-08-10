import { useState } from "react";
import close from "../assets/map_close.png";
import "../styles/WelcomeMap.css";

function WelcomeMap({ focusRef, onClick }) {
  const [search, setSearch] = useState("");

  return (
    <div className="map-container" ref={focusRef} tabIndex={-1}>
      <div className="header-close-button" onClick={onClick}>
        <img src={close} className="close-button-img" />
      </div>
      {/* map-header 컴포넌트 or input 컴포넌트 */}
      <div className="map-header">
        <h2 className="header-title">업장 찾기</h2>
        <p className="header-content">
          어렵고 복잡한 마케팅과 운영전략을 한번에
        </p>
        <div className="search-box">
          <input
            className="map-header-search"
            type="text"
            placeholder="주소를 입력해주세요."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="map-box">
        <div className="map"></div>
        <div className="search-list"></div>
      </div>
      <button className="map-button">업장 등록</button>
    </div>
  );
}

export default WelcomeMap;
