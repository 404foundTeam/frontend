// src/components/WeeklyScheduleViewer.jsx

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import styles from "../../styles/main/WeeklyScheduleViewer.module.css";
import useUuidStore from "../../store/useUuidStore";
import { useNavigate } from "react-router-dom";
import useActiveStroe from "../../store/useActiveStore";

function WeeklyScheduleViewer() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [monthYear, setMonthYear] = useState("");
  const storeUuid = useUuidStore((state) => state.storeUuid);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setActive = useActiveStroe((state) => state.setActive);
  const navigate = useNavigate();

  useEffect(() => {
    if (!storeUuid) {
      setIsLoading(false);
      setError("가게 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;

        const response = await axios.get(
          `http://13.209.239.240/api/v1/calendar/month`,
          {
            params: { storeUuid, year, month },
          }
        );

        const formattedEvents = response.data.map((event) => ({
          id: event.eventId,
          date: event.calendarDate,
          title: event.title,
          // description: "다가오는 일정을 준비해보세요.",
        }));

        formattedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(formattedEvents);
      } catch (err) {
        setError("일정 정보를 불러오는 데 실패했습니다.");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate, storeUuid]);

  useEffect(() => {
    const today = new Date(currentDate);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startOfWeek.setDate(today.getDate() - diff);

    const week = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
    setWeekDates(week);

    const year = startOfWeek.getFullYear();
    const month = String(startOfWeek.getMonth() + 1).padStart(2, "0");
    setMonthYear(`${year}.${month}`);
  }, [currentDate]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 날짜만 비교하기 위해 시간을 0으로 설정

    // events 배열에서 오늘 날짜 이후의 일정만 필터링.
    return events.filter((event) => new Date(event.date) >= today).slice(0, 4);
  }, [events]); // events 데이터가 변경될 때만 재계산합니다.

  // 가장 가까운 일정 ID를 찾는 로직은 이제 upcomingEvents를 사용.

  const closestEventId = useMemo(() => {
    // 이미 정렬된 상태이므로 첫 번째 항목의 id를 반환하면 됩니다.
    return upcomingEvents.length > 0 ? upcomingEvents[0].id : null;
  }, [upcomingEvents]);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className={styles.container}>
      {/* --- 상단: 주간 캘린더 --- */}
      <div className={styles.weekViewer}>
        <h2 className={styles.monthTitle}>{monthYear}</h2>
        <div className={styles.dayHeaders}>
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              className={`${styles.dayHeader} ${
                index === 6 ? styles.sunday : ""
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className={styles.dates}>
          {weekDates.map((date) => (
            <div key={date.toISOString()} className={styles.dateCell}>
              {String(date.getDate()).padStart(2, "0")}
            </div>
          ))}
        </div>
      </div>

      {/* --- 하단: 일정 목록 --- */}
      <div className={styles.scheduleListSection}>
        <div className={styles.listHeader}>
          <p className={styles.promoText}>
            다가오는 일정을 확인하고 관리해보세요!
          </p>

          <button
            className={styles.listButton}
            onClick={() => {
              setActive("CALENDAR");
              navigate("/my");
            }}
          >
            일정 수정하기
          </button>
        </div>
        <div className={styles.eventList}>
          {isLoading ? (
            <p>일정을 불러오는 중...</p>
          ) : error ? (
            <p>{error}</p>
          ) : upcomingEvents.length === 0 ? (
            <p>이번 달에는 다가오는 일정이 없습니다.</p>
          ) : (
            upcomingEvents.map((event) => (
              <div key={event.id} className={styles.eventItem}>
                <div className={styles.bullet}></div>
                <div className={styles.eventDetails}>
                  <p className={styles.eventDate}>
                    {event.date.substring(5).replace("-", "/")}
                  </p>
                  <h3
                    className={`${styles.eventTitle} ${
                      closestEventId === event.id
                        ? styles.closestEventTitle
                        : ""
                    }`}
                  >
                    {event.title}
                  </h3>
                  {/* <p className={styles.eventDescription}>{event.description}</p> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WeeklyScheduleViewer;
