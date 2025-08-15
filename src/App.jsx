import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import WelcomePage from "./pages/WelcomePage";
import CardNewsPage from "./pages/CardNewsPage";
import CardNewsResultPage from "./pages/CardNewsResultPage";
import CameraLayout from "./layouts/CameraLayout";
import CameraPage from "./pages/CameraPage";
import CardNewsLayout from "./layouts/CardNewsLayout";
import CameraResultPage from "./pages/CameraResultPage";
import MapLayout from "./layouts/MapLayout";
import MapCoaPage from "./pages/MapCoaPage";
import MapCoaListPage from "./pages/MapCoaListPage";
import { useEffect } from "react";
import MyPage from "./pages/MyPage";
import MyLayout from "./layouts/MyLayout";



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
            <Route path="cardnews" element={<CardNewsLayout />}>
              <Route index element={<CardNewsPage />} />
              <Route path="result" element={<CardNewsResultPage />} />
            </Route>
            <Route path="camera" element={<CameraLayout />}>
              <Route index element={<CameraPage />} />
              <Route path="result" element={<CameraResultPage />} />
            </Route>
            <Route path="map" element={<MapLayout />}>
              <Route path="coalition" element={<MapCoaPage />} />
              <Route path="coalition/list" element={<MapCoaListPage />} />
            </Route>
            <Route path="mypage" element={<MyLayout />}>
              <Route index element={<MyPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
