import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Layout() {
  return (
    <>
      <Header isWelcome={false} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
