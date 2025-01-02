import FeaturedEvents from "../components/shared/FeaturedEvents";
import FeaturesSection from "../components/shared/Features";
import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";



const Home = () => {
  return (
    <div>
      <Header />
      <FeaturedEvents />
      <FeaturesSection/>
      <Footer/>
    </div>
  );
};

export default Home;
