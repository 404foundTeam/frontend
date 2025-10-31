import styles from "../../styles/auth/ShowStoreInfo.module.css";
import FormLine from "./FormLine";
import StoreInfo from "./StoreInfo";

function ShowStoreInfo({
  representativeName,
  storeNumber,
  openDate,
  onCancel,
  onAccept,
  isModal,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>파일 정보와 동일 여부를 확인해주세요</div>
      <div className={styles.contentBox}>
        <StoreInfo
          label="업장 대표자"
          flex="30%"
          value={representativeName}
          isModal
        />
        <FormLine />
        <StoreInfo
          label="사업자 등록번호"
          flex="30%"
          value={storeNumber}
          isModal
        />
        <FormLine />
        <StoreInfo label="개업 일자" flex="30%" value={openDate} isModal />
      </div>
      <div className={styles.btnBox}>
        <button
          type="button"
          className={`${styles.btn} ${styles.cancel}`}
          onClick={onCancel}
        >
          취소
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.accept}`}
          onClick={onAccept}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ShowStoreInfo;
