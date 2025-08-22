// src/components/MarketingContent.jsx

import { useState } from 'react'; // 1. useState를 import 합니다.
import styles from '../styles/MarketingContent.module.css';

// 이 데이터는 이제 state의 초기값으로 사용됩니다.
const initialEvents = [
  { id: 1, title: '신규 방문객 대상 이벤트', desc: '신규 방문객 대상 아메리카노 10%할인 이벤트 어떠세요?' },
  { id: 2, title: '축제와 함께하는 달콤한 디저트 할인', desc: '축제를 같이 즐길 달콤한 디저트 20%할인 이벤트 어떠세요?' },
  { id: 3, title: '모닝 세트 구성 이벤트', desc: '방문 고객이 가장 많은 오전에 모닝세트 구성 어떠세요?' },
  { id: 4, title: '오후 3시 전 음료 사이즈업 무료', desc: '오후 3시에 방문 고객이 적어 방문 고객을 유도하기 위한 사이즈업 이벤트 어떠세요?' },
  { id: 5, title: '아메리카노 1+1 이벤트', desc: '아메리카노 1+1 이벤트 어떠세요?' },
];

function MarketingContent() {
  // 1. dummyEvents를 events라는 state로 관리합니다.
  const [events, setEvents] = useState(initialEvents);

  // 2. id를 받아 해당 이벤트를 삭제하는 함수
  const handleDelete = (idToDelete) => {
    // filter 함수를 사용해 idToDelete와 일치하지 않는 이벤트만 남겨 새 배열을 만듭니다.
    const updatedEvents = events.filter(event => event.id !== idToDelete);
    // state를 새로운 배열로 업데이트합니다.
    setEvents(updatedEvents);
  };

  return (
    <div className={styles.container}>
      <p className={styles.pageSubtitle}>
        AI가 분석한 데이터를 바탕으로 맞춤형 마케팅 이벤트를 제시합니다.
      </p>

      <div className={styles.eventList}>
        {/* 이제 dummyEvents 대신 events state를 사용합니다. */}
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventText}>
              <h3 className={styles.eventTitle}>{event.title}</h3>
              <p className={styles.eventDesc}>{event.desc}</p>
            </div>
            {/* 3. 버튼에 onClick 이벤트를 추가하고, handleDelete 함수를 연결합니다. */}
            <button 
              className={styles.deleteButton}
              onClick={() => handleDelete(event.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketingContent;