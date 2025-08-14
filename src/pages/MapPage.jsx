import StoreSearch from "../components/StoreSearch";
import "../styles/MapPage.css";

function MapPage() {
  return (
    <>
      <div className="map-header">
        <h2 className="map-header-title">업장 찾기</h2>
        <p className="map-header-content">
          업장을 검색해서 제휴를 요청해보세요.
        </p>
        <StoreSearch />
        <div className="map-header-button-box">
          <button>유사 업종</button>
          <button>편의점</button>
          <button>음식점</button>
        </div>
      </div>
      <div className="coa-map-container">
        <div className="coa-map-list"></div>
        <div className="coa-map-box"></div>
      </div>
    </>
  );
}

export default MapPage;
