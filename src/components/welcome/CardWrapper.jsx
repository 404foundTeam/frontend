import { useEffect, useRef } from "react";
import styles from "../../styles/welcome/CardWrapper.module.css";
import reportImg from "../../assets/welcome/report_img.png";
import cardImg01 from "../../assets/welcome/card_img01.png";
import cardImg02 from "../../assets/welcome/card_img02.png";
import cardImg03 from "../../assets/welcome/card_img03.png";

function CardWrapper() {
  const cardRefs = useRef([]);

  const marketingBoxes = [
    {
      title: "오후 3시 전 음료 사이즈업 무료",
      content:
        "오후 3시에 방문 고객이 적어 방문 고객을 유도하기 위한 사이즈업 이벤트 어떠세요?",
    },
    {
      title: "아메리카노 1+1 이벤트",
      content: "아메리카노 1+1 이벤트 어떠세요?",
    },
    {
      title: "신규 방문객 대상 캠페인",
      content: "신규 방문객 대상 아메리카노 10% 할인 이벤트 어떠세요?",
    },
    {
      title: "축제와 함께 달콤한 디저트 할인",
      content: "축제를 같이 즐길 달콤한 디저트 30% 할인 이벤트 어떠세요?",
    },
  ];

  // 애니메이션
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 관찰되면 클래스 추가
            entry.target.classList.add(styles.visible);
          } else {
            entry.target.classList.remove(styles.visible);
          }
        });
      },
      { threshold: 0.2 } // 카드의 20%가 보이면 실행
    );
    // div 태그 DOM 엘리먼트들을 ref로 cardRefs 배열에 저장
    // 해당 문을 통해 cardRefs 순회하며 각 요소 개별 관찰
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect(); // 모두 멈춤
  }, []);

  return (
    <div className={styles.cardWrapper}>
      <div
        className={`${styles.cardBox} ${styles.report}`}
        ref={(el) => (cardRefs.current[0] = el)}
      >
        {/* <div className={styles.line}></div> */}
        <div className={`${styles.textBox} ${styles.report}`}>
          <p className={styles.mini}>업장 운영 전략</p>
          <h1 className={styles.title}>스마트 리포트 생성</h1>
          <p className={styles.content}>
            AI가 리뷰, 방문 데이터를 분석해 매출이 오르는 패턴을 찾아드려요.
            <br />잘 팔리는 메뉴부터 개선 포인트까지 한 눈에 보이는 스마트
            리포트를 받아보세요.
          </p>
        </div>
        <img src={reportImg} className={styles.reportImg} />
      </div>
      <div
        className={`${styles.cardBox} ${styles.marketing}`}
        ref={(el) => (cardRefs.current[1] = el)}
      >
        <div className={`${styles.marketingBoxes} ${styles.right}`}>
          {marketingBoxes.map((item, index) => (
            <div className={styles.marketingBox} key={index}>
              <h1 className={styles.marketingTitle}>{item.title}</h1>
              <p className={styles.marketingContent}>{item.content}</p>
            </div>
          ))}
        </div>
        <div className={`${styles.textBox} ${styles.marketing}`}>
          <p className={styles.mini}>업장 홍보</p>
          <h1 className={styles.title}>AI 마케팅</h1>
          <p className={styles.content}>
            마케팅 방식을 잘 모르는 사장님을 위해서
            <br />
            AI가 분석한 데이터를 바탕으로 마케팅 방안을 알려줘요.
          </p>
        </div>
      </div>
      <div
        className={`${styles.cardBox} ${styles.sns}`}
        ref={(el) => (cardRefs.current[2] = el)}
      >
        <div className={`${styles.textBox} ${styles.sns}`}>
          <p className={styles.mini}>업장 홍보</p>
          <h1 className={styles.title}>SNS 카드 생성</h1>
          <p className={styles.content}>
            AI가 생성한 문구를 활용하여 카드 뉴스를 생성해보세요.
            <br />
            디자인 전문가 없이 SNS 카드 뉴스를 클릭 몇 번으로 완성할 수 있어요.
          </p>
        </div>
        <div className={styles.cardImgBox}>
          <img src={cardImg01} className={styles.cardImg} />
          <img src={cardImg02} className={styles.cardImg} />
          <img src={cardImg03} className={styles.cardImg} />
        </div>
        {/* <div className={styles.line}></div> */}
      </div>
    </div>
  );
}

export default CardWrapper;
