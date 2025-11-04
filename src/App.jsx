import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
import WelcomeLayout from "./layouts/WelcomeLayout";
import WelcomePage from "./pages/WelcomePage";
import Layout from "./layouts/Layout";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import MarketingLayout from "./layouts/MarketingLayout";
import MarketingPage from "./pages/MarketingPage";
import CardNewsLayout from "./layouts/CardNewsLayout";
import CardNewsPage from "./pages/cardnews/CardNewsPage";
import CardNewsResultPage from "./pages/cardnews/CardNewsResultPage";
import CameraLayout from "./layouts/CameraLayout";
import CameraPage from "./pages/camera/CameraPage";
import CameraResultPage from "./pages/camera/CameraResultPage";
import MapLayout from "./layouts/MapLayout";
import MapPage from "./pages/map/MapPage";
import MapCoaPage from "./pages/map/MapCoaPage";
import MapCoaListPage from "./pages/map/MapCoaListPage";
import SmartReportLayout from "./layouts/SmartReportLayout";
import SmartReportPage from "./pages/SmartReportPage";
import MySmartReportPage from "./components/my/MySmartReportPage";
import MyLayout from "./layouts/MyLayout";
import MyPage from "./pages/MyPage";
import Error from "./components/shared/Error";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import RequireAuth from "./components/auth/RequireAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // 새로고침 시 최상단 이동
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<WelcomeLayout />}>
            <Route index element={<WelcomePage />} />
          </Route>

          {/* <Route element={<RequireAuth />}> */}
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<MainLayout />}>
              <Route index element={<MainPage />} />
            </Route>
            <Route path="marketing" element={<MarketingLayout />}>
              <Route index element={<MarketingPage />} />
            </Route>
            <Route path="cardnews" element={<CardNewsLayout />}>
              <Route index element={<CardNewsPage />} />
              <Route path="result" element={<CardNewsResultPage />} />
            </Route>
            <Route path="camera" element={<CameraLayout />}>
              <Route index element={<CameraPage />} />
              <Route path="result" element={<CameraResultPage />} />
            </Route>
            <Route path="map" element={<MapLayout />}>
              <Route index element={<MapPage />} />
              <Route
                path="coalition/:placeName/:storeId"
                element={<MapCoaPage />}
              />
              <Route path="coalition/list" element={<MapCoaListPage />} />
            </Route>
            <Route path="smartreport" element={<SmartReportLayout />}>
              <Route index element={<SmartReportPage />} />
            </Route>
            <Route path="mysmartreport" element={<SmartReportLayout />}>
              <Route path=":year/:month" element={<MySmartReportPage />} />
            </Route>
            <Route path="my" element={<MyLayout />}>
              <Route index element={<MyPage />} />
            </Route>
          </Route>
          {/* </Route> */}

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
