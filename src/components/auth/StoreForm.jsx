import { useEffect, useRef, useState } from "react";
import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import { WelcomeMap } from "../welcome";
import StoreInfo from "./StoreInfo";
import { extractStoreOcr, verifyStoreLicense } from "../../api/auth";
import ShowStoreInfo from "./ShowStoreInfo";
import { toast } from "react-toastify";

function StoreForm({ store, setStore, handleStore }) {
  const mapRef = useRef();
  const fileInputRef = useRef(); // 파일 입력 참조
  const [showMap, setShowMap] = useState(false); // 모달 표시
  const [file, setFile] = useState(null); // 파일 상태 관리
  const [blur, setBlur] = useState(true); // 박스들 블러 처리
  const [verify, setVerify] = useState({
    storeNumber: "",
    representativeName: "",
    openDate: "",
  });

  const [ocrModal, setOcrModal] = useState(false); // ocr 추출 모달창
  // 임시 상태 저장
  const [ocrData, setOcrData] = useState(null);

  const toggleMap = () => setShowMap((prev) => !prev);

  // 파일 입력 클릭
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // file 상태 변경
  const handleChangeFile = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
    }
  };

  // 모달로부터 업장 정보 가져와서 상태 변경
  const handleSelect = (selectedStore) => {
    setStore((prev) => ({
      ...prev,
      placeId: selectedStore.placeId,
      // store or place
      storeName: selectedStore.placeName,
      roadAddress: selectedStore.roadAddress,
      longitude: selectedStore.longitude,
      latitude: selectedStore.latitude,
    }));
    // alert("업장 선택 완료");
    toast.success("업장 선택 완료");
    // const promise = new Promise((resolve) => setTimeout(resolve, 2000)); // 2초짜리 가짜 작업
    // toast.promise(promise, {
    //   pending: "업장 정보 저장 중...", // 대기
    //   success: "저장 완료! 👌", // 성공
    //   error: "저장 실패 🤯", // 실패
    // });
    toggleMap();
  };

  const handleAccept = () => {
    setVerify(ocrData);
    setBlur(false);
    setOcrModal(false);
    setOcrData(null);
  };

  const handleCancel = () => {
    setOcrModal(false);
    setOcrData(null);

    // 초기화
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  // 진위여부 확인
  const handleVerify = async () => {
    const { storeNumber, representativeName, openDate } = verify;
    try {
      const res = await verifyStoreLicense({
        storeNumber,
        representativeName,
        openDate,
      });
      if (res?.message) {
        toast.success(res.message);
        // alert(res.message);
      } else {
        toast.success("진위여부 확인이 완료되었습니다.");
        // alert("진위여부 확인이 완료되었습니다.");
      }
      setStore((prev) => ({ ...prev, verified: res.verified }));
    } catch (error) {
      toast.error("진위여부 확인 중 오류가 발생했습니다.");
      // alert("진위여부 확인 중 오류가 발생했습니다.");
      setStore((prev) => ({ ...prev, verified: false }));
      console.log(error);
    }
  };

  // 파일 입력 시 ocr 추출 후 모달 표시
  useEffect(() => {
    if (file) {
      const getOcr = async () => {
        try {
          const formData = new FormData();
          formData.append("storeLicense", file);

          const ocr = await extractStoreOcr(formData);
          setOcrData({
            storeNumber: ocr.storeNumber,
            representativeName: ocr.representativeName,
            openDate: ocr.openDate,
          });
          setOcrModal(true);
          toast.success(ocr.message);
          // alert(ocr.message);
          // setBlur(false);
        } catch (error) {
          toast.error("파일 분석에 실패했습니다.");
          // alert("파일 분석에 실패했습니다.");
          console.log(error);

          // 초기화
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
        }
      };

      getOcr();
    }
  }, [file]);

  useEffect(() => {
    mapRef.current?.focus();
  }, [showMap]);

  // 스토어 폼 상태 페이지로 전달
  useEffect(() => {
    const isStoreNameValid = (store.storeName || "").trim() !== "";
    const isVerified = store.verified === true;

    const isFormValid = isStoreNameValid && isVerified;

    handleStore(isFormValid);
  }, [store, handleStore]);

  // verify 하나라도 비어있으면 비활성화
  const isVerifyReady =
    verify.storeNumber !== "" &&
    verify.representativeName !== "" &&
    verify.openDate !== "";

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
        <FormTitle label="업장 정보" isShow={true} isStore={store.verified} />
        {ocrModal && (
          <div className={styles.modal}>
            <ShowStoreInfo
              representativeName={ocrData.representativeName}
              storeNumber={ocrData.storeNumber}
              openDate={ocrData.openDate}
              onCancel={handleCancel}
              onAccept={handleAccept}
            />
          </div>
        )}
        <StoreInfo
          label="업장명"
          value={store.storeName}
          width="200px"
          isName={true}
          isReq={true}
          onClick={toggleMap}
        />
        <FormLine />
        <div className={styles.box}>
          <label className={styles.label}>
            사업자등록증<span>*</span>
          </label>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleChangeFile}
            accept="image/png, image/jpeg"
          />
          <button
            type="button"
            className={`${styles.btn} ${file ? styles.active : ""}`}
            onClick={handleFileInputClick}
          >
            파일 첨부하기
          </button>
        </div>
        <FormLine />
        <StoreInfo
          label="업장 대표자"
          value={verify.representativeName}
          width="200px"
          isBlur={blur}
        />
        <FormLine />
        {/* 3-2-5 */}
        <StoreInfo
          label="사업자등록번호"
          value={verify.storeNumber}
          isBlur={blur}
        />
        <FormLine />
        <StoreInfo label="개업일자" value={verify.openDate} isBlur={blur} />
        <div className={styles.btnBox}>
          <button
            type="button"
            className={styles.confirmBtn}
            disabled={!isVerifyReady} // verify 하나라도 비어있으면 비활성화
            onClick={handleVerify}
          >
            진위여부 확인하기
          </button>
        </div>
      </FormLayout>
    </>
  );
}

export default StoreForm;
