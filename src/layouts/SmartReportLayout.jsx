// src/layouts/SmartReportLayout.jsx

import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import styles from "../styles/SmartReportLayout.module.css";

function SmartReportLayout() {
  return (
    <div className={styles.layoutContainer}>
      <SideBar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
}

export default SmartReportLayout;
