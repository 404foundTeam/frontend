// src/components/MarketingTips.jsx

import styles from '../styles/MarketingTips.module.css';

// 백엔드에서 받아올 데이터라고 가정하는 임시 데이터입니다.
const dummyMarketingData = {
  summary: {
    mainText: "오늘은 별빛마당 야시장 축제입니다.",
    highlight: "별빛마당 야시장 축제",
    subText: "축제에 걸맞는 시즌성 이벤트를 준비해보세요.",
  },
  tips: [
    { date: '09/01', title: '추천 마케팅', details: ['불꽃놀이 보러 가기 전, 시원한 라떼 한 잔!', '지역 야시장 축제날, 방문 인증 시 쿠폰 지급'] },
    { date: '09/03', title: '추천 마케팅', details: ['축제와 함께하는 달콤한 디저트 할인'] },
    { date: '09/05', title: '추천 마케팅', details: ['축제에 시원한 자몽 에이드 한 잔!', '시원한 딸기에이드와 함께 즐기는 축제!'] },
  ]
};

function MarketingTips() {
  const { summary, tips } = dummyMarketingData;

  return (
    <div className={styles.container}>
      <div className={styles.titleHeader}>
        이번주 맞춤형 마케팅
      </div>

      <div className={styles.content}>
        <p className={styles.summary}>
          {summary.mainText.split(summary.highlight)[0]}
          <span className={styles.highlight}>{summary.highlight}</span>
          {summary.mainText.split(summary.highlight)[1]}
          <br />
          {summary.subText}
        </p>

        <div className={styles.tipsList}>
          {tips.map((tip) => (
            <div key={tip.date} className={styles.tipItem}>
              <div className={styles.bullet}></div>
              <div className={styles.tipDetails}>
                <h3 className={styles.tipTitle}>
                  <span className={styles.tipDate}>{tip.date}</span>
                  <span className={styles.tipLabel}>{tip.title}</span>
                </h3>
                <div className={styles.tipDescription}>
                  {tip.details.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketingTips;