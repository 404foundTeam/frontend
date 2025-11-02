import { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { fetchStoresByCoord } from "../../api/auth.js";
import styles from "../../styles/welcome/WelcomeMap.module.css";
import close from "../../assets/welcomeMap/close.png";
import listTitle from "../../assets/welcomeMap/list.png";
import MarkerImg from "../../assets/welcomeMap/marker.png";
import selectMarkerImg from "../../assets/welcomeMap/select_marker.png";
import StoreSearch from "./StoreSearch.jsx";
import SearchList from "./SearchList.jsx";
import { toast } from "react-toastify";
import MapInfoWindow from "../MapInfoWindow.jsx";

// const { kakao } = window;

function WelcomeMap({ focusRef, onClick, handleSelect }) {
  // SearchList DOM 접근용 ref 배열
  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  const searchListRefs = useRef([]);
  const infoWindowRef = useRef(null);

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [selectStore, setSelectStore] = useState(null);

  const [fail, setFail] = useState(false);

  const handleConfirm = () => {
    if (!selectStore) {
      toast.error("업장을 선택해주세요.");
      // alert("업장을 선택해주세요.");
      return;
    }
    handleSelect(selectStore);
  };

  // 맵은 최초 1회만 생성
  useEffect(() => {
    if (window.kakao && window.kakao.maps && container.current) {
      const centerPos = new window.kakao.maps.LatLng(37.2756, 127.116);
      const options = { center: centerPos, level: 3 };
      mapRef.current = new window.kakao.maps.Map(container.current, options);
    }
  }, []);

  // stores가 바뀔 때마다 리스트 마커만 갱신
  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.forEach((m) => m.setMap(null));
    }

    if (!stores) return;
    // 리스트 목록 마커 동작
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

      // 선택된 store와 일치하면 select 이미지, 아니면 기본 이미지
      const isSelected = selectStore?.placeId === store.placeId;
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: isSelected ? selectMarkerImage : markerImage,
      });
      marker.setMap(mapRef.current);

      window.kakao.maps.event.addListener(marker, "click", function () {
        setSelectStore(store);
        setIsClick(true);

        // 기존 인포윈도우 제거
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        // 인포윈도우 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: ReactDOMServer.renderToString(
            <MapInfoWindow store={store} />
          ),
          zIndex: 100,
          disableAutoPan: true,
        });
        infoWindow.open(mapRef.current, marker);
        infoWindowRef.current = infoWindow;

        // SearchList 자동 스크롤 및 포커스
        if (searchListRefs.current[idx]) {
          searchListRefs.current[idx].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          searchListRefs.current[idx].focus();
        }
      });
      return marker;
    });
    markerRef.current = newMarkers;
  }, [stores, selectStore]);

  const searchAddr = (address) => {
    if (!address) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, async function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        mapRef.current.setCenter(coords);

        // 검색 마커만 따로 관리
        if (markerRef.current) {
          markerRef.current.forEach((m) => m.setMap(null));
        }

        const imageSize = new window.kakao.maps.Size(24, 35);
        const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
        const markerImage = new window.kakao.maps.MarkerImage(
          selectMarkerImg,
          imageSize,
          imageOption
        );

        const marker = new window.kakao.maps.Marker({
          position: coords,
          image: markerImage,
        });
        marker.setMap(mapRef.current);
        // 검색 마커만 잠깐 보여주고, 리스트 마커는 stores useEffect에서 관리
      } else {
        alert("오류 발생");
      }
      try {
        const storeList = await fetchStoresByCoord(result[0].x, result[0].y);

        setStores(storeList.items);
      } catch (error) {
        console.log("요청 에러", error);
        alert("데이터 요청에 실패했습니다.");
      }
    });
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  if (fail) return <Error />;

  return (
    <div className={styles.container} tabIndex={-1}>
      <div className={styles.closeButton} onClick={onClick}>
        <img src={close} className={styles.closeImg} />
      </div>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>업장 찾기</h2>
        {/* <p className={styles.headerContent}>
          어렵고 복잡한 마케팅과 운영전략을 한번에
        </p> */}
        <StoreSearch
          placeholder="주소를 입력해주세요."
          value={search}
          onChange={onChange}
          onClick={() => searchAddr(search)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              searchAddr(search);
            }
          }}
        />
      </div>
      <div className={styles.mapBox} focusRef={focusRef}>
        <div
          className={styles.map}
          ref={container}
          style={{ width: "100%", height: "180px" }}
        ></div>
        <div className={styles.searchLists}>
          <div className={styles.searchListTitle}>
            업장 검색 결과
            <img src={listTitle} className={styles.searchTitleIco} />
          </div>
          {stores && (
            <div className={styles.searchList}>
              {stores.map((store, idx) => (
                <SearchList
                  key={store.placeId}
                  ref={(el) => (searchListRefs.current[idx] = el)}
                  store={store}
                  isSelected={selectStore?.placeId === store.placeId}
                  onClick={() => {
                    setSelectStore(store);
                    setIsClick(true);
                    if (infoWindowRef.current) {
                      infoWindowRef.current.close();
                    }
                    // 인포윈도우 생성
                    const infoWindow = new window.kakao.maps.InfoWindow({
                      content: ReactDOMServer.renderToString(
                        <MapInfoWindow store={store} />
                      ),
                      zIndex: 100,
                      disableAutoPan: true,
                    });
                    infoWindow.open(mapRef.current, markerRef.current[idx]);
                    infoWindowRef.current = infoWindow;
                  }}
                  tabIndex={0}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          type="button"
          className={`${styles.mapButton} ${isClick ? styles.select : ""}`}
          onClick={handleConfirm}
        >
          업장 등록
        </button>
      </div>
    </div>
  );
}

export default WelcomeMap;
