import styles from "../../styles/map/MapCoaListPage.module.css";
// import {
//   MapBanner,
//   MyCoaBox,
//   FromCoaBox,
//   ToCoaBox,
// } from "../../components/map";
import MapBanner from "../../components/map/MapBanner";
import MyCoaBox from "../../components/map/MyCoaBox";
import FromCoaBox from "../../components/map/FromCoaBox";
import ToCoaBox from "../../components/map/ToCoaBox";
import CoaSection from "../../components/map/CoaSection";

function MapCoaListPage() {
  // 목 데이터
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
      <MapBanner />
      <div className={styles.container}>
        <CoaSection
          title="님과 제휴 맺은 업장"
          list={myCoaList}
          Component={MyCoaBox}
        />
        <CoaSection
          title="님께 제휴 요청한 업장"
          list={fromCoaList}
          Component={FromCoaBox}
        />
        <CoaSection
          title="님이 제휴 요청한 업장"
          list={toCoaList}
          Component={ToCoaBox}
        />
      </div>
    </>
  );
}

export default MapCoaListPage;
