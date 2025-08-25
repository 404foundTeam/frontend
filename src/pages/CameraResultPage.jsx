import styles from "../styles/camera/CameraResultPage.module.css";

import useGuideStore from "../store/useGuideStore";

import CameraBanner from "../components/camera/CameraBanner";

function CameraResultPage() {
  const text = useGuideStore((state) => state.guideText);
  const img = useGuideStore((state) => state.guideImg);

  return (
    <>
      <CameraBanner isShow={false} />
      <div className={styles.container}>
        <img src={img} className={styles.guideImg} />
        <div className={styles.guideBox}>
          <h2 className={styles.guideTitle}>
            <span>AI</span>가 분석해준 촬영 가이드 결과입니다.
          </h2>
          <div className={styles.guideText}>{text}</div>
          <p className={styles.chance}>
            이번 달 무료 횟수 <span>회</span> 남았어요.
          </p>
        </div>
      </div>
    </>
  );
}

export default CameraResultPage;
