import { useState } from "react";
import styles from "../../styles/map/MapCoaPage.module.css";
import MapBanner from "../../components/map/MapBanner";
import SelectHeader from "../../components/shared/SelectHeader";
import SelectBox from "../../components/shared/SelectBox";
import FinButton from "../../components/shared/FinButton";
import { useParams } from "react-router-dom";

function MapCoaPage() {
  const { partnerStoreId } = useParams();

  // 리퀘스트 바디 데이터
  const [coa, setCoa] = useState({
    partnerStoreId: partnerStoreId,
    purpose: null,
    details: null,
    date: null,
  });

  const handleSelect = (current, value) => {
    setCoa((prev) => ({
      ...prev,
      [current]: prev[current] === value ? null : value,
    }));
  };

  return (
    <>
      <MapBanner />
      <div className={styles.container}>
        <div className="purpose">
          <SelectHeader text={"제휴맺는 목적이 무엇인가요?"} />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="inter"
              selected={coa.purpose === "inter"}
              onClick={() => handleSelect("purpose", "inter")}
              label="매장간 상호 홍보"
            />
            <SelectBox
              value="fest"
              selected={coa.purpose === "fest"}
              onClick={() => handleSelect("purpose", "fest")}
              label="지역행사 및 캠페인 협력"
            />
            <SelectBox
              value="part"
              selected={coa.purpose === "part"}
              onClick={() => handleSelect("purpose", "part")}
              label="공동 프로모션"
            />
          </div>
        </div>
        <div className={styles.content}>
          <SelectHeader text={"제휴 요청 상세 내용을 입력하세요."} />
          <div className={styles.contentTextBox}>
            <input
              className={`${styles.contentTextInput} ${
                coa.details ? styles.select : ""
              }`}
              type="text"
              placeholder="텍스트를 입력하세요."
              value={coa.details}
              onChange={(e) => {
                setCoa((prev) => ({ ...prev, details: e.target.value }));
              }}
            />
            <button
              className={`${styles.textButton} ${styles.contentTextButton} ${
                coa.details ? styles.select : ""
              }`}
            >
              완료
            </button>
          </div>
        </div>
        <div className={styles.date}>
          <SelectHeader text={"제휴 희망 기간을 선택하세요."} />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="seven"
              selected={coa.date === "seven"}
              onClick={() => handleSelect("date", "seven")}
              label="7일"
            />
            <SelectBox
              value="thrid"
              selected={coa.date === "thrid"}
              onClick={() => handleSelect("date", "thrid")}
              label="3개월"
            />
            <SelectBox
              value="six"
              selected={coa.date === "six"}
              onClick={() => handleSelect("date", "six")}
              label="6개월"
            />
          </div>
        </div>
        <FinButton>제휴 요청하기</FinButton>
      </div>
    </>
  );
}

export default MapCoaPage;
