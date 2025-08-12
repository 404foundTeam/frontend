import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function CameraLayout() {
  return (
    <>
      <Header />
      <SideBar isCamera={true} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default CameraLayout;
