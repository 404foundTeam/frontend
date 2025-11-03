import styles from "../../styles/map/DateInput.module.css";
import { FaCalendarAlt } from "react-icons/fa"; // react-icons에서 아이콘 가져오기

/**
 * 커스텀 스타일이 적용된 Date Input 컴포넌트
 * @param {string} value - 날짜 state (e.g., coa.startDate)
 * @param {function} onChange - 날짜 변경 핸들러
 * @param {string} name - input의 name 속성 (e.g., "startDate")
 * @param {string} placeholder - 커스텀 플레이스홀더 텍스트
 */

function DateInput({ value, onChange, name, placeholder }) {
  return (
    <div className={styles.dateInputContainer}>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={styles.dateInput}
        data-placeholder={placeholder}
        required
      />

      <FaCalendarAlt className={styles.calendarIcon} />
    </div>
  );
}

export default DateInput;
