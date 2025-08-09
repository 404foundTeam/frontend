import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Page from "./pages/Page";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
