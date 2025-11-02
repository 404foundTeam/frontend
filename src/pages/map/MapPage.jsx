import { useEffect, useRef, useState } from "react";
import MapInfoWindow from "../../components/MapInfoWindow";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import styles from "../../styles/map/MapPage.module.css";
import { fetchMyStore, searchPartnerStores } from "../../api";
// import { MapSearch, CoaMapList } from "../../components/map";
import MapSearch from "../../components/map/MapSearch";
import CoaMapList from "../../components/map/CoaMapList";
import CategoryButton from "../../components/map/CategoryButton";
import MarkerImg from "../../assets/welcomeMap/marker.png";
import selectMarkerImg from "../../assets/welcomeMap/select_marker.png";

// const { kakao } = window;

function MapPage() {
  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  const infoWindowRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // 키워드
  const [select, setSelect] = useState(""); // 카테고리
  const [myLocation, setMyLocation] = useState({
    longitude: "", // x
    latitude: "", // y
  });
  const [storeList, setStoreList] = useState([]);
  const [selectStore, setSelectStore] = useState(null);

  // 미완성 목 데이터
  const stores = [
    {
      id: 14,
      placeName: "이프아이엔지",
      roadAddress: "경기 용인시 기흥구 죽전로15번길 11-2",
      longitude: 127.109997,
      latitude: 37.321722,
    },
    {
      id: 15,
      placeName: "카페양",
      roadAddress: "경기 용인시 기흥구 죽전로15번길 10",
      longitude: 127.110222,
      latitude: 37.321506,
    },
    {
      id: 16,
      placeName: "에코의서재",
      roadAddress: "경기 용인시 기흥구 죽전로15번길 11-3",
      longitude: 127.110019,
      latitude: 37.321488,
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

  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.forEach((m) => m.setMap(null));
    }

    if (!storeList) return;

    const newMarkers = stores.map((store, idx) => {
      const markerPosition = new window.kakao.maps.LatLng(
        store.latitude,
        store.longitude
      );
      const imageSize = new window.kakao.maps.Size(24, 35);
      const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
      const markerImage = new window.kakao.maps.MarkerImage(
        MarkerImg,
        imageSize,
        imageOption
      );
      const selectMarkerImage = new window.kakao.maps.MarkerImage(
        selectMarkerImg,
        imageSize,
        imageOption
      );

      const isSelected = selectStore?.placeId === store.placeId;
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: isSelected ? selectMarkerImage : markerImage,
      });
      marker.setMap(mapRef.current);

      window.kakao.maps.event.addListener(marker, "click", function () {
        setSelectStore(store);
        // setIsClick(true);

        // 기존 인포윈도우 제거
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }
        // 인포윈도우 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: ReactDOMServer.renderToString(
            <MapInfoWindow store={store} isShow={true} />
          ),
          zIndex: 100,
          disableAutoPan: true,
        });
        infoWindow.open(mapRef.current, marker);
        infoWindowRef.current = infoWindow;
      });
      return marker;
    });
    markerRef.current = newMarkers;
  }, [selectStore]);

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
          {stores.map((store) => (
            <CoaMapList
              key={store.id}
              placeName={store.placeName}
              roadAddress={store.roadAddress}
            />
          ))}
          {/* {storeList.map((store) => (
            <CoaMapList
              key={store.id}
              placeName={store.placeName}
              roadAddress={store.roadAddress}
            />
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
