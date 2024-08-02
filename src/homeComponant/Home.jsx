import Navbar from "../Navbar";
import Footer from "../Footer";
import HeroSection from "../homeComponant/HeroSection";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Testimonial from "./Testimonial";
import Business from "./Business";
function Home() {
  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <HeroSection />

      <Section1 />
      <br></br>
      <br></br>
      <Section2 />
      <br></br>
      <br></br>
      <Section3 />
      <br></br>
      <br></br>
      <Testimonial />
      <br></br>
      <br></br>
      <Business />
      <br />
      <br />
      <Footer />
    </>
  );
}
export default Home;
