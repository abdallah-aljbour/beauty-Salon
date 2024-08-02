import "./App.css";
import Home from "./homeComponant/Home";
import Detailes from "./Detailes/Detailes";
import AllServies from "./Detailes/AllServies";
import Signin from "./signinRegister/signin";
import Register from "./signinRegister/Register";
import Catalog from "./catalog/MainCatalog";
import PayMent from "./Detailes/paymentPage/payment";
import DatePicker from "./Detailes/paymentPage/DatePicker";
import AdminOrUser from "./signinRegister/adminOrUser";
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
          <Route path="/signinRegister/signin" element={<Signin />} />
          <Route path="/signinRegister/Register" element={<Register />} />
          <Route path="/catalog/MainCatalog" element={<Catalog />} />
          <Route path="/Detailes/paymentPage/payment" element={<PayMent />} />
          <Route
            path="/Detailes/paymentPage/DatePicker"
            element={<DatePicker />}
          />
          <Route path="/signinRegister/adminOrUser" element={<AdminOrUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
