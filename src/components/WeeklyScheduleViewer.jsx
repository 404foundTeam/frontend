// src/components/WeeklyScheduleViewer.jsx

import { useState, useEffect, useMemo } from 'react';
import styles from '../styles/WeeklyScheduleViewer.module.css';

// 백엔드에서 받아올 데이터라고 가정하는 더미 데이터입니다. (id 추가)
const dummyEvents = [
  { id: 1, date: '2025-08-20', title: '별빛마당 야시장 축제', description: '다가오는 일정을 준비해보세요.' },
  { id: 2, date: '2025-08-22', title: 'BOCA Summer 맥주 페스티벌', description: '다가오는 일정을 준비해보세요.' },
  { id: 3, date: '2025-08-25', title: '신갈오거리 거리 축제', description: '다가오는 일정을 준비해보세요.' },
];

function WeeklyScheduleViewer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [monthYear, setMonthYear] = useState('');

  useEffect(() => {
    // 현재 날짜를 기준으로 이번 주(월~일)의 날짜들을 계산합니다.
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay(); // 0=일, 1=월, ..., 6=토
    const startOfWeek = new Date(today);
    // getDay()가 0(일요일)이면 6을 빼고, 아니면 (dayOfWeek - 1)을 빼서 월요일을 찾습니다.
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - diff);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    setWeekDates(week);

    // 상단에 표시될 '연도.월' 포맷 설정
    const year = startOfWeek.getFullYear();
    const month = String(startOfWeek.getMonth() + 1).padStart(2, '0');
    setMonthYear(`${year}.${month}`);

  }, [currentDate]);

  // 가장 가까운 일정을 찾는 로직
  const closestEventId = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 날짜만 비교하기 위해 시간을 0으로 설정

    const upcomingEvents = dummyEvents.filter(event => new Date(event.date) >= today);
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return upcomingEvents.length > 0 ? upcomingEvents[0].id : null;
  }, []);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={styles.container}>
      {/* --- 상단: 주간 캘린더 --- */}
      <div className={styles.weekViewer}>
        <h2 className={styles.monthTitle}>{monthYear}</h2>
        <div className={styles.dayHeaders}>
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`${styles.dayHeader} ${index === 6 ? styles.sunday : ''}`}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.dates}>
          {weekDates.map((date) => (
            <div key={date.toISOString()} className={styles.dateCell}>
              {String(date.getDate()).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      {/* --- 하단: 일정 목록 --- */}
      <div className={styles.scheduleListSection}>
        <p className={styles.promoText}>
          다가오는 지역축제와 기념일로 마케팅 일정을 정리해보세요!
        </p>
        <div className={styles.eventList}>
          {dummyEvents.map((event) => (
            <div key={event.id} className={styles.eventItem}>
              <div className={styles.bullet}></div>
              <div className={styles.eventDetails}>
                <p className={styles.eventDate}>
                  {event.date.substring(5).replace('-', '/')}
                </p>
                <h3 
                  className={`${styles.eventTitle} ${
                    closestEventId === event.id ? styles.closestEventTitle : ''
                  }`}
                >
                  {event.title}
                </h3>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyScheduleViewer;