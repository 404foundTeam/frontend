import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<WelcomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
