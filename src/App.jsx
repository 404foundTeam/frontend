import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./layouts/Layout";
import MyLayout from "./layouts/MyLayout";
import CardNewsLayout from "./layouts/CardNewsLayout";
import CameraLayout from "./layouts/CameraLayout";
import MapLayout from "./layouts/MapLayout";
import WelcomePage from "./pages/WelcomePage";
import MyPage from "./pages/MyPage";
import CardNewsPage from "./pages/CardNewsPage";
import CardNewsResultPage from "./pages/CardNewsResultPage";
import CameraPage from "./pages/CameraPage";
import CameraResultPage from "./pages/CameraResultPage";
import MapPage from "./pages/MapPage";
import MapCoaPage from "./pages/MapCoaPage";
import MapCoaListPage from "./pages/MapCoaListPage";
import MainPage from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import MarketingPage from "./pages/MarketingPage";
import MarketingLayout from "./layouts/MarketingLayout";
import SmartReportLayout from "./layouts/SmartReportLayout";
import SmartReportPage from "./pages/SmartReportPage";

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
          {/* 웰컴, 메인, 마이, 홍보, 카드 */}
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
