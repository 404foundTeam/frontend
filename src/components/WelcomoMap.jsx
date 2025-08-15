import { useEffect, useRef, useState } from "react";
import close from "../assets/welcomeMap/close.png";
import listTitle from "../assets/welcomeMap/list.png";
import listIcon from "../assets/welcomeMap/marker_icon.png";
import selectMarkerImg from "../assets/welcomeMap/select_marker.png";
import "../styles/WelcomeMap.css";
import StoreSearch from "./StoreSearch";

const { kakao } = window;

function WelcomeMap({ focusRef, onClick }) {
  // 업장 등록, 요청 데이터
  const [selectStore, setSelectStore] = useState(null);

  const [search, setSearch] = useState("");
  const [isClick, setIsClick] = useState(false);

  const container = useRef(null);
  const mapRef = useRef(null); // 지도 객체 저장
  const markerRef = useRef(null); // 현재 마커 저장

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

  useEffect(() => {
    const centerPos = new kakao.maps.LatLng(
      item[0].latitude,
      item[0].longitude
    );
    const options = {
      center: centerPos,
      level: 3,
    };
    const map = new kakao.maps.Map(container.current, options);
    mapRef.current = map;

    // 마커 여러 개 생성
    item.forEach((store) => {
      const markerPosition = new kakao.maps.LatLng(
        store.latitude,
        store.longitude
      );
      // 마커 이미지
      const imageSize = new kakao.maps.Size(24, 35); // 이미지 크기
      const imageOption = { offset: new kakao.maps.Point(12, 35) }; // 마커 중심 좌표
      const markerImage = new kakao.maps.MarkerImage(
        selectMarkerImg,
        imageSize,
        imageOption
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 커스텀 마커 이미지 적용
      });
      marker.setMap(map);

      // 마커 클릭 이벤트
      kakao.maps.event.addListener(marker, "click", function () {
        alert(`${store.name} 클릭됨`);
      });
    });
  }, []);

  const searchAddr = (address) => {
    if (!address.trim()) return;
    console.log("kakao1");
    const geocoder = new kakao.maps.services.Geocoder();
    console.log("kakao2");
    console.log(geocoder);
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(result);
        console.log(result[0].address_name); // 도로명 주소
        console.log(result[0].x); // 경도, x좌표
        console.log(result[0].y); // 위도, y좌표

        mapRef.current.setCenter(coords);

        if (markerRef.current) markerRef.current.setMap(null);

        const imageSize = new kakao.maps.Size(24, 35);
        const imageOption = { offset: new kakao.maps.Point(12, 35) };
        const markerImage = new kakao.maps.MarkerImage(
          selectMarkerImg,
          imageSize,
          imageOption
        );

        const marker = new kakao.maps.Marker({
          position: coords,
          image: markerImage,
        });
        marker.setMap(mapRef.current);
        markerRef.current = marker;
      } else {
        alert("오류 발생");
      }
    });
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
          <div className="search-list">
            {item.map((store) => (
              <div
                className={`search-list-box ${
                  selectStore?.placeId === store.placeId ? "select" : ""
                }`}
                key={store.placeId}
                onClick={(e) => {
                  if (e.currentTarget.className.includes("select")) {
                    setSelectStore(null);
                    setIsClick(false);
                  } else {
                    setSelectStore(store);
                    setIsClick(true);
                  }
                }}
              >
                <img src={listIcon} className="list-box-ico" />
                <div className="store-info">
                  <h1>{store.name}</h1>
                  <p>{store.roadAddress}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className={`map-button ${isClick ? "select" : ""}`}>
          업장 등록
        </button>
      </div>
    </div>
  );
}

export default WelcomeMap;
