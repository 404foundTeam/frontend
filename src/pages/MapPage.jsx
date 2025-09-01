import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/map/MapPage.module.css";
import MapSearch from "../components/map/MapSearch";
import CoaMapList from "../components/map/CoaMapList";

// const { kakao } = window;

function MapPage() {
  const container = useRef(null);
  const navigate = useNavigate();

  // 미완성 목 데이터
  const stores = [
    {
      name: "브래드랩",
      addr: "경기 용인시 기흥구 구갈로 55 JJ플라자 1층",
    },
    {
      name: "파이슨 베이커리",
      addr: "경기 용인시 기흥구 구갈동 352-4",
    },
    {
      name: "브래드랩",
      addr: "경기 용인시 기흥구 구갈로 55 JJ플라자 1층",
    },
    {
      name: "파이슨 베이커리",
      addr: "경기 용인시 기흥구 구갈동 352-4",
    },
    {
      name: "올탑 스터디 카페",
      addr: "경기 용인시 기흥구 기흥역로58번길 10 센트럴푸르지오 상가 1-107호",
    },
    {
      name: "커피톤야",
      addr: "경기 용인시 기흥구 구갈로 15 상가동 1층 프레쉬로스터커피톤야코리아",
    },
    {
      name: "모리스하우스",
      addr: "경기 용인시 기흥구 기흥역로 9 롯데캐슬 레이시티 B동 1층",
    },
  ];

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(37.2756, 127.116),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container.current, options);
  }, []);

  const goToList = () => {
    navigate("/map/coalition/list");
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>업장 찾기</h2>
        <p className={styles.content}>업장을 검색해서 제휴를 요청해보세요.</p>
        <MapSearch placeholder="업장을 입력해주세요." />
        <div className={styles.buttonBox}>
          <button className={styles.select}>유사 업종</button>
          <button>편의점</button>
          <button>음식점</button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mapList}>
          {stores.map((store, index) => (
            <CoaMapList key={index} name={store.name} addr={store.addr} />
          ))}
        </div>
        <div className={styles.mapBox}>
          <div
            className="map"
            ref={container}
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
      </div>
      <div className={styles.goMyCoa}>
        <button className={styles.goMyCoaButton} onClick={goToList}>
          나의 제휴 보러가기
        </button>
      </div>
    </>
  );
}

export default MapPage;
