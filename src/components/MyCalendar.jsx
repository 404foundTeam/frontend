// src/components/MyCalendar.js
import { useState } from "react";
import Calendar from "react-calendar";
// 'react-calendar/dist/Calendar.css'; // 기본 스타일은 더 이상 필요 없습니다.
import styles from "../styles/MyCalendar.module.css"; // 우리의 커스텀 스타일을 사용합니다.

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState({
    // 샘플 데이터
    "2025-08-02": "별똥별 야시장 축제",
    "2025-08-03": "BOCA Summer...",
    "2025-08-05": "한국 민속촌 여름 축제",
    "2025-08-11": "차없는 문화 축제",
  });
  const [currentEvent, setCurrentEvent] = useState("");

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    const dateKey = clickedDate.toISOString().split("T")[0];
    setCurrentEvent(events[dateKey] || "");
    setModalIsOpen(true);
  };

  const handleSaveEvent = () => {
    const dateKey = date.toISOString().split("T")[0];
    const newEvents = { ...events, [dateKey]: currentEvent };
    setEvents(newEvents);
    setModalIsOpen(false);
  };

  const handleDeleteEvent = () => {
    const dateKey = date.toISOString().split("T")[0];
    const { [dateKey]: _, ...remainingEvents } = events;
    setEvents(remainingEvents);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.myCalendarContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>나의 캘린더</h1>
        <p className={styles.subtitle}>
          일정을 정리하고 앞으로 다가올 일정을 준비해보세요!
        </p>
      </div>
      <div className={styles.calendarWrapper}>
        <Calendar
          onChange={handleDateClick}
          value={date}
          navigationLabel={({ date }) =>
            `${date.getFullYear()}년 ${date.getMonth() + 1}월`
          }
          locale="en-US" // 요일을 영어로 표시
          formatDay={(locale, date) => date.getDate()} // 날짜에서 '일' 제거
          // 일정이 있을 경우, 점 대신 이벤트 태그를 표시
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dateKey = date.toISOString().split("T")[0];
              const eventText = events[dateKey];
              return eventText ? (
                <div className={styles.eventTag}>{eventText}</div>
              ) : null;
            }
            return null;
          }}
        />
      </div>

      {/* 모달 창 */}
      {modalIsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{date.toLocaleDateString()}</h3>
            <textarea
              value={currentEvent}
              onChange={(e) => setCurrentEvent(e.target.value)}
              placeholder="일정을 입력하세요"
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSaveEvent} className={styles.saveButton}>
                저장
              </button>
              <button
                onClick={handleDeleteEvent}
                className={styles.deleteButton}
              >
                삭제
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                className={styles.closeButton}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
