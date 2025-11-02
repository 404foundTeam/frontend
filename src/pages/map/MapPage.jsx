import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/map/MapPage.module.css";
// import { MapSearch, CoaMapList } from "../../components/map";
import MapSearch from "../../components/map/MapSearch";
import CoaMapList from "../../components/map/CoaMapList";
import CategoryButton from "../../components/map/CategoryButton";
import { fetchMyStore, searchPartnerStores } from "../../api";

// const { kakao } = window;

function MapPage() {
  const container = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // 키워드
  const [select, setSelect] = useState(""); // 카테고리
  const [myLocation, setMyLocation] = useState({
    longitude: "", // x
    latitude: "", // y
  });
  const [storeList, setStoreList] = useState([]);

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

  const handleClick = async () => {
    const keyword = search;
    const category = select;
    const { longitude, latitude } = myLocation;

    try {
      const res = await searchPartnerStores({
        keyword,
        category,
        longitude,
        latitude,
      });

      setStoreList(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await fetchMyStore();
        setMyLocation({
          longitude: res.longitude,
          latitude: res.latitude,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchStores();
  }, []);

  // 지도 생성
  useEffect(() => {
    // if (!myLocation.latitude || !myLocation.longitude) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.2756, 127.116),
      // center: new window.kakao.maps.LatLng(
      //   myLocation.latitude,
      //   myLocation.longitude
      // ),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container.current, options);
  }, [myLocation]);

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.header}>
        <h2 className={styles.title}>업장 찾기</h2>
        {/* <p className={styles.content}>업장을 검색해서 제휴를 요청해보세요.</p> */}
        <MapSearch
          value={search}
          placeholder="지도에서 제휴할 업장을 검색해보세요."
          onClick={handleClick}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.buttonBox}>
          {/* 음식점, 카페, 관광명소, 숙박, 주차장 */}
          <CategoryButton
            isSelected={select === "유사업종" ? true : false}
            onClick={() => setSelect("유사업종")}
          >
            유사 업종
          </CategoryButton>
          <CategoryButton
            isSelected={select === "음식점" ? true : false}
            onClick={() => setSelect("음식점")}
          >
            음식점
          </CategoryButton>
          <CategoryButton
            isSelected={select === "카페" ? true : false}
            onClick={() => setSelect("카페")}
          >
            카페
          </CategoryButton>
          <CategoryButton
            isSelected={select === "숙박" ? true : false}
            onClick={() => setSelect("숙박")}
          >
            숙박
          </CategoryButton>
          <CategoryButton
            isSelected={select === "주차장" ? true : false}
            onClick={() => setSelect("주차장")}
          >
            주차장
          </CategoryButton>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mapBox}>
          <div
            className="map"
            ref={container}
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
        <div className={styles.mapList}>
          {/* {stores.map((store, index) => (
            <CoaMapList key={index} name={store.name} addr={store.addr} />
          ))} */}
        </div>
      </div>
      <div className={styles.goMyCoa}>
        <button
          className={styles.goMyCoaButton}
          onClick={() => {
            navigate("/map/coalition/list");
          }}
        >
          나의 제휴 보러가기
        </button>
      </div>
    </>
  );
}

export default MapPage;
