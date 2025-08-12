import { useEffect, useRef, useState } from "react";
import close from "../assets/welcomeMap/map_close.png";
import listTitle from "../assets/welcomeMap/list_title.png";
import listIcon from "../assets/welcomeMap/list_icon.png";
import "../styles/WelcomeMap.css";
import StoreSearch from "./StoreSearch";
// import { Map } from "react-kakao-maps-sdk";
// npm install react-kakao-maps-sdk

const { kakao } = window;

function WelcomeMap({ focusRef, onClick }) {
  const [search, setSearch] = useState("");
  const container = useRef(null);

  useEffect(() => {
    const position = new kakao.maps.LatLng(37.2757, 127.116);
    const options = {
      center: position,
      level: 3,
    };

    new kakao.maps.Map(container.current, options);
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="map-container" tabIndex={-1}>
      <div className="header-close-button" onClick={onClick}>
        <img src={close} className="close-button-img" />
      </div>
      <div className="map-header">
        <h2 className="header-title">업장 찾기</h2>
        <p className="header-content">
          어렵고 복잡한 마케팅과 운영전략을 한번에
        </p>
        <div className="search-box">
          <StoreSearch
            focusRef={focusRef}
            placeholder="주소를 입력해주세요."
            value={search}
            onChange={onChange}
          />
        </div>
      </div>
      <div className="map-box">
        <div className="map" ref={container}>
          {/* <Map
            center={{ lat: 33.450701, lng: 126.570667 }}
            style={{ width: "1000px", height: "600px" }}
            level={3}
          /> */}
        </div>
        <div className="search-lists">
          <div className="search-list-title">
            업장 검색 결과
            <img src={listTitle} className="list-title-ico" />
          </div>
          <div className="search-list">
            <div className="search-list-box">
              <img src={listIcon} className="list-box-ico" />
              <div className="store-info">
                <h1>모퉁이 꽃집</h1>
                <p>
                  경기 용인시 기흥구 기흥역로58번길 78 기흥역더샵오피스텔 201동
                  112호
                </p>
              </div>
            </div>
            <div className="search-list-box">
              <img src={listIcon} className="list-box-ico" />
              <div className="store-info">
                <h1>진 부엉이꼬마김밥 기흥점</h1>
                <p>
                  경기 용인시 기흥구 기흥역로63 힐스테이트 상가 1층 302동 108호
                </p>
              </div>
            </div>
            <div className="search-list-box select">
              <img src={listIcon} className="list-box-ico" />
              <div className="store-info">
                <h1>어웨이 커피</h1>
                <p>경기 용인시 기흥구 기흥역로 9 108호 어웨이커피</p>
              </div>
            </div>
            <div className="search-list-box">
              <img src={listIcon} className="list-box-ico" />
              <div className="store-info">
                <h1>구갈대지서점</h1>
                <p>경기 용인시 기흥구 구갈로72번길 10 낙원상가 108호</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="map-button select">업장 등록</button>
    </div>
  );
}

export default WelcomeMap;
