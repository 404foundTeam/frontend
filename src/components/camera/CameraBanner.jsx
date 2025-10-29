import styles from "../../styles/camera/CameraBanner.module.css";
import useAuthStore from "../../store/useAuthStore";
import camera from "../../assets/camera/camera.png";

function CameraBanner({ isShow }) {
  const storeName = useAuthStore((state) => state.storeName);
  return (
    <div className={styles.container}>
      {isShow && (
        <>
          <div className={styles.header}>
            <img src={camera} className={styles.img} />
            <h1 className={styles.title}>{storeName}</h1>
            <p className={styles.content}>을 위한 사진 분석 및 촬영 가이드</p>
          </div>
        </>
      )}
    </div>
  );
}

export default CameraBanner;
