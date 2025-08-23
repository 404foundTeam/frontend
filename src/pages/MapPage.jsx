import { useEffect, useRef } from "react";
import StoreSearch from "../components/StoreSearch";
import "../styles/map/MapPage.css";

// const { kakao } = window;

function MapPage() {
  const container = useRef(null);

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(37.2756, 127.116),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container.current, options);
  }, []);

  return (
    <>
      <div className="map-page-header">
        <h2 className="map-header-title">업장 찾기</h2>
        <p className="map-header-content">
          업장을 검색해서 제휴를 요청해보세요.
        </p>
        <StoreSearch />
        <div className="map-header-button-box">
          <button className="select">유사 업종</button>
          <button>편의점</button>
          <button>음식점</button>
        </div>
      </div>
      <div className="coa-map-container">
        <div className="coa-map-list">
          <div className="coa-map-list-box">
            <h2 className="store-name">브래드랩</h2>
            <p className="store-add">
              경기 용인시 기흥구 구갈로 55 JJ플라자 1층
            </p>
          </div>
          <div className="coa-map-list-box">
            <h2 className="store-name">파머슨 베이커리</h2>
            <p className="store-add">경기 용인시 기흥구 구갈동 352-4</p>
          </div>
          <div className="coa-map-list-box">
            <h2 className="store-name">올탑 스터디 카페</h2>
            <p className="store-add">
              경기 용인시 기흥구 기흥역로58번길 10 센트럴푸르지오 상가 1-107호
            </p>
          </div>
          <div className="coa-map-list-box">
            <h2 className="store-name">커피톤야</h2>
            <p className="store-add">
              경기 용인시 기흥구 구갈로 15 상가동 1층 프레쉬로스터커피톤야코리아
            </p>
          </div>
          <div className="coa-map-list-box">
            <h2 className="store-name">모리스하우스</h2>
            <p className="store-add">
              경기 용인시 기흥구 기흥역로 9 롯데캐슬 레이시티 B동 1층
            </p>
          </div>
        </div>
        <div className="coa-map-box">
          <div
            className="map"
            ref={container}
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
      </div>
      <div className="go-my-coa">
        <button className="go-my-coa-button">나의 제휴 보러가기</button>
      </div>
    </>
  );
}

export default MapPage;
