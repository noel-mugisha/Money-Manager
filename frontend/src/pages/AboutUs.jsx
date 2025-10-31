import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <LandingNavbar />
      <main className="pt-24">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">About Money Manager</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing you with the best tools to manage your finances effectively. Our mission is to empower you to take control of your income and expenses with an intuitive and powerful platform.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default AboutUs;