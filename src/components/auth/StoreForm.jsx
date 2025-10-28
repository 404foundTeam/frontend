import { useEffect, useRef, useState } from "react";
import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";
import { WelcomeMap } from "../welcome";
import CoaSection from "../map/CoaSection";
import { Colors } from "chart.js";

function StoreForm({ store, setStore }) {
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => setShowMap((prev) => !prev);

  const handleSelect = (selectedStore) => {
    setStore((prev) => ({
      ...prev,
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
        <div className={styles.storeBox}>
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
            className={`${styles.storeBtn} ${
              store.storeName ? styles.active : ""
            }`}
            onClick={toggleMap}
          >
            찾기
          </button>
        </div>
        <FormLine />
        <SignInput label="업장 대표자" type="text" width="240px" />
        <FormLine />
        <SignInput label="사업자등록번호" type="text" />
        <FormLine />
        <SignInput label="개업일자" type="text" />
        <FormLine />
      </FormLayout>
    </>
  );
}

export default StoreForm;
