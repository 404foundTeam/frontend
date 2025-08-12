import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import styles from "../styles/CameraLayout.module.css";
import camera from "../assets/camera.png";

function CameraLayout() {
  return (
    <>
      <SideBar isCamera={true} />
      <main className={styles.container}>
        <div className={styles.header}>
          <img src={camera} className={styles.img} />
          <h1 className={styles.title}>어웨이 커피</h1>
          <p className={styles.content}>를 위한 사진 분석 및 촬영 가이드</p>
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default CameraLayout;
