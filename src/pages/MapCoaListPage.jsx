import styles from "../styles/map/MapCoaListPage.module.css";
import MapBanner from "../components/map/MapBanner";

function MapCoaListPage() {
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
        <div>
          <h1>
            <span>어웨이 커피</span>님과 제휴 맺은 업체
          </h1>
          <div className={`${styles.coaList} ${styles.myCoaList}`}>
            {myCoaList.map((store) => (
              <div className={styles.myCoaBox}>
                <div className={styles.text}>
                  <div className={styles.info}>
                    <p className={styles.name}>{store.storeName}</p>
                    <p className={styles.add}>{store.storeAddress}</p>
                  </div>
                  <div className={styles.date}>{store.date}</div>
                </div>
                {store.isPartner ? (
                  <button className={styles.discon}>제휴 끊기</button>
                ) : (
                  <button className={styles.con}>제휴 다시 맺기</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>
            <span>어웨이 커피</span>님께 제휴 요청한 업체
          </h1>
          <div className={`${styles.coaList} ${styles.fromCoaList}`}>
            {fromCoaList.map((store) => (
              <div className={styles.fromCoaBox}>
                <div className={styles.info}>
                  <p className={styles.name}>{store.storeName}</p>
                  <p className={styles.add}>{store.storeAddress}</p>
                </div>
                <div className={styles.buttonBox}>
                  <button className={styles.acc}>맺기</button>
                  <button className={styles.ref}>거절</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>
            <span>어웨이 커피</span>님이 제휴 요청한 업체
          </h1>
          <div className={`${styles.coaList} ${styles.toCoaList}`}>
            {toCoaList.map((store) => (
              <div className={styles.toCoaBox}>
                <div className={styles.info}>
                  <p className={styles.name}>{store.storeName}</p>
                  <p className={styles.add}>{store.storeAddress}</p>
                </div>
                <button>맺기 대기중</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MapCoaListPage;
