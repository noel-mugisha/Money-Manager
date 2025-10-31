import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;