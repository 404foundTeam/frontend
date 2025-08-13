import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function MapLayout() {
  return (
    <>
      <SideBar isMap={true} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MapLayout;
