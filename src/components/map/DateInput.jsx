import { useRef } from "react";
import styles from "../../styles/map/DateInput.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function DateInput({ value, onChange, name, label, minDate }) {
  const hiddenDateRef = useRef(null);

  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  // 아이콘 클릭 date input의 달력 열기
  const handleIconClick = () => {
    if (hiddenDateRef.current?.showPicker) {
      hiddenDateRef.current.showPicker();
    } else {
      hiddenDateRef.current?.focus();
    }
  };

  // 달력에서 날짜 선택 시 YYYYMMDD 포맷으로 변환
  const handleDateSelect = (e) => {
    const selectedDate = e.target.value; // "2025-11-05"
    const formattedDate = selectedDate.replaceAll("-", ""); // "20251105"
    onChange({ target: { name, value: formattedDate } });
  };

  // 인풋 오늘 이전 차단
  const handleTextChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // 숫자만 허용
    if (raw.length > 8) return;

    if (raw.length === 8) {
      const y = Number(raw.slice(0, 4));
      const m = Number(raw.slice(4, 6)) - 1;
      const d = Number(raw.slice(6, 8));
      const inputDate = new Date(y, m, d);
      const min = minDate ? new Date(minDate) : new Date(localToday);
      min.setHours(0, 0, 0, 0);

      if (inputDate < min) {
        toast.error("오늘 이전 날짜는 선택할 수 없습니다.");
        return;
      }
    }

    onChange({ target: { name, value: raw } });
  };

  const formattedForDateInput =
    value && value.length === 8
      ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
      : "";

  return (
    <div className={styles.dateInputContainer}>
      <div className={styles.label}>{label}</div>
      <div className={styles.cal}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleTextChange}
          placeholder="YYYYMMDD"
          className={styles.dateInput}
          maxLength={8}
        />
        <FaCalendarAlt
          className={styles.calendarIcon}
          onClick={handleIconClick}
        />
        <input
          ref={hiddenDateRef}
          type="date"
          min={minDate || localToday}
          value={formattedForDateInput}
          className={styles.hiddenDateInput}
          onChange={handleDateSelect}
        />
      </div>
    </div>
  );
}

export default DateInput;
