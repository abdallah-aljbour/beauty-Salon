import Navbar from "../Navbar";
import Footer from "../Footer";
import HeroSection from "../homeComponant/HeroSection";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Testimonial from "./Testimonial";
function Home() {
  return (
    <>
      <Navbar />
      <br></br>
      <br></br>
      <HeroSection />
      <br></br>
      <br></br>
      <Section1 />
      <Section2 />
      <Section3 />
      <Testimonial />
      <Footer />
    </>
  );
}
export default Home;
