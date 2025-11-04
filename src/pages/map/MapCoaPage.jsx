import { useEffect, useState } from "react";
import styles from "../../styles/map/MapCoaPage.module.css";
import MapBanner from "../../components/map/MapBanner";
import SelectHeader from "../../components/shared/SelectHeader";
import SelectBox from "../../components/shared/SelectBox";
import FinButton from "../../components/shared/FinButton";
import { useNavigate, useParams } from "react-router-dom";
import DateInput from "../../components/map/DateInput";
import { requestPartnership } from "../../api";
import { toast } from "react-toastify";
import useActiveStroe from "../../store/useActiveStore";

function MapCoaPage() {
  const { placeName, storeId } = useParams();
  const navigate = useNavigate();
  const setMyActive = useActiveStroe((state) => state.setMyActive);

  // 리퀘스트 바디 데이터
  const [coa, setCoa] = useState({
    partnerStoreId: null,
    purpose: "",
    details: "",
    startDate: "",
    endDate: "",
  });

  const handleSelect = (current, value) => {
    setCoa((prev) => ({
      ...prev,
      [current]: prev[current] === value ? null : value,
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCoa((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      const res = requestPartnership(coa);
      toast.success(res.message);
      setMyActive("PARTNERSHIP_SENT");
      navigate("/my");
    } catch (error) {
      console.log(error);
      toast.error("제휴 요청에 실패했습니다.");
    }
  };

  useEffect(() => {
    setCoa((prev) => ({ ...prev, partnerStoreId: storeId }));
  }, [storeId]);

  const isActive = coa.purpose && coa.details && coa.startDate && coa.endDate;

  return (
    <>
      <MapBanner label={placeName} />
      <div className={styles.container}>
        <div className="purpose">
          <SelectHeader text={"제휴맺는 목적이 무엇인가요?"} />
          <div className={styles.selectBoxs}>
            <SelectBox
              value="매장간 상호 홍보"
              selected={coa.purpose === "매장간 상호 홍보"}
              onClick={() => handleSelect("purpose", "매장간 상호 홍보")}
              label="매장간 상호 홍보"
            />
            <SelectBox
              value="지역행사 및 캠페인 협력"
              selected={coa.purpose === "지역행사 및 캠페인 협력"}
              onClick={() => handleSelect("purpose", "지역행사 및 캠페인 협력")}
              label="지역행사 및 캠페인 협력"
            />
            <SelectBox
              value="공동 프로모션"
              selected={coa.purpose === "공동 프로모션"}
              onClick={() => handleSelect("purpose", "공동 프로모션")}
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
            {/* <button
              className={`${styles.textButton} ${styles.contentTextButton} ${
                coa.details ? styles.select : ""
              }`}
            >
              완료
            </button> */}
          </div>
        </div>
        <div className={styles.date}>
          <SelectHeader text={"제휴 희망 기간을 선택하세요."} />
          <div className={styles.selectBoxs}>
            <DateInput
              name="startDate"
              value={coa.startDate}
              onChange={handleDateChange}
              placeholder="시작일"
            />
            <span className={styles.dateSeparator}>~</span>{" "}
            <DateInput
              name="endDate"
              value={coa.endDate}
              onChange={handleDateChange}
              placeholder="종료일"
            />
          </div>
        </div>
        <FinButton isActive={isActive} onClick={handleClick}>
          제휴 요청하기
        </FinButton>
      </div>
    </>
  );
}

export default MapCoaPage;
