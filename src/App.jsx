import "./App.css";
import Home from "./homeComponant/Home";
import Detailes from "./Detailes/Detailes";
import AllServies from "./Detailes/AllServies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Detailes/Detailes" element={<Detailes />} />
          <Route path="/Detailes/AllServies" element={<AllServies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
