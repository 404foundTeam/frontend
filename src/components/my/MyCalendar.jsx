import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from 'axios';
import styles from "../../styles/my/MyCalendar.module.css";
import useUuidStore from "../../store/useUuidStore";

const API_BASE_URL = 'http://13.209.239.240';

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [events, setEvents] = useState({});
  const [holidays, setHolidays] = useState({});
  const [currentEventText, setCurrentEventText] = useState("");
  const [currentEventId, setCurrentEventId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const storeUuid = useUuidStore((state) => state.storeUuid);
  const [fetchedYear, setFetchedYear] = useState(null);

  const fetchHolidays = async (date) => {
    try {
      const year = date.getFullYear();
      const response = await axios.get(`${API_BASE_URL}/api/v1/calendar/holidays`, {
        params: { year }
      });
      const holidaysData = response.data.reduce((acc, holiday) => {
        if (acc[holiday.calendarDate]) {
          acc[holiday.calendarDate].title += `, ${holiday.title}`;
        } else {
          acc[holiday.calendarDate] = { title: holiday.title, type: holiday.type };
        }
        return acc;
      }, {});

      if (year === 2025) {
        const gwangbokjeol = '2025-08-15';
        if (holidaysData[gwangbokjeol]) {
          holidaysData[gwangbokjeol].title += ', 광복절';
        } else {
          holidaysData[gwangbokjeol] = { title: '광복절', type: 'HOLIDAY' };
        }
      }

      setHolidays(holidaysData);
    } catch (err) {
      console.error("공휴일 정보 조회 실패:", err);
    }
  };

  const fetchEvents = async (date) => {
    if (!storeUuid) return;
    setIsLoading(true);
    setError(null);
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const response = await axios.get(`${API_BASE_URL}/api/v1/calendar/month`, {
        params: { storeUuid, year, month }
      });
      const eventsData = response.data.reduce((acc, event) => {
        acc[event.calendarDate] = { eventId: event.eventId, title: event.title };
        return acc;
      }, {});
      setEvents(eventsData);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setEvents({});
      } else {
        console.error("이벤트 조회 실패:", err);
        setError("일정을 불러오는 데 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEvent = async () => {
    const calendarDate = formatDate(selectedDate);
    try {
      if (currentEventId) {
        await axios.patch(`${API_BASE_URL}/api/v1/calendar/events/${currentEventId}`, {
          title: currentEventText,
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/v1/calendar/events`, {
          storeUuid,
          calendarDate,
          title: currentEventText,
        });
      }
      await fetchEvents(activeMonth);
      setModalIsOpen(false);
    } catch (err) {
      console.error("이벤트 저장/수정 실패:", err);
      alert("일정 처리에 실패했습니다.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!currentEventId) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/calendar/events/${currentEventId}`);
      await fetchEvents(activeMonth);
      setModalIsOpen(false);
    } catch (err) {
      console.error("이벤트 삭제 실패:", err);
      alert("일정 삭제에 실패했습니다.");
    }
  };
  
  useEffect(() => {
    fetchEvents(activeMonth);
    const currentYear = activeMonth.getFullYear();
    if (currentYear !== fetchedYear) {
      fetchHolidays(activeMonth);
      setFetchedYear(currentYear);
    }
  }, [activeMonth, storeUuid, fetchedYear]);

  const handleDateClick = (clickedDate) => {
    setSelectedDate(clickedDate);
    const dateKey = formatDate(clickedDate);
    const eventOnDate = events[dateKey];

    if (eventOnDate) {
      setCurrentEventText(eventOnDate.title);
      setCurrentEventId(eventOnDate.eventId);
    } else {
      setCurrentEventText("");
      setCurrentEventId(null);
    }
    setModalIsOpen(true);
  };
  
  if (isLoading) return <div className={styles.loading}>로딩 중...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.myCalendarContainer}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>나의 캘린더</h1>
        <p className={styles.subtitle}>일정을 정리하고 앞으로 다가올 일정을 준비해보세요!</p>
      </div>
      
      <div className={styles.calendarWrapper}>
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          activeStartDate={activeMonth} 
          onActiveStartDateChange={({ activeStartDate }) => setActiveMonth(activeStartDate)}
          navigationLabel={({ date }) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`}
          locale="en-US"
          formatDay={(locale, date) => date.getDate()}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              const dateKey = formatDate(date);
              if (holidays[dateKey]) {
                return styles.holiday;
              }
            }
            return null;
          }}
          tileContent={({ date, view }) => {
            if (view === "month") {
              const dateKey = formatDate(date);
              const eventOnDate = events[dateKey];
              const holidayOnDate = holidays[dateKey];

              return (
                <>
                  {holidayOnDate && <div className={styles.holidayTag}>{holidayOnDate.title}</div>}
                  {eventOnDate && <div className={styles.eventTag}>{eventOnDate.title}</div>}
                </>
              );
            }
            return null;
          }}
        />
      </div>

      {modalIsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>{selectedDate.toLocaleDateString()}</h3>
            <textarea
              value={currentEventText}
              onChange={(e) => setCurrentEventText(e.target.value)}
              placeholder="일정을 입력하세요"
            />
            <div className={styles.modalButtons}>
              <button onClick={handleSaveEvent} className={styles.saveButton}>저장</button>
              <button 
                onClick={handleDeleteEvent} 
                className={styles.deleteButton} 
                disabled={!currentEventId}
              >
                삭제
              </button>
              <button onClick={() => setModalIsOpen(false)} className={styles.closeButton}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
