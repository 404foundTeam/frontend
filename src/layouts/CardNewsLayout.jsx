import { Outlet } from "react-router-dom";
// import SideBar from "../components/layout/SideBar";

function CardNewsLayout() {
  return (
    <>
      {/* <SideBar isCard={true} /> */}
      <>
        <Outlet />
      </>
    </>
  );
}

export default CardNewsLayout;
