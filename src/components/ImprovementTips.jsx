// src/components/ImprovementTips.jsx

import styles from '../styles/ImprovementTips.module.css';
import tipIcon from '../assets/report/tip-icon.png'; 

// 백엔드에서 받아올 데이터라고 가정
const dummyTip = `월요일 오전에는 손님이 몰리니 잘 팔리는 메뉴의 수량을 잘 확인하세요.
아메리카노 인기를 살려 매실에이드를 할인 묶음 메뉴로 구성하면 비인기 메뉴 판매도 늘릴 수 있습니다.
매실에이드는 시음 제공이나 계절감 있는 홍보 사진으로 관심을 유도하는 것이 좋습니다.
또한, 은은한 음악을 틀어 출근 전 잠시 머물고 싶은 카페 분위기를 만들어보세요.`;

function ImprovementTips({ tipsText = dummyTip }) {
  return (
    <div className={styles.tipsContainer}>
      <div className={styles.tipsHeader}>
        <img src={tipIcon} alt="Tip Icon" className={styles.tipIcon} />
        <h2 className={styles.tipsTitle}>개선 Tip</h2>
      </div>
      <p className={styles.tipsText}>
        {tipsText}
      </p>
    </div>
  );
}

// props로 데이터가 넘어오지 않을 경우를 대비한 기본값 설정
ImprovementTips.defaultProps = {
  tipsText: dummyTip
};

export default ImprovementTips;