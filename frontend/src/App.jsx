import "./App.css";
import Home from "./homeComponant/Home";
import Details from "./Detailes/Detailes";
import AllServices from "./Detailes/AllServies";
import Signin from "./signinRegister/signin";
import RegisterCustomer from "./signinRegister/registerCustomer";
import Catalog from "./catalog/MainCatalog";
import Payment from "./Detailes/paymentPage/payment";
import DatePicker from "./Detailes/paymentPage/DatePicker";
import AdminOrUser from "./signinRegister/adminOrUser";
import SalonOwnerRegister from "./signinRegister/registerSalonOwner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalonProfileForm from "./componant/salonDetails";
import ServiceCards from "./componant/ServiceCards";
import SalonOwnerProfile from "./componant/SalonOwnerProfile";
import OpeningHoursEditor from "./componant/OpeningHoursEditor";
import AddServiceForm from "./componant/AddServiceForm";
import Image from "./Detailes/Images";
import BookingSuccess from "./Detailes/paymentPage/BookingSuccess";
import UserProfile from "./components/UserProfile";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddServiceForm" element={<AddServiceForm />} />
        <Route path="/OpeningHoursEditor" element={<OpeningHoursEditor />} />
        <Route path="/SalonOwnerProfile" element={<SalonOwnerProfile />} />
        <Route path="/ServiceCards" element={<ServiceCards />} />
        <Route path="/admin-dashboard" element={<SalonProfileForm />} />
        <Route path="/sidebar" element={<sidebar />} />
        <Route path="/SalonOwnerRegister" element={<SalonOwnerRegister />} />
        <Route path="/RegisterCustomer" element={<RegisterCustomer />} />
        <Route path="/Detailes/Detailes/:id" element={<Details />} />
        <Route path="/salon/:id" element={<Image />} />
        <Route path="/AllServices/:salonId" element={<AllServices />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/Catalog" element={<Catalog />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/DatePicker" element={<DatePicker />} />
        <Route path="/AdminOrUser" element={<AdminOrUser />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/terms" element={<div>Terms & Conditions</div>} />
        <Route path="/privacy" element={<div>Privacy Policy</div>} />
        <Route path="/help" element={<div>Help Center</div>} />
        <Route path="/faq" element={<div>FAQs</div>} />
        <Route path="/careers" element={<div>Careers</div>} />
        <Route path="/blog" element={<div>Blog</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
