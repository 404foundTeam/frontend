import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";

function CameraLayout() {
  return (
    <>
      <SideBar isCamera={true} />
      <>
        <Outlet />
      </>
    </>
  );
}

export default CameraLayout;
