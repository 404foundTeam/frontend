import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import WelcomePage from "./pages/WelcomePage";
import CardNewsPage from "./pages/CardNewsPage";
import Loading from "./components/Loading";
import CardNewsResult from "./components/CardNewsResult";
import CameraLayout from "./pages/CameraLayout";
import CameraPage from "./pages/CaemraPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path="/cardnews" element={<CardNewsPage />} />
            <Route path="/cardnews/loading" element={<Loading />} />
            <Route path="/cardnews/result" element={<CardNewsResult />} />
          </Route>
          <Route path="/camera" element={<CameraLayout />}>
            <Route index element={<CameraPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
