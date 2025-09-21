import styles from "../../styles/camera/CameraResultPage.module.css";
import useGuideStore from "../../store/useGuideStore";
import CameraBanner from "../../components/camera/CameraBanner";

function CameraResultPage() {
  const { guideText: text, guideImg: img } = useGuideStore();

  return (
    <>
      <CameraBanner isShow={false} />
      <div className={styles.container}>
        {img && (
          <img
            src={img}
            alt="AI 촬영 가이드 이미지"
            className={styles.guideImg}
          />
        )}
        <div className={styles.guideBox}>
          <h2 className={styles.guideTitle}>
            <span>AI</span>가 분석해준 촬영 가이드 결과입니다.
          </h2>
          {text && <div className={styles.guideText}>{text}</div>}
        </div>
      </div>
    </>
  );
}

export default CameraResultPage;
