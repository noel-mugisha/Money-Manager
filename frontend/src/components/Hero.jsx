import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white pt-32 pb-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Take Control of Your Finances
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Your foundation for secure, intelligent financial management. Effortlessly
          track your income and expenses to achieve your financial goals.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 transform hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Start Tracking for Free
          </button>
          <button
            onClick={() => navigate('/about-us')}
            className="flex items-center gap-2 px-8 py-3 text-gray-700 font-semibold bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Learn More <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;