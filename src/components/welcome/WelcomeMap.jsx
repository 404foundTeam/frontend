import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStoresByCoord, matchStore } from "../../api/index.js";
import styles from "../../styles/welcome/WelcomeMap.module.css";

import useUuidStore from "../../store/useUuidStore.js";

import close from "../../assets/welcomeMap/close.png";
import listTitle from "../../assets/welcomeMap/list.png";
import MarkerImg from "../../assets/welcomeMap/marker.png";
import selectMarkerImg from "../../assets/welcomeMap/select_marker.png";
import StoreSearch from "./StoreSearch.jsx";
import SearchList from "./SearchList.jsx";

// const { kakao } = window;

function WelcomeMap({ focusRef, onClick }) {
  const navigate = useNavigate();
  // SearchList DOM 접근용 ref 배열
  const searchListRefs = useRef([]);
  const infoWindowRef = useRef(null);
  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);

  const setUuid = useUuidStore((state) => state.setUuid);

  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [selectStore, setSelectStore] = useState(null);

  const [fail, setFail] = useState(false);

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
          content: `<div style='padding:5px;font-size:14px;'>${store.placeName}</div>`,
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
    console.log("업장 검색 시작");
    if (!address.trim()) return;

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

  const postStoreInfo = async () => {
    if (!selectStore) return;

    try {
      const result = await matchStore(selectStore);
      setUuid(result);
      alert("업장 등록 완료!");
      navigate("/main");
    } catch (error) {
      setFail(true);
      console.log("업장 등록 실패", error);
      alert("업장 등록에 실패했습니다.");
    }
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
        <p className={styles.headerContent}>
          어렵고 복잡한 마케팅과 운영전략을 한번에
        </p>
        <div className={styles.searchBox}>
          <StoreSearch
            focusRef={focusRef}
            placeholder="주소를 입력해주세요."
            value={search}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchAddr(search);
            }}
          />
        </div>
      </div>
      <div className={styles.mapBox}>
        <div
          className={styles.map}
          ref={container}
          style={{ width: "100%", height: "400px" }}
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
          className={`${styles.mapButton} ${isClick ? styles.select : ""}`}
          onClick={postStoreInfo}
        >
          업장 등록
        </button>
      </div>
    </div>
  );
}

export default WelcomeMap;
