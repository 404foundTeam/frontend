import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function CardNewsLayout() {
  return (
    <>
      <SideBar isCard={true} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default CardNewsLayout;
