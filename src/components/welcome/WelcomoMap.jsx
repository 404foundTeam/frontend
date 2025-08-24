import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStoresByCoord, matchStore } from "../../api/index.js";
import useUuidStore from "../../store/useUuidStore";
import styles from "../../styles/welcome/WelcomeMap.module.css";
import close from "../../assets/welcomeMap/close.png";
import listTitle from "../../assets/welcomeMap/list.png";
import MarkerImg from "../../assets/welcomeMap/marker.png";
import selectMarkerImg from "../../assets/welcomeMap/select_marker.png";
import StoreSearch from "./StoreSearch";
import SearchList from "./SearchList.jsx";

// const { kakao } = window;

function WelcomeMap({ focusRef, onClick }) {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [isClick, setIsClick] = useState(false);
  const [selectStore, setSelectStore] = useState(null);
  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  const navigate = useNavigate();
  const setUuid = useUuidStore((state) => state.setUuid);

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
    let selectedMarker = null;
    const newMarkers = stores.map((store) => {
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

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(mapRef.current);

      window.kakao.maps.event.addListener(marker, "click", function () {
        console.log(marker);
        // 이전 선택 마커가 있으면 원래 이미지로 복원
        if (selectedMarker && selectedMarker !== marker) {
          selectedMarker.setImage(markerImage);
        }
        marker.setImage(selectMarkerImage);
        selectedMarker = marker;
      });
      return marker;
    });
    markerRef.current = newMarkers;
  }, [stores]);

  const searchAddr = (address) => {
    console.log("업장 검색 시작");
    if (!address.trim()) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, async function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        console.log("result : ", result);
        console.log("도로명 주소 : ", result[0].address_name);
        console.log("경도 : ", result[0].x);
        console.log("위도 : ", result[0].y);

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
      console.log("업장 목록 가져오는 중...");
      try {
        console.log("리스트 데이터", result[0].x, result[0].y);
        const storeList = await fetchStoresByCoord(result[0].x, result[0].y);
        console.log("응답 데이터 : ", storeList);
        setStores(storeList.items);
        console.log("업장 검색 완료");
      } catch (error) {
        console.log("업장 검색 실패");
        console.log("요청 에러", error);
        alert("데이터 요청에 실패했습니다.");
      }
    });
  };

  const postStoreInfo = async () => {
    console.log("업장 등록 시작");

    if (!selectStore) return;

    try {
      console.log("업장 등로옥");
      const result = await matchStore(selectStore);
      console.log("응답 데이터 : ", result);
      setUuid(result);
      alert("업장 등록 완료!");
      console.log("업장 uuid 등록 완료");
      console.log("페이지 이동");
      navigate("/main");
    } catch (error) {
      console.log("업장 등록 실패", error);
      alert("업장 등록에 실패했습니다.");
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

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
              {stores.map((store) => (
                <SearchList
                  key={store.placeId}
                  store={store}
                  isSelected={selectStore?.placeId === store.placeId}
                  onClick={(e) => {
                    if (e.currentTarget.className.includes("select")) {
                      setSelectStore(null);
                      setIsClick(false);
                    } else {
                      setSelectStore(store);
                      setIsClick(true);
                    }
                  }}
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
