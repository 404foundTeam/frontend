import { useEffect, useRef, useState } from "react";
import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";
import { WelcomeMap } from "../welcome";

function StoreForm({ store, setStore }) {
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);

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
        <div className={styles.box}>
          <label className={styles.label}>
            업장명<span>*</span>
          </label>
          <div
            className={`${styles.storeName} ${
              store.storeName ? styles.active : ""
            }`}
            style={{ maxWidth: "240px" }}
          >
            {store.storeName}
          </div>
          <button
            type="button"
            className={`${styles.btn} ${store.storeName ? styles.active : ""}`}
            onClick={toggleMap}
          >
            찾기
          </button>
        </div>
        <FormLine />
        <SignInput label="업장 대표자" type="text" width="240px" />
        <FormLine />
        <SignInput
          label="사업자등록번호"
          helper="-없이 숫자만 입력해주세요."
          type="text"
        />
        <FormLine />
        <SignInput label="개업일자" helper="(YYYYMMDD)" type="text" />
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
      </FormLayout>
    </>
  );
}

export default StoreForm;
