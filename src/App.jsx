import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SideBar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
