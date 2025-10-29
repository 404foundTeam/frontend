import { useEffect, useRef, useState } from "react";
import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";
import { WelcomeMap } from "../welcome";
import StoreInfo from "./StoreInfo";

function StoreForm({ store, setStore }) {
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);
  const [verify, setVerfiy] = useState({
    storeNumber: "",
    representativeName: "",
    openDate: "",
  });

  const toggleMap = () => setShowMap((prev) => !prev);

  const handleSelect = (selectedStore) => {
    setStore((prev) => ({
      ...prev,
      placeId: selectedStore.placeId,
      storeName: selectedStore.placeName,
      roadAddress: selectedStore.roadAddress,
      longitude: selectedStore.longitude,
      latitude: selectedStore.latitude,
    }));
    console.log("업장");
    toggleMap();
  };

  useEffect(() => {
    mapRef.current?.focus();
  }, [showMap]);

  return (
    <>
      {showMap && (
        <WelcomeMap
          focusRef={mapRef}
          onClick={toggleMap}
          handleSelect={handleSelect}
        />
      )}
      <FormLayout>
        <FormTitle label="업장 정보" isShow={true} />
        <StoreInfo
          label="업장명"
          value={store.storeName}
          width="240px"
          isName={true}
          onClick={toggleMap}
        />
        <FormLine />
        <div className={styles.box}>
          <label className={styles.label}>
            사업자등록증<span>*</span>
          </label>
          <button
            type="button"
            className={`${styles.btn} ${store.storeName ? styles.active : ""}`}
            onClick={toggleMap}
          >
            파일 첨부하기
          </button>
        </div>
        <FormLine />
        <StoreInfo label="업장 대표자" value={false} width="240px" />
        <FormLine />
        {/* 3-2-5 */}
        <StoreInfo label="사업자등록번호" value="216-51-32155" />
        <FormLine />
        <StoreInfo label="개업일자" value="2025-10-29" />
      </FormLayout>
    </>
  );
}

export default StoreForm;
