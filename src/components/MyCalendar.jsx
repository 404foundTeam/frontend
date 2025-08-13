import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일
import styles from '../styles/MyCalendar.module.css'; // 커스텀 스타일

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState({}); // { 'YYYY-MM-DD': '일정 내용' }
  const [currentEvent, setCurrentEvent] = useState('');

  // 날짜를 클릭했을 때
  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
    const dateKey = clickedDate.toISOString().split('T')[0];
    setCurrentEvent(events[dateKey] || ''); // 기존 일정 불러오기
    setModalIsOpen(true);
  };

  // 일정 저장 (추가 & 수정)
  const handleSaveEvent = () => {
    const dateKey = date.toISOString().split('T')[0];
    const newEvents = { ...events, [dateKey]: currentEvent };
    setEvents(newEvents);
    setModalIsOpen(false);
  };

  // 일정 삭제
  const handleDeleteEvent = () => {
    const dateKey = date.toISOString().split('T')[0];
    const { [dateKey]: _, ...remainingEvents } = events; // 해당 날짜 일정만 제외
    setEvents(remainingEvents);
    setModalIsOpen(false);
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={handleDateClick}
        value={date}
        // 날짜 칸에 점(.)으로 일정 표시
        tileContent={({ date, view }) => {
          const dateKey = date.toISOString().split('T')[0];
          return view === 'month' && events[dateKey] ? <div className={styles.dot}></div> : null;
        }}
      />

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
              <button onClick={handleSaveEvent}>저장</button>
              <button onClick={handleDeleteEvent} className={styles.deleteButton}>삭제</button>
              <button onClick={() => setModalIsOpen(false)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;