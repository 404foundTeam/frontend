import "../styles/MapBanner.css";
import "../styles/MapCoaListPage.css";
import img from "../assets/group.png";

function MapCoaListPage() {
  const myCoaList = [
    {
      storeName: "브레드랩",
      storeAddress: "경기 용인시 기흥구 구갈로 55 JJ플라자 1층",
      date: "2025. 08. 02 ~ 2025. 09. 02",
      isPartner: true,
    },
    {
      storeName: "에덴 꽃나라",
      storeAddress: "구갈로60번길 19 금강프라자 102호",
      date: "7일 뒤 계약이 만료됩니다.",
      isPartner: false,
    },
  ];

  const fromCoaList = [
    {
      storeName: "울탑 스터디 카페",
      storeAddress:
        "경기 용인시 기흥구 기흥역로58번길 10 센트럴푸르지오 상가 1-107호",
    },
    {
      storeName: "얌얌 김밥",
      storeAddress: "구갈로60번길 19 금강프라자 102호",
    },
  ];

  const toCoaList = [
    {
      storeName: "르봉 베이커리",
      storeAddress: "경기 용인시 기흥구 기흥역로 63 302동 105호",
    },
    {
      storeName: "요거트 가족",
      storeAddress: "경기 용인시 기흥구 구갈로60번길 19 1층 105호",
    },
  ];

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
          <div className="coa-list my-coa-list">
            {myCoaList.map((store) => (
              <div className="my-coa-box">
                <div className="text-box">
                  <div className="store-info">
                    <p className="store-name">{store.storeName}</p>
                    <p className="store-add">{store.storeAddress}</p>
                  </div>
                  <div className="date">{store.date}</div>
                </div>
                {store.isPartner ? (
                  <button className="discon">제휴 끊기</button>
                ) : (
                  <button className="con">제휴 다시 맺기</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="from-coa">
          <h1>
            <span>어웨이 커피</span>님께 제휴 요청한 업체
          </h1>
          <div className="coa-list from-coa-list">
            {fromCoaList.map((store) => (
              <div className="from-coa-box">
                <div className="store-info">
                  <p className="store-name">{store.storeName}</p>
                  <p className="store-add">{store.storeAddress}</p>
                </div>
                <div className="button-box">
                  <button className="acc">맺기</button>
                  <button className="ref">거절</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="to-coa">
          <h1>
            <span>어웨이 커피</span>님이 제휴 요청한 업체
          </h1>
          <div className="coa-list to-coa-list">
            {toCoaList.map((store) => (
              <div className="to-coa-box">
                <div className="store-info">
                  <p className="store-name">{store.storeName}</p>
                  <p className="store-add">{store.storeAddress}</p>
                </div>
                <button>맺기 대기중</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MapCoaListPage;
