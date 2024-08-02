import Navbar from "../Navbar";
import Footer from "../Footer";
import Card from "./Card";
import Pagenation from "./Pagenation";
import Search from "./Search";
function Catalog() {
  return (
    <>
      <Navbar />
      <Search />
      <Card />
      <Pagenation />
      <Footer />
    </>
  );
}
export default Catalog;
