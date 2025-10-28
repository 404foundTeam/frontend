import { useEffect, useRef, useState } from "react";
import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";
import { WelcomeMap } from "../welcome";

function StoreForm() {
  const mapRef = useRef();
  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => setShowMap((prev) => !prev);

  useEffect(() => {
    mapRef.current?.focus();
  }, [showMap]);

  return (
    <>
      {showMap && <WelcomeMap focusRef={mapRef} onClick={toggleMap} />}
      <FormLayout>
        <FormTitle label="업장 정보" isShow={true} />
        <div className={styles.storeBox}>
          <label className={styles.label}>
            업장명<span>*</span>
          </label>
          <div className={styles.storeName} style={{ maxWidth: "480px" }}></div>
          <button type="button" className={styles.storeBtn} onClick={toggleMap}>
            찾기
          </button>
        </div>
        <FormLine />
        <SignInput label="사업자등록번호" type="text" />
        <FormLine />
        <SignInput label="이름" type="text" />
      </FormLayout>
    </>
  );
}

export default StoreForm;
