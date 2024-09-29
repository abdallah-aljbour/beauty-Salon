import "./App.css";
import Home from "./homeComponant/Home";
import Details from "./Detailes/Detailes"; // Corrected spelling
import AllServices from "./Detailes/AllServies"; // Corrected spelling
import Signin from "./signinRegister/signin"; // Corrected spelling
import RegisterCustomer from "./signinRegister/registerCustomer"; // Renamed for PascalCase
import Catalog from "./catalog/MainCatalog";
import Payment from "./Detailes/paymentPage/payment"; // Corrected spelling
import DatePicker from "./Detailes/paymentPage/DatePicker";
import AdminOrUser from "./signinRegister/adminOrUser"; // Corrected spelling
import SalonOwnerRegister from "./signinRegister/registerSalonOwner"; // Renamed for PascalCase
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalonProfileForm from "./componant/salonDetails";
import ServiceCards from "./componant/ServiceCards";
import SalonOwnerProfile from "./componant/SalonOwnerProfile";
import OpeningHoursEditor from "./componant/OpeningHoursEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OpeningHoursEditor" element={<OpeningHoursEditor />} />
        <Route path="/SalonOwnerProfile" element={<SalonOwnerProfile />} />
        <Route path="/ServiceCards" element={<ServiceCards />} />
        <Route path="/admin-dashboard" element={<SalonProfileForm />} />
        <Route path="/sidebar" element={<sidebar />} />
        <Route path="/SalonOwnerRegister" element={<SalonOwnerRegister />} />
        <Route path="/RegisterCustomer" element={<RegisterCustomer />} />{" "}
        {/* Updated path */}
        <Route path="/Details" element={<Details />} />
        <Route path="/AllServices" element={<AllServices />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/DatePicker" element={<DatePicker />} />
        <Route path="/AdminOrUser" element={<AdminOrUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
