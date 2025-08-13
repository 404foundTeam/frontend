import "../styles/MapBanner.css";
import "../styles/MapCoaListPage.css";
import img from "../assets/group.png";

function MapCoaListPage() {
  return (
    <>
      <div className="coa-banner">
        <img src={img} />
        <h1 className="banner-title">어웨이 커피</h1>
        <p className="banner-content">
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
      <div className="coa-list-container">
        <div className="my-coa">
          <h1>
            <span>어웨이 커피</span>님과 제휴 맺은 업체
          </h1>
          <div className="my-coa-list">
            <div className="my-coa-box">
              <div className="text-box">
                <div className="store-info">
                  <p className="stor-name">브레드랩</p>
                  <p className="stroe-add">
                    경기 용인시 기흥구 구갈로 55 JJ플라자 1층
                  </p>
                </div>
                <div className="date">2025. 08. 02 ~ 2025. 09. 02</div>
              </div>
              <button>제휴 끊기</button>
            </div>
            <div className="my-coa-box">
              <div className="text-box">
                <div className="store-info">
                  <p className="stor-name">에덴 꽃나라</p>
                  <p className="stroe-add">구갈로60번길 19 금강프라자 102호</p>
                </div>
                <div className="date">7일 뒤 계약이 만료됩니다.</div>
              </div>
              <button>제휴 다시 맺기</button>
            </div>
          </div>
        </div>
        <div className="from-coa">
          <h1>
            <span>어웨이 커피</span>님께 제휴 요청한 업체
          </h1>
          <div className="from-coa-list"></div>
        </div>
        <div className="to-coa">
          <h1>
            <span>어웨이 커피</span>님이 제휴 요청한 업체
          </h1>
          <div className="to-coa-list"></div>
        </div>
      </div>
    </>
  );
}

export default MapCoaListPage;
