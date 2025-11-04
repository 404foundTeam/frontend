import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/map/MapPage.module.css";
import { fetchMyStore, searchPartnerStores } from "../../api";
// import { MapSearch, CoaMapList } from "../../components/map";
import MapSearch from "../../components/map/MapSearch";
import CoaMapList from "../../components/map/CoaMapList";
import CategoryButton from "../../components/map/CategoryButton";
import myMarkerImg from "../../assets/welcomeMap/my_marker.png";
import MarkerImg from "../../assets/welcomeMap/marker.png";
import selectMarkerImg from "../../assets/welcomeMap/select_marker.png";
import { toast } from "react-toastify";

// const { kakao } = window;

function MapPage() {
  const container = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef([]);
  const infoWindowRef = useRef(null);
  // const selectStoreRef = useRef([]);

  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // 키워드
  const [select, setSelect] = useState(""); // 카테고리
  const [myLocation, setMyLocation] = useState({
    longitude: "", // x
    latitude: "", // y
  });
  const [storeList, setStoreList] = useState([]);
  const [selectStore, setSelectStore] = useState(null);

  // 검색 전용 - 키워드/업종 검색
  const handleSearch = async () => {
    if (!myLocation.latitude || !myLocation.longitude) {
      toast.error("업장 정보가 없습니다");
      return;
    }

    try {
      const res = await searchPartnerStores({
        keyword: search,
        category: select,
        longitude: myLocation.longitude,
        latitude: myLocation.latitude,
      });
      setStoreList(res);
      setSelectStore(null);
    } catch (error) {
      console.log(error);
      setStoreList([]);
    }
  };

  // 카테고리 버튼 전용 - 키워드/업종 검색
  const handleCategoryClick = async (categoryValue) => {
    const newSelect = select === categoryValue ? "" : categoryValue;

    setStoreList([]);
    setSelectStore(null);

    setSelect(newSelect);

    if (infoWindowRef.current) {
      infoWindowRef.current.close();
    }

    // 값 없으면 리스트 리셋
    // if (newSelect === "") {
    //   setStoreList([]);
    //   setSelectStore(null);
    //   return;
    // }

    // 버튼 클릭 API 호출
    try {
      const res = await searchPartnerStores({
        keyword: search,
        category: newSelect,
        longitude: myLocation.longitude,
        latitude: myLocation.latitude,
      });
      setStoreList(res);
      setSelectStore(null);
    } catch (error) {
      console.log(error);
      setStoreList([]);
    }
  };

  const handleSelectStore = (store, idx) => {
    setSelectStore(store);

    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    // 기존 InfoWindow 제거
    if (infoWindowRef.current) infoWindowRef.current.close();

    // InfoWindow 생성
    const marker = markerRef.current[idx];
    if (!marker) return;

    const infoHTML = `
      <div class="customInfoWindow">
        <div class="storeInfo">
          <div class="infoTitle">${store.placeName}</div>
          <div class="infoAddress">${store.roadAddress}</div>
        </div>
        <button type="button" id="infoWindowBtn-${idx}" class="btn">요청</button>
      </div>
    `;

    const infoWindow = new window.kakao.maps.InfoWindow({
      content: infoHTML,
      zIndex: 100,
      disableAutoPan: true,
    });
    infoWindow.open(mapRef.current, marker);
    infoWindowRef.current = infoWindow;

    setTimeout(() => {
      const btn = document.getElementById(`infoWindowBtn-${idx}`);
      if (btn) {
        btn.onclick = () => {
          navigate(`/map/coalition/${store.placeName}/${store.id}`);
        };
      }
    }, 0);

    // 마커 이미지 갱신
    markerRef.current.forEach((m, i) => {
      const image = new window.kakao.maps.MarkerImage(
        i === idx ? selectMarkerImg : MarkerImg,
        new window.kakao.maps.Size(24, 35),
        { offset: new window.kakao.maps.Point(12, 35) }
      );
      m.setImage(image);
    });

    // 지도 중심 이동
    mapRef.current.setCenter(
      new window.kakao.maps.LatLng(store.latitude, store.longitude)
    );
  };

  // 마운트 되면 내 좌표 가져오기 와서 센터 처리
  useEffect(() => {
    const initMap = async () => {
      let myStoreRes;

      try {
        myStoreRes = await fetchMyStore();
        setMyLocation({
          longitude: myStoreRes.longitude,
          latitude: myStoreRes.latitude,
        });
        // 지도 중심을 내 업장 위치로 설정
        if (window.kakao && window.kakao.maps && container.current) {
          const centerPos = new window.kakao.maps.LatLng(
            myStoreRes.latitude,
            myStoreRes.longitude
          );
          const options = { center: centerPos, level: 3 };
          const map = new window.kakao.maps.Map(container.current, options);
          mapRef.current = map;

          const imageSize = new window.kakao.maps.Size(24, 35);
          const imageOption = { offset: new window.kakao.maps.Point(12, 35) };
          const markerImage = new window.kakao.maps.MarkerImage(
            myMarkerImg,
            imageSize,
            imageOption
          );

          const myMarker = new window.kakao.maps.Marker({
            position: centerPos,
            image: markerImage,
          });

          myMarker.setMap(map);
        }
      } catch (error) {
        console.log("내 업장 위치 로딩 실패:", error);
        return;
      }

      if (myStoreRes) {
        try {
          const partnerRes = await searchPartnerStores({
            keyword: "",
            category: "",
            longitude: myStoreRes.longitude,
            latitude: myStoreRes.latitude,
          });

          setStoreList(partnerRes);
        } catch (error) {
          console.log("초기 제휴 업장 검색 실패:", error);
        }
      }
    };

    if (window.kakao && window.kakao.maps) {
      initMap();
    }
  }, []);

  // 검색, 선택했을때 마커/인포윈도우
  useEffect(() => {
    if (!mapRef.current || !window.kakao || !window.kakao.maps) return;

    // 기존 마커 제거
    if (markerRef.current) markerRef.current.forEach((m) => m.setMap(null));

    if (!storeList) return;

    const newMarkers = storeList.map((store, idx) => {
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

      const isSelected = selectStore?.id === store.id;

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: isSelected ? selectMarkerImage : markerImage,
      });
      marker.setMap(mapRef.current);

      window.kakao.maps.event.addListener(marker, "click", function () {
        handleSelectStore(store, idx);

        // setSelectStore(store);
        // setIsClick(true);
        // 기존 인포윈도우 제거
        // if (infoWindowRef.current) {
        //   infoWindowRef.current.close();
        // }
        //   const infoHTML = `
        //   <div class=customInfoWindow>
        //     <div class=storeInfo>
        //       <div class=infoTitle>${store.placeName}</div>
        //       <div class=infoAddress>${store.roadAddress}</div>
        //     </div>
        //     <button type="button" id="infoWindowBtn-${idx}" class="btn">요청</button>
        //     </div>
        //   </div>
        // `;
        //   // 인포윈도우 생성
        //   const infoWindow = new window.kakao.maps.InfoWindow({
        //     content: infoHTML,
        //     zIndex: 100,
        //     disableAutoPan: true,
        //   });
        //   infoWindow.open(mapRef.current, marker);
        //   infoWindowRef.current = infoWindow;

        // setTimeout(() => {
        //   const btn = document.getElementById(`infoWindowBtn-${idx}`);
        //   const storeId = selectStore.id;
        //   if (btn) {
        //     btn.onclick = () => {
        //       navigate(`/map/coalition/${storeId}`);
        //     };
        //   }
        // }, 0);
      });
      return marker;
    });

    markerRef.current = newMarkers;
  }, [storeList, selectStore]);

  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.header}>
        <h2 className={styles.title}>제휴 업장 찾기</h2>
        <MapSearch
          value={search}
          placeholder="지도에서 제휴할 업장을 검색해보세요."
          onClick={handleSearch}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.mapBox}>
          <div className={styles.buttonBox}>
            <CategoryButton
              isSelected={select === "same"}
              onClick={() => {
                handleCategoryClick("same");
              }}
            >
              동일 업종
            </CategoryButton>
            <CategoryButton
              isSelected={select === "FD6"}
              onClick={() => {
                handleCategoryClick("FD6");
              }}
            >
              음식점
            </CategoryButton>
            <CategoryButton
              isSelected={select === "CE7"}
              onClick={() => {
                handleCategoryClick("CE7");
              }}
            >
              카페
            </CategoryButton>
            <CategoryButton
            // isSelected={select === "same"}
            // onClick={() => {
            //   handleCategoryClick("same");
            // }}
            >
              숙박
            </CategoryButton>
            <CategoryButton
            // isSelected={select === "same"}
            // onClick={() => {
            //   handleCategoryClick("same");
            // }}
            >
              주차장
            </CategoryButton>
          </div>
          <div
            className="map"
            ref={container}
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
        <div className={styles.mapList}>
          {storeList.map((store, idx) => (
            <CoaMapList
              key={store.id}
              // ref={(el) => (listRefs.current[idx] = el)}
              placeName={store.placeName}
              roadAddress={store.roadAddress}
              onClick={() => {
                handleSelectStore(store, idx);
              }}
              isSelected={selectStore?.id === store.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MapPage;
