import styles from "../../styles/camera/CameraBanner.module.css";
import camera from "../../assets/camera/camera.png";
import useUuidStore from "../../store/useUuidStore";

function CameraBanner({ isShow }) {
  const storeName = useUuidStore((state) => state.storeName);
  return (
    <div className={styles.container}>
      {isShow && (
        <>
          <div className={styles.header}>
            <img src={camera} className={styles.img} />
            <h1 className={styles.title}>{storeName}</h1>
            <p className={styles.content}>를 위한 사진 분석 및 촬영 가이드</p>
          </div>
        </>
      )}
    </div>
  );
}

export default CameraBanner;
