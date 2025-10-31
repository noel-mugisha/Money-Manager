import LandingNavbar from "../components/LandingNavbar";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <LandingNavbar />
      <main className="pt-24">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to us at <a href="mailto:support@moneymanager.com" className="text-purple-700 font-medium">support@moneymanager.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ContactUs;