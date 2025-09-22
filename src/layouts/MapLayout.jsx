import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";

function MapLayout() {
  return (
    <>
      <SideBar isMap={true} />
      <>
        <Outlet />
      </>
    </>
  );
}

export default MapLayout;
