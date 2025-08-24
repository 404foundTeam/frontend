import { Outlet } from "react-router-dom";
import styles from "../styles/camera/CameraLayout.module.css";
import SideBar from "../components/SideBar";
import camera from "../assets/camera/camera.png";
import useUuidStore from "../store/useUuidStore";

function CameraLayout() {
  const storeName = useUuidStore((state) => state.storeName);
  return (
    <>
      <SideBar isCamera={true} />
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={camera} className={styles.img} />
          <h1 className={styles.title}>{storeName}</h1>
          <p className={styles.content}>를 위한 사진 분석 및 촬영 가이드</p>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default CameraLayout;
