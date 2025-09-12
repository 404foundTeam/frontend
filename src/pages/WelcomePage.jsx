import { useEffect, useRef, useState } from "react";
import styles from "../styles/welcome/WelcomePage.module.css";
import {
  TextBox,
  WelcomeMap,
  Blur,
  CardWrapper,
  MatchMap,
} from "../components/welcome";

function WelcomePage() {
  const mapRef = useRef();

  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => setShowMap((prev) => !prev);

  // 포커스
  useEffect(() => {
    mapRef.current?.focus();
  }, [showMap]);

  return (
    <div className={styles.container}>
      {showMap && (
        <>
          <Blur />
          <WelcomeMap focusRef={mapRef} onClick={toggleMap} />
        </>
      )}
      <div className={styles.headerContainer}>
        <div className={styles.headerBox}>
          <div className={styles.headerTextBox}>
            <h1 className={styles.headerTitle}>
              소상공인을 위한
              <br />
              스마트한 마케팅 플랫폼
            </h1>
            <p className={styles.headerText}>
              AI가 어렵고 복잡한 마케팅과 운영전략을 한번에
            </p>
            <button onClick={toggleMap} className={styles.signButton}>
              업장 등록하기
            </button>
          </div>
          <div className={`${styles.headerImg} ${styles.bee}`}></div>
          <div className={`${styles.headerImg} ${styles.bee}`}></div>
          <div className={`${styles.headerImg} ${styles.hive}`}></div>
        </div>
        <div className={styles.headrBottomBox}></div>
      </div>
      <TextBox
        title={"소상공인을 위한 쉽고 빠른 플랫폼, market BEE"}
        content={
          "클릭 몇 번으로 가게 홍보에 필요한 모든 콘텐츠와 운영을 자동으로 관리해보세요."
        }
      />
      <CardWrapper />
      <TextBox
        title={"가게 운영과 마케팅을 한 번에 잡는 스마트 솔루션"}
        content={"사장님을 위한 새로운 성장과 전략, 지금 시작하세요."}
      />
      <MatchMap toggleMap={toggleMap} />
    </div>
  );
}

export default WelcomePage;
