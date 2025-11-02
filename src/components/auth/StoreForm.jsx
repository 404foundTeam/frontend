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
import ToastMessage from "../shared/ToastMessage";

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
  const handleSelect = async (selectedStore) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 2000)); // 2초짜리 가짜 작업
    toast.promise(promise, {
      pending: "업장 정보 저장 중...", // 대기
      success: {
        icon: false,
        render() {
          return <ToastMessage>업장 등록 완료</ToastMessage>;
        },
      },
      error: "업장 등록 실패",
    });

    await promise;
    setStore((prev) => ({
      ...prev,
      placeId: selectedStore.placeId,
      placeName: selectedStore.placeName,
      roadAddress: selectedStore.roadAddress,
      longitude: selectedStore.longitude,
      latitude: selectedStore.latitude,
    }));

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
    if (!(verify.storeNumber && verify.representativeName && verify.openDate)) {
      toast.error("업장 정보를 확인해주세요.");
      return;
    }
    const { storeNumber, representativeName, openDate } = verify;
    await toast.promise(
      verifyStoreLicense({
        storeNumber,
        representativeName,
        openDate,
      }),
      {
        pending: "진위여부 확인 중...",
        success: {
          icon: false,
          render({ data }) {
            setStore((prev) => ({ ...prev, verified: data.verified }));
            return <ToastMessage>{data.message}</ToastMessage>;
          },
        },
        error: {
          render() {
            setStore((prev) => ({ ...prev, verified: false }));
            return (
              <ToastMessage>진위여부 확인 중 오류가 발생했습니다.</ToastMessage>
            );
          },
        },
      }
    );
  };

  // 파일 입력 시 ocr 추출 후 모달 표시
  useEffect(() => {
    if (file) {
      const getOcr = async () => {
        const formData = new FormData();
        formData.append("storeLicense", file);
        try {
          const res = await toast.promise(extractStoreOcr(formData), {
            pending: "사업자등록증 분석 중입니다...",
            success: {
              icon: false,
              render({ data }) {
                // 추후에 다시
                if (
                  data.message ===
                  "OCR 인식에 실패했습니다. 이미지를 다시 업로드해주세요."
                ) {
                  console.log("red");
                  return (
                    <ToastMessage isRed={true}>{data.message}</ToastMessage>
                  );
                } else {
                  return <ToastMessage>{data.message}</ToastMessage>;
                }
              },
            },
            error: {
              render() {
                return toast.error("파일 분석에 실패했습니다.");
              },
            },
          });

          setOcrData({
            storeNumber: res.storeNumber,
            representativeName: res.representativeName,
            openDate: res.openDate,
          });
          setOcrModal(true);
        } catch (error) {
          console.log(error);
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
    const isStoreNameValid = (store.placeName || "").trim() !== "";
    const isVerified = store.verified === true;

    const isFormValid = isStoreNameValid && isVerified;

    handleStore(isFormValid);
  }, [store, handleStore]);

  const isVerified =
    verify.storeNumber && verify.representativeName && verify.openDate;

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
              isModal={true}
            />
          </div>
        )}
        <StoreInfo
          label="업장명"
          value={store.placeName}
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
            disabled={isVerified}
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
            disabled={store.verified}
            onClick={handleVerify}
          >
            {store.verified ? "진위여부 확인 완료" : "진위여부 확인하기"}
          </button>
        </div>
      </FormLayout>
    </>
  );
}

export default StoreForm;
