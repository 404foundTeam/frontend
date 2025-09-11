import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
import WelcomeLayout from "./layouts/WelcomeLayout";
import Layout from "./layouts/Layout";
import MyLayout from "./layouts/MyLayout";
import CardNewsLayout from "./layouts/CardNewsLayout";
import CameraLayout from "./layouts/CameraLayout";
import MapLayout from "./layouts/MapLayout";
import WelcomePage from "./pages/WelcomePage";
import MyPage from "./pages/MyPage";
import CardNewsPage from "./pages/cardnews/CardNewsPage";
import CardNewsResultPage from "./pages/cardnews/CardNewsResultPage";
import CameraPage from "./pages/camera/CameraPage";
import CameraResultPage from "./pages/camera/CameraResultPage";
import MapPage from "./pages/map/MapPage";
import MapCoaPage from "./pages/map/MapCoaPage";
import MapCoaListPage from "./pages/map/MapCoaListPage";
import MainPage from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import MarketingPage from "./pages/MarketingPage";
import MarketingLayout from "./layouts/MarketingLayout";
import SmartReportLayout from "./layouts/SmartReportLayout";
import SmartReportPage from "./pages/SmartReportPage";
import Error from "./components/Error";

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
        <Routes>
          <Route path="/" element={<WelcomeLayout />}>
            <Route index element={<WelcomePage />} />
          </Route>
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
              <Route path="coalition" element={<MapCoaPage />} />
              <Route path="coalition/list" element={<MapCoaListPage />} />
            </Route>
            <Route path="smartreport" element={<SmartReportLayout />}>
              <Route index element={<SmartReportPage />} />
            </Route>
            <Route path="my" element={<MyLayout />}>
              <Route index element={<MyPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
