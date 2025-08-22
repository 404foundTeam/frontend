import { useEffect, useRef, useState } from "react";
import close from "../assets/welcomeMap/close.png";
import listTitle from "../assets/welcomeMap/list.png";
import selectMarkerImg from "../assets/welcomeMap/select_marker.png";
import "../styles/WelcomeMap.css";
import StoreSearch from "./StoreSearch";
import useUuidStore from "../store/useUuidStore";
import { fetchStoresByCoord, matchStore } from "../api/index.js";
import SearchListBox from "./SearchListBox.jsx";

// const { kakao } = window;

function WelcomeMap({ focusRef, onClick }) {
  const setUuid = useUuidStore((state) => state.setUuid);
  // 업장 리스트 (위도, 경도 포함) - 가게 목록, 응답 데이터
  const item = [
    {
      placeId: "1578223725",
      name: "모퉁이 꽃집",
      roadAddress:
        "경기 용인시 기흥구 기흥역로58번길 78 기흥역더샵오피스텔 201동 112호",
      longitude: 127.1177,
      latitude: 37.2735,
    },
    {
      placeId: "1578211235",
      name: "진 부엉이꼬마김밥 기흥점",
      roadAddress:
        "경기 용인시 기흥구 기흥역로63 힐스테이트 상가 1층 302동 108호",
      longitude: 127.1185,
      latitude: 37.2745,
    },
    {
      placeId: "12378211725",
      name: "어웨이 커피",
      roadAddress: "경기 용인시 기흥구 기흥역로 9 108호 어웨이커피",
      longitude: 127.1154,
      latitude: 37.2747,
    },
    {
      placeId: "1578216425",
      name: "구갈대지서점",
      roadAddress: "경기 용인시 기흥구 구갈로72번길 10 낙원상가 108호",
      longitude: 127.1124,
      latitude: 37.2807,
    },
    {
      placeId: "13595342",
      name: "성산식당",
      roadAddress: "경기 용인시 기흥구 구갈로72번길 27-1",
      longitude: 127.114587717426,
      latitude: 37.2809227902893,
    },
    {
      placeId: "1578211725",
      name: "여수에서온나진국밥 용인기흥구청점",
      roadAddress: "경기 용인시 기흥구 구갈로72번길 31",
      longitude: 127.11500261541231,
      latitude: 37.2808818411709,
    },
  ];

  const [search, setSearch] = useState("");
  const [isClick, setIsClick] = useState(false);

  // 업장 리스트 데이터 - get
  const [stores, setStores] = useState(item);
  // 업장 등록, 요청 데이터 - post
  const [selectStore, setSelectStore] = useState(null);

  const container = useRef(null); // 지도 담을 곳
  const mapRef = useRef(null); // 지도 객체 저장
  const markerRef = useRef(null); // 현재 마커 저장

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      // 맵 생성 api 적용시 분리
      const centerPos = new window.kakao.maps.LatLng(37.2756, 127.116);

      const options = {
        center: centerPos,
        level: 3,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      mapRef.current = map;

      // 마커 여러 개 생성 api 적용시 의존성 추가
      if (!stores) return;
      stores.forEach((store) => {
        // if (!stores) return;
        // 이전 마커 제거
        // if (markerRef.current) {
        //   markerRef.current.forEach((m) => m.setMap(null));
        // }

        const markerPosition = new window.kakao.maps.LatLng(
          store.latitude,
          store.longitude
        );
        // 마커 이미지
        const imageSize = new window.kakao.maps.Size(24, 35); // 이미지 크기
        const imageOption = { offset: new window.kakao.maps.Point(12, 35) }; // 마커 중심 좌표
        const markerImage = new window.kakao.maps.MarkerImage(
          selectMarkerImg,
          imageSize,
          imageOption
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 커스텀 마커 이미지 적용
        });
        marker.setMap(map);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, "click", function () {
          alert(`${store.name} 클릭됨`);
        });
      });
    }
  }, []);

  const searchAddr = (address) => {
    console.log(1);
    if (!address.trim()) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    // ✨함수 안에서 api를 사용해야 함으로 function 앞에 async 추가 필요
    geocoder.addressSearch(address, async function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        console.log(result);
        console.log(result[0].address_name); // 도로명 주소
        console.log(result[0].x); // 경도, x좌표
        console.log(result[0].y); // 위도, y좌표

        mapRef.current.setCenter(coords);

        if (markerRef.current) markerRef.current.setMap(null);

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
        markerRef.current = marker;
      } else {
        alert("오류 발생");
      }
      console.log(2);
      try {
        const storeList = await fetchStoresByCoord(result[0].x, result[0].y);
        console.log(storeList);
        setStores(storeList.data.items);
        console.log("리스트 데이터", result);
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
      setUuid(result.data);
      console.log("업장 등록", result);
    } catch (error) {
      console.log("업장 등록 실패", error);
      alert("업장 등록에 실패했습니다.");
    }
  };

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="map-container" tabIndex={-1}>
      <div className="header-close-button" onClick={onClick}>
        <img src={close} className="close-button-img" />
      </div>
      <div className="map-header">
        <h2 className="header-title">업장 찾기</h2>
        <p className="header-content">
          어렵고 복잡한 마케팅과 운영전략을 한번에
        </p>
        <div className="search-box">
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
      <div className="map-box">
        <div
          className="map"
          ref={container}
          style={{ width: "100%", height: "400px" }}
        ></div>
        <div className="search-lists">
          <div className="search-list-title">
            업장 검색 결과
            <img src={listTitle} className="list-title-ico" />
          </div>
          {stores && (
            <div className="search-list">
              {stores.map((store) => (
                <>
                  <SearchListBox
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
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          className={`map-button ${isClick ? "select" : ""}`}
          onClick={postStoreInfo}
        >
          업장 등록
        </button>
      </div>
    </div>
  );
}

export default WelcomeMap;
